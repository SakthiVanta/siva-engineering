import Link from "next/link";
import { Brand } from "./Brand";
import { ThemeToggle } from "./ThemeToggle";
import { MobileMenu } from "./MobileMenu";
import { IconWhatsApp } from "@/components/ui/Icons";
import { nav, waHref, defaultWaMessage } from "@/lib/site";
import { services } from "@/lib/data/services";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/80 backdrop-blur-md supports-[backdrop-filter]:bg-paper/70">
      <div className="wrap flex h-[68px] items-center justify-between gap-6">
        <Brand />

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {nav.map((l) =>
            l.href === "/services" ? (
              <div key={l.href} className="group relative">
                <Link href={l.href} prefetch={false} className="text-[0.9375rem] text-ink-2 transition-colors hover:text-ink">
                  {l.label}
                </Link>
                <div className="invisible absolute left-1/2 top-full w-72 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <ul className="border border-line bg-surface p-2 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.25)]">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          prefetch={false}
                          className="flex items-baseline gap-3 px-3 py-2.5 text-[0.9375rem] text-ink-2 hover:bg-paper-2 hover:text-ink"
                        >
                          <span className="eyebrow">{s.num}</span>
                          {s.short}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link key={l.href} href={l.href} prefetch={false} className="text-[0.9375rem] text-ink-2 transition-colors hover:text-ink">
                {l.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={waHref(defaultWaMessage)}
            target="_blank"
            rel="noopener"
            data-lead="whatsapp"
            className="btn btn-primary hidden !min-h-11 !px-4 md:inline-flex"
          >
            <IconWhatsApp size={16} />
            Get a quote
          </a>
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
