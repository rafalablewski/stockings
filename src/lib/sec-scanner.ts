// ============================================================================
// SEC FILING SCANNER — Autonomous EDGAR scanning engine
// ============================================================================
// Scans SEC EDGAR for new filings across all covered research stocks.
// Detects filings not yet in the seenFilings database, AI-analyzes each one,
// and produces structured reports for PM decision queue approval.
//
// Stock-agnostic: driven by researchStocks from the stocks registry.
// Adding a stock with hasResearch: true automatically includes it in scans.
// ============================================================================

import { getDb } from './db';
import { seenFilings } from './schema';
import { inArray } from 'drizzle-orm';
import { researchStocks } from './stocks';
import { resolveCik } from './cik-map';
import { classifyAnthropicError } from './anthropic-error';
import { normalizeAccession, normalizeDate, type LocalFiling } from '@/components/shared/edgarMergeHelpers';
import {
  ASTS_SEC_FILINGS, ASTS_FILING_CROSS_REFS,
} from '@/data/asts/sec-filings';
import {
  BMNR_SEC_FILINGS, BMNR_FILING_CROSS_REFS,
} from '@/data/bmnr/sec-filings';
import {
  CRCL_SEC_FILINGS, CRCL_FILING_CROSS_REFS,
} from '@/data/crcl/sec-filings';

// ── Constants ────────────────────────────────────────────────────────────────

const SEC_HEADERS = {
  'User-Agent': 'Stockings Research App research@stockings.dev',
  Accept: 'application/json',
};

const CLAUDE_MODEL = 'claude-haiku-4-5-20251001';
const MAX_FILING_TEXT_LENGTH = 15_000;
const DEFAULT_FILING_LIMIT = 25;

/** Normalize bare EDGAR form codes to display-friendly names */
const FORM_DISPLAY: Record<string, string> = {
  '3': 'Form 3', '3/A': 'Form 3/A',
  '4': 'Form 4', '4/A': 'Form 4/A',
  '5': 'Form 5', '5/A': 'Form 5/A',
  '144': 'Form 144', '144/A': 'Form 144/A',
  'D': 'Form D', 'D/A': 'Form D/A',
  '10-K': 'Form 10-K', '10-K/A': 'Form 10-K/A',
  '10-Q': 'Form 10-Q', '10-Q/A': 'Form 10-Q/A',
  '8-K': 'Form 8-K', '8-K/A': 'Form 8-K/A',
  'S-1': 'Form S-1', 'S-1/A': 'Form S-1/A',
  'S-3': 'Form S-3', 'S-3/A': 'Form S-3/A',
  'DEF 14A': 'DEF 14A Proxy Statement',
  'SC 13D': 'Schedule 13D', 'SC 13D/A': 'Schedule 13D/A',
  'SC 13G': 'Schedule 13G', 'SC 13G/A': 'Schedule 13G/A',
};

// ── Types ────────────────────────────────────────────────────────────────────

interface RecentFilings {
  accessionNumber: string[];
  filingDate: string[];
  form: string[];
  primaryDocument?: string[];
  primaryDocDescription?: string[];
  reportDate?: string[];
}

export interface ScannedFiling {
  ticker: string;
  accessionNumber: string;
  filingDate: string;
  form: string;
  primaryDocDescription: string;
  reportDate: string;
  fileUrl: string;
}

export interface FilingAnalysis {
  filing: ScannedFiling;
  analysis: string;
  verdict: 'CRITICAL' | 'IMPORTANT' | 'ROUTINE' | 'LOW' | 'UNKNOWN';
  verdictSummary: string;
}

export type FilingDbStatus = 'tracked' | 'data_only' | 'untracked';

export interface FilingCoverageEntry {
  accessionNumber: string;
  form: string;
  filingDate: string;
  status: FilingDbStatus;
  fileUrl?: string;              // EDGAR filing URL (for content fetching)
  matchedDescription?: string;   // description from local data file if tracked
  edgarDescription?: string;     // original EDGAR primaryDocDescription (for untracked filings)
  crossRefSources?: string[];    // cross-ref sources if data_only
}

export interface CoverageSummary {
  total: number;
  tracked: number;
  dataOnly: number;
  untracked: number;
  entries: FilingCoverageEntry[];
}

export interface TickerScanResult {
  ticker: string;
  companyName: string;
  totalFetched: number;
  newFilings: ScannedFiling[];
  analyses: FilingAnalysis[];
  coverage?: CoverageSummary;
  error?: string;
}

