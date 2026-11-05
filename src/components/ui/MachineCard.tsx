import Image from "next/image";
import Link from "next/link";
import type { Machine } from "@/lib/data/machines";

export function MachineCard({ m, priority = false, sizes = "(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" }: { m: Machine; priority?: boolean; sizes?: string }) {
  return (
    <Link href={`/machines/${m.slug}`} className="group block" data-reveal>
      <div className="photo aspect-[4/3]">
        <Image src={m.image.src} alt={m.image.alt} width={m.image.w} height={m.image.h} sizes={sizes} priority={priority} className={m.image.h > m.image.w ? "object-cover object-[50%_28%]" : "object-cover"} />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-[1.35rem] leading-tight">{m.name}</h3>
      </div>
      <p className="eyebrow mt-2">{m.tag}</p>
      <p className="mt-3 text-[0.9375rem] text-ink-2">{m.summary}</p>
    </Link>
  );
}
