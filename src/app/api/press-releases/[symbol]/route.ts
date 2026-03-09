import { NextRequest, NextResponse } from 'next/server';
import { stocks } from '@/lib/stocks';

type RouteParams = Promise<{ symbol: string }>;

// ─── QuoteMedia / AccessWire upstream (same as api/press-intelligence.js) ───

interface QMItem {
  newsid?: string;
  headline: string;
  datetime: string;
  source: string;
  qmsummary?: string;
  permalink: string;
  storyurl?: string;
}

async function fetchQM(topic: string): Promise<QMItem[]> {
  const url =
    'https://www.accesswire.com/qm/data/getHeadlines.json' +
    `?topics=${encodeURIComponent(topic)}` +
    '&excludeTopics=NONCOMPANY' +
    '&noSrc=qmr' +
    '&src=pzo,bayaw,prn,bwi,TheNewsWire,nfil,actw,irw,acn,cnw,nwd,glpr,nwmw' +
    '&summary=true&summLen=300&thumbnailurl=true' +
    '&start=1000-01-01&end=3000-01-01';
  try {
    const upstream = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; StockingsBot/1.0)' },
      signal: AbortSignal.timeout(8000),
    });
    if (!upstream.ok) return [];
    const raw = await upstream.json();
    const json = typeof raw === 'string' ? JSON.parse(raw) : raw;
    return json?.results?.news?.[0]?.newsitem ?? [];
  } catch {
    return [];
  }
}

// ─── Ticker config (mirrors TICKER_CONFIG in api/press-intelligence.js) ───

const OFFICIAL_SOURCES = [
  'pr newswire', 'business wire', 'globe newswire', 'globenewswire',
  'accesswire', 'canada newswire', 'newsfile', 'investor relations',
  'globenewswire rss', 'stock titan',
];

interface TickerPRConfig {
  topics: string[];
  sources: string[];
  filter: (hl: string) => boolean;
}

const TICKER_PR_CONFIG: Record<string, TickerPRConfig> = {
  ASTS: { topics: ['ASTS'], sources: ['business wire'], filter: hl => /ast\s*spacemobile|asts/i.test(hl) },
  BMNR: { topics: ['BMNR'], sources: ['pr newswire', 'prnewswire', 'business wire', 'accesswire', 'globe newswire'], filter: hl => /bitmine|bmnr|bit\s*mine/i.test(hl) },
  IRDM: { topics: ['IRDM'], sources: ['pr newswire', 'canada newswire', 'business wire'], filter: hl => /iridium/i.test(hl) },
  GSAT: { topics: ['GSAT'], sources: ['business wire', 'pr newswire', 'canada newswire'], filter: hl => /globalstar/i.test(hl) },
  VZ: { topics: ['VZ'], sources: ['globenewswire', 'pr newswire', 'business wire'], filter: hl => /verizon/i.test(hl) },
  VSAT: { topics: ['VSAT'], sources: ['business wire', 'pr newswire', 'globe newswire', 'globenewswire'], filter: hl => /viasat/i.test(hl) },
  RKLB: { topics: ['RKLB'], sources: ['business wire', 'pr newswire', 'globe newswire', 'globenewswire'], filter: hl => /rocket\s*lab|rklb/i.test(hl) },
  SATS: { topics: ['SATS'], sources: ['business wire', 'pr newswire', 'globe newswire', 'globenewswire'], filter: hl => /echostar|sats|hughes/i.test(hl) },
  LUNR: { topics: ['LUNR'], sources: ['business wire', 'pr newswire', 'globe newswire', 'globenewswire'], filter: hl => /intuitive\s*machines|lunr/i.test(hl) },
  HUT: { topics: ['HUT'], sources: OFFICIAL_SOURCES, filter: hl => /hut\s*8|hut8|\bhut\b/i.test(hl) },
  IREN: { topics: ['IREN'], sources: OFFICIAL_SOURCES, filter: hl => /\biren\b|iris\s*energy/i.test(hl) },
  NBIS: { topics: ['NBIS'], sources: OFFICIAL_SOURCES, filter: hl => /\bnbis\b|nebius/i.test(hl) },
  MSTR: { topics: ['MSTR'], sources: OFFICIAL_SOURCES, filter: hl => /\bstrategy\b|microstrategy|\bmstr\b/i.test(hl) },
  MARA: { topics: ['MARA'], sources: OFFICIAL_SOURCES, filter: hl => /marathon\s*digital|marathon\s*holdings|\bmara\b/i.test(hl) },
  RIOT: { topics: ['RIOT'], sources: OFFICIAL_SOURCES, filter: hl => /riot\s*platforms|\briot\b/i.test(hl) },
  CLSK: { topics: ['CLSK'], sources: OFFICIAL_SOURCES, filter: hl => /cleanspark|\bclsk\b/i.test(hl) },
  COIN: { topics: ['COIN'], sources: OFFICIAL_SOURCES, filter: hl => /coinbase|\bcoin\b/i.test(hl) },
  FRMM: { topics: ['FRMM', 'ETHZ'], sources: OFFICIAL_SOURCES, filter: hl => /forum\s*markets|\bforum\b|ethzilla|\bfrmm\b|\bethz\b/i.test(hl) },
};

// ─── Deduplication ───

function normalizeHl(h: string): string {
  return (h || '').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 80);
}

function dedupe(items: QMItem[]): QMItem[] {
  const seenHl = new Set<string>();
  const seenUrl = new Set<string>();
  const out: QMItem[] = [];
  for (const item of items) {
    const kh = normalizeHl(item.headline);
    const ku = (item.permalink || '').split('?')[0].toLowerCase().replace(/\/+$/, '');
    if (!kh || kh.length < 4) continue;
    if (seenHl.has(kh) || (ku && seenUrl.has(ku))) continue;
    seenHl.add(kh);
    if (ku) seenUrl.add(ku);
    out.push(item);
  }
  out.sort((a, b) => (b.datetime || '').localeCompare(a.datetime || ''));
  return out;
}

// ─── Main handler ───

export async function GET(
  _request: NextRequest,
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

  const config = TICKER_PR_CONFIG[symbol];
  if (!config) {
    // Ticker exists in stocks but has no PR config — return empty
    return NextResponse.json({
      symbol,
      companyName: stock.name,
      releases: [],
      fetchedAt: new Date().toISOString(),
    });
  }

  try {
    // Fetch from QuoteMedia/AccessWire directly (same upstream as press-intelligence.js)
    const allItems = (await Promise.all(config.topics.map(fetchQM))).flat();

    // Filter to configured wire sources + company headline filter
    const filtered = allItems.filter(item => {
      const src = (item.source || '').toLowerCase();
      const hl = (item.headline || '').toLowerCase();
      return config.sources.some(s => src.includes(s)) && config.filter(hl);
    });

    const unique = dedupe(filtered);

    const releases = unique.slice(0, 15).map(item => ({
      date: item.datetime ? item.datetime.split('T')[0] : '',
      headline: item.headline,
      url: item.permalink || item.storyurl || '',
      source: item.source || '',
      items: '',
    }));

    return NextResponse.json({
      symbol,
      companyName: stock.name,
      releases,
      fetchedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Press releases API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch press releases' },
      { status: 500 }
    );
  }
}
