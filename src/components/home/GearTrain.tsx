"use client";

import { useEffect, useRef, useState } from "react";
import { whenInteracted } from "@/lib/interaction";

/**
 * Interactive gear train: six meshing gears, one per service.
 * Decoupled from the list: any element with [data-svc-index] (+ data-svc-title) drives it —
 * hover / keyboard focus on desktop, scroll position on touch devices.
 *
 * Performance contract:
 *  - Three.js is imported only when the section is ~one screen away.
 *  - The render loop pauses off-screen / in background tabs.
 *  - Everything (renderer, geometry, listeners) is disposed when the section is far away again,
 *    so only one WebGL context is ever alive at a time on long pages.
 *  - Skipped for reduced-motion / data-saver; the section is fully usable without it.
 */
export function GearTrain() {
  const box = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const label = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = box.current;
    const cv = canvas.current;
    if (!el || !cv) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || conn?.saveData || /2g/.test(conn?.effectiveType ?? "")) return;

    let teardown: (() => void) | undefined;
    let booting = false;
    let unmounted = false;
    let interacted = false;
    let isNear = false;

    const rows = () => Array.from(document.querySelectorAll<HTMLElement>("[data-svc-index]"));

    const boot = async () => {
      if (booting || teardown || unmounted || !interacted) return;
      booting = true;
      try {
        const probe = document.createElement("canvas");
        if (!(probe.getContext("webgl2") || probe.getContext("webgl"))) return;
        const { createGearTrain } = await import("./gear-train");
        if (unmounted || !el.isConnected) return;

        const items = rows();
        const titles = items.map((r) => r.dataset.svcTitle ?? "");
        const themeNow = () => (document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");
        const train = createGearTrain(el, cv, label.current, titles, themeNow());
        setLive(true);

        const idx = (n: Element | null) => {
          const r = n?.closest<HTMLElement>("[data-svc-index]");
          return r ? Number(r.dataset.svcIndex) : -1;
        };
        const onEnter = (e: Event) => {
          const i = idx(e.target as Element);
          if (i >= 0) train.setActive(i);
        };
        items.forEach((r) => {
          r.addEventListener("pointerenter", onEnter);
          r.addEventListener("focusin", onEnter);
        });

        // touch / scroll: the row nearest the viewport centre becomes active
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting) {
                const i = idx(e.target);
                if (i >= 0) train.setActive(i);
              }
            });
          },
          { rootMargin: "-45% 0px -45% 0px" },
        );
        items.forEach((r) => io.observe(r));

        const mo = new MutationObserver(() => train.setTheme(themeNow()));
        mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

        teardown = () => {
          items.forEach((r) => {
            r.removeEventListener("pointerenter", onEnter);
            r.removeEventListener("focusin", onEnter);
          });
          io.disconnect();
          mo.disconnect();
          train.dispose();
          setLive(false);
          teardown = undefined;
        };
      } catch {
        /* WebGL unavailable — list still works */
      } finally {
        booting = false;
      }
    };

    // mount when near, dispose when far (hysteresis keeps it from flapping)
    whenInteracted().then(() => {
      interacted = true;
      if (isNear) boot();
    });
    const near = new IntersectionObserver(([e]) => {
      isNear = e.isIntersecting;
      if (isNear) boot();
    }, { rootMargin: "100% 0px" });
    const far = new IntersectionObserver(([e]) => !e.isIntersecting && teardown?.(), { rootMargin: "250% 0px" });
    near.observe(el);
    far.observe(el);

    return () => {
      unmounted = true;
      near.disconnect();
      far.disconnect();
      teardown?.();
    };
  }, []);

  return (
    <div ref={box} className="relative h-[300px] w-full select-none sm:h-[380px] lg:h-[min(56vh,540px)]" aria-hidden>
      <canvas ref={canvas} className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${live ? "opacity-100" : "opacity-0"}`} />
      <div
        ref={label}
        className="pointer-events-none absolute left-0 top-0 z-10 whitespace-nowrap rounded-full border border-line-strong bg-paper/85 px-3.5 py-1.5 text-[0.8125rem] font-medium opacity-0 backdrop-blur"
        style={{ transition: "opacity .4s" }}
      />
    </div>
  );
}
