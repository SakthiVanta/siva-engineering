import { vcard } from "@/lib/facts";

/** Downloadable contact card — one tap saves the phone numbers, email and address. */
export const dynamic = "force-static";

export function GET() {
  return new Response(vcard(), {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="siva-engineering.vcf"',
      "Cache-Control": "public, max-age=86400",
    },
  });
}
