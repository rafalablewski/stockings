import { NextRequest, NextResponse } from 'next/server';
import { stocks } from '@/lib/stocks';

type RouteParams = Promise<{ symbol: string }>;

// IR page URLs per ticker (direct press release pages)
const IR_URLS: Record<string, string> = {
  ASTS: 'https://investors.ast-science.com/press-releases',
  CRCL: 'https://investors.circle.com/press-releases',
};

// Wire services we aggregate from
const WIRE_SERVICES = [
  'prnewswire.com',
  'businesswire.com',
  'globenewswire.com',
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

async function fetchWireServiceRSS(companyName: string, ticker: string): Promise<PressRelease[]> {
  const wireSites = WIRE_SERVICES.map(s => `site:${s}`).join(' OR ');
  const query = `"${companyName}" (${wireSites})`;
  const encoded = encodeURIComponent(query);
  const rssUrl = `https://news.google.com/rss/search?q=${encoded}&hl=en-US&gl=US&ceid=US:en`;

  try {
    const response = await fetch(rssUrl, {
      headers: { 'User-Agent': 'stockings-app/1.0 (research-tool)' },
      next: { revalidate: 600 },
    });

    if (!response.ok) return [];

    const xml = await response.text();
    return parseRSSItems(xml, 15);
  } catch {
    console.error(`[press-releases] Wire service RSS failed for ${ticker}`);
    return [];
  }
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

  try {
    const response = await fetch(irUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      next: { revalidate: 600 },
    });

    if (!response.ok) return [];

    const html = await response.text();
    return parseIRPageHTML(html, irUrl);
  } catch {
    // IR page fetch may fail in restricted environments — graceful fallback
    console.error(`[press-releases] IR page fetch failed for ${symbol}`);
    return [];
  }
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
    // Fetch from wire services and IR page in parallel
    const [wireResults, irResults] = await Promise.allSettled([
      fetchWireServiceRSS(stock.name, symbol),
      fetchIRPage(symbol),
    ]);

    const wireArticles = wireResults.status === 'fulfilled' ? wireResults.value : [];
    const irArticles = irResults.status === 'fulfilled' ? irResults.value : [];

    // Merge: IR page results first (most authoritative), then wire services
    const merged = [...irArticles, ...wireArticles];

    // Deduplicate
    const unique = deduplicateReleases(merged);

    // Sort by date descending (newest first)
    unique.sort((a, b) => b.date.localeCompare(a.date));

    // Return top 5
    const releases = unique.slice(0, 5).map(a => ({
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
