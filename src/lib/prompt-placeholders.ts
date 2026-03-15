// ============================================================================
// PROMPT PLACEHOLDERS — Resolves {{PLACEHOLDER}} tokens in workflow prompts
// ============================================================================
// Before a prompt is sent to the Claude API, this module replaces placeholder
// tokens with runtime-generated content.
//
// Supported placeholders:
//   {{TICKER}}                — Stock ticker symbol
//   {{COMPANY_NAME}}          — Full company name
//   {{EXCHANGE}}              — Exchange listing (NASDAQ, NYSE, etc.)
//   {{SECTOR}}                — Sector classification
//   {{DESCRIPTION}}           — Company description
//   {{SPECIALIST_DOMAIN}}     — Analyst specialization text
//   {{SHARE_STRUCTURE}}       — Share structure notes
//   {{FISCAL_YEAR_END}}       — Fiscal year end date
//   {{KEY_INSIDERS}}          — Formatted insider list
//   {{COMPETITORS}}           — Formatted competitor list
//   {{STOCK_SPECIFIC_METRICS}} — Formatted metrics list
//   {{TICKER_TABS}}           — Current research tabs for the ticker
//   {{CODEBASE_INVENTORY}}    — Full platform inventory (prompt-audit only)
// ============================================================================

import { buildCodebaseInventory } from './codebase-inventory';
import { getStockContext } from '@/data/stock-context';
import { tabRegistry } from '@/data/tab-registry';

/**
 * Replace all known {{PLACEHOLDER}} tokens in a prompt string.
 *
 * @param prompt  The raw prompt text (may contain {{PLACEHOLDERS}})
 * @param ticker  Optional ticker for stock-specific resolution.
 *                If omitted, stock-specific placeholders are left as-is.
 */
export function resolvePromptPlaceholders(prompt: string, ticker?: string): string {
  if (!prompt.includes('{{')) return prompt;

  // ── Stock-specific placeholders ──────────────────────────────────────────
  if (ticker) {
    const ctx = getStockContext(ticker);
    if (ctx) {
      prompt = prompt
        .replace(/\{\{TICKER\}\}/g, ctx.ticker)
        .replace(/\{\{COMPANY_NAME\}\}/g, ctx.companyName)
        .replace(/\{\{EXCHANGE\}\}/g, ctx.exchange)
        .replace(/\{\{SECTOR\}\}/g, ctx.sector)
        .replace(/\{\{DESCRIPTION\}\}/g, ctx.description)
        .replace(/\{\{SPECIALIST_DOMAIN\}\}/g, ctx.specialistDomain)
        .replace(/\{\{SHARE_STRUCTURE\}\}/g, ctx.shareStructureNotes || 'No share structure notes available.')
        .replace(/\{\{FISCAL_YEAR_END\}\}/g, ctx.fiscalYearEnd || 'December 31');

      // Key insiders — formatted as bullet list
      if (prompt.includes('{{KEY_INSIDERS}}')) {
        const insiderText = ctx.keyInsiders.length > 0
          ? ctx.keyInsiders.map(i => `- ${i.name} (${i.title}) — ${i.notes}`).join('\n')
          : 'No key insiders tracked yet.';
        prompt = prompt.replace(/\{\{KEY_INSIDERS\}\}/g, insiderText);
      }

      // Competitors — formatted as bullet list
      if (prompt.includes('{{COMPETITORS}}')) {
        const compText = ctx.competitors.length > 0
          ? ctx.competitors.map(c => {
            const tickerStr = c.ticker ? ` (${c.ticker})` : '';
            return `- ${c.name}${tickerStr} — ${c.relevance}`;
          }).join('\n')
          : 'No competitors tracked yet.';
        prompt = prompt.replace(/\{\{COMPETITORS\}\}/g, compText);
      }

      // Stock-specific metrics — formatted as bullet list
      if (prompt.includes('{{STOCK_SPECIFIC_METRICS}}')) {
        const metricsText = ctx.stockSpecificMetrics.length > 0
          ? ctx.stockSpecificMetrics.map(m => `- ${m}`).join('\n')
          : 'No stock-specific metrics defined yet.';
        prompt = prompt.replace(/\{\{STOCK_SPECIFIC_METRICS\}\}/g, metricsText);
      }
    }

    // Ticker tabs — from tab registry (independent of stock context)
    if (prompt.includes('{{TICKER_TABS}}')) {
      const tabs = tabRegistry[ticker.toUpperCase()];
      const tabText = tabs
        ? tabs.map(t => t.label).join(', ')
        : 'Overview, Model, Monte Carlo, Comps, Capital, Financials, Timeline, Investment, Wall Street, Sources, EDGAR';
      prompt = prompt.replace(/\{\{TICKER_TABS\}\}/g, tabText);
    }
  }

  // ── Platform-wide placeholders ───────────────────────────────────────────
  if (prompt.includes('{{CODEBASE_INVENTORY}}')) {
    prompt = prompt.replace('{{CODEBASE_INVENTORY}}', buildCodebaseInventory());
  }

  return prompt;
}
