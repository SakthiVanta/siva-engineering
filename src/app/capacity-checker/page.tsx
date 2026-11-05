import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CtaBand } from "@/components/ui/Section";
import { CapacityChecker } from "@/components/forms/CapacityChecker";
import { machines } from "@/lib/data/machines";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Gear Capacity Checker — Will Your Part Fit?",
  description:
    "Check your gear blank against our machine limits: hobbing Ø25–1250 mm, face up to 500 mm, shaping Ø20–200 mm, keyways 5–20 mm, 10-ton broaching. Instant answer, then WhatsApp us.",
  path: "/capacity-checker",
});

export default function CapacityPage() {
  const limited = machines.filter((m) => m.limits);
  return (
    <>
      <PageHero
        crumbs={[{ name: "Capacity checker", path: "/capacity-checker" }]}
        eyebrow="Capacity checker"
        title="Will your part fit our machines?"
        lead="Enter your blank size. We compare it with the limits of each machine and show what fits. Anything outside the range is a conversation, not a no."
      />
      <section className="wrap pb-24">
        <CapacityChecker />
      </section>

      <section className="section rule">
        <div className="wrap">
          <h2 className="eyebrow mb-8">Machine limits we check against</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-left text-[0.9375rem]">
              <thead>
                <tr className="eyebrow">
                  <th className="border-t border-line py-4 pr-6 font-normal">Machine</th>
                  <th className="border-t border-line py-4 pr-6 font-normal">Diameter</th>
                  <th className="border-t border-line py-4 pr-6 font-normal">Face / key</th>
                </tr>
              </thead>
              <tbody>
                {limited.map((m) => (
                  <tr key={m.slug}>
                    <td className="border-t border-line py-4 pr-6">
                      <Link href={`/machines/${m.slug}`} className="u-link">
                        {m.name}
                      </Link>
                    </td>
                    <td className="mono border-t border-line py-4 pr-6 text-[0.8125rem]">
                      {m.limits?.minOD ? `Ø${m.limits.minOD}–${m.limits.maxOD} mm` : "—"}
                    </td>
                    <td className="mono border-t border-line py-4 pr-6 text-[0.8125rem]">
                      {m.limits?.face ? `up to ${m.limits.face} mm` : m.limits?.keyMin ? `${m.limits.keyMin}–${m.limits.keyMax} mm key` : "—"}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="border-y border-line py-4 pr-6">10-ton broaching machine</td>
                  <td className="border-y border-line py-4 pr-6 text-mute">—</td>
                  <td className="mono border-y border-line py-4 pr-6 text-[0.8125rem]">keyways &amp; splines</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-5 max-w-2xl text-[0.875rem] text-mute">
            Limits are the figures in our machine catalogue. The HMT Liebherr 400 and Cooper 250 hobbers add capacity; their fit for your part is confirmed against your drawing.
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
