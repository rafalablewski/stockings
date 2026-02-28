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
  hidden BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
)`;

/**
 * Migration: add title column to an existing notes table.
 * Safe to run multiple times (IF NOT EXISTS).
 * Each statement MUST be a separate string — neon() HTTP driver does not
 * support multi-statement queries.
 */
export const NOTES_ADD_TITLE_SQL = `ALTER TABLE notes ADD COLUMN IF NOT EXISTS title TEXT`;
export const NOTES_ADD_DESCRIPTION_SQL = `ALTER TABLE notes ADD COLUMN IF NOT EXISTS description TEXT`;
export const NOTES_ADD_HIDDEN_SQL = `ALTER TABLE notes ADD COLUMN IF NOT EXISTS hidden BOOLEAN NOT NULL DEFAULT FALSE`;
