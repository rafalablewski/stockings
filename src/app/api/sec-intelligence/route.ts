import { NextRequest, NextResponse } from 'next/server';

/**
 * CIK numbers for tracked companies (zero-padded to 10 digits).
 * Source: SEC EDGAR (data.sec.gov/submissions/CIK{cik}.json)
 */
const CIK_MAP: Record<string, string> = {
  // ─── Space Technology ───
  ASTS: '0001780312',
  RKLB: '0001819994',
  SATS: '0001001082',
  LUNR: '0001807707',
  VSAT: '0000797721',
  GSAT: '0001366868',
  IRDM: '0001418819',
  PL:   '0001836935',
  // ─── Digital Assets ───
  BMNR: '0001829311',
  MSTR: '0001050446',
  MARA: '0001507605',
  RIOT: '0001167419',
  CLSK: '0000827876',
  HUT:  '0001964789',
  IREN: '0001822523',
  COIN: '0001679788',
  BITF: '0001725079',
  CORZ: '0001839341',
  APLD: '0001144879',
  CAN:  '0001737995',
  ARBK: '0001833214',
  BKKT: '0001820302',
  CIFR: '0001819454',
  HIVE: '0001820630',
  // ─── Fintech ───
  AFRM: '0001820953',
  SEZL: '0001662991',
  SQ:   '0001512673',
  V:    '0001403161',
  MA:   '0001141391',
  SOFI: '0001818874',
  PYPL: '0001633917',
  UPST: '0001647639',
  AXP:  '0000004962',
  HOOD: '0001783879',
  // ─── Financial Services ───
  BLK:  '0001364742',
  CME:  '0001156375',
  ICE:  '0001571949',
  C:    '0000831001',
  HSBC: '0000083246',
  // ─── Telecom ───
  T:    '0000732717',
  VZ:   '0000732712',
  TMUS: '0001283699',
  VOD:  '0000839923',
  NOK:  '0000804328',
  ERIC: '0000717826',
  BCE:  '0000718940',
  // ─── Technology ───
  GOOGL: '0001652044',
  NVDA:  '0001045810',
  IBM:   '0000051143',
  QCOM:  '0000804328',
  // ─── Aerospace & Defense ───
  BA:   '0000012927',
  LMT:  '0000936468',
  // ─── Infrastructure ───
  AMT:  '0001053507',
};

/** Dynamic CIK lookup cache — populated from SEC company_tickers.json on first miss */
let dynamicCikCache: Record<string, string> | null = null;
let dynamicCikFetchPromise: Promise<void> | null = null;

async function fetchDynamicCikMap(): Promise<void> {
  if (dynamicCikCache) return;
  if (dynamicCikFetchPromise) {
    await dynamicCikFetchPromise;
    return;
  }
  dynamicCikFetchPromise = (async () => {
    try {
      const res = await fetch('https://www.sec.gov/files/company_tickers.json', {
        headers: {
          'User-Agent': 'Stockings Research App research@stockings.dev',
          Accept: 'application/json',
        },
        next: { revalidate: 86400 },
      });
      if (!res.ok) throw new Error(`SEC returned ${res.status}`);
      const data: Record<string, { cik_str: number; ticker: string; title: string }> = await res.json();
      const map: Record<string, string> = {};
      for (const entry of Object.values(data)) {
        map[entry.ticker.toUpperCase()] = String(entry.cik_str).padStart(10, '0');
      }
      dynamicCikCache = map;
    } catch {
      dynamicCikCache = {};
    }
  })();
  await dynamicCikFetchPromise;
}

async function resolveCik(ticker: string): Promise<string | null> {
  const upper = ticker.toUpperCase();
  if (CIK_MAP[upper]) return CIK_MAP[upper];
  await fetchDynamicCikMap();
  return dynamicCikCache?.[upper] ?? null;
}

/** All tickers tracked in Press Intelligence */
const PI_TICKERS = [
  'ASTS', 'BMNR', 'IRDM', 'GSAT', 'VZ', 'VSAT', 'RKLB', 'SATS', 'LUNR', 'T',
  'MSTR', 'MARA', 'RIOT', 'CLSK', 'HUT', 'IREN', 'NBIS', 'FRMM', 'COIN',
  'MA', 'V', 'SOFI', 'AXP', 'AFRM', 'SEZL', 'SQ', 'PYPL', 'UPST',
  'HOOD', 'BITF', 'BLK', 'HSBC', 'C', 'CME', 'ICE',
  'VOD', 'TMUS', 'AMT',
  'GOOGL', 'PL', 'BA', 'LMT', 'QCOM', 'NOK', 'ERIC', 'NVDA', 'IBM',
  'CIFR', 'HIVE', 'CORZ', 'APLD', 'CAN', 'ARBK', 'BKKT',
];

const SEC_HEADERS = {
  'User-Agent': 'Stockings Research App research@stockings.dev',
  Accept: 'application/json',
};

