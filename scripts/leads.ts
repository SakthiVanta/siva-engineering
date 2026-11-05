// Prints the latest enquiries, click-to-call/WhatsApp counts and pending reviews.
//   bun run leads          (latest 20)
//   bun run leads 50       (latest 50)
import { config } from "dotenv";
import postgres from "postgres";

config({ path: ".env.local" });
const sql = postgres(process.env.DATABASE_URL!, { max: 1, prepare: false, connect_timeout: 15 });
const limit = Number(process.argv[2]) || 20;

const rows = await sql`
  select created_at, status, name, phone, email, company, service, machine, component, material,
         od_mm, face_width_mm, module_value, quantity, message, source_page, utm_source, utm_campaign
  from enquiries order by created_at desc limit ${limit}`;

console.log(`\n=== ${rows.length} latest enquiries ===`);
for (const r of rows) {
  const spec = [r.od_mm && `OD ${r.od_mm}mm`, r.face_width_mm && `face ${r.face_width_mm}mm`, r.module_value && `m${r.module_value}`, r.quantity && `qty ${r.quantity}`].filter(Boolean).join(" · ");
  console.log(`\n[${new Date(r.created_at).toLocaleString("en-IN")}] ${String(r.status).toUpperCase()}  ${r.name}  ${r.phone}${r.email ? "  " + r.email : ""}`);
  console.log(`  ${[r.company, r.service, r.machine].filter(Boolean).join(" | ") || "(no service chosen)"}`);
  if (r.component || r.material) console.log(`  part: ${[r.component, r.material].filter(Boolean).join(" / ")}`);
  if (spec) console.log(`  spec: ${spec}`);
  if (r.message) console.log(`  note: ${r.message}`);
  console.log(`  from: ${r.source_page ?? "?"}${r.utm_source ? `  (utm ${r.utm_source}/${r.utm_campaign ?? "-"})` : ""}`);
}

const ev = await sql`select type, count(*)::int as n from lead_events where created_at > now() - interval '30 days' group by type order by n desc`;
console.log("\n=== last 30 days: taps on contact links ===");
console.log(ev.length ? ev.map((e) => `${e.type}: ${e.n}`).join("   ") : "(none yet)");

const top = await sql`select page, count(*)::int as n from lead_events where created_at > now() - interval '30 days' group by page order by n desc limit 5`;
if (top.length) console.log("top pages:", top.map((t) => `${t.page} (${t.n})`).join(", "));

const rv = await sql`select name, company, rating, body, created_at from reviews where approved = 0 order by created_at desc`;
console.log(`\n=== ${rv.length} review(s) awaiting approval ===`);
for (const r of rv) console.log(`- ${r.name}${r.company ? ` (${r.company})` : ""} ${r.rating ? `${r.rating}/5` : ""}: ${r.body}`);
console.log("  (to publish one, add it to src/lib/data/content.ts → testimonials)\n");
await sql.end();
