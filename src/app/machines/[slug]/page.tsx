import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, SectionHead, CtaBand } from "@/components/ui/Section";
import { ContactActions, TextLink } from "@/components/ui/Actions";
import { MachineCard } from "@/components/ui/MachineCard";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { JsonLd } from "@/components/ui/JsonLd";
import { machines, machineBySlug, machineKindLabel } from "@/lib/data/machines";
import { serviceBySlug } from "@/lib/data/services";
import { pageMeta, serviceSchema } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => machines.map((m) => ({ slug: m.slug }));

export async function generateMetadata({ params }: PageProps<"/machines/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const m = machineBySlug(slug);
  if (!m) return {};
  const specs = m.specs.map(([k, v]) => `${k} ${v}`).join(", ");
  return pageMeta({
    title: `${m.name} — ${machineKindLabel[m.kind]} in Coimbatore`,
    description: `${m.name} at Siva Engineering, Coimbatore. ${specs}. ${m.summary}`,
    path: `/machines/${m.slug}`,
  });
}

export default async function MachinePage({ params }: PageProps<"/machines/[slug]">) {
  const { slug } = await params;
  const m = machineBySlug(slug);
  if (!m) notFound();

  const service = serviceBySlug(m.service)!;
  const siblings = machines.filter((x) => x.kind === m.kind && x.slug !== m.slug);
  const more = [...siblings, ...machines.filter((x) => x.kind !== m.kind)].slice(0, 3);
  const msg = `Hi Siva Engineering, I'd like a quote for a job on your ${m.name}. Details: OD ___ mm, face ___ mm, qty ___. Drawing attached.`;

  return (
    <>
      <JsonLd data={serviceSchema({ slug: service.slug, title: service.title, description: m.summary })} />

      <PageHero
        crumbs={[
          { name: "Machines", path: "/machines" },
          { name: m.name, path: `/machines/${m.slug}` },
        ]}
        eyebrow={`${machineKindLabel[m.kind]} · ${m.tag}`}
        title={m.name}
        lead={m.summary}
      >
        <ContactActions message={msg} />
      </PageHero>

      <section className="wrap pb-20">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
          <div className={`photo frame ticks ${m.image.h > m.image.w ? "mx-auto aspect-[3/4] w-full max-w-md lg:max-w-none" : "aspect-[4/3] md:aspect-[16/10]"}`}>
            <Image src={m.image.src} alt={m.image.alt} width={m.image.w} height={m.image.h} priority sizes="(min-width:1024px) 60vw, 100vw" className="object-cover" />
          </div>

          <div className="grid content-start gap-10">
            <div>
              <h2 className="eyebrow">Specification</h2>
              <dl className="mt-5">
                {m.specs.map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-6 border-t border-line py-4 last:border-b" data-reveal>
                    <dt className="text-[0.9375rem] text-ink-2">{k}</dt>
                    <dd className="mono text-right text-[0.875rem]">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-[0.8125rem] text-mute">Figures as listed in our machine catalogue. We confirm each job against your drawing.</p>
            </div>
            <div>
              <h2 className="eyebrow">Best for</h2>
              <ul className="mt-5 grid gap-2.5 text-[0.9375rem] text-ink-2">
                {m.bestFor.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span aria-hidden className="mt-2.5 h-px w-4 flex-none bg-ink" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section rule">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <SectionHead eyebrow="About this machine" title="What it is used for" />
          <div className="prose" data-reveal>
            {m.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p>
              This machine runs our{" "}
              <Link href={`/services/${service.slug}`}>{service.title.toLowerCase()}</Link> work. Not sure it suits your part? Try the{" "}
              <Link href="/capacity-checker">capacity checker</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="section rule">
        <div className="wrap grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <SectionHead eyebrow="Get a quote" title={`Run a job on the ${m.name.split(" ").slice(0, 2).join(" ")}`} lead="Tell us the basics. We reply by call or WhatsApp." />
          <div className="frame ticks p-6 md:p-10">
            <EnquiryForm sourcePage={`/machines/${m.slug}`} defaultService={service.title} defaultMachine={m.name} />
          </div>
        </div>
      </section>

      <section className="section rule">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="h3">More machines</h2>
            <TextLink href="/machines">All machines</TextLink>
          </div>
          <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((x) => (
              <MachineCard key={x.slug} m={x} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand message={msg} />
    </>
  );
}
