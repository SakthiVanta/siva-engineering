import type { Metadata } from "next";
import Link from "next/link";
import { HeroScene } from "@/components/home/HeroScene";
import { GearTrain } from "@/components/home/GearTrain";
import { Aura } from "@/components/ui/Aura";
import { ContactActions, TextLink } from "@/components/ui/Actions";
import { SectionHead } from "@/components/ui/Section";
import { ServiceList } from "@/components/ui/ServiceList";
import { MachineCard } from "@/components/ui/MachineCard";
import { ClientsStrip } from "@/components/ui/ClientsStrip";
import { CapacityChecker } from "@/components/forms/CapacityChecker";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { JsonLd } from "@/components/ui/JsonLd";
import { machineBySlug } from "@/lib/data/machines";
import { guides } from "@/lib/data/guides";
import { areas, areaPath } from "@/lib/data/areas";
import { faqs, process } from "@/lib/data/content";
import { faqSchema, pageMeta } from "@/lib/seo";
import { business, addressText, telHref, waHref } from "@/lib/site";
import { IconArrow, IconMail, IconPhone, IconPin, IconWhatsApp } from "@/components/ui/Icons";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Gear Hobbing, Shaping & Slotting Job Work in Coimbatore",
    description:
      "Siva Engineering, Coimbatore — gear hobbing up to Ø1250 mm, gear shaping, keyway slotting, 10-ton broaching and hob cutter grinding. WhatsApp your drawing for a quote.",
    path: "/",
  }),
  title: { absolute: "Gear Hobbing, Shaping & Slotting Job Work in Coimbatore | Siva Engineering" },
};

const featured = ["wmw-hobbing-1250", "liebherr-gear-shaper", "broaching-machine-10-ton", "tool-cutter-grinder"]
  .map((s) => machineBySlug(s)!)
  .filter(Boolean);

