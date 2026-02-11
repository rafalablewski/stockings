import { NextRequest, NextResponse } from 'next/server';

type RouteParams = Promise<{ symbol: string }>;

// Competitor search terms per ticker — grouped into manageable Google News queries
const COMPETITOR_QUERIES: Record<string, string[][]> = {
  ASTS: [
    ['"Starlink Direct to Cell"', '"Lynk Global"', '"Skylo Technologies"', '"OQ Technology"'],
    ['"Project Kuiper" satellite', '"Viasat" satellite', '"Iridium" satellite', '"EchoStar" satellite'],
    ['"Terrestar Solutions"', '"Space42" satellite', '"SES" direct-to-device', '"Bayanat" satellite'],
  ],
  BMNR: [
    ['"MicroStrategy" bitcoin', '"Marathon Digital"', '"Riot Platforms"', '"CleanSpark"'],
  ],
  CRCL: [
    ['"Tether" stablecoin', '"PayPal" PYUSD', '"Ripple" RLUSD', '"Paxos" stablecoin'],
  ],
};

function decodeHTMLEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

interface NewsArticle {
  title: string;
  url: string;
  date: string;
  source: string;
}

async function fetchGoogleNewsRSS(queryTerms: string[], limit: number): Promise<NewsArticle[]> {
  const query = queryTerms.join(' OR ');
  const encoded = encodeURIComponent(query);
  const rssUrl = `https://news.google.com/rss/search?q=${encoded}&hl=en-US&gl=US&ceid=US:en`;

  try {
    const response = await fetch(rssUrl, {
      headers: { 'User-Agent': 'stockings-app/1.0 (research-tool)' },
      next: { revalidate: 600 },
    });

    if (!response.ok) return [];

    const xml = await response.text();
    const items: NewsArticle[] = [];
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
  } catch {
    return [];
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: RouteParams }
) {
  const { symbol: rawSymbol } = await params;
  const symbol = decodeURIComponent(rawSymbol).toUpperCase();

  const queryGroups = COMPETITOR_QUERIES[symbol];
  if (!queryGroups) {
    return NextResponse.json(
      { error: `No competitor data for symbol: ${symbol}` },
      { status: 400 }
    );
  }

  try {
    // Fetch all query groups in parallel (each group = one Google News RSS call)
    const results = await Promise.allSettled(
      queryGroups.map(terms => fetchGoogleNewsRSS(terms, 5))
    );

    // Merge all results
    const allArticles: NewsArticle[] = [];
    for (const result of results) {
      if (result.status === 'fulfilled') {
        allArticles.push(...result.value);
      }
    }

    // Deduplicate by normalized title
    const seen = new Set<string>();
    const unique = allArticles.filter(a => {
      const key = a.title.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 60);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    // Sort by date descending
    unique.sort((a, b) => b.date.localeCompare(a.date));

    return NextResponse.json({
      symbol,
      articles: unique.slice(0, 5),
      fetchedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Competitor news API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch competitor news' },
      { status: 500 }
    );
  }
}