export interface ScanResult {
  tickersScanned: number;
  totalNewFilings: number;
  decisionsCreated: number;
  tickerResults: TickerScanResult[];
  errors: Record<string, string>;
  scannedAt: string;
}

// ── Core scanning logic ──────────────────────────────────────────────────────

/**
 * Main entry point: scan EDGAR for new filings across all research stocks.
 *
 * @param tickers Optional ticker filter. Defaults to all researchStocks.
 * @param limit   Max filings to fetch per ticker from SEC (default 25).
 */
export async function scanForNewFilings(
  tickers?: string[],
  limit: number = DEFAULT_FILING_LIMIT,
): Promise<ScanResult> {
  const targetTickers = tickers?.length
    ? tickers.map(t => t.toUpperCase())
    : researchStocks.map(s => s.ticker);

  const tickerResults: TickerScanResult[] = [];
  const errors: Record<string, string> = {};
  let totalNewFilings = 0;

  // Scan all tickers in parallel
  await Promise.allSettled(
    targetTickers.map(async (ticker) => {
      try {
        const result = await scanTicker(ticker, limit);
        tickerResults.push(result);
        totalNewFilings += result.newFilings.length;
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        errors[ticker] = msg;
        tickerResults.push({
          ticker,
          companyName: ticker,
          totalFetched: 0,
          newFilings: [],
          analyses: [],
          error: msg,
        });
      }
    }),
  );

  // Note: PM decisions and Room notifications are handled by the engineer engine
  // via filing-engineer's decisionsFor/notifyPm/autoReviewBy config.
  // The scanner is a pure data-fetching function.

  return {
    tickersScanned: targetTickers.length,
    totalNewFilings,
    decisionsCreated: 0, // decisions now created by engine, not scanner
    tickerResults,
    errors: Object.keys(errors).length > 0 ? errors : {},
    scannedAt: new Date().toISOString(),
  };
}

// ── Per-ticker scanning ──────────────────────────────────────────────────────

async function scanTicker(ticker: string, limit: number): Promise<TickerScanResult> {
  const cik = await resolveCik(ticker);
  if (!cik) throw new Error(`No CIK mapping found for ${ticker}`);

  // 1. Fetch recent filings from SEC EDGAR
  const res = await fetch(
    `https://data.sec.gov/submissions/CIK${cik}.json`,
    { headers: SEC_HEADERS },
  );
  if (!res.ok) throw new Error(`SEC API returned ${res.status}`);

  const data: { filings?: { recent?: RecentFilings }; name?: string } = await res.json();
  const companyName = data?.name ?? ticker;
  const recent = data?.filings?.recent;
  if (!recent) {
    return { ticker, companyName, totalFetched: 0, newFilings: [], analyses: [] };
  }

  // 2. Parse filings from SEC response
  //    - Limited set: for new-filing detection and AI analysis (respects limit)
  //    - Full set: for database coverage check (all EDGAR filings)
  const fetched = parseFilings(recent, cik, ticker, limit);
  const allFilings = parseFilings(recent, cik, ticker, recent.accessionNumber?.length ?? 0);

  // 3. Load existing accession numbers from DB
  const db = getDb();
  const tickerLower = ticker.toLowerCase();
  const existingAccessions = new Set<string>();

  try {
    const rows = await db
      .select({ accessionNumber: seenFilings.accessionNumber })
      .from(seenFilings)
      .where(inArray(seenFilings.ticker, [tickerLower]));

    for (const row of rows) {
      existingAccessions.add(row.accessionNumber);
    }
  } catch (err) {
    console.error(`[sec-scanner] DB query failed for ${ticker}:`, err);
  }

  // 4. Identify new filings (not in DB)
  const newFilings = fetched.filter(f => !existingAccessions.has(f.accessionNumber));

  // 4a. Always check database coverage against ALL EDGAR filings
  const coverage = checkFilingCoverage(ticker, allFilings);

  if (newFilings.length === 0) {
    return { ticker, companyName, totalFetched: allFilings.length, newFilings: [], analyses: [], coverage };
  }

  // 5. Persist all new filings to seenFilings DB
  await persistNewFilings(newFilings, tickerLower);

  // 6. AI-analyze each new filing
  const analyses: FilingAnalysis[] = [];
  for (const filing of newFilings) {
    try {
      const analysis = await analyzeNewFiling(filing);
      analyses.push(analysis);
    } catch (err) {
      console.error(`[sec-scanner] Analysis failed for ${filing.form} ${filing.filingDate}:`, err);
      analyses.push({
        filing,
        analysis: `Analysis failed: ${err instanceof Error ? err.message : String(err)}`,
        verdict: 'UNKNOWN',
        verdictSummary: '',
      });
    }
  }

  return { ticker, companyName, totalFetched: allFilings.length, newFilings, analyses, coverage };
}

