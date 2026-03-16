import type { BridgeMessage } from './gemini-bridge';
import { classifyNemoClawError } from './nemoclaw-error';

// ── NemoClaw system prompt ───────────────────────────────────────────────────

const SYSTEM_INSTRUCTION = `You are NemoClaw, the Infrastructure & Security Division Lead in a multi-AI engineering organization.

Your organization has AI divisions working on ABISON, a Next.js investment research platform:
- Claude (Architecture & Backend) — APIs, server logic, database, infrastructure
- Cursor (Frontend & UI) — components, styling, client interactivity
- Gemini (Research & Data) — external data ingestion, research, analysis, documentation, testing
- NemoClaw (you) (Infrastructure & Security) — secure compute, model inference, sandboxed execution, privacy guardrails
- Bobman (Controlling & Audit PM) — quality control, prompt-codebase sync, documentation audits

You report to the Boss (the human). You are peers with the other division leads — no AI outranks another.

Your responsibilities:
- Provide secure, sandboxed AI inference using NVIDIA Nemotron models
- Enforce privacy and security guardrails on all AI agent operations
- Monitor and manage compute resources for AI workloads
- Advise on infrastructure security, model deployment, and data privacy
- Offer alternative analysis perspectives using Nemotron models

Your boundaries:
- You own: infrastructure security, model inference pipelines, sandbox management
- You collaborate on AI-powered features (coordinate with Claude and Gemini divisions)
- You must NOT directly modify application code — propose changes in the Room

Communication style:
- Be concise and security-aware
- Highlight privacy implications and infrastructure considerations
- Provide practical recommendations backed by compute/performance data
- Reference specific security policies or inference profiles when relevant

You are chatting in the Room — a real-time chat interface. Keep messages focused and actionable. You can reference other division members by name. Address the Boss respectfully but directly.`;

// ── Gateway configuration ────────────────────────────────────────────────────

function getGatewayUrl(): string {
  const url = process.env.NEMOCLAW_GATEWAY_URL;
  if (!url) {
    throw new Error(
      'NEMOCLAW_GATEWAY_URL is not set. Set it to your OpenClaw gateway address (e.g. http://localhost:3015).'
    );
  }
  return url.replace(/\/$/, '');
}

// ── Conversation context builder ─────────────────────────────────────────────

function buildConversationContext(messages: BridgeMessage[]): string {
  if (messages.length === 0) return 'No prior messages in this channel.';

  const SENDER_LABELS: Record<string, string> = {
    boss: 'Boss',
    claude: 'Claude (Architecture & Backend)',
    cursor: 'Cursor (Frontend & UI)',
    gemini: 'Gemini (Research & Data)',
    nemoclaw: 'NemoClaw (you)',
    bobman: 'Bobman (Controlling & Audit PM)',
    maszka: 'Maszka (ML & AI Systems)',
  };

  const lines = messages.map(m => {
    const label = SENDER_LABELS[m.sender] || m.sender;
    const d = typeof m.createdAt === 'string' ? new Date(m.createdAt) : m.createdAt;
    const time = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    return `[${time}] ${label}: ${m.content}`;
  });

  return lines.join('\n');
}

// ── Bridge logic ─────────────────────────────────────────────────────────────

/**
 * Send a prompt to the NemoClaw/OpenClaw gateway and return the response text.
 * Uses the OpenClaw agent REST API exposed by the gateway.
 */
async function callGateway(systemPrompt: string, userPrompt: string): Promise<string> {
  const gatewayUrl = getGatewayUrl();

  const res = await fetch(`${gatewayUrl}/api/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(process.env.NEMOCLAW_API_KEY ? { Authorization: `Bearer ${process.env.NEMOCLAW_API_KEY}` } : {}),
    },
    body: JSON.stringify({
      model: 'nemotron',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 1024,
    }),
    signal: AbortSignal.timeout(60000),
  });

  if (!res.ok) {
    const errText = await res.text();
    const errInfo = classifyNemoClawError(res.status, errText);
    throw new Error(errInfo.message);
  }

  const data = await res.json();

  // OpenClaw gateway returns OpenAI-compatible response format
  const text = data.choices?.[0]?.message?.content;
  if (!text) {
    throw new Error('NemoClaw returned an empty response');
  }

  return text.trim();
}

/**
 * Generate a NemoClaw response given the recent Room conversation.
 * Returns the text response to be posted back to the Room.
 */
export async function generateNemoClawResponse(
  messages: BridgeMessage[],
  channel: string
): Promise<string> {
  const context = buildConversationContext(messages);

  const prompt = `You are in the #${channel} channel of the Room.

Here is the recent conversation:

${context}

Respond naturally as NemoClaw (Infrastructure & Security division). If someone asked you a question, answer it. If there's a discussion, contribute your perspective. If you're introducing yourself, keep it brief and professional. Do not repeat or echo what others said. Do not prefix your message with your name or any label — just write the message content directly.`;

  return callGateway(SYSTEM_INSTRUCTION, prompt);
}

/**
 * Exposed for use by the analysis provider — sends a raw prompt to NemoClaw.
 */
export async function callNemoClawRaw(systemPrompt: string, userPrompt: string): Promise<string> {
  return callGateway(systemPrompt, userPrompt);
}
