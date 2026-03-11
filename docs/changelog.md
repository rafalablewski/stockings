# Changelog

## 2026-03-11

- refactor: press-intelligence is now DB-first — page load reads from database only, Refresh button fetches upstream + marks NEW items + persists to DB
- fix: add ensureTable() with CREATE TABLE IF NOT EXISTS to press-intelligence API (same pattern as seen-articles)
- fix: remove all caching (backend in-memory cache + frontend cacheRef/TTL) — database is the single source of truth
- fix: batch DB inserts (20 parallel) instead of sequential loop to avoid Vercel timeout
- feat: replace subtle DB status dot with pulsing "NEW" text badge for items not yet in database
- docs: update /docs page with new press-intelligence API mode param and DB-first page description
- refactor: replace N+1 insert loop with sql.transaction() batch upsert (code review)
- fix: add LIMIT 1000 to loadFromDB to prevent unbounded result sets (code review)
- refactor: change datetime column from TEXT to TIMESTAMPTZ in ensureTable, db/setup DDL, and drizzle schema (code review)

## 2026-03-10

- feat: add BMNR Purchases tab — ETH purchase history with mNAV, price, cost basis (32 entries, Jul 2025–Feb 2026)
- feat: add purchase-history.ts data file with PurchaseRecord type and AI agent schema
- docs: add purchase-history.ts to /docs data file structure and PR ingestion checklist
- refactor: remove all inline styles from StockChart.tsx — correlation labels, metric values, volume profile bars, and guide swatches now use CSS classes
- docs: add StockChart Classes (sm-chart-*) section to /docs design page with 30 class entries

## 2026-03-09

- feat: add unified /api/press-intelligence endpoint supporting 20 tickers (ASTS, BMNR, IRDM, GSAT, VZ, VSAT, RKLB, SATS, LUNR, MSTR, MARA, RIOT, CLSK, HUT, IREN, NBIS, COIN, FRMM, T, AMZLEO, LYNK)
- feat: add /press-intelligence page with multi-ticker feed, category filters, and search
- refactor: consolidate per-ticker API files into single handler-factory pattern (TICKER_CONFIG)
- docs: update /docs with press-intelligence route, API endpoint, and asts-story route

## 2026-03-01

- feat: add View prompt / Copy prompt buttons to each hook card on /hooks
- fix: extract copy-prompt setTimeout into useEffect with cleanup (memory leak fix per review)
- refactor: move AUDIT.md from audit/ to docs/
- refactor: consolidate 4 audit files into single audit/AUDIT.md
- refactor: move audit files from docs/ to dedicated audit/ directory
- feat: add 27-point vibe-code bomb audit to CCA-1.0
- feat: integrate concept 11c Edge Markers header into all stock pages
- fix: move 52W LOW to bottom of HUD spine in 11c
- feat: add 11a/11b/11c variants to gallery below concept 11
- feat: add three right-column variants for Dashboard Fusion
- fix: center Dashboard Fusion layout on canvas
- fix: replace bottom glass cards with 02 Apple Hero Center style metrics
- feat: add concept 11 — Dashboard Fusion (04 rework)
- feat: add gallery page for browsing all 10 header concepts
- feat: add 10 SVG header concept sketches for stock page redesign

## 2026-02-28

