import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalLanding, areaFaqs } from "@/components/ui/LocalLanding";
import { areas, areaBySlug } from "@/lib/data/areas";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;
// Irugur has its own dedicated page at /gear-job-work-irugur
export const generateStaticParams = () => areas.filter((a) => !a.primary).map((a) => ({ area: a.slug }));

export async function generateMetadata({ params }: PageProps<"/locations/[area]">): Promise<Metadata> {
  const { area } = await params;
  const a = areaBySlug(area);
  if (!a || a.primary) return {};
  return pageMeta({
    title: `Gear Job Work in ${a.name}, Coimbatore — Hobbing, Slotting, Broaching`,
    description: `Gear job work for ${a.name}, Coimbatore customers from Siva Engineering, Irugur: gear hobbing up to Ø1250 mm, shaping, keyway slotting, 10-ton broaching and hob cutter grinding. WhatsApp your drawing.`,
    path: `/locations/${a.slug}`,
  });
}

export default async function AreaPage({ params }: PageProps<"/locations/[area]">) {
  const { area } = await params;
  const a = areaBySlug(area);
  if (!a || a.primary) notFound();
  return (
    <LocalLanding
      area={a}
      path={`/locations/${a.slug}`}
      eyebrow={`${a.name}, Coimbatore`}
      h1={
        <>
          Gear job work in {a.name}, <em>Coimbatore</em>.
        </>
      }
      lead={a.blurb}
      intro={[
        `Siva Engineering is a gear job-work shop in Irugur, Coimbatore, serving customers in ${a.name} and across the city. ${a.blurb}`,
        "Every machine, its size limits and photographs are listed on this site, so you can check that your part fits before you send a drawing.",
      ]}
      faqs={areaFaqs(a.name)}
    />
  );
}
