import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { notifications, seenFilings, pressReleases } from '@/lib/schema';
import { sql } from 'drizzle-orm';

/**
 * POST /api/intelligence-refresh
 *
 * Triggers a refresh of SEC and press intelligence feeds.
 * Counts new entries and creates grouped notifications.
 *
 * This endpoint is called by the client-side auto-refresh scheduler
 * every 30 minutes between 8:00-19:00 NYC time.
 */
export async function POST(request: NextRequest) {
  const now = new Date();
  const groupTimestamp = now.toISOString().slice(0, 16);

  // --- Count existing entries BEFORE refresh (parallel) ---
  const [secCountBeforeRes, pressCountBeforeRes] = await Promise.allSettled([
    db.select({ count: sql<number>`count(*)` }).from(seenFilings),
    db.select({ count: sql<number>`count(*)` }).from(pressReleases),
  ]);

  const secCountBefore = secCountBeforeRes.status === 'fulfilled' ? Number(secCountBeforeRes.value[0]?.count ?? 0) : 0;
  const pressCountBefore = pressCountBeforeRes.status === 'fulfilled' ? Number(pressCountBeforeRes.value[0]?.count ?? 0) : 0;

  // --- Trigger SEC and Press refreshes in parallel ---
  const baseUrl = request.nextUrl.origin;

  const [secRefreshRes, pressRefreshRes] = await Promise.allSettled([
    fetch(`${baseUrl}/api/sec-intelligence?mode=refresh&limit=25`, {
      headers: { 'Content-Type': 'application/json' },
    }),
    fetch(`${baseUrl}/api/press-intelligence?mode=refresh`, {
      headers: { 'Content-Type': 'application/json' },
    }),
  ]);

  let secError: string | undefined;
  if (secRefreshRes.status === 'fulfilled') {
    if (!secRefreshRes.value.ok) secError = `SEC refresh failed: ${secRefreshRes.value.status}`;
  } else {
    secError = `SEC refresh error: ${(secRefreshRes.reason as Error).message}`;
  }

  let pressError: string | undefined;
  if (pressRefreshRes.status === 'fulfilled') {
    if (!pressRefreshRes.value.ok) pressError = `Press refresh failed: ${pressRefreshRes.value.status}`;
  } else {
    pressError = `Press refresh error: ${(pressRefreshRes.reason as Error).message}`;
  }

  // --- Count entries AFTER refresh (parallel) ---
  const [secCountAfterRes, pressCountAfterRes] = await Promise.allSettled([
    db.select({ count: sql<number>`count(*)` }).from(seenFilings),
    db.select({ count: sql<number>`count(*)` }).from(pressReleases),
  ]);

  const secCountAfter = secCountAfterRes.status === 'fulfilled' ? Number(secCountAfterRes.value[0]?.count ?? 0) : 0;
  const pressCountAfter = pressCountAfterRes.status === 'fulfilled' ? Number(pressCountAfterRes.value[0]?.count ?? 0) : 0;

  const newSecCount = Math.max(0, secCountAfter - secCountBefore);
  const newPressCount = Math.max(0, pressCountAfter - pressCountBefore);
  const createdNotifications: string[] = [];

  // --- Create notifications for new entries (batch insert) ---
  try {
    const toInsert: (typeof notifications.$inferInsert)[] = [];

    if (newSecCount > 0) {
      toInsert.push({
        type: 'sec',
        title: `${newSecCount} new SEC filing${newSecCount > 1 ? 's' : ''}`,
        body: `Auto-refresh found ${newSecCount} new EDGAR filing${newSecCount > 1 ? 's' : ''}.`,
        groupKey: `sec-refresh-${groupTimestamp}`,
        meta: JSON.stringify({ newCount: newSecCount, refreshedAt: now.toISOString() }),
      });
      createdNotifications.push('sec');
    }

    if (newPressCount > 0) {
      toInsert.push({
        type: 'press',
        title: `${newPressCount} new press release${newPressCount > 1 ? 's' : ''}`,
        body: `Auto-refresh found ${newPressCount} new press release${newPressCount > 1 ? 's' : ''}.`,
        groupKey: `press-refresh-${groupTimestamp}`,
        meta: JSON.stringify({ newCount: newPressCount, refreshedAt: now.toISOString() }),
      });
      createdNotifications.push('press');
    }

    if (toInsert.length > 0) {
      await db.insert(notifications).values(toInsert);
    }
  } catch (err) {
    console.error('[intelligence-refresh] Failed to create notifications:', err);
  }

  return NextResponse.json({
    refreshedAt: now.toISOString(),
    sec: { before: secCountBefore, after: secCountAfter, new: newSecCount, error: secError },
    press: { before: pressCountBefore, after: pressCountAfter, new: newPressCount, error: pressError },
    notifications: createdNotifications,
  });
}
