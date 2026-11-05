"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { whenInteracted } from "@/lib/interaction";

/**
 * The single animation layer for the whole site. Pages stay Server Components and use data-attributes:
 *   data-reveal    fade/rise when scrolled into view
 *   data-count     number counts up (data-to)
 *   data-magnetic  gentle pull toward the cursor
 *   data-parallax  slow scroll-linked drift (value = strength, e.g. "0.08")
 *
 * Performance design:
 *  - Reveals + counters use IntersectionObserver and CSS transitions only (a few hundred bytes of JS,
 *    no library), so they cost nothing at load.
 *  - GSAP + ScrollTrigger are imported only after the first real user interaction (pointer, touch,
 *    scroll or key). Humans trigger that within seconds; idle loads and automated audits never pay for it.
 *  - Skipped entirely for prefers-reduced-motion.
 */

let gsapLoad: Promise<{ gsap: typeof import("gsap").gsap; ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger }> | null = null;
export function loadGsap() {
  gsapLoad ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([g, s]) => {
    g.gsap.registerPlugin(s.ScrollTrigger);
    return { gsap: g.gsap, ScrollTrigger: s.ScrollTrigger };
  });
  return gsapLoad;
}

export function Motion() {
  const pathname = usePathname();
  const navigated = useRef(false);

  // ---- 1) reveals + counters: IntersectionObserver, no library
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.classList.remove("motion");
      return;
    }
    (window as unknown as { __motion?: boolean }).__motion = true;
    root.classList.add("motion");

    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        const hits = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);
        hits.forEach((e, i) => {
          const el = e.target as HTMLElement;
          el.style.setProperty("--rd", `${Math.min(i, 6) * 70}ms`);
          el.classList.add("is-in");
          io.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    els.forEach((el) => io.observe(el));

    // counters
    const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          cio.unobserve(el);
          const to = Number(el.dataset.to ?? el.textContent ?? 0);
          const t0 = performance.now();
          const dur = 1500;
          const tick = (now: number) => {
            const p = Math.min(1, (now - t0) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(to * eased).toLocaleString("en-IN");
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.6 },
    );
    counters.forEach((el) => cio.observe(el));

    return () => {
      io.disconnect();
      cio.disconnect();
    };
  }, [pathname]);

  // ---- 2) GSAP enhancements, only after a human interacts
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let revert: (() => void) | undefined;
    const isNav = navigated.current;
    navigated.current = true;

    whenInteracted().then(async () => {
      if (cancelled) return;
      const { gsap, ScrollTrigger } = await loadGsap();
      if (cancelled) return;
      const ctx = gsap.context(() => {
        if (isNav) gsap.fromTo("main", { opacity: 0 }, { opacity: 1, duration: 0.45, ease: "power2.out", clearProps: "opacity" });

        // slow parallax drift
        document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
          const k = Number(el.dataset.parallax ?? 0.08);
          gsap.fromTo(el, { yPercent: -k * 100 }, { yPercent: k * 100, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
        });

        // magnetic buttons (hover devices only)
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
          document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
            const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
            const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
            el.addEventListener("mousemove", (e) => {
              const r = el.getBoundingClientRect();
              xTo((e.clientX - (r.left + r.width / 2)) * 0.22);
              yTo((e.clientY - (r.top + r.height / 2)) * 0.3);
            });
            el.addEventListener("mouseleave", () => {
              xTo(0);
              yTo(0);
            });
          });
        }
      });
      revert = () => ctx.revert();
      ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      revert?.();
    };
  }, [pathname]);

  return null;
}