- docs: update notes panel class descriptions
- fix: show full AI description on note cards
- fix: show AI button on notes that already have a preview
- docs: complete Notes Panel classes — 22→40 documented entries
- fix: limit AI-generated description to 50 words max
- feat: add hide/unhide support for notes
- fix: single AI button per note, AI-off status bar in notes drawer
- fix: split migration into separate neon() calls to preserve old notes
- docs: add Notes Panel collapsible preview classes and API to /docs
- feat: collapsible article preview with AI-generated title & description
- Make URLs in note content clickable links
- docs: add data-cat convention and update NotesPanel description
- refactor: remove all inline styles from NotesPanel — use data-cat + CSS
- docs: add createPortal convention for fixed overlays in backdrop-filter parents
- fix: portal MobileNav drawer to body to escape nav stacking context
- refactor: extract MobileNav inline styles to CSS classes
- fix: improve hamburger menu icon visibility on mobile
- Move all NotesPanel inline styles to CSS classes in globals.css
- Portal Notes drawer to document.body to escape MobileNav stacking context
- Fix Notes drawer z-index to layer above MobileNav drawer
- Address code review: shared DDL + error handling for Notes
- Update /docs: reflect mobile nav badge relocation
- Fix mobile nav: move badge buttons into hamburger drawer
- Update /docs with Notes feature documentation
- Add global Notes feature with slide-over drawer
- Fix DisclaimerBanner SSR flicker by defaulting to collapsed
- Update /docs: remove stale 44px references, reflect padding-based touch targets
- Fix mobile buttons: wider padding instead of tall min-height
- Clean up duplicate CSS rules and sync /docs with actual button API
- Unify remaining button inline styles in AI Agents + Edgar tabs
- Fix Sources tab button inline styles — convert to data attributes
- Fix button sizing inconsistencies across Wall Street, Edgar, and AI Agents tabs
- Update /docs with hero freshness, disclaimer, nav badge, and price-updated docs
- Fix nav badge heights, add collapsible disclaimer, redesign hero header spacing

## 2026-02-27

- Address code review: dynamic changelog count, VerdictColor type, AI Summary TODOs
- Merge docs/UI_UX_FIXES_SUMMARY.md into in-app /docs page, delete markdown file
- Move changelog to in-app /docs page, revert markdown docs file
- Unify all tabs to golden-standard Jony Ive × Tesla aesthetic
- Fix CRCL Monte Carlo parameter grids rendering 3 cols instead of 6
- Add all missing Investment Tab content to /docs page
- Remove redundant docs/DESIGN_SYSTEM.md — in-app docs page is the single source
- Update in-app docs page with Investment Tab render-prop architecture
- Unify Investment Tab: migrate ASTS/BMNR/CRCL to SharedInvestmentTab
- Visual redesign: SEC filings, events, press releases, Wall Street, Monte Carlo

## 2026-02-26

- Address code review: extract Set for Other filter, use stable keys
- Update docs page to reflect SEC Filings Timeline redesign
- Redesign SEC Filings in Timeline tab with description-first card layout
- Align BMNR Investment Tab visual structure with ASTS (stock-agnostic)
- Redesign BMNR Event Timeline to match Ecosystem Intelligence layout
- Redesign Event Timeline to match BMNR Ecosystem Intelligence layout
- Redesign ASTS Partner Ecosystem Timeline to match BMNR Ecosystem Intelligence
- Fix Ethereum tab h3-in-divider blocks and align Timeline filter styling
- data: add 11 articles — ZIPAIR Starlink, Kraken perps, ETH strawmap, Ondo/Binance, Tether/Whop, FCA sandbox, Oobit stablecoin adoption
- Update docs with new design system classes and golden-standard patterns
- Rewrite Archive, Position Sizing, SEC Filings, Quarterly Metrics, Milestones visuals
- Align BMNR + CRCL Investment/Timeline tabs to Capital golden standard
- Align Investment + Timeline tabs to Capital golden standard
- Add App Architecture section to docs; fix Design System references
- fix: widen SECFilingTypeInfo.color to string for build
- fix: type SharedTimelineTab sources as UpdateSource for build
- Unify Financials/Timeline/Investment tabs; add stock-model-styles.css and data-accent
- fix: resolve 5 major performance bottlenecks
- Turn off all Claude hooks; mark as turned off on Hooks page
- Sort utility classes by property for better maintainability
- Replace remaining inline styles with CSS utility classes per review
- Replace inline fontSize with sm-fs-13 utility class on CRCL caveats list
- Replace remaining inline styles with CSS utility classes per review feedback
- Unify button styles, filter pills, and show-more patterns across tabs
- Refactor ASTS/BMNR/CRCL: replace inline styles with CSS classes
- Continue stock component inline style refactoring + cleanup duplicates
- Apply stock-specific CSS classes to ASTS, BMNR, CRCL components
- Add stock-specific CSS class libraries and refactor components
- Refactor shared component inline styles to CSS classes

