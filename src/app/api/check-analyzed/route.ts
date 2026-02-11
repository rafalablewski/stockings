import { NextRequest, NextResponse } from 'next/server';

interface Article {
  headline: string;
  date: string;
}

interface AnalysisEntry {
  date: string;
  headline: string;
}

// Dynamically collect all analysis data for a ticker
async function getAnalysisData(ticker: string): Promise<AnalysisEntry[]> {
  const entries: AnalysisEntry[] = [];

  try {
    if (ticker === 'ASTS') {
      const [partners, competitors, catalysts, pressReleases] = await Promise.all([
        import('@/data/asts/partners'),
        import('@/data/asts/competitors'),
        import('@/data/asts/catalysts'),
        import('@/data/asts/press-releases'),
      ]);

      if (partners.PARTNER_NEWS) {
        for (const n of partners.PARTNER_NEWS) {
          entries.push({ date: n.date, headline: n.headline });
        }
      }
      if (competitors.COMPETITOR_NEWS) {
        for (const n of competitors.COMPETITOR_NEWS) {
          entries.push({ date: n.date, headline: n.headline });
        }
      }
      if (catalysts.COMPLETED_MILESTONES) {
        for (const m of catalysts.COMPLETED_MILESTONES) {
          entries.push({ date: m.date, headline: m.event });
        }
      }
      if (catalysts.UPCOMING_CATALYSTS) {
        for (const c of catalysts.UPCOMING_CATALYSTS) {
          entries.push({ date: c.timeline, headline: c.event });
        }
      }
      if (pressReleases.PRESS_RELEASES) {
        for (const pr of pressReleases.PRESS_RELEASES) {
          entries.push({ date: pr.date, headline: pr.headline });
        }
      }
    } else if (ticker === 'BMNR') {
      const catalysts = await import('@/data/bmnr/catalysts');
      if (catalysts.COMPLETED_MILESTONES) {
        for (const m of catalysts.COMPLETED_MILESTONES) {
          entries.push({ date: m.date, headline: m.event });
        }
      }
      if (catalysts.UPCOMING_CATALYSTS) {
        for (const c of catalysts.UPCOMING_CATALYSTS) {
          entries.push({ date: c.timeline, headline: c.event });
        }
      }
    } else if (ticker === 'CRCL') {
      const [timeline, catalysts] = await Promise.all([
        import('@/data/crcl/timeline'),
        import('@/data/crcl/catalysts'),
      ]);
      if (timeline.TIMELINE) {
        for (const t of timeline.TIMELINE) {
          entries.push({ date: t.date, headline: t.event });
        }
      }
      if (catalysts.COMPLETED_MILESTONES) {
        for (const m of catalysts.COMPLETED_MILESTONES) {
          entries.push({ date: m.date, headline: m.event });
        }
      }
      if (catalysts.UPCOMING_CATALYSTS) {
        for (const c of catalysts.UPCOMING_CATALYSTS) {
          entries.push({ date: c.timeline, headline: c.event });
        }
      }
    }
  } catch (error) {
    console.error(`Failed to load analysis data for ${ticker}:`, error);
  }

  return entries;
}

export async function POST(request: NextRequest) {
  // Use bracket notation to prevent Next.js bundler from inlining at build time
  const ANTHROPIC_API_KEY = (process.env as Record<string, string | undefined>)['ANTHROPIC_API_KEY'] || '';

  try {
    const body = await request.json();
    const { ticker, articles } = body as { ticker: string; articles: Article[] };

    if (!ticker || !articles?.length) {
      return NextResponse.json({ error: 'Missing ticker or articles' }, { status: 400 });
    }

    if (!ANTHROPIC_API_KEY) {
      // No API key configured — return error so frontend can surface it
      return NextResponse.json({
        ticker,
        results: articles.map(a => ({ headline: a.headline, date: a.date, analyzed: null })),
        error: 'ANTHROPIC_API_KEY not set — add it in Vercel Environment Variables and redeploy',
      });
    }

    // Gather all existing analysis data for this ticker
    const analysisData = await getAnalysisData(ticker.toUpperCase());

    // Build a concise summary of existing analysis for Claude
    const existingSummary = analysisData
      .slice(0, 200) // Cap at 200 entries to stay within token limits
      .map(e => `[${e.date}] ${e.headline}`)
      .join('\n');

    const articleList = articles
      .map((a, i) => `${i + 1}. [${a.date}] ${a.headline}`)
      .join('\n');

    const prompt = `You are analyzing a stock research database for ticker ${ticker}. Below is a list of events, news, and press releases that are ALREADY tracked in the analysis database.

EXISTING ANALYSIS DATA:
${existingSummary}

NEW ARTICLES TO CHECK:
${articleList}

For each new article (1-${articles.length}), determine if its content/topic is ALREADY COVERED in the existing analysis data.

Rules for marking as "analyzed: true":
- The SPECIFIC event, announcement, or press release described in the article must appear in the existing data
- A direct press release or company announcement that matches an existing entry = true
- An article reporting on the SAME specific event as an existing entry = true

Rules for marking as "analyzed: false":
- General news commentary, stock price movement articles, opinion pieces = false (even if they mention a tracked event)
- Articles from news outlets simply reporting that a stock went up/down = false
- ETF launches, lawsuits, analyst opinions, third-party commentary = false (unless that specific item is tracked)
- If unsure, default to false

Be STRICT. Only mark true when the specific announcement/event itself is directly tracked.

Respond with ONLY a JSON array of objects, one per article, in order:
[{"index": 1, "analyzed": true}, {"index": 2, "analyzed": false}, ...]

No other text, just the JSON array.`;

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
    const responseText = claudeData.content?.[0]?.text || '[]';

    // Parse Claude's JSON response
    let results: Array<{ index: number; analyzed: boolean }>;
    try {
      // Extract JSON from response (Claude might wrap it in markdown code blocks)
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      results = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
    } catch {
      console.error('Failed to parse Claude response:', responseText);
      // Fallback: mark all as unknown
      results = articles.map((_, i) => ({ index: i + 1, analyzed: false }));
    }

    // Map results back to articles
    const output = articles.map((article, i) => {
      const result = results.find(r => r.index === i + 1);
      return {
        headline: article.headline,
        date: article.date,
        analyzed: result?.analyzed ?? false,
      };
    });

    return NextResponse.json({ ticker, results: output });
  } catch (error) {
    console.error('Check-analyzed error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
