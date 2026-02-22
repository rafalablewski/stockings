import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  const ANTHROPIC_API_KEY = (process.env as Record<string, string | undefined>)['ANTHROPIC_API_KEY'] || '';

  if (!ANTHROPIC_API_KEY) {
    return new Response(JSON.stringify({ error: 'ANTHROPIC_API_KEY not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { prompt, data, dataLabel } = body as { prompt: string; data: string; dataLabel?: string };

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Missing prompt' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Build the full message: prompt + optional data context
    const label = dataLabel || 'USER-PROVIDED DATA';
    const dataSeparator = `\n\n${'═'.repeat(60)}\n${label}\n${'═'.repeat(60)}\n\n`;

    let fullMessage = prompt;
    if (data) {
      fullMessage += dataSeparator + data;
    }

    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 16384,
        stream: true,
        messages: [{ role: 'user', content: fullMessage }],
      }),
    });

    if (!claudeRes.ok) {
      const errText = await claudeRes.text();
      console.error('Claude API error:', errText);
      return new Response(JSON.stringify({ error: 'AI analysis failed' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Stream the response through
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        const reader = claudeRes.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        let buffer = '';

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const jsonStr = line.slice(6).trim();
                if (jsonStr === '[DONE]') continue;

                try {
                  const event = JSON.parse(jsonStr);
                  if (event.type === 'content_block_delta' && event.delta?.text) {
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`));
                  } else if (event.type === 'message_stop') {
                    controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                  }
                } catch {
                  // skip unparseable lines
                }
              }
            }
          }
        } catch (err) {
          console.error('Stream error:', err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Workflow run error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
