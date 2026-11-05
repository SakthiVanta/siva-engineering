import Link from "next/link";
import { IconArrow, IconPhone, IconWhatsApp } from "./Icons";
import { primaryPhone, telHref, waHref, defaultWaMessage } from "@/lib/site";

/** WhatsApp + Call pair. Every page passes its own prefilled message. */
export function ContactActions({
  message = defaultWaMessage,
  size = "default",
  showCall = true,
  waLabel = "WhatsApp your drawing",
  className = "",
}: {
  message?: string;
  size?: "default" | "compact";
  showCall?: boolean;
  waLabel?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a href={waHref(message)} target="_blank" rel="noopener" className="btn btn-wa" data-lead="whatsapp">
        <IconWhatsApp />
        {waLabel}
      </a>
      {showCall && (
        <a href={telHref()} className="btn btn-ghost" data-lead="call">
          <IconPhone />
          {size === "compact" ? "Call" : `Call ${primaryPhone.display}`}
        </a>
      )}
    </div>
  );
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-2 text-[0.9375rem] font-medium">
      <span className="u-link">{children}</span>
      <IconArrow size={16} />
    </Link>
  );
}
