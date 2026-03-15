# Plan: Dynamic Prompt Template Architecture

## Problem

27 workflows × N tickers = hardcoded prompt explosion. Adding a stock means
manually writing 25+ variants. Adding a tab means updating 50+ prompt strings.
Nothing flows through automatically.

Current state:
- 52 hardcoded variants across 27 workflows (only ASTS + BMNR, not even CRCL)
- ~70% of prompt text is duplicated between ticker pairs
- 50+ hardcoded tab names, 27+ company identities, insider names, competitor lists
- "Initiate Research" creates data files but NO workflow variants, NO tab entries
- workflows.ts is 4,800 lines and growing linearly per ticker

## Architecture

### 1. Stock Context Registry (`src/data/stock-context.ts`)

Single source of truth for everything a prompt needs about a stock.
Initiate Research creates an entry here automatically.

```ts
export interface StockContext {
  ticker: string;
  companyName: string;
  exchange: string;               // "NASDAQ" | "NYSE American" | ...
  sector: string;
  description: string;
  specialistDomain: string;       // "satellite-enabled D2D cellular broadband"
  keyInsiders: { name: string; title: string; notes: string }[];
  competitors: { name: string; ticker?: string; relevance: string }[];
  stockSpecificMetrics: string[]; // ["Launch cadence", "MNO pipeline", ...]
}
```

ASTS, BMNR, CRCL get pre-populated entries. New stocks from Initiate Research
get a starter entry with basic info from the form.

### 2. Templatized Workflow Prompts

Instead of per-ticker variants, each workflow has ONE prompt template.

**Before (N variants per workflow):**
```ts
variants: [
  { label: 'ASTS', ticker: 'asts', prompt: '...AST SpaceMobile (NASDAQ: ASTS)...' },
  { label: 'BMNR', ticker: 'bmnr', prompt: '...Bitmine (NYSE American: BMNR)...' },
]
```

**After (1 template, resolves for any ticker at runtime):**
```ts
promptTemplate: `You are a senior equity research analyst covering
{{COMPANY_NAME}} ({{EXCHANGE}}: {{TICKER}}). You specialize in {{SPECIALIST_DOMAIN}}.

Current research tabs for {{TICKER}}: {{TICKER_TABS}}
Key insiders: {{KEY_INSIDERS}}
Competitive landscape: {{COMPETITORS}}
Stock-specific metrics to track: {{STOCK_SPECIFIC_METRICS}}

...shared analytical framework (identical across all tickers)...`
```

The ticker is passed at runtime. The template resolves to a fully concrete
prompt identical in quality to today's handwritten ones.

### 3. Placeholder Resolution Pipeline

Extend `resolvePromptPlaceholders(prompt, ticker)`:

```
Template string
  → resolve {{TICKER}}, {{COMPANY_NAME}}, {{EXCHANGE}}, etc. from StockContext
  → resolve {{TICKER_TABS}} from TabRegistry
  → resolve {{CODEBASE_INVENTORY}} from CodebaseInventory (prompt-audit only)
  → Fully resolved prompt sent to Claude API
```

Supported placeholders:
| Placeholder | Source | Example output |
|---|---|---|
| `{{TICKER}}` | StockContext | `ASTS` |
| `{{COMPANY_NAME}}` | StockContext | `AST SpaceMobile` |
| `{{EXCHANGE}}` | StockContext | `NASDAQ` |
| `{{SECTOR}}` | StockContext | `Space Technology` |
| `{{SPECIALIST_DOMAIN}}` | StockContext | `satellite-enabled D2D cellular broadband` |
| `{{TICKER_TABS}}` | TabRegistry | `Overview, Partners, Catalysts, ...` |
| `{{KEY_INSIDERS}}` | StockContext | `- Abel Avellan (Founder/CEO) — holds ~78.2M Class C shares` |
| `{{COMPETITORS}}` | StockContext | `- Starlink D2C (SpaceX) — primary competitor\n- Lynk Global ...` |
| `{{STOCK_SPECIFIC_METRICS}}` | StockContext | `Launch cadence, MNO pipeline, Spectrum positions` |
| `{{CODEBASE_INVENTORY}}` | CodebaseInventory | Full platform inventory (prompt-audit only) |

### 4. Updated Initiate Research Flow

When user clicks "Initiate New Research":

```
Step 1: Create 13 data files in src/data/{ticker}/     ← already works
Step 2: Register stock in stocks.ts                     ← already works
Step 3: Add default tabs to tab-registry.ts             ← NEW
Step 4: Add stock context entry to stock-context.ts     ← NEW
Step 5: All 25 workflows instantly available             ← automatic via templates
```

Default tabs for new stocks:
```ts
Overview, Model, Monte Carlo, Comps, Capital, Financials,
Timeline, Investment, Wall Street, Sources, EDGAR
```

Stock-specific tabs (Partners, Ethereum, USDC, etc.) are added manually later
when the custom analysis component is built.

### 5. File Changes

| File | Change | Est. lines |
|------|--------|-----------|
| `src/data/stock-context.ts` | **NEW** — per-ticker metadata registry | ~200 |
| `src/data/tab-registry.ts` | Add `defaultTabs` export + helper for Initiate Research | ~20 |
| `src/data/workflows.ts` | **REWRITE** — 52 variants → 27 templates | -2300 |
| `src/lib/prompt-placeholders.ts` | Extend with ticker-aware resolution | ~60 |
| `src/lib/codebase-inventory.ts` | Import from stock-context | ~10 |
| `src/app/api/research/init/route.ts` | Add tab-registry + stock-context entries | ~40 |
| `src/lib/engineer-engine.ts` | Pass ticker to resolvePromptPlaceholders | ~5 |
| `src/app/api/workflow/run/route.ts` | Pass ticker to resolvePromptPlaceholders | ~5 |

### 6. Implementation Phases

**Phase A — Foundation (stock-context + placeholder pipeline):**
1. Create `src/data/stock-context.ts` with ASTS, BMNR, CRCL entries
2. Extend `resolvePromptPlaceholders(prompt, ticker)` with all tokens
3. Wire ticker parameter through both run routes
4. Verify: run existing hardcoded prompts → same output

**Phase B — Templatize Workflows (the big rewrite):**
1. For each workflow, extract the shared framework (the ~70% that's identical)
2. Move ticker-specific details (insiders, competitors, metrics) to stock-context
3. Replace 52 hardcoded variants with 27 templates using {{PLACEHOLDERS}}
4. Verify: resolved templates match original prompt quality

**Phase C — Auto-scaffold on Initiate Research:**
1. Update `/api/research/init` to add tab-registry entry with default tabs
2. Update `/api/research/init` to add stock-context entry from form data
3. New stocks get all 25 workflows instantly (template resolves for any ticker)
4. GenericResearch component reads tabs from registry

### 7. Post-Refactor Prompt Auditor Role

The Prompt Auditor's job shifts from drift detection to context completeness:
- "Is the stock-context registry complete and accurate for each ticker?"
- "Do the templates reference all registry fields?"
- "Are there stock-specific nuances not yet captured in the context?"
- "Does the tab registry match what stock components actually render?"
