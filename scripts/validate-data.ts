/**
 * Build-time validation script for data consistency.
 *
 * 1. Competitor news — Zod schema validation + unknown competitor/category warnings
 * 2. SEC filing consistency — cross-ref completeness, meta count, orphan detection
 *
 * Usage: npx tsx scripts/validate-data.ts
 */

import { z } from 'zod';
import { tickers } from '../src/lib/stocks';
import { competitorNewsEntrySchema } from '../src/data/shared/competitor-schema';

const arraySchema = z.array(competitorNewsEntrySchema);

// ── SEC filing consistency helpers ────────────────────────────────────────────

/** Convert human dates ("Mar 2, 2026", "Sep 3-15, 2025") to ISO YYYY-MM-DD. */
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

/** Filing types that SHOULD have cross-refs (material filings). */
const MATERIAL_TYPES = new Set(['10-K', '10-Q', '10-Q/A', '8-K', '424B5', 'FWP', 'S-3', 'S-3ASR']);

function validateSecFilings(
  ticker: string,
  filings: { date: string; type: string; description: string; period: string; color?: string }[],
  meta: { totalFilingsTracked?: number; [key: string]: unknown },
  crossRefs?: Record<string, { source: string; data: string }[]>,
) {
  let localWarnings = 0;

  // Check 1: totalFilingsTracked vs actual array length
  if (meta.totalFilingsTracked !== undefined) {
    if (meta.totalFilingsTracked !== filings.length) {
      localWarnings++;
      console.warn(`  ⚠ ${ticker}_SEC_META.totalFilingsTracked is ${meta.totalFilingsTracked} but SEC_FILINGS has ${filings.length} entries`);
    } else {
      console.log(`  ✓ totalFilingsTracked matches: ${filings.length}`);
    }
  }

  if (!crossRefs) {
    console.log(`  ✓ ${ticker}: No FILING_CROSS_REFS defined — valid (cross-refs auto-generated on ingestion)`);
    warningCount += localWarnings;
    return;
  }

  // Build set of unique filing keys (handles duplicate type+date combos)
  const filingKeys = new Map<string, string>();
  for (const f of filings) {
    const key = `${f.type}|${normalizeDate(f.date)}`;
    if (!filingKeys.has(key)) filingKeys.set(key, f.description);
  }

  // Check 2: Material filings without cross-refs
  let missingMaterial = 0;
  let missingMinor = 0;
  for (const [key, desc] of filingKeys) {
    if (!crossRefs[key]) {
      const filingType = key.split('|')[0];
      if (MATERIAL_TYPES.has(filingType)) {
        missingMaterial++;
        localWarnings++;
        console.warn(`  ⚠ Missing cross-ref for MATERIAL filing: ${key} — "${desc}"`);
      } else {
        missingMinor++;
      }
    }
  }
  if (missingMinor > 0) {
    localWarnings += missingMinor;
    console.warn(`  ⚠ ${missingMinor} minor filing(s) missing cross-refs (Form 4, SC 13G, etc.)`);
  }

  // Check 3: Orphan cross-ref keys (no matching filing)
  for (const key of Object.keys(crossRefs)) {
    if (!filingKeys.has(key)) {
      localWarnings++;
      console.warn(`  ⚠ Orphan cross-ref key (no matching filing): ${key}`);
    }
  }

  // Summary
  const crossRefCount = Object.keys(crossRefs).length;
  const matched = filingKeys.size - missingMaterial - missingMinor;
  if (localWarnings === 0) {
    console.log(`  ✓ ${ticker}: ${filings.length} filings, ${crossRefCount} cross-refs, all consistent`);
  } else {
    console.log(`  ${ticker}: ${matched}/${filingKeys.size} unique filing keys have cross-refs (${localWarnings} warning(s))`);
  }

  warningCount += localWarnings;
}

// Known competitor IDs and categories per stock (from data file headers).
// These are NOT enforced — unknown values produce warnings, not errors.
// Update these lists when new competitors or categories are added.
const KNOWN: Record<string, { competitors: readonly string[]; categories: readonly string[] }> = {
  ASTS: {
    competitors: ['starlink-tmobile', 'lynk', 'apple-globalstar', 'skylo', 'iridium', 'amazon-leo', 'echostar', 'oq-technology', 'other'],
    categories: ['Launch', 'Partnership', 'Technology', 'Regulatory', 'Financial', 'Coverage', 'Product'],
  },
  BMNR: {
    competitors: ['mstr', 'mara', 'riot', 'coin', 'clsk', 'hut8', 'ethz', 'kraken', 'other'],
    categories: ['Acquisition', 'Funding', 'Yield', 'Regulatory', 'Technology', 'Partnership', 'Financial', 'Strategy'],
  },
  CRCL: {
    competitors: ['kraken', 'tether', 'coinbase', 'paypal', 'fdusd', 'other'],
    categories: ['Partnership', 'Product', 'Regulatory', 'Technology', 'Financial', 'Strategy', 'Distribution'],
  },
};

