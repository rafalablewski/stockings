import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { roomMessages } from '@/lib/schema';
import { desc, eq, and, lt } from 'drizzle-orm';
import { VALID_SENDERS, VALID_CHANNELS } from '@/lib/types';

// GET /api/room?channel=general&before=123&limit=50
export async function GET(req: NextRequest) {
  try {
    const db = getDb();
    const url = new URL(req.url);
    const channel = url.searchParams.get('channel') || 'general';
    const beforeRaw = url.searchParams.get('before');
    const limitRaw = parseInt(url.searchParams.get('limit') || '50', 10);

    if (!VALID_CHANNELS.includes(channel as typeof VALID_CHANNELS[number])) {
      return NextResponse.json(
        { error: `Invalid channel. Must be one of: ${VALID_CHANNELS.join(', ')}` },
        { status: 400 }
      );
    }

    const limit = Number.isNaN(limitRaw) ? 50 : Math.min(Math.max(limitRaw, 1), 100);

    const conditions = [eq(roomMessages.channel, channel)];
    if (beforeRaw) {
      const beforeId = parseInt(beforeRaw, 10);
      if (Number.isNaN(beforeId)) {
        return NextResponse.json({ error: 'Invalid before parameter — must be a number' }, { status: 400 });
      }
      conditions.push(lt(roomMessages.id, beforeId));
    }

    const messages = await db
      .select()
      .from(roomMessages)
      .where(and(...conditions))
      .orderBy(desc(roomMessages.createdAt))
      .limit(limit);

    // Return in chronological order (oldest first)
    return NextResponse.json({ messages: messages.reverse() });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    if (message.includes('does not exist') || message.includes('relation')) {
      return NextResponse.json(
        { error: 'room_messages table not found. Run POST /api/db/setup to create it.' },
        { status: 500 }
      );
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/room
export async function POST(req: NextRequest) {
  try {
    const db = getDb();
    const body = await req.json();
    const { sender, content, channel = 'general', replyTo } = body;

    if (!sender || !VALID_SENDERS.includes(sender)) {
      return NextResponse.json(
        { error: `Invalid sender. Must be one of: ${VALID_SENDERS.join(', ')}` },
        { status: 400 }
      );
    }

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    if (!VALID_CHANNELS.includes(channel as typeof VALID_CHANNELS[number])) {
      return NextResponse.json(
        { error: `Invalid channel. Must be one of: ${VALID_CHANNELS.join(', ')}` },
        { status: 400 }
      );
    }

    if (replyTo !== undefined && replyTo !== null && (typeof replyTo !== 'number' || !Number.isInteger(replyTo))) {
      return NextResponse.json({ error: 'replyTo must be an integer or null' }, { status: 400 });
    }

    const [message] = await db
      .insert(roomMessages)
      .values({
        sender,
        content: content.trim(),
        channel,
        replyTo: replyTo || null,
      })
      .returning();

    return NextResponse.json({ message }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    if (message.includes('does not exist') || message.includes('relation')) {
      return NextResponse.json(
        { error: 'room_messages table not found. Run POST /api/db/setup to create it.' },
        { status: 500 }
      );
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
