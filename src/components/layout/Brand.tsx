import Image from "next/image";
import Link from "next/link";

export function Brand({ size = 36, tone = "default" }: { size?: number; tone?: "default" | "large" }) {
  return (
    <Link href="/" prefetch={false} className="inline-flex items-center gap-3" aria-label="Siva Engineering — home">
      <Image
        src="/brand/siva-badge.webp"
        alt=""
        width={size}
        height={size}
        priority
        className="rounded-full"
        style={{ width: size, height: size }}
      />
      <span
        className={`font-serif leading-none tracking-tight ${tone === "large" ? "text-[1.75rem]" : "text-[1.3rem]"}`}
      >
        Siva Engineering
      </span>
    </Link>
  );
}
