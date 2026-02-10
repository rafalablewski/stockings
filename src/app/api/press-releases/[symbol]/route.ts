import { NextRequest, NextResponse } from 'next/server';

type RouteParams = Promise<{ symbol: string }>;

// Company name terms used to build search queries
// These are passed as the [symbol] URL parameter
const COMPANY_TERMS: Record<string, string> = {
  'ASTS':           '"AST SpaceMobile"',
  'oq-technology':  '"OQ Technology"',
  'iridium':        '"Iridium Communications"',
  'skylo':          '"Skylo Technologies"',
  'lynk':           '"Lynk Global"',
  'starlink':       '"Starlink" "direct to cell"',
  'viasat':         '"Viasat"',
  'amazon-kuiper':  '"Project Kuiper"',
  'echostar':       '"EchoStar" OR "Hughes Network"',
  'ses':            '"SES S.A." satellite',
  'terrestar':      '"Terrestar Solutions"',
  'space42':        '"Space42" OR "Bayanat"',
};

// PR wire sites where companies publish official press releases
const PR_WIRE_SITES = [
  'businesswire.com',
  'prnewswire.com',
  'globenewswire.com',
  'accesswire.com',
];

interface PressReleaseResult {
  date: string;
  headline: string;
  url: string;
}

/** Parse RSS/XML feed for press release items */
function parseRSS(xml: string): PressReleaseResult[] {
  const items: PressReleaseResult[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;
  while ((match = itemRegex.exec(xml)) !== null && items.length < 10) {
    const block = match[1];
    const title = block.match(/<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/)?.[1]?.trim() || '';
    const link = block.match(/<link>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/link>/)?.[1]?.trim() || '';
    const pubDate = block.match(/<pubDate>(.*?)<\/pubDate>/)?.[1]?.trim() || '';
    if (title) {
      items.push({
        date: pubDate ? formatDate(pubDate) : '',
        headline: decodeHTML(title),
        url: link,
      });
    }
  }
  // Also try Atom <entry> format
  if (items.length === 0) {
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/gi;
    while ((match = entryRegex.exec(xml)) !== null && items.length < 10) {
      const block = match[1];
      const title = block.match(/<title[^>]*>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/)?.[1]?.trim() || '';
      const link = block.match(/<link[^>]*href="([^"]*)"[^>]*\/?>/)?.[1]?.trim() || '';
      const updated = block.match(/<(?:updated|published)>(.*?)<\/(?:updated|published)>/)?.[1]?.trim() || '';
      if (title) {
        items.push({
          date: updated ? formatDate(updated) : '',
          headline: decodeHTML(title),
          url: link,
        });
      }
    }
  }
  return items;
}

/** Normalize date string to YYYY-MM-DD */
function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toISOString().split('T')[0];
  } catch {
    return dateStr;
  }
}

/** Decode basic HTML entities */
function decodeHTML(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

/** Date cutoff: 6 months ago in YYYY-MM-DD for Google's after: operator */
function sixMonthsAgo(): string {
  const d = new Date();
  d.setMonth(d.getMonth() - 6);
  return d.toISOString().split('T')[0];
}

/** Build a Google News RSS URL for a given query string, restricted to recent results */
function googleNewsRSS(query: string): string {
  const dated = `${query} after:${sixMonthsAgo()}`;
  return `https://news.google.com/rss/search?q=${encodeURIComponent(dated)}&hl=en-US&gl=US&ceid=US:en`;
}

export async function GET(
  request: NextRequest,
  { params }: { params: RouteParams }
) {
  const { symbol: rawSymbol } = await params;
  const symbol = decodeURIComponent(rawSymbol);

  const companyTerm = COMPANY_TERMS[symbol] || COMPANY_TERMS[symbol.toUpperCase()];
  if (!companyTerm) {
    return NextResponse.json(
      { error: `No search configured for: ${symbol}` },
      { status: 400 }
    );
  }

  const fetchOpts = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; stockings-research/1.0)',
      'Accept': 'application/rss+xml, application/xml, text/xml, */*',
    },
    next: { revalidate: 600 } as { revalidate: number }, // Cache 10 minutes
  };

  try {
    const cutoff = sixMonthsAgo();

    // Fetch both feeds in parallel
    const siteFilter = PR_WIRE_SITES.map(s => `site:${s}`).join(' OR ');
    const prWireUrl = googleNewsRSS(`${companyTerm} (${siteFilter})`);
    const allNewsUrl = googleNewsRSS(companyTerm);

    const [prWireRes, allNewsRes] = await Promise.all([
      fetch(prWireUrl, fetchOpts),
      fetch(allNewsUrl, fetchOpts),
    ]);

    let prWire: PressReleaseResult[] = [];
    let allNews: PressReleaseResult[] = [];

    if (prWireRes.ok) {
      prWire = parseRSS(await prWireRes.text())
        .filter(r => !r.date || r.date >= cutoff)
        .slice(0, 5);
    }
    if (allNewsRes.ok) {
      allNews = parseRSS(await allNewsRes.text())
        .filter(r => !r.date || r.date >= cutoff)
        .slice(0, 5);
    }

    if (prWire.length > 0 || allNews.length > 0) {
      return NextResponse.json({
        symbol,
        prWire,
        allNews,
        fetchedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json(
      { error: 'No press releases found', symbol },
      { status: 404 }
    );
  } catch (err) {
    console.error('Press releases fetch error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch press releases' },
      { status: 500 }
    );
  }
}
