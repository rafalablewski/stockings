import { NextRequest, NextResponse } from 'next/server';
import { stocks } from '@/lib/stocks';

type RouteParams = Promise<{ symbol: string }>;

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
    // Google News RSS search by company name + stock ticker
    const query = encodeURIComponent(`"${stock.name}" OR "${symbol}" stock`);
    const rssUrl = `https://news.google.com/rss/search?q=${query}&hl=en-US&gl=US&ceid=US:en`;

    const response = await fetch(rssUrl, {
      headers: {
        'User-Agent': 'stockings-app/1.0 (research-tool)',
      },
      next: { revalidate: 600 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch from Google News RSS', status: response.status },
        { status: response.status }
      );
    }

    const xml = await response.text();

    // Parse RSS XML items
    const items: Array<{
      title: string;
      url: string;
      date: string;
      source: string;
    }> = [];

    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;
    while ((match = itemRegex.exec(xml)) !== null && items.length < 30) {
      const itemXml = match[1];
      const title = itemXml.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim() || '';
      const link = itemXml.match(/<link>([\s\S]*?)<\/link>/)?.[1]?.trim() || '';
      const pubDate = itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1]?.trim() || '';
      const source = itemXml.match(/<source[^>]*>([\s\S]*?)<\/source>/)?.[1]?.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim() || '';

      if (title) {
        items.push({
          title: decodeHTMLEntities(title),
          url: link,
          date: pubDate ? new Date(pubDate).toISOString().split('T')[0] : '',
          source: decodeHTMLEntities(source),
        });
      }
    }

    // Filter out articles unrelated to this company
    const nameLower = stock.name.toLowerCase();
    const tickerLower = symbol.toLowerCase();
    // Build keywords from company name (e.g. "AST SpaceMobile" → ["ast", "spacemobile"])
    const nameWords = nameLower.split(/\s+/).filter(w => w.length >= 3);
    const relevant = items.filter(item => {
      const t = item.title.toLowerCase();
      // Must mention ticker or at least one significant name word
      if (t.includes(tickerLower)) return true;
      if (t.includes(nameLower)) return true;
      return nameWords.some(w => t.includes(w));
    });

    // Sort by date descending (newest first)
    relevant.sort((a, b) => b.date.localeCompare(a.date));

    return NextResponse.json({
      symbol,
      companyName: stock.name,
      articles: relevant.slice(0, 10),
      fetchedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Google News RSS error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}

function decodeHTMLEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}
