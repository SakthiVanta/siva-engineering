import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero, CtaBand } from "@/components/ui/Section";
import { machines } from "@/lib/data/machines";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Shop Floor Gallery — Gear Machines in Coimbatore",
  description: "Photographs of the Siva Engineering shop floor: WMW and HMT Liebherr hobbers, Liebherr gear shaper, slotting machines, 10-ton broach and tool grinder.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Shop floor", path: "/gallery" }]}
        eyebrow="Shop floor"
        title="This is where your gears are made."
        lead="Unstaged photographs of our machines in Irugur, Coimbatore. Tap a photo for its specification."
      />
      <section className="wrap pb-24">
        <ul className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>li]:mb-6">
          {machines.map((m, i) => (
            <li key={m.slug} className="break-inside-avoid" data-reveal>
              <Link href={`/machines/${m.slug}`} className="group block">
                <div className="photo">
                  <Image src={m.image.src} alt={m.image.alt} width={m.image.w} height={m.image.h} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" priority={i < 2} className="h-auto" />
                </div>
                <p className="mt-3 flex items-baseline justify-between gap-4">
                  <span className="font-serif text-[1.2rem]">{m.name}</span>
                  <span className="eyebrow">{m.tag}</span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand />
    </>
  );
}
