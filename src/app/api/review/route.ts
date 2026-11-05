import { getDb, schema } from "@/lib/db";
import { reviewSchema } from "@/lib/validators";
import { json, rateLimit, visitorHash } from "@/lib/request";

export const runtime = "nodejs";

/** Stores a submitted review as pending (approved = 0). Nothing is published until the owner approves it. */
export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return json({ ok: false, error: "Invalid request" }, 400);
  }
  const parsed = reviewSchema.safeParse(raw);
  if (!parsed.success) return json({ ok: false, error: parsed.error.issues[0]?.message ?? "Invalid review" }, 400);
  const d = parsed.data;

  if ((d.website && d.website.length > 0) || (typeof d.elapsed === "number" && d.elapsed < 2500)) return json({ ok: true });

  const vh = visitorHash(req);
  if (!rateLimit(`rev:${vh}`, 3, 24 * 60 * 60 * 1000)) return json({ ok: false, error: "Thanks — we already received your feedback." }, 429);

  const db = getDb();
  if (!db) return json({ ok: false, error: "We could not save your feedback right now." }, 503);
  try {
    await db.insert(schema.reviews).values({ name: d.name, company: d.company, role: d.role, rating: d.rating, body: d.body, ipHash: vh });
    return json({ ok: true });
  } catch (err) {
    console.error("[review]", err);
    return json({ ok: false, error: "We could not save your feedback right now." }, 500);
  }
}
