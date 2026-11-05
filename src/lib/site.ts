/**
 * Single source of truth for business facts.
 * Everything here comes from the company catalog (Siva Engineering Profile PDF)
 * or the Google Maps listing — nothing is invented. Edit here, it updates site-wide.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const business = {
  name: "Siva Engineering",
  tagline: "Gear job work, Coimbatore",
  description:
    "Gear hobbing, gear shaping, keyway slotting, 10-ton broaching and hob / tool cutter grinding — job work from a Coimbatore machine shop.",
  gstin: "33GHCPK8483E127", // as printed on the catalog — please verify before publishing
  email: "sivaengineering7175@gmail.com",
  phones: [
    { display: "+91 76677 25967", tel: "+917667725967", wa: "917667725967" },
    { display: "+91 90436 59383", tel: "+919043659383", wa: "919043659383" },
  ],
  // Address as listed on Google Maps (matches the Google Business Profile).
  // The printed catalog lists: S.F.No 16, Kokkali Thottam, Irugur Road, Ondipudur, Coimbatore 641016.
  address: {
    line1: "Lakshmi Garden, 13, Irugur",
    locality: "Coimbatore",
    region: "Tamil Nadu",
    postalCode: "641003",
    country: "IN",
  },
  geo: { lat: 11.0104812, lng: 77.0575586 },
  mapsUrl:
    "https://www.google.com/maps/dir//Siva+Engineering,+Lakshmi+garden,+13,+Irugur,+Coimbatore,+Tamil+Nadu+641003/@11.0104812,77.0575586,17z",
} as const;

export const primaryPhone = business.phones[0];

export const addressText = `${business.address.line1}, ${business.address.locality}, ${business.address.region} ${business.address.postalCode}`;

export const telHref = (i = 0) => `tel:${business.phones[i].tel}`;

/** Prefilled WhatsApp deep link. Every page passes its own context message. */
export function waHref(message: string, phoneIndex = 0) {
  return `https://wa.me/${business.phones[phoneIndex].wa}?text=${encodeURIComponent(message)}`;
}

export const defaultWaMessage =
  "Hi Siva Engineering, I'd like a quote for gear job work. I'll share the drawing here.";

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/machines", label: "Machines" },
  { href: "/capacity-checker", label: "Capacity" },
  { href: "/gear-playground", label: "Playground" },
  { href: "/clients", label: "Clients" },
  { href: "/about", label: "About" },
] as const;
