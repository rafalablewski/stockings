import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { roomMessages } from '@/lib/schema';
import { desc, eq, and, lt } from 'drizzle-orm';

const VALID_SENDERS = ['boss', 'claude', 'cursor', 'gemini', 'ai-engineer', 'project-manager'] as const;
const VALID_CHANNELS = ['general', 'backend', 'frontend', 'research', 'ml', 'planning'] as const;

// GET /api/room?channel=general&before=123&limit=50
export async function GET(req: NextRequest) {
  const db = getDb();
  const url = new URL(req.url);
  const channel = url.searchParams.get('channel') || 'general';
  const before = url.searchParams.get('before');
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '50', 10), 100);

  const conditions = [eq(roomMessages.channel, channel)];
  if (before) {
    conditions.push(lt(roomMessages.id, parseInt(before, 10)));
  }

  const messages = await db
    .select()
    .from(roomMessages)
    .where(and(...conditions))
    .orderBy(desc(roomMessages.createdAt))
    .limit(limit);

  // Return in chronological order (oldest first)
  return NextResponse.json({ messages: messages.reverse() });
}

// POST /api/room
export async function POST(req: NextRequest) {
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

  if (!VALID_CHANNELS.includes(channel)) {
    return NextResponse.json(
      { error: `Invalid channel. Must be one of: ${VALID_CHANNELS.join(', ')}` },
      { status: 400 }
    );
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
}
