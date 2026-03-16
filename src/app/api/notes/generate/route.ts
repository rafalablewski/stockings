import { NextRequest, NextResponse } from 'next/server';
import { checkAiGate } from '@/lib/ai-gate';
import { classifyAnthropicError } from '@/lib/anthropic-error';

/**
 * POST /api/notes/generate
 *
 * Generates a title and description for a note using Claude.
 * Gated by the global AI toggle (x-ai-disabled header).
 *
 * Body: { content: string }
 * Response: { title: string, description: string }
 */
export async function POST(request: NextRequest) {
  const gateError = checkAiGate(request);
  if (gateError) return gateError;

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';

  try {
    const { content } = await request.json();

    if (!content || typeof content !== 'string' || !content.trim()) {
      return NextResponse.json({ error: 'content is required' }, { status: 400 });
    }

    if (!ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'AI features require an Anthropic API key.' },
        { status: 503 },
      );
    }

    // Truncate very long notes to fit context window
    const truncated = content.length > 8000
      ? content.slice(0, 8000) + '\n\n[... truncated ...]'
      : content;

    const prompt = `Given the following note, generate a short title and a 1-2 sentence description/summary.

NOTE:
${truncated}

Respond in this exact JSON format and nothing else:
{"title": "...", "description": "..."}

Rules:
- Title: max 60 characters, concise, capture the main topic
- Description: max 50 words, one sentence, summarize the key point(s)
- Do NOT wrap in markdown code blocks
- Respond with raw JSON only`;

    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 256,
        messages: [{ role: 'user', content: prompt }],
      }),
      signal: AbortSignal.timeout(15000),
    });

    if (!claudeRes.ok) {
      const errText = await claudeRes.text();
      console.error('[notes/generate] Claude API error:', claudeRes.status, errText);
      const errInfo = classifyAnthropicError(claudeRes.status, errText);
      return NextResponse.json({ error: errInfo.message, code: errInfo.code }, { status: errInfo.status });
    }

    const claudeData = await claudeRes.json();
    const rawText = claudeData.content?.[0]?.text || '';

    // Parse the JSON response
    try {
      const parsed = JSON.parse(rawText.trim());
      // Clamp description to 50 words max
      const rawDesc = String(parsed.description || '');
      const words = rawDesc.split(/\s+/);
      const clampedDesc = words.length > 50
        ? words.slice(0, 50).join(' ') + '...'
        : rawDesc;

      return NextResponse.json({
        title: String(parsed.title || '').slice(0, 80),
        description: clampedDesc,
      });
    } catch {
      console.error('[notes/generate] Failed to parse Claude response:', rawText);
      return NextResponse.json(
        { error: 'AI returned an unexpected format' },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error('[notes/generate] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
