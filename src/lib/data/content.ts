import type { Faq } from "./services";

type Client = { name: string; group: string; description: string; logo: string | null; w: number; h: number; url: string };

/** Companies shown on the Clients page. Logos supplied with the original site; confirm permission before launch. */
export const clients = [
  {
    name: "Shanthi Gears",
    group: "Murugappa Group",
    description: "Industrial gears and gearboxes, Coimbatore.",
    // No logo file: the one supplied with the original site was a Nadcap accreditation badge, not Shanthi Gears.
    // Drop a real logo at /public/clients/shanthi-gears.webp and set logo/w/h here to show it.
    logo: null,
    w: 0,
    h: 0,
    url: "https://www.shanthigears.com/",
  },
  {
    name: "Nandini Gears",
    group: "Gearboxes & transmission",
    description: "Heavy-duty gearboxes and power transmission, Coimbatore.",
    logo: "/clients/nandhini-gears.webp",
    w: 480,
    h: 202,
    url: "https://nandinigears.com/",
  },
  {
    name: "Technocart",
    group: "Industrial supplies",
    description: "Industrial tools, workshop machinery and MRO supplies.",
    logo: "/clients/technocart.webp",
    w: 480,
    h: 121,
    url: "https://technocart.com/",
  },
  {
    name: "SVC Engineering",
    group: "Precision machining",
    description: "CNC machining and precision engineering, Coimbatore.",
    logo: "/clients/svc-engineering.webp",
    w: 300,
    h: 80,
    url: "https://www.svcengineering.com/",
  },
] as const satisfies readonly Client[];

/**
 * Approved customer testimonials.
 * Only add real quotes with the customer's permission — they are rendered on the
 * site and emitted as Review structured data. Leave empty until you have them.
 */
export type Testimonial = { quote: string; name: string; role?: string; company?: string };
export const testimonials: Testimonial[] = [];

export const faqs: Faq[] = [
  { q: "What is the phone number of Siva Engineering?", a: "Siva Engineering can be reached on +91 76677 25967 and +91 90436 59383. Both numbers take calls, and +91 76677 25967 is the WhatsApp number." },
  { q: "What is the address of Siva Engineering in Coimbatore?", a: "Siva Engineering is at Lakshmi Garden, 13, Irugur, Coimbatore, Tamil Nadu 641003, India." },
  { q: "What is the email address and GSTIN of Siva Engineering?", a: "Email: sivaengineering7175@gmail.com. GSTIN: 33GHCPK8483E127." },
  { q: "Who offers gear hobbing and gear cutting job work in Coimbatore?", a: "Siva Engineering in Irugur, Coimbatore offers gear hobbing (blanks from 25 mm to 1250 mm diameter, up to 500 mm face width), gear shaping, keyway slotting, 10-ton broaching and hob cutter grinding as job work." },
  { q: "How do I choose the best gear job work company in Coimbatore?", a: "Compare the machine range and size limits, whether the shop can handle your gear type (external, internal, helical), how clearly it answers quotes, and whether you can see its machines. Siva Engineering lists its machines, limits and photographs openly so you can check before you send a drawing." },
  { q: "What services does Siva Engineering offer?", a: "Gear hobbing, gear shaping, keyway slotting, broaching, and hob cutter and tool grinding — all as job work from our shop in Coimbatore." },
  { q: "What is the largest gear you can cut?", a: "Our WMW 1250 hobbing machine handles blanks up to 1250 mm in outside diameter with a face width up to 500 mm." },
  { q: "What is the smallest gear you can cut?", a: "Our WMW 250 hobbing machine takes blanks from 25 mm in outside diameter, and our Liebherr shaper from 20 mm." },
  { q: "What keyway sizes can you cut?", a: "Keyways from 5 mm to 20 mm on our slotting machines, and keyways and splines on our 10-ton broaching machine." },
  { q: "Do you cut internal gears?", a: "Yes. Internal gears and gears with close shoulders are cut on our Liebherr gear shaper (blanks up to 200 mm OD, 40 mm face)." },
  { q: "How do I request a quote?", a: "Send your drawing or a clear photo on WhatsApp or by the enquiry form. Include module, number of teeth, face width, material and quantity." },
  { q: "Do you supply the gear blanks?", a: "Gear cutting normally starts from a turned blank supplied by the customer. If you are not sure, mention it in your enquiry and we will discuss it." },
  { q: "Can you sharpen hob cutters?", a: "Yes. We regrind hob cutters and other cutting tools on our tool and cutter grinder." },
  { q: "Where are you located?", a: "Irugur, Coimbatore, Tamil Nadu. See the contact page for the address and directions." },
  { q: "How can I contact you quickly?", a: "WhatsApp or call +91 76677 25967 or +91 90436 59383. Sending your drawing on WhatsApp is usually the fastest way." },
];

export const process = [
  { n: "01", t: "Send your drawing", d: "WhatsApp a drawing or a clear photo with the key numbers: module, teeth, diameter, face width, material, quantity." },
  { n: "02", t: "We check the fit", d: "We match your part to the right machine and confirm cutter availability and set-up." },
  { n: "03", t: "Quote and schedule", d: "You get a clear quote and a delivery plan before any work starts." },
  { n: "04", t: "Machine and dispatch", d: "Your parts are cut, checked against the drawing and handed over." },
];

export const nearbyAreas = ["Irugur", "Ondipudur", "Singanallur", "Peelamedu", "Sulur", "Kurichi", "Kuniyamuthur", "Podanur"];
