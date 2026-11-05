import { llmsTxt } from "@/lib/facts";

/** Emerging /llms.txt standard: a concise, authoritative site summary for LLMs and AI agents. */
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600, s-maxage=86400" },
  });
}
