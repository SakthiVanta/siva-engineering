import { getDb, schema } from "@/lib/db";
import { eventSchema } from "@/lib/validators";
import { rateLimit, visitorHash } from "@/lib/request";

export const runtime = "nodejs";

/** Records tap-to-call / WhatsApp / email / map clicks. Always 204 — tracking must never surface errors. */
export async function POST(req: Request) {
  try {
    const parsed = eventSchema.safeParse(await req.json());
    if (!parsed.success) return new Response(null, { status: 204 });
    const vh = visitorHash(req);
    if (!rateLimit(`evt:${vh}`, 60, 60 * 60 * 1000)) return new Response(null, { status: 204 });
    const db = getDb();
    if (db) await db.insert(schema.leadEvents).values({ ...parsed.data, ipHash: vh });
  } catch (err) {
    console.error("[events]", err);
  }
  return new Response(null, { status: 204 });
}
