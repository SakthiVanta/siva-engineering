import type { Metadata } from "next";
import { LocalLanding, areaFaqs } from "@/components/ui/LocalLanding";
import { areaBySlug } from "@/lib/data/areas";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Best Gear Job Work in Irugur, Coimbatore — Hobbing, Shaping, Slotting",
  description:
    "Looking for the best gear job work in Irugur, Coimbatore? Siva Engineering is based in Irugur: gear hobbing up to Ø1250 mm, shaping, keyway slotting, 10-ton broaching and hob cutter grinding. Call or WhatsApp.",
  path: "/gear-job-work-irugur",
});

export default function IrugurPage() {
  const area = areaBySlug("irugur")!;
  return (
    <LocalLanding
      area={area}
      path="/gear-job-work-irugur"
      eyebrow="Irugur, Coimbatore"
      h1={
        <>
          Best gear job work in Irugur, <em>Coimbatore</em>.
        </>
      }
      lead="Siva Engineering is based in Irugur. Walk a drawing in, see the machines, and collect finished gears."
      intro={[
        "If you are searching for the best gear job work in Irugur, the practical test is simple: can the shop cut your part, and can you see how? Our machines, their size limits and photographs of our own shop floor are listed openly on this site.",
        "We are at Lakshmi Garden, 13, Irugur, Coimbatore 641003. We cut gears on four hobbing machines (blanks up to Ø1250 mm), a Liebherr gear shaper, two slotting machines and a 10-ton broach, and we regrind hob cutters on the same site.",
      ]}
      faqs={[
        {
          q: "Is there a gear cutting shop in Irugur, Coimbatore?",
          a: "Yes. Siva Engineering is at Lakshmi Garden, 13, Irugur, Coimbatore 641003 and offers gear hobbing, gear shaping, keyway slotting, broaching and hob cutter grinding as job work.",
        },
        ...areaFaqs("Irugur"),
      ]}
    />
  );
}
