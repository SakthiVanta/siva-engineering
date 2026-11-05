import type { Metadata } from "next";
import { PageHero } from "@/components/ui/Section";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { IconMail, IconPhone, IconPin, IconWhatsApp } from "@/components/ui/Icons";
import { TextLink } from "@/components/ui/Actions";
import { pageMeta } from "@/lib/seo";
import { business, addressText, telHref, waHref } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Contact — Request a Gear Cutting Quote in Coimbatore",
  description: "Contact Siva Engineering, Irugur, Coimbatore. Call or WhatsApp +91 76677 25967 / +91 90436 59383, email, or send an enquiry with your drawing details.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Contact", path: "/contact" }]}
        eyebrow="Contact"
        title="Send us your drawing."
        lead="The fastest way is WhatsApp or a call. Prefer a form? Use the one below and we will reply."
      />

      <section className="wrap grid gap-14 pb-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="grid content-start gap-10">
          <div className="grid gap-3">
            <a href={waHref("Hi Siva Engineering, I'd like a quote for gear job work. I'll share the drawing here.")} target="_blank" rel="noopener" data-lead="whatsapp" className="btn btn-wa">
              <IconWhatsApp /> WhatsApp {business.phones[0].display}
            </a>
            {business.phones.map((p, i) => (
              <a key={p.tel} href={telHref(i)} data-lead="call" className="btn btn-ghost">
                <IconPhone /> Call {p.display}
              </a>
            ))}
          </div>

          <ul className="grid gap-6 text-[0.9375rem]">
            <li className="flex gap-4">
              <IconMail size={18} className="mt-1 flex-none" />
              <div>
                <p className="eyebrow">Email</p>
                <a href={`mailto:${business.email}`} data-lead="email" className="mt-2 inline-block break-all u-link">
                  {business.email}
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <IconPin size={18} className="mt-1 flex-none" />
              <div>
                <p className="eyebrow">Workshop</p>
                <p className="mt-2 text-ink-2">{addressText}</p>
                <a href={business.mapsUrl} target="_blank" rel="noopener" data-lead="map" className="mt-2 inline-block u-link">
                  Get directions ↗
                </a>
              </div>
            </li>
            <li>
              <p className="eyebrow">GSTIN</p>
              <p className="mono mt-2 text-[0.875rem] text-ink-2">{business.gstin}</p>
            </li>
          </ul>

          <div className="grid gap-3">
            <TextLink href="/capacity-checker">Check capacity first</TextLink>
            <TextLink href="/services">Browse services</TextLink>
          </div>
        </div>

        <div className="frame ticks p-6 md:p-10">
          <EnquiryForm sourcePage="/contact" />
        </div>
      </section>
    </>
  );
}
