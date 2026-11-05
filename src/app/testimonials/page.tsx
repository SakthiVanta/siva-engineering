import type { Metadata } from "next";
import { PageHero, SectionHead, CtaBand } from "@/components/ui/Section";
import { ReviewForm } from "@/components/forms/ReviewForm";
import { JsonLd } from "@/components/ui/JsonLd";
import { testimonials } from "@/lib/data/content";
import { business } from "@/lib/site";
import { businessId, pageMeta } from "@/lib/seo";
import { IconArrow } from "@/components/ui/Icons";

export const metadata: Metadata = pageMeta({
  title: "Customer Feedback",
  description: "What customers say about Siva Engineering's gear cutting job work in Coimbatore, and how to share your own feedback.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  const has = testimonials.length > 0;
  return (
    <>
      {has && (
        <JsonLd
          data={testimonials.map((t) => ({
            "@context": "https://schema.org",
            "@type": "Review",
            itemReviewed: { "@id": businessId },
            author: { "@type": "Person", name: t.name },
            reviewBody: t.quote,
          }))}
        />
      )}
      <PageHero
        crumbs={[{ name: "Customer feedback", path: "/testimonials" }]}
        eyebrow="Customer feedback"
        title={has ? "In their words." : "Your feedback shapes how we work."}
        lead={has ? "Notes from customers we have machined for." : "Every job teaches us something. If we have worked together, tell us how it went — and help other buyers choose."}
      />

      {has && (
        <section className="wrap pb-20">
          <ul className="grid gap-px border border-line bg-line md:grid-cols-2">
            {testimonials.map((t) => (
              <li key={t.name + t.quote.slice(0, 12)} className="bg-paper p-8 md:p-10" data-reveal>
                <blockquote className="font-serif text-[1.5rem] leading-snug">“{t.quote}”</blockquote>
                <p className="eyebrow mt-6">
                  {t.name}
                  {t.role ? ` · ${t.role}` : ""}
                  {t.company ? ` · ${t.company}` : ""}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="section rule">
        <div className="wrap grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <SectionHead eyebrow="Share your experience" title="Tell us how the job went." lead="We read every note and publish it only after review." />
            <a href={business.mapsUrl} target="_blank" rel="noopener" data-lead="map" className="group mt-10 inline-flex items-center gap-2 text-[0.9375rem] font-medium">
              <span className="u-link">Or review us on Google Maps</span>
              <IconArrow size={16} />
            </a>
          </div>
          <div className="frame ticks p-6 md:p-10">
            <ReviewForm />
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
