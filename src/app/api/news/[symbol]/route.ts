import { NextRequest, NextResponse } from 'next/server';
import { stocks } from '@/lib/stocks';

type RouteParams = Promise<{ symbol: string }>;

// Press intelligence item shape (from api/press-intelligence.js)
interface PressIntelItem {
  newsid: string;
  headline: string;
  datetime: string;
  source: string;
  qmsummary?: string;
  permalink: string;
  storyurl?: string;
  _source?: string;
}

/**
 * GET /api/news/[symbol]
 *
 * Fetches news from press intelligence (multi-source aggregator)
 * instead of Google News RSS.  Returns the same { articles } shape
 * consumed by SharedSourcesTab.
 */
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
    // Use press intelligence as the source
    const piUrl = new URL('/api/press-intelligence', request.url);
    piUrl.searchParams.set('ticker', symbol);

    const response = await fetch(piUrl.toString(), {
      cache: 'no-store',
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Press intelligence returned ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Press intelligence returns a flat array for most tickers,
    // but { news: [...] } for AMZLEO and LYNK
    const items: PressIntelItem[] = Array.isArray(data) ? data : (data.news || []);

    // Transform to the article shape SharedSourcesTab expects
    const articles = items.slice(0, 30).map(item => ({
      title: item.headline,
      url: item.permalink || item.storyurl || '',
      date: item.datetime ? item.datetime.split('T')[0] : '',
      source: item.source || item._source || '',
    }));

    // Sort by date descending (newest first)
    articles.sort((a, b) => b.date.localeCompare(a.date));

    return NextResponse.json({
      symbol,
      companyName: stock.name,
      articles: articles.slice(0, 15),
      fetchedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('News API error (press intelligence):', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}
