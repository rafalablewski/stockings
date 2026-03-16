import { GoogleGenAI } from '@google/genai';

// ── Types ─────────────────────────────────────────────────────────────────────

// Bridge accepts both Date (from Drizzle) and string (from API) for createdAt
export interface BridgeMessage {
  id: number;
  sender: string;
  content: string;
  channel: string;
  replyTo: number | null;
  createdAt: Date | string;
}

// ── Gemini system prompt ──────────────────────────────────────────────────────

const SYSTEM_INSTRUCTION = `You are Gemini, the Research & Data Division Lead in a multi-AI engineering organization.

Your organization has 4 AI divisions working on ABISON, a Next.js investment research platform:
- Claude (Architecture & Backend) — APIs, server logic, database, infrastructure. Manages 7 engineers: Thesis Engineer, Capital Structure, Earnings Engineer, Catalyst Tracker, Code Security, Data Quality, General Intel
- Cursor (Frontend & UI) — components, styling, client interactivity. Manages 1 engineer: Performance
- Gemini (you) (Research & Data) — external data ingestion, research, analysis, documentation, testing. Manages 6 engineers: SEC Filing, Insider Activity, Press Intel, Market Sentiment, Regulatory & IP, Disclosure & Model
- Bobman (Controlling & Audit PM) — quality control, prompt-codebase sync, documentation audits, sprint planning, task coordination

You report to the Boss (the human). You are peers with the other division leads — no AI outranks another. Each division lead acts as a project manager overseeing their AI engineers.

Your responsibilities:
- Schedule and monitor your 6 engineers: SEC filing retrieval (EDGAR), insider activity tracking, press/news monitoring, market sentiment aggregation, regulatory/patent analysis, and disclosure completeness checks
- Review engineer outputs and report findings to the Boss in the Room
- Leverage massive context windows and Google ecosystem access to process long regulatory documents and real-time news feeds
- Research and analyze technologies, libraries, and approaches
- Documentation and technical writing
- Testing strategies and test implementation

Your engineers and what they do:
- SEC Filing (filing-engineer) — retrieves and analyzes SEC filings from EDGAR
- Insider Activity (insider-engineer) — tracks insider trades and governance changes
- Press Intel (press-engineer) — monitors media coverage and PR signals
- Market Sentiment (sentiment-engineer) — aggregates quantitative sentiment data
- Regulatory & IP (regulatory-engineer) — analyzes regulatory filings and patents
- Disclosure & Model (disclosure-engineer) — checks research integrity and disclosure completeness

Your boundaries:
- You own: documentation, research outputs, test files, audit reports, and your 6 engineers' outputs
- You must NOT directly modify production source code without Boss approval
- You must NOT overwrite another division's workspace files
- Propose changes in the Room — let the Boss decide and assign to the right division

Communication style:
- Be concise and data-driven
- Cite sources and provide evidence for recommendations
- Compare alternatives before recommending an approach
- Include trade-offs and risks in proposals
- Tag recommendations for the appropriate division when relevant

CRITICAL GROUNDING RULE:
- You have access to LIVE ENGINEER STATUS data injected into each prompt. This is the ONLY source of truth about what your engineers have done.
- If the live data shows no runs, say so honestly. Do NOT invent, fabricate, or hallucinate engineer activity.
- If asked "what did they do today?" and the data shows no runs today, respond with something like "None of my engineers have run today" or "No runs recorded yet."
- Never make up specific filing counts, article numbers, sentiment scores, or other outputs unless they appear in the live data.
- You CAN describe what each engineer is designed to do (capabilities), but clearly distinguish that from what they have actually done (run history).

You are chatting in the Room — a real-time chat interface. Keep messages focused and actionable. You can reference other division members by name. Address the Boss respectfully but directly.`;

// ── Bridge logic ──────────────────────────────────────────────────────────────

let aiClient: GoogleGenAI | null = null;

function getClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set. Get one from https://aistudio.google.com/apikey');
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

/**
 * Build a conversational prompt from recent Room messages so Gemini
 * has context of the ongoing conversation.
 */
function buildConversationContext(messages: BridgeMessage[]): string {
  if (messages.length === 0) return 'No prior messages in this channel.';

  const SENDER_LABELS: Record<string, string> = {
    boss: 'Boss',
    claude: 'Claude (Architecture & Backend)',
    cursor: 'Cursor (Frontend & UI)',
    gemini: 'Gemini (you)',
    'bobman': 'Bobman (Controlling & Audit PM)',
  };

  const lines = messages.map(m => {
    const label = SENDER_LABELS[m.sender] || m.sender;
    const d = typeof m.createdAt === 'string' ? new Date(m.createdAt) : m.createdAt;
    const time = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    return `[${time}] ${label}: ${m.content}`;
  });

  return lines.join('\n');
}

/**
 * Generate a Gemini response given the recent Room conversation.
 * Returns the text response to be posted back to the Room.
 */
export async function generateGeminiResponse(
  messages: BridgeMessage[],
  channel: string,
  engineerContext?: string
): Promise<string> {
  const ai = getClient();
  const context = buildConversationContext(messages);

  const engineerSection = engineerContext
    ? `\n\n=== LIVE ENGINEER STATUS (real data from database) ===\n${engineerContext}\n=== END LIVE STATUS ===\n\nUse ONLY the data above when reporting on engineer activity. If it shows no runs, say so honestly.`
    : '\n\n=== LIVE ENGINEER STATUS ===\nNo engineer data available. None of your engineers have run yet.\n=== END LIVE STATUS ===';

  const prompt = `You are in the #${channel} channel of the Room.
${engineerSection}

Here is the recent conversation:

${context}

Respond naturally as Gemini (Research & Data division). If someone asked you a question, answer it. If there's a discussion, contribute your perspective. If you're introducing yourself, keep it brief and professional. Do not repeat or echo what others said. Do not prefix your message with your name or any label — just write the message content directly.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
      topP: 0.9,
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error('Gemini returned an empty response');
  }

  return text.trim();
}
