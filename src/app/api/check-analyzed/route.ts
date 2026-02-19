import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { timelineEvents, secFilings, catalysts, partnerNews } from '@/lib/schema';
import { eq } from 'drizzle-orm';

interface Article {
  headline: string;
  date: string;
}

interface AnalysisEntry {
  date: string;
  headline: string;
  detail?: string; // summary, notes, or other context
}

// Normalize a headline into a set of significant keywords for local matching
function extractKeywords(text: string): Set<string> {
  const stopWords = new Set(['the','a','an','and','or','but','in','on','at','to','for','of','with','by','from','is','are','was','were','has','have','had','be','been','being','will','would','could','should','may','might','can','do','does','did','not','no','its','it','this','that','these','those','their','our','your','my','we','he','she','they','i','me','us','him','her','them','up','out','over','into','about','after','before','between','through','during','than','more','most','very','also','just','so','if','then','when','where','how','what','which','who','whom','why','all','each','every','any','few','some','new','said','says','according']);
  return new Set(
    text.toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 2 && !stopWords.has(w))
  );
}

// Days between two date strings (YYYY-MM-DD). Returns Infinity on parse failure.
function daysBetween(a: string, b: string): number {
  const da = new Date(a), db2 = new Date(b);
  if (isNaN(da.getTime()) || isNaN(db2.getTime())) return Infinity;
  return Math.abs(da.getTime() - db2.getTime()) / (1000 * 60 * 60 * 24);
}

// Check if an article matches any existing entry using two-tier keyword overlap + date proximity
function localMatch(articleHeadline: string, articleDate: string, analysisData: AnalysisEntry[]): boolean {
  const articleWords = extractKeywords(articleHeadline);
  if (articleWords.size === 0) return false;

  for (const entry of analysisData) {
    const gap = daysBetween(articleDate, entry.date);

    // Tier 1: headline-only match (high confidence — headlines are short and focused)
    const headlineWords = extractKeywords(entry.headline);
    let headlineMatches = 0;
    for (const w of articleWords) {
      if (headlineWords.has(w)) headlineMatches++;
    }
    const headlinePct = headlineMatches / articleWords.size;
    if (headlineMatches >= 3) {
      // Close dates: normal threshold. Far dates: require much higher overlap
      // to prevent recurring weekly reports from matching old entries.
      if (gap <= 5 && headlinePct >= 0.5) return true;
      if (gap > 5 && headlinePct >= 0.75) return true;
    }

    // Tier 2: headline+detail match (stricter — detail fields can be long with passing mentions)
    if (entry.detail) {
      const fullWords = extractKeywords(`${entry.headline} ${entry.detail}`);
      let fullMatches = 0;
      for (const w of articleWords) {
        if (fullWords.has(w)) fullMatches++;
      }
      const fullPct = fullMatches / articleWords.size;
      if (fullMatches >= 4) {
        if (gap <= 5 && fullPct >= 0.65) return true;
        if (gap > 5 && fullPct >= 0.85) return true;
      }
    }
  }
  return false;
}

/**
 * Query the database to get all analysis entries for a ticker.
 * Replaces the old approach of reading .ts files from disk and parsing via regex.
 */
