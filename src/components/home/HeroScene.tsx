"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { whenInteracted } from "@/lib/interaction";

/**
 * Decorative 3D gear pair. Strictly progressive:
 *  1. Server renders a static logo (instant, zero JS) — this is what crawlers and slow devices see.
 *  2. After hydration + idle, if the device is eligible (WebGL, motion allowed, not data-saver),
 *     Three.js is imported on demand and the canvas fades over the logo.
 *  3. The loop pauses off-screen / in background tabs, and everything is disposed on unmount.
 */
export function HeroScene() {
  const box = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = box.current;
    const cv = canvas.current;
    if (!el || !cv) return;

    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      conn?.saveData ||
      conn?.effectiveType === "2g" ||
      conn?.effectiveType === "slow-2g"
    )
      return;

    let cancelled = false;
    let dispose: (() => void) | undefined;
    let mo: MutationObserver | undefined;
    let idle: number | undefined;

    const boot = async () => {
      try {
        const probe = document.createElement("canvas");
        if (!(probe.getContext("webgl2") || probe.getContext("webgl"))) return;
        const { createGearScene } = await import("./gear-scene");
        if (cancelled) return;
        const themeNow = () => (document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");
        const scene = createGearScene(el, cv, themeNow(), () => setLive(true));
        dispose = scene.dispose;
        mo = new MutationObserver(() => scene.setTheme(themeNow()));
        mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
      } catch {
        /* WebGL failed — the static logo stays, nothing breaks */
      }
    };

    // Heavy WebGL work waits for the first real interaction so the initial load stays light.
    whenInteracted().then(() => {
      if (cancelled) return;
      const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
      if (w.requestIdleCallback) idle = w.requestIdleCallback(boot, { timeout: 1500 });
      else idle = window.setTimeout(boot, 200);
    });

    return () => {
      cancelled = true;
      mo?.disconnect();
      dispose?.();
      if (idle !== undefined) { if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idle); clearTimeout(idle); }
    };
  }, []);

  return (
    <div ref={box} className="relative h-[250px] w-full select-none sm:h-[340px] lg:h-[min(78svh,780px)]" aria-hidden>
      {/* static fallback — always present, hidden once the canvas is drawing */}
      <div className={`absolute inset-0 grid place-items-center transition-opacity duration-700 ${live ? "opacity-0" : "opacity-100"}`}>
        <Image
          src="/brand/siva-badge-lg.webp"
          alt=""
          width={512}
          height={512}
          sizes="(min-width:1024px) 420px, 60vw"
          priority
          className="w-[62%] rounded-full opacity-90"
        />
      </div>
      <canvas ref={canvas} className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${live ? "opacity-100" : "opacity-0"}`} />
    </div>
  );
}
