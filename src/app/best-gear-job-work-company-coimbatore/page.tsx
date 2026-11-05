import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionHead, CtaBand } from "@/components/ui/Section";
import { ContactActions, TextLink } from "@/components/ui/Actions";
import { Faq } from "@/components/ui/Faq";
import { JsonLd } from "@/components/ui/JsonLd";
import { areas, areaPath } from "@/lib/data/areas";
import { businessId, faqSchema, abs } from "@/lib/seo";
import { pageMeta } from "@/lib/seo";
import { SITE_URL, business, addressText } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Best Gear Job Work Company in Coimbatore — How to Choose (2026)",
  description:
    "Searching for the best gear job work company in Coimbatore? A buyer's checklist: machine range, size limits, gear types, quotes, location and proof — and how Siva Engineering in Irugur measures up on each.",
  path: "/best-gear-job-work-company-coimbatore",
});

const criteria = [
  {
    t: "Machine range and size limits",
    check: "Ask for the actual machines and their diameter and face-width limits, not a general claim. A good shop tells you what it cannot do.",
    us: "Four hobbers (WMW 1250: Ø200–1250 mm, 500 mm face; WMW 250: Ø25–250 mm, 200 mm face; HMT Liebherr 400; Cooper 250), a Liebherr gear shaper (Ø20–200 mm, 40 mm face), two slotters (keys 5–20 mm) and a 10-ton broach — all listed with photographs.",
    href: "/machines",
    link: "See every machine",
  },
  {
    t: "The right process for your gear",
    check: "External gears hob well; internal gears and gears with a close shoulder need shaping. A shop with only one process may force a poor fit.",
    us: "Hobbing and shaping, plus keyway slotting and broaching, in one shop — so the part is cut by the process that suits it.",
    href: "/guides/gear-hobbing-vs-gear-shaping",
    link: "Hobbing vs shaping",
  },
  {
    t: "Tool care",
    check: "A worn hob quietly ruins gear quality. Check whether the shop can regrind its own cutters.",
    us: "We regrind hob cutters and other cutting tools on our own tool and cutter grinder.",
    href: "/services/hob-cutter-grinding",
    link: "Hob cutter grinding",
  },
  {
    t: "Clear, quick quotes",
    check: "You should be able to send a drawing and get a straight answer without a long back-and-forth.",
    us: "Send a drawing or photo on WhatsApp (+91 76677 25967) or call. Our capacity checker and 3D gear playground let you test a part before you even message.",
    href: "/capacity-checker",
    link: "Capacity checker",
  },
  {
    t: "Proof you can see",
    check: "Ask to see the machines. Photographs of the real shop floor, and the ability to visit, matter more than stock images.",
    us: "Every photograph on this site is our own machine on our own floor in Irugur, and you are welcome to visit.",
    href: "/gallery",
    link: "Shop floor gallery",
  },
  {
    t: "Location and registration",
    check: "A nearby, registered business makes drop-off, collection and follow-up simple.",
    us: `We are at ${addressText}, GSTIN ${business.gstin}.`,
    href: "/gear-job-work-irugur",
    link: "Gear job work in Irugur",
  },
  {
    t: "Customer references",
    check: "Ask for companies the shop works with, and speak to them if you can.",
    us: "Companies we work with are listed on our clients page.",
    href: "/clients",
    link: "Our clients",
  },
];

const faqs = [
  {
    q: "How do I choose the best gear job work company in Coimbatore?",
    a: "Compare the machine range and size limits, whether the shop can handle your gear type (external, internal, helical), how clearly it answers quotes, whether it can regrind its own hob cutters, and whether you can see its machines and speak to its customers.",
  },
  {
    q: "Which company offers gear hobbing and shaping in Irugur, Coimbatore?",
    a: "Siva Engineering at Lakshmi Garden, 13, Irugur, Coimbatore 641003 offers gear hobbing (up to Ø1250 mm), gear shaping, keyway slotting, 10-ton broaching and hob cutter grinding. Call or WhatsApp +91 76677 25967.",
  },
  {
    q: "What should I send to get a gear job work quote?",
    a: "A drawing or the worn gear, module, number of teeth, pressure angle, face width, material and quantity. See our enquiry checklist for the full list.",
  },
];

export default function BestPage() {
  const page = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": abs("/best-gear-job-work-company-coimbatore"),
    url: abs("/best-gear-job-work-company-coimbatore"),
    name: "Best gear job work company in Coimbatore: how to choose",
    about: { "@id": businessId },
    isPartOf: { "@id": `${SITE_URL}/#website` },
    datePublished: "2026-11-05",
    dateModified: "2026-11-05",
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".lead"] },
  };
  return (
    <>
      <JsonLd data={[page, faqSchema(faqs)]} />
      <PageHero
        crumbs={[
          { name: "Locations", path: "/locations" },
          { name: "Best gear job work company in Coimbatore", path: "/best-gear-job-work-company-coimbatore" },
        ]}
        eyebrow="Buyer's guide · Coimbatore"
        title={
          <>
            Best gear job work company in <em>Coimbatore</em>: how to choose.
          </>
        }
        lead="Seven things to check before you send a drawing to any gear job-work shop in Coimbatore — and how Siva Engineering in Irugur measures up on each."
      >
        <ContactActions message="Hi Siva Engineering, I read your guide on choosing a gear job work company in Coimbatore. I'd like a quote. Drawing attached." />
      </PageHero>

      <section className="wrap pb-24">
        <ol>
          {criteria.map((c, i) => (
            <li key={c.t} className="grid gap-5 border-t border-line py-10 last:border-b md:grid-cols-[4rem_0.9fr_1.1fr] md:gap-12" data-reveal>
              <span className="eyebrow !text-ink">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h2 className="h3">{c.t}</h2>
                <p className="mt-3 text-ink-2">
                  <span className="eyebrow mr-2">Check</span>
                  {c.check}
                </p>
              </div>
              <div>
                <p className="text-ink-2">
                  <span className="eyebrow mr-2 !text-ink">Siva Engineering</span>
                  {c.us}
                </p>
                <div className="mt-4">
                  <TextLink href={c.href}>{c.link}</TextLink>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="section rule">
        <div className="wrap grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <SectionHead eyebrow="At a glance" title="Siva Engineering, Irugur." />
          <dl className="grid gap-px border border-line bg-line sm:grid-cols-2" data-reveal>
            {[
              ["Location", addressText],
              ["Phone / WhatsApp", `${business.phones[0].display} · ${business.phones[1].display}`],
              ["Email", business.email],
              ["Hobbing range", "Ø25 mm – Ø1250 mm, face up to 500 mm"],
              ["Gear shaping", "Ø20 mm – Ø200 mm, face up to 40 mm"],
              ["Slotting / broaching", "Keys 5–20 mm · 10-ton broach"],
            ].map(([k, v]) => (
              <div key={k} className="bg-paper p-6">
                <dt className="eyebrow">{k}</dt>
                <dd className="mt-3 break-words text-[0.9375rem]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section rule">
        <div className="wrap grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <SectionHead eyebrow="Questions" title="Choosing a gear job work company." />
          <Faq items={faqs} schema={false} />
        </div>
      </section>

      <section className="section-tight rule">
        <div className="wrap">
          <h2 className="eyebrow mb-6">Gear job work by area</h2>
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[0.9375rem]">
            <li>
              <Link href="/gear-job-work-coimbatore" className="u-link">
                Coimbatore
              </Link>
            </li>
            {areas.map((a) => (
              <li key={a.slug}>
                <Link href={areaPath(a)} className="u-link">
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
