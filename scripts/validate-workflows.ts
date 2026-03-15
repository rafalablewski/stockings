#!/usr/bin/env npx tsx
/**
 * Dry-run validation of all workflows.
 * Zero API calls — just checks that every workflow:
 *   1. Has a valid id, name, description
 *   2. Has at least one variant
 *   3. Each variant has a non-empty prompt with valid ticker
 *   4. Prompt contains no broken placeholders (unmatched {{ }})
 *   5. Workflow resolves correctly through the engineer engine path
 *   6. Category field is valid where present
 */

import { workflows } from '../src/data/workflows';
import { engineers, getEngineer } from '../src/lib/engineers';

const VALID_TICKERS = ['asts', 'bmnr', 'crcl'];
const VALID_CATEGORIES = ['audit'] as const;

interface Issue {
  workflowId: string;
  severity: 'ERROR' | 'WARN';
  message: string;
}

const issues: Issue[] = [];
let totalVariants = 0;
let totalChecks = 0;

function check(workflowId: string, condition: boolean, severity: 'ERROR' | 'WARN', msg: string) {
  totalChecks++;
  if (!condition) {
    issues.push({ workflowId, severity, message: msg });
  }
}

console.log('═══════════════════════════════════════════════════════════');
console.log('  WORKFLOW DRY VALIDATION');
console.log('═══════════════════════════════════════════════════════════\n');

// ── 1. Validate each workflow ────────────────────────────────────────────

const seenIds = new Set<string>();

for (const wf of workflows) {
  // Basic fields
  check(wf.id, !!wf.id, 'ERROR', 'Missing workflow id');
  check(wf.id, !!wf.name, 'ERROR', 'Missing workflow name');
  check(wf.id, !!wf.description, 'ERROR', 'Missing workflow description');
  check(wf.id, wf.description.length >= 20, 'WARN', `Description too short (${wf.description.length} chars)`);

  // Duplicate ID
  check(wf.id, !seenIds.has(wf.id), 'ERROR', `Duplicate workflow id: ${wf.id}`);
  seenIds.add(wf.id);

  // Category validation
  if (wf.category !== undefined) {
    check(wf.id, VALID_CATEGORIES.includes(wf.category as typeof VALID_CATEGORIES[number]),
      'ERROR', `Invalid category: "${wf.category}"`);
  }

  // requiresUserData type
  check(wf.id, typeof wf.requiresUserData === 'boolean', 'ERROR', 'requiresUserData must be boolean');

  // Variants
  check(wf.id, Array.isArray(wf.variants), 'ERROR', 'variants must be an array');
  check(wf.id, wf.variants.length > 0, 'ERROR', 'No variants defined');

  // Check ticker coverage
  const variantTickers = wf.variants.map(v => v.ticker);
  for (const ticker of VALID_TICKERS) {
    if (!variantTickers.includes(ticker)) {
      check(wf.id, false, 'WARN', `Missing variant for ticker: ${ticker}`);
    }
  }

  for (const variant of wf.variants) {
    totalVariants++;
    const vLabel = `${wf.id}/${variant.ticker}`;

    // Variant fields
    check(vLabel, !!variant.label, 'ERROR', 'Missing variant label');
    check(vLabel, !!variant.ticker, 'ERROR', 'Missing variant ticker');
    check(vLabel, VALID_TICKERS.includes(variant.ticker), 'ERROR', `Unknown ticker: "${variant.ticker}"`);
    check(vLabel, !!variant.prompt, 'ERROR', 'Empty prompt');
    check(vLabel, variant.prompt.length >= 100, 'WARN', `Prompt suspiciously short (${variant.prompt.length} chars)`);

    // Check for broken placeholders (unmatched {{ without }})
    const brokenPlaceholders = variant.prompt.match(/\{\{(?!CURRENT_DATE\}\})[^}]*$/gm);
    check(vLabel, !brokenPlaceholders, 'WARN', `Possibly broken placeholder: ${brokenPlaceholders?.[0]}`);

    // Check {{CURRENT_DATE}} usage is well-formed
    const dateRefs = variant.prompt.match(/\{\{[^}]*\}\}/g) || [];
    for (const ref of dateRefs) {
      check(vLabel, ref === '{{CURRENT_DATE}}', 'WARN', `Unknown placeholder: ${ref}`);
    }
  }
}

// ── 2. Validate engineer -> workflow mappings ────────────────────────────

console.log('\n── Engineer → Workflow Mapping ──────────────────────────\n');

