// ============================================================================
// WORKFLOW DATA SOURCES — Extracts what data each workflow/engineer imports
// ============================================================================
// Parses workflow promptTemplates for {{PLACEHOLDER}} tokens, maps them to
// the data files they resolve from, and combines with engineer-level metadata
// (requiresData, dataSource, chainsTo) to build a full "data import" picture
// for each pipeline step.
// ============================================================================

import { workflows, type Workflow } from '@/data/workflows';
import { engineers, type EngineerTask } from '@/lib/engineers';

// ── Placeholder → data file mapping ─────────────────────────────────────────

/** Maps a prompt placeholder to its source description and data file path. */
interface PlaceholderSource {
  placeholder: string;
  label: string;
  file: string;
}

const PLACEHOLDER_SOURCES: PlaceholderSource[] = [
  { placeholder: 'TICKER',               label: 'Ticker symbol',            file: 'stock-context.ts' },
  { placeholder: 'COMPANY_NAME',          label: 'Company name',             file: 'stock-context.ts' },
  { placeholder: 'EXCHANGE',              label: 'Exchange listing',         file: 'stock-context.ts' },
  { placeholder: 'SECTOR',               label: 'Sector classification',    file: 'stock-context.ts' },
  { placeholder: 'DESCRIPTION',          label: 'Company description',      file: 'stock-context.ts' },
  { placeholder: 'SPECIALIST_DOMAIN',    label: 'Analyst specialization',   file: 'stock-context.ts' },
  { placeholder: 'SHARE_STRUCTURE',      label: 'Share structure notes',    file: 'stock-context.ts' },
  { placeholder: 'FISCAL_YEAR_END',      label: 'Fiscal year end',          file: 'stock-context.ts' },
  { placeholder: 'CEO_NAME',             label: 'CEO name',                 file: 'stock-context.ts' },
  { placeholder: 'KEY_INSIDERS',         label: 'Key insiders list',        file: 'stock-context.ts' },
  { placeholder: 'COMPETITORS',          label: 'Competitor list',          file: 'stock-context.ts' },
  { placeholder: 'STOCK_SPECIFIC_METRICS', label: 'Stock-specific metrics', file: 'stock-context.ts' },
  { placeholder: 'DOMAIN_SECTIONS',      label: 'Domain analysis sections', file: 'stock-context.ts' },
  { placeholder: 'TICKER_TABS',          label: 'Research tabs',            file: 'tab-registry.ts' },
  { placeholder: 'TICKER_TAB_DEEP_DIVE', label: 'Per-tab analysis guidance', file: 'tab-registry.ts + workflow tabGuidance' },
  { placeholder: 'CODEBASE_INVENTORY',   label: 'Platform inventory',       file: 'codebase-inventory.ts' },
  { placeholder: 'LATEST_AUDIT_OUTPUT',  label: 'Upstream audit output',    file: 'chain-injected (runtime)' },
];

// ── Database context sections (always injected by getDatabaseContext) ────────

interface DbContextSection {
  id: string;
  label: string;
  file: string;
}

const DB_CONTEXT_SECTIONS: DbContextSection[] = [
  { id: 'DEFAULTS',            label: 'Market data & defaults',     file: 'company.ts' },
  { id: 'OPERATIONAL_METRICS', label: 'Operational metrics',         file: 'company.ts' },
  { id: 'ETH_HOLDINGS',       label: 'ETH holdings',               file: 'company.ts' },
  { id: 'INVESTMENT_CURRENT',  label: 'Investment scorecard & thesis', file: 'investment.ts' },
  { id: 'QUARTERLY_DATA',     label: 'Quarterly financials',        file: 'financials.ts' },
  { id: 'SHARE_CLASSES',      label: 'Capital structure',           file: 'capital.ts' },
  { id: 'PARTNERS',           label: 'MNO partners',               file: 'partners.ts' },
  { id: 'UPCOMING_CATALYSTS', label: 'Upcoming catalysts',          file: 'catalysts.ts' },
  { id: 'DATA_FRESHNESS',     label: 'Data freshness metadata',     file: 'various' },
];

// ── Public types ─────────────────────────────────────────────────────────────

export interface WorkflowDataSource {
  /** Prompt placeholders used by this workflow */
  placeholders: PlaceholderSource[];
  /** Database context sections injected at runtime */
  dbSections: DbContextSection[];
  /** Whether the workflow requires user-pasted data */
  requiresUserData: boolean;
  /** External data source (from engineer metadata) */
  externalSource?: string;
  /** Upstream chain context (e.g. from prompt-auditor → prompt-remediation) */
  chainInput?: string;
}

// ── Extraction logic ────────────────────────────────────────────────────────

/** Extract placeholders used in a prompt template. */
function extractPlaceholders(promptTemplate: string): PlaceholderSource[] {
  const found = new Set<string>();
  const regex = /\{\{([A-Z_]+)\}\}/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(promptTemplate)) !== null) {
    found.add(match[1]);
  }
  return PLACEHOLDER_SOURCES.filter(p => found.has(p.placeholder));
}

/** Get data sources for a single workflow. */
function getWorkflowDataSources(workflow: Workflow): Pick<WorkflowDataSource, 'placeholders' | 'requiresUserData' | 'chainInput'> {
  const promptText = workflow.promptTemplate ?? workflow.variants?.[0]?.prompt ?? '';
  const placeholders = extractPlaceholders(promptText);

  // Detect chain input
  const hasChainInput = promptText.includes('{{LATEST_AUDIT_OUTPUT}}');

  return {
    placeholders,
    requiresUserData: workflow.requiresUserData,
    chainInput: hasChainInput ? 'Latest audit output from upstream engineer' : undefined,
  };
}

/**
 * Get the full data source picture for an engineer step.
 * Merges workflow-level data (placeholders, user data) with engineer-level
 * metadata (external source, chain context).
 */
export function getEngineerDataSources(engineerId: string, workflowIds?: string[]): WorkflowDataSource {
  const engineer = engineers.find(e => e.id === engineerId);
  const wfIds = workflowIds ?? engineer?.workflowIds ?? [];

  // Merge placeholders across all workflows for this engineer
  const allPlaceholders = new Map<string, PlaceholderSource>();
  let requiresUserData = false;
  let chainInput: string | undefined;

  for (const wfId of wfIds) {
    const wf = workflows.find(w => w.id === wfId);
    if (!wf) continue;
    const sources = getWorkflowDataSources(wf);
    for (const p of sources.placeholders) {
      allPlaceholders.set(p.placeholder, p);
    }
    if (sources.requiresUserData) requiresUserData = true;
    if (sources.chainInput) chainInput = sources.chainInput;
  }

  return {
    placeholders: Array.from(allPlaceholders.values()),
    dbSections: DB_CONTEXT_SECTIONS,   // always injected for all engineers
    requiresUserData,
    externalSource: engineer?.dataSource,
    chainInput,
  };
}

/**
 * Group placeholders by their source file for cleaner display.
 * Returns groups like: "stock-context.ts" → [Ticker, Company Name, ...]
 */
export function groupPlaceholdersByFile(placeholders: PlaceholderSource[]): Record<string, PlaceholderSource[]> {
  const groups: Record<string, PlaceholderSource[]> = {};
  for (const p of placeholders) {
    const key = p.file;
    if (!groups[key]) groups[key] = [];
    groups[key].push(p);
  }
  return groups;
}
