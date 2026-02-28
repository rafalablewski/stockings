/**
 * Single source-of-truth DDL for the `notes` table.
 * Imported by both /api/notes (runtime auto-create) and /api/db/setup (full setup).
 */
export const NOTES_CREATE_TABLE_SQL = `CREATE TABLE IF NOT EXISTS notes (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  title TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
)`;

/**
 * Migration SQL to add title/description columns to an existing notes table.
 * Safe to run multiple times (IF NOT EXISTS).
 */
export const NOTES_ADD_PREVIEW_COLUMNS_SQL = `
  ALTER TABLE notes ADD COLUMN IF NOT EXISTS title TEXT;
  ALTER TABLE notes ADD COLUMN IF NOT EXISTS description TEXT;
`;