## 2026-02-25

- Refactor SharedInvestmentTab + SharedWallStreetTab: replace inline styles with CSS classes
- Add new sm-* CSS classes for inline style replacement
- Add sm-cmp-* class system for Comps tab: unified tables, peer cards, badges
- Add sm-cap-* class system for Capital tab mobile responsiveness
- Add Financials tab classes to design system documentation
- Fix Financials tab mobile responsiveness and modernize old theme elements
- Polish Investment & Timeline tabs: spacing, mobile responsiveness, button unification
- Polish Sources, Edgar & Wall Street tabs: mobile responsiveness + button unification
- Refactor inline styles to CSS utility classes across stock and shared components
- Fix JSONL line-count bug in doc-change-detector hook
- Fix Investment tab grid layouts and tooltip overflow for mobile
- Comprehensive mobile/responsive fixes and hamburger navigation
- Add doc-change-detector plugin and fix critical mobile responsive gaps
- Update docs and CSS comments for EDGAR/Sources inline style refactoring
- Refactor SharedEdgarTab and SharedSourcesTab: replace ~90 inline styles with CSS classes
- Refactor SharedSourcesTab methodology section inline styles to CSS classes
- Add design system documentation page, CSS comments, and pre-commit hook
- Refactor SharedEdgarTab and SharedSourcesTab inline styles
- Remove remaining onMouseEnter/onMouseLeave hover handlers from stock files
- Continue inline style refactoring across all model files
- Refactor StockChart.tsx: replace ~138 inline styles with CSS classes
- Refactor BMNR.tsx and CRCL.tsx: replace ~1400 inline styles with CSS classes
- Refactor ASTS.tsx: replace ~880 inline styles with CSS classes (Phase 1)
- Refactor SharedAIAgentsTab.tsx: replace ~104 inline styles with CSS classes
- Refactor SharedInvestmentTab.tsx: replace inline styles with CSS classes
- Refactor SharedWallStreetTab.tsx: replace ~128 inline styles with CSS classes
- Refactor StockModelUI inline styles to CSS utility classes

## 2026-02-24

- Remove all hashtag section labels from UI components
- Fix all 5 hooks to read tool input from stdin JSON
- Fix methodology-sync-checker: read tool input from stdin JSON
- Update methodology section to document Q1-Q4 normalization and auto-reseed
- Fix sources tab UNTRACKED status after workflow applies data
- fix: add missing methodology-sync-checker and agent-impact-detector plugins
- fix: update methodology to reflect DB button color and form aliasing changes
- fix: add PRNEWS→8-K form aliasing so press releases match tracked filings
- fix: use current filing status for DB button color and tooltip
- Address code review feedback on agent-impact-detector and hooks page
- Add methodology-sync-checker plugin
- fix: update methodology text to reflect closest-date matching
- fix: prevent local matcher from false-positive on recurring periodic PRs
- fix: replace rigid ±1 day window with closest-date matching for EDGAR filing tracking
- db: ingest Feb 20-23 BMNR items — 4.423M ETH holdings, BNP Paribas MMF tokenization
- db: ingest Feb 19-23 ASTS items — $30M SDA Europa contract, $75M greenshoe exercise, RD settlements, Q4 call date
- Add Hooks dropdown to top nav and /hooks detail page
- Add agent-impact-detector plugin
- Address code review feedback on plugin hooks
- Address PR review feedback from gemini-code-assist
- Move Line/OHLC toggle inline with time range controls
- Install code-simplifier plugin
- Install claude-md-management plugin
- Install code-review plugin from claude-plugins-official
- Strip bottom accent lines, keep only background color wash for tab type indicators
- Replace nav tab left borders with subtle bottom accent lines and background wash
- Move CRCL tabs array inside component to match ASTS/BMNR pattern
- Extract shared UI primitives, types, error boundary, and disclaimers
- Refactor stock tab navigation: extract shared component, add accessibility & UX fixes
- Fix hidden articles visible on initial DB load
- Refactor: extract mergeArticles helper to deduplicate merge logic
- Fix checkAnalyzed callback also dropping merged DB-only articles
- Fix hidden articles disappearing after Fetch PRs/News
- Remove PR/News count badges from Sources tab feed header
- Polish PIN and AI nav badges with consistent sizing and animations
- Remove redundant PIN auth from AI Agents tab
- Add full-screen 6-digit PIN unlock gate (Ive × Tesla design)
- Widen date column from 72px to 100px to prevent wrapping
- Align Sources tab article row columns with fixed widths
- Align EDGAR filing row columns with fixed widths
- Move NEW/SEEN badge in EDGAR to match Sources tab position
- Add hide/unhide feature to EDGAR tab, matching Sources tab behavior
- Fix SEEN badge not persisting across page reloads in Sources tab
- Update Sources tab methodology to document dollar-amount guard

