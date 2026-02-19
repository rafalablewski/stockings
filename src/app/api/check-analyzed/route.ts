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

// Lightweight stemmer: strips common English suffixes so "reports" ≈ "report",
// "announces" ≈ "announcement", "partnership" ≈ "partner", etc.
function stem(word: string): string {
  return word
    .replace(/ies$/, 'y')      // companies → company
    .replace(/ves$/, 'f')      // halves → half
    .replace(/(ss)$/, '$1')    // keep "ss" endings (e.g. "press")
    .replace(/ness$/, '')      // darkness → dark
    .replace(/ment$/, '')      // announcement → announce (then further stripped)
    .replace(/tion$/, '')      // completion → comple (close enough for matching)
    .replace(/sion$/, '')      // expansion → expan
    .replace(/ings$/, '')      // holdings → hold
    .replace(/ing$/, '')       // trading → trad
    .replace(/ated$/, 'ate')   // consolidated → consolidate
    .replace(/ed$/, '')        // announced → announc
    .replace(/ly$/, '')        // recently → recent
    .replace(/er$/, '')        // partner → partn
    .replace(/ors?$/, '')      // investors, investor → invest
    .replace(/s$/, '');        // reports → report
}

// Normalize a headline into a set of significant stemmed keywords for local matching
function extractKeywords(text: string): Set<string> {
  const stopWords = new Set(['the','a','an','and','or','but','in','on','at','to','for','of','with','by','from','is','are','was','were','has','have','had','be','been','being','will','would','could','should','may','might','can','do','does','did','not','no','its','it','this','that','these','those','their','our','your','my','we','he','she','they','i','me','us','him','her','them','up','out','over','into','about','after','before','between','through','during','than','more','most','very','also','just','so','if','then','when','where','how','what','which','who','whom','why','all','each','every','any','few','some','new','said','says','according']);
  return new Set(
    text.toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 2 && !stopWords.has(w))
      .map(stem)
      .filter(w => w.length > 2)
  );
}

// Parse a date string that may be in non-standard formats from the DB.
// Handles: "2026-02-17", "Feb 17, 2026", "Sep 3-15, 2025" (range → first date),
// "Q1 2026" → Jan 2026, "Q2 2025" → Apr 2025, "2026" → Jan 1 2026, etc.
function parseFlexibleDate(s: string): Date | null {
  if (!s) return null;
  // Strip range suffixes: "Sep 3-15, 2025" → "Sep 3, 2025"
  const cleaned = s.replace(/(\d+)-\d+/, '$1');
  const d = new Date(cleaned);
  if (!isNaN(d.getTime())) return d;
  // Quarter format: "Q1 2026" → month 0, "Q2 2026" → month 3, etc.
  const qMatch = s.match(/Q([1-4])\s+(\d{4})/);
  if (qMatch) return new Date(+qMatch[2], (+qMatch[1] - 1) * 3, 1);
  // Plain year: "2026" → Jan 1
  const yMatch = s.match(/^(\d{4})$/);
  if (yMatch) return new Date(+yMatch[1], 0, 1);
  return null;
}

// Days between two date strings. Returns Infinity on parse failure.
function daysBetween(a: string, b: string): number {
  const da = parseFlexibleDate(a), db2 = parseFlexibleDate(b);
  if (!da || !db2) return Infinity;
  return Math.abs(da.getTime() - db2.getTime()) / (1000 * 60 * 60 * 24);
}

// Count how many words from set A appear in set B
function overlapCount(a: Set<string>, b: Set<string>): number {
  let n = 0;
  for (const w of a) { if (b.has(w)) n++; }
  return n;
}

// Best overlap percentage in both directions: max(matches/|A|, matches/|B|)
// This handles asymmetric lengths — a short DB entry matching a long article, or vice versa.
function bestOverlap(a: Set<string>, b: Set<string>): { matches: number; pct: number } {
  const matches = overlapCount(a, b);
  const pct = Math.max(
    a.size > 0 ? matches / a.size : 0,
    b.size > 0 ? matches / b.size : 0,
  );
  return { matches, pct };
}

