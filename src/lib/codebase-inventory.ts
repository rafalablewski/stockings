// ============================================================================
// CODEBASE INVENTORY — Dynamic inventory builder for prompt injection
// ============================================================================
// Builds a plain-text inventory of the codebase's features at runtime by
// importing from the same source-of-truth modules that the app itself uses.
// This output is injected into the Prompt Auditor's {{CODEBASE_INVENTORY}}
// placeholder so the auditor always sees the current state of the platform.
//
// Edge-runtime compatible — no fs, no child_process, imports only.
// ============================================================================

import { tabRegistry } from '@/data/tab-registry';
import { workflows } from '@/data/workflows';
import { engineers } from './engineers';

// ── Database tables ─────────────────────────────────────────────────────────
// Extracted from schema.ts pgTable() calls. When a new table is added to
// schema.ts, add it here too. (These are string constants because importing
// drizzle table objects would pull in the full ORM on Edge.)
const DB_TABLES = [
  'analysis_cache', 'sec_filings', 'filing_cross_refs', 'timeline_events',
  'catalysts', 'partner_news', 'seen_filings', 'seen_articles', 'audit_checks',
  'press_releases', 'notes', 'agent_runs', 'engineer_schedules', 'room_messages',
] as const;

// ── Pages / routes ──────────────────────────────────────────────────────────
// Directory-structure features that can't be scanned on Edge. When a new page
// or API route is added, add it here. This list is verified by the Prompt
// Auditor against the actual prompt references.
const PAGES = [
  { path: '/', purpose: 'Home — research universe overview' },
  { path: '/research', purpose: 'Research listing' },
  { path: '/research/[ticker]', purpose: 'Per-ticker deep-dive (hosts all stock tabs)' },
  { path: '/engineers', purpose: 'Engineers dashboard — agent control center' },
  { path: '/engineers/agents', purpose: 'Agent network graph' },
  { path: '/engineers/prompts', purpose: 'Prompt database browser' },
  { path: '/engineers/room', purpose: 'Multi-AI division chat' },
  { path: '/press-intelligence', purpose: 'Unified press feed (news + filings + PRs)' },
  { path: '/sec-intelligence', purpose: 'SEC filing intelligence' },
  { path: '/audit/comprehensive-code-audit', purpose: '35-category code audit runner' },
  { path: '/docs', purpose: 'Platform documentation' },
  { path: '/docs/firecrawl', purpose: 'Firecrawl integration docs' },
  { path: '/db-setup', purpose: 'Database setup / seed utility' },
  { path: '/hooks', purpose: 'Agent hook configuration viewer' },
] as const;

const API_ROUTES = [
  { path: '/api/analysis-cache', purpose: 'Analysis cache CRUD' },
  { path: '/api/asts-story', purpose: 'ASTS narrative generation' },
  { path: '/api/audit-checks', purpose: 'Audit check read/write' },
  { path: '/api/auth/verify-pin', purpose: 'PIN authentication' },
  { path: '/api/check-analyzed', purpose: 'Check if content is already analysed' },
  { path: '/api/competitor-feed/[company]', purpose: 'Competitor news feed' },
  { path: '/api/db/setup', purpose: 'Database setup / migration' },
  { path: '/api/edgar/[ticker]', purpose: 'EDGAR filing fetch per ticker' },
  { path: '/api/edgar/analyze', purpose: 'EDGAR filing analysis' },
  { path: '/api/edgar/refresh-local', purpose: 'Refresh local EDGAR cache' },
  { path: '/api/engineers/history', purpose: 'Engineer run history' },
  { path: '/api/engineers/run', purpose: 'Manual engineer trigger' },
  { path: '/api/engineers/schedule', purpose: 'Engineer schedule CRUD' },
  { path: '/api/engineers/status', purpose: 'Engineer status query' },
  { path: '/api/news/[symbol]', purpose: 'News feed per symbol' },
  { path: '/api/notes', purpose: 'Notes CRUD' },
  { path: '/api/notes/generate', purpose: 'AI note generation' },
  { path: '/api/press-releases/[symbol]', purpose: 'Press releases per symbol' },
  { path: '/api/research/init', purpose: 'Research data initialization' },
  { path: '/api/room', purpose: 'Room chat messages' },
  { path: '/api/room/gemini-bridge', purpose: 'Gemini AI response bridge' },
  { path: '/api/sec-intelligence', purpose: 'SEC intelligence feed' },
  { path: '/api/seen-articles', purpose: 'Article dedup tracking' },
  { path: '/api/seen-filings', purpose: 'Filing dedup tracking' },
  { path: '/api/sources/analyze', purpose: 'Multi-source analysis' },
  { path: '/api/stock/[symbol]', purpose: 'Stock data endpoint' },
  { path: '/api/workflow/apply', purpose: 'Workflow result application' },
  { path: '/api/workflow/commit', purpose: 'Workflow result commit' },
  { path: '/api/workflow/run', purpose: 'Workflow execution engine' },
] as const;

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

  // 2. Pages
  lines.push(`2. PAGES (${PAGES.length} pages)`);
  for (const p of PAGES) {
    lines.push(`   ${p.path.padEnd(40)} ${p.purpose}`);
  }
  lines.push('');

  // 3. API routes
  lines.push(`3. API ROUTES (${API_ROUTES.length} endpoints)`);
  for (const r of API_ROUTES) {
    lines.push(`   ${r.path.padEnd(40)} ${r.purpose}`);
  }
  lines.push('');

  // 4. Database tables
  lines.push(`4. DATABASE TABLES (${DB_TABLES.length} tables in src/lib/schema.ts)`);
  lines.push(`   ${DB_TABLES.join(', ')}`);
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
