/**
 * Single source-of-truth DDL for the `notes` table.
 * Imported by both /api/notes (runtime auto-create) and /api/db/setup (full setup).
 */
export const NOTES_CREATE_TABLE_SQL = `CREATE TABLE IF NOT EXISTS notes (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
)`;
