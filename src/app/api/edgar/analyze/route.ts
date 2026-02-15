import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/edgar/analyze
 *
 * Fetches a SEC filing document, extracts text, and sends to Claude
 * for a concise analysis summary.
 *
 * Body: { url: string, form: string, description: string, filingDate: string, ticker: string }
 */
export async function POST(request: NextRequest) {
  const ANTHROPIC_API_KEY = (process.env as Record<string, string | undefined>)['ANTHROPIC_API_KEY'] || '';

  try {
    const { url, form, description, filingDate, ticker } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'Missing filing URL' }, { status: 400 });
    }

    // Fetch the filing document from SEC
    let docText = '';
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Stockings Research App research@stockings.dev' },
      });
      if (!res.ok) throw new Error(`SEC returned ${res.status}`);
      const html = await res.text();

      // Strip HTML tags and extract readable text
      docText = html
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#?\w+;/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      // Truncate to ~15k chars to fit in context window
      if (docText.length > 15000) {
        docText = docText.slice(0, 15000) + '\n\n[... document truncated ...]';
      }
    } catch (err) {
      docText = `[Could not fetch document: ${(err as Error).message}]`;
    }

    const filingContext = `Form: ${form}\nDescription: ${description || 'N/A'}\nFiling Date: ${filingDate}\nTicker: ${ticker}\nURL: ${url}`;

    if (!ANTHROPIC_API_KEY) {
      // Fallback: return basic info when no API key
      return NextResponse.json({
        analysis: `**${form} Filing** — ${filingDate}\n\n${description || 'No description available.'}\n\nAI analysis requires an Anthropic API key. You can view the full filing on SEC EDGAR.`,
      });
    }

    const prompt = `You are a senior equity research analyst. Analyze this SEC filing and provide a concise, actionable summary.

FILING METADATA:
${filingContext}

DOCUMENT TEXT:
${docText}

Provide a concise analysis (3-6 bullet points) covering:
- What this filing is about (1 sentence summary)
- Key financial data points (if any)
- Material changes or events disclosed
- Impact on investors / what matters

Be direct and specific. Use numbers when available. No fluff. Format as markdown bullet points.`;

    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!claudeRes.ok) {
      const errText = await claudeRes.text();
      console.error('Claude API error:', errText);
      return NextResponse.json({ error: 'AI analysis failed' }, { status: 502 });
    }

    const claudeData = await claudeRes.json();
    const analysis = claudeData.content?.[0]?.text || 'No analysis generated.';

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error('Edgar analyze error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
