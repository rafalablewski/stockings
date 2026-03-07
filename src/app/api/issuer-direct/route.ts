// Proxies Issuer Direct press releases to avoid CORS
// Source: https://feeds.issuerdirect.com/news.html?symbol=ASTS

import { NextRequest, NextResponse } from 'next/server';

const BASE = 'https://feeds.issuerdirect.com/news.html';
const EXCLUDE =
  'The New Arms Race,Speed Superiority,National Defense Strategy Ignites';

export async function GET(request: NextRequest) {
  const perPage = request.nextUrl.searchParams.get('per_page') ?? '200';
  const page = request.nextUrl.searchParams.get('page') ?? '1';

  const params = new URLSearchParams({
    symbol: 'ASTS',
    news_template: 'plain-asts',
    date_format: 'MMMM DD, YYYY | HH:MM',
    per_page: String(perPage),
    page: String(page),
    exclude_headlines: EXCLUDE,
  });

  const url = `${BASE}?${params.toString()}`;

  try {
    const upstream = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ABISON/1.0)',
        Accept: 'text/html',
      },
      cache: 'no-store',
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { error: `Upstream ${upstream.status}` },
        { status: upstream.status }
      );
    }

    const html = await upstream.text();
    const releases = parseReleases(html);

    return NextResponse.json({
      symbol: 'ASTS',
      page: Number(page),
      per_page: Number(perPage),
      count: releases.length,
      releases,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

interface PressRelease {
  newsid: string;
  title: string;
  date: string;
  url: string;
}

function parseReleases(html: string): PressRelease[] {
  const linkPattern =
    /href="([^"]*newsid=(\d+)[^"]*)"\s*[^>]*>([^<]+)<\/a>/gi;
  const datePattern =
    /(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}/i;

  const releases: PressRelease[] = [];
  const seen = new Set<string>();

  // Split into chunks around each link to capture nearby date text
  const chunks = html.split(/<li|<div|<tr/i);

  for (const chunk of chunks) {
    const match = linkPattern.exec(chunk);
    if (!match) {
      linkPattern.lastIndex = 0;
      continue;
    }

    const [, href, newsid, rawTitle] = match;
    if (seen.has(newsid)) continue;

    const title = rawTitle.replace(/&amp;/g, '&').replace(/&#039;/g, "'").trim();
    const dateMatch = chunk.match(datePattern);
    const date = dateMatch ? dateMatch[0] : '';

    const fullURL = href.startsWith('http')
      ? href
      : `https://feeds.issuerdirect.com/${href.replace(/^\//, '')}`;

    releases.push({ newsid, title, date, url: fullURL });
    seen.add(newsid);
    linkPattern.lastIndex = 0;
  }

  // Fallback: simple regex pass over full HTML if chunk method missed entries
  if (releases.length === 0) {
    const fallback = /href="([^"]*newsid=(\d+)[^"]*)">([^<]+)<\/a>/gi;
    let m: RegExpExecArray | null;
    while ((m = fallback.exec(html)) !== null) {
      const [, href, newsid, rawTitle] = m;
      if (seen.has(newsid)) continue;
      const title = rawTitle.replace(/&amp;/g, '&').trim();
      releases.push({
        newsid,
        title,
        date: '',
        url: `https://feeds.issuerdirect.com/news-release.html?newsid=${newsid}&symbol=ASTS`,
      });
      seen.add(newsid);
    }
  }

  return releases;
}
