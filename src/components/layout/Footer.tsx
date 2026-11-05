import Link from "next/link";
import Image from "next/image";
import { Brand } from "./Brand";
import { business, addressText, telHref } from "@/lib/site";
import { services } from "@/lib/data/services";
import { machines } from "@/lib/data/machines";
import { guides } from "@/lib/data/guides";
import { areas, areaPath } from "@/lib/data/areas";
import { IconMail, IconPhone, IconPin } from "@/components/ui/Icons";

const col = "grid content-start gap-2.5 text-[0.9375rem] text-ink-2";
const link = "transition-colors hover:text-ink";

export function Footer() {
  return (
    <footer className="rule relative z-10 bg-paper">
      <div className="wrap grid gap-14 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-4">
          <Brand tone="large" size={44} />
          <p className="mt-6 max-w-xs text-[0.9375rem] text-ink-2">
            Gear hobbing, shaping, slotting, broaching and cutter grinding — job work from Coimbatore.
          </p>
          <address className="mt-8 not-italic"><ul className="grid gap-3 text-[0.9375rem]">
            {business.phones.map((p, i) => (
              <li key={p.tel}>
                <a href={telHref(i)} data-lead="call" className="inline-flex items-center gap-3 hover:underline">
                  <IconPhone size={16} /> {p.display}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${business.email}`} data-lead="email" className="inline-flex items-center gap-3 break-all hover:underline">
                <IconMail size={16} className="flex-none" /> {business.email}
              </a>
            </li>
            <li className="flex gap-3 text-ink-2">
              <IconPin size={16} className="mt-1 flex-none" />
              <a href={business.mapsUrl} target="_blank" rel="noopener" data-lead="map" className="hover:underline">
                {addressText}
              </a>
            </li>
          </ul></address>
        </div>

        <nav aria-label="Services" className="md:col-span-2">
          <h2 className="eyebrow mb-5">Services</h2>
          <ul className={col}>
            {services.map((s) => (
              <li key={s.slug}>
                <Link prefetch={false} href={`/services/${s.slug}`} className={link}>
                  {s.short}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Machines" className="md:col-span-3">
          <h2 className="eyebrow mb-5">Machines</h2>
          <ul className={col}>
            {machines.map((m) => (
              <li key={m.slug}>
                <Link prefetch={false} href={`/machines/${m.slug}`} className={link}>
                  {m.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company" className="md:col-span-3">
          <h2 className="eyebrow mb-5">Company</h2>
          <ul className={col}>
            {[
              ["/about", "About"],
              ["/clients", "Clients"],
              ["/testimonials", "Customer feedback"],
              ["/gallery", "Shop floor"],
              ["/process", "How it works"],
              ["/capacity-checker", "Capacity checker"],
              ["/gear-playground", "3D gear playground"],
              ["/gear-job-work-coimbatore", "Gear job work, Coimbatore"],
              ["/best-gear-job-work-company-coimbatore", "Best gear job work company in Coimbatore"],
              ["/gear-job-work-irugur", "Gear job work, Irugur"],
              ["/locations", "All locations"],
              ["/faq", "FAQ"],
              ["/contact", "Contact"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link prefetch={false} href={href} className={link}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="eyebrow mb-5 mt-10">Guides</h2>
          <ul className={col}>
            {guides.map((g) => (
              <li key={g.slug}>
                <Link prefetch={false} href={`/guides/${g.slug}`} className={link}>
                  {g.metaTitle.split("—")[0].trim()}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="rule">
        <nav aria-label="Areas served" className="wrap py-8">
          <h2 className="eyebrow mb-4">Gear job work near you</h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.875rem] text-ink-2">
            {areas.map((a) => (
              <li key={a.slug}>
                <Link prefetch={false} href={areaPath(a)} className={link}>
                  Gear job work in {a.name}
                </Link>
              </li>
            ))}
            <li>
              <Link prefetch={false} href="/gear-job-work-coimbatore" className={link}>
                Gear job work in Coimbatore
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="rule">
        <div className="wrap flex flex-col gap-3 py-6 text-[0.8125rem] text-mute md:flex-row md:items-center md:justify-between">
          <div className="grid gap-2">
            <p>
              © {new Date().getFullYear()} {business.name}. GSTIN {business.gstin}
            </p>
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>Designed &amp; built by</span>
              <a href="https://sakthivignesh.com" target="_blank" rel="noopener" className="font-medium text-ink-2 transition-colors hover:text-ink">
                Sakthi Vignesh
              </a>
              <span aria-hidden>·</span>
              <a href="https://vantaverse.in" target="_blank" rel="noopener" className="group inline-flex items-center gap-1.5 font-medium text-ink-2 transition-colors hover:text-ink" aria-label="Vantaverse (opens vantaverse.in)">
                <Image src="/brand/vantaverse.webp" alt="" width={20} height={20} className="rounded-[5px]" aria-hidden />
                Vantaverse
              </a>
            </p>
          </div>
          <p className="flex gap-5 md:pr-44">
            <Link prefetch={false} href="/privacy" className={link}>
              Privacy
            </Link>
            <Link prefetch={false} href="/contact" className={link}>
              Contact
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
