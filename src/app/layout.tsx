import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyContact } from "@/components/layout/StickyContact";
import { Motion } from "@/components/motion/Motion";
import { LeadTracker } from "@/components/motion/LeadTracker";
import { JsonLd } from "@/components/ui/JsonLd";
import { businessSchema, websiteSchema } from "@/lib/seo";
import { SITE_URL, business } from "@/lib/site";

// One refined neo-grotesque (SF / Google-product feel). The opsz axis switches to a tighter
// "display" cut automatically at large sizes, so headlines look crafted rather than scaled-up body text.
const body = Inter({ variable: "--font-body", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Gear Hobbing, Shaping & Slotting Job Work in Coimbatore | Siva Engineering",
    template: "%s | Siva Engineering",
  },
  description:
    "Siva Engineering, Coimbatore — gear hobbing up to Ø1250 mm, gear shaping, keyway slotting, 10-ton broaching and hob cutter grinding. WhatsApp your drawing for a quote.",
  applicationName: business.name,
  authors: [{ name: business.name }],
  creator: business.name,
  formatDetection: { telephone: true, email: true, address: true },
  keywords: [
    "gear job work Coimbatore", "gear hobbing Coimbatore", "gear shaping Coimbatore", "keyway slotting Coimbatore",
    "broaching Coimbatore", "hob cutter grinding Coimbatore", "gear cutting Irugur", "best gear job work company in Coimbatore",
  ],
  category: "Manufacturing",
  alternates: { canonical: SITE_URL, languages: { "en-IN": SITE_URL, "x-default": SITE_URL }, types: { "text/plain": [{ url: "/llms.txt", title: "LLM site summary" }], "application/json": [{ url: "/api/company", title: "Company facts" }], "text/vcard": [{ url: "/siva-engineering.vcf", title: "Save contact" }] } },
  openGraph: {
    type: "website", locale: "en_IN", siteName: business.name, url: SITE_URL,
    images: [{ url: `${SITE_URL}/og/default.jpg`, width: 1200, height: 630, alt: "Siva Engineering — gear job work in Coimbatore", type: "image/jpeg" }],
  },
  twitter: { card: "summary_large_image", images: [{ url: `${SITE_URL}/og/default.jpg`, alt: "Siva Engineering — gear job work in Coimbatore" }] },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },
  appleWebApp: { capable: true, title: business.name, statusBarStyle: "default" },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION, other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } : undefined },
  other: {
    "geo.region": "IN-TN",
    "geo.placename": "Irugur, Coimbatore",
    "geo.position": `${business.geo.lat};${business.geo.lng}`,
    ICBM: `${business.geo.lat}, ${business.geo.lng}`,
    "business:contact_data:phone_number": business.phones[0].tel,
    "business:contact_data:email": business.email,
    "business:contact_data:street_address": business.address.line1,
    "business:contact_data:locality": business.address.locality,
    "business:contact_data:region": business.address.region,
    "business:contact_data:postal_code": business.address.postalCode,
    "business:contact_data:country_name": "India",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f3" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0e10" },
  ],
};

// Runs during HTML parsing, before first paint: applies the saved theme (light by default)
// and arms the scroll-reveal layer. If the motion layer fails to start, reveals are released after 4s.
const bootScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("theme");d.setAttribute("data-theme",t==="dark"?"dark":"light")}catch(e){d.setAttribute("data-theme","light")}if(!matchMedia("(prefers-reduced-motion: reduce)").matches){d.classList.add("motion");setTimeout(function(){if(!window.__motion)d.classList.remove("motion")},4000)}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      data-theme="light"
      suppressHydrationWarning
      className={body.variable}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <JsonLd data={[businessSchema(), websiteSchema()]} />
        <Header />
        <main id="main" className="relative">
          <div className="relative z-10">{children}</div>
        </main>
        <Footer />
        <StickyContact />
        <Motion />
        <LeadTracker />
      </body>
    </html>
  );
}
