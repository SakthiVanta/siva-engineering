// Removes ONLY the rows created by setup/verification (clearly labelled "ZZ TEST"). Safe to re-run.
import { config } from "dotenv";
import postgres from "postgres";

config({ path: ".env.local" });
const sql = postgres(process.env.DATABASE_URL!, { max: 1, prepare: false, connect_timeout: 15 });
const a = await sql`delete from enquiries where name like 'ZZ TEST%' returning id`;
const b = await sql`delete from lead_events where label like 'ZZ TEST%' returning id`;
console.log(`removed ${a.length} test enquiry row(s), ${b.length} test event row(s)`);
await sql.end();
