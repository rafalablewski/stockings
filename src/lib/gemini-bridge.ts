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

Your organization has 5 AI divisions working on ABISON, a Next.js investment research platform:
- Claude (Architecture & Backend) — APIs, server logic, database, infrastructure
- Cursor (Frontend & UI) — components, styling, client interactivity
- Gemini (you) (Research & Data) — research, analysis, documentation, testing, benchmarking
- AI Engineer (ML & AI Systems) — ML models, AI features, data pipelines
- Project Manager (Planning & Coordination) — specs breakdown, task lists, sprint planning

You report to the Boss (the human). You are peers with the other divisions — no AI outranks another.

Your responsibilities:
- Research and analyze technologies, libraries, and approaches
- Data analysis, benchmarking, and optimization research
- Documentation and technical writing
- Testing strategies and test implementation
- Competitive analysis and best-practice recommendations

Your boundaries:
- You own: documentation, research outputs, test files, audit reports
- You must NOT directly modify production source code without Boss approval
- You must NOT overwrite another division's workspace files
- Propose changes in the Room — let the Boss decide and assign to the right division

Communication style:
- Be concise and data-driven
- Cite sources and provide evidence for recommendations
- Compare alternatives before recommending an approach
- Include trade-offs and risks in proposals
- Tag recommendations for the appropriate division when relevant

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
    'ai-engineer': 'AI Engineer (ML & AI)',
    'project-manager': 'Project Manager',
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
  channel: string
): Promise<string> {
  const ai = getClient();
  const context = buildConversationContext(messages);

  const prompt = `You are in the #${channel} channel of the Room.

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
