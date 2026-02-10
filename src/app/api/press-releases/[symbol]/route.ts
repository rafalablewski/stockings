import { NextRequest, NextResponse } from 'next/server';

type RouteParams = Promise<{ symbol: string }>;

// CIK mapping for supported stocks
const COMPANY_CIK: Record<string, string> = {
  ASTS: '0001780312',
};

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
  // Pick the most meaningful item (skip 9.01 which is just "exhibits included")
  const meaningful = codes.filter(c => c !== '9.01');
  const code = meaningful[0] || codes[0];
  return ITEM_DESCRIPTIONS[code] || `8-K (Item ${code})`;
}

export async function GET(
  request: NextRequest,
  { params }: { params: RouteParams }
) {
  const { symbol: rawSymbol } = await params;
  const symbol = decodeURIComponent(rawSymbol).toUpperCase();

  const cik = COMPANY_CIK[symbol];
  if (!cik) {
    return NextResponse.json(
      { error: `Unsupported symbol: ${symbol}` },
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
      next: { revalidate: 600 }, // Cache for 10 minutes
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

    for (let i = 0; i < recent.form.length && releases.length < 5; i++) {
      if (recent.form[i] === '8-K') {
        const accession = recent.accessionNumber[i];
        const accessionNoDashes = accession.replace(/-/g, '');
        const primaryDoc = recent.primaryDocument[i];
        const filingUrl = `https://www.sec.gov/Archives/edgar/data/${cik.replace(/^0+/, '')}/${accessionNoDashes}/${primaryDoc}`;

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
