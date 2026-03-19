# 50 Rules for Implementing Stocks

Rules for adding new stocks, maintaining existing ones, and evolving the stock analysis platform. Based on patterns (good and bad) observed in ASTS, BMNR, CRCL implementations.

---

## Registry & Scaffolding (Rules 1-8)

**1. Every stock must exist in exactly four registries.**
`src/lib/stocks.ts` (StockMeta), `src/data/stock-context.ts` (StockContext), `src/data/tab-registry.ts` (TabConfig[]), and `src/data/{ticker}/index.ts` (barrel exports). If any registry is missing, features silently break.

**2. The stock registry (`stocks.ts`) is the single source of truth for "does this stock exist?"**
API routes validate tickers against `VALID_TICKERS`. Intelligence pages read from `INTELLIGENCE_TICKERS`. Research pages check `hasResearch`. Never hardcode ticker lists anywhere else.

**3. Use `Initiate Research` for scaffolding, then fill in manually.**
The `/api/research/init` route creates 13 data files + barrel index. Don't hand-create data directories. The scaffolding ensures consistent file structure across all stocks.

**4. Set `hasResearch: true` only when the stock has both data files AND a working analysis component.**
`GenericResearch.tsx` renders for stocks without full coverage. Don't flip this flag until the stock actually works end-to-end.

**5. Every new stock must have a `StockContext` entry with at minimum: ticker, companyName, exchange, sector, description, specialistDomain.**
Empty `keyInsiders`, `competitors`, `stockSpecificMetrics`, and `domainSections` arrays are acceptable initially. Starter contexts are created via `createStarterContext()`.

**6. New stocks get `defaultTabs` from the tab registry.**
Stock-specific tabs (Partners, Ethereum, USDC, Staking, etc.) are added to `tab-registry.ts` only when the custom analysis component is built. Never add specialty tabs to `defaultTabs`.

**7. When adding a stock to intelligence coverage, add its ticker to `INTELLIGENCE_TICKERS` once.**
Both Press Intelligence and SEC Intelligence pages import this single list. Never maintain separate ticker lists per intelligence feature.

**8. CIK mapping (`src/lib/cik-map.ts`) must be updated for any stock that needs EDGAR/SEC integration.**
The EDGAR tab and SEC Intelligence features look up CIK codes here. Missing CIK = no SEC filing data.

---

## Data Files & Barrel Exports (Rules 9-18)

**9. The barrel export rule is absolute: every export in `src/data/{ticker}/*.ts` MUST appear in that ticker's `index.ts`.**
Exports not in the barrel are invisible to the UI. This is the #1 cause of "data exists but doesn't show" bugs. Run `bash scripts/check-barrel-exports.sh` after ANY data file change.

**10. Never add a data file without updating the barrel.**
When creating a new `.ts` file in a ticker's data directory, immediately add a corresponding import/export block to `index.ts`. This is not a "cleanup later" task.

**11. Data file structure must be identical across all stocks.**
Every stock gets: `company.ts`, `catalysts.ts`, `investment.ts`, `timeline.ts`, `capital.ts`, `financials.ts`, `sec-filings.ts`, `historical.ts`, `press-releases.ts`, `quarterly-metrics.ts`, `analyst-coverage.ts`, `competitor-news.ts`. Stock-specific files (e.g., `partners.ts` for ASTS, `purchase-history.ts` for BMNR) are additions on top, never replacements.

**12. Every data file must include a `DataMetadata` constant as its first export.**
Format: `{ lastUpdated: 'YYYY-MM-DD', source: '...', nextExpectedUpdate: '...', notes?: '...' }`. This drives the data freshness badges in the UI.

**13. Use shared types from `src/data/shared/types.ts` for all data structures.**
Never define one-off interfaces in individual data files. If a new type is needed, add it to `shared/types.ts` first. Types like `Partner`, `Catalyst`, `TimelineEntry`, `SECFiling`, `InsiderTransaction` are already defined there.

**14. Stock-specific types that are truly unique to one stock go in `shared/types.ts` with a clear name.**
Example: `EthereumAdoptionEntry` is BMNR-specific but still lives in shared types. The naming makes the scope obvious.

**15. All data arrays must be typed with the shared interface.**
`const UPCOMING_CATALYSTS: Catalyst[] = [...]`, not `const UPCOMING_CATALYSTS = [...]`. Explicit typing catches schema drift at compile time.