async function getAnalysisData(ticker: string): Promise<AnalysisEntry[]> {
  const upperTicker = ticker.toUpperCase();

  // Query all 4 tables in parallel
  const [timelineRows, filingRows, catalystRows, newsRows] = await Promise.all([
    db.select({
      date: timelineEvents.date,
      headline: timelineEvents.event,
      detail: timelineEvents.details,
    }).from(timelineEvents).where(eq(timelineEvents.ticker, upperTicker)),

    db.select({
      date: secFilings.date,
      headline: secFilings.description,
      detail: secFilings.period,
    }).from(secFilings).where(eq(secFilings.ticker, upperTicker)),

    db.select({
      date: catalysts.completionDate,
      timeline: catalysts.timeline,
      headline: catalysts.event,
      detail: catalysts.category,
    }).from(catalysts).where(eq(catalysts.ticker, upperTicker)),

    db.select({
      date: partnerNews.date,
      headline: partnerNews.headline,
      detail: partnerNews.summary,
    }).from(partnerNews).where(eq(partnerNews.ticker, upperTicker)),
  ]);

  const entries: AnalysisEntry[] = [];

  for (const r of timelineRows) {
    entries.push({ date: r.date, headline: r.headline, detail: r.detail || undefined });
  }

  for (const r of filingRows) {
    entries.push({ date: r.date, headline: r.headline, detail: r.detail || undefined });
  }

  for (const r of catalystRows) {
    const date = r.date || r.timeline || '';
    if (date && r.headline) {
      entries.push({ date, headline: r.headline, detail: r.detail || undefined });
    }
  }

  for (const r of newsRows) {
    entries.push({ date: r.date, headline: r.headline, detail: r.detail || undefined });
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
  const env = process.env as Record<string, string | undefined>;
  const ANTHROPIC_API_KEY = env['ANTHROPIC_API_KEY'] || '';
  const DISABLE_AI_MATCHING = env['DISABLE_AI_MATCHING'] || '';
  const MAX_PROMPT_TOKENS = parseInt(env['MAX_PROMPT_TOKENS'] || '40000', 10);

  try {
    const body = await request.json();
    const { ticker, articles } = body as { ticker: string; articles: Article[] };

    if (!ticker || !articles?.length) {
      return NextResponse.json({ error: 'Missing ticker or articles' }, { status: 400 });
    }

    // Gather all existing analysis data for this ticker from the database
    const analysisData = await getAnalysisData(ticker);
    console.log(`[check-analyzed] ${ticker}: ${analysisData.length} entries loaded from database`);

    // Helper: run local keyword matching for all articles
    const runLocalMatch = () => articles.map(a => ({
      headline: a.headline,
      date: a.date,
      analyzed: localMatch(a.headline, a.date, analysisData),
    }));

    // Fallback: local keyword matching when no API key is available
    if (!ANTHROPIC_API_KEY) {
      return NextResponse.json({ ticker, results: runLocalMatch(), method: 'local' });
    }

    // Kill switch: force local matching via env var
    if (DISABLE_AI_MATCHING === 'true') {
      console.log(`[check-analyzed] ${ticker}: AI matching disabled via DISABLE_AI_MATCHING`);
      return NextResponse.json({ ticker, results: runLocalMatch(), method: 'local' });
    }

    // Build context-rich summary: include headline + truncated detail for semantic matching
    const existingSummary = analysisData
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
- A database entry is PRIMARILY ABOUT the same event — its headline directly describes the same announcement, product launch, partnership, regulatory event, or milestone
- A news article and a database entry cover the same underlying event, even if worded differently (e.g. article says "Company X Sends First D2D Message" and database has entry with headline "First European company to operate LEO constellation dedicated to D2D services" — same event, different wording)
- Different news outlets covering the same story both count as covered if any version is in the database

Mark as "analyzed: false" when:
- The event has NO dedicated entry in the database
- A database entry only MENTIONS the topic in passing as context for a different analysis (e.g. an analyst report listing a partnership as a competitive risk factor does NOT mean that partnership event itself is covered — the entry must be primarily ABOUT the same event)
- It's a genuinely new development not captured anywhere in the existing data
- Stock price movement articles with no underlying tracked event
- RECURRING PERIODIC announcements (weekly holdings updates, monthly reports, quarterly earnings) where each occurrence has DIFFERENT figures/data. Each weekly report is a DISTINCT event — e.g. "ETH Holdings Reach 4.371M" is NOT the same as "ETH Holdings Reach 4.326M" even though they follow the same format. Only match if the database entry has the SAME date (within ~3 days) AND the same specific figures

Think about WHAT HAPPENED, not how it's worded. Match on substance, not phrasing.

Respond with ONLY a JSON array, one object per article, in order:
[{"index": 1, "analyzed": true}, {"index": 2, "analyzed": false}, ...]`;

    // Token budget guard: estimate prompt tokens (chars / 4), skip AI if too large
    const estimatedTokens = Math.ceil(prompt.length / 4);
    if (estimatedTokens > MAX_PROMPT_TOKENS) {
      console.warn(`[check-analyzed] ${ticker}: prompt ~${estimatedTokens} tokens exceeds MAX_PROMPT_TOKENS (${MAX_PROMPT_TOKENS}), using local matching`);
      return NextResponse.json({ ticker, results: runLocalMatch(), method: 'local' });
    }

    // Attempt AI matching — falls back to local matching on any failure
    let method: 'ai' | 'local' = 'ai';
    let output: Array<{ headline: string; date: string; analyzed: boolean }>;

    try {
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
        signal: AbortSignal.timeout(30000),
      });

      if (!claudeRes.ok) {
        const errText = await claudeRes.text();
        console.error('Claude API error, falling back to local matching:', errText);
        throw new Error(`Claude API returned ${claudeRes.status}`);
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
      output = articles.map((article, i) => {
        const result = results.find(r => r.index === i + 1);
        return {
          headline: article.headline,
          date: article.date,
          analyzed: result?.analyzed ?? false,
        };
      });
    } catch (claudeError) {
      // Network error, timeout, or API error — fall back to local matching
      console.error('Claude API call failed, using local matching:', claudeError);
      method = 'local';
      output = runLocalMatch();
    }

    return NextResponse.json({ ticker, results: output, method });
  } catch (error) {
    console.error('Check-analyzed error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
