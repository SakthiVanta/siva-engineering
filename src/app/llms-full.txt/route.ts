import { llmsFullTxt } from "@/lib/facts";

/** Full-text companion to /llms.txt: services, machines, FAQs and guides in one markdown document. */
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsFullTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600, s-maxage=86400" },
  });
}
