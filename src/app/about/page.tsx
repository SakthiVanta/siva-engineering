import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero, SectionHead, CtaBand } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/Actions";
import { pageMeta } from "@/lib/seo";
import { business, addressText } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "About Siva Engineering — Gear Job Work in Coimbatore",
  description:
    "Siva Engineering is a Coimbatore machine shop offering gear wheel job work, hobbing cutter grinding, slotting and tool grinding. Learn about the shop, the machines and how to reach us.",
  path: "/about",
});

const principles = [
  { t: "One shop, many processes", d: "Hobbing, shaping, slotting, broaching and cutter grinding sit together, so a part rarely needs to leave the building." },
  { t: "Clear answers", d: "We tell you plainly what fits our machines and what does not, before you commit to anything." },
  { t: "Shown as it is", d: "The photographs on this site are our own machines on our own floor — nothing staged, nothing borrowed." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "About", path: "/about" }]}
        eyebrow="About"
        title="A machine shop built around gears."
        lead="Siva Engineering offers gear wheel job work, hobbing cutter grinding, slotting and tool grinding from Irugur, Coimbatore."
      />

      <section className="wrap grid gap-14 pb-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div className="relative mx-auto grid aspect-square w-full max-w-sm place-items-center lg:mx-0" data-reveal>
          <Image src="/brand/siva-gear.webp" alt="Siva Engineering gear logo" width={900} height={857} sizes="(min-width:1024px) 30vw, 70vw" className="h-auto w-full dark:rounded-full dark:bg-white/90 dark:p-4" />
        </div>
        <div className="prose" data-reveal>
          <p>
            We are committed to precision and quality in every project, with years of experience in gear wheel job work. Customers send us a drawing or a worn gear, and we cut it — on the right machine for the size.
          </p>
          <p>
            Our floor runs four <Link href="/services/gear-hobbing">gear hobbing</Link> machines up to Ø1250 mm, a Liebherr <Link href="/services/gear-shaping">gear shaper</Link>, two{" "}
            <Link href="/services/keyway-slotting">slotting machines</Link>, a 10-ton <Link href="/services/broaching">broaching machine</Link> and a tool and cutter grinder for{" "}
            <Link href="/services/hob-cutter-grinding">hob cutter grinding</Link>.
          </p>
          <p>
            Browse the <Link href="/machines">machine list</Link>, see who we work with on the <Link href="/clients">clients page</Link>, or{" "}
            <Link href="/contact">get in touch</Link> directly.
          </p>
        </div>
      </section>

      <section className="section rule">
        <div className="wrap">
          <SectionHead eyebrow="How we work" title="Three habits." />
          <ul className="mt-14 grid gap-10 md:grid-cols-3">
            {principles.map((p, i) => (
              <li key={p.t} className="border-t border-line-strong pt-6" data-reveal>
                <span className="eyebrow !text-ink">0{i + 1}</span>
                <h3 className="h3 mt-4">{p.t}</h3>
                <p className="mt-3 text-ink-2">{p.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-tight rule">
        <div className="wrap grid gap-10 md:grid-cols-3">
          <div data-reveal>
            <h2 className="eyebrow">Address</h2>
            <p className="mt-4 text-ink-2">{addressText}</p>
            <div className="mt-4">
              <a href={business.mapsUrl} target="_blank" rel="noopener" data-lead="map" className="u-link text-[0.9375rem]">
                Open in Google Maps ↗
              </a>
            </div>
          </div>
          <div data-reveal>
            <h2 className="eyebrow">Contact</h2>
            <p className="mt-4 grid gap-1 text-ink-2">
              {business.phones.map((p, i) => (
                <a key={p.tel} href={`tel:${p.tel}`} data-lead="call" className="hover:text-ink">
                  {p.display}
                </a>
              ))}
              <a href={`mailto:${business.email}`} data-lead="email" className="break-all hover:text-ink">
                {business.email}
              </a>
            </p>
          </div>
          <div data-reveal>
            <h2 className="eyebrow">Registration</h2>
            <p className="mono mt-4 text-[0.875rem] text-ink-2">GSTIN {business.gstin}</p>
            <div className="mt-4">
              <TextLink href="/process">How a job works</TextLink>
            </div>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
