import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { db } from '@/lib/db';
import { officeActivities } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import {
  OFFICE_ACTIVITIES_CREATE_TABLE_SQL,
  OFFICE_ACTIVITIES_UNIQUE_IDX_SQL,
  OFFICE_ACTIVITIES_SEED_SQL,
} from '@/lib/office-activities-ddl';

export const dynamic = 'force-dynamic';

let tableVerified = false;

async function ensureTable(): Promise<void> {
  if (tableVerified) return;
  const connStr = process.env.DATABASE_URL;
  if (!connStr) throw new Error('DATABASE_URL is not set');

  const rawSql = neon(connStr);

  for (const sql of [
    OFFICE_ACTIVITIES_CREATE_TABLE_SQL,
    OFFICE_ACTIVITIES_UNIQUE_IDX_SQL,
    OFFICE_ACTIVITIES_SEED_SQL,
  ]) {
    const tsa = Object.assign([sql], { raw: [sql] }) as unknown as TemplateStringsArray;
    await rawSql(tsa);
  }

  tableVerified = true;
}

function isTableMissing(err: unknown): boolean {
  const msg = String(err);
  return msg.includes('does not exist') || msg.includes('relation') || msg.includes('42P01');
}

// ---------------------------------------------------------------------------
// GET /api/office-activities
//
// Returns all activities with their enabled state.
// Response: { activities: [{ id, type, label, enabled, requiresFurniture }] }
// ---------------------------------------------------------------------------
export async function GET() {
  try {
    await ensureTable();
  } catch (e) {
    console.error('[office-activities] ensureTable failed:', e);
    return NextResponse.json({ activities: [] });
  }

  try {
    const rows = await db.select().from(officeActivities);
    return NextResponse.json({ activities: rows });
  } catch (error) {
    console.error('[office-activities] GET error:', error);
    if (isTableMissing(error)) tableVerified = false;
    return NextResponse.json({ activities: [] });
  }
}

// ---------------------------------------------------------------------------
// PATCH /api/office-activities
//
// Toggle an activity's enabled state.
// Body: { type: string, enabled: boolean }
// Response: { ok: true, activity: { ... } }
// ---------------------------------------------------------------------------
export async function PATCH(request: NextRequest) {
  try {
    const { type, enabled } = await request.json();

    if (!type || typeof type !== 'string') {
      return NextResponse.json({ error: 'type is required' }, { status: 400 });
    }
    if (typeof enabled !== 'boolean') {
      return NextResponse.json({ error: 'enabled must be a boolean' }, { status: 400 });
    }

    // Don't allow disabling core activities
    if (['working', 'idle'].includes(type) && !enabled) {
      return NextResponse.json({ error: `Cannot disable '${type}'` }, { status: 400 });
    }

    await ensureTable();

    const [updated] = await db
      .update(officeActivities)
      .set({ enabled })
      .where(eq(officeActivities.type, type))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: 'Activity not found' }, { status: 404 });
    }

    return NextResponse.json({ ok: true, activity: updated });
  } catch (error) {
    console.error('[office-activities] PATCH error:', error);
    if (isTableMissing(error)) tableVerified = false;
    const msg = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
