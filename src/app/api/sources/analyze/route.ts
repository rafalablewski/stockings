import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/sources/analyze
 *
 * Fetches a news article or press release, extracts text, and sends to Claude
 * for a concise analysis summary (similar to EDGAR filing analysis).
 *
 * Body: { url: string, headline: string, source?: string, date?: string, ticker: string }
 */
export async function POST(request: NextRequest) {
  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';

  try {
    const { url, headline, source, date, ticker } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'Missing article URL' }, { status: 400 });
    }

    // Fetch the article from the URL
    let docText = '';
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Stockings Research App research@stockings.dev' },
      });
      if (!res.ok) throw new Error(`Source returned ${res.status}`);
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
        docText = docText.slice(0, 15000) + '\n\n[... article truncated ...]';
      }
    } catch (err) {
      docText = `[Could not fetch article: ${(err as Error).message}]`;
    }

    const articleContext = `Headline: ${headline}\nSource: ${source || 'N/A'}\nDate: ${date || 'N/A'}\nTicker: ${ticker}\nURL: ${url}`;

    if (!ANTHROPIC_API_KEY) {
      return NextResponse.json({
        analysis: `**${headline}**\n\n${source ? `Source: ${source}` : ''}${date ? ` | ${date}` : ''}\n\nAI analysis requires an Anthropic API key.`,
      });
    }

    const prompt = `You are a senior equity research analyst. Analyze this news article or press release and provide a concise, actionable summary relevant to ${ticker}.

ARTICLE METADATA:
${articleContext}

ARTICLE TEXT:
${docText}

Provide a concise analysis (3-6 bullet points) covering:
- What this article is about (1 sentence summary)
- Key data points, financial figures, or announcements (if any)
- Relevance to ${ticker} investors — what matters and why
- Any potential impact on the stock thesis

Be direct and specific. Use numbers when available. No fluff. Format as markdown bullet points.

After the bullet points, on a NEW line, provide a RELEVANCE assessment in this exact format:
[VERDICT: <level>] — <one-line explanation>

Where <level> is one of:
- Critical: Contains material new information that directly impacts the investment thesis
- Important: Contains useful data worth noting (earnings context, sector news, competitor moves)
- Low: Routine coverage with no material new information
- Already Incorporated: Information likely already captured in the research database`;

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
    console.error('Sources analyze error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
