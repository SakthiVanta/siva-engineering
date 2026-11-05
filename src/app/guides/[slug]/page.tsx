import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CtaBand } from "@/components/ui/Section";
import { JsonLd } from "@/components/ui/JsonLd";
import { TextLink } from "@/components/ui/Actions";
import { guides, guideBySlug } from "@/lib/data/guides";
import { serviceBySlug } from "@/lib/data/services";
import { machineBySlug } from "@/lib/data/machines";
import { articleSchema, pageMeta } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => guides.map((g) => ({ slug: g.slug }));

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const g = guideBySlug(slug);
  if (!g) return {};
  return pageMeta({ title: g.metaTitle, description: g.description, path: `/guides/${g.slug}`, type: "article", publishedTime: g.date });
}

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const g = guideBySlug(slug);
  if (!g) notFound();

  const svc = g.services.map((s) => serviceBySlug(s)).filter((s): s is NonNullable<typeof s> => !!s);
  const mach = g.machines.map((m) => machineBySlug(m)).filter((m): m is NonNullable<typeof m> => !!m);
  const others = guides.filter((x) => x.slug !== g.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={articleSchema({ slug: g.slug, title: g.title, description: g.description, date: g.date })} />

      <header className="wrap pt-10 pb-12 md:pt-16">
        <Breadcrumbs
          items={[
            { name: "Guides", path: "/guides" },
            { name: g.metaTitle.split("—")[0].trim(), path: `/guides/${g.slug}` },
          ]}
        />
        <p className="eyebrow mt-12 md:mt-20">
          Guide · {g.read} read · <time dateTime={g.date}>{new Date(g.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}</time>
        </p>
        <h1 className="display mt-5 max-w-[20ch]">
          {g.title}
        </h1>
      </header>

      <article className="wrap pb-20">
        <div className="grid gap-12 lg:grid-cols-[0.5fr_1.5fr] lg:gap-20">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="eyebrow">In this guide</h2>
            <ol className="mt-5 grid gap-3 text-[0.9375rem] text-ink-2">
              {g.sections.map((s, i) => (
                <li key={s.h}>
                  <a href={`#s${i}`} className="hover:text-ink">
                    {s.h}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <div className="max-w-2xl">
            {g.sections.map((s, i) => (
              <section key={s.h} id={`s${i}`} className="mb-12" data-reveal>
                <h2 className="h3">{s.h}</h2>
                <div className="prose mt-4">
                  {s.p.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                {s.list && (
                  <ul className="mt-5 grid gap-3 text-ink-2">
                    {s.list.map((li) => (
                      <li key={li} className="flex gap-3">
                        <span aria-hidden className="mt-3 h-px w-4 flex-none bg-ink" />
                        {li}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <div className="frame ticks mt-16 p-7 md:p-9" data-reveal>
              <h2 className="eyebrow">Related</h2>
              <ul className="mt-5 grid gap-3">
                {svc.map((s) => (
                  <li key={s.slug}>
                    <TextLink href={`/services/${s.slug}`}>{s.title} service</TextLink>
                  </li>
                ))}
                {mach.map((m) => (
                  <li key={m.slug}>
                    <TextLink href={`/machines/${m.slug}`}>{m.name}</TextLink>
                  </li>
                ))}
                <li>
                  <TextLink href="/capacity-checker">Capacity checker</TextLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </article>

      <section className="section-tight rule">
        <div className="wrap">
          <h2 className="eyebrow mb-6">More guides</h2>
          <ul>
            {others.map((x) => (
              <li key={x.slug} className="border-t border-line py-5 last:border-b">
                <Link href={`/guides/${x.slug}`} className="font-serif text-[1.4rem] leading-snug u-link">
                  {x.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand message={g.waMessage} />
    </>
  );
}
