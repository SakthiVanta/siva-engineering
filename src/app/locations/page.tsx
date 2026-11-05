import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CtaBand } from "@/components/ui/Section";
import { IconArrow } from "@/components/ui/Icons";
import { areas, areaPath } from "@/lib/data/areas";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Gear Job Work Locations — Irugur, Coimbatore & Nearby Areas",
  description:
    "Siva Engineering serves Irugur, Ondipudur, Singanallur, Peelamedu, Sulur, Kurichi, Kuniyamuthur, Saravanampatti and all of Coimbatore with gear hobbing, shaping, slotting, broaching and cutter grinding.",
  path: "/locations",
});

export default function LocationsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Locations", path: "/locations" }]}
        eyebrow="Locations"
        title="Gear job work across Coimbatore."
        lead="Based in Irugur. Send drawings from anywhere in the city by WhatsApp."
      />
      <section className="wrap pb-24">
        <ul>
          <li data-reveal>
            <Link href="/gear-job-work-coimbatore" className="row group">
              <span className="eyebrow !text-ink">00</span>
              <span className="font-serif text-[1.5rem] leading-tight">Coimbatore (all areas)</span>
              <IconArrow size={20} className="self-center" />
            </Link>
          </li>
          <li data-reveal>
            <Link href="/best-gear-job-work-company-coimbatore" className="row group">
              <span className="eyebrow !text-ink">00</span>
              <span className="font-serif text-[1.5rem] leading-tight">Best gear job work company in Coimbatore: how to choose</span>
              <IconArrow size={20} className="self-center" />
            </Link>
          </li>
          {areas.map((a, i) => (
            <li key={a.slug} data-reveal>
              <Link href={areaPath(a)} className="row group">
                <span className="eyebrow !text-ink">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block font-serif text-[1.5rem] leading-tight">Gear job work in {a.name}</span>
                  <span className="mt-1 block max-w-xl text-[0.9375rem] text-ink-2">{a.blurb}</span>
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
