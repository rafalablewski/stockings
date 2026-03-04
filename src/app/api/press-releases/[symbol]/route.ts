import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { stocks } from '@/lib/stocks';
import { HEADLINE_TRUNCATION_LENGTH } from '@/lib/constants';

type RouteParams = Promise<{ symbol: string }>;

// Shared fetch headers for IR and Business Wire (consistent UA, avoid some blocks)
const FETCH_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
} as const;

// IR page URLs per ticker (direct press release pages)
const IR_URLS: Record<string, string> = {
  ASTS: 'https://investors.ast-science.com/press-releases',
  BMNR: 'https://www.bitminetech.io/investor-relations',
  CRCL: 'https://investors.circle.com/press-releases',
};

// Fallback IR URLs when primary page is JS-rendered and returns no links in initial HTML.
// ASTS press-releases page is client-rendered; main IR page has server-rendered earnings release links.
const IR_FALLBACK_URLS: Record<string, string> = {
  ASTS: 'https://investors.ast-science.com/',
};

// Wire services we aggregate from
const WIRE_SERVICES = [
  'prnewswire.com',
  'businesswire.com',
  'globenewswire.com',
  'accessnewswire.com',
];

function decodeHTMLEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

/** Decode entities first, then strip tags, to avoid XSS from escaped markup becoming raw HTML. */
function safeTitleFromLinkText(raw: string): string {
  const decoded = decodeHTMLEntities(raw.trim());
  return decoded.replace(/<[^>]+>/g, '').trim();
}

interface PressRelease {
  title: string;
  url: string;
  date: string; // YYYY-MM-DD
  source: string;
}

// ─── Source 1: Google News RSS filtered to wire services ───
// Note: Google News index can lag; newest wire PRs may appear with delay. We also fetch Business Wire directly below.

