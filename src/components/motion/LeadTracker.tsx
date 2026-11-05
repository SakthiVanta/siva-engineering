"use client";

import { useEffect } from "react";

/**
 * Records taps on call / WhatsApp / email / map links as lead events.
 * One delegated listener (no per-link JS); uses sendBeacon so it never delays the tap.
 */
export function LeadTracker() {
  useEffect(() => {
    const map: Record<string, string> = { whatsapp: "whatsapp_click", call: "call_click", email: "email_click", map: "map_click" };

    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-lead]");
      if (!el) return;
      const type = map[el.dataset.lead ?? ""];
      if (!type) return;
      const body = JSON.stringify({
        type,
        page: location.pathname,
        label: (el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 80),
      });
      try {
        if (navigator.sendBeacon) navigator.sendBeacon("/api/events", new Blob([body], { type: "application/json" }));
        else fetch("/api/events", { method: "POST", body, keepalive: true, headers: { "Content-Type": "application/json" } });
      } catch {
        /* tracking must never break the click */
      }
    };

    document.addEventListener("click", onClick, { passive: true });
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