/** Normalize bare EDGAR form codes to display-friendly names */
const FORM_DISPLAY: Record<string, string> = {
  '3': 'Form 3', '3/A': 'Form 3/A',
  '4': 'Form 4', '4/A': 'Form 4/A',
  '5': 'Form 5', '5/A': 'Form 5/A',
  '144': 'Form 144', '144/A': 'Form 144/A',
  'D': 'Form D', 'D/A': 'Form D/A',
};

interface RecentFilings {
  accessionNumber: string[];
  filingDate: string[];
  form: string[];
  primaryDocument?: string[];
  primaryDocDescription?: string[];
  reportDate?: string[];
}

interface SecFiling {
  ticker: string;
  accessionNumber: string;
  filingDate: string;
  form: string;
  primaryDocDescription: string;
  reportDate: string;
  fileUrl: string;
}

function parseFilings(recent: RecentFilings, cik: string, ticker: string, limit: number): SecFiling[] {
  const count = Math.min(recent.accessionNumber?.length ?? 0, limit);
  const filings: SecFiling[] = [];
  const cikBare = cik.replace(/^0+/, '');

  for (let i = 0; i < count; i++) {
    const accession = recent.accessionNumber[i] ?? '';
    const accessionNoDashes = accession.replace(/-/g, '');
    const primaryDoc = recent.primaryDocument?.[i] ?? '';

    filings.push({
      ticker,
      accessionNumber: accession,
      filingDate: recent.filingDate[i] ?? '',
      form: FORM_DISPLAY[recent.form[i] ?? ''] ?? recent.form[i] ?? '',
      primaryDocDescription: recent.primaryDocDescription?.[i] ?? '',
      reportDate: recent.reportDate?.[i] ?? '',
      fileUrl: primaryDoc
        ? `https://www.sec.gov/Archives/edgar/data/${cikBare}/${accessionNoDashes}/${primaryDoc}`
        : `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${cik}&type=&dateb=&owner=include&count=40`,
    });
  }
  return filings;
}

/**
 * GET /api/sec-intelligence
 *
 * Fetches recent SEC EDGAR filings for all Press Intelligence tickers.
 * Query params:
 *   - limit: max filings per ticker (default 25)
 *   - ticker: filter to specific ticker(s), comma-separated (default: all)
 *   - form: filter by form type(s), comma-separated (e.g., "10-K,10-Q,8-K")
 *   - days: only filings from last N days (default: no limit)
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limitParam = parseInt(searchParams.get('limit') || '25', 10);
  const limit = Math.min(Math.max(limitParam, 1), 200);
  const tickerFilter = searchParams.get('ticker')?.toUpperCase().split(',').filter(Boolean) ?? [];
  const formFilter = searchParams.get('form')?.toUpperCase().split(',').filter(Boolean) ?? [];
  const daysParam = parseInt(searchParams.get('days') || '0', 10);

  const tickers = tickerFilter.length > 0
    ? tickerFilter.filter(t => PI_TICKERS.includes(t))
    : PI_TICKERS;

  const cutoffDate = daysParam > 0
    ? new Date(Date.now() - daysParam * 86400000).toISOString().slice(0, 10)
    : null;

  const allFilings: SecFiling[] = [];
  const errors: Record<string, string> = {};
  const tickerStats: Record<string, { count: number; companyName: string }> = {};

  await Promise.allSettled(
    tickers.map(async (ticker) => {
      try {
        const cik = await resolveCik(ticker);
        if (!cik) {
          errors[ticker] = 'No CIK mapping found';
          return;
        }

        const res = await fetch(
          `https://data.sec.gov/submissions/CIK${cik}.json`,
          { headers: SEC_HEADERS, next: { revalidate: 900 } }
        );

        if (!res.ok) {
          errors[ticker] = `SEC API returned ${res.status}`;
          return;
        }

        const data: {
          filings?: { recent?: RecentFilings };
          name?: string;
        } = await res.json();

        const companyName = data?.name ?? ticker;
        const recent = data?.filings?.recent;
        if (!recent) {
          tickerStats[ticker] = { count: 0, companyName };
          return;
        }

        const filings = parseFilings(recent, cik, ticker, limit);
        tickerStats[ticker] = { count: filings.length, companyName };
        allFilings.push(...filings);
      } catch (err) {
        errors[ticker] = (err as Error).message;
      }
    })
  );

  // Apply form filter
  let filtered = allFilings;
  if (formFilter.length > 0) {
    filtered = filtered.filter(f =>
      formFilter.some(form => f.form.toUpperCase().includes(form))
    );
  }

  // Apply date cutoff
  if (cutoffDate) {
    filtered = filtered.filter(f => f.filingDate >= cutoffDate);
  }

  // Sort by filing date (newest first)
  filtered.sort((a, b) => b.filingDate.localeCompare(a.filingDate));

  return NextResponse.json({
    filings: filtered,
    totalCount: filtered.length,
    tickerStats,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
    fetchedAt: new Date().toISOString(),
  });
}
