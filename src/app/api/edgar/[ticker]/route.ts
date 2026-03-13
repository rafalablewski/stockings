import { NextRequest, NextResponse } from 'next/server';

type RouteParams = Promise<{ ticker: string }>;

// CIK numbers for tracked companies (zero-padded to 10 digits)
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
  FRMM: '0001838831',
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
  CRCL: '0001876042',
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
  '3': 'Form 3', '3/A': 'Form 3/A',
  '4': 'Form 4', '4/A': 'Form 4/A',
  '5': 'Form 5', '5/A': 'Form 5/A',
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
