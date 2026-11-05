import { ContactActions } from "./Actions";
import { Breadcrumbs } from "./Breadcrumbs";
import { Aura } from "./Aura";

/** Section heading: mono index + serif title. Reveals on scroll. */
export function SectionHead({
  index,
  eyebrow,
  title,
  lead,
  className = "",
}: {
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="eyebrow flex items-center gap-3" data-reveal>
        {index && <span className="text-ink">{index}</span>}
        {index && <span className="h-px w-8 bg-line-strong" aria-hidden />}
        <span>{eyebrow}</span>
      </p>
      <h2 className="h2 mt-5 max-w-[20ch] md:max-w-[24ch]" data-reveal>
        {title}
      </h2>
      {lead && (
        <p className="lead mt-5" data-reveal>
          {lead}
        </p>
      )}
    </div>
  );
}

/** Top of every inner page. */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  lead,
  children,
}: {
  crumbs: { name: string; path: string }[];
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative isolate overflow-hidden">
      <Aura soft />
    <header className="wrap pt-10 pb-14 md:pt-16 md:pb-24">
      <Breadcrumbs items={crumbs} />
      <p className="eyebrow mt-12 md:mt-20">{eyebrow}</p>
      <h1 className="display mt-5 max-w-[16ch] md:max-w-[20ch]">
        {title}
      </h1>
      {lead && (
        <p className="lead mt-6">
          {lead}
        </p>
      )}
      {children && (
        <div className="mt-8 rise" style={{ ["--d" as string]: "240ms" }}>
          {children}
        </div>
      )}
    </header>
    </div>
  );
}

/** Closing call-to-action used on every page — the main lead driver. */
export function CtaBand({
  title = "Send us the drawing.",
  text = "WhatsApp a drawing or a clear photo and we will tell you which machine fits and what we need to quote.",
  message,
}: {
  title?: string;
  text?: string;
  message?: string;
}) {
  return (
    <section className="rule section-tight relative isolate overflow-hidden">
      <Aura soft />
      <div className="wrap grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
        <div>
          <p className="eyebrow" data-reveal>
            Get a quote
          </p>
          <h2 className="h2 mt-4 max-w-[18ch]" data-reveal>
            {title}
          </h2>
          <p className="lead mt-4" data-reveal>
            {text}
          </p>
        </div>
        <div data-reveal>
          <ContactActions message={message} />
          <p className="mono mt-4 text-[0.75rem] text-mute">Calls and WhatsApp: +91 76677 25967 · +91 90436 59383</p>
        </div>
      </div>
    </section>
  );
}