// ── Filing parsing (matches sec-intelligence pattern) ────────────────────────

function parseFilings(recent: RecentFilings, cik: string, ticker: string, limit: number): ScannedFiling[] {
  const count = Math.min(recent.accessionNumber?.length ?? 0, limit);
  const filings: ScannedFiling[] = [];
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

// ── Persist new filings to DB ────────────────────────────────────────────────

async function persistNewFilings(filings: ScannedFiling[], tickerLower: string): Promise<void> {
  if (filings.length === 0) return;
  const db = getDb();

  const values = filings.map(f => ({
    ticker: tickerLower,
    accessionNumber: f.accessionNumber,
    form: f.form,
    filingDate: f.filingDate || null,
    description: f.primaryDocDescription || null,
    reportDate: f.reportDate || null,
    fileUrl: f.fileUrl || null,
    status: null,
    crossRefs: null,
    dismissed: false,  // NEW filing — shows NEW badge in EDGAR tab
  }));

  try {
    await db.insert(seenFilings).values(values).onConflictDoUpdate({
      target: [seenFilings.ticker, seenFilings.accessionNumber],
      set: {
        form: seenFilings.form,             // no-op on conflict since same data
        filingDate: seenFilings.filingDate,
        description: seenFilings.description,
        reportDate: seenFilings.reportDate,
        fileUrl: seenFilings.fileUrl,
        // PRESERVED: dismissed, hidden, status, crossRefs
      },
    });
  } catch (err) {
    console.error(`[sec-scanner] Failed to persist filings for ${tickerLower}:`, err);
  }
}

// ── Filing Content Fetcher (reusable) ────────────────────────────────────────

/**
 * Fetch and parse the full text of an SEC filing from EDGAR.
 * Strips HTML, normalizes whitespace, and truncates to maxLength.
 */
export async function fetchFilingText(fileUrl: string, maxLength = MAX_FILING_TEXT_LENGTH): Promise<string> {
  try {
    const res = await fetch(fileUrl, { headers: SEC_HEADERS });
    if (!res.ok) throw new Error(`SEC returned ${res.status}`);
    const html = await res.text();

    let text = html
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#?\w+;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (text.length > maxLength) {
      text = text.slice(0, maxLength) + '\n\n[... document truncated ...]';
    }

    return text;
  } catch (err) {
    return `[Could not fetch document: ${(err as Error).message}]`;
  }
}

// ── AI Filing Analysis ───────────────────────────────────────────────────────

async function analyzeNewFiling(filing: ScannedFiling): Promise<FilingAnalysis> {
  const apiKey = process.env.ANTHROPIC_API_KEY || '';
  if (!apiKey) {
    return {
      filing,
      analysis: 'AI analysis skipped — ANTHROPIC_API_KEY not configured.',
      verdict: 'UNKNOWN',
      verdictSummary: '',
    };
  }

  // Fetch the filing document text from SEC
  const docText = await fetchFilingText(filing.fileUrl);

  const prompt = buildAnalysisPrompt(filing, docText);

  const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!claudeRes.ok) {
    const errText = await claudeRes.text();
    const errInfo = classifyAnthropicError(claudeRes.status, errText);
    throw new Error(errInfo.message);
  }

  const result = await claudeRes.json();
  const analysisText: string = result.content?.[0]?.text || 'No analysis generated.';

  // Extract verdict and summary from analysis text
  const { verdict, verdictSummary } = extractVerdict(analysisText);

  return { filing, analysis: analysisText, verdict, verdictSummary };
}

