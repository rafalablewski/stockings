import { NextRequest, NextResponse } from 'next/server';
import { ANTHROPIC_API_KEY } from '@/config/api-keys';
import { PARTNER_NEWS } from '@/data/asts/partners';
import { COMPETITOR_NEWS } from '@/data/asts/competitors';
import { COMPLETED_MILESTONES, UPCOMING_CATALYSTS } from '@/data/asts/catalysts';
import { EQUITY_OFFERINGS } from '@/data/asts/capital';

export const runtime = 'nodejs';

interface CheckRequest {
  headlines: Array<{ headline: string; date: string }>;
  company: string;
}

function buildAnalysisContext(company: string): string {
  const lines: string[] = [];

  if (company === 'ASTS') {
    lines.push('=== PARTNER NEWS (tracked) ===');
    PARTNER_NEWS.slice(0, 30).forEach(n =>
      lines.push(`[${n.date}] ${n.headline}`)
    );
    lines.push('\n=== COMPLETED MILESTONES ===');
    COMPLETED_MILESTONES.slice(0, 20).forEach(m =>
      lines.push(`[${m.date}] ${m.event}`)
    );
    lines.push('\n=== UPCOMING CATALYSTS ===');
    UPCOMING_CATALYSTS.slice(0, 15).forEach(c =>
      lines.push(`[${c.timeline}] ${c.event}`)
    );
    lines.push('\n=== EQUITY OFFERINGS / FINANCIALS ===');
    EQUITY_OFFERINGS.slice(0, 15).forEach(e =>
      lines.push(`[${e.date}] ${e.event}${e.notes ? ' — ' + e.notes : ''}`)
    );
  } else {
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
  if (!ANTHROPIC_API_KEY) {
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

  const prompt = `You are checking whether press releases have already been covered/tracked in a stock analysis database.

Below is the analysis database content (headlines of news, milestones, catalysts, and financial events that have been added):

${context}

---

Now check each of these press releases. For each one, respond with ONLY "Y" if the press release topic/event is already covered in the analysis above, or "N" if it is NOT yet tracked. One letter per line, in order.

Press releases to check:
${numberedHeadlines}`;

  try {
    // Direct fetch to Anthropic API — no SDK needed, avoids Turbopack bundling issues
    const res = await fetch('https://api.anthropic.com/v1/messages', {
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
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error('Anthropic API error:', res.status, errBody);
      return NextResponse.json(
        { error: 'AI classification failed', detail: errBody },
        { status: 500 }
      );
    }

    const data = await res.json();
    const text = data.content?.[0]?.type === 'text' ? data.content[0].text : '';
    const results = text.trim().split('\n').map((line: string) => line.trim().toUpperCase().startsWith('Y'));

    while (results.length < headlines.length) results.push(false);

    return NextResponse.json({
      results: results.slice(0, headlines.length),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('Classification error:', msg);
    return NextResponse.json(
      { error: 'AI classification failed', detail: msg },
      { status: 500 }
    );
  }
}
