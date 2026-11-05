import Image from "next/image";
import { clients } from "@/lib/data/content";

/** Quiet, endless logo row on neutral tiles so every logo reads in both themes. */
export function ClientsStrip() {
  const row = [...clients, ...clients];
  return (
    <div className="fade-edges overflow-hidden" aria-label="Companies we work with">
      <ul className="marquee gap-5 py-2">
        {row.map((c, i) => (
          <li key={`${c.name}-${i}`} aria-hidden={i >= clients.length} className="mr-5 flex-none">
            <a
              href={c.url}
              target="_blank"
              rel="noopener nofollow"
              tabIndex={i >= clients.length ? -1 : 0}
              className="grid h-20 w-48 place-items-center border border-line bg-white px-6 grayscale transition-[filter] duration-500 hover:grayscale-0"
              aria-label={c.name}
            >
              {c.logo ? (
                <Image src={c.logo} alt={i >= clients.length ? "" : c.name} width={c.w} height={c.h} sizes="160px" className="max-h-10 w-auto object-contain" />
              ) : (
                <span className="font-serif text-[1.35rem] leading-none text-[#1b1b1d]">{c.name}</span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
