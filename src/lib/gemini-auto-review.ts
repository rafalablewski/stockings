// ============================================================================
// GEMINI AUTO-REVIEW — AI-powered decision review using Google Gemini
// ============================================================================
// When an engineer has `autoReviewBy: 'gemini'`, the engine calls this module
// after creating a pmDecision. Gemini validates/enhances the upstream analysis
// using its large context window, then approves or rejects the decision.
//
// Flow: Engineer output → pmDecision created → Gemini auto-review →
//       if approved → chainsTo fires (e.g. DB Ingestor)
//       if rejected → decision sits in Dashboard for manual override
// ============================================================================

import { getClient } from './gemini-bridge';
import { getDb } from './db';
import { pmDecisions, roomMessages } from './schema';
import { eq } from 'drizzle-orm';

const GEMINI_MODEL = 'gemini-2.5-flash';
const REVIEW_TIMEOUT_MS = 60_000; // 60s timeout for Gemini review

export interface AutoReviewResult {
  approved: boolean;
  enhancedPayload?: string;
  notes: string;
}

/**
 * Auto-review a PM decision using the Gemini AI model.
 *
 * Returns { approved, enhancedPayload?, notes } and updates the pmDecisions
 * row in-place with the review outcome.
 */
export async function autoReviewDecision(
  decisionId: number,
  pm: string,
  payload: string,
  engineer: { id: string; name: string; chainsTo?: string },
  ticker: string,
): Promise<AutoReviewResult> {
  // Only Gemini auto-review is supported for now
  if (pm !== 'gemini') {
    console.warn(`[auto-review] Unsupported PM for auto-review: ${pm}. Skipping.`);
    return { approved: false, notes: `Auto-review not supported for PM: ${pm}` };
  }

  try {
    const ai = getClient();

    const prompt = buildReviewPrompt(engineer, ticker, payload);

    const response = await Promise.race([
      ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt,
        config: {
          systemInstruction: REVIEW_SYSTEM_INSTRUCTION,
          temperature: 0.3,
          topP: 0.9,
        },
      }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Gemini review timed out')), REVIEW_TIMEOUT_MS),
      ),
    ]);

    const text = response.text?.trim();
    if (!text) {
      return handleReviewFailure(decisionId, ticker, engineer, 'Gemini returned empty response');
    }

    // Parse the structured review decision
    const parsed = parseReviewResponse(text);
    const db = getDb();

    if (parsed.decision === 'APPROVE' || parsed.decision === 'ENHANCE') {
      await db.update(pmDecisions)
        .set({
          status: 'pm-approved',
          pmNotes: `[Auto-Review by Gemini] ${parsed.notes}`,
          ...(parsed.decision === 'ENHANCE' && parsed.enhancedPayload
            ? { payload: parsed.enhancedPayload }
            : {}),
          updatedAt: new Date(),
        })
        .where(eq(pmDecisions.id, decisionId));

      // Room notification
      const chainLabel = engineer.chainsTo ? ` → chaining to ${engineer.chainsTo}` : '';
      db.insert(roomMessages).values({
        sender: 'gemini',
        content: `[Auto-Review] ${engineer.name} output for ${ticker} — **APPROVED**${chainLabel}. ${parsed.notes.slice(0, 200)}`,
        channel: 'research',
      }).catch(err => console.error('[auto-review] Room notify failed:', err));

      return {
        approved: true,
        enhancedPayload: parsed.enhancedPayload,
        notes: parsed.notes,
      };
    } else {
      // REJECT
      await db.update(pmDecisions)
        .set({
          status: 'pm-rejected',
          pmNotes: `[Auto-Review by Gemini] ${parsed.notes}`,
          updatedAt: new Date(),
        })
        .where(eq(pmDecisions.id, decisionId));

      db.insert(roomMessages).values({
        sender: 'gemini',
        content: `[Auto-Review] ${engineer.name} output for ${ticker} — **REJECTED**. ${parsed.notes.slice(0, 200)}`,
        channel: 'research',
      }).catch(err => console.error('[auto-review] Room notify failed:', err));

      return { approved: false, notes: parsed.notes };
    }
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    return handleReviewFailure(decisionId, ticker, engineer, errMsg);
  }
}

// ── Review prompt ────────────────────────────────────────────────────────────

const REVIEW_SYSTEM_INSTRUCTION = `You are Gemini, the Research & Data Division Lead. You are reviewing the output of one of your engineers.

Your job is to validate the quality of SEC filing analysis produced by the Filing Engineer (which uses Claude Haiku for fast initial analysis). The approved output then chains to the SEC DB Ingestor, which performs 7-phase deep analysis (materiality triage, form-type extraction, cross-filing correlation, conflict detection, patch generation, pre-write gate, executive summary). You have a much larger context window and are better suited to validate long regulatory documents.

Be rigorous but practical. Approve work that is directionally correct and useful. Reject only if there are clear errors, hallucinated data, or dangerously wrong classifications.`;

