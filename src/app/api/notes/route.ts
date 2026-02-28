import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { db } from '@/lib/db';
import { notes } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';
import { NOTES_CREATE_TABLE_SQL, NOTES_ADD_TITLE_SQL, NOTES_ADD_DESCRIPTION_SQL } from '@/lib/notes-ddl';

export const dynamic = 'force-dynamic';

// ---------------------------------------------------------------------------
// ensureTable — creates notes table if it doesn't exist, and adds
// title/description columns if they're missing (migration).
// Uses the raw neon() HTTP driver (same pattern as seen-articles, audit-checks).
// ---------------------------------------------------------------------------
let tableVerified = false;

async function ensureTable(): Promise<void> {
  if (tableVerified) return;

  const connStr = process.env.DATABASE_URL;
  if (!connStr) throw new Error('DATABASE_URL is not set');

  const rawSql = neon(connStr);

  const tsa = Object.assign([NOTES_CREATE_TABLE_SQL], { raw: [NOTES_CREATE_TABLE_SQL] }) as unknown as TemplateStringsArray;
  await rawSql(tsa);

  // Migrate: add title & description columns (each as a separate call —
  // neon() HTTP driver does not support multi-statement queries).
  const tsaTitle = Object.assign([NOTES_ADD_TITLE_SQL], { raw: [NOTES_ADD_TITLE_SQL] }) as unknown as TemplateStringsArray;
  await rawSql(tsaTitle);
  const tsaDesc = Object.assign([NOTES_ADD_DESCRIPTION_SQL], { raw: [NOTES_ADD_DESCRIPTION_SQL] }) as unknown as TemplateStringsArray;
  await rawSql(tsaDesc);

  tableVerified = true;
}

function isTableMissing(err: unknown): boolean {
  const msg = String(err);
  return msg.includes('does not exist') || msg.includes('relation') || msg.includes('42P01');
}

const VALID_CATEGORIES = new Set(['article', 'enhancement', 'other']);

// ---------------------------------------------------------------------------
// GET /api/notes
//
// Returns all notes, newest first.
// Response: { notes: [{ id, content, category, title, description, createdAt }] }
// ---------------------------------------------------------------------------
export async function GET() {
  try {
    await ensureTable();
  } catch (e) {
    console.error('[notes] ensureTable failed in GET:', e);
    return NextResponse.json({ notes: [] });
  }

  try {
    const rows = await db
      .select()
      .from(notes)
      .orderBy(desc(notes.createdAt));

    return NextResponse.json({ notes: rows });
  } catch (error) {
    console.error('[notes] GET error:', error);

    if (isTableMissing(error)) {
      tableVerified = false;
      return NextResponse.json({ notes: [] });
    }

    const msg = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// ---------------------------------------------------------------------------
// POST /api/notes
//
// Creates a new note.
// Body: { content: string, category: 'article' | 'enhancement' | 'other',
//         title?: string, description?: string }
// Response: { ok: true, note: { id, content, category, title, description, createdAt } }
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  try {
    const { content, category, title, description } = await request.json();

    if (!content || typeof content !== 'string' || !content.trim()) {
      return NextResponse.json({ error: 'content is required' }, { status: 400 });
    }
    if (!category || !VALID_CATEGORIES.has(category)) {
      return NextResponse.json(
        { error: 'category must be "article", "enhancement", or "other"' },
        { status: 400 },
      );
    }

    try {
      await ensureTable();
    } catch (e) {
      console.error('[notes] ensureTable failed in POST:', e);
      return NextResponse.json({ error: 'Table creation failed' }, { status: 500 });
    }

    const [inserted] = await db
      .insert(notes)
      .values({
        content: content.trim(),
        category,
        title: title && typeof title === 'string' ? title.trim() : null,
        description: description && typeof description === 'string' ? description.trim() : null,
      })
      .returning();

    return NextResponse.json({ ok: true, note: inserted });
  } catch (error) {
    console.error('[notes] POST error:', error);
    if (isTableMissing(error)) tableVerified = false;
    const msg = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// ---------------------------------------------------------------------------
// PATCH /api/notes?id=123
//
// Updates title/description on an existing note (used after AI generation).
// Body: { title?: string, description?: string }
// Response: { ok: true, note: { ... } }
// ---------------------------------------------------------------------------
export async function PATCH(request: NextRequest) {
  try {
    const idStr = request.nextUrl.searchParams.get('id');
    if (!idStr) {
      return NextResponse.json({ error: 'id query parameter is required' }, { status: 400 });
    }

    const id = parseInt(idStr, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'id must be a number' }, { status: 400 });
    }

    const { title, description } = await request.json();

    try {
      await ensureTable();
    } catch (e) {
      console.error('[notes] ensureTable failed in PATCH:', e);
      return NextResponse.json({ error: 'Table creation failed' }, { status: 500 });
    }

    const updates: Record<string, string | null> = {};
    if (title !== undefined) updates.title = title ? String(title).trim() : null;
    if (description !== undefined) updates.description = description ? String(description).trim() : null;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
    }

    const [updated] = await db
      .update(notes)
      .set(updates)
      .where(eq(notes.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    return NextResponse.json({ ok: true, note: updated });
  } catch (error) {
    console.error('[notes] PATCH error:', error);
    if (isTableMissing(error)) tableVerified = false;
    const msg = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// ---------------------------------------------------------------------------
// DELETE /api/notes?id=123
//
// Deletes a single note by ID.
// Response: { ok: true }
// ---------------------------------------------------------------------------
export async function DELETE(request: NextRequest) {
  try {
    const idStr = request.nextUrl.searchParams.get('id');
    if (!idStr) {
      return NextResponse.json({ error: 'id query parameter is required' }, { status: 400 });
    }

    const id = parseInt(idStr, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'id must be a number' }, { status: 400 });
    }

    try {
      await ensureTable();
    } catch (e) {
      console.error('[notes] ensureTable failed in DELETE:', e);
      return NextResponse.json({ error: 'Table creation failed' }, { status: 500 });
    }

    await db.delete(notes).where(eq(notes.id, id));

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[notes] DELETE error:', error);
    if (isTableMissing(error)) tableVerified = false;
    const msg = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