async function fetchWireServiceRSS(companyName: string, ticker: string): Promise<PressRelease[]> {
  const wireSites = WIRE_SERVICES.map(s => `site:${s}`).join(' OR ');
  const query = `"${companyName}" (${wireSites})`;
  const encoded = encodeURIComponent(query);
  const rssUrl = `https://news.google.com/rss/search?q=${encoded}&hl=en-US&gl=US&ceid=US:en`;

  try {
    const response = await fetch(rssUrl, {
      headers: { 'User-Agent': 'stockings-app/1.0 (research-tool)' },
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) return [];

    const xml = await response.text();
    return parseRSSItems(xml, 15);
  } catch {
    console.error(`[press-releases] Wire service RSS failed for ${ticker}`);
    return [];
  }
}

// ─── Source 1b: Direct Business Wire (fresher than Google News index) ───
// /news/home/search?keyword= returns 404; use newsroom URL and filter by company name/ticker.

async function fetchBusinessWireDirect(companyName: string, ticker: string): Promise<PressRelease[]> {
  const seenUrls = new Set<string>();
  const merge = (newItems: PressRelease[]) => {
    for (const item of newItems) {
      if (!seenUrls.has(item.url)) {
        seenUrls.add(item.url);
        all.push(item);
      }
    }
  };

  const all: PressRelease[] = [];
  // Try company name, ticker, and main newsroom (latest); server may not filter by ?q=, so we filter in parseBusinessWireHTML
  const queries: string[] = [companyName, ticker];
  const urls = [
    ...queries.map(q => `https://www.businesswire.com/newsroom?q=${encodeURIComponent(q)}`),
    'https://www.businesswire.com/newsroom',
  ];
  for (const url of urls) {
    try {
      const response = await fetch(url, {
        headers: FETCH_HEADERS,
        cache: 'no-store',
        signal: AbortSignal.timeout(8000),
      });
      if (!response.ok) {
        console.warn(`[press-releases] Direct Business Wire fetch returned ${response.status} for "${url}"`);
        continue;
      }
      const html = await response.text();
      merge(parseBusinessWireHTML(html, companyName, ticker));
    } catch (error) {
      console.warn(`[press-releases] Direct Business Wire fetch failed for "${url}":`, error);
    }
  }
  return all;
}

/** Extract headline from BW URL path: .../en/Headline-In-Words format. */
function titleFromBusinessWireUrl(href: string): string {
  const match = href.match(/\/en\/([^/?#]+)/);
  if (!match) return '';
  return decodeURIComponent(match[1]).replace(/-/g, ' ').trim();
}

function parseBusinessWireHTML(html: string, companyName: string, ticker: string): PressRelease[] {
  const items: PressRelease[] = [];
  const $ = cheerio.load(html);
  const seenUrls = new Set<string>();
  const selector = 'a[href*="businesswire.com/news/home/"]';

  $(selector).each((_, el) => {
    if (items.length >= 15) return false;
    let href = $(el).attr('href');
    if (!href || seenUrls.has(href)) return;
    href = href.startsWith('http') ? href : `https://www.businesswire.com${href.startsWith('/') ? '' : '/'}${href}`;
    seenUrls.add(href);

    const linkText = safeTitleFromLinkText($(el).text());
    const slugTitle = titleFromBusinessWireUrl(href);
    const title = (linkText && linkText.length >= 10) ? linkText : slugTitle;
    if (!title || title.length < 5) return;

    // Match company/ticker in title OR in URL slug (many BW pages use headline in path)
    const lowerTitle = title.toLowerCase();
    const lowerHref = href.toLowerCase();
    const lowerName = companyName.toLowerCase();
    const nameWords = lowerName.split(/\s+/).filter(Boolean);
    const tickerWord = new RegExp(`\\b${ticker.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`);
    const companySlug = lowerName.replace(/\s+/g, '-');
    const slugHasCompany = lowerHref.includes(companySlug) || lowerHref.includes(`-${ticker.toLowerCase()}-`) || lowerHref.endsWith(`-${ticker.toLowerCase()}`);
    const titleMatches = nameWords.some(w => lowerTitle.includes(w)) || tickerWord.test(lowerTitle);
    if (!titleMatches && !slugHasCompany) return;

    const dateMatch = href.match(/\/news\/home\/(\d{4})(\d{2})(\d{2})\d*/);
    const date = dateMatch ? `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}` : '';

    items.push({
      title,
      url: href,
      date,
      source: 'Business Wire',
    });
  });

  return items;
}

function parseRSSItems(xml: string, limit: number): PressRelease[] {
  const items: PressRelease[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null && items.length < limit) {
    const itemXml = match[1];
    const title = itemXml.match(/<title>([\s\S]*?)<\/title>/)?.[1]
      ?.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim() || '';
    const link = itemXml.match(/<link>([\s\S]*?)<\/link>/)?.[1]?.trim() || '';
    const pubDate = itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1]?.trim() || '';
    const source = itemXml.match(/<source[^>]*>([\s\S]*?)<\/source>/)?.[1]
      ?.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim() || '';

    if (title) {
      items.push({
        title: decodeHTMLEntities(title),
        url: link,
        date: pubDate ? new Date(pubDate).toISOString().split('T')[0] : '',
        source: decodeHTMLEntities(source),
      });
    }
  }

  return items;
}

// ─── Source 2: Company IR page direct scrape ───

async function fetchIRPage(symbol: string): Promise<PressRelease[]> {
  const irUrl = IR_URLS[symbol];
  if (!irUrl) return [];

  const fetchOne = async (url: string): Promise<PressRelease[]> => {
    try {
      const response = await fetch(url, {
        headers: FETCH_HEADERS,
        cache: 'no-store',
        signal: AbortSignal.timeout(10000),
      });
      if (!response.ok) return [];
      const html = await response.text();
      return parseIRPageHTML(html, url);
    } catch (error) {
      console.warn(`[press-releases] Fetch failed for URL "${url}":`, error);
      return [];
    }
  };

  let items = await fetchOne(irUrl);
  // ASTS press-releases page is client-rendered (no links in initial HTML). Use main IR page as fallback (has earnings release links).
  const fallbackUrl = IR_FALLBACK_URLS[symbol];
  if (items.length === 0 && fallbackUrl) {
    console.warn(`[press-releases] Primary IR page empty for ${symbol}, trying fallback`);
    items = await fetchOne(fallbackUrl);
  }
  if (items.length === 0 && (irUrl || fallbackUrl)) {
    console.error(`[press-releases] IR page fetch failed or empty for ${symbol}`);
  }
  return items;
}

function parseIRPageHTML(html: string, baseUrl: string): PressRelease[] {
  const items: PressRelease[] = [];
  const origin = new URL(baseUrl).origin;

  // Pattern 1: Common IR platforms (Notified, Q4) — links with dates nearby
  // Look for anchor tags with press-release-like paths
  const linkRegex = /<a[^>]+href=["']([^"']*(?:press-release|news-release|press_release)[^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;

  while ((match = linkRegex.exec(html)) !== null && items.length < 15) {
    const href = match[1];
    const linkText = safeTitleFromLinkText(match[2]);
    if (!linkText || linkText.length < 10) continue;

    const url = href.startsWith('http') ? href : `${origin}${href.startsWith('/') ? '' : '/'}${href}`;

    // Try to extract date from nearby context or URL
    const date = extractDateFromContext(html, match.index) || extractDateFromURL(href);

    items.push({
      title: linkText,
      url,
      date: date || '',
      source: 'Investor Relations',
    });
  }

  // Pattern 2: Structured data / JSON-LD
  const jsonLdRegex = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let jsonMatch;
  while ((jsonMatch = jsonLdRegex.exec(html)) !== null) {
    try {
      const data = JSON.parse(jsonMatch[1]);
      const articles = Array.isArray(data) ? data : [data];
      for (const article of articles) {
        if (article['@type'] === 'NewsArticle' || article['@type'] === 'Article') {
          items.push({
            title: article.headline || article.name || '',
            url: article.url || baseUrl,
            date: article.datePublished ? new Date(article.datePublished).toISOString().split('T')[0] : '',
            source: 'Investor Relations',
          });
        }
      }
    } catch {
      // Ignore malformed JSON-LD
    }
  }

  return items;
}

function extractDateFromContext(html: string, matchIndex: number): string {
  // Look in a window around the link for date patterns
  const start = Math.max(0, matchIndex - 500);
  const end = Math.min(html.length, matchIndex + 1000);
  const context = html.slice(start, end);

  // Match dates like "February 11, 2026", "Feb 11, 2026", "2026-02-11", "02/11/2026"
  const datePatterns = [
    /(\d{4}-\d{2}-\d{2})/,
    /(\w+ \d{1,2},? \d{4})/,
    /(\d{1,2}\/\d{1,2}\/\d{4})/,
  ];

  for (const pattern of datePatterns) {
    const m = context.match(pattern);
    if (m) {
      try {
        const d = new Date(m[1]);
        if (!isNaN(d.getTime())) {
          return d.toISOString().split('T')[0];
        }
      } catch { /* skip */ }
    }
  }
  return '';
}

function extractDateFromURL(href: string): string {
  // Many IR URLs contain dates like /2026/02/11/ or /2026-02-11
  const m = href.match(/\/(\d{4})\/(\d{1,2})\/(\d{1,2})\//);
  if (m) return `${m[1]}-${m[2].padStart(2, '0')}-${m[3].padStart(2, '0')}`;
  return '';
}

// ─── Deduplication ───

function deduplicateReleases(items: PressRelease[]): PressRelease[] {
  const seen = new Set<string>();
  return items.filter(item => {
    // Normalize title for dedup: lowercase, strip trailing source tags like "- Business Wire"
    const normalized = item.title
      .toLowerCase()
      .replace(/\s*[-–—]\s*(business wire|pr newswire|globenewswire|prnewswire).*$/i, '')
      .replace(/[^a-z0-9]/g, '')
      .slice(0, HEADLINE_TRUNCATION_LENGTH);
    if (seen.has(normalized)) return false;
    seen.add(normalized);
    return true;
  });
}

// ─── Main handler ───

export async function GET(
  request: NextRequest,
  { params }: { params: RouteParams }
) {
  const { symbol: rawSymbol } = await params;
  const symbol = decodeURIComponent(rawSymbol).toUpperCase();

  const stock = stocks[symbol];
  if (!stock) {
    return NextResponse.json(
      { error: `Unknown symbol: ${symbol}` },
      { status: 400 }
    );
  }

  try {
    // Fetch from all sources in parallel: IR, BW direct, Google News (company name + ticker)
    const [wireResults, wireTickerResults, irResults, businessWireResults] = await Promise.allSettled([
      fetchWireServiceRSS(stock.name, symbol),
      fetchWireServiceRSS(symbol, symbol),
      fetchIRPage(symbol),
      fetchBusinessWireDirect(stock.name, symbol),
    ]);

    const wireArticles = wireResults.status === 'fulfilled' ? wireResults.value : [];
    const wireTickerArticles = wireTickerResults.status === 'fulfilled' ? wireTickerResults.value : [];
    const irArticles = irResults.status === 'fulfilled' ? irResults.value : [];
    const businessWireArticles = businessWireResults.status === 'fulfilled' ? businessWireResults.value : [];

    const merged = [...irArticles, ...businessWireArticles, ...wireArticles, ...wireTickerArticles];
    const unique = deduplicateReleases(merged);
    unique.sort((a, b) => b.date.localeCompare(a.date));

    const releases = unique.slice(0, 15).map(a => ({
      date: a.date,
      headline: a.title,
      url: a.url,
      source: a.source,
      items: '',
    }));

    return NextResponse.json({
      symbol,
      companyName: stock.name,
      releases,
      fetchedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Press releases API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch press releases' },
      { status: 500 }
    );
  }
}
