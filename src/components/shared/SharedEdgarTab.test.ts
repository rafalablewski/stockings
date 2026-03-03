/**
 * Tests for the merge helpers in SharedEdgarTab.tsx.
 *
 * The merge functions (mergeLocalFilings, mergeCrossRefs) are private to the
 * component, so we duplicate their logic here for unit testing. The helper
 * functions (normalizeDate, normalizeAccession) are also inlined since they
 * are small, pure functions.
 */
import { describe, it, expect } from 'vitest';

// ── Inlined helpers (mirrors SharedEdgarTab.tsx) ────────────────────────────

function normalizeDate(dateStr: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  const rangeMatch = dateStr.match(/^(\w+ \d+)-\d+, (\d{4})$/);
  if (rangeMatch) {
    const d = new Date(`${rangeMatch[1]}, ${rangeMatch[2]}`);
    if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  }
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  return dateStr;
}

const normalizeAccession = (a: string) => a.replace(/-/g, '');

// ── Types (subset of SharedEdgarTab) ────────────────────────────────────────

interface LocalFiling {
  date: string;
  type: string;
  description: string;
  period: string;
  color?: string;
  accessionNumber?: string;
}

// ── Functions under test (exact copy from SharedEdgarTab.tsx) ────────────────

function mergeLocalFilings(
  propsFilings: LocalFiling[],
  dbFilings: LocalFiling[],
): LocalFiling[] {
  const propsKeys = new Set<string>();
  const propsAccessions = new Set<string>();
  for (const f of propsFilings) {
    propsKeys.add(`${f.type}|${normalizeDate(f.date)}|${f.period}`);
    if (f.accessionNumber) propsAccessions.add(normalizeAccession(f.accessionNumber));
  }

  const dbOnly: LocalFiling[] = [];
  for (const dbf of dbFilings) {
    const key = `${dbf.type}|${normalizeDate(dbf.date)}|${dbf.period}`;
    const accNorm = dbf.accessionNumber ? normalizeAccession(dbf.accessionNumber) : '';
    if (!propsKeys.has(key) && !(accNorm && propsAccessions.has(accNorm))) {
      dbOnly.push(dbf);
    }
  }

  return dbOnly.length > 0 ? [...propsFilings, ...dbOnly] : propsFilings;
}

function mergeCrossRefs(
  propsRefs: Record<string, { source: string; data: string }[]> | undefined,
  dbRefs: Record<string, { source: string; data: string }[]>,
): Record<string, { source: string; data: string }[]> {
  if (!propsRefs) return dbRefs;
  const merged = { ...propsRefs };
  for (const [key, entries] of Object.entries(dbRefs)) {
    if (!merged[key]) merged[key] = entries;
  }
  return merged;
}

// ── Tests ────────────────────────────────────────────────────────────────────

describe('mergeLocalFilings', () => {
  const tenK: LocalFiling = {
    date: 'Mar 3, 2025', type: '10-K', description: 'Annual Report', period: 'FY 2024', color: 'blue',
  };
  const eightK: LocalFiling = {
    date: 'Feb 27, 2025', type: '8-K', description: 'Q4 Earnings', period: '—', color: 'yellow',
  };

  it('props filing survives when DB returns stale subset (the core bug fix)', () => {
    // Simulate the bug scenario: user added 10-K to static files but DB is stale (missing it)
    const propsFilings = [tenK, eightK];
    const dbFilings = [eightK]; // DB only has 8-K, missing the 10-K

    const result = mergeLocalFilings(propsFilings, dbFilings);

    // The 10-K from props must survive — this is the exact bug that was fixed
    expect(result).toHaveLength(2);
    expect(result.find(f => f.type === '10-K')).toEqual(tenK);
    expect(result.find(f => f.type === '8-K')).toEqual(eightK);
  });

  it('DB-only entries (AI agent runtime patches) are appended to props', () => {
    const aiAgentFiling: LocalFiling = {
      date: 'Mar 10, 2026', type: '8-K', description: 'AI discovered filing', period: '—',
    };
    const propsFilings = [tenK];
    const dbFilings = [tenK, aiAgentFiling]; // DB has an extra entry from AI agent

    const result = mergeLocalFilings(propsFilings, dbFilings);

    // Props entry + DB-only entry
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual(tenK); // props first
    expect(result[1]).toEqual(aiAgentFiling); // DB-only appended
  });
});

describe('mergeCrossRefs', () => {
  it('props cross-refs are preserved when DB returns stale data', () => {
    const propsRefs = {
      '10-K|2025-03-03': [{ source: 'financials', data: 'FY 2024 revenue $4.4M' }],
      '8-K|2025-02-27': [{ source: 'timeline', data: 'Q4 earnings' }],
    };
    // DB is stale — only has the 8-K cross-ref, missing 10-K
    const dbRefs = {
      '8-K|2025-02-27': [{ source: 'timeline', data: 'Q4 earnings' }],
    };

    const result = mergeCrossRefs(propsRefs, dbRefs);

    // Both keys must be present — the 10-K cross-ref from props must survive
    expect(Object.keys(result)).toHaveLength(2);
    expect(result['10-K|2025-03-03']).toEqual([{ source: 'financials', data: 'FY 2024 revenue $4.4M' }]);
    expect(result['8-K|2025-02-27']).toEqual([{ source: 'timeline', data: 'Q4 earnings' }]);
  });

  it('DB-only cross-ref keys (AI agent patches) are added alongside props', () => {
    const propsRefs = {
      '10-K|2025-03-03': [{ source: 'financials', data: 'FY 2024 revenue $4.4M' }],
    };
    const dbRefs = {
      '10-K|2025-03-03': [{ source: 'financials', data: 'FY 2024 revenue $4.4M' }],
      '8-K|2026-03-10': [{ source: 'catalysts', data: 'AI agent discovered event' }],
    };

    const result = mergeCrossRefs(propsRefs, dbRefs);

    // Props key preserved + DB-only key appended
    expect(Object.keys(result)).toHaveLength(2);
    expect(result['10-K|2025-03-03']).toEqual([{ source: 'financials', data: 'FY 2024 revenue $4.4M' }]);
    expect(result['8-K|2026-03-10']).toEqual([{ source: 'catalysts', data: 'AI agent discovered event' }]);
  });
});