let hasErrors = false;
let warningCount = 0;

interface Entry {
  competitor: string;
  category: string;
  headline: string;
  [key: string]: unknown;
}

function validateCompetitorNews(name: string, data: unknown[], known: { competitors: readonly string[]; categories: readonly string[] }) {
  const result = arraySchema.safeParse(data);
  if (result.success) {
    console.log(`✓ ${name}: ${data.length} entries valid`);
  } else {
    hasErrors = true;
    console.error(`✗ ${name}: validation failed`);
    for (const issue of result.error.issues) {
      console.error(`  → [${issue.path.join('.')}] ${issue.message}`);
    }
    return;
  }

  const entries = data as Entry[];
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    if (!known.competitors.includes(entry.competitor)) {
      warningCount++;
      console.warn(`  ⚠ [${i}] Unknown competitor '${entry.competitor}' — "${entry.headline}"`);
    }
    if (!known.categories.includes(entry.category)) {
      warningCount++;
      console.warn(`  ⚠ [${i}] Unknown category '${entry.category}' — "${entry.headline}"`);
    }
  }
}

// ── Dynamic module helpers ───────────────────────────────────────────────────

/** Try importing a module, return null on failure. */
async function tryImport(path: string): Promise<Record<string, unknown> | null> {
  try { return await import(path); } catch { return null; }
}

/**
 * Resolve a named export from a module.
 * Tries {TICKER}_NAME first (e.g., ASTS_SEC_FILINGS), then plain NAME (e.g., SEC_FILINGS).
 */
function resolve<T>(mod: Record<string, unknown>, ticker: string, name: string): T | undefined {
  return (mod[`${ticker}_${name}`] ?? mod[name]) as T | undefined;
}

// ── Main (async for dynamic imports) ─────────────────────────────────────────

async function main() {
  const dir = `${__dirname}/../src/data`;

  // ── 1. Competitor news ───────────────────────────────────────────────────
  console.log('Validating competitor news data...\n');

  for (const ticker of tickers) {
    const t = ticker.toLowerCase();
    // Try known competitor news file patterns
    const mod =
      await tryImport(`${dir}/${t}/competitor-news`);
    if (!mod) continue;

    const data =
      resolve<unknown[]>(mod, ticker, 'COMPS_TIMELINE') ??
      resolve<unknown[]>(mod, ticker, 'COMPETITOR_NEWS');
    if (!data) continue;

    const known = KNOWN[ticker];
    if (known) {
      validateCompetitorNews(`${ticker} competitor news`, data, known);
    } else {
      // No known-list configured — still validate schema
      const result = arraySchema.safeParse(data);
      if (result.success) {
        console.log(`✓ ${ticker} competitor news: ${data.length} entries valid (no known-list configured)`);
      } else {
        hasErrors = true;
        console.error(`✗ ${ticker} competitor news: validation failed`);
        for (const issue of result.error.issues) console.error(`  → [${issue.path.join('.')}] ${issue.message}`);
      }
    }
  }

  // ── 2. SEC filing cross-ref consistency ──────────────────────────────────
  console.log('\nValidating SEC filing consistency...\n');

  type Filing = { date: string; type: string; description: string; period: string; color?: string };
  type Meta = { totalFilingsTracked?: number; [key: string]: unknown };
  type CrossRefs = Record<string, { source: string; data: string }[]>;

  for (const ticker of tickers) {
    const t = ticker.toLowerCase();
    const mod =
      await tryImport(`${dir}/${t}/sec-filings`) ??
      await tryImport(`${dir}/${t}/financials`);

    console.log(`--- ${ticker} ---`);
    if (!mod) {
      console.log(`  ℹ No SEC filing data found (tried sec-filings.ts, financials.ts)\n`);
      continue;
    }

    const filings = resolve<Filing[]>(mod, ticker, 'SEC_FILINGS');
    const meta = resolve<Meta>(mod, ticker, 'SEC_META');
    if (!filings || !meta) {
      console.log(`  ℹ SEC_FILINGS or SEC_META export not found\n`);
      continue;
    }

    const crossRefs = resolve<CrossRefs>(mod, ticker, 'FILING_CROSS_REFS');
    validateSecFilings(ticker, filings, meta, crossRefs);
    console.log('');
  }

  // ── 3. Final summary ────────────────────────────────────────────────────
  if (hasErrors) {
    console.error('Validation FAILED — fix the errors above.');
    process.exit(1);
  } else if (warningCount > 0) {
    console.log(`All data structurally valid. ${warningCount} warning(s) detected.`);
    console.log('Review warnings above — missing cross-refs and unknown IDs should be addressed.');
  } else {
    console.log('All data validated successfully.');
  }
}

main();