## 2026-02-23

- Gate numbersDisagree behind hasDollarAmount to fix false UNTRACKED
- Fix localMatch false positives for dollar-amount articles
- Add load-more gate for hidden articles and fix false positive tracked detection
- Fix hidden articles being cut off by SECTION_MAX limit
- Forward Anthropic API error details to client instead of generic 502
- Apply Gemini review fixes to PinGate and update ai-gate comment
- Move AI toggle to nav bar next to PIN badge
- Improve AI-disabled feedback with styled banners and actionable message
- Add AI toggle to footer for quick enable/disable of AI features
- Make PIN feature secure by default — deny access when AUTH_PIN is not set
- Fix audit check results not persisting to database
- Add PIN status indicator to nav bar next to ABISON logo
- Fix audit checks vanishing on refresh: disable Next.js static caching on GET
- Fix audit checks not saving: eliminate early-return paths that skip DB write; harden PIN auth
- Fix audit checks not persisting to DB after DB-002
- Add PIN-based auth gate for AI-powered endpoints
- Persist audit check results to database

## 2026-02-22

- Add Check All button to audit dashboard header
- Add Status column with per-finding re-check to audit dashboard
- Address Gemini review: use AUDIT_BADGE mapping for audit badges and add optional chaining
- Fix: set requiresUserData to false for 4 research data quality audits
- Split Database Analysis section in AI Agents tab into sub-groups
- Name audit "Stockings Comprehensive Code Audit v1.0" and create unified audit registry
- Add full 35-category parity to audit findings registry (31 → 128 findings)
- Restructure nav with dropdown menus and move audit to dedicated page
- Move audit reports from repo root to /docs directory
- Add institutional-grade security audit dashboard to homepage
- Rename "fresh" to "seen" in DB tooltips for Edgar and Sources
- Simplify DB tooltip cross-refs to show only source names
- Show actual cross-refs in Edgar DB tooltip instead of just count
- Add cross-reference sources breakdown to EDGAR methodology

## 2026-02-21

- Fix 8 audit issues: timer leak, ticker sync, SECTION_MAX, mutation, timeouts
- DB tooltip: add header text, always re-fetch live data, update methodology
- DB button: hover fetches live record from database, shows rich tooltip
- Fix seen-articles: use real tagged templates for neon DDL, graceful fallback on missing table
- Fix ensureTable: use raw neon() driver for DDL instead of db.execute
- Add fallback queries for old schema + better error logging

## 2026-02-20

- Merge pull request #148 from rafalablewski/claude/fix-new-article-label-eB37s

