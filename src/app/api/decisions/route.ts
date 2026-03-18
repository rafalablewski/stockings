import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { pmDecisions } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';

/**
 * GET /api/decisions?pm=bobman&status=pending
 * Returns decisions filtered by PM and/or status.
 */
export async function GET(req: NextRequest) {
  const db = getDb();
  const pm = req.nextUrl.searchParams.get('pm');
  const status = req.nextUrl.searchParams.get('status');
  const limit = Math.min(parseInt(req.nextUrl.searchParams.get('limit') || '50', 10), 100);

  let query = db.select().from(pmDecisions).orderBy(desc(pmDecisions.createdAt)).limit(limit).$dynamic();

  if (pm) {
    query = query.where(eq(pmDecisions.pm, pm));
  }
  if (status) {
    query = query.where(eq(pmDecisions.status, status));
  }

  const rows = await query;
  return NextResponse.json({ decisions: rows });
}

/**
 * POST /api/decisions
 * Create a new decision item.
 */
export async function POST(req: NextRequest) {
  const db = getDb();
  const body = await req.json();
  const { pm, engineerId, runId, ticker, title, category, payload } = body;

  if (!pm || !engineerId || !ticker || !title || !category || !payload) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const [row] = await db.insert(pmDecisions).values({
    pm,
    engineerId,
    runId: runId || null,
    ticker,
    title,
    category,
    payload: typeof payload === 'string' ? payload : JSON.stringify(payload),
  }).returning();

  return NextResponse.json({ decision: row });
}

/**
 * PATCH /api/decisions
 * Update decision status (PM approval/rejection or Boss final ruling).
 */
export async function PATCH(req: NextRequest) {
  const db = getDb();
  const body = await req.json();
  const { id, status, pmNotes, bossNotes } = body;

  if (!id || !status) {
    return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
  }

  const validStatuses = ['pending', 'pm-approved', 'pm-rejected', 'boss-approved', 'boss-rejected', 'applied', 'reverted'];
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` }, { status: 400 });
  }

  const updates: Record<string, unknown> = { status, updatedAt: new Date() };
  if (pmNotes !== undefined) updates.pmNotes = pmNotes;
  if (bossNotes !== undefined) updates.bossNotes = bossNotes;

  const [updated] = await db.update(pmDecisions)
    .set(updates)
    .where(eq(pmDecisions.id, id))
    .returning();

  if (!updated) {
    return NextResponse.json({ error: 'Decision not found' }, { status: 404 });
  }

  return NextResponse.json({ decision: updated });
}