**16. Date strings in data files use ISO format: `YYYY-MM-DD`.**
Never `MM/DD/YYYY`, never `March 15, 2026`. ISO format enables sorting, comparison, and consistent display formatting in the UI.

**17. Monetary values in data files are always in millions USD.**
`cashOnHand: 2780` means $2,780M. Document this in the constant's JSDoc. Never mix millions/billions/raw-dollars within a stock's data.

**18. Data freshness comments at the top of each file must include: last updated date, source document, and next expected update.**
AI agents read these comments to know when data is stale. Format:
```
* LAST UPDATED: 2026-03-04
* NEXT UPDATE: After Q1 2026 10-Q (~May 2026)
```

---

## No Hardcoding (Rules 19-28)

**19. Never hardcode ticker symbols in component logic.**
Components receive `ticker` as a prop and look up everything from registries. A conditional like `if (ticker === 'ASTS') { ... }` is a code smell — use the StockContext instead.

**20. Never hardcode company names, exchanges, or sectors in components.**
Read from `StockContext.companyName`, `StockContext.exchange`, `StockContext.sector`. The component should work identically if the company changes its name.

**21. Never hardcode tab lists in stock components.**
Import from `tabRegistry[ticker]`. Stock-specific tabs are defined once in `tab-registry.ts`, not scattered across component files.

**22. Never hardcode insider names in components or prompts.**
Read from `StockContext.keyInsiders`. When a new CFO is appointed, update one place (stock-context.ts), and all prompts + UI automatically reflect the change.

**23. Never hardcode competitor lists in components or prompts.**
Read from `StockContext.competitors`. The comps tab, workflow prompts, and analysis all pull from the same source.

**24. Never hardcode stock-specific metrics in prompts.**
Read from `StockContext.stockSpecificMetrics`. The metrics a workflow should track are defined per stock in the context registry, not baked into prompt strings.

**25. Workflow prompts use `{{PLACEHOLDER}}` templates, never per-ticker variants.**
One prompt template per workflow. The placeholder resolver fills in `{{COMPANY_NAME}}`, `{{TICKER}}`, `{{EXCHANGE}}`, `{{KEY_INSIDERS}}`, `{{COMPETITORS}}`, `{{STOCK_SPECIFIC_METRICS}}`, etc. at runtime from StockContext.

**26. Never hardcode filing type colors or filter options per stock.**
Define them once in shared config. If ASTS and BMNR both need a teal badge for 8-K filings, that mapping lives in one place.

**27. Never hardcode price targets, share counts, or financial figures in component JSX.**
These belong in data files (`company.ts`, `capital.ts`, `financials.ts`). Components read from imported data. Hardcoded numbers become stale and cause discrepancies.

**28. Magic numbers in model calculations must be named constants.**
`RISK_FREE_RATE = 0.04`, `RSI_DEFAULT_PERIOD = 14`, `MIN_SPREAD_FOR_GORDON_GROWTH = 0.005`. If a number appears in a formula, it needs a name and a comment explaining its source.

---

## Shared Components (Rules 29-38)

**29. Every standard tab has a shared component. Use it.**
`SharedModelTab`, `SharedMonteCarloTab`, `SharedCompsTab`, `SharedCapitalTab`, `SharedFinancialsTab`, `SharedTimelineTab`, `SharedInvestmentTab`, `SharedWallStreetTab`, `SharedSourcesTab`, `SharedEdgarTab`, `SharedAIAgentsTab`. Never rebuild these per stock.

**30. Shared tab components accept stock data via props, not internal fetch.**
The pattern is: stock component imports data from `@/data/{ticker}`, transforms it to the shared component's prop shape, and passes it down. The shared component is pure presentation + interaction.

**31. Stock-specific tabs (Partners, Ethereum, USDC, Staking) are the ONLY place for custom per-stock UI.**
If analysis applies to multiple stocks, extract it into a shared component. Stock-specific tabs are for genuinely unique business model analysis.

**32. The `StockHeader` component is shared across all stocks.**
It renders ticker, company name, exchange, live price, and data freshness. It takes props — never embed stock-specific logic in it.

**33. `StockChart` is shared. `LivePrice` is shared. `StockNavigation` is shared.**
These building blocks accept ticker as a prop and handle everything internally. Don't reinvent price display or chart rendering per stock.

