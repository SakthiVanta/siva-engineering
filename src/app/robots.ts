import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// AI answer engines and agents are explicitly welcome: the site is public marketing content and
// we want assistants to quote our phone number, address and capacity accurately.
const ai = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User",
  "ClaudeBot", "Claude-Web", "Claude-SearchBot", "Claude-User", "anthropic-ai",
  "PerplexityBot", "Perplexity-User",
  "Google-Extended", "Googlebot", "Bingbot", "Applebot", "Applebot-Extended",
  "meta-externalagent", "Amazonbot", "DuckAssistBot", "YouBot", "cohere-ai", "MistralAI-User",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/enquiry", "/api/events", "/api/review"] },
      { userAgent: ai, allow: ["/", "/llms.txt", "/llms-full.txt", "/api/company"], disallow: ["/api/enquiry", "/api/events", "/api/review"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
