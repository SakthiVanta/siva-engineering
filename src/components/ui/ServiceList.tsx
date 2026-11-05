import Link from "next/link";
import { services } from "@/lib/data/services";
import { IconArrow } from "./Icons";

/** Ruled, numbered index of services. Used on home, services hub and related blocks. */
export function ServiceList({ only, withBlurb = true }: { only?: string[]; withBlurb?: boolean }) {
  const list = only ? services.filter((s) => only.includes(s.slug)) : services;
  return (
    <ul>
      {list.map((s, i) => (
        <li key={s.slug} data-reveal data-svc-index={i} data-svc-title={s.title}>
          <Link href={`/services/${s.slug}`} className="row group">
            <span className="eyebrow !text-ink">{s.num}</span>
            <span>
              <span className="block font-serif text-[1.6rem] leading-tight md:text-[2rem]">{s.title}</span>
              {withBlurb && <span className="mt-1.5 block max-w-xl text-[0.9375rem] text-ink-2">{s.blurb}</span>}
            </span>
            <IconArrow size={20} className="self-center" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
