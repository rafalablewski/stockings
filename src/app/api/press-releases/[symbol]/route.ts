import { NextRequest, NextResponse } from 'next/server';

type RouteParams = Promise<{ symbol: string }>;

// Human-readable descriptions for 8-K item codes
const ITEM_DESCRIPTIONS: Record<string, string> = {
  '1.01': 'Material Definitive Agreement',
  '1.02': 'Termination of Material Agreement',
  '2.02': 'Results of Operations & Financial Condition',
  '2.05': 'Costs Associated with Exit Activities',
  '3.01': 'Delisting / Transfer of Listing',
  '5.02': 'Director/Officer Changes',
  '5.03': 'Amendments to Articles',
  '5.07': 'Shareholder Vote Results',
  '7.01': 'Regulation FD Disclosure',
  '8.01': 'Other Events',
  '9.01': 'Financial Statements and Exhibits',
};

function describeItems(items: string): string {
  if (!items || items.trim() === '') return '8-K Filing';
  const codes = items.split(',').map(s => s.trim());
  const meaningful = codes.filter(c => c !== '9.01');
  const code = meaningful[0] || codes[0];
  return ITEM_DESCRIPTIONS[code] || `8-K (Item ${code})`;
}

// Fallback CIK map for known tickers (used when SEC lookup fails)
const KNOWN_CIK: Record<string, string> = {
  ASTS: '0001780312',
  BMNR: '0001843588',
  CRCL: '0001876042',
};

// Cache for CIK lookups (ticker -> CIK)
let cikCache: Record<string, string> = {};
let cikCacheTime = 0;
const CIK_CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

async function lookupCIK(ticker: string): Promise<string | null> {
  // Check cache first
  if (cikCache[ticker] && Date.now() - cikCacheTime < CIK_CACHE_TTL) {
    return cikCache[ticker];
  }

  // Try dynamic lookup from SEC
  try {
    const res = await fetch('https://www.sec.gov/files/company_tickers.json', {
      headers: {
        'User-Agent': 'stockings-app/1.0 (research-tool)',
        'Accept': 'application/json',
      },
    });
    if (res.ok) {
      const data = await res.json();
      const newCache: Record<string, string> = {};
      for (const key of Object.keys(data)) {
        const entry = data[key];
        if (entry.ticker) {
          newCache[entry.ticker.toUpperCase()] = String(entry.cik_str).padStart(10, '0');
        }
      }
      cikCache = newCache;
      cikCacheTime = Date.now();
      if (cikCache[ticker]) return cikCache[ticker];
    }
  } catch {
    // Dynamic lookup failed — fall through to known CIKs
  }

  // Fallback to known CIKs
  return KNOWN_CIK[ticker] || null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: RouteParams }
) {
  const { symbol: rawSymbol } = await params;
  const symbol = decodeURIComponent(rawSymbol).toUpperCase();

  const cik = await lookupCIK(symbol);
  if (!cik) {
    return NextResponse.json(
      { error: `Could not find SEC CIK for symbol: ${symbol}` },
      { status: 400 }
    );
  }

  try {
    const url = `https://data.sec.gov/submissions/CIK${cik}.json`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'stockings-app/1.0 (research-tool)',
        'Accept': 'application/json',
      },
      next: { revalidate: 600 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch from SEC EDGAR', status: response.status },
        { status: response.status }
      );
    }

    const data = await response.json();
    const recent = data?.filings?.recent;

    if (!recent?.form) {
      return NextResponse.json(
        { error: 'Unexpected EDGAR response format' },
        { status: 502 }
      );
    }

    // Extract 8-K filings (press releases / material events)
    const releases: Array<{
      date: string;
      headline: string;
      url: string;
      items: string;
    }> = [];

    const cikNumeric = cik.replace(/^0+/, '');
    for (let i = 0; i < recent.form.length && releases.length < 5; i++) {
      if (recent.form[i] === '8-K') {
        const accession = recent.accessionNumber[i];
        const accessionNoDashes = accession.replace(/-/g, '');
        const primaryDoc = recent.primaryDocument[i];
        const filingUrl = `https://www.sec.gov/Archives/edgar/data/${cikNumeric}/${accessionNoDashes}/${primaryDoc}`;

        releases.push({
          date: recent.filingDate[i],
          headline: describeItems(recent.items?.[i] || ''),
          url: filingUrl,
          items: recent.items?.[i] || '',
        });
      }
    }

    return NextResponse.json({
      symbol,
      companyName: data.name || symbol,
      releases,
      fetchedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('SEC EDGAR API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch press releases' },
      { status: 500 }
    );
  }
}