const numbers = [
  { to: 9, suffix: "", label: "Machines on the floor" },
  { to: 4, suffix: "", label: "Gear hobbing machines" },
  { to: 1250, suffix: " mm", label: "Largest gear diameter" },
  { to: 10, suffix: " t", label: "Broaching capacity" },
];

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema(faqs.slice(0, 6))} />

      {/* ───────────── Hero ───────────── */}
      <section className="relative isolate overflow-hidden">
      <Aura />
      <div className="wrap grid min-h-[calc(100svh-68px)] items-center gap-4 py-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8 lg:py-14">
        <div className="order-2 lg:order-1">
          <p className="eyebrow">Gear job work · Irugur, Coimbatore</p>
          <h1 className="display mt-6 max-w-[16ch]">
            Gear cutting, <em>engineered</em> in Coimbatore.
          </h1>
          <p className="lead mt-7">
            Gear hobbing up to Ø1250 mm, gear shaping, keyway slotting, 10-ton broaching and hob cutter grinding — under one roof. Send a drawing, get a clear answer.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5 rise" style={{ ["--d" as string]: "230ms" }}>
            <ContactActions message="Hi Siva Engineering, I'd like a quote for gear job work. Drawing attached." />
            <TextLink href="/capacity-checker">Check if it fits</TextLink>
          </div>

          <dl className="mono mt-14 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 text-[0.75rem] uppercase tracking-[0.1em] sm:grid-cols-4 fade-in" style={{ ["--d" as string]: "500ms" }}>
            {[
              ["Ø25–1250", "Hobbing, mm"],
              ["500 mm", "Max face width"],
              ["10 ton", "Broaching"],
              ["5–20 mm", "Keyways"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="text-mute">{l}</dt>
                <dd className="mt-1.5 text-[0.9rem] text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="fade-in order-1 lg:order-2" style={{ ["--d" as string]: "250ms" }}>
          <HeroScene />
        </div>
      </div>
      </section>

      {/* ───────────── Services ───────────── */}
      <section className="section rule">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead index="01" eyebrow="What we do" title="Six processes. One shop." lead="Gear cutting, keyways and tool grinding, so a part can often finish its machining without leaving the building. Hover a service to see its gear." />
            <div className="mt-10">
              <GearTrain />
            </div>
          </div>
          <ServiceList />
        </div>
      </section>

      {/* ───────────── Numbers ───────────── */}
      <section className="rule section-tight">
        <dl className="wrap grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {numbers.map((n) => (
            <div key={n.label} data-reveal>
              <dd className="whitespace-nowrap font-serif text-[clamp(2.5rem,1.6rem+3.6vw,4.5rem)] leading-none tracking-tight">
                <span data-count data-to={n.to}>
                  {n.to.toLocaleString("en-IN")}
                </span>
                {n.suffix && <span className="ml-1 font-sans text-[0.3em] tracking-normal text-mute">{n.suffix.trim()}</span>}
              </dd>
              <dt className="eyebrow mt-4">{n.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* ───────────── Machines ───────────── */}
      <section className="section rule">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead index="02" eyebrow="The shop floor" title="Real machines. Real capacity." />
            <TextLink href="/machines">All 9 machines</TextLink>
          </div>
          <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((m) => (
              <MachineCard key={m.slug} m={m} />
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Capacity ───────────── */}
      <section className="section rule bg-paper-2/60">
        <div className="wrap">
          <SectionHead index="03" eyebrow="Capacity checker" title="Will your gear fit?" lead="Enter your blank size. We check it against the limits of our machines — no sign-up." />
          <div className="mt-12">
            <CapacityChecker compact />
          </div>
        </div>
      </section>

      {/* ───────────── Playground ───────────── */}
      <section className="rule section-tight relative isolate overflow-hidden">
        <Aura soft />
        <div className="wrap grid items-end gap-8 md:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="eyebrow" data-reveal>
              3D gear playground
            </p>
            <h2 className="h2 mt-4 max-w-[20ch]" data-reveal>
              Design a gear. <em>See it in 3D.</em>
            </h2>
            <p className="lead mt-4" data-reveal>
              Set teeth, module and face width, mesh two gears, and see which of our machines can cut it — then send the spec for a quote.
            </p>
          </div>
          <div data-reveal>
            <Link href="/gear-playground" className="btn btn-primary">
              Open the playground <IconArrow size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────── Process ───────────── */}
      <section className="section rule">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHead index="04" eyebrow="How it works" title="From drawing to dispatch." lead="No lengthy back-and-forth. The fastest start is a drawing on WhatsApp." />
          <ol>
            {process.map((s) => (
              <li key={s.n} className="row" data-reveal>
                <span className="eyebrow !text-ink">{s.n}</span>
                <span>
                  <span className="block font-serif text-[1.5rem] leading-tight">{s.t}</span>
                  <span className="mt-1.5 block max-w-xl text-[0.9375rem] text-ink-2">{s.d}</span>
                </span>
                <span />
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────────── Clients ───────────── */}
      <section className="section-tight rule">
        <div className="wrap">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <p className="eyebrow">Companies we work with</p>
            <TextLink href="/clients">Our clients</TextLink>
          </div>
        </div>
        <ClientsStrip />
      </section>

      {/* ───────────── Guides ───────────── */}
      <section className="section rule">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead index="05" eyebrow="Guides" title="Straight answers for buyers." />
            <TextLink href="/guides">All guides</TextLink>
          </div>
          <ul className="mt-12 grid gap-px border border-line bg-line md:grid-cols-2">
            {guides.slice(0, 4).map((g) => (
              <li key={g.slug} className="bg-paper" data-reveal>
                <Link href={`/guides/${g.slug}`} className="group flex h-full flex-col justify-between gap-8 p-7 md:p-9">
                  <span className="font-serif text-[1.5rem] leading-snug">{g.title}</span>
                  <span className="flex items-center justify-between">
                    <span className="eyebrow">{g.read} read</span>
                    <IconArrow size={18} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────── Enquiry ───────────── */}
      <section className="section rule" id="enquiry">
        <div className="wrap grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHead index="06" eyebrow="Get a quote" title="Tell us about your part." lead="Share the basics here, then send the drawing on WhatsApp. Every enquiry is read by the shop, not a call centre." />
            <ul className="mt-10 grid gap-4 text-[0.9375rem]">
              <li>
                <a href={waHref("Hi Siva Engineering, I'd like a quote for gear job work.")} target="_blank" rel="noopener" data-lead="whatsapp" className="inline-flex items-center gap-3 hover:underline">
                  <IconWhatsApp size={18} /> WhatsApp {business.phones[0].display}
                </a>
              </li>
              {business.phones.map((p, i) => (
                <li key={p.tel}>
                  <a href={telHref(i)} data-lead="call" className="inline-flex items-center gap-3 hover:underline">
                    <IconPhone size={18} /> {p.display}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${business.email}`} data-lead="email" className="inline-flex items-center gap-3 break-all hover:underline">
                  <IconMail size={18} className="flex-none" /> {business.email}
                </a>
              </li>
              <li className="flex gap-3 text-ink-2">
                <IconPin size={18} className="mt-0.5 flex-none" />
                <span>{addressText}</span>
              </li>
            </ul>
          </div>
          <div className="frame ticks p-6 md:p-10">
            <EnquiryForm sourcePage="/" />
          </div>
        </div>
      </section>
      <section className="section-tight rule">
        <div className="wrap">
          <h2 className="eyebrow mb-5">Gear job work near you</h2>
          <ul className="flex flex-wrap gap-x-7 gap-y-2.5 text-[0.9375rem]">
            <li>
              <Link href="/best-gear-job-work-company-coimbatore" className="u-link">
                Best gear job work company in Coimbatore
              </Link>
            </li>
            <li>
              <Link href="/gear-job-work-coimbatore" className="u-link">
                Gear job work in Coimbatore
              </Link>
            </li>
            {areas.map((a) => (
              <li key={a.slug}>
                <Link href={areaPath(a)} className="u-link">
                  Gear job work in {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
