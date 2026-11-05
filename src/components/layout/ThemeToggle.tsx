"use client";

import { IconMoon, IconSun } from "@/components/ui/Icons";

/**
 * The initial theme is applied by an inline script in <head> (no flash).
 * Both icons are rendered and swapped with CSS, so there is no hydration mismatch.
 */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable — theme still applies for this visit */
    }
    window.dispatchEvent(new CustomEvent("themechange", { detail: next }));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark theme"
      className="grid h-11 w-11 place-items-center rounded-full border border-line-strong text-ink transition-colors hover:bg-ink hover:text-paper"
    >
      <span className="dark:hidden">
        <IconMoon />
      </span>
      <span className="hidden dark:block">
        <IconSun />
      </span>
    </button>
  );
}
