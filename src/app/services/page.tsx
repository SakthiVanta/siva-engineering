import type { Metadata } from "next";
import { PageHero, CtaBand } from "@/components/ui/Section";
import { ServiceList } from "@/components/ui/ServiceList";
import { TextLink } from "@/components/ui/Actions";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Gear Cutting & Machining Services in Coimbatore",
  description:
    "Gear hobbing, gear shaping, keyway slotting, broaching, hob cutter grinding and tool & cutter grinding — job work services from Siva Engineering, Coimbatore.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Services", path: "/services" }]}
        eyebrow="Services"
        title="Everything a gear needs, in one shop."
        lead="Six job-work processes, from cutting the teeth to keyways to sharpening the tools that cut them."
      />
      <section className="wrap pb-24">
        <ServiceList />
        <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
          <TextLink href="/machines">See the machines</TextLink>
          <TextLink href="/capacity-checker">Check capacity</TextLink>
          <TextLink href="/guides">Read the guides</TextLink>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
