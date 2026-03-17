import { NextRequest } from 'next/server';
import { checkAiGate } from '@/lib/ai-gate';
import { classifyAnthropicError } from '@/lib/anthropic-error';
import { resolvePromptPlaceholders } from '@/lib/prompt-placeholders';
import { workflows } from '@/data/workflows';
import { getDb } from '@/lib/db';
import { agentRuns } from '@/lib/schema';
import { asts, bmnr, crcl } from '@/data';

// Map ticker -> company data for context injection
const TICKER_DATA: Record<string, { COMPANY_INFO: { name: string; ticker: string; exchange: string; sector: string; description: string } }> = {
  asts, bmnr, crcl,
};

export async function POST(request: NextRequest) {
  const gateError = checkAiGate(request);
  if (gateError) return gateError;

  const ANTHROPIC_API_KEY = (process.env as Record<string, string | undefined>)['ANTHROPIC_API_KEY'] || '';

  if (!ANTHROPIC_API_KEY) {
    return new Response(JSON.stringify({ error: 'ANTHROPIC_API_KEY not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { prompt, data, ticker, workflowId, workflowName } = body as {
      prompt: string;
      data?: string;
      ticker?: string;
      workflowId?: string;
      workflowName?: string;
    };

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Missing prompt' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const startTime = Date.now();

    // Resolve any {{PLACEHOLDER}} tokens in the prompt (stock context, tabs, workflow tab guidance)
    const workflow = workflowId ? workflows.find(w => w.id === workflowId) : undefined;
    const resolvedPrompt = resolvePromptPlaceholders(prompt, ticker, undefined, workflow?.tabGuidance);

    // Build the full message: today's date + company context + prompt + optional user data
    const dataSeparator = '\n\n════════════════════════════════════════════════════════════\nUSER-PROVIDED DATA\n════════════════════════════════════════════════════════════\n\n';

    const today = new Date().toISOString().split('T')[0];
    // Inject company context if ticker is provided
    let companyCtx = '';
    if (ticker) {
      const companyData = TICKER_DATA[ticker.toLowerCase()];
      if (companyData?.COMPANY_INFO) {
        const c = companyData.COMPANY_INFO;
        companyCtx = `\nCompany: ${c.name} (${c.exchange}: ${c.ticker})\nSector: ${c.sector}\nDescription: ${c.description}\n`;
      }
    }
    // Replace any remaining {{CURRENT_DATE}} placeholders with today's date
    const datedPrompt = resolvedPrompt.replace(/\{\{CURRENT_DATE\}\}/g, today);
    let fullMessage = `[Today's date: ${today}]${companyCtx}\n\n${datedPrompt}`;
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
      console.error('Claude API error:', claudeRes.status, errText);
      const errInfo = classifyAnthropicError(claudeRes.status, errText);
      return new Response(JSON.stringify({ error: errInfo.message, code: errInfo.code }), {
        status: errInfo.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Stream the response through, collecting full output for history
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    let fullOutput = '';

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
                    fullOutput += event.delta.text;
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

          // Save to history (fire-and-forget, don't block the stream)
          if (ticker) {
            const durationMs = Date.now() - startTime;
            try {
              const db = getDb();
              await db.insert(agentRuns).values({
                ticker,
                engineerId: 'manual-workflow',
                workflowId: workflowId || null,
                status: 'completed',
                triggerType: 'manual',
                triggerReason: `Manual run: ${workflowName || workflowId || 'workflow'}`,
                inputSummary: data ? `User data: ${data.slice(0, 200)}...` : 'Prompt only',
                outputSummary: fullOutput.slice(0, 500),
                outputFull: fullOutput,
                durationMs,
                startedAt: new Date(startTime),
                completedAt: new Date(),
              });
            } catch (dbErr) {
              console.error('Failed to save workflow run to history:', dbErr);
            }
          }
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
