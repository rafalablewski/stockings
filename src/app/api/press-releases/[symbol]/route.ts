import { NextRequest, NextResponse } from 'next/server';

type RouteParams = Promise<{ symbol: string }>;

// Google News search queries keyed by company identifier
// These are passed as the [symbol] URL parameter
const SEARCH_QUERIES: Record<string, string> = {
  'ASTS':           '"AST SpaceMobile"',
  'oq-technology':  '"OQ Technology" satellite',
  'iridium':        '"Iridium Communications"',
  'skylo':          '"Skylo" satellite NTN',
  'lynk':           '"Lynk Global" satellite',
  'starlink':       '"Starlink" "direct to cell"',
  'viasat':         '"Viasat" satellite',
  'amazon-kuiper':  '"Project Kuiper" Amazon satellite',
  'echostar':       '"EchoStar" satellite OR Hughes',
  'ses':            '"SES" satellite D2D',
  'terrestar':      '"Terrestar Solutions"',
  'space42':        '"Space42" satellite OR "Bayanat" satellite',
};

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
  while ((match = itemRegex.exec(xml)) !== null && items.length < 5) {
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
    while ((match = entryRegex.exec(xml)) !== null && items.length < 5) {
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

export async function GET(
  request: NextRequest,
  { params }: { params: RouteParams }
) {
  const { symbol: rawSymbol } = await params;
  const symbol = decodeURIComponent(rawSymbol);

  const query = SEARCH_QUERIES[symbol] || SEARCH_QUERIES[symbol.toUpperCase()];
  if (!query) {
    return NextResponse.json(
      { error: `No search configured for: ${symbol}` },
      { status: 400 }
    );
  }

  try {
    // Google News RSS — works for all companies, public or private
    const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; stockings-research/1.0)',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
      },
      next: { revalidate: 600 }, // Cache 10 minutes
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Google News returned ${response.status}` },
        { status: response.status }
      );
    }

    const text = await response.text();
    const releases = parseRSS(text);

    if (releases.length > 0) {
      return NextResponse.json({
        symbol,
        releases: releases.slice(0, 5),
        source: 'Google News',
        fetchedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json(
      { error: 'No results found', symbol },
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
