import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CtaBand } from "@/components/ui/Section";
import { IconArrow } from "@/components/ui/Icons";
import { guides } from "@/lib/data/guides";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Gear Cutting Guides — Hobbing, Shaping, Slotting & Broaching",
  description: "Plain-language guides from a Coimbatore gear job-work shop: hobbing vs shaping, slotting vs broaching, how to prepare an enquiry, and when to regrind hob cutters.",
  path: "/guides",
});

export default function GuidesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Guides", path: "/guides" }]}
        eyebrow="Guides"
        title="Straight answers for buyers and engineers."
        lead="Short, practical notes on choosing the right gear cutting process and getting a quote quickly."
      />
      <section className="wrap pb-24">
        <ul>
          {guides.map((g, i) => (
            <li key={g.slug} data-reveal>
              <Link href={`/guides/${g.slug}`} className="row group !grid-cols-[3rem_1fr_auto]">
                <span className="eyebrow !text-ink">0{i + 1}</span>
                <span>
                  <span className="block font-serif text-[1.5rem] leading-snug md:text-[1.9rem]">{g.title}</span>
                  <span className="mt-2 block max-w-2xl text-[0.9375rem] text-ink-2">{g.description}</span>
                  <span className="eyebrow mt-3 block">{g.read} read</span>
                </span>
                <IconArrow size={20} className="self-center" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand />
    </>
  );
}
