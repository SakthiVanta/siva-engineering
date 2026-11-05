// Read-only: shows what already exists in the database before/after migrating.  bun scripts/db-inspect.ts
import { config } from "dotenv";
import postgres from "postgres";

config({ path: ".env.local" });
const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set in .env.local");

const sql = postgres(url, { max: 1, prepare: false, connect_timeout: 15 });
try {
  const v = await sql`select current_database() as db, current_user as usr`;
  console.log(`connected: ${v[0].db} as ${v[0].usr}`);
  const t = await sql`select table_schema, table_name from information_schema.tables where table_schema not in ('pg_catalog', 'information_schema') order by 1, 2`;
  console.log("tables:", t.length ? t.map((r) => `${r.table_schema}.${r.table_name}`).join(", ") : "(none)");
  const e = await sql`select typname from pg_type where typname in ('enquiry_status', 'lead_event_type')`;
  console.log("site enum types present:", e.length ? e.map((r) => r.typname).join(", ") : "none");
  for (const name of ["enquiries", "lead_events", "reviews"]) {
    const c = await sql`select count(*)::int as n from information_schema.tables where table_schema = 'public' and table_name = ${name}`;
    if (c[0].n) {
      const rows = await sql.unsafe(`select count(*)::int as n from public.${name}`);
      console.log(`  ${name}: ${rows[0].n} rows`);
    }
  }
} catch (err) {
  console.error("FAILED:", (err as { code?: string; message: string }).code ?? (err as Error).message);
  process.exitCode = 1;
}
await sql.end();
