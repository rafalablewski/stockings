import { NextRequest, NextResponse } from 'next/server';

type RouteParams = Promise<{ symbol: string }>;

// Company feed configurations
const FEEDS: Record<string, { name: string; urls: string[]; type: 'rss' | 'html' }> = {
  ASTS: {
    name: 'AST SpaceMobile',
    urls: [
      'https://investors.ast-science.com/rss/news-releases.xml',
      'https://investors.ast-science.com/rss/press-releases.xml',
      'https://investors.ast-science.com/press-releases',
    ],
    type: 'rss', // try RSS first, HTML fallback handled automatically
  },
  IRDM: {
    name: 'Iridium Communications',
    urls: [
      'https://investor.iridium.com/index.php?s=95&rsspage=43',
      'https://investor.iridium.com/rss/news-releases.xml',
      'https://investor.iridium.com/press-releases',
    ],
    type: 'rss',
  },
};

interface PressReleaseResult {
  date: string;
  headline: string;
  url: string;
}

/** Parse RSS/XML feed for press release items */
function parseRSS(xml: string): PressReleaseResult[] {
  const items: PressReleaseResult[] = [];
  // Match <item>...</item> blocks
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

/** Parse HTML page for press release items (generic heuristic) */
function parseHTML(html: string, baseUrl: string): PressReleaseResult[] {
  const items: PressReleaseResult[] = [];
  // Look for common IR page patterns: links with dates nearby
  // Pattern 1: <a> tags containing press release titles with dates in nearby text
  const linkRegex = /<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi;
  const dateRegex = /(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{1,2},?\s+\d{4}|\d{4}-\d{2}-\d{2}/i;
  let match;
  const seen = new Set<string>();
  while ((match = linkRegex.exec(html)) !== null && items.length < 10) {
    const href = match[1];
    const text = match[2].replace(/<[^>]+>/g, '').trim();
    // Filter: likely press releases have substantial text and a recognizable URL pattern
    if (text.length > 20 && text.length < 300 && !seen.has(text) &&
        (href.includes('press-release') || href.includes('news') || href.includes('businesswire') || href.includes('prnewswire'))) {
      seen.add(text);
      // Try to find a date near this link in the surrounding HTML context
      const linkPos = match.index;
      const context = html.substring(Math.max(0, linkPos - 200), linkPos + match[0].length + 200);
      const dateMatch = context.match(dateRegex);
      const url = href.startsWith('http') ? href : new URL(href, baseUrl).href;
      items.push({
        date: dateMatch ? formatDate(dateMatch[0]) : '',
        headline: decodeHTML(text),
        url,
      });
    }
  }
  return items.slice(0, 5);
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
  const symbol = decodeURIComponent(rawSymbol).toUpperCase();

  const feed = FEEDS[symbol];
  if (!feed) {
    return NextResponse.json(
      { error: `No feed configured for: ${symbol}` },
      { status: 400 }
    );
  }

  // Try each URL in order until one works
  for (const url of feed.urls) {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; stockings-research/1.0)',
          'Accept': 'application/rss+xml, application/xml, application/atom+xml, text/xml, text/html, */*',
        },
        next: { revalidate: 600 }, // Cache 10 minutes
      });

      if (!response.ok) continue;

      const text = await response.text();
      const isXML = text.trimStart().startsWith('<?xml') || text.includes('<rss') || text.includes('<feed');

      const releases = isXML ? parseRSS(text) : parseHTML(text, url);

      if (releases.length > 0) {
        return NextResponse.json({
          symbol,
          companyName: feed.name,
          releases: releases.slice(0, 5),
          source: url,
          fetchedAt: new Date().toISOString(),
        });
      }
    } catch {
      // Try next URL
      continue;
    }
  }

  return NextResponse.json(
    { error: 'Could not fetch press releases from any source', symbol },
    { status: 502 }
  );
}
