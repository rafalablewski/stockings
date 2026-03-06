import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

/**
 * VM Scraper API — /api/vm/scrape?url=<any IR page>
 *
 * Two modes:
 *   1. Playwright (headless Chromium) — handles JS-rendered pages (Q4, Nasdaq widgets)
 *   2. Cheerio fallback — if Playwright/Chromium not installed
 *
 * Setup for Playwright mode (one time):
 *   npx playwright install chromium
 */

interface ScrapedRelease {
  title: string;
  date: string;
  url: string;
}

// ─── Playwright renderer ────────────────────────────────────────────────────

function findChromium(): string | null {
  const fs = require('fs');
  const path = require('path');
  const os = require('os');
  const home = process.env.HOME || os.homedir();
  const platform = os.platform();

  // 1. Playwright cache — cross-platform, any revision
  const pwCache = path.join(home, platform === 'darwin'
    ? 'Library/Caches/ms-playwright'
    : '.cache/ms-playwright');
  try {
    const dirs = fs.readdirSync(pwCache)
      .filter((d: string) => d.startsWith('chromium-'))
      .sort()
      .reverse();
    for (const dir of dirs) {
      // Platform-specific subdirectory names
      const candidates = [
        path.join(pwCache, dir, 'chrome-linux', 'chrome'),
        path.join(pwCache, dir, 'chrome-mac', 'Chromium.app', 'Contents', 'MacOS', 'Chromium'),
        path.join(pwCache, dir, 'chrome-win', 'chrome.exe'),
      ];
      for (const c of candidates) {
        if (fs.existsSync(c)) return c;
      }
    }
  } catch { /* no cache dir */ }

  // 2. System-installed Chrome/Chromium
  const systemPaths = platform === 'darwin'
    ? [
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '/Applications/Chromium.app/Contents/MacOS/Chromium',
        '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
      ]
    : platform === 'win32'
    ? [
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      ]
    : [
        '/usr/bin/google-chrome-stable',
        '/usr/bin/google-chrome',
        '/usr/bin/chromium-browser',
        '/usr/bin/chromium',
      ];

  for (const bin of systemPaths) {
    try { if (fs.existsSync(bin)) return bin; } catch { /* skip */ }
  }

  return null;
}

async function fetchWithPlaywright(url: string): Promise<{ html: string; mode: 'playwright'; chromiumPath: string }> {
  const execPath = findChromium();
  if (!execPath) {
    throw new Error(
      'No Chromium/Chrome found. Install one:\n' +
      '  • npx playwright install chromium\n' +
      '  • Or install Google Chrome on your system'
    );
  }

  const pw = await import('playwright-core');

  const browser = await pw.chromium.launch({
    executablePath: execPath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const context = await browser.newContext({
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    });
    const page = await context.newPage();

    await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 });

    // Scroll to trigger lazy-loading
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);

    const html = await page.content();
    return { html, mode: 'playwright', chromiumPath: execPath };
  } finally {
    await browser.close();
  }
}

// ─── Extraction strategies (all work on cheerio-parsed HTML) ────────────────

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

    const parent = $(el).closest('li, tr, div[class], article');
    const dateEl = parent.find('time, .date, [class*="date"], [class*="time"]').first();
    const date = dateEl.attr('datetime') || dateEl.text().trim();

    results.push({ title, date, url: fullUrl });
  });

  return results;
}

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

    if (date) {
      results.push({ title, date, url: fullUrl });
    }
  });

  return results;
}

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

// ─── Route handler ──────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');
  if (!url) {
    return NextResponse.json({ error: 'Missing ?url= parameter' }, { status: 400 });
  }

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
    // Always use Playwright (headless Chromium) — no silent fallback
    const { html, mode, chromiumPath } = await fetchWithPlaywright(url);

    const $ = cheerio.load(html);
    const base = `${parsedUrl.protocol}//${parsedUrl.host}`;

    // Run strategies in priority order
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
      mode,
      chromiumPath,
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
