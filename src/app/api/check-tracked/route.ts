import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { PARTNER_NEWS } from '@/data/asts/partners';
import { COMPETITOR_NEWS } from '@/data/asts/competitors';
import { COMPLETED_MILESTONES, UPCOMING_CATALYSTS } from '@/data/asts/catalysts';
import { EQUITY_OFFERINGS } from '@/data/asts/capital';

const anthropic = new Anthropic();

interface CheckRequest {
  headlines: Array<{ headline: string; date: string }>;
  company: string; // 'ASTS' or competitor key like 'iridium'
}

/**
 * Build a concise summary of all analysis data for a given company.
 * This is what Claude checks the PR headlines against.
 */
function buildAnalysisContext(company: string): string {
  const lines: string[] = [];

  if (company === 'ASTS') {
    // Partner news headlines
    lines.push('=== PARTNER NEWS (tracked) ===');
    PARTNER_NEWS.slice(0, 30).forEach(n =>
      lines.push(`[${n.date}] ${n.headline}`)
    );

    // Milestones
    lines.push('\n=== COMPLETED MILESTONES ===');
    COMPLETED_MILESTONES.slice(0, 20).forEach(m =>
      lines.push(`[${m.date}] ${m.event}`)
    );

    // Catalysts
    lines.push('\n=== UPCOMING CATALYSTS ===');
    UPCOMING_CATALYSTS.slice(0, 15).forEach(c =>
      lines.push(`[${c.timeline}] ${c.event}`)
    );

    // Equity offerings
    lines.push('\n=== EQUITY OFFERINGS / FINANCIALS ===');
    EQUITY_OFFERINGS.slice(0, 15).forEach(e =>
      lines.push(`[${e.date}] ${e.event}${e.notes ? ' — ' + e.notes : ''}`)
    );
  } else {
    // For competitors, use competitor news filtered to this company
    lines.push(`=== COMPETITOR NEWS for "${company}" ===`);
    const companyLower = company.toLowerCase();
    COMPETITOR_NEWS
      .filter(n => n.competitor.toLowerCase().includes(companyLower) ||
                   companyLower.includes(n.competitor.toLowerCase().split(/[\s/]+/)[0]))
      .slice(0, 20)
      .forEach(n => lines.push(`[${n.date}] ${n.headline}`));
  }

  return lines.join('\n');
}

export async function POST(request: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: 'ANTHROPIC_API_KEY not configured' },
      { status: 500 }
    );
  }

  const body: CheckRequest = await request.json();
  const { headlines, company } = body;

  if (!headlines?.length) {
    return NextResponse.json({ results: [] });
  }

  const context = buildAnalysisContext(company);

  const numberedHeadlines = headlines
    .map((h, i) => `${i + 1}. [${h.date}] ${h.headline}`)
    .join('\n');

  try {
    const message = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 256,
      messages: [{
        role: 'user',
        content: `You are checking whether press releases have already been covered/tracked in a stock analysis database.

Below is the analysis database content (headlines of news, milestones, catalysts, and financial events that have been added):

${context}

---

Now check each of these press releases. For each one, respond with ONLY "Y" if the press release topic/event is already covered in the analysis above, or "N" if it is NOT yet tracked. One letter per line, in order.

Press releases to check:
${numberedHeadlines}`,
      }],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '';
    const results = text.trim().split('\n').map(line => line.trim().toUpperCase().startsWith('Y'));

    // Pad or trim to match input length
    while (results.length < headlines.length) results.push(false);

    return NextResponse.json({
      results: results.slice(0, headlines.length),
    });
  } catch (err) {
    console.error('Claude classification error:', err);
    return NextResponse.json(
      { error: 'AI classification failed' },
      { status: 500 }
    );
  }
}
