import { getDb, schema } from "@/lib/db";
import { enquirySchema } from "@/lib/validators";
import { json, rateLimit, visitorHash } from "@/lib/request";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return json({ ok: false, error: "Invalid request" }, 400);
  }

  const parsed = enquirySchema.safeParse(raw);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) fields[String(issue.path[0] ?? "form")] ??= issue.message;
    return json({ ok: false, error: "Please check the highlighted fields", fields }, 400);
  }
  const d = parsed.data;

  // Bots: honeypot filled or submitted faster than a human can type. Pretend success, store nothing.
  if ((d.website && d.website.length > 0) || (typeof d.elapsed === "number" && d.elapsed < 1500)) {
    return json({ ok: true, ref: "OK" });
  }

  const vh = visitorHash(req);
  if (!rateLimit(`enq:${vh}`, 6, 60 * 60 * 1000)) {
    return json({ ok: false, error: "Too many enquiries from this device. Please call or WhatsApp us." }, 429);
  }

  const db = getDb();
  if (!db) {
    console.error("[enquiry] DATABASE_URL is not set — enquiry was NOT stored");
    return json({ ok: false, error: "We could not save your enquiry right now. Please call or WhatsApp us." }, 503);
  }

  try {
    const [row] = await db
      .insert(schema.enquiries)
      .values({
        name: d.name,
        phone: d.phone,
        email: d.email,
        company: d.company,
        service: d.service,
        machine: d.machine,
        component: d.component,
        material: d.material,
        odMm: d.odMm,
        faceWidthMm: d.faceWidthMm,
        moduleValue: d.moduleValue,
        quantity: d.quantity,
        message: d.message,
        sourcePage: d.sourcePage,
        utmSource: d.utmSource,
        utmMedium: d.utmMedium,
        utmCampaign: d.utmCampaign,
        referrer: d.referrer,
        ipHash: vh,
        userAgent: req.headers.get("user-agent")?.slice(0, 300),
      })
      .returning({ id: schema.enquiries.id });
    return json({ ok: true, ref: row.id.slice(0, 8).toUpperCase() });
  } catch (err) {
    console.error("[enquiry] insert failed", err);
    return json({ ok: false, error: "We could not save your enquiry right now. Please call or WhatsApp us." }, 500);
  }
}
