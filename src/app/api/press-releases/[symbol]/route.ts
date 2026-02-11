import { NextRequest, NextResponse } from 'next/server';
import { stocks } from '@/lib/stocks';

type RouteParams = Promise<{ symbol: string }>;

// IR page domains per ticker (for source-filtering press releases)
const IR_DOMAINS: Record<string, string> = {
  ASTS: 'investors.ast-science.com',
  BMNR: 'bfriendsgroup.com',
  CRCL: 'investors.circle.com',
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

interface RSSArticle {
  title: string;
  url: string;
  date: string;
  source: string;
}

async function fetchGoogleNewsRSS(query: string, limit: number): Promise<RSSArticle[]> {
  const encoded = encodeURIComponent(query);
  const rssUrl = `https://news.google.com/rss/search?q=${encoded}&hl=en-US&gl=US&ceid=US:en`;

  const response = await fetch(rssUrl, {
    headers: { 'User-Agent': 'stockings-app/1.0 (research-tool)' },
    next: { revalidate: 600 },
  });

  if (!response.ok) return [];

  const xml = await response.text();
  const items: RSSArticle[] = [];

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
    // Build a Google News query targeting wire services + company IR
    const wireSites = WIRE_SERVICES.map(s => `site:${s}`).join(' OR ');
    const irDomain = IR_DOMAINS[symbol];
    const siteFilter = irDomain
      ? `(${wireSites} OR site:${irDomain})`
      : `(${wireSites})`;

    const query = `"${stock.name}" OR "${symbol}" ${siteFilter}`;

    const articles = await fetchGoogleNewsRSS(query, 10);

    // Map to press-release format matching existing API contract
    const releases = articles.map(a => ({
      date: a.date,
      headline: a.title,
      url: a.url,
      source: a.source,
      items: '', // No SEC item codes anymore
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