function buildAnalysisPrompt(filing: ScannedFiling, docText: string): string {
  return `You are an autonomous SEC filing analyst for ${filing.ticker}. Analyze this newly detected filing and provide a structured report.

FILING METADATA:
Form: ${filing.form}
Description: ${filing.primaryDocDescription || 'N/A'}
Filing Date: ${filing.filingDate}
Report Date: ${filing.reportDate || 'N/A'}
Ticker: ${filing.ticker}

DOCUMENT TEXT:
${docText}

Provide a structured analysis covering:

1. **Classification** — Materiality level:
   - CRITICAL: Material new data (financial results, guidance changes, material agreements, capital events)
   - IMPORTANT: Useful data worth capturing (insider transactions, notable filing details, capital changes)
   - ROUTINE: Administrative filing with no material changes (boilerplate, procedural)
   - LOW: Procedural filing with no data relevance

2. **Key Findings** (3-6 bullet points):
   - What this filing discloses
   - Key financial data points (if any)
   - Material changes or events
   - Impact on investors

3. **Proposed Database Updates**:
   - Which data files need updating (financials.ts, capital.ts, company.ts, timeline.ts, catalysts.ts)
   - Specific changes with source citations from the filing
   - New timeline events to add (if applicable)

4. **Verdict** — On a new line in this exact format:
[VERDICT: <CRITICAL|IMPORTANT|ROUTINE|LOW>] — <one-line summary>

Be direct, specific, and use numbers from the filing. No fluff.`;
}

function extractVerdict(analysis: string): { verdict: FilingAnalysis['verdict']; verdictSummary: string } {
  const match = analysis.match(/\[VERDICT:\s*(CRITICAL|IMPORTANT|ROUTINE|LOW)\]\s*(?:—\s*)?(.*)$/im);
  if (!match) return { verdict: 'UNKNOWN', verdictSummary: '' };
  return {
    verdict: match[1].toUpperCase() as FilingAnalysis['verdict'],
    verdictSummary: match[2]?.trim() || '',
  };
}

// Decision payload builders removed — decisions now created by engineer engine
// via filing-engineer's decisionsFor config + Gemini auto-review gate.

// ── Filing coverage check (database status) ─────────────────────────────────

/** Registry of local data files per ticker for server-side coverage checks */
const TICKER_SEC_DATA: Record<string, {
  filings: LocalFiling[];
  crossRefs: Record<string, { source: string; data: string }[]>;
}> = {
  ASTS: { filings: ASTS_SEC_FILINGS as LocalFiling[], crossRefs: ASTS_FILING_CROSS_REFS },
  BMNR: { filings: BMNR_SEC_FILINGS as LocalFiling[], crossRefs: BMNR_FILING_CROSS_REFS },
  CRCL: { filings: CRCL_SEC_FILINGS as LocalFiling[], crossRefs: CRCL_FILING_CROSS_REFS },
};

/** Max days for legacy form+date matching (same as SharedEdgarTab) */
const MAX_LEGACY_MATCH_DAYS = 14;

/** Normalize form type for comparison (mirrors SharedEdgarTab logic) */
const normalizeFormForMatch = (f: string) => {
  const norm = f.toUpperCase().trim().replace(/[/\s-]/g, '').replace(/^FORM/i, '').replace(/^SCHEDULE/i, 'SC');
  const aliases: Record<string, string> = { PRNEWS: '8K' };
  return aliases[norm] || norm;
};

/** Absolute day difference between two ISO date strings */
function daysBetween(a: string, b: string): number {
  const da = new Date(a + 'T12:00:00Z');
  const db = new Date(b + 'T12:00:00Z');
  return Math.round(Math.abs(da.getTime() - db.getTime()) / 86400000);
}

/**
 * Look up cross-refs by accession number first, then by form|date (legacy).
 * Mirrors SharedEdgarTab.lookupCrossRefs: iterates all keys, normalizes forms,
 * and uses tight date tolerance (<=1 day) to prevent bleeding between filings.
 */
function lookupCrossRefsServer(
  accessionNumber: string,
  form: string,
  isoDate: string,
  index: Record<string, { source: string; data: string }[]>,
): { source: string; data: string }[] | undefined {
  // Primary: exact accession number lookup
  const accNorm = normalizeAccession(accessionNumber);
  if (index[accessionNumber]) return index[accessionNumber];
  if (index[accNorm]) return index[accNorm];

  // Fallback: form|date key matching with normalization + 1-day tolerance
  const lookupNorm = normalizeFormForMatch(form);
  for (const [key, value] of Object.entries(index)) {
    const pipeIdx = key.indexOf('|');
    if (pipeIdx === -1) continue;
    const keyForm = key.slice(0, pipeIdx);
    const keyDate = key.slice(pipeIdx + 1);
    if (normalizeFormForMatch(keyForm) !== lookupNorm) continue;
    if (daysBetween(isoDate, keyDate) <= 1) return value;
  }
  return undefined;
}

