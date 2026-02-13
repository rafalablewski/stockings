import { NextRequest, NextResponse } from 'next/server';

type RouteParams = Promise<{ symbol: string }>;

export async function GET(
  request: NextRequest,
  { params }: { params: RouteParams }
) {
  const { symbol: rawSymbol } = await params;
  const symbol = decodeURIComponent(rawSymbol);
  const { searchParams } = new URL(request.url);
  const range = searchParams.get('range') || '3mo';
  const interval = searchParams.get('interval') || '1d';

  try {
    // Validate symbol input
    if (!symbol || typeof symbol !== 'string' || symbol.trim().length === 0) {
      return NextResponse.json(
        { error: 'Invalid symbol parameter' },
        { status: 400 }
      );
    }

    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=${interval}&range=${range}`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      // Provide more specific error messages based on status code
      if (response.status === 404) {
        return NextResponse.json(
          { error: `Symbol "${symbol}" not found` },
          { status: 404 }
        );
      }
      if (response.status === 429) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again later.' },
          { status: 429 }
        );
      }
      return NextResponse.json(
        { error: `Failed to fetch stock data: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const result = data.chart?.result?.[0];

    if (!result) {
      return NextResponse.json(
        { error: `No data found for symbol "${symbol}"` },
        { status: 404 }
      );
    }

    const timestamps = result.timestamp || [];
    const quotes = result.indicators?.quote?.[0] || {};
    const meta = result.meta || {};

    // Validate that we have required data
    if (!timestamps.length || !quotes || !meta) {
      return NextResponse.json(
        { error: 'Incomplete data received from API' },
        { status: 502 }
      );
    }

    // Transform to simpler format with null safety
    const chartData = timestamps.map((timestamp: number, i: number) => ({
      date: timestamp * 1000, // Convert to milliseconds
      open: quotes.open?.[i] ?? null,
      high: quotes.high?.[i] ?? null,
      low: quotes.low?.[i] ?? null,
      close: quotes.close?.[i] ?? null,
      volume: quotes.volume?.[i] ?? null,
    })).filter((d: { close: number | null }) => d.close !== null && d.close !== undefined);

    // Validate we have at least some data points
    if (chartData.length === 0) {
      return NextResponse.json(
        { error: 'No valid price data points found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      symbol: meta.symbol || symbol.toUpperCase(),
      currency: meta.currency || 'USD',
      regularMarketPrice: meta.regularMarketPrice ?? null,
      previousClose: meta.previousClose ?? null,
      chartPreviousClose: meta.chartPreviousClose ?? null,
      data: chartData,
    });
  } catch (error) {
    // Enhanced error handling with specific error types
    if (error instanceof Error) {
      if (error.name === 'AbortError' || error.message.includes('timeout')) {
        return NextResponse.json(
          { error: 'Request timeout. Please try again.' },
          { status: 504 }
        );
      }
      if (error.message.includes('fetch')) {
        return NextResponse.json(
          { error: 'Network error. Please check your connection.' },
          { status: 503 }
        );
      }
    }
    console.error('Yahoo Finance API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
