import { NextRequest, NextResponse } from 'next/server';
import { stocks } from '@/lib/stocks';

type RouteParams = Promise<{ symbol: string }>;

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

// ─── Source 1b: Direct Business Wire search (fresher than Google News index) ───

async function fetchBusinessWireDirect(companyName: string): Promise<PressRelease[]> {
  const searchQuery = encodeURIComponent(companyName);
  const url = `https://www.businesswire.com/news/home/search?keyword=${searchQuery}`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) return [];

    const html = await response.text();
    return parseBusinessWireHTML(html);
  } catch {
    // Direct fetch may be throttled or blocked; fallback remains Google News RSS
    return [];
  }
}

function parseBusinessWireHTML(html: string): PressRelease[] {
  const items: PressRelease[] = [];
  // Business Wire article URLs: .../news/home/YYYYMMDDHHMMSS/en/Title-Slug or .../news/home/...
  const linkRegex = /<a[^>]+href=["'](https?:\/\/[^"']*businesswire\.com\/news\/home\/[^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  const seenUrls = new Set<string>();

  while ((match = linkRegex.exec(html)) !== null && items.length < 15) {
    const url = match[1];
    if (seenUrls.has(url)) continue;
    seenUrls.add(url);

    const rawText = match[2].replace(/<[^>]+>/g, '').trim();
    const title = decodeHTMLEntities(rawText);
    if (!title || title.length < 10) continue;

    // Date from URL: /news/home/YYYYMMDD... (e.g. 20260226276981 → 2026-02-26)
    const dateMatch = url.match(/\/news\/home\/(\d{4})(\d{2})(\d{2})\d*/);
    const date = dateMatch ? `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}` : extractDateFromContext(html, match.index);

    items.push({
      title,
      url,
      date: date || '',
      source: 'Business Wire',
    });
  }

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
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
        cache: 'no-store',
        signal: AbortSignal.timeout(10000),
      });
      if (!response.ok) return [];
      const html = await response.text();
      return parseIRPageHTML(html, url);
    } catch {
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
    const linkText = match[2].replace(/<[^>]+>/g, '').trim();
    if (!linkText || linkText.length < 10) continue;

    const url = href.startsWith('http') ? href : `${origin}${href.startsWith('/') ? '' : '/'}${href}`;

    // Try to extract date from nearby context or URL
    const date = extractDateFromContext(html, match.index) || extractDateFromURL(href);

    items.push({
      title: decodeHTMLEntities(linkText),
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
      .slice(0, 60); // compare first 60 chars to catch near-duplicates
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
    // Fetch from all sources in parallel: IR page, Google News RSS (all wires), and direct Business Wire (freshest)
    const [wireResults, irResults, businessWireResults] = await Promise.allSettled([
      fetchWireServiceRSS(stock.name, symbol),
      fetchIRPage(symbol),
      fetchBusinessWireDirect(stock.name),
    ]);

    const wireArticles = wireResults.status === 'fulfilled' ? wireResults.value : [];
    const irArticles = irResults.status === 'fulfilled' ? irResults.value : [];
    const businessWireArticles = businessWireResults.status === 'fulfilled' ? businessWireResults.value : [];

    // Merge: IR first, then direct Business Wire (newest), then Google News RSS
    const merged = [...irArticles, ...businessWireArticles, ...wireArticles];

    // Deduplicate
    const unique = deduplicateReleases(merged);

    // Sort by date descending (newest first)
    unique.sort((a, b) => b.date.localeCompare(a.date));

    // Return top 10
    const releases = unique.slice(0, 10).map(a => ({
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
