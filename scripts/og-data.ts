// Dumps the page list used to render social-share images. Run: bun scripts/og-data.ts > scripts/og-data.json
import { services } from "../src/lib/data/services";
import { machines } from "../src/lib/data/machines";
import { guides } from "../src/lib/data/guides";
import { areas } from "../src/lib/data/areas";

const pages: { key: string; eyebrow: string; title: string; sub: string; photo?: string }[] = [
  { key: "default", eyebrow: "Gear job work · Irugur, Coimbatore", title: "Gear cutting, engineered in Coimbatore.", sub: "Hobbing up to Ø1250 mm · Shaping · Slotting · Broaching · Cutter grinding" },
  { key: "services", eyebrow: "Services", title: "Everything a gear needs, in one shop.", sub: "Six job-work processes under one roof in Coimbatore" },
  { key: "machines", eyebrow: "Machines", title: "Nine machines, all in one shop.", sub: "Hobbers, gear shaper, slotters, 10-ton broach, cutter grinder" },
  { key: "capacity-checker", eyebrow: "Capacity checker", title: "Will your gear fit our machines?", sub: "Instant check: hobbing Ø25–1250 mm, face up to 500 mm" },
  { key: "gear-playground", eyebrow: "3D gear playground", title: "Design a gear. See it in 3D.", sub: "Teeth, module, pitch diameter — then send the spec for a quote" },
  { key: "best-gear-job-work-company-coimbatore", eyebrow: "Buyer's guide", title: "Best gear job work company in Coimbatore: how to choose.", sub: "What to check before you send your drawing" },
  { key: "gear-job-work-coimbatore", eyebrow: "Coimbatore", title: "Gear job work in Coimbatore.", sub: "Hobbing, shaping, slotting, broaching, cutter grinding" },
  { key: "contact", eyebrow: "Contact", title: "Send us your drawing.", sub: "WhatsApp or call for a quick quote" },
  { key: "about", eyebrow: "About", title: "A machine shop built around gears.", sub: "Siva Engineering · Irugur, Coimbatore" },
  { key: "clients", eyebrow: "Clients", title: "Companies that trust us with their gears.", sub: "Gear makers and engineering firms around Coimbatore" },
  { key: "guides", eyebrow: "Guides", title: "Straight answers for buyers and engineers.", sub: "Hobbing vs shaping · Slotting vs broaching · Hob regrinding" },
  { key: "faq", eyebrow: "FAQ", title: "Questions, answered plainly.", sub: "Capacity, blanks, quotes and contact" },
  { key: "process", eyebrow: "How it works", title: "From drawing to dispatch, in four steps.", sub: "The simplest way to get gear job work done" },
  { key: "gallery", eyebrow: "Shop floor", title: "This is where your gears are made.", sub: "Real machines on our Irugur shop floor" },
  { key: "testimonials", eyebrow: "Customer feedback", title: "Your feedback shapes how we work.", sub: "Share how your job went" },
  ...services.map((s) => ({ key: `services-${s.slug}`, eyebrow: `Service ${s.num}`, title: s.h1, sub: s.blurb })),
  ...machines.map((m) => ({ key: `machines-${m.slug}`, eyebrow: `${m.kind} · ${m.tag}`, title: m.name, sub: m.summary, photo: m.image.src })),
  ...guides.map((g) => ({ key: `guides-${g.slug}`, eyebrow: `Guide · ${g.read} read`, title: g.title, sub: g.description })),
  { key: "locations-irugur-extra", eyebrow: "", title: "", sub: "" },
  ...areas.map((a) => ({ key: `locations-${a.slug}`, eyebrow: `${a.name}, Coimbatore`, title: `Gear job work in ${a.name}.`, sub: "Hobbing · Shaping · Slotting · Broaching · Cutter grinding" })),
  { key: "gear-job-work-irugur", eyebrow: "Irugur, Coimbatore", title: "Best gear job work in Irugur, Coimbatore.", sub: "Shop-floor machines, clear quotes, WhatsApp-first" },
].filter((p) => p.title);

console.log(JSON.stringify(pages, null, 1));
