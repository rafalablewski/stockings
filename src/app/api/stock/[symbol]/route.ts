import { NextRequest, NextResponse } from 'next/server';

type RouteParams = Promise<{ symbol: string }>;

export async function GET(
  request: NextRequest,
  { params }: { params: RouteParams }
) {
  const { symbol } = await params;
  const { searchParams } = new URL(request.url);
  const range = searchParams.get('range') || '3mo';
  const interval = searchParams.get('interval') || '1d';

  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=${interval}&range=${range}`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch stock data' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const result = data.chart?.result?.[0];

    if (!result) {
      return NextResponse.json(
        { error: 'No data found for symbol' },
        { status: 404 }
      );
    }

    const timestamps = result.timestamp || [];
    const quotes = result.indicators?.quote?.[0] || {};
    const meta = result.meta || {};

    // Transform to simpler format
    const chartData = timestamps.map((timestamp: number, i: number) => ({
      date: timestamp * 1000, // Convert to milliseconds
      open: quotes.open?.[i],
      high: quotes.high?.[i],
      low: quotes.low?.[i],
      close: quotes.close?.[i],
      volume: quotes.volume?.[i],
    })).filter((d: { close: number | null }) => d.close !== null);

    return NextResponse.json({
      symbol: meta.symbol,
      currency: meta.currency,
      regularMarketPrice: meta.regularMarketPrice,
      previousClose: meta.previousClose,
      chartPreviousClose: meta.chartPreviousClose,
      data: chartData,
    });
  } catch (error) {
    console.error('Yahoo Finance API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
