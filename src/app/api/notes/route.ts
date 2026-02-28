import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { db } from '@/lib/db';
import { notes } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';
import { NOTES_CREATE_TABLE_SQL } from '@/lib/notes-ddl';

export const dynamic = 'force-dynamic';

// ---------------------------------------------------------------------------
// ensureTable — creates notes table if it doesn't exist.
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
// Response: { notes: [{ id, content, category, createdAt }] }
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
// Body: { content: string, category: 'article' | 'enhancement' | 'other' }
// Response: { ok: true, note: { id, content, category, createdAt } }
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  try {
    const { content, category } = await request.json();

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
      .values({ content: content.trim(), category })
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
