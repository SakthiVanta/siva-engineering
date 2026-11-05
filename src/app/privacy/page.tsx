import type { Metadata } from "next";
import { PageHero } from "@/components/ui/Section";
import { pageMeta } from "@/lib/seo";
import { business } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Privacy",
  description: "How Siva Engineering handles the details you send through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Privacy", path: "/privacy" }]} eyebrow="Privacy" title="Your details, handled simply." />
      <section className="wrap pb-24">
        <div className="prose max-w-2xl">
          <p>
            When you send an enquiry we store the information you enter — name, phone, email, company and the component details — so we can reply to you. We also store the page you sent it from and a one-way hashed
            identifier of your connection to help us stop spam. We never store your raw IP address.
          </p>
          <p>
            We count taps on call, WhatsApp, email and map links, with the page they came from, to understand which pages bring enquiries. No advertising trackers are used and your details are not sold or shared.
          </p>
          <p>
            Reviews you submit are held until we approve them. To see or delete what we hold about you, email{" "}
            <a href={`mailto:${business.email}`}>{business.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
