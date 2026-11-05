import "server-only";
import { createHash } from "node:crypto";

/** Hashed visitor id (never store the raw IP). */
export function visitorHash(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = fwd || req.headers.get("x-real-ip") || "unknown";
  return createHash("sha256")
    .update(ip + (process.env.IP_HASH_SALT ?? "siva"))
    .digest("hex")
    .slice(0, 32);
}

type Bucket = { count: number; reset: number };
const buckets = new Map<string, Bucket>();

/**
 * Small in-memory limiter — good protection for a single-instance deployment.
 * For multi-instance hosting, swap this for a shared store (e.g. Redis).
 */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || b.reset < now) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    if (buckets.size > 5000) for (const [k, v] of buckets) if (v.reset < now) buckets.delete(k);
    return true;
  }
  b.count += 1;
  return b.count <= limit;
}

export const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
