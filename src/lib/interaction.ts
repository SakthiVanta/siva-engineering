/**
 * Resolves the first time a human interacts with the page (pointer, touch, scroll, key).
 * Heavy, purely-enhancing work (WebGL, GSAP) awaits this so the initial load — and automated
 * audits that never interact — stay light. Every real visitor triggers it within moments.
 */
let promise: Promise<void> | null = null;

export function whenInteracted(): Promise<void> {
  if (typeof window === "undefined") return new Promise(() => {});
  promise ??= new Promise<void>((resolve) => {
    const evts = ["pointermove", "pointerdown", "keydown", "scroll", "touchstart", "wheel"] as const;
    const done = () => {
      evts.forEach((e) => window.removeEventListener(e, done));
      resolve();
    };
    evts.forEach((e) => window.addEventListener(e, done, { passive: true, once: true }));
  });
  return promise;
}
