import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { roomMessages } from '@/lib/schema';
import { desc, eq } from 'drizzle-orm';
import { generateNemoClawResponse } from '@/lib/nemoclaw-bridge';
import { VALID_CHANNELS } from '@/lib/types';

/**
 * POST /api/room/nemoclaw-bridge
 *
 * Triggers NemoClaw to read the latest messages in a channel and post a response.
 * Body: { "channel": "general" }
 */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const channel = body.channel || 'general';

  if (!VALID_CHANNELS.includes(channel)) {
    return NextResponse.json(
      { error: `Invalid channel. Must be one of: ${VALID_CHANNELS.join(', ')}` },
      { status: 400 }
    );
  }

  // 1. Fetch recent messages for context
  const db = getDb();
  const recent = await db
    .select()
    .from(roomMessages)
    .where(eq(roomMessages.channel, channel))
    .orderBy(desc(roomMessages.createdAt))
    .limit(30);

  // Chronological order for the conversation
  const messages = recent.reverse();

  // 2. Generate NemoClaw response
  let responseText: string;
  try {
    responseText = await generateNemoClawResponse(messages, channel);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: `NemoClaw error: ${message}` }, { status: 502 });
  }

  // 3. Post response to the room
  const [newMessage] = await db
    .insert(roomMessages)
    .values({
      sender: 'nemoclaw',
      content: responseText,
      channel,
      replyTo: null,
    })
    .returning();

  return NextResponse.json({ message: newMessage }, { status: 201 });
}
