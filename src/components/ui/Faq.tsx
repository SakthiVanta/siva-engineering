import { JsonLd } from "./JsonLd";
import { faqSchema } from "@/lib/seo";
import type { Faq as FaqItem } from "@/lib/data/services";

/** Native <details> accordion — works without JS, fully crawlable, emits FAQPage JSON-LD. */
export function Faq({ items, schema = true }: { items: FaqItem[]; schema?: boolean }) {
  return (
    <div>
      {schema && <JsonLd data={faqSchema(items)} />}
      {items.map((f) => (
        <details key={f.q} className="group border-t border-line last:border-b" data-reveal>
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left">
            <h3 className="font-serif text-[1.3rem] leading-snug md:text-[1.5rem]">{f.q}</h3>
            <span aria-hidden className="mt-1.5 grid h-6 w-6 flex-none place-items-center border border-line-strong text-sm leading-none transition-transform duration-300 group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="max-w-2xl pb-7 text-ink-2">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
