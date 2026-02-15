import { NextRequest, NextResponse } from 'next/server';

type RouteParams = Promise<{ ticker: string }>;

// CIK numbers for tracked companies (zero-padded to 10 digits)
const CIK_MAP: Record<string, string> = {
  ASTS: '0001780312',
  BMNR: '0001829311',
};

interface EdgarFiling {
  accessionNumber: string;
  filingDate: string;
  form: string;
  primaryDocDescription: string;
  reportDate: string;
  fileUrl: string;
}

/**
 * GET /api/edgar/[ticker]
 *
 * Fetches the latest SEC EDGAR filings for a given ticker using
 * the SEC submissions API (data.sec.gov).
 *
 * Returns the most recent 40 filings with type, date, description, and link.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: RouteParams }
) {
  const { ticker } = await params;
  const upperTicker = ticker.toUpperCase();
  const cik = CIK_MAP[upperTicker];

  if (!cik) {
    return NextResponse.json(
      { error: `No CIK mapping for ticker: ${upperTicker}` },
      { status: 400 }
    );
  }

  try {
    // SEC requires a descriptive User-Agent with contact info
    const res = await fetch(
      `https://data.sec.gov/submissions/CIK${cik}.json`,
      {
        headers: {
          'User-Agent': 'Stockings Research App research@stockings.dev',
          Accept: 'application/json',
        },
        next: { revalidate: 900 }, // cache for 15 minutes
      }
    );

    if (!res.ok) {
      throw new Error(`SEC API returned ${res.status}`);
    }

    const data: {
      filings?: {
        recent?: {
          accessionNumber: string[];
          filingDate: string[];
          form: string[];
          primaryDocument?: string[];
          primaryDocDescription?: string[];
          reportDate?: string[];
        };
      };
      name?: string;
    } = await res.json();
    const recent = data?.filings?.recent;

    if (!recent) {
      return NextResponse.json({ filings: [], companyName: data?.name ?? upperTicker });
    }

    const count = Math.min(recent.accessionNumber?.length ?? 0, 40);
    const filings: EdgarFiling[] = [];

    for (let i = 0; i < count; i++) {
      const accession = recent.accessionNumber[i] ?? '';
      const accessionNoDashes = accession.replace(/-/g, '');
      const primaryDoc = recent.primaryDocument?.[i] ?? '';

      filings.push({
        accessionNumber: accession,
        filingDate: recent.filingDate[i] ?? '',
        form: recent.form[i] ?? '',
        primaryDocDescription: recent.primaryDocDescription?.[i] ?? '',
        reportDate: recent.reportDate?.[i] ?? '',
        fileUrl: primaryDoc
          ? `https://www.sec.gov/Archives/edgar/data/${cik.replace(/^0+/, '')}/${accessionNoDashes}/${primaryDoc}`
          : `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${cik}&type=&dateb=&owner=include&count=40`,
      });
    }

    return NextResponse.json({
      filings,
      companyName: data?.name ?? upperTicker,
      cik,
      ticker: upperTicker,
    });
  } catch (err) {
    console.error(`[EDGAR API] Error fetching filings for ${upperTicker}:`, err);
    return NextResponse.json(
      { error: `Failed to fetch EDGAR filings: ${(err as Error).message}` },
      { status: 502 }
    );
  }
}
