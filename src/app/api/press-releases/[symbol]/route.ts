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

// Official wire services — only these count as press releases.
// Must stay in sync with OFFICIAL_SOURCES in api/press-intelligence.js.
const PR_SOURCES = [
  'pr newswire', 'business wire', 'globe newswire', 'globenewswire',
  'accesswire', 'canada newswire', 'newsfile', 'investor relations',
  'globenewswire rss', 'stock titan',
];

function isPRSource(source: string): boolean {
  const lower = source.toLowerCase();
  return PR_SOURCES.some(s => lower.includes(s));
}

/**
 * GET /api/press-releases/[symbol]
 *
 * Fetches press releases from press intelligence (multi-source aggregator),
 * filtered to official wire-service sources only.
 * Returns the same { releases } shape consumed by SharedSourcesTab.
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

    // Filter to official PR wire sources only
    const prItems = items.filter(item => isPRSource(item.source || item._source || ''));

    // Sort by date descending (newest first)
    prItems.sort((a, b) => (b.datetime || '').localeCompare(a.datetime || ''));

    const releases = prItems.slice(0, 15).map(item => ({
      date: item.datetime ? item.datetime.split('T')[0] : '',
      headline: item.headline,
      url: item.permalink || item.storyurl || '',
      source: item.source || item._source || '',
      items: '',
    }));

    return NextResponse.json({
      symbol,
      companyName: stock.name,
      releases,
      fetchedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Press releases API error (press intelligence):', error);
    return NextResponse.json(
      { error: 'Failed to fetch press releases' },
      { status: 500 }
    );
  }
}
