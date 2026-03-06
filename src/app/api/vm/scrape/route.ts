import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

const FETCH_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  Accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
} as const;

interface ScrapedRelease {
  title: string;
  date: string;
  url: string;
}

// ─── Strategy 1: Q4 / Nasdaq IR widget ─────────────────────────────────────
function strategyQ4Widget($: cheerio.CheerioAPI, base: string): ScrapedRelease[] {
  const results: ScrapedRelease[] = [];
  const items = $('li.wd-item, div.wd-item, article.wd-item');
  if (items.length === 0) return results;

  items.each((_, el) => {
    const a = $(el).find('a').first();
    const title = a.text().trim();
    const href = a.attr('href') || '';
    const url = href ? new URL(href, base).toString() : '';

    const dateEl = $(el).find('.wd-date, .date, time, [class*="date"]').first();
    const date = dateEl.attr('datetime') || dateEl.text().trim();

    if (title) {
      results.push({ title, date, url });
    }
  });

  return results;
}

// ─── Strategy 2: Generic anchor scan ────────────────────────────────────────
function strategyAnchorScan($: cheerio.CheerioAPI, base: string): ScrapedRelease[] {
  const results: ScrapedRelease[] = [];
  const seen = new Set<string>();
  const prPattern = /press-release|news-release|investor|newsroom|press_release/i;

  $('a[href]').each((_, el) => {
    const href = $(el).attr('href') || '';
    const title = $(el).text().trim();
    if (!title || title.length < 15 || title.length > 300) return;

    const fullUrl = new URL(href, base).toString();
    if (seen.has(fullUrl)) return;

    if (!prPattern.test(fullUrl) && !prPattern.test(title)) return;
    seen.add(fullUrl);

    // Look for a date in the nearest container
    const parent = $(el).closest('li, tr, div[class], article');
    const dateEl = parent.find('time, .date, [class*="date"], [class*="time"]').first();
    const date = dateEl.attr('datetime') || dateEl.text().trim();

    results.push({ title, date, url: fullUrl });
  });

  return results;
}

// ─── Strategy 3: Structured data (JSON-LD) ──────────────────────────────────
function strategyJsonLd($: cheerio.CheerioAPI, base: string): ScrapedRelease[] {
  const results: ScrapedRelease[] = [];

  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const data = JSON.parse($(el).html() || '');
      const articles = Array.isArray(data) ? data : [data];
      for (const article of articles) {
        if (
          article['@type'] === 'NewsArticle' ||
          article['@type'] === 'Article' ||
          article['@type'] === 'PressRelease'
        ) {
          results.push({
            title: article.headline || article.name || '',
            url: article.url || base,
            date: article.datePublished
              ? new Date(article.datePublished).toISOString().split('T')[0]
              : '',
          });
        }
      }
    } catch {
      // skip malformed JSON-LD
    }
  });

  return results;
}

// ─── Strategy 4: IR-style link regex (press-release hrefs with dates) ───────
function strategyIRLinks($: cheerio.CheerioAPI, base: string): ScrapedRelease[] {
  const results: ScrapedRelease[] = [];
  const seen = new Set<string>();

  $('a[href]').each((_, el) => {
    const href = $(el).attr('href') || '';
    const title = $(el).text().trim();
    if (!title || title.length < 10 || title.length > 300) return;

    const fullUrl = new URL(href, base).toString();
    if (seen.has(fullUrl)) return;
    seen.add(fullUrl);

    // Extract date from URL path like /2025/02/11/ or /20250211
    let date = '';
    const urlDateMatch = href.match(/\/(\d{4})\/(\d{1,2})\/(\d{1,2})\//);
    if (urlDateMatch) {
      date = `${urlDateMatch[1]}-${urlDateMatch[2].padStart(2, '0')}-${urlDateMatch[3].padStart(2, '0')}`;
    }
    const bwDateMatch = href.match(/\/(\d{4})(\d{2})(\d{2})\d*/);
    if (!date && bwDateMatch) {
      const year = parseInt(bwDateMatch[1]);
      if (year >= 2000 && year <= 2030) {
        date = `${bwDateMatch[1]}-${bwDateMatch[2]}-${bwDateMatch[3]}`;
      }
    }

    // Only keep if date was found in URL (high-confidence press release link)
    if (date) {
      results.push({ title, date, url: fullUrl });
    }
  });

  return results;
}

// ─── Strategy 5: Full page text regex (last resort) ─────────────────────────
function strategyPageText($: cheerio.CheerioAPI): ScrapedRelease[] {
  const results: ScrapedRelease[] = [];
  const text = $('body').text();
  const lines = text
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 20 && l.length < 300);

  const dateRe =
    /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{1,2},?\s+\d{4}|\d{4}-\d{2}-\d{2}|\d{1,2}\/\d{1,2}\/\d{4}/i;

  for (const line of lines) {
    const m = dateRe.exec(line);
    if (!m) continue;
    const title = line
      .replace(dateRe, '')
      .trim()
      .replace(/^[\s\-–•|]+|[\s\-–•|]+$/g, '');
    if (title.length > 15) {
      results.push({ title, date: m[0], url: '' });
    }
  }

  return results;
}

// ─── Deduplication ──────────────────────────────────────────────────────────
function deduplicate(items: ScrapedRelease[]): ScrapedRelease[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = item.title
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .slice(0, 80);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');
  if (!url) {
    return NextResponse.json({ error: 'Missing ?url= parameter' }, { status: 400 });
  }

  // Basic URL validation
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return NextResponse.json({ error: 'URL must use http or https' }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: FETCH_HEADERS,
      signal: AbortSignal.timeout(15000),
      redirect: 'follow',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Upstream returned ${response.status}` },
        { status: 502 },
      );
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const base = `${parsedUrl.protocol}//${parsedUrl.host}`;

    // Run strategies in priority order, stop at the first that returns results
    let results = strategyQ4Widget($, base);
    let strategy = 'Q4 Widget';

    if (results.length === 0) {
      results = strategyJsonLd($, base);
      strategy = 'JSON-LD';
    }

    if (results.length === 0) {
      results = strategyAnchorScan($, base);
      strategy = 'Anchor Scan';
    }

    if (results.length === 0) {
      results = strategyIRLinks($, base);
      strategy = 'IR Links';
    }

    if (results.length === 0) {
      results = strategyPageText($);
      strategy = 'Page Text';
    }

    const unique = deduplicate(results);

    return NextResponse.json({
      ok: true,
      url,
      strategy,
      count: unique.length,
      results: unique,
      fetchedAt: new Date().toISOString(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
