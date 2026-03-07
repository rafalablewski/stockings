// Proxies ASTS press releases via the AccessWire headlines JSON API
// (the old feeds.issuerdirect.com/news.html endpoint is JS-rendered and
//  returns empty HTML when fetched server-side)

import { NextRequest, NextResponse } from 'next/server';

const HEADLINES_URL = 'https://www.accesswire.com/qm/data/getHeadlines.json';

const EXCLUDE_HEADLINES = new Set([
  'The New Arms Race',
  'Speed Superiority',
  'National Defense Strategy Ignites',
]);

export async function GET(request: NextRequest) {
  const perPage = Number(request.nextUrl.searchParams.get('per_page') ?? '200');

  const params = new URLSearchParams({
    topics: 'ASTS',
    excludeTopics: 'NONCOMPANY',
    noSrc: 'qmr',
    src: 'pzo,bayaw,prn,bwi,TheNewsWire,nfil,actw,irw,acn,cnw,nwd,glpr,nwmw',
    summary: 'true',
    summLen: '300',
    thumbnailurl: 'true',
    start: '1000-01-01',
    end: '3000-01-01',
  });

  const url = `${HEADLINES_URL}?${params.toString()}`;

  try {
    const upstream = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ABISON/1.0)',
        Accept: 'application/json',
      },
      cache: 'no-store',
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { error: `Upstream ${upstream.status}` },
        { status: upstream.status }
      );
    }

    const data = await upstream.json();

    // Flatten all newsitems from the response
    const allItems: NewsItem[] = (data.results?.news ?? []).flatMap(
      (n: NewsGroup) => n.newsitem ?? []
    );

    // Filter and map to our release shape
    const releases: PressRelease[] = [];
    const seen = new Set<string>();

    for (const item of allItems) {
      const newsid = String(item.newsid);
      if (seen.has(newsid)) continue;
      if (EXCLUDE_HEADLINES.has(item.headline?.trim())) continue;

      seen.add(newsid);
      releases.push({
        newsid,
        title: item.headline ?? '',
        date: item.datetime ?? '',
        url: `https://feeds.issuerdirect.com/news-release.html?newsid=${newsid}&symbol=ASTS`,
        summary: item.qmsummary ?? '',
        thumbnail: item.thumbnailurl ?? null,
      });
    }

    const limited = releases.slice(0, perPage);

    return NextResponse.json({
      symbol: 'ASTS',
      page: 1,
      per_page: perPage,
      count: limited.length,
      releases: limited,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/* ── Types for the upstream JSON ── */

interface NewsItem {
  newsid: string | number;
  headline?: string;
  datetime?: string;
  qmsummary?: string;
  thumbnailurl?: string;
  permalink?: string;
}

interface NewsGroup {
  newsitem?: NewsItem[];
}

interface PressRelease {
  newsid: string;
  title: string;
  date: string;
  url: string;
  summary: string;
  thumbnail: string | null;
}