**34. When a pattern repeats across 2+ stock-specific tabs, extract it into `src/components/shared/`.**
If both ASTS's Partners tab and BMNR's Ethereum tab need a "news feed with sentiment badges" pattern, that's a shared component waiting to be born.

**35. Shared component props must use interfaces from `src/components/shared/*Types.ts`.**
`modelTypes.ts`, `capitalTypes.ts`, `financialsTabTypes.ts`, `investmentTypes.ts`, `compsTypes.ts`, `wallStreetTypes.ts`, `timelineTypes.ts`, `monteCarloTypes.ts`. Don't define ad-hoc prop types inline.

**36. The `FinancialModelErrorBoundary` wraps every stock analysis component.**
Don't let one stock's rendering error crash the entire research page. Each stock component must have error boundary protection.

**37. Use `UpdateIndicators` for data freshness display across all stocks.**
Don't build custom "last updated" displays. The shared component handles the consistent display pattern.

**38. The `DisclaimerBanner` component appears on every research page.**
It's imported from shared, not duplicated per stock. Regulatory disclaimers are identical across all stocks.

---

## Press Release & Filing Ingestion (Rules 39-44)

**39. The Press Release Ingestion Checklist is mandatory for every stock update.**
When processing a PR or SEC filing, you MUST update all locations listed in the checklist at the top of `src/data/shared/types.ts`. Search for `[PR_CHECKLIST_*]` markers. Missing any location is a data bug.

**40. Press releases are added newest-first (reverse chronological).**
In both `press-releases.ts` arrays and component `pressReleases[]` arrays. The UI displays them in order.

**41. New press releases default to `tracked: false`.**
The `tracked` field on `PressRelease` is advisory only — the UI reads tracked status from the database via `/api/check-analyzed`. Only set `true` after confirming database integration.

**42. Every SEC filing must have a cross-reference entry.**
When adding a filing to `sec-filings.ts`, also add a `FilingCrossRef` entry linking it to the data files it impacts (capital, financials, timeline, etc.).

**43. Timeline entries are append-only. Never edit or delete historical timeline entries.**
History is immutable. If an event's interpretation changes, add a new entry with the updated analysis. The original entry stays as-is.

**44. When a catalyst completes, move it from `UPCOMING_CATALYSTS` to `COMPLETED_MILESTONES`.**
Don't delete completed catalysts. The milestone record provides historical context and demonstrates thesis tracking accuracy.

---

## Component Architecture (Rules 45-50)

**45. Stock components must not exceed 500 lines.**
The current ASTS.tsx (6,390 lines), BMNR.tsx (6,956 lines), and CRCL.tsx (5,338 lines) are the anti-pattern. Break them into: data preparation layer, tab dispatcher, and individual tab wrappers. Each under 300 lines.

**46. Stock components are thin orchestrators, not monoliths.**
The stock component's job: import data, import shared tab components, map data to props, render the active tab. Business logic lives in lib/. Display logic lives in shared components. Stock-specific analysis lives in dedicated tab components.

**47. Stock-specific state (active tab, expanded sections, editor state) uses URL searchParams, not useState.**
Tab selection, filter states, and expanded sections should be bookmarkable and shareable. Use `useSearchParams` or `useHashTab` — not component-local state.

**48. Every stock component must implement the unified maintenance protocol.**
The protocol header (present in ASTS.tsx) defines the update process: review new info, update core sections, archive previous version. This protocol is identical across all stocks and must be followed for every data update.

**49. The Analysis Archive in each stock is append-only and complete.**
Every update produces a new dated archive entry with the full prior state (scorecard, summary, drivers, risks). Never delete, overwrite, or summarize away existing archive entries. This is the audit trail.

**50. When improving one stock's component or data structure, apply the same improvement to all stocks.**
The three stocks (ASTS, BMNR, CRCL) must remain structurally unified. Any addition, fix, or enhancement to one must eventually be reflected in the others. Divergence between stock implementations creates maintenance debt that compounds exponentially.

---

## TL;DR Priority Order

If you only follow 10 of these, follow: **9** (barrel exports), **19** (no hardcoded tickers), **25** (template prompts), **29** (use shared components), **1** (four registries), **11** (identical file structure), **39** (PR ingestion checklist), **45** (500 line cap), **13** (shared types), **43** (timeline is append-only).
