import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionHead, CtaBand } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/Actions";
import { process } from "@/lib/data/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "How Gear Job Work Works — From Drawing to Dispatch",
  description: "How to get gear cutting job work done at Siva Engineering, Coimbatore: send a drawing, we check the fit, you get a quote, we machine and dispatch.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "How it works", path: "/process" }]}
        eyebrow="How it works"
        title="From drawing to dispatch, in four steps."
        lead="Job work should not be complicated. Here is exactly what happens when you send us a part."
      />
      <section className="wrap pb-24">
        <ol>
          {process.map((s) => (
            <li key={s.n} className="grid gap-4 border-t border-line py-10 last:border-b md:grid-cols-[6rem_1fr_1.2fr] md:gap-12" data-reveal>
              <span className="font-serif text-[3rem] leading-none text-silver">{s.n}</span>
              <h2 className="h3">{s.t}</h2>
              <p className="text-ink-2">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section rule">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <SectionHead eyebrow="Before you send" title="Have these ready." />
          <div className="prose" data-reveal>
            <p>
              A drawing (or the worn gear), module, number of teeth, pressure angle, face width, material and quantity cover most quotes. The{" "}
              <Link href="/guides/how-to-prepare-a-gear-job-work-enquiry">full enquiry checklist</Link> lists everything, and the{" "}
              <Link href="/capacity-checker">capacity checker</Link> shows which machine your blank fits.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-3">
              <TextLink href="/services">Our services</TextLink>
              <TextLink href="/faq">Common questions</TextLink>
            </div>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
