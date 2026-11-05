import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionHead, CtaBand } from "@/components/ui/Section";
import { Faq } from "@/components/ui/Faq";
import { JsonLd } from "@/components/ui/JsonLd";
import { GearPlayground } from "@/components/playground/GearPlayground";
import { TextLink } from "@/components/ui/Actions";
import { abs, businessId, faqSchema, pageMeta } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "3D Gear Playground & Gear Module Calculator",
  description:
    "Free interactive 3D gear calculator: set teeth, module, face width and bore, see pitch diameter, outside diameter and centre distance on a live 3D gear, check if it fits our machines, then send the spec for a quote.",
  path: "/gear-playground",
});

const faqs = [
  { q: "How do you calculate the pitch diameter of a gear?", a: "Pitch diameter = module × number of teeth. For a module 3 gear with 24 teeth, the pitch diameter is 72 mm." },
  { q: "How do you calculate the outside diameter of a spur gear?", a: "Outside diameter = module × (number of teeth + 2). For module 3 and 24 teeth, that is 78 mm." },
  { q: "How do you calculate the centre distance of two meshing gears?", a: "Centre distance = module × (teeth of gear 1 + teeth of gear 2) ÷ 2. Both gears must have the same module and pressure angle." },
  { q: "What is the gear ratio of two gears?", a: "Gear ratio = teeth on the driven gear ÷ teeth on the driving gear. A 12-tooth pinion driving a 24-tooth gear gives a 2:1 reduction." },
  { q: "Can Siva Engineering cut the gear I design here?", a: "The playground shows which of our hobbing and shaping machines are within range for your blank size. We confirm module, cutter and set-up against your drawing before quoting." },
];

export default function PlaygroundPage() {
  const app = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "3D Gear Playground & Gear Module Calculator",
    url: abs("/gear-playground"),
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any (web browser)",
    browserRequirements: "Requires JavaScript. 3D view requires WebGL.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    provider: { "@id": businessId },
    isPartOf: { "@id": `${SITE_URL}/#website` },
    featureList: ["Live 3D spur gear", "Gear pair meshing", "Pitch, outside and root diameter", "Centre distance and gear ratio", "Machine fit check"],
  };
  return (
    <>
      <JsonLd data={[app, faqSchema(faqs)]} />
      <PageHero
        crumbs={[{ name: "Gear playground", path: "/gear-playground" }]}
        eyebrow="3D playground"
        title={
          <>
            Design a gear. <em>See it in 3D.</em>
          </>
        }
        lead="Set the teeth, module, face width and bore. Drag the gear around, mesh it with a partner, and see whether our machines can cut it."
      />

      <section className="wrap pb-24">
        <GearPlayground />
      </section>

      <section className="section rule">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <SectionHead eyebrow="The formulas" title="Gear maths, in four lines." />
          <div data-reveal>
            <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
              {[
                ["Pitch diameter", "d = m × z"],
                ["Outside diameter", "da = m × (z + 2)"],
                ["Root diameter", "df = m × (z − 2.5)"],
                ["Centre distance", "a = m × (z₁ + z₂) ÷ 2"],
              ].map(([k, v]) => (
                <li key={k} className="bg-paper p-6">
                  <p className="eyebrow">{k}</p>
                  <p className="mono mt-3 text-[1.15rem]">{v}</p>
                </li>
              ))}
            </ul>
            <p className="prose mt-6 text-ink-2">
              <em className="not-italic text-ink">m</em> is the module in millimetres and <em className="not-italic text-ink">z</em> the number of teeth, for a standard 20° full-depth spur gear. Two gears mesh only if they share the same module and pressure angle. More in our{" "}
              <Link href="/guides/how-to-prepare-a-gear-job-work-enquiry" className="u-link">
                enquiry checklist
              </Link>{" "}
              and the{" "}
              <Link href="/guides/gear-hobbing-vs-gear-shaping" className="u-link">
                hobbing vs shaping guide
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="section rule">
        <div className="wrap grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <SectionHead eyebrow="Questions" title="Gear calculator FAQ." />
          <Faq items={faqs} schema={false} />
        </div>
      </section>

      <section className="section-tight rule">
        <div className="wrap flex flex-wrap gap-x-10 gap-y-4">
          <TextLink href="/capacity-checker">Capacity checker</TextLink>
          <TextLink href="/services/gear-hobbing">Gear hobbing</TextLink>
          <TextLink href="/services/gear-shaping">Gear shaping</TextLink>
          <TextLink href="/machines">Our machines</TextLink>
          <TextLink href="/gear-job-work-coimbatore">Gear job work in Coimbatore</TextLink>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
