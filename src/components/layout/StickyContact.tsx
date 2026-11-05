import Link from "next/link";
import { IconPhone, IconWhatsApp } from "@/components/ui/Icons";
import { telHref, waHref, defaultWaMessage } from "@/lib/site";

/**
 * Always-reachable lead actions.
 * Mobile: a full-width Call / WhatsApp / Enquire bar. Desktop: a quiet floating WhatsApp pill.
 * Plain server-rendered links — no JavaScript required to work.
 */
export function StickyContact() {
  return (
    <>
      <div className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
        <div className="grid grid-cols-[1fr_1.3fr_1fr] gap-2 p-2.5">
          <a href={telHref()} data-lead="call" className="btn btn-ghost !min-h-12 !px-2 text-sm">
            <IconPhone size={17} /> Call
          </a>
          <a href={waHref(defaultWaMessage)} target="_blank" rel="noopener" data-lead="whatsapp" className="btn btn-wa !min-h-12 !px-2 text-sm">
            <IconWhatsApp size={17} /> WhatsApp
          </a>
          <Link href="/contact" className="btn btn-primary !min-h-12 !px-2 text-sm">
            Enquire
          </Link>
        </div>
      </div>

      <a
        href={waHref(defaultWaMessage)}
        target="_blank"
        rel="noopener"
        data-lead="whatsapp"
        aria-label="Chat on WhatsApp"
        className="btn btn-wa no-print fixed bottom-6 right-6 z-40 hidden !min-h-12 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.45)] md:inline-flex"
      >
        <IconWhatsApp /> WhatsApp
      </a>
    </>
  );
}
