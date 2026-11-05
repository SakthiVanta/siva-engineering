/**
 * Areas around Coimbatore used for local landing pages.
 * Copy is deliberately factual: we state where the shop is and how to reach it, and we do NOT
 * invent distances, drive times or customer claims for any area.
 */
export type Area = { slug: string; name: string; primary?: boolean; blurb: string };

export const areas: Area[] = [
  { slug: "irugur", name: "Irugur", primary: true, blurb: "Our shop is in Irugur, so customers here can walk a drawing in and collect finished parts." },
  { slug: "ondipudur", name: "Ondipudur", blurb: "Ondipudur is near Irugur — send drawings by WhatsApp or bring the part in person." },
  { slug: "singanallur", name: "Singanallur", blurb: "Units in Singanallur can WhatsApp drawings for a quick feasibility check against our machines." },
  { slug: "peelamedu", name: "Peelamedu", blurb: "Peelamedu manufacturers can send a drawing or photo and get a clear quote by call or WhatsApp." },
  { slug: "sulur", name: "Sulur", blurb: "Sulur-side workshops can use our capacity checker first, then send the part." },
  { slug: "kurichi", name: "Kurichi", blurb: "Kurichi and Podanur units can reach us by phone or WhatsApp for gear cutting, slotting and cutter grinding." },
  { slug: "kuniyamuthur", name: "Kuniyamuthur", blurb: "Kuniyamuthur customers can send drawings on WhatsApp and talk through how to get the parts to us." },
  { slug: "saravanampatti", name: "Saravanampatti", blurb: "Saravanampatti and the north side of Coimbatore can use WhatsApp for drawings and quotes." },
];

export const areaBySlug = (slug: string) => areas.find((a) => a.slug === slug);

/** Irugur has its own dedicated landing page; every other area uses the shared template. */
export const areaPath = (a: Area) => (a.primary ? "/gear-job-work-irugur" : `/locations/${a.slug}`);
