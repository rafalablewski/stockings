/**
 * Schema Registry & Rendering Utilities
 * ================================================
 *
 * Central access point for per-ticker schemas and filing templates.
 * Used by /api/workflow/apply to inject schema context into the
 * patch-extraction AI prompt.
 */

import type { FileSchema } from './asts';
import { ASTS_SCHEMAS } from './asts';
import { BMNR_SCHEMAS } from './bmnr';
import { FILING_TEMPLATES } from './filing-templates';
import type { FilingTemplate } from './filing-templates';

// ── Registry ────────────────────────────────────────────────────────

const SCHEMA_REGISTRY: Record<string, Record<string, FileSchema>> = {
  asts: ASTS_SCHEMAS,
  bmnr: BMNR_SCHEMAS,
};

export function getSchemaForTicker(ticker: string): Record<string, FileSchema> | null {
  return SCHEMA_REGISTRY[ticker.toLowerCase()] ?? null;
}

export function getFilingTemplate(filingType: string): FilingTemplate | null {
  // Normalize: "SC 13G/A" → "SC 13G", "10-Q/A" → "10-Q", "S-3ASR" → "S-3"
  let normalized = filingType.replace(/\/A$/, '');
  if (normalized === 'S-3ASR') normalized = 'S-3';
  if (normalized === 'DEFA14A' || normalized === 'DEFR14A') normalized = 'DEF 14A';
  return FILING_TEMPLATES[normalized] ?? null;
}

// ── Rendering ───────────────────────────────────────────────────────

/**
 * Render schemas for target files into a compact AI-consumable string.
 * Only includes schemas for files that exist in the ticker's data dir.
 */
export function renderSchemaContext(ticker: string, availableFiles: string[]): string {
  const schemas = getSchemaForTicker(ticker);
  if (!schemas) return '';

  const sections: string[] = [];
  const tickerLower = ticker.toLowerCase();

  for (const filePath of availableFiles) {
    const rel = filePath.startsWith(tickerLower + '/') ? filePath : `${tickerLower}/${filePath}`;
    const schema = schemas[rel];
    if (!schema) continue;

    const fields = schema.entryFields
      .map(f => `  ${f.name}: ${f.type}${f.required ? '' : ' (optional)'}${f.format ? ` — ${f.format}` : ''}`)
      .join('\n');

    let section = `=== ${rel} ===
Export: ${schema.exportName} (${schema.ordering})
Fields:
${fields}`;

    if (schema.exampleEntry) {
      section += `\nExample entry:\n${schema.exampleEntry}`;
    }

    if (schema.notes.length > 0) {
      section += '\nRules:\n' + schema.notes.map(n => `  - ${n}`).join('\n');
    }

    section += `\nInsert anchor: "${schema.insertAnchor}"`;
    sections.push(section);
  }

  return sections.join('\n\n');
}

/**
 * Render a filing template for a specific ticker into AI-consumable string.
 */
export function renderFilingTemplateContext(ticker: string, filingType: string | null): string {
  if (!filingType) return '';

  const template = getFilingTemplate(filingType);
  if (!template) return '';

  const tickerLower = ticker.toLowerCase();
  const tickerData = template.perTicker[tickerLower];
  if (!tickerData) return '';

  return `=== ${filingType} Filing Template for ${ticker.toUpperCase()} ===
Description: ${template.description}
Typically updates: ${template.typicalTargetFiles.join(', ')}

sec-filings.ts entry format:
  ${tickerData.secFilingEntry}

FILING_CROSS_REFS entry format:
  ${tickerData.crossRefEntry}

Target file notes:
  ${tickerData.targetFileNotes}`;
}
