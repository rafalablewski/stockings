import { neon } from '@neondatabase/serverless';
import { drizzle, NeonHttpDatabase } from 'drizzle-orm/neon-http';
import * as schema from './schema';
import { ensureTables } from './ensure-tables';

// Lazy initialization: the connection is created on first use, not at import time.
// This prevents build failures when DATABASE_URL isn't set during `next build`.
let _db: NeonHttpDatabase<typeof schema> | null = null;
let _tablesEnsured: Promise<void> | null = null;

export function getDb(): NeonHttpDatabase<typeof schema> {
  if (!_db) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error(
        'DATABASE_URL is not set. Add it to Vercel Environment Variables (Settings → Environment Variables).'
      );
    }
    const sql = neon(url);
    _db = drizzle(sql, { schema });
    // Fire-and-forget table creation on first connection (cached after first run)
    _tablesEnsured = ensureTables();
  }
  return _db;
}

/**
 * Await this before any DB query to guarantee tables exist.
 * Returns immediately after the first successful run.
 */
export async function waitForTables(): Promise<void> {
  if (!_tablesEnsured) getDb(); // trigger init
  if (_tablesEnsured) await _tablesEnsured;
}

// Convenience export — same lazy behavior
export const db = new Proxy({} as NeonHttpDatabase<typeof schema>, {
  get(_target, prop) {
    return (getDb() as unknown as Record<string | symbol, unknown>)[prop];
  },
});
