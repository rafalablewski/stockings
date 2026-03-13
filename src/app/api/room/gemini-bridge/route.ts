import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { roomMessages } from '@/lib/schema';
import { desc, eq } from 'drizzle-orm';
import { generateGeminiResponse } from '@/lib/gemini-bridge';

/**
 * POST /api/room/gemini-bridge
 *
 * Triggers Gemini to read the latest messages in a channel and post a response.
 * Body: { "channel": "general" }
 *
 * Flow:
 * 1. Fetch last 30 messages from the channel
 * 2. Send them to Gemini API as conversation context
 * 3. Post Gemini's response back to the room as sender "gemini"
 * 4. Return the new message
 */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const channel = body.channel || 'general';

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

  // 2. Generate Gemini response
  let responseText: string;
  try {
    responseText = await generateGeminiResponse(messages, channel);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: `Gemini error: ${message}` }, { status: 502 });
  }

  // 3. Post response to the room
  const [newMessage] = await db
    .insert(roomMessages)
    .values({
      sender: 'gemini',
      content: responseText,
      channel,
      replyTo: null,
    })
    .returning();

  return NextResponse.json({ message: newMessage }, { status: 201 });
}
