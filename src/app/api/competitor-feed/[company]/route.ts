import { NextRequest, NextResponse } from 'next/server';

/**
 * Per-company competitor feed API
 * Fetches 5 press releases + 5 latest news for a given company name.
 *
 * GET /api/competitor-feed/[company]
 * where [company] is URL-encoded company name (e.g. "OQ%20Technology")
 */

type RouteParams = Promise<{ company: string }>;

// Optimised search terms per known company
const SEARCH_CONFIG: Record<string, { pr: string; news: string }> = {
  'OQ Technology':                { pr: '"OQ Technology"',               news: '"OQ Technology" satellite' },
  'Iridium Communications':      { pr: '"Iridium Communications"',      news: '"Iridium" satellite direct-to-device' },
  'Skylo Technologies':          { pr: '"Skylo Technologies"',          news: '"Skylo" satellite direct-to-device' },
  'Lynk Global':                 { pr: '"Lynk Global"',                 news: '"Lynk Global" satellite' },
  'SpaceX / Starlink Direct to Cell': { pr: '"Starlink Direct to Cell"', news: '"Starlink" direct-to-cell OR "Starlink Direct to Cell"' },
  'Viasat':                      { pr: '"Viasat"',                      news: '"Viasat" satellite' },
  'Amazon / Project Kuiper':     { pr: '"Project Kuiper" OR "Amazon Leo"', news: '"Project Kuiper" OR "Amazon Leo" satellite' },
  'EchoStar / Hughes':           { pr: '"EchoStar" OR "Hughes Network"', news: '"EchoStar" OR "Hughes" satellite' },
  'SES':                         { pr: '"SES S.A." OR "SES satellite"', news: '"SES" satellite direct-to-device' },
  'Terrestar Solutions':         { pr: '"Terrestar Solutions" OR "TerreStar"', news: '"Terrestar" satellite' },
  'Space42 / Bayanat':           { pr: '"Space42" OR "Bayanat"',        news: '"Space42" OR "Bayanat" satellite' },
  // BTC Treasury peers
  'MicroStrategy':               { pr: '"MicroStrategy"',               news: '"MicroStrategy" bitcoin' },
  'Marathon Digital':             { pr: '"Marathon Digital"',             news: '"Marathon Digital" bitcoin OR mining' },
  'Riot Platforms':               { pr: '"Riot Platforms"',              news: '"Riot Platforms" bitcoin OR mining' },
  'CleanSpark':                  { pr: '"CleanSpark"',                  news: '"CleanSpark" bitcoin OR mining' },
  // Stablecoin peers
  'Tether':                      { pr: '"Tether" stablecoin',           news: '"Tether" USDT stablecoin' },
  'PayPal PYUSD':                { pr: '"PayPal" PYUSD',                news: '"PayPal" PYUSD stablecoin' },
  'Ripple RLUSD':                { pr: '"Ripple" RLUSD',                news: '"Ripple" RLUSD stablecoin' },
  'Paxos':                       { pr: '"Paxos" stablecoin',            news: '"Paxos" stablecoin' },
};

function getSearchConfig(company: string) {
  if (SEARCH_CONFIG[company]) return SEARCH_CONFIG[company];
  // Fallback: use company name in quotes
  return { pr: `"${company}"`, news: `"${company}"` };
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

interface NewsArticle {
  title: string;
  url: string;
  date: string;
  source: string;
}

async function fetchRSS(query: string, limit: number): Promise<NewsArticle[]> {
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
  const { company: rawCompany } = await params;
  const company = decodeURIComponent(rawCompany);
  const config = getSearchConfig(company);

  try {
    // Fetch press releases (wire services) and general news in parallel
    const prQuery = `${config.pr} (site:prnewswire.com OR site:businesswire.com OR site:globenewswire.com)`;
    const newsQuery = config.news;

    const [prResult, newsResult] = await Promise.allSettled([
      fetchRSS(prQuery, 5),
      fetchRSS(newsQuery, 5),
    ]);

    const pressReleases = prResult.status === 'fulfilled' ? prResult.value : [];
    const news = newsResult.status === 'fulfilled' ? newsResult.value : [];

    return NextResponse.json({
      company,
      pressReleases,
      news,
      fetchedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Competitor feed API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch competitor feed' },
      { status: 500 }
    );
  }
}
