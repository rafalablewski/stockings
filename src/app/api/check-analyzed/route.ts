import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

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

// Check if an article matches any existing entry using keyword overlap
function localMatch(articleHeadline: string, analysisData: AnalysisEntry[]): boolean {
  const articleWords = extractKeywords(articleHeadline);
  if (articleWords.size === 0) return false;

  for (const entry of analysisData) {
    const entryText = entry.detail
      ? `${entry.headline} ${entry.detail}`
      : entry.headline;
    const entryWords = extractKeywords(entryText);

    // Count how many article keywords appear in the entry
    let matches = 0;
    for (const w of articleWords) {
      if (entryWords.has(w)) matches++;
    }

    const overlap = matches / articleWords.size;
    // If >50% of article keywords found in an entry, consider it tracked
    if (overlap >= 0.5 && matches >= 3) return true;
  }
  return false;
}

const DATA_DIR = path.resolve(process.cwd(), 'src', 'data');

/**
 * Extract AnalysisEntry[] from a raw TypeScript file by reading from disk.
 *
 * This MUST read from disk (not import()) because import() returns
 * build-time bundled data that is never refreshed — even after
 * "Apply to Database" writes new entries to the source files.
 *
 * Scans each line for date/headline/title/event fields and groups
 * nearby fields into entries. Also captures summary/detail/comparison
 * fields for richer matching context.
 */
function extractEntriesFromSource(content: string): AnalysisEntry[] {
  const entries: AnalysisEntry[] = [];
  const lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Look for date or timeline field
    // Lazy (.*?) + escaped-char handling (\\.) stops at the first unescaped closing quote
    const dateMatch = line.match(/(?:date|timeline)\s*:\s*(['"`])((?:\\.|.)*?)\1/);
    if (!dateMatch) continue;

    const date = dateMatch[2];

    // Search nearby lines (up to ±6) for headline/title/event/description
    let headline = '';
    let detail = '';
    const searchStart = Math.max(0, i - 4);
    const searchEnd = Math.min(lines.length, i + 7);

    for (let j = searchStart; j < searchEnd; j++) {
      if (!headline) {
        const hlMatch = lines[j].match(/(?:headline|title|event|description)\s*:\s*(['"`])((?:\\.|.)*?)\1/);
        if (hlMatch) headline = hlMatch[2].replace(/\\'/g, "'").replace(/\\"/g, '"');
      }
      if (!detail) {
        const dtMatch = lines[j].match(/(?:summary|notes|details|significance|astsRelevance|astsImplication|bmnrImplication|bmnrComparison|crclComparison|astsComparison)\s*:\s*(['"`])((?:\\.|.)*?)\1/);
        if (dtMatch) detail = dtMatch[2].replace(/\\'/g, "'").replace(/\\"/g, '"');
      }
    }

    if (headline) {
      entries.push({ date, headline, ...(detail ? { detail } : {}) });
    }
  }

  return entries;
}

/**
 * Read ALL .ts data files for a ticker from disk and extract entries.
 * Always reflects the current file contents — no bundler caching.
 */
async function getAnalysisData(ticker: string): Promise<AnalysisEntry[]> {
  const entries: AnalysisEntry[] = [];
  const tickerDir = path.resolve(DATA_DIR, ticker.toLowerCase());

  try {
    const files = await fs.readdir(tickerDir);
    const tsFiles = files.filter(f => f.endsWith('.ts') && !f.endsWith('.d.ts'));

    const reads = tsFiles.map(f =>
      fs.readFile(path.join(tickerDir, f), 'utf-8')
        .then(content => extractEntriesFromSource(content))
        .catch(() => [] as AnalysisEntry[])
    );

    const results = await Promise.all(reads);
    for (const batch of results) {
      entries.push(...batch);
    }
  } catch (error) {
    console.error(`Failed to read data directory for ${ticker}:`, error);
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

    // Gather all existing analysis data for this ticker
    const analysisData = await getAnalysisData(ticker.toUpperCase());
    console.log(`[check-analyzed] ${ticker}: ${analysisData.length} entries loaded from database`);

    // Helper: run local keyword matching for all articles
    const runLocalMatch = () => articles.map(a => ({
      headline: a.headline,
      date: a.date,
      analyzed: localMatch(a.headline, analysisData),
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
