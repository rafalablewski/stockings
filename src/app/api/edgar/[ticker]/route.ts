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

interface RecentFilings {
  accessionNumber: string[];
  filingDate: string[];
  form: string[];
  primaryDocument?: string[];
  primaryDocDescription?: string[];
  reportDate?: string[];
}

const SEC_HEADERS = {
  'User-Agent': 'Stockings Research App research@stockings.dev',
  Accept: 'application/json',
};

/** Normalize bare EDGAR form codes to display-friendly names */
const FORM_DISPLAY: Record<string, string> = {
  '3': 'Form 3', '4': 'Form 4', '5': 'Form 5',
  '144': 'Form 144', '144/A': 'Form 144/A',
  'D': 'Form D', 'D/A': 'Form D/A',
};

/** Parse a RecentFilings-shaped object into EdgarFiling[] */
function parseFilings(recent: RecentFilings, cik: string): EdgarFiling[] {
  const count = recent.accessionNumber?.length ?? 0;
  const filings: EdgarFiling[] = [];
  const cikBare = cik.replace(/^0+/, '');

  for (let i = 0; i < count; i++) {
    const accession = recent.accessionNumber[i] ?? '';
    const accessionNoDashes = accession.replace(/-/g, '');
    const primaryDoc = recent.primaryDocument?.[i] ?? '';

    filings.push({
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
 * GET /api/edgar/[ticker]
 *
 * Fetches ALL SEC EDGAR filings for a given ticker using
 * the SEC submissions API (data.sec.gov). The "recent" object
 * holds up to ~1000 filings; older filings are in paginated
 * JSON files listed in filings.files[].
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
    const res = await fetch(
      `https://data.sec.gov/submissions/CIK${cik}.json`,
      { headers: SEC_HEADERS, next: { revalidate: 900 } }
    );

    if (!res.ok) {
      throw new Error(`SEC API returned ${res.status}`);
    }

    const data: {
      filings?: {
        recent?: RecentFilings;
        files?: { name: string }[];
      };
      name?: string;
    } = await res.json();

    const recent = data?.filings?.recent;
    if (!recent) {
      return NextResponse.json({ filings: [], companyName: data?.name ?? upperTicker });
    }

    // Start with the "recent" filings (up to ~1000)
    const filings: EdgarFiling[] = parseFilings(recent, cik);

    // Fetch older filing pages if they exist
    const olderFiles = data?.filings?.files ?? [];
    if (olderFiles.length > 0) {
      const olderResults = await Promise.allSettled(
        olderFiles.map(async (file) => {
          const olderRes = await fetch(
            `https://data.sec.gov/submissions/${file.name}`,
            { headers: SEC_HEADERS, next: { revalidate: 3600 } }
          );
          if (!olderRes.ok) return [];
          const olderData: RecentFilings = await olderRes.json();
          return parseFilings(olderData, cik);
        })
      );
      for (const result of olderResults) {
        if (result.status === 'fulfilled') {
          filings.push(...result.value);
        }
      }
    }

    return NextResponse.json({
      filings,
      companyName: data?.name ?? upperTicker,
      cik,
      ticker: upperTicker,
      totalCount: filings.length,
    });
  } catch (err) {
    console.error(`[EDGAR API] Error fetching filings for ${upperTicker}:`, err);
    return NextResponse.json(
      { error: `Failed to fetch EDGAR filings: ${(err as Error).message}` },
      { status: 502 }
    );
  }
}
