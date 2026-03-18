import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { notifications } from '@/lib/schema';
import { eq, desc, and } from 'drizzle-orm';

/**
 * GET /api/notifications
 *
 * Returns recent notifications (last 100, newest first).
 * Query params:
 *   - unread: "true" to only return unread notifications
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const unreadOnly = searchParams.get('unread') === 'true';

  try {
    const conditions = [eq(notifications.dismissed, false)];
    if (unreadOnly) conditions.push(eq(notifications.read, false));

    const rows = await db
      .select()
      .from(notifications)
      .where(and(...conditions))
      .orderBy(desc(notifications.createdAt))
      .limit(100);

    const unreadCount = unreadOnly
      ? rows.length
      : rows.filter(r => !r.read).length;

    return NextResponse.json({ notifications: rows, unreadCount });
  } catch (err) {
    // Table may not exist yet — return empty
    console.error('[notifications] GET error:', err);
    return NextResponse.json({ notifications: [], unreadCount: 0 });
  }
}

/**
 * POST /api/notifications
 *
 * Create a new notification.
 * Body: { type, title, body?, groupKey?, meta? }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, title, body: notifBody, groupKey, meta } = body;

    if (!type || !title) {
      return NextResponse.json({ error: 'type and title are required' }, { status: 400 });
    }

    const [row] = await db.insert(notifications).values({
      type,
      title,
      body: notifBody || null,
      groupKey: groupKey || null,
      meta: meta ? JSON.stringify(meta) : null,
    }).returning();

    return NextResponse.json({ notification: row });
  } catch (err) {
    console.error('[notifications] POST error:', err);
    return NextResponse.json({ error: 'Failed to create notification' }, { status: 500 });
  }
}

/**
 * PATCH /api/notifications
 *
 * Bulk update notifications.
 * Body: { action: "read" | "read-all" | "dismiss", ids?: number[] }
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ids } = body;

    if (action === 'read-all') {
      await db.update(notifications)
        .set({ read: true })
        .where(eq(notifications.read, false));
      return NextResponse.json({ ok: true });
    }

    if (action === 'read' && Array.isArray(ids)) {
      for (const id of ids) {
        await db.update(notifications)
          .set({ read: true })
          .where(eq(notifications.id, id));
      }
      return NextResponse.json({ ok: true });
    }

    if (action === 'dismiss' && Array.isArray(ids)) {
      for (const id of ids) {
        await db.update(notifications)
          .set({ dismissed: true })
          .where(eq(notifications.id, id));
      }
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err) {
    console.error('[notifications] PATCH error:', err);
    return NextResponse.json({ error: 'Failed to update notifications' }, { status: 500 });
  }
}
