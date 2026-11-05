import "server-only";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

type Db = ReturnType<typeof drizzle<typeof schema>>;
const globalForDb = globalThis as unknown as { __sivaDb?: Db };

/** Lazily creates the connection so `next build` never needs a database. */
export function getDb(): Db | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!globalForDb.__sivaDb) {
    const local = /@(localhost|127\.0\.0\.1|\[::1\])[:/]/.test(url);
    const client = postgres(url, {
      max: 5,
      idle_timeout: 20,
      connect_timeout: 10,
      // Managed Postgres (Neon, Supabase…) sits behind a transaction pooler: no prepared statements, TLS required.
      prepare: false,
      ssl: local ? undefined : "require",
    });
    globalForDb.__sivaDb = drizzle(client, { schema });
  }
  return globalForDb.__sivaDb;
}

export { schema };