for (const eng of engineers) {
  for (const wfId of eng.workflowIds) {
    const wf = workflows.find(w => w.id === wfId);
    check(`engineer:${eng.id}`, !!wf, 'ERROR', `References missing workflow: "${wfId}"`);

    if (wf) {
      // For each ticker, check if the workflow has a variant
      for (const ticker of VALID_TICKERS) {
        const hasVariant = wf.variants.some(v => v.ticker === ticker);
        if (!hasVariant) {
          check(`engineer:${eng.id}`, false, 'WARN',
            `Workflow "${wfId}" has no variant for ticker "${ticker}" — engineer will skip this ticker`);
        }
      }
    }
  }

  // Verify the engineer can be retrieved by getEngineer
  const retrieved = getEngineer(eng.id);
  check(`engineer:${eng.id}`, !!retrieved, 'ERROR', `getEngineer("${eng.id}") returns undefined`);
  check(`engineer:${eng.id}`, retrieved?.id === eng.id, 'ERROR', `getEngineer ID mismatch`);
}

// ── 3. Check for orphaned workflows (not used by any engineer) ──────────

console.log('── Orphan Check ────────────────────────────────────────\n');

const engineerWorkflowIds = new Set(engineers.flatMap(e => e.workflowIds));
for (const wf of workflows) {
  if (!engineerWorkflowIds.has(wf.id)) {
    check(wf.id, false, 'WARN', `Orphaned workflow — not referenced by any engineer`);
  }
}

// ── 4. Simulate prompt resolution (same logic as engineer-engine) ───────

console.log('── Prompt Resolution Simulation ─────────────────────────\n');

for (const eng of engineers) {
  for (const ticker of ['asts', 'bmnr']) {
    let resolvedCount = 0;
    for (const wfId of eng.workflowIds) {
      const wf = workflows.find(w => w.id === wfId);
      if (!wf) continue;
      const variant = wf.variants.find(v => v.ticker === ticker);
      if (variant) {
        resolvedCount++;
        // Simulate the full prompt build
        const prompt = `[AUTONOMOUS AI ENGINEER MODE]\nYou are operating as the "${eng.name}" — ${eng.role}.\n${eng.description}\n\n---\n\n${variant.prompt}`;
        const resolved = prompt.replace(/\{\{CURRENT_DATE\}\}/g, '2026-03-15');

        // Verify no unresolved placeholders remain
        const remaining = resolved.match(/\{\{[^}]*\}\}/g);
        check(`resolve:${eng.id}/${ticker}/${wfId}`, !remaining, 'ERROR',
          `Unresolved placeholders after resolution: ${remaining?.join(', ')}`);

        // Verify prompt isn't empty after resolution
        check(`resolve:${eng.id}/${ticker}/${wfId}`, resolved.length > 200, 'WARN',
          `Resolved prompt suspiciously short (${resolved.length} chars)`);
      }
    }
    if (resolvedCount === 0 && ticker !== 'crcl') {
      check(`resolve:${eng.id}/${ticker}`, false, 'WARN',
        `Engineer "${eng.id}" resolves ZERO workflows for ticker "${ticker}"`);
    }
  }
}

// ── Report ───────────────────────────────────────────────────────────────

console.log('═══════════════════════════════════════════════════════════');
console.log('  RESULTS');
console.log('═══════════════════════════════════════════════════════════\n');

console.log(`Workflows:     ${workflows.length}`);
console.log(`Variants:      ${totalVariants}`);
console.log(`Engineers:      ${engineers.length}`);
console.log(`Checks run:    ${totalChecks}`);
console.log('');

const errors = issues.filter(i => i.severity === 'ERROR');
const warnings = issues.filter(i => i.severity === 'WARN');

if (errors.length > 0) {
  console.log(`\x1b[31m  ERRORS: ${errors.length}\x1b[0m`);
  for (const e of errors) {
    console.log(`  \x1b[31m✗\x1b[0m [${e.workflowId}] ${e.message}`);
  }
  console.log('');
}

if (warnings.length > 0) {
  console.log(`\x1b[33m  WARNINGS: ${warnings.length}\x1b[0m`);
  for (const w of warnings) {
    console.log(`  \x1b[33m⚠\x1b[0m [${w.workflowId}] ${w.message}`);
  }
  console.log('');
}

if (errors.length === 0 && warnings.length === 0) {
  console.log('\x1b[32m  ALL CHECKS PASSED ✓\x1b[0m\n');
}

// Per-workflow summary table
console.log('── Per-Workflow Summary ─────────────────────────────────\n');
console.log('  ID                          │ Variants │ UserData │ Category │ Engineers');
console.log('  ────────────────────────────┼──────────┼──────────┼──────────┼──────────');
for (const wf of workflows) {
  const tickers = wf.variants.map(v => v.ticker.toUpperCase()).join(',');
  const usedBy = engineers.filter(e => e.workflowIds.includes(wf.id)).map(e => e.id).join(', ') || '(orphan)';
  const cat = wf.category || '-';
  const data = wf.requiresUserData ? 'YES' : 'no';
  console.log(`  ${wf.id.padEnd(28)}│ ${tickers.padEnd(9)}│ ${data.padEnd(9)}│ ${cat.padEnd(9)}│ ${usedBy}`);
}

console.log('\n═══════════════════════════════════════════════════════════\n');

process.exit(errors.length > 0 ? 1 : 0);
