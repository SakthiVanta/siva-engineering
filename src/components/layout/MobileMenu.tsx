"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IconClose, IconMenu, IconPhone, IconWhatsApp } from "@/components/ui/Icons";
import { nav, telHref, waHref, defaultWaMessage, primaryPhone } from "@/lib/site";

const extra = [
  { href: "/locations", label: "Locations" },
  { href: "/process", label: "Process" },
  { href: "/guides", label: "Guides" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="grid h-11 w-11 place-items-center rounded-full border border-line-strong lg:hidden"
      >
        <IconMenu />
      </button>

      {open &&
        createPortal(
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[80] flex flex-col bg-paper px-[var(--gutter)] pb-8 pt-4 lg:hidden"
        >
          <div className="flex items-center justify-between">
            <span className="eyebrow">Menu</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid h-11 w-11 place-items-center rounded-full border border-line-strong"
            >
              <IconClose />
            </button>
          </div>

          <nav aria-label="Mobile" className="mt-8 flex-1 overflow-y-auto">
            <ul>
              {[...nav, ...extra].map((l) => (
                <li key={l.href} className="border-t border-line first:border-t-0">
                  <Link href={l.href} className="flex items-baseline justify-between py-4 font-serif text-[2rem] leading-none">
                    {l.label}
                    <span className="eyebrow">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid gap-3 pt-6">
            <a href={waHref(defaultWaMessage)} target="_blank" rel="noopener" className="btn btn-wa" data-lead="whatsapp">
              <IconWhatsApp /> WhatsApp your drawing
            </a>
            <a href={telHref()} className="btn btn-ghost" data-lead="call">
              <IconPhone /> Call {primaryPhone.display}
            </a>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
