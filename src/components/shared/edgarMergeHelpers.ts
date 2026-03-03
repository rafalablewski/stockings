/**
 * Shared pure helpers for EDGAR filing merge logic.
 *
 * Extracted from SharedEdgarTab.tsx so tests can import the real
 * implementations instead of duplicating them.
 */

// ── Types ────────────────────────────────────────────────────────────────────

export interface LocalFiling {
  date: string;
  type: string;
  description: string;
  period: string;
  color?: string;
  accessionNumber?: string;
}

// ── Date helpers ─────────────────────────────────────────────────────────────

/** Convert human dates ("Mar 2, 2026", "Sep 3-15, 2025") to ISO YYYY-MM-DD. */
export function normalizeDate(dateStr: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  // Handle date ranges like "Sep 3-15, 2025" — use start date
  const rangeMatch = dateStr.match(/^(\w+ \d+)-\d+, (\d{4})$/);
  if (rangeMatch) {
    const d = new Date(`${rangeMatch[1]}, ${rangeMatch[2]}`);
    if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  }
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  return dateStr;
}

// ── Accession helpers ────────────────────────────────────────────────────────

/** Normalize accession number by stripping dashes for comparison */
export const normalizeAccession = (a: string) => a.replace(/-/g, '');

// ── Merge helpers ────────────────────────────────────────────────────────────

/**
 * Merge static props (primary) with database results (supplementary).
 * Props are the baseline truth (always up-to-date with code).
 * Database may contain additional entries added by AI agents at runtime.
 * A DB entry is "already in props" if it matches on (type + normalizedDate + period)
 * or accessionNumber.
 */
export function mergeLocalFilings(
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

/**
 * Merge static cross-ref index (primary) with database cross-refs (supplementary).
 * For each filing key, props entries take precedence. DB-only keys are added.
 */
export function mergeCrossRefs(
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
