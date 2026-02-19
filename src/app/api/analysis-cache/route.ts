import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * GET /api/analysis-cache?ticker=ASTS
 *
 * Returns all persisted AI analyses for a ticker.
 * Response: { edgar: { [accession]: { text, ts } }, sources: { [articleKey]: { text, ts } } }
 *
 * POST /api/analysis-cache
 *
 * Persists (or removes) a single AI analysis result.
 * Body: { ticker, type: 'edgar'|'sources', key: string, text: string | null }
 *   - text: analysis text to store, or null to delete
 */

interface AnalysisEntry { text: string; ts: number; }
interface AnalysisCacheFile {
  edgar: Record<string, AnalysisEntry>;
  sources: Record<string, AnalysisEntry>;
}

const VALID_TICKERS = new Set(['asts', 'bmnr', 'crcl']);

function resolveCachePath(ticker: string): { valid: boolean; fullPath: string; detail?: string } {
  const t = ticker.toLowerCase();
  if (!VALID_TICKERS.has(t)) {
    return { valid: false, fullPath: '', detail: `Unknown ticker: ${ticker}` };
  }
  const dataDir = path.resolve(process.cwd(), 'src', 'data', t);
  const fullPath = path.join(dataDir, 'analysis-cache.json');
  // Path traversal guard
  if (!fullPath.startsWith(path.resolve(process.cwd(), 'src', 'data'))) {
    return { valid: false, fullPath: '', detail: 'Path traversal blocked' };
  }
  return { valid: true, fullPath };
}

async function readCache(fullPath: string): Promise<AnalysisCacheFile> {
  try {
    const raw = await fs.readFile(fullPath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return { edgar: {}, sources: {} };
  }
}

async function writeCache(fullPath: string, data: AnalysisCacheFile): Promise<void> {
  const tmpPath = fullPath + '.tmp.' + Date.now();
  await fs.writeFile(tmpPath, JSON.stringify(data, null, 2), 'utf-8');
  await fs.rename(tmpPath, fullPath);
}

export async function GET(request: NextRequest) {
  const ticker = request.nextUrl.searchParams.get('ticker');
  if (!ticker) {
    return NextResponse.json({ error: 'Missing ticker' }, { status: 400 });
  }

  const resolved = resolveCachePath(ticker);
  if (!resolved.valid) {
    return NextResponse.json({ error: resolved.detail }, { status: 400 });
  }

  const cache = await readCache(resolved.fullPath);
  return NextResponse.json(cache);
}

export async function POST(request: NextRequest) {
  try {
    const { ticker, type, key, text } = await request.json();

    if (!ticker || !type || !key) {
      return NextResponse.json({ error: 'Missing required fields (ticker, type, key)' }, { status: 400 });
    }
    if (type !== 'edgar' && type !== 'sources') {
      return NextResponse.json({ error: 'type must be "edgar" or "sources"' }, { status: 400 });
    }

    const resolved = resolveCachePath(ticker);
    if (!resolved.valid) {
      return NextResponse.json({ error: resolved.detail }, { status: 400 });
    }

    const cache = await readCache(resolved.fullPath);

    if (text === null || text === undefined) {
      // Delete entry
      delete cache[type][key];
    } else {
      // Store entry
      cache[type][key] = { text, ts: Date.now() };
    }

    await writeCache(resolved.fullPath, cache);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Analysis cache write error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
