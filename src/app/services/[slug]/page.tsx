import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, SectionHead, CtaBand } from "@/components/ui/Section";
import { ContactActions, TextLink } from "@/components/ui/Actions";
import { MachineCard } from "@/components/ui/MachineCard";
import { ServiceList } from "@/components/ui/ServiceList";
import { Faq } from "@/components/ui/Faq";
import { JsonLd } from "@/components/ui/JsonLd";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { services, serviceBySlug } from "@/lib/data/services";
import { machinesForService } from "@/lib/data/machines";
import { guideBySlug } from "@/lib/data/guides";
import { pageMeta, serviceSchema } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => services.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) return {};
  return pageMeta({ title: s.metaTitle, description: s.metaDescription, path: `/services/${s.slug}` });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) notFound();

  const ms = machinesForService(s.slug);
  const related = guides(s.guides);
  const relatedServices = s.related;

  return (
    <>
      <JsonLd data={serviceSchema({ slug: s.slug, title: s.title, description: s.metaDescription })} />

      <PageHero
        crumbs={[
          { name: "Services", path: "/services" },
          { name: s.title, path: `/services/${s.slug}` },
        ]}
        eyebrow={`Service ${s.num}`}
        title={s.h1}
        lead={s.blurb}
      >
        <ContactActions message={s.waMessage} />
      </PageHero>

      {/* Key facts */}
      <section className="rule">
        <dl className="wrap grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {s.keyFacts.map(([k, v]) => (
            <div key={k} className="py-7 sm:px-8 sm:first:pl-0 sm:last:pr-0" data-reveal>
              <dt className="eyebrow">{k}</dt>
              <dd className="mt-3 font-serif text-[1.4rem] leading-snug">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Overview */}
      <section className="section rule">
        <div className="wrap grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-24">
          <div>
            <SectionHead eyebrow="Overview" title={`How ${s.short.toLowerCase()} works here`} />
            <div className="prose mt-8" data-reveal>
              {s.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p>
                See the machines below, or read our{" "}
                {related[0] ? (
                  <Link href={`/guides/${related[0].slug}`}>{related[0].title.toLowerCase()}</Link>
                ) : (
                  <Link href="/guides">guides</Link>
                )}
                .
              </p>
            </div>
          </div>
          <aside className="frame ticks self-start p-7 md:p-9" data-reveal>
            <h2 className="eyebrow">What to send us</h2>
            <ul className="mt-6 grid gap-3.5 text-[0.9375rem] text-ink-2">
              {s.send.map((x) => (
                <li key={x} className="flex gap-3">
                  <span aria-hidden className="mt-2.5 h-px w-4 flex-none bg-ink" />
                  {x}
                </li>
              ))}
            </ul>
            <p className="mt-7 border-t border-line pt-5 text-[0.875rem] text-mute">Short on details? Send what you have — we will ask for the rest.</p>
          </aside>
        </div>
      </section>

      {/* Applications */}
      <section className="section-tight rule">
        <div className="wrap grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <h2 className="eyebrow" data-reveal>
            Typical applications
          </h2>
          <ul>
            {s.applications.map((a) => (
              <li key={a} className="border-t border-line py-4 font-serif text-[1.35rem] last:border-b" data-reveal>
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Machines */}
      {ms.length > 0 && (
        <section className="section rule">
          <div className="wrap">
            <SectionHead eyebrow="Machines used" title={`${ms.length === 1 ? "The machine" : "The machines"} behind it`} />
            <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {ms.map((m) => (
                <MachineCard key={m.slug} m={m} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="section rule">
        <div className="wrap grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <SectionHead eyebrow="Questions" title={`${s.short}: common questions`} />
          <Faq items={s.faqs} />
        </div>
      </section>

      {/* Enquiry */}
      <section className="section rule">
        <div className="wrap grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <SectionHead eyebrow="Get a quote" title={`Quote for ${s.short.toLowerCase()}`} lead="Fill in what you know. We will reply by call or WhatsApp." />
          <div className="frame ticks p-6 md:p-10">
            <EnquiryForm sourcePage={`/services/${s.slug}`} defaultService={s.title} />
          </div>
        </div>
      </section>

      {/* Interlinks */}
      <section className="section-tight rule">
        <div className="wrap grid gap-12 lg:grid-cols-2 lg:gap-24">
          <div>
            <h2 className="eyebrow mb-4">Related services</h2>
            <ServiceList only={relatedServices} withBlurb={false} />
          </div>
          <div>
            <h2 className="eyebrow mb-4">Read next</h2>
            <ul>
              {related.map((g) => (
                <li key={g.slug} className="border-t border-line py-5 last:border-b">
                  <Link href={`/guides/${g.slug}`} className="font-serif text-[1.35rem] leading-snug u-link">
                    {g.title}
                  </Link>
                </li>
              ))}
              <li className="border-t border-line py-5 last:border-b">
                <TextLink href="/capacity-checker">Check whether your part fits</TextLink>
              </li>
              <li className="border-t border-line py-5 last:border-b">
                <TextLink href="/gear-job-work-coimbatore">Gear job work in Coimbatore</TextLink>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <CtaBand message={s.waMessage} />
    </>
  );
}

function guides(slugs: string[]) {
  return slugs.map((g) => guideBySlug(g)).filter((g): g is NonNullable<typeof g> => !!g);
}
