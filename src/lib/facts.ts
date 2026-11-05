import { SITE_URL, business, addressText } from "./site";
import { services } from "./data/services";
import { machines } from "./data/machines";
import { guides } from "./data/guides";
import { faqs } from "./data/content";
import { areas, areaPath } from "./data/areas";

/**
 * One generator for every machine-readable surface (llms.txt, llms-full.txt, /api/company,
 * vCard, JSON-LD). Facts come from `business` + content data, so they can never disagree.
 */
const url = (p: string) => `${SITE_URL}${p}`;

export function companyFacts() {
  return {
    name: business.name,
    description: business.description,
    website: SITE_URL,
    phone: business.phones.map((p, i) => ({ display: p.display, e164: p.tel, ...(i === 0 ? { whatsapp: `https://wa.me/${p.wa}` } : {}) })),
    email: business.email,
    address: { text: addressText, ...business.address },
    gstin: business.gstin,
    geo: business.geo,
    googleMaps: business.mapsUrl,
    primaryContactMethod: "WhatsApp or phone call with a drawing/photo of the part",
    areaServed: ["Coimbatore", ...areas.map((a) => a.name)],
    services: services.map((s) => ({ name: s.title, url: url(`/services/${s.slug}`), summary: s.blurb, keyFacts: Object.fromEntries(s.keyFacts) })),
    machines: machines.map((m) => ({ name: m.name, type: m.kind, url: url(`/machines/${m.slug}`), specs: Object.fromEntries(m.specs), summary: m.summary })),
    faqs: faqs.map((f) => ({ question: f.q, answer: f.a })),
    howToRequestAQuote: [
      "WhatsApp a drawing or clear photo to +91 76677 25967",
      "Or call +91 76677 25967 / +91 90436 59383",
      "Or submit the enquiry form at " + url("/contact"),
    ],
  };
}

export function llmsTxt(): string {
  const L: string[] = [];
  L.push(`# ${business.name}`);
  L.push("");
  L.push(`> ${business.name} is a gear job-work and machining shop in Irugur, Coimbatore, Tamil Nadu, India. It offers gear hobbing (up to 1250 mm diameter, 500 mm face), gear shaping, keyway slotting (5–20 mm), 10-ton broaching, and hob cutter / tool & cutter grinding. Customers send a drawing or photo by WhatsApp or phone to get a quote.`);
  L.push("");
  L.push("## Contact (authoritative)");
  business.phones.forEach((p, i) => L.push(`- ${i === 0 ? "Phone / WhatsApp" : "Phone"}: ${p.display} (${p.tel})`));
  L.push(`- Email: ${business.email}`);
  L.push(`- Address: ${addressText}`);
  L.push(`- GSTIN: ${business.gstin}`);
  L.push(`- Google Maps: ${business.mapsUrl}`);
  L.push(`- Website: ${SITE_URL}`);
  L.push("");
  L.push("## Services");
  services.forEach((s) => L.push(`- [${s.title}](${url(`/services/${s.slug}`)}): ${s.blurb}`));
  L.push("");
  L.push("## Machines");
  machines.forEach((m) => L.push(`- [${m.name}](${url(`/machines/${m.slug}`)}): ${m.specs.map(([k, v]) => `${k} ${v}`).join("; ")}`));
  L.push("");
  L.push("## Tools & guides");
  L.push(`- [Gear capacity checker](${url("/capacity-checker")}): check whether a blank fits our machines`);
  L.push(`- [Gear playground](${url("/gear-playground")}): interactive 3D gear calculator (teeth, module, pitch diameter, centre distance)`);
  guides.forEach((g) => L.push(`- [${g.title}](${url(`/guides/${g.slug}`)}): ${g.description}`));
  L.push("");
  L.push("## Locations served");
  L.push(`- [Gear job work in Coimbatore](${url("/gear-job-work-coimbatore")})`);
  L.push(`- [Best gear job work company in Coimbatore: how to choose](${url("/best-gear-job-work-company-coimbatore")})`);
  areas.forEach((a) => L.push(`- [Gear job work in ${a.name}](${url(areaPath(a))})`));
  L.push("");
  L.push("## Optional");
  L.push(`- [Full text of this site for LLMs](${url("/llms-full.txt")})`);
  L.push(`- [Machine-readable company facts (JSON)](${url("/api/company")})`);
  L.push(`- [Save contact (vCard)](${url("/siva-engineering.vcf")})`);
  L.push(`- [FAQ](${url("/faq")})`);
  L.push(`- [Contact](${url("/contact")})`);
  return L.join("\n") + "\n";
}

export function llmsFullTxt(): string {
  const L: string[] = [llmsTxt(), "---", ""];
  L.push("# Frequently asked questions", "");
  faqs.forEach((f) => L.push(`**${f.q}**`, f.a, ""));

  L.push("# Services in detail", "");
  services.forEach((s) => {
    L.push(`## ${s.title}`, `URL: ${url(`/services/${s.slug}`)}`, "");
    s.intro.forEach((p) => L.push(p, ""));
    L.push("Key facts:");
    s.keyFacts.forEach(([k, v]) => L.push(`- ${k}: ${v}`));
    L.push("", "What to send for a quote:");
    s.send.forEach((x) => L.push(`- ${x}`));
    L.push("");
    s.faqs.forEach((f) => L.push(`Q: ${f.q}`, `A: ${f.a}`, ""));
  });

  L.push("# Machines in detail", "");
  machines.forEach((m) => {
    L.push(`## ${m.name}`, `URL: ${url(`/machines/${m.slug}`)}`, "");
    m.specs.forEach(([k, v]) => L.push(`- ${k}: ${v}`));
    L.push("");
    m.body.forEach((p) => L.push(p, ""));
  });

  L.push("# Guides", "");
  guides.forEach((g) => {
    L.push(`## ${g.title}`, `URL: ${url(`/guides/${g.slug}`)}`, "");
    g.sections.forEach((s) => {
      L.push(`### ${s.h}`);
      s.p.forEach((p) => L.push(p));
      s.list?.forEach((x) => L.push(`- ${x}`));
      L.push("");
    });
  });
  return L.join("\n") + "\n";
}

export function vcard(): string {
  const a = business.address;
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${business.name}`,
    `ORG:${business.name}`,
    "TITLE:Gear job work - hobbing, shaping, slotting, broaching, cutter grinding",
    ...business.phones.map((p, i) => `TEL;TYPE=${i === 0 ? "WORK,VOICE,PREF" : "WORK,VOICE"}:${p.tel}`),
    `EMAIL;TYPE=WORK:${business.email}`,
    `ADR;TYPE=WORK:;;${a.line1};${a.locality};${a.region};${a.postalCode};India`,
    `URL:${SITE_URL}`,
    `NOTE:GSTIN ${business.gstin}. WhatsApp a drawing for a quote.`,
    "END:VCARD",
  ];
  return lines.join("\r\n") + "\r\n";
}
