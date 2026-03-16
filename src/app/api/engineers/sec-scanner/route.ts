import { NextRequest, NextResponse } from 'next/server';
import { checkAiGate } from '@/lib/ai-gate';
import { scanForNewFilings } from '@/lib/sec-scanner';
import { z } from 'zod';

const ScanBody = z.object({
  tickers: z.array(z.string().min(1)).optional(),
  limit: z.number().int().min(1).max(200).optional(),
}).optional();

/**
 * POST /api/engineers/sec-scanner
 *
 * Autonomous SEC EDGAR filing scanner. Scans all research stocks (or specified
 * tickers) for new filings, AI-analyzes each one, and creates PM decision
 * items for Gemini approval.
 *
 * Body (optional):
 *   - tickers: string[]  — filter to specific tickers (default: all researchStocks)
 *   - limit: number      — max filings per ticker from SEC (default: 25)
 *
 * Returns: { tickersScanned, totalNewFilings, decisionsCreated, tickerResults, errors }
 */
export async function POST(request: NextRequest) {
  const gateError = checkAiGate(request);
  if (gateError) return gateError;

  try {
    const rawBody = await request.text();
    const body = rawBody ? ScanBody.parse(JSON.parse(rawBody)) : undefined;

    const result = await scanForNewFilings(body?.tickers, body?.limit);

    return NextResponse.json(result);
  } catch (error) {
    console.error('[sec-scanner] Route error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 },
    );
  }
}
