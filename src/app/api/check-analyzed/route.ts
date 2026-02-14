import { NextRequest, NextResponse } from 'next/server';

interface Article {
  headline: string;
  date: string;
}

interface AnalysisEntry {
  date: string;
  headline: string;
  detail?: string; // summary, notes, or other context
}

// Dynamically collect all analysis data for a ticker — with full context
async function getAnalysisData(ticker: string): Promise<AnalysisEntry[]> {
  const entries: AnalysisEntry[] = [];

  try {
    if (ticker === 'ASTS') {
      const [partners, competitors, catalysts, pressReleases, compsTimeline, timelineEvents] = await Promise.all([
        import('@/data/asts/partners'),
        import('@/data/asts/competitors'),
        import('@/data/asts/catalysts'),
        import('@/data/asts/press-releases'),
        import('@/data/asts/comps-timeline'),
        import('@/data/asts/timeline-events'),
      ]);

      if (partners.PARTNER_NEWS) {
        for (const n of partners.PARTNER_NEWS) {
          entries.push({ date: n.date, headline: n.headline, detail: n.summary });
        }
      }
      if (competitors.COMPETITOR_NEWS) {
        for (const n of competitors.COMPETITOR_NEWS) {
          entries.push({ date: n.date, headline: n.headline, detail: n.summary });
        }
      }
      if (compsTimeline.COMPS_TIMELINE) {
        for (const n of compsTimeline.COMPS_TIMELINE) {
          const detail = [n.details?.join('; '), n.astsComparison].filter(Boolean).join(' | ');
          entries.push({ date: n.date, headline: n.headline, detail });
        }
      }
      if (timelineEvents.ASTS_TIMELINE_EVENTS) {
        for (const e of timelineEvents.ASTS_TIMELINE_EVENTS) {
          const detail = [e.summary, e.details?.join('; ')].filter(Boolean).join(' | ');
          entries.push({ date: e.date, headline: e.title, detail });
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
      const [catalysts, competitorNews, timelineEvents, adoption] = await Promise.all([
        import('@/data/bmnr/catalysts'),
        import('@/data/bmnr/competitor-news'),
        import('@/data/bmnr/timeline-events'),
        import('@/data/bmnr/ethereum-adoption'),
      ]);
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
      if (competitorNews.BMNR_COMPETITOR_NEWS) {
        for (const n of competitorNews.BMNR_COMPETITOR_NEWS) {
          entries.push({ date: n.date, headline: n.headline, detail: n.bmnrComparison });
        }
      }
      if (timelineEvents.BMNR_TIMELINE_EVENTS) {
        for (const e of timelineEvents.BMNR_TIMELINE_EVENTS) {
          entries.push({ date: e.date, headline: e.title, detail: e.notes });
        }
      }
      if (adoption.BMNR_ADOPTION_TIMELINE) {
        for (const e of adoption.BMNR_ADOPTION_TIMELINE) {
          const detail = [e.summary, e.bmnrImplication].filter(Boolean).join(' | ');
          entries.push({ date: e.date, headline: e.title, detail });
        }
      }
    } else if (ticker === 'CRCL') {
      const [timeline, catalysts, competitorNews] = await Promise.all([
        import('@/data/crcl/timeline'),
        import('@/data/crcl/catalysts'),
        import('@/data/crcl/competitor-news'),
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
      if (competitorNews.CRCL_COMPETITOR_NEWS) {
        for (const n of competitorNews.CRCL_COMPETITOR_NEWS) {
          entries.push({ date: n.date, headline: n.headline, detail: n.crclComparison });
        }
      }
    }
  } catch (error) {
    console.error(`Failed to load analysis data for ${ticker}:`, error);
  }

  // Deduplicate by headline (normalized)
  const seen = new Set<string>();
  return entries.filter(e => {
    const key = e.headline.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 80);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
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
      return NextResponse.json({
        ticker,
        results: articles.map(a => ({ headline: a.headline, date: a.date, analyzed: null })),
        error: 'ANTHROPIC_API_KEY not set — add it in Vercel Environment Variables and redeploy',
      });
    }

    // Gather all existing analysis data for this ticker
    const analysisData = await getAnalysisData(ticker.toUpperCase());

    // Build context-rich summary: include headline + truncated detail for semantic matching
    const existingSummary = analysisData
      .slice(0, 150)
      .map(e => {
        const detail = e.detail
          ? ` — ${e.detail.slice(0, 200)}`
          : '';
        return `[${e.date}] ${e.headline}${detail}`;
      })
      .join('\n');

    const articleList = articles
      .map((a, i) => `${i + 1}. [${a.date}] ${a.headline}`)
      .join('\n');

    const prompt = `You are checking whether news articles are already covered in a stock research database for ticker ${ticker}.

EXISTING ANALYSIS DATABASE (headlines + summaries):
${existingSummary}

NEW ARTICLES TO CHECK:
${articleList}

For each new article (1-${articles.length}), determine if the underlying event/topic is ALREADY COVERED somewhere in the existing database.

Mark as "analyzed: true" when:
- The same company announcement, product launch, partnership, regulatory event, or milestone is covered — even if worded completely differently
- A news article reports on the same underlying event as a database entry (e.g. article says "Company X Sends First D2D Message" and database has entry mentioning "First European company to operate LEO constellation dedicated to D2D services" — same event, different wording)
- The article covers a topic that is discussed within the summary/detail of an existing entry
- Different news outlets covering the same story both count as covered if any version is in the database

Mark as "analyzed: false" when:
- The specific event, development, or announcement has NO corresponding entry in the database
- It's a genuinely new development not captured anywhere in the existing data
- Stock price movement articles with no underlying tracked event

Think about WHAT HAPPENED, not how it's worded. Match on substance, not phrasing.

Respond with ONLY a JSON array, one object per article, in order:
[{"index": 1, "analyzed": true}, {"index": 2, "analyzed": false}, ...]`;

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
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      results = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
    } catch {
      console.error('Failed to parse Claude response:', responseText);
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
