import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const apiKey = (process.env as Record<string, string | undefined>)['SCRAPER_API_KEY'];
  if (!apiKey) {
    return NextResponse.json(
      { error: 'SCRAPER_API_KEY is not configured' },
      { status: 503 }
    );
  }

  let url: string;
  let renderJs: boolean;
  try {
    const body = await request.json();
    url = body.url;
    renderJs = body.renderJs ?? false;
    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Missing required field: url' }, { status: 400 });
    }
    // Basic URL validation
    new URL(url);
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  try {
    const params = new URLSearchParams({
      api_key: apiKey,
      url,
    });
    if (renderJs) {
      params.set('render', 'true');
    }

    const response = await fetch(`https://api.scraperapi.com/?${params.toString()}`, {
      signal: AbortSignal.timeout(60000),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `ScraperAPI returned ${response.status}`, status: response.status },
        { status: response.status }
      );
    }

    const html = await response.text();

    return NextResponse.json({
      url,
      html,
      length: html.length,
      fetchedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('ScraperAPI error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch via ScraperAPI' },
      { status: 500 }
    );
  }
}
