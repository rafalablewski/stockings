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
  const groupTimestamp = now.toISOString().slice(0, 16); // e.g. 2026-03-18T14:30

  // --- Count existing entries BEFORE refresh ---
  let secCountBefore = 0;
  let pressCountBefore = 0;

  try {
    const [secRow] = await db.select({ count: sql<number>`count(*)` }).from(seenFilings);
    secCountBefore = Number(secRow?.count ?? 0);
  } catch { /* table may not exist */ }

  try {
    const [pressRow] = await db.select({ count: sql<number>`count(*)` }).from(pressReleases);
    pressCountBefore = Number(pressRow?.count ?? 0);
  } catch { /* table may not exist */ }

  // --- Trigger SEC refresh ---
  const baseUrl = request.nextUrl.origin;
  let secError: string | undefined;
  let pressError: string | undefined;

  try {
    const secRes = await fetch(`${baseUrl}/api/sec-intelligence?mode=refresh&limit=25`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!secRes.ok) secError = `SEC refresh failed: ${secRes.status}`;
  } catch (err) {
    secError = `SEC refresh error: ${(err as Error).message}`;
  }

  // --- Trigger Press refresh ---
  try {
    const pressRes = await fetch(`${baseUrl}/api/press-intelligence?mode=refresh`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!pressRes.ok) pressError = `Press refresh failed: ${pressRes.status}`;
  } catch (err) {
    pressError = `Press refresh error: ${(err as Error).message}`;
  }

  // --- Count entries AFTER refresh ---
  let secCountAfter = 0;
  let pressCountAfter = 0;

  try {
    const [secRow] = await db.select({ count: sql<number>`count(*)` }).from(seenFilings);
    secCountAfter = Number(secRow?.count ?? 0);
  } catch { /* ignore */ }

  try {
    const [pressRow] = await db.select({ count: sql<number>`count(*)` }).from(pressReleases);
    pressCountAfter = Number(pressRow?.count ?? 0);
  } catch { /* ignore */ }

  const newSecCount = Math.max(0, secCountAfter - secCountBefore);
  const newPressCount = Math.max(0, pressCountAfter - pressCountBefore);
  const createdNotifications: string[] = [];

  // --- Create notifications for new entries ---
  try {
    if (newSecCount > 0) {
      await db.insert(notifications).values({
        type: 'sec',
        title: `${newSecCount} new SEC filing${newSecCount > 1 ? 's' : ''}`,
        body: `Auto-refresh found ${newSecCount} new EDGAR filing${newSecCount > 1 ? 's' : ''}.`,
        groupKey: `sec-refresh-${groupTimestamp}`,
        meta: JSON.stringify({ newCount: newSecCount, refreshedAt: now.toISOString() }),
      });
      createdNotifications.push('sec');
    }

    if (newPressCount > 0) {
      await db.insert(notifications).values({
        type: 'press',
        title: `${newPressCount} new press release${newPressCount > 1 ? 's' : ''}`,
        body: `Auto-refresh found ${newPressCount} new press release${newPressCount > 1 ? 's' : ''}.`,
        groupKey: `press-refresh-${groupTimestamp}`,
        meta: JSON.stringify({ newCount: newPressCount, refreshedAt: now.toISOString() }),
      });
      createdNotifications.push('press');
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
