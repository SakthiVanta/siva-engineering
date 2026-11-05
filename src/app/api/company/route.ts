import { companyFacts } from "@/lib/facts";

/** Public, machine-readable company fact sheet for AI agents and integrations. */
export const dynamic = "force-static";

export function GET() {
  return new Response(JSON.stringify(companyFacts(), null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