// Check if an article matches any existing entry using two-tier keyword overlap + date proximity
function localMatch(articleHeadline: string, articleDate: string, analysisData: AnalysisEntry[]): boolean {
  const articleWords = extractKeywords(articleHeadline);
  if (articleWords.size === 0) return false;

  for (const entry of analysisData) {
    const gap = daysBetween(articleDate, entry.date);

    // Tier 1: headline-only match (high confidence — headlines are short and focused)
    const headlineWords = extractKeywords(entry.headline);
    const h = bestOverlap(articleWords, headlineWords);
    if (h.matches >= 3) {
      if (gap <= 30 && h.pct >= 0.4) return true;
      if (gap > 30 && h.pct >= 0.6) return true;
    }
    if (h.matches >= 2 && h.pct >= 0.6 && gap <= 30) return true;

    // Tier 2: headline+detail match (stricter — detail fields can be long with passing mentions)
    if (entry.detail) {
      const fullWords = extractKeywords(`${entry.headline} ${entry.detail}`);
      const f = bestOverlap(articleWords, fullWords);
      if (f.matches >= 3) {
        if (gap <= 30 && f.pct >= 0.5) return true;
        if (gap > 30 && f.pct >= 0.7) return true;
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
    const { ticker, articles, forceLocal } = body as { ticker: string; articles: Article[]; forceLocal?: boolean };

    if (!ticker || !articles?.length) {
      return NextResponse.json({ error: 'Missing ticker or articles' }, { status: 400 });
    }

    // Gather all existing analysis data for this ticker from the database
    const analysisData = await getAnalysisData(ticker);
    console.log(`[check-analyzed] ${ticker}: ${analysisData.length} entries loaded from database`);

    // Phase 1: Run deterministic local keyword matching for all articles
    const localResults = articles.map(a => ({
      headline: a.headline,
      date: a.date,
      analyzed: localMatch(a.headline, a.date, analysisData),
    }));

    const localMatchCount = localResults.filter(r => r.analyzed).length;

    // If no API key or AI disabled, return local results directly
    if (!ANTHROPIC_API_KEY) {
      console.log(`[check-analyzed] ${ticker}: NO ANTHROPIC_API_KEY set — local only. ${localMatchCount}/${articles.length} matched, ${analysisData.length} DB entries`);
      return NextResponse.json({ ticker, results: localResults, method: 'local', dbEntries: analysisData.length, reason: 'no_api_key' });
    }
    if (DISABLE_AI_MATCHING === 'true' || forceLocal) {
      console.log(`[check-analyzed] ${ticker}: AI matching disabled (${forceLocal ? 'client toggle' : 'env var'}). ${localMatchCount}/${articles.length} matched, ${analysisData.length} DB entries`);
      return NextResponse.json({ ticker, results: localResults, method: 'local', dbEntries: analysisData.length });
    }

    // Phase 2: Only send locally-unmatched articles to AI for semantic matching.
    // Local matches are deterministic and reliable — no need to re-evaluate them.
    const unresolvedIndices = localResults
      .map((r, i) => r.analyzed ? -1 : i)
      .filter(i => i >= 0);

    console.log(`[check-analyzed] ${ticker}: ${localMatchCount}/${articles.length} matched locally, ${unresolvedIndices.length} need AI`);

    if (unresolvedIndices.length === 0) {
      return NextResponse.json({ ticker, results: localResults, method: 'local' });
    }

    // Build context-rich summary for AI
    const existingSummary = analysisData
      .map(e => {
        const detail = e.detail
          ? ` — ${e.detail.slice(0, 200)}`
          : '';
        return `[${e.date}] ${e.headline}${detail}`;
      })
      .join('\n');

    const unresolvedArticles = unresolvedIndices.map(i => articles[i]);
    const articleList = unresolvedArticles
      .map((a, i) => `${i + 1}. [${a.date}] ${a.headline}`)
      .join('\n');

    const prompt = `You are checking whether news articles are already covered in a stock research database for ticker ${ticker}.

EXISTING ANALYSIS DATABASE (headlines + summaries):
${existingSummary}

NEW ARTICLES TO CHECK:
${articleList}

For each new article (1-${unresolvedArticles.length}), determine if the underlying event/topic is ALREADY COVERED somewhere in the existing database.

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

    // Token budget guard
    const estimatedTokens = Math.ceil(prompt.length / 4);
    if (estimatedTokens > MAX_PROMPT_TOKENS) {
      console.warn(`[check-analyzed] ${ticker}: prompt ~${estimatedTokens} tokens exceeds MAX_PROMPT_TOKENS (${MAX_PROMPT_TOKENS}), using local matching`);
      return NextResponse.json({ ticker, results: localResults, method: 'local' });
    }

    // Attempt AI matching for unresolved articles — merge with local results
    let method: 'ai' | 'local' | 'hybrid' = 'hybrid';
    const output = [...localResults]; // start with local results as baseline

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
          temperature: 0,
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

      let results: Array<{ index: number; analyzed: boolean }>;
      try {
        const jsonMatch = responseText.match(/\[[\s\S]*\]/);
        results = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
      } catch {
        console.error('Failed to parse Claude response:', responseText);
        results = [];
      }

      // Merge AI results back into the output for unresolved articles only
      for (let ai = 0; ai < unresolvedIndices.length; ai++) {
        const origIdx = unresolvedIndices[ai];
        const result = results.find(r => r.index === ai + 1);
        if (result) {
          output[origIdx] = { ...output[origIdx], analyzed: result.analyzed };
        }
      }
    } catch (claudeError) {
      console.error('Claude API call failed, using local matching only:', claudeError);
      method = 'local';
    }

    return NextResponse.json({ ticker, results: output, method, dbEntries: analysisData.length });
  } catch (error) {
    console.error('Check-analyzed error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
