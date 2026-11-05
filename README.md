# Siva Engineering — production site

Gear job-work website for Siva Engineering, Irugur, Coimbatore.
**Stack:** Next.js 16 (App Router, static generation) · Bun · Tailwind CSS v4 · GSAP · Three.js · Drizzle ORM + PostgreSQL.

## Run it

```bash
bun install
cp .env.example .env.local      # then fill DATABASE_URL + NEXT_PUBLIC_SITE_URL
bun run db:migrate              # creates enquiries, lead_events, reviews
bun run dev                     # http://localhost:3000
bun run build && bun run start  # production
```

| Script | What it does |
| --- | --- |
| `bun run leads [n]` | Prints the latest enquiries, call/WhatsApp tap counts and pending reviews |
| `bun run db:inspect` | Read-only look at the database |
| `bun run db:studio` | Drizzle Studio (browse/edit rows) |
| `bun run og` | Regenerates the 43 branded share images in `public/og/` (needs Python + Pillow) |

## Before you launch (things only the owner can confirm)

1. **`NEXT_PUBLIC_SITE_URL`** — set to the real domain. Canonicals, sitemap, share images and JSON-LD all use it.
2. **Address** — site uses the Google Maps listing (Lakshmi Garden, 13, Irugur 641003). The printed catalogue says *S.F.No 16, Kokkali Thottam, Irugur Road, Ondipudur 641016*. Change once in `src/lib/site.ts`.
3. **GSTIN** — printed as `33GHCPK8483E127`; a 15-character GSTIN normally has `Z` as the 14th character, so check the catalogue for a typo.
4. **WhatsApp number** — `+91 76677 25967` is used for WhatsApp; confirm the second number if it should be too.
5. **Clients** — logos/names are in `src/lib/data/content.ts`; confirm permission. Shanthi Gears has no logo (the supplied file was a Nadcap badge); drop a real one in `public/clients/`.
6. **Testimonials** — intentionally empty. Add real, permitted quotes to `testimonials` in `content.ts` (they render and emit `Review` JSON-LD). Visitor reviews land in the `reviews` table (`approved = 0`) until you publish them.
7. Add `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` / `NEXT_PUBLIC_BING_SITE_VERIFICATION` when you set up Search Console / Bing.

## Where things live

- `src/lib/site.ts` — business facts (phones, address, GSTIN, WhatsApp links). One place.
- `src/lib/data/*` — services, machines (catalogue-verified specs only), guides, areas, FAQs, clients.
- `src/lib/facts.ts` — generates `/llms.txt`, `/llms-full.txt`, `/api/company`, the vCard from the same data.
- `src/app/api/{enquiry,events,review}` — form + lead tracking (honeypot, min-time, rate limit, hashed IPs).
- `scripts/generate-og.py` — share-image renderer (each image < 100 KB; WhatsApp drops previews over ~300 KB).

## Search & AI visibility

JSON-LD (LocalBusiness + OfferCatalog, WebSite, Service, FAQPage, Article, Breadcrumb, WebApplication), per-page canonical + Open Graph/Twitter images, sitemap with image entries, `robots.txt` that explicitly allows AI crawlers, `/llms.txt`, `/llms-full.txt`, `/api/company` (JSON), `/siva-engineering.vcf`, and plain-language Q&A (phone, address, GSTIN, "who offers gear hobbing in Coimbatore") that answer engines can quote.

## Performance notes

Lighthouse (mobile emulation, local production build): Performance 93–96, Accessibility 100, Best Practices 100, SEO 100; TBT ≈ 30–50 ms, CLS 0.

- All heavy enhancements (Three.js scenes, GSAP) load only after the first real user interaction, and 3D scenes also require the section to be near the viewport; they pause off-screen and dispose when far away.
- Scroll reveals are CSS + IntersectionObserver (no library). Reduced-motion users get a fully static site.
- Don't add `opacity: 0` entrance animations to above-the-fold text — Chrome then doesn't count it as the LCP element.
