import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * POST /api/edgar/refresh-local
 *
 * Reads sec-filings.ts from disk (bypassing bundler cache) to get the
 * latest local filings and cross-refs after AI Agent patches are applied.
 *
 * This MUST read from disk (not import()) because import() returns
 * build-time bundled data that is never refreshed.
 *
 * Body: { ticker: string }
 * Returns: { localFilings: LocalFiling[], crossRefIndex: Record<string, ...> }
 */

const DATA_DIR = path.resolve(process.cwd(), 'src', 'data');
const TICKER_PATTERN = /^[a-z]{2,10}$/;

interface LocalFiling {
  date: string;
  type: string;
  description: string;
  period: string;
  color?: string;
  accessionNumber?: string;
}

/**
 * Extract the SEC_FILINGS array from TypeScript source.
 * Parses object literals within the exported array.
 */
function extractFilingsFromSource(content: string): LocalFiling[] {
  const filings: LocalFiling[] = [];

  // Find the _SEC_FILINGS array
  const arrayMatch = content.match(/_SEC_FILINGS\s*=\s*\[([\s\S]*?)\];/);
  if (!arrayMatch) return filings;

  const arrayContent = arrayMatch[1];

  // Match each object literal { ... }
  const objRegex = /\{([^}]+)\}/g;
  let match;
  while ((match = objRegex.exec(arrayContent)) !== null) {
    const objStr = match[1];
    const filing: Partial<LocalFiling> = {};

    // Extract string fields: date, type, description, period, color, accessionNumber
    const fieldRegex = /(\w+)\s*:\s*(['"`])((?:\\.|(?!\2).)*)\2/g;
    let fieldMatch;
    while ((fieldMatch = fieldRegex.exec(objStr)) !== null) {
      const key = fieldMatch[1];
      const value = fieldMatch[3].replace(/\\'/g, "'").replace(/\\"/g, '"');
      if (key === 'date') filing.date = value;
      else if (key === 'type') filing.type = value;
      else if (key === 'description') filing.description = value;
      else if (key === 'period') filing.period = value;
      else if (key === 'color') filing.color = value;
      else if (key === 'accessionNumber') filing.accessionNumber = value;
    }

    if (filing.date && filing.type && filing.description && filing.period) {
      filings.push(filing as LocalFiling);
    }
  }

  return filings;
}

/**
 * Extract the FILING_CROSS_REFS record from TypeScript source.
 * Parses the key-value pairs of the exported object.
 */
function extractCrossRefsFromSource(content: string): Record<string, { source: string; data: string }[]> {
  const crossRefs: Record<string, { source: string; data: string }[]> = {};

  // Find the _FILING_CROSS_REFS object
  const objStart = content.indexOf('_FILING_CROSS_REFS');
  if (objStart === -1) return crossRefs;

  // Slice from the start of the object to end of file
  const objContent = content.slice(objStart);

  // Match each key and its array of { source, data } entries
  // Keys look like: '8-K|2026-02-11': [ or '0001780312-26-000002': [
  const keyRegex = /['"`]([^'"`]+)['"`]\s*:\s*\[/g;
  let keyMatch;
  while ((keyMatch = keyRegex.exec(objContent)) !== null) {
    const key = keyMatch[1];
    const arrayStart = keyMatch.index + keyMatch[0].length;

    // Find the closing ] for this array
    let depth = 1;
    let i = arrayStart;
    while (i < objContent.length && depth > 0) {
      if (objContent[i] === '[') depth++;
      else if (objContent[i] === ']') depth--;
      i++;
    }
    const arrayStr = objContent.slice(arrayStart, i - 1);

    // Extract { source, data } entries from the array
    const entries: { source: string; data: string }[] = [];
    const entryRegex = /\{[^}]*source\s*:\s*(['"`])((?:\\.|(?!\1).)*)\1[^}]*data\s*:\s*(['"`])((?:\\.|(?!\3).)*)\3[^}]*\}/g;
    let entryMatch;
    while ((entryMatch = entryRegex.exec(arrayStr)) !== null) {
      entries.push({
        source: entryMatch[2].replace(/\\'/g, "'").replace(/\\"/g, '"'),
        data: entryMatch[4].replace(/\\'/g, "'").replace(/\\"/g, '"'),
      });
    }

    if (entries.length > 0) {
      crossRefs[key] = entries;
    }
  }

  return crossRefs;
}

export async function POST(request: NextRequest) {
  try {
    const { ticker } = await request.json();
    if (!ticker || !TICKER_PATTERN.test(ticker.toLowerCase())) {
      return NextResponse.json({ error: 'Invalid ticker' }, { status: 400 });
    }

    const tickerLower = ticker.toLowerCase();
    const filePath = path.resolve(DATA_DIR, tickerLower, 'sec-filings.ts');

    // Safety: prevent path traversal
    if (!filePath.startsWith(DATA_DIR + path.sep)) {
      return NextResponse.json({ error: 'Path traversal blocked' }, { status: 400 });
    }

    const content = await fs.readFile(filePath, 'utf-8');
    const localFilings = extractFilingsFromSource(content);
    const crossRefIndex = extractCrossRefsFromSource(content);

    return NextResponse.json({ localFilings, crossRefIndex });
  } catch (error) {
    console.error('[refresh-local] Error:', error);
    return NextResponse.json({ error: 'Failed to read local data' }, { status: 500 });
  }
}
