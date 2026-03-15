// ============================================================================
// CODEBASE INVENTORY — Dynamic inventory builder for prompt injection
// ============================================================================
// Builds a plain-text inventory of the codebase's features at runtime by
// importing from the same source-of-truth modules that the app itself uses.
// This output is injected into the Prompt Auditor's {{CODEBASE_INVENTORY}}
// placeholder so the auditor always sees the current state of the platform.
//
// Edge-runtime compatible — no fs, no child_process, imports only.
// Pages, API routes, and DB tables are auto-scanned at build time by
// scripts/scan-routes.ts → src/data/generated/route-inventory.json
// ============================================================================

import { tabRegistry } from '@/data/tab-registry';
import { workflows } from '@/data/workflows';
import { engineers } from './engineers';
import routeInventory from '@/data/generated/route-inventory.json';

// ============================================================================
// buildCodebaseInventory()
// ============================================================================

export function buildCodebaseInventory(): string {
  const lines: string[] = [];

  // 1. Research tabs (dynamic from tab-registry)
  lines.push('1. RESEARCH TABS (per-ticker, from src/data/tab-registry.ts)');
  for (const [ticker, tabs] of Object.entries(tabRegistry)) {
    const tabLabels = tabs.map(t => t.label).join(', ');
    lines.push(`   ${ticker} (${tabs.length} tabs): ${tabLabels}`);
  }
  lines.push('');

  // 2. Pages (auto-scanned at build time)
  lines.push(`2. PAGES (${routeInventory.pages.length} pages, auto-scanned)`);
  for (const p of routeInventory.pages) {
    lines.push(`   ${p}`);
  }
  lines.push('');

  // 3. API routes (auto-scanned at build time)
  lines.push(`3. API ROUTES (${routeInventory.apiRoutes.length} endpoints, auto-scanned)`);
  for (const r of routeInventory.apiRoutes) {
    lines.push(`   ${r}`);
  }
  lines.push('');

  // 4. Database tables (auto-scanned from schema.ts pgTable() calls)
  lines.push(`4. DATABASE TABLES (${routeInventory.dbTables.length} tables in src/lib/schema.ts, auto-scanned)`);
  lines.push(`   ${routeInventory.dbTables.join(', ')}`);
  lines.push('');

  // 5. Engineers (dynamic from src/lib/engineers.ts)
  const categories = ['research', 'monitoring', 'intelligence', 'audit'] as const;
  lines.push(`5. ENGINEERS (${engineers.length} engineers in src/lib/engineers.ts)`);
  for (const cat of categories) {
    const group = engineers.filter(e => e.category === cat);
    const ids = group.map(e => e.id).join(', ');
    lines.push(`   ${cat.charAt(0).toUpperCase() + cat.slice(1).padEnd(15)} ${ids}`);
  }
  lines.push('');

  // 6. Workflows (dynamic from src/data/workflows.ts)
  lines.push(`6. WORKFLOWS (${workflows.length} workflows in src/data/workflows.ts)`);
  const wfIds = workflows.map(w => w.id).join(', ');
  lines.push(`   ${wfIds}`);
  lines.push('');

  // 7. Engineer → workflow cross-reference
  lines.push('7. ENGINEER → WORKFLOW MAPPING');
  for (const eng of engineers) {
    const missing = eng.workflowIds.filter(wid => !workflows.find(w => w.id === wid));
    const missingNote = missing.length > 0 ? ` [MISSING: ${missing.join(', ')}]` : '';
    lines.push(`   ${eng.id.padEnd(25)} → ${eng.workflowIds.join(', ')}${missingNote}`);
  }

  return lines.join('\n');
}