/**
 * Check how well the local database covers the EDGAR filings.
 * Uses the same matching logic as SharedEdgarTab's matchFilings():
 * - Tier 1a: exact accession number match → "tracked"
 * - Tier 1b: form+date legacy match (within 14 days) → "tracked"
 * - Tier 2: cross-ref data exists → "data_only"
 * - Tier 3: nothing → "untracked"
 */
function checkFilingCoverage(ticker: string, filings: ScannedFiling[]): CoverageSummary {
  const data = TICKER_SEC_DATA[ticker.toUpperCase()];
  if (!data) {
    return { total: filings.length, tracked: 0, dataOnly: 0, untracked: filings.length, entries: filings.map(f => ({
      accessionNumber: f.accessionNumber, form: f.form, filingDate: f.filingDate, status: 'untracked' as FilingDbStatus,
      fileUrl: f.fileUrl, edgarDescription: f.primaryDocDescription || undefined,
    })) };
  }

  const { filings: localFilings, crossRefs } = data;

  // Build accession → LocalFiling map (Tier 1a)
  const accessionMap = new Map<string, LocalFiling>();
  const legacyFilings: LocalFiling[] = [];
  for (const lf of localFilings) {
    if (lf.accessionNumber) {
      accessionMap.set(normalizeAccession(lf.accessionNumber), lf);
    } else {
      legacyFilings.push(lf);
    }
  }

  // Pre-compute legacy matches (Tier 1b) — greedy closest-first
  type Candidate = { ei: number; li: number; days: number };
  const candidates: Candidate[] = [];
  const accessionMatched = new Set<number>();

  for (let ei = 0; ei < filings.length; ei++) {
    const ef = filings[ei];
    if (accessionMap.has(normalizeAccession(ef.accessionNumber))) {
      accessionMatched.add(ei);
      continue;
    }
    const edgarDate = ef.filingDate; // already ISO
    const edgarForm = normalizeFormForMatch(ef.form);
    for (let li = 0; li < legacyFilings.length; li++) {
      if (normalizeFormForMatch(legacyFilings[li].type) !== edgarForm) continue;
      const days = daysBetween(edgarDate, normalizeDate(legacyFilings[li].date));
      if (days <= MAX_LEGACY_MATCH_DAYS) {
        candidates.push({ ei, li, days });
      }
    }
  }

  candidates.sort((a, b) => a.days - b.days);
  const legacyMatch = new Map<number, LocalFiling>();
  const usedLegacy = new Set<number>();
  for (const { ei, li } of candidates) {
    if (legacyMatch.has(ei) || usedLegacy.has(li)) continue;
    legacyMatch.set(ei, legacyFilings[li]);
    usedLegacy.add(li);
  }

  // Assemble results
  let tracked = 0, dataOnly = 0, untracked = 0;
  const entries: FilingCoverageEntry[] = filings.map((f, ei) => {
    // Tier 1a: accession match
    let match = accessionMap.get(normalizeAccession(f.accessionNumber));
    // Tier 1b: legacy match
    if (!match) match = legacyMatch.get(ei);

    if (match) {
      tracked++;
      return {
        accessionNumber: f.accessionNumber, form: f.form, filingDate: f.filingDate,
        status: 'tracked' as FilingDbStatus, matchedDescription: match.description,
      };
    }

    // Tier 2: cross-ref lookup (mirrors SharedEdgarTab.lookupCrossRefs)
    const refs = lookupCrossRefsServer(f.accessionNumber, f.form, f.filingDate, crossRefs);
    if (refs && refs.length > 0) {
      dataOnly++;
      return {
        accessionNumber: f.accessionNumber, form: f.form, filingDate: f.filingDate,
        status: 'data_only' as FilingDbStatus, crossRefSources: refs.map(r => r.source),
      };
    }

    // Tier 3: untracked
    untracked++;
    return {
      accessionNumber: f.accessionNumber, form: f.form, filingDate: f.filingDate,
      status: 'untracked' as FilingDbStatus,
      fileUrl: f.fileUrl, edgarDescription: f.primaryDocDescription || undefined,
    };
  });

  return { total: filings.length, tracked, dataOnly, untracked, entries };
}
