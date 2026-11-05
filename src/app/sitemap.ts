import type { MetadataRoute } from "next";
import { abs } from "@/lib/seo";
import { services } from "@/lib/data/services";
import { machines } from "@/lib/data/machines";
import { guides } from "@/lib/data/guides";
import { areas } from "@/lib/data/areas";
import { SITE_URL } from "@/lib/site";

// Update when content materially changes. A fixed date is more honest than "now" on every build.
const UPDATED = new Date("2026-11-05");

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly", lastModified = UPDATED, images?: string[]) => ({
    url: abs(path),
    ...(images ? { images } : {}),
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    entry("/", 1, "weekly"),
    entry("/services", 0.9),
    ...services.map((s) => entry(`/services/${s.slug}`, 0.9)),
    entry("/machines", 0.8),
    ...machines.map((m) => entry(`/machines/${m.slug}`, 0.7, "monthly", UPDATED, [`${SITE_URL}${m.image.src}`])),
    entry("/capacity-checker", 0.8),
    entry("/gear-playground", 0.8),
    entry("/best-gear-job-work-company-coimbatore", 0.9),
    entry("/gear-job-work-irugur", 0.9),
    entry("/locations", 0.7),
    ...areas.filter((a) => !a.primary).map((a) => entry(`/locations/${a.slug}`, 0.7)),
    entry("/gear-job-work-coimbatore", 0.8),
    entry("/contact", 0.8),
    entry("/about", 0.6),
    entry("/clients", 0.6),
    entry("/testimonials", 0.5),
    entry("/gallery", 0.5),
    entry("/process", 0.6),
    entry("/faq", 0.6),
    entry("/guides", 0.7),
    ...guides.map((g) => entry(`/guides/${g.slug}`, 0.6, "yearly", new Date(g.date))),
    entry("/privacy", 0.2, "yearly"),
  ];
}
