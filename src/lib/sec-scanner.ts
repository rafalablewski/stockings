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
import { seenFilings, pmDecisions, roomMessages } from './schema';
import { inArray } from 'drizzle-orm';
import { researchStocks } from './stocks';
import { resolveCik } from './cik-map';
import { classifyAnthropicError } from './anthropic-error';

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
}

export interface TickerScanResult {
  ticker: string;
  companyName: string;
  totalFetched: number;
  newFilings: ScannedFiling[];
  analyses: FilingAnalysis[];
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
  let decisionsCreated = 0;

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

  // Create PM decisions for tickers with new filings that have analyses
  const db = getDb();
  for (const result of tickerResults) {
    if (result.analyses.length === 0) continue;

    const payload = buildDecisionPayload(result);
    const criticalCount = result.analyses.filter(a => a.verdict === 'CRITICAL').length;
    const importantCount = result.analyses.filter(a => a.verdict === 'IMPORTANT').length;

    const title = buildDecisionTitle(result.ticker, result.analyses.length, criticalCount, importantCount);

    try {
      await db.insert(pmDecisions).values({
        pm: 'gemini',
        engineerId: 'filing-engineer',
        ticker: result.ticker,
        title,
        category: 'sec-filing-report',
        payload: JSON.stringify(payload),
      });
      decisionsCreated++;
    } catch (err) {
      console.error(`[sec-scanner] Failed to create decision for ${result.ticker}:`, err);
    }
  }

  // Post Room notification if any new filings found
  if (totalNewFilings > 0) {
    const criticalTotal = tickerResults.reduce(
      (sum, r) => sum + r.analyses.filter(a => a.verdict === 'CRITICAL').length, 0,
    );
    const tickers = tickerResults
      .filter(r => r.newFilings.length > 0)
      .map(r => r.ticker)
      .join(', ');

    const summary = criticalTotal > 0
      ? `${totalNewFilings} new filing(s) detected across ${tickers} — ${criticalTotal} CRITICAL`
      : `${totalNewFilings} new filing(s) detected across ${tickers}`;

    try {
      await db.insert(roomMessages).values({
        sender: 'gemini',
        content: `[SEC Scanner] ${summary}. Review pending in Decision Dashboard.`,
        channel: 'research',
      });
    } catch (err) {
      console.error('[sec-scanner] Room notification failed:', err);
    }
  }

  return {
    tickersScanned: targetTickers.length,
    totalNewFilings,
    decisionsCreated,
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
  const fetched = parseFilings(recent, cik, ticker, limit);

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

  if (newFilings.length === 0) {
    return { ticker, companyName, totalFetched: fetched.length, newFilings: [], analyses: [] };
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
      });
    }
  }

  return { ticker, companyName, totalFetched: fetched.length, newFilings, analyses };
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

// ── AI Filing Analysis ───────────────────────────────────────────────────────

async function analyzeNewFiling(filing: ScannedFiling): Promise<FilingAnalysis> {
  const apiKey = process.env.ANTHROPIC_API_KEY || '';
  if (!apiKey) {
    return {
      filing,
      analysis: 'AI analysis skipped — ANTHROPIC_API_KEY not configured.',
      verdict: 'UNKNOWN',
    };
  }

  // Fetch the filing document text from SEC
  let docText = '';
  try {
    const res = await fetch(filing.fileUrl, { headers: SEC_HEADERS });
    if (!res.ok) throw new Error(`SEC returned ${res.status}`);
    const html = await res.text();

    docText = html
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

    if (docText.length > MAX_FILING_TEXT_LENGTH) {
      docText = docText.slice(0, MAX_FILING_TEXT_LENGTH) + '\n\n[... document truncated ...]';
    }
  } catch (err) {
    docText = `[Could not fetch document: ${(err as Error).message}]`;
  }

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

  // Extract verdict from analysis text
  const verdict = extractVerdict(analysisText);

  return { filing, analysis: analysisText, verdict };
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

function extractVerdict(analysis: string): FilingAnalysis['verdict'] {
  const match = analysis.match(/\[VERDICT:\s*(CRITICAL|IMPORTANT|ROUTINE|LOW)\]/i);
  if (!match) return 'UNKNOWN';
  return match[1].toUpperCase() as FilingAnalysis['verdict'];
}

// ── Decision payload builders ────────────────────────────────────────────────

function buildDecisionPayload(result: TickerScanResult) {
  return {
    ticker: result.ticker,
    companyName: result.companyName,
    scannedAt: new Date().toISOString(),
    newFilingsCount: result.newFilings.length,
    analyses: result.analyses.map(a => ({
      form: a.filing.form,
      filingDate: a.filing.filingDate,
      accessionNumber: a.filing.accessionNumber,
      description: a.filing.primaryDocDescription,
      fileUrl: a.filing.fileUrl,
      verdict: a.verdict,
      analysis: a.analysis,
    })),
  };
}

function buildDecisionTitle(
  ticker: string,
  count: number,
  criticalCount: number,
  importantCount: number,
): string {
  const parts = [`${count} new filing(s)`];
  if (criticalCount > 0) parts.push(`${criticalCount} CRITICAL`);
  if (importantCount > 0) parts.push(`${importantCount} IMPORTANT`);
  return `SEC Scanner: ${ticker} — ${parts.join(', ')}`;
}
