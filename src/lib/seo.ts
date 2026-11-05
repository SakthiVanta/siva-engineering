import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { SITE_URL, business, addressText } from "./site";
import { services } from "./data/services";
import { areas } from "./data/areas";

export const abs = (p: string) => `${SITE_URL}${p === "/" ? "" : p}`;

/** Pre-rendered 1200x630 share image for a path (see scripts/generate-og.py); falls back to the default card. */
export function ogImage(p: string) {
  const key = p === "/" ? "default" : p.replace(/^\//, "").replace(/\//g, "-");
  const exists = fs.existsSync(path.join(process.cwd(), "public", "og", `${key}.jpg`));
  return `${SITE_URL}/og/${exists ? key : "default"}.jpg`;
}

type MetaInput = {
  title: string;
  description: string;
  path: string;
  /** set false to keep a page out of search results */
  index?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
};

/** Consistent metadata: title, description, canonical, Open Graph and Twitter. */
export function pageMeta({ title, description, path: p, index = true, type = "website", publishedTime }: MetaInput): Metadata {
  const url = abs(p);
  const image = ogImage(p);
  const imageAlt = `${title} — ${business.name}, Coimbatore`;
  return {
    title,
    description,
    alternates: { canonical: url, languages: { "en-IN": url, "x-default": url } },
    robots: index ? undefined : { index: false, follow: true },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: business.name,
      locale: "en_IN",
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt, type: "image/jpeg" }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: "summary_large_image", title, description, images: [{ url: image, alt: imageAlt }] },
  };
}

export const businessId = `${SITE_URL}/#business`;

/** LocalBusiness record used site-wide (rendered once in the root layout). */
export function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": businessId,
    name: business.name,
    description: business.description,
    url: SITE_URL,
    image: [`${SITE_URL}/og/default.jpg`, `${SITE_URL}/brand/siva-badge-512.png`],
    logo: { "@type": "ImageObject", url: `${SITE_URL}/brand/siva-badge-512.png`, width: 512, height: 512 },
    telephone: business.phones.map((p) => p.tel),
    email: business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.line1,
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: business.geo.lat, longitude: business.geo.lng },
    hasMap: business.mapsUrl,
    areaServed: [{ "@type": "City", name: "Coimbatore" }, ...areas.map((a) => ({ "@type": "Place", name: `${a.name}, Coimbatore` }))],
    identifier: { "@type": "PropertyValue", propertyID: "GSTIN", value: business.gstin },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Gear job work services",
      itemListElement: services.map((sv) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: sv.title, description: sv.blurb, url: `${SITE_URL}/services/${sv.slug}` },
      })),
    },
    potentialAction: { "@type": "CommunicateAction", name: "Request a quote on WhatsApp", target: `https://wa.me/${business.phones[0].wa}` },
    knowsAbout: ["Gear hobbing", "Gear shaping", "Keyway slotting", "Broaching", "Hob cutter grinding", "Tool and cutter grinding"],
    taxID: business.gstin,
    contactPoint: business.phones.map((p) => ({
      "@type": "ContactPoint",
      telephone: p.tel,
      contactType: "sales",
      areaServed: "IN",
    })),
    sameAs: [business.mapsUrl],
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceSchema(s: { slug: string; title: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    serviceType: s.title,
    description: s.description,
    url: abs(`/services/${s.slug}`),
    provider: { "@id": businessId },
    areaServed: { "@type": "City", name: "Coimbatore" },
  };
}

export function articleSchema(a: { slug: string; title: string; description: string; date: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    dateModified: a.date,
    mainEntityOfPage: abs(`/guides/${a.slug}`),
    author: { "@type": "Organization", name: business.name, url: SITE_URL },
    publisher: { "@id": businessId },
    image: ogImage(`/guides/${a.slug}`),
  };
}

export { addressText };

/** WebSite entity — helps engines and assistants tie the domain to the business. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: business.name,
    alternateName: ["Siva Engineering Coimbatore", "Siva Engineering Irugur"],
    inLanguage: "en-IN",
    publisher: { "@id": businessId },
  };
}
