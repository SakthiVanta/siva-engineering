import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero, CtaBand } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/Actions";
import { clients, testimonials } from "@/lib/data/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Clients — Companies We Work With in Coimbatore",
  description:
    "Siva Engineering does gear cutting and machining job work for engineering companies in Coimbatore, including Shanthi Gears, Nandini Gears, Technocart and SVC Engineering.",
  path: "/clients",
});

export default function ClientsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Clients", path: "/clients" }]}
        eyebrow="Clients"
        title="Companies that trust us with their gears."
        lead="Engineering firms, gear makers and industrial suppliers around Coimbatore send us work — from single repair parts to repeat batches."
      />

      <section className="wrap pb-24">
        <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
          {clients.map((c) => (
            <li key={c.name} className="bg-paper" data-reveal>
              <a href={c.url} target="_blank" rel="noopener nofollow" className="group flex h-full flex-col gap-8 p-8 md:p-10">
                <div className="grid h-24 place-items-center border border-line bg-white px-6">
                  {c.logo ? (
                    <Image src={c.logo} alt={`${c.name} logo`} width={c.w} height={c.h} sizes="240px" className="max-h-14 w-auto object-contain" />
                  ) : (
                    <span className="font-serif text-[1.75rem] leading-none text-[#1b1b1d]">{c.name}</span>
                  )}
                </div>
                <div>
                  <h2 className="font-serif text-[1.75rem] leading-tight">{c.name}</h2>
                  <p className="eyebrow mt-2">{c.group}</p>
                  <p className="mt-4 text-ink-2">{c.description}</p>
                </div>
                <span className="mt-auto text-[0.875rem] text-mute group-hover:text-ink">Visit website ↗</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="section-tight rule">
        <div className="wrap grid gap-8 md:grid-cols-[1fr_1fr] md:gap-20">
          <div>
            <h2 className="h3" data-reveal>
              {testimonials.length ? "In their words" : "Worked with us?"}
            </h2>
            <p className="prose mt-4 text-ink-2" data-reveal>
              {testimonials.length ? "Feedback from customers." : "We would like to hear how the job went. Your feedback helps other buyers decide."}
            </p>
          </div>
          <div className="grid content-end gap-4" data-reveal>
            <TextLink href="/testimonials">Customer feedback</TextLink>
            <TextLink href="/services">What we do</TextLink>
            <TextLink href="/machines">Our machines</TextLink>
            <p className="text-[0.875rem] text-mute">
              Want to work with us? <Link href="/contact" className="u-link text-ink">Send an enquiry</Link>.
            </p>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
