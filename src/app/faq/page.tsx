import type { Metadata } from "next";
import { PageHero, CtaBand } from "@/components/ui/Section";
import { Faq } from "@/components/ui/Faq";
import { faqs } from "@/lib/data/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "FAQ — Gear Cutting Job Work Questions Answered",
  description: "Answers to common questions about gear hobbing, shaping, slotting, broaching and cutter grinding at Siva Engineering, Coimbatore: capacity, blanks, quotes and contact.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "FAQ", path: "/faq" }]}
        eyebrow="FAQ"
        title="Questions, answered plainly."
        lead="Can't find yours? WhatsApp us — a real person from the shop will answer."
      />
      <section className="wrap pb-24">
        <div className="max-w-3xl">
          <Faq items={faqs} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
