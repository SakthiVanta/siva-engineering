import Link from "next/link";
import { PageHero, SectionHead, CtaBand } from "@/components/ui/Section";
import { ServiceList } from "@/components/ui/ServiceList";
import { MachineCard } from "@/components/ui/MachineCard";
import { Faq } from "@/components/ui/Faq";
import { ContactActions, TextLink } from "@/components/ui/Actions";
import { JsonLd } from "@/components/ui/JsonLd";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { machines } from "@/lib/data/machines";
import { areas, areaPath, type Area } from "@/lib/data/areas";
import { business, addressText, SITE_URL } from "@/lib/site";
import { businessId, faqSchema, abs } from "@/lib/seo";
import type { Faq as FaqItem } from "@/lib/data/services";

/** Shared template for the Irugur page and every surrounding-area page. */
export function LocalLanding({
  area,
  path,
  h1,
  eyebrow,
  lead,
  intro,
  faqs,
}: {
  area: Area;
  path: string;
  h1: React.ReactNode;
  eyebrow: string;
  lead: string;
  intro: string[];
  faqs: FaqItem[];
}) {
  const others = areas.filter((a) => a.slug !== area.slug);
  const msg = `Hi Siva Engineering, I'm in ${area.name}, Coimbatore and need gear job work. Drawing attached.`;
  const page = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": abs(path),
    url: abs(path),
    name: `Gear job work in ${area.name}, Coimbatore`,
    about: { "@id": businessId },
    mainEntity: { "@id": businessId },
    isPartOf: { "@id": `${SITE_URL}/#website` },
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".lead"] },
  };
  return (
    <>
      <JsonLd data={[page, faqSchema(faqs)]} />
      <PageHero
        crumbs={[
          { name: "Locations", path: "/locations" },
          { name: area.name, path },
        ]}
        eyebrow={eyebrow}
        title={h1}
        lead={lead}
      >
        <ContactActions message={msg} />
      </PageHero>

      <section className="wrap grid gap-14 pb-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <SectionHead eyebrow="Gear job work near you" title={`Serving ${area.name}.`} />
        <div className="prose" data-reveal>
          {intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p>
            Our core processes are <Link href="/services/gear-hobbing">gear hobbing</Link>, <Link href="/services/gear-shaping">gear shaping</Link>, <Link href="/services/keyway-slotting">keyway slotting</Link>,{" "}
            <Link href="/services/broaching">broaching</Link> and <Link href="/services/hob-cutter-grinding">hob cutter grinding</Link>. Not sure your part fits? Try the{" "}
            <Link href="/capacity-checker">capacity checker</Link> or the <Link href="/gear-playground">3D gear playground</Link>.
          </p>
        </div>
      </section>

      <section className="section rule">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHead eyebrow="Services" title={`What we cut for ${area.name} customers.`} />
          <ServiceList />
        </div>
      </section>

      <section className="section rule">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead eyebrow="Machines" title="Real machines, real limits." />
            <TextLink href="/machines">All machines</TextLink>
          </div>
          <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {machines
              .filter((m) => ["wmw-hobbing-1250", "wmw-hobbing-250", "liebherr-gear-shaper", "broaching-machine-10-ton"].includes(m.slug))
              .map((m) => (
                <MachineCard key={m.slug} m={m} />
              ))}
          </div>
        </div>
      </section>

      <section className="section rule">
        <div className="wrap grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <SectionHead eyebrow="Questions" title={`Gear job work in ${area.name}: FAQ`} />
          <Faq items={faqs} schema={false} />
        </div>
      </section>

      <section className="section rule">
        <div className="wrap grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <div>
            <SectionHead eyebrow="Get a quote" title="Send your drawing." lead="We reply by call or WhatsApp." />
            <address className="mt-8 grid gap-1 text-[0.9375rem] not-italic text-ink-2">
              <span className="text-ink">{business.name}</span>
              <span>{addressText}</span>
              {business.phones.map((p) => (
                <a key={p.tel} href={`tel:${p.tel}`} data-lead="call" className="hover:text-ink">
                  {p.display}
                </a>
              ))}
            </address>
          </div>
          <div className="frame ticks p-6 md:p-10">
            <EnquiryForm sourcePage={path} />
          </div>
        </div>
      </section>

      <section className="section-tight rule">
        <div className="wrap">
          <h2 className="eyebrow mb-6">Also serving</h2>
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[0.9375rem]">
            <li>
              <Link href="/gear-job-work-coimbatore" className="u-link">
                Coimbatore
              </Link>
            </li>
            <li>
              <Link href="/best-gear-job-work-company-coimbatore" className="u-link">
                Best gear job work company in Coimbatore
              </Link>
            </li>
            {others.map((a) => (
              <li key={a.slug}>
                <Link href={areaPath(a)} className="u-link">
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand message={msg} />
    </>
  );
}

export function areaFaqs(name: string): FaqItem[] {
  return [
    {
      q: `Where can I get gear hobbing near ${name}, Coimbatore?`,
      a: `Siva Engineering, Irugur, Coimbatore offers gear hobbing from 25 mm to 1250 mm blank diameter (face width up to 500 mm). Customers in ${name} can WhatsApp a drawing to +91 76677 25967 for a quote.`,
    },
    { q: `Do you do keyway slotting and broaching for ${name} customers?`, a: "Yes. We have two slotting machines (keyways from 5 mm to 20 mm) and a 10-ton broaching machine for keyways and splines." },
    { q: `Can you sharpen hob cutters for companies in ${name}?`, a: "Yes. We regrind hob cutters and other cutting tools on our tool and cutter grinder. Send the hob or a photo with its details." },
    { q: "What is the fastest way to get a quote?", a: "WhatsApp a drawing or clear photo to +91 76677 25967, or call +91 76677 25967 / +91 90436 59383. Include module, number of teeth, face width, material and quantity." },
    { q: "Where is the Siva Engineering shop?", a: `${addressText}.` },
  ];
}