function buildReviewPrompt(
  engineer: { id: string; name: string },
  ticker: string,
  payload: string,
): string {
  return `You are reviewing the output of "${engineer.name}" for ticker ${ticker}.

The Filing Engineer used Claude Haiku to analyze newly detected SEC filings. If approved, output chains to the SEC DB Ingestor for 7-phase deep extraction and patch generation. Your role as Gemini PM is to:

1. **Validate verdict classifications** — Are CRITICAL/IMPORTANT/ROUTINE/LOW ratings justified by the filing content?
2. **Check for hallucinated data** — Are claimed financial figures, dates, or events actually present in the analysis context?
3. **Assess completeness** — Did the analysis capture the key points, or did it miss material information? The DB Ingestor will perform deep extraction, but it relies on accurate scanner output.
4. **Enhance if needed** — If the analysis is mostly correct but could be better, provide an enhanced version.

═══════════════════════════════════════════════════════════════
ENGINEER OUTPUT TO REVIEW:
═══════════════════════════════════════════════════════════════

${payload}

═══════════════════════════════════════════════════════════════
END OF ENGINEER OUTPUT
═══════════════════════════════════════════════════════════════

Provide your review in this EXACT format:

[REVIEW: APPROVE|REJECT|ENHANCE]

NOTES: <your review notes — what's good, what's wrong, what you changed>

${/* Only include if ENHANCE */''}ENHANCED_PAYLOAD_START
<enhanced version of the full payload — only include this section if your decision is ENHANCE>
ENHANCED_PAYLOAD_END

Rules:
- APPROVE if the analysis is accurate and classifications are correct
- ENHANCE if mostly correct but you can materially improve it (add missing data, fix a misclassification)
- REJECT only if there are clear factual errors, hallucinated numbers, or dangerous misclassifications
- When in doubt, APPROVE — the Filing Engineer's work feeds into a human-reviewed pipeline`;
}

// ── Response parsing ─────────────────────────────────────────────────────────

interface ParsedReview {
  decision: 'APPROVE' | 'REJECT' | 'ENHANCE';
  notes: string;
  enhancedPayload?: string;
}

function parseReviewResponse(text: string): ParsedReview {
  // Extract decision
  const decisionMatch = text.match(/\[REVIEW:\s*(APPROVE|REJECT|ENHANCE)\]/i);
  const decision = (decisionMatch?.[1]?.toUpperCase() || 'APPROVE') as ParsedReview['decision'];

  // Extract notes
  const notesMatch = text.match(/NOTES:\s*([\s\S]*?)(?=ENHANCED_PAYLOAD_START|$)/i);
  const notes = notesMatch?.[1]?.trim() || 'No review notes provided.';

  // Extract enhanced payload (only for ENHANCE)
  let enhancedPayload: string | undefined;
  if (decision === 'ENHANCE') {
    const payloadMatch = text.match(/ENHANCED_PAYLOAD_START\s*([\s\S]*?)\s*ENHANCED_PAYLOAD_END/i);
    enhancedPayload = payloadMatch?.[1]?.trim();
  }

  return { decision, notes, enhancedPayload };
}

// ── Error handling ───────────────────────────────────────────────────────────

async function handleReviewFailure(
  decisionId: number,
  ticker: string,
  engineer: { id: string; name: string },
  errorMsg: string,
): Promise<AutoReviewResult> {
  console.error(`[auto-review] Failed for decision #${decisionId}:`, errorMsg);

  // On infra failure (missing API key, timeout, etc.), pass through as approved
  // so the pipeline continues. Only an explicit REJECT from Gemini blocks the chain.
  const db = getDb();
  await db.update(pmDecisions)
    .set({
      status: 'pm-approved',
      pmNotes: `[Auto-Review Skipped] ${errorMsg}. Approved automatically — review skipped due to infra error.`,
      updatedAt: new Date(),
    })
    .where(eq(pmDecisions.id, decisionId))
    .catch(err => console.error('[auto-review] DB update failed:', err));

  db.insert(roomMessages).values({
    sender: 'gemini',
    content: `[Auto-Review] Skipped for ${engineer.name} output (${ticker}): ${errorMsg}. Passing through to downstream chain.`,
    channel: 'research',
  }).catch(err => console.error('[auto-review] Room notify failed:', err));

  return { approved: true, notes: `Auto-review skipped (infra): ${errorMsg}` };
}
