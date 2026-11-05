import type { Metadata } from "next";
import { PageHero, CtaBand } from "@/components/ui/Section";
import { MachineCard } from "@/components/ui/MachineCard";
import { TextLink } from "@/components/ui/Actions";
import { machines, machineKindLabel, type MachineKind } from "@/lib/data/machines";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Machines — Hobbing, Shaping, Slotting, Broaching & Grinding",
  description:
    "The Siva Engineering machine list: WMW 1250 and 250 hobbers, HMT Liebherr 400, Cooper 250, Liebherr gear shaper, two slotting machines, a 10-ton broach and a tool & cutter grinder.",
  path: "/machines",
});

const order: MachineKind[] = ["hobbing", "shaping", "slotting", "broaching", "grinding"];

export default function MachinesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Machines", path: "/machines" }]}
        eyebrow="Machines"
        title="Nine machines, all in one shop."
        lead="Photographed on our own floor. Capacity figures are the limits of each machine; we confirm every job against your drawing."
      >
        <div className="flex flex-wrap gap-x-10 gap-y-3">
          <TextLink href="/capacity-checker">Check if your part fits</TextLink>
          <TextLink href="/services">See the services</TextLink>
        </div>
      </PageHero>

      {order.map((kind) => {
        const list = machines.filter((m) => m.kind === kind);
        if (!list.length) return null;
        return (
          <section key={kind} className="rule section-tight" aria-labelledby={`k-${kind}`}>
            <div className="wrap grid gap-10 lg:grid-cols-[0.5fr_1.5fr] lg:gap-16">
              <div>
                <h2 id={`k-${kind}`} className="h3" data-reveal>
                  {machineKindLabel[kind]}
                </h2>
                <p className="eyebrow mt-3" data-reveal>
                  {list.length} {list.length === 1 ? "machine" : "machines"}
                </p>
              </div>
              <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
                {list.map((m) => (
                  <MachineCard key={m.slug} m={m} sizes="(min-width:1024px) 38vw, (min-width:640px) 45vw, 100vw" />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <CtaBand />
    </>
  );
}
