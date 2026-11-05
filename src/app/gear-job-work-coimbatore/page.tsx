import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionHead, CtaBand } from "@/components/ui/Section";
import { ServiceList } from "@/components/ui/ServiceList";
import { TextLink } from "@/components/ui/Actions";
import { ContactActions } from "@/components/ui/Actions";
import { nearbyAreas } from "@/lib/data/content";
import { pageMeta } from "@/lib/seo";
import { addressText, business } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Gear Job Work in Coimbatore — Hobbing, Shaping, Slotting",
  description:
    "Looking for gear job work in Coimbatore? Siva Engineering, Irugur: gear hobbing up to Ø1250 mm, gear shaping, keyway slotting, broaching and hob cutter grinding. Call or WhatsApp.",
  path: "/gear-job-work-coimbatore",
});

export default function CoimbatorePage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Gear job work in Coimbatore", path: "/gear-job-work-coimbatore" }]}
        eyebrow="Coimbatore"
        title="Gear job work, close to your shop floor."
        lead="Siva Engineering is a gear cutting and machining job-work shop in Irugur, Coimbatore."
      >
        <ContactActions message="Hi Siva Engineering, I'm in Coimbatore and need gear job work. Drawing attached." />
      </PageHero>

      <section className="wrap grid gap-14 pb-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <SectionHead eyebrow="Why local" title="Short distances, quick answers." />
        <div className="prose" data-reveal>
          <p>
            Coimbatore has a dense cluster of pump, textile machinery, motor and engineering manufacturers, and many of them need gears cut, keyways slotted or hobs resharpened without waiting on a distant vendor. Working with a shop nearby means you can walk a drawing in, look at the machine, and collect the part when it is ready.
          </p>
          <p>
            We cover the full chain: <Link href="/services/gear-hobbing">gear hobbing</Link>, <Link href="/services/gear-shaping">gear shaping</Link>, <Link href="/services/keyway-slotting">keyway slotting</Link>,{" "}
            <Link href="/services/broaching">broaching</Link> and <Link href="/services/hob-cutter-grinding">hob cutter grinding</Link>. See the <Link href="/machines">machine list</Link> for what we run.
          </p>
          <p>
            We are at {addressText}. Units in {nearbyAreas.join(", ")} and around Coimbatore are within easy reach of our shop. Use the <Link href="/capacity-checker">capacity checker</Link> to see whether your part fits before you send it.
          </p>
        </div>
      </section>

      <section className="section rule">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHead eyebrow="Services" title="What we cut in Coimbatore." />
          <ServiceList />
        </div>
      </section>

      <section className="section-tight rule">
        <div className="wrap flex flex-wrap items-center justify-between gap-8">
          <div>
            <p className="eyebrow">Visit or call</p>
            <p className="mt-3 max-w-md text-ink-2">{addressText}</p>
          </div>
          <div className="flex flex-wrap gap-x-10 gap-y-3">
            <a href={business.mapsUrl} target="_blank" rel="noopener" data-lead="map" className="u-link">
              Directions ↗
            </a>
            <TextLink href="/contact">Contact</TextLink>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
