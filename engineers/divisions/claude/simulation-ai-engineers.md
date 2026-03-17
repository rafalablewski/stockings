# AI Engineer Work Simulation — Full Org Run

**Date**: 2026-03-16
**Simulated ticker**: ASTS (AST SpaceMobile)
**Simulated trigger**: Sunday daily batch + EDGAR filing detected (8-K)

This document simulates one full cycle of every AI engineer — what fires, in what order, what each produces, and where the output lands.

---

## Execution Timeline

```
T+0m    SEC Filing Engineer      polling EDGAR… new 8-K detected for ASTS
T+2m    SEC Filing Engineer      → filing parsed, emits "filing-scan-completed"
T+2m    Gemini Auto-Review       reviews Filing Engineer output (approve/reject/enhance)
T+3m    SEC DB Ingestor          chained from Filing Engineer → 7-phase deep analysis
T+5m    SEC DB Ingestor          → patches generated, routes to PM Decision Dashboard
T+5m    Insider Activity Eng.    triggered by "form-4-detected" (bundled in 8-K)
T+5m    Thesis Engineer          triggered by "filing-ingested"
T+5m    Capital Structure Eng.   triggered by "filing-ingested"
T+5m    Catalyst Tracker Eng.    triggered by "filing-ingested"
T+5m    Regulatory & IP Eng.     triggered by "filing-ingested"
T+5m    Data Quality Engineer    triggered by "filing-ingested"
T+5m    Disclosure Engineer      triggered by "filing-ingested"
T+5m    Earnings Engineer        triggered by "filing-ingested"
T+8m    Press Intelligence Eng.  scheduled poll (every 30m) — picks up ASTS press release
T+10m   Market Sentiment Eng.    scheduled poll (every 3h)
T+12m   Prompt Auditor           daily schedule fires
T+14m   Prompt Remediation Eng.  chained from Prompt Auditor completion
T+16m   Doc Reviewer             daily schedule fires
T+18m   UX/UI Engineer           chained from Doc Reviewer completion
T+22m   Code Security Engineer   daily schedule fires
T+24m   Performance Engineer     bi-daily schedule fires
T+27m   General Intelligence     on-demand (idle — waits for user query)
```

---

## 1. SEC Filing Engineer

**Division**: Gemini (Research & Data)
**Schedule**: Every 1 hour
**Trigger**: `edgar-poll`
**Data source**: EDGAR API (SEC)

### What It Does
Polls the EDGAR FULL-TEXT search API for new filings on all covered tickers. When a new filing appears, downloads the full text, runs a structured extraction pipeline, and compares it against the previous filing of the same type.

### Simulated Work

```
[filing-engineer] Run #247 for ASTS — triggered by: edgar-poll
[filing-engineer] Polling EDGAR for ASTS filings since 2026-03-15T00:00:00Z...
[filing-engineer] NEW FILING DETECTED: 8-K filed 2026-03-16 — "Current Report"
[filing-engineer] Downloading full text from EDGAR (accession: 0001820209-26-000089)...
[filing-engineer] Running SEC Filing Delta workflow...
[filing-engineer] Extracting structured data:
  - Filing type: 8-K (Current Report)
  - Items reported: Item 2.02 (Results of Operations), Item 7.01 (Regulation FD)
  - Key changes detected:
    • Revenue guidance updated: $5M–8M → $12M–18M (FY2026)
    • New commercial agreement announced with AT&T (5-year, undisclosed value)
    • BlueBird satellite constellation: 5 operational, 17 in orbit, 45 contracted
  - Risk factors: No new risk factors vs. prior 10-Q
[filing-engineer] Delta vs. prior 8-K (2026-01-28):
  + Revenue guidance raised 140% at midpoint
  + New carrier partner (AT&T) added to commercial agreements
  + Satellite count: 3 → 5 operational
[filing-engineer] Writing to database: filings table (1 row), filing_deltas table (3 rows)
[filing-engineer] Emitting events: filing-scan-completed, form-4-detected
[filing-engineer] ✅ COMPLETED — 3 material changes extracted
[filing-engineer] → Gemini auto-review: APPROVED (accurate classifications, no hallucinations)
[filing-engineer] → Chaining to SEC DB Ingestor...

[db-ingestor-engineer] Run #31 for ASTS — chained from filing-engineer (run #247)
[db-ingestor-engineer] Running sec-db-ingest workflow (7-phase analysis)...
[db-ingestor-engineer] Phase 1: Triage — 1 filing, materiality: CRITICAL (guidance revision + new contract)
[db-ingestor-engineer] Phase 2: Deep extraction — 8-K Items 2.02/7.01: revenue guidance $12M-18M, AT&T 5-year deal, constellation 5 operational
[db-ingestor-engineer] Phase 3: Cross-filing correlation — correlates with prior 8-K (2026-01-28): guidance +140% at midpoint
[db-ingestor-engineer] Phase 4: Conflict detection — no conflicts, no duplicates, 0 stale entries
[db-ingestor-engineer] Phase 5: Generating patches — 4 patches (sec-filings.ts insert + cross-ref, timeline.ts, company.ts)
[db-ingestor-engineer] Phase 6: Pre-write gate — all checks PASS
[db-ingestor-engineer] Phase 7: Summary — thesis STRENGTHENING, capital NEUTRAL, commit msg ready
[db-ingestor-engineer] Routing 4 patches to PM Decision Dashboard (Claude PM)
[db-ingestor-engineer] ✅ COMPLETED — 1 filing ingested (Critical), 4 patches generated
```

### Deliverable
| Output | Destination |
|--------|-------------|
| Parsed filing record | `filings` DB table (Filing Engineer) |
| 3 delta change records | `filing_deltas` DB table (Filing Engineer) |
| Events emitted | `filing-scan-completed`, `form-4-detected` → triggers Gemini review + DB Ingestor chain |
| 4 database patches | PM Decision Dashboard → awaits Claude PM approval |
| Thesis impact assessment | Included in patch summary (STRENGTHENING) |

---

## 2. Thesis Engineer

**Division**: Claude (Architecture & Backend)
**Schedule**: Every 6 hours
**Trigger**: `filing-ingested`, `press-release-added`, `price-alert`

### What It Does
Loads the current investment thesis from the research database, runs bull/bear/base scenario analysis against newly ingested data, detects whether conviction should change, and updates the thesis scorecard.

### Simulated Work

```
[thesis-engineer] Run #89 for ASTS — triggered by: filing-ingested
[thesis-engineer] Loading current thesis state from DB...
  Current conviction: 7.2/10 (BULLISH)
  Last updated: 2026-03-10
[thesis-engineer] Running thesis-review workflow...
[thesis-engineer] Checking thesis pillars against new 8-K data:

  PILLAR 1: Commercial Viability
  ├─ Prior: 2 carrier agreements (Vodafone, Rakuten)
  ├─ New:   3 carrier agreements (+AT&T announced in 8-K)
  ├─ Impact: STRENGTHENED — US tier-1 carrier validates technology
  └─ Score: 6.5 → 8.0 (+1.5)

  PILLAR 2: Technology Execution
  ├─ Prior: 3 operational satellites
  ├─ New:   5 operational, 17 in orbit
  ├─ Impact: STRENGTHENED — deployment pace accelerating
  └─ Score: 7.0 → 7.8 (+0.8)

  PILLAR 3: Financial Runway
  ├─ Prior: Revenue guidance $5M–8M
  ├─ New:   Revenue guidance $12M–18M (140% raise)
  ├─ Impact: STRENGTHENED — earlier path to revenue
  └─ Score: 5.5 → 7.0 (+1.5)

  PILLAR 4: Competitive Moat
  ├─ No new data in this filing
  └─ Score: 8.0 → 8.0 (unchanged)

[thesis-engineer] Thesis drift detected: POSITIVE DRIFT (+1.3 aggregate)
[thesis-engineer] New conviction score: 7.2 → 8.5/10 (STRONG BULL)
[thesis-engineer] Scenario recalculation:
  Bull case: $45/share (was $38) — raised on AT&T deal
  Base case: $28/share (was $22) — raised on revenue guidance
  Bear case: $8/share (was $7) — slight raise on operational satellites
[thesis-engineer] Writing updated thesis to DB
[thesis-engineer] ✅ COMPLETED — conviction raised to 8.5, positive drift on 3/4 pillars
```

### Deliverable
| Output | Destination |
|--------|-------------|
| Updated conviction score (7.2 → 8.5) | `thesis_scores` DB table |
| Pillar-by-pillar delta analysis | `thesis_reviews` DB table |
| Bull/base/bear scenario update | `scenario_models` DB table |
| Thesis drift flag: POSITIVE | Visible on ASTS research tab |

---

## 3. Capital Structure Engineer

**Division**: Claude (Architecture & Backend)
**Schedule**: Every 12 hours
**Trigger**: `filing-ingested`, `form-4-detected`

### What It Does
Reads the latest filing data and recalculates the dilution waterfall, share count, and NAV/share. Flags any capital events that materially change the equity structure.

### Simulated Work

```
[capital-engineer] Run #62 for ASTS — triggered by: filing-ingested
[capital-engineer] Loading current capital structure from DB...
  Shares outstanding: 318.2M (basic), 421.7M (fully diluted)
  Last updated: 2026-02-28
[capital-engineer] Running capital-structure workflow...
[capital-engineer] Parsing 8-K for capital structure changes:

  SHARE COUNT:
  ├─ Basic shares: 318.2M → 322.8M (+4.6M from warrant exercises)
  ├─ Warrants outstanding: 45.2M → 40.6M (-4.6M exercised)
  ├─ Options pool: 12.1M (unchanged)
  └─ Fully diluted: 421.7M → 421.7M (net zero — warrants → shares)

  DILUTION WATERFALL:
  ├─ Current tranche: Series B warrants at $12.50 strike
  ├─ Warrants in-the-money: 28.3M (at current price $24.50)
  ├─ Potential dilution if all ITM warrants exercise: +6.9%
  └─ Flag: Warrant exercise window closes 2026-06-30

  DEBT ANALYSIS:
  ├─ Total debt: $420M convertible notes
  ├─ Conversion price: $18.50
  ├─ Notes are in-the-money at current price
  └─ Potential additional dilution from conversion: +22.7M shares

  NAV/SHARE RECALCULATION:
  ├─ Enterprise value estimate: $8.2B (based on peer comps)
  ├─ Net debt: -$180M (cash > debt at face)
  ├─ NAV: $8.38B
  ├─ NAV/share (basic): $25.96
  └─ NAV/share (fully diluted): $19.87

[capital-engineer] Changes written:
  - share_counts table: updated basic/diluted
  - dilution_waterfall table: warrant exercise recorded
  - nav_calculations table: new NAV/share values
[capital-engineer] ⚠️ FLAG: Warrant exercise window closes in 106 days
[capital-engineer] ✅ COMPLETED — capital structure refreshed, 1 alert generated
```

### Deliverable
| Output | Destination |
|--------|-------------|
| Updated share counts (basic + diluted) | `share_counts` DB table |
| Warrant exercise event recorded | `dilution_waterfall` DB table |
| NAV/share recalculation | `nav_calculations` DB table |
| Alert: warrant window closing | Catalyst timeline, ASTS dashboard |

---

## 4. Insider Activity Engineer

**Division**: Gemini (Research & Data)
**Schedule**: Every 2 hours
**Trigger**: `form-4-detected`, `13f-filed`
**Data source**: EDGAR API (Form 4, 13F)

### What It Does
Downloads Form 4 insider transaction reports and 13F institutional holdings. Tracks patterns over time and flags unusual activity (cluster buying, large dispositions, new institutional positions).

### Simulated Work

```
[insider-engineer] Run #134 for ASTS — triggered by: form-4-detected
[insider-engineer] Fetching Form 4 filings from EDGAR since last check...
[insider-engineer] 2 new Form 4 filings detected:

  FORM 4 #1:
  ├─ Insider: Abel Avellan (CEO, Chairman)
  ├─ Transaction: Exercise + Hold
  ├─ Shares: +125,000 (option exercise at $4.25)
  ├─ Post-transaction holdings: 8,234,500 shares
  ├─ Signal: BULLISH — exercise + hold pattern, no sale
  └─ Date: 2026-03-14

  FORM 4 #2:
  ├─ Insider: Scott Wisniewski (CFO)
  ├─ Transaction: Open market purchase
  ├─ Shares: +15,000 at $23.80 ($357K)
  ├─ Post-transaction holdings: 412,000 shares
  ├─ Signal: BULLISH — CFO buying with own money ahead of 8-K
  └─ Date: 2026-03-13

[insider-engineer] Pattern analysis:
  ├─ Cluster buying detected: 2 insiders within 48h window
  ├─ Historical context: Last cluster buy was 2025-09-10 (price +35% in 30 days)
  ├─ Insider sentiment score: 8.2/10 (STRONG BUY signal)
  └─ ⚠️ FLAG: CFO bought 1 business day before material 8-K — note for compliance

[insider-engineer] 13F check: No new 13F filings this cycle
[insider-engineer] Writing: insider_transactions (2 rows), insider_signals (1 row)
[insider-engineer] ✅ COMPLETED — 2 Form 4s processed, cluster buy pattern flagged
```

### Deliverable
| Output | Destination |
|--------|-------------|
| 2 insider transaction records | `insider_transactions` DB table |
| Cluster buy signal (8.2/10) | `insider_signals` DB table |
| Compliance flag (CFO timing) | Alert visible on ASTS Insider tab |

---

## 5. Press Intelligence Engineer

**Division**: Gemini (Research & Data)
**Schedule**: Every 30 minutes
**Trigger**: `news-api-poll`
**Data source**: Press release APIs, RSS feeds

### What It Does
Fetches the latest press releases and news articles from RSS feeds and news APIs. Classifies each by category and impact, extracts competitor/partner signals, and stores them in the press intelligence database.

### Simulated Work

```
[press-engineer] Run #1,847 for ASTS — triggered by: news-api-poll
[press-engineer] Fetching from 4 news sources...
  - PR Newswire: 1 new article
  - BusinessWire: 0
  - Reuters: 2 new articles
  - SEC RSS: 0 (handled by filing engineer)
[press-engineer] Running intel-classifier workflow on 3 articles...

  ARTICLE 1: "AST SpaceMobile Announces Multi-Year Agreement with AT&T"
  ├─ Source: PR Newswire (official press release)
  ├─ Category: CORPORATE → Partnership
  ├─ Impact: HIGH — new tier-1 carrier agreement
  ├─ Sentiment: VERY POSITIVE (0.92)
  ├─ Competitor signals: Mentions T-Mobile (existing), AT&T (new), no mention of Lynk
  ├─ Key extract: "5-year agreement to provide satellite-to-cellular service"
  └─ Triggers: thesis-review, catalyst-update

  ARTICLE 2: "SpaceX Launches 17 AST SpaceMobile BlueBird Satellites"
  ├─ Source: Reuters
  ├─ Category: CORPORATE → Operations
  ├─ Impact: MEDIUM — expected launch, no surprise
  ├─ Sentiment: POSITIVE (0.78)
  ├─ Competitor signals: SpaceX mentioned as launch provider, not competitor
  └─ Key extract: "Batch of 17 BlueBird satellites reached intended orbit"

  ARTICLE 3: "Satellite-to-Phone Stocks Rally on ASTS Deal"
  ├─ Source: Reuters
  ├─ Category: MARKET → Sector Analysis
  ├─ Impact: LOW — derivative coverage, no new information
  ├─ Sentiment: POSITIVE (0.71)
  └─ Key extract: analyst quotes on addressable market size

[press-engineer] Writing: press_articles (3 rows), press_signals (2 rows)
[press-engineer] Emitting event: press-release-added
[press-engineer] ✅ COMPLETED — 3 articles classified, 2 material signals extracted
```

### Deliverable
| Output | Destination |
|--------|-------------|
| 3 classified articles | `press_articles` DB table |
| 2 material signals (AT&T deal, launch) | `press_signals` DB table |
| Event emitted | `press-release-added` → triggers Thesis, Catalyst |
| Daily intel brief data | Press Intelligence page feed |

---

## 6. Catalyst Tracker Engineer

**Division**: Claude (Architecture & Backend)
**Schedule**: Every 4 hours
**Trigger**: `filing-ingested`, `press-release-added`

### What It Does
Maintains a master calendar of upcoming catalysts. When new data arrives, updates catalyst statuses (pending → confirmed, delayed, completed) and generates proximity alerts for approaching dates.

### Simulated Work

```
[catalyst-engineer] Run #156 for ASTS — triggered by: filing-ingested
[catalyst-engineer] Loading catalyst timeline from DB (12 active catalysts)...
[catalyst-engineer] Cross-referencing new 8-K data against catalyst list...

  CATALYST UPDATE #1: AT&T Commercial Agreement
  ├─ Prior status: RUMORED (added 2026-02-20 from analyst note)
  ├─ New status: CONFIRMED ✅
  ├─ Source: 8-K filing Item 7.01
  ├─ Impact reassessment: HIGH → VERY HIGH (5-year deal confirmed)
  └─ Thesis impact: +1.2 conviction points

  CATALYST UPDATE #2: BlueBird Constellation Batch 3 Launch
  ├─ Prior status: PENDING (target Q1 2026)
  ├─ New status: COMPLETED ✅
  ├─ Source: 8-K filing, Reuters article
  ├─ Actual date: 2026-03-14 (2 days ahead of schedule)
  └─ Next milestone: Batch 4 launch (Q2 2026)

  PROXIMITY ALERTS:
  ├─ T-7:  Q4 2025 Earnings Call (2026-03-23) ← APPROACHING
  ├─ T-14: FCC spectrum allocation ruling (2026-03-30)
  └─ T-106: Warrant exercise window close (2026-06-30)

[catalyst-engineer] Running weekly-digest workflow (catalyst section)...
[catalyst-engineer] Timeline updated: 2 catalysts resolved, 10 active, 3 alerts set
[catalyst-engineer] ✅ COMPLETED — AT&T confirmed, Batch 3 marked complete, 3 proximity alerts
```

### Deliverable
| Output | Destination |
|--------|-------------|
| 2 catalyst status changes | `catalysts` DB table |
| 3 proximity alerts | `catalyst_alerts` DB table |
| Updated timeline | ASTS Catalyst tab on dashboard |

---

## 7. Market Sentiment Engineer

**Division**: Gemini (Research & Data)
**Schedule**: Every 3 hours
**Trigger**: `analyst-report-detected`, `price-alert`
**Data source**: Analyst reports, market data

### What It Does
Aggregates analyst price targets, rating changes, and social/market sentiment into a composite score. Flags divergences between sentiment and fundamental thesis.

### Simulated Work

```
[sentiment-engineer] Run #412 for ASTS — triggered by: scheduled (3h)
[sentiment-engineer] Loading analyst coverage data...
[sentiment-engineer] Scanning for new analyst activity since last run...

  ANALYST UPDATE #1:
  ├─ Firm: Barclays
  ├─ Action: Price target raised $22 → $32
  ├─ Rating: Overweight (maintained)
  ├─ Catalyst: AT&T agreement
  └─ Date: 2026-03-16

  ANALYST UPDATE #2:
  ├─ Firm: Deutsche Bank
  ├─ Action: Initiated coverage
  ├─ Rating: BUY, PT $35
  ├─ Note: "AT&T deal de-risks commercial thesis"
  └─ Date: 2026-03-16

[sentiment-engineer] Composite sentiment calculation:
  ├─ Analyst consensus: BUY (8 buy, 2 hold, 0 sell)
  ├─ Avg price target: $29.40 (was $24.10, +22%)
  ├─ Social sentiment: 0.81 (high, driven by launch + deal news)
  ├─ Price action: +12.3% on day (volume 3.2x average)
  ├─ Composite score: 8.4/10 (was 6.9)
  └─ Fundamental alignment: ALIGNED — sentiment matches thesis upgrade

[sentiment-engineer] No divergence detected (sentiment and thesis both upgraded)
[sentiment-engineer] Writing: analyst_coverage (2 rows), sentiment_scores (1 row)
[sentiment-engineer] ✅ COMPLETED — 2 analyst updates, sentiment 6.9 → 8.4, no divergence
```

### Deliverable
| Output | Destination |
|--------|-------------|
| 2 analyst coverage updates | `analyst_coverage` DB table |
| Sentiment composite score (8.4/10) | `sentiment_scores` DB table |
| Divergence check: ALIGNED | No alert (good — sentiment tracks fundamentals) |

---

## 8. Earnings Engineer

**Division**: Claude (Architecture & Backend)
**Schedule**: Every 12 hours
**Trigger**: `earnings-released`, `filing-ingested`
**Data source**: Earnings call transcripts, SEC filings

### What It Does
Processes earnings call transcripts and validates earnings data quality. Extracts guidance, management tone, Q&A intelligence, and benchmarks against peers.

### Simulated Work

```
[earnings-engineer] Run #41 for ASTS — triggered by: filing-ingested
[earnings-engineer] Checking: is this an earnings-related filing?
[earnings-engineer] 8-K Item 2.02 detected → Results of Operations → earnings-relevant
[earnings-engineer] Running earnings-quality workflow...

  FINANCIAL DATA EXTRACTION:
  ├─ Revenue: $3.2M (Q4 2025 actual, per 8-K)
  ├─ Prior quarter: $1.8M → QoQ growth: +77.8%
  ├─ Guidance: $12M–18M FY2026 (new, 140% above prior)
  ├─ Operating loss: -$42M (Q4), -$156M (FY2025)
  ├─ Cash position: $340M (sufficient for 2+ years at burn rate)
  └─ GAAP consistency: ✅ all figures align with 10-Q

  MANAGEMENT TONE (from 8-K narrative sections):
  ├─ Confidence: HIGH (strong forward-looking language)
  ├─ Key phrases: "inflection point", "commercial validation", "accelerating deployment"
  ├─ Caution signals: None detected
  └─ Tone score: 8.1/10

  PEER COMPARISON (running peer-comparables workflow):
  ├─ vs. Lynk Global: ASTS ahead on carrier agreements (3 vs 1)
  ├─ vs. Globalstar: ASTS revenue lower but growth rate 4x higher
  ├─ vs. Iridium: ASTS at earlier stage but larger addressable market
  └─ Peer rank: #1 in growth trajectory, #3 in revenue scale

[earnings-engineer] Writing: earnings_data (1 row), peer_benchmarks (3 rows)
[earnings-engineer] ✅ COMPLETED — Q4 data extracted, tone bullish, peer rank updated
```

### Deliverable
| Output | Destination |
|--------|-------------|
| Q4 2025 earnings data | `earnings_data` DB table |
| Management tone score (8.1/10) | `tone_analysis` DB table |
| 3 peer comparison records | `peer_benchmarks` DB table |
| FY2026 guidance ($12M–18M) | ASTS research tab, Earnings section |

---

## 9. Regulatory & IP Engineer

**Division**: Gemini (Research & Data)
**Schedule**: Every 6 hours
**Trigger**: `filing-ingested`, `press-release-added`, `regulatory-action`
**Data source**: Patent databases, FCC/NTIA filings, conference transcripts

### What It Does
Monitors regulatory actions (FCC, NTIA, SEC), patent filings, and conference disclosures. Extracts rulings, IP claims, and competitive implications.

### Simulated Work

```
[regulatory-engineer] Run #78 for ASTS — triggered by: filing-ingested
[regulatory-engineer] Scanning regulatory databases for ASTS-related activity...

  REGULATORY CHECK — FCC:
  ├─ No new FCC orders since last check
  ├─ Pending: Spectrum allocation docket DA-26-0134 (ruling expected 2026-03-30)
  ├─ Status: Under review, no update
  └─ Impact: PENDING — could unlock additional spectrum for D2D service

  REGULATORY CHECK — NTIA:
  ├─ No new NTIA actions
  └─ Status: CLEAR

  PATENT SEARCH:
  ├─ 1 new patent application published (PCT/US2026/011234)
  ├─ Title: "Dynamic Beamforming for Non-Terrestrial Network Handoff"
  ├─ Claims: 24 claims covering satellite-to-tower handoff protocols
  ├─ Competitive impact: DEFENSIVE — extends moat on handoff technology
  └─ Prior art risk: LOW (novel approach)

  8-K REGULATORY MENTIONS:
  ├─ AT&T agreement references FCC Part 25 compliance
  ├─ No new regulatory conditions or consent decrees
  └─ Status: CLEAN

[regulatory-engineer] Updating catalyst timeline: FCC ruling still T-14
[regulatory-engineer] Writing: regulatory_filings (1 row), patent_filings (1 row)
[regulatory-engineer] ✅ COMPLETED — 1 patent filed, FCC ruling pending, no red flags
```

### Deliverable
| Output | Destination |
|--------|-------------|
| Patent filing record | `patent_filings` DB table |
| Regulatory status (clean) | `regulatory_status` DB table |
| FCC catalyst (unchanged) | Cross-referenced with Catalyst Tracker |

---

## 10. Data Quality Engineer

**Division**: Claude (Architecture & Backend)
**Schedule**: Daily
**Trigger**: `data-updated`, `filing-ingested`

### What It Does
Runs 4 audit workflows: capital parity, cross-reference integrity, sources completeness, and data freshness. Produces a quality scorecard and flags any inconsistencies.

### Simulated Work

```
[data-quality-engineer] Run #34 for ASTS — triggered by: filing-ingested
[data-quality-engineer] Running 4 audit workflows...

  AUDIT 1: Capital Parity
  ├─ Check: shares_outstanding in thesis matches capital_structure table
  ├─ Thesis says: 318.2M basic → STALE (should be 322.8M after today's update)
  ├─ Capital table says: 322.8M basic ✅ (just updated by Capital Structure Engineer)
  ├─ Result: ⚠️ MISMATCH — thesis table lags capital table by 4.6M shares
  └─ Remediation: Auto-sync thesis.shares_outstanding from capital table

  AUDIT 2: Cross-Reference Integrity
  ├─ Check: all filing IDs in deltas reference valid filings
  ├─ 847 cross-references checked
  ├─ Result: ✅ PASS — all references valid
  └─ Orphaned records: 0

  AUDIT 3: Sources Completeness
  ├─ Check: every data point has a source citation
  ├─ Fields checked: 234
  ├─ Missing sources: 3 (insider_signals.compliance_flag — new field, no source set)
  ├─ Result: ⚠️ 3 fields missing source attribution
  └─ Remediation: Flag for manual review

  AUDIT 4: Data Freshness
  ├─ Check: no data older than staleness threshold
  ├─ Stale threshold: 30 days for financial data, 7 days for market data
  ├─ Stale records found: 0 (everything refreshed today)
  └─ Result: ✅ PASS — all data within freshness window

  SCORECARD:
  ├─ Capital parity: 98.6% (1 mismatch, auto-correctable)
  ├─ Cross-ref integrity: 100%
  ├─ Sources completeness: 98.7% (3 missing)
  ├─ Data freshness: 100%
  └─ Overall quality score: 99.3% (EXCELLENT)

[data-quality-engineer] Auto-fix applied: thesis.shares_outstanding synced
[data-quality-engineer] ✅ COMPLETED — score 99.3%, 1 auto-fix, 3 manual flags
```

### Deliverable
| Output | Destination |
|--------|-------------|
| Quality scorecard (99.3%) | `data_quality_scores` DB table |
| 1 auto-fix (share count sync) | `thesis_data` DB table updated |
| 3 manual flags | `data_quality_issues` DB table |
| Audit report | Visible on Engineers dashboard, run history |

---

## 11. Disclosure & Model Integrity Engineer

**Division**: Gemini (Research & Data)
**Schedule**: Daily
**Trigger**: `filing-ingested`, `data-updated`

### What It Does
Validates that SEC disclosures are fully captured in the database and that financial model inputs are consistent with their source documents.

### Simulated Work

```
[disclosure-engineer] Run #29 for ASTS — triggered by: filing-ingested
[disclosure-engineer] Running disclosure-completeness workflow...

  DISCLOSURE COVERAGE:
  ├─ 8-K items disclosed: 2 (Item 2.02, Item 7.01)
  ├─ Items captured in DB: 2/2 ✅
  ├─ Risk factors: 23 total in latest 10-Q
  ├─ Risk factors captured: 23/23 ✅
  ├─ Guidance statements: 4 in latest filings
  ├─ Guidance captured: 4/4 ✅ (including new FY2026 guidance)
  └─ Coverage score: 100%

[disclosure-engineer] Running model-consistency workflow...

  MODEL INPUT VALIDATION:
  ├─ Revenue model input ($12M–18M) matches 8-K guidance ✅
  ├─ Share count (322.8M) matches capital structure ✅
  ├─ Cash position ($340M) matches balance sheet ✅
  ├─ Debt ($420M converts) matches capital table ✅
  ├─ Satellite count (5 operational) matches press + filing ✅
  └─ Consistency score: 100%

  ASSUMPTION COHERENCE:
  ├─ Growth rate assumptions align with guidance range ✅
  ├─ Burn rate calculation matches operating loss trajectory ✅
  ├─ Runway estimate (2+ years) consistent with cash ÷ burn ✅
  └─ No incoherent assumptions detected

[disclosure-engineer] ✅ COMPLETED — 100% disclosure coverage, 100% model consistency
```

### Deliverable
| Output | Destination |
|--------|-------------|
| Disclosure coverage score (100%) | `disclosure_audits` DB table |
| Model consistency score (100%) | `model_audits` DB table |
| No flags this run | Clean audit — no issues |

---

## 12. Code Security Engineer

**Division**: Claude (Architecture & Backend)
**Schedule**: Daily
**Trigger**: `code-deployed`, `dependency-updated`

### What It Does
Runs 35-category code audit covering OWASP Top 10, dependency vulnerabilities, API security, and secrets detection. Outputs CVSS-scored findings.

### Simulated Work

```
[code-security-engineer] Run #21 for ASTS — triggered by: daily schedule
[code-security-engineer] Running 4 security workflows...

  WORKFLOW 1: code-audit (35-category scan)
  ├─ Files scanned: 247 (.ts, .tsx)
  ├─ Critical findings: 0
  ├─ High findings: 1
  │   └─ [HIGH] API route /api/workflow/run — missing rate limiting
  │      CVSS: 6.8 | CWE-799 | OWASP: API4:2023
  │      Remediation: Add rate limiter middleware
  ├─ Medium findings: 3
  │   ├─ [MED] /api/decisions — PATCH endpoint lacks input validation on status field
  │   ├─ [MED] /api/room — no message length limit on POST body
  │   └─ [MED] /api/engineers/run — ticker parameter not sanitized
  ├─ Low findings: 8
  └─ Info findings: 12

  WORKFLOW 2: dependency-vulnerability
  ├─ Dependencies checked: 142
  ├─ Known CVEs: 0 critical, 1 medium (postcss < 8.4.38)
  └─ Recommendation: Update postcss to 8.4.38+

  WORKFLOW 3: api-endpoint-security
  ├─ Endpoints audited: 34
  ├─ Auth coverage: 100% (PIN middleware on all routes)
  ├─ CORS: Properly restrictive ✅
  └─ Issues: Rate limiting missing on 3 endpoints

  WORKFLOW 4: secrets-exposure
  ├─ Scanned: source code + environment references
  ├─ Hardcoded secrets: 0 ✅
  ├─ .env references properly gated: ✅
  └─ Status: CLEAN

  OVERALL SECURITY SCORE: 87/100 (GOOD)
  ├─ Critical: 0
  ├─ High: 1
  ├─ Medium: 4
  └─ Action items: 5 findings need remediation

[code-security-engineer] ✅ COMPLETED — 87/100, 1 high finding (rate limiting)
```

### Deliverable
| Output | Destination |
|--------|-------------|
| 24 total findings (1H, 3M, 8L, 12I) | `audit_findings` DB table |
| Security score (87/100) | Audit dashboard |
| 1 dependency CVE | `dependency_vulns` DB table |
| Remediation plan | Audit report PDF (downloadable) |

---

## 13. Performance Engineer

**Division**: Maszka (Frontend & UI)
**Schedule**: Every 2 days
**Trigger**: `code-deployed`

### What It Does
Audits bundle size, component render efficiency, data-loading patterns, and caching strategy. Produces a weighted performance scorecard.

### Simulated Work

```
[performance-engineer] Run #14 — triggered by: bi-daily schedule
[performance-engineer] Running performance-audit workflow...

  BUNDLE ANALYSIS:
  ├─ Total bundle: 487KB (gzipped)
  ├─ Largest chunks:
  │   ├─ recharts: 142KB (29%) — chart library
  │   ├─ app code: 198KB (41%)
  │   └─ framework: 147KB (30%)
  ├─ Tree-shaking: Good — no dead imports detected
  ├─ Code splitting: 12 dynamic imports, lazy routes working
  └─ Bundle score: 7.5/10

  RENDER PERFORMANCE:
  ├─ Largest Contentful Paint (LCP): estimated ~1.8s
  ├─ Heavy components:
  │   ├─ NetworkGraph.tsx — 589 lines, SVG with 23 nodes
  │   │   Recommendation: memoize layout computation
  │   ├─ EngineersDashboard.tsx — large component tree
  │   │   Recommendation: virtualize history list
  │   └─ Press Intelligence page — many DOM nodes
  │       Recommendation: paginate article list
  ├─ Unnecessary re-renders: 2 detected (ticker dropdown, status polling)
  └─ Render score: 7.0/10

  DATA LOADING:
  ├─ API calls on page load: 3–5 per page (acceptable)
  ├─ Caching: SWR with 30s revalidation ✅
  ├─ Waterfall requests: 1 detected (engineers → statuses sequential)
  │   Recommendation: Parallel fetch with Promise.all
  └─ Data loading score: 8.0/10

  OVERALL PERFORMANCE SCORE: 7.5/10 (GOOD)
  Top 3 optimizations:
  1. Memoize NetworkGraph layout (est. -200ms on interaction)
  2. Virtualize engineer history list (est. -150ms on scroll)
  3. Parallel fetch engineers + statuses (est. -300ms on load)

[performance-engineer] ✅ COMPLETED — score 7.5/10, 3 actionable optimizations
```

### Deliverable
| Output | Destination |
|--------|-------------|
| Performance scorecard (7.5/10) | `performance_audits` DB table |
| 3 optimization recommendations | Audit report |
| Bundle analysis breakdown | Performance section on dashboard |

---

## 14. Prompt Auditor

**Division**: Bobman (PM)
**Schedule**: Daily
**Trigger**: `code-deployed`, `workflow-updated`, `engineer-config-changed`
**Chains to**: Prompt Remediation Engineer
**Notifies**: Bobman (in Room #ml channel)

### What It Does
Scans every workflow prompt template against the live codebase. Detects drift — new features not mentioned in prompts, stale references to removed code, missing coverage for new tabs/routes.

### Simulated Work

```
[prompt-auditor] Run #18 for ASTS — triggered by: daily schedule
[prompt-auditor] Running prompt-audit workflow...

  PHASE 1: Codebase Inventory
  ├─ Pages found: 14 (/, /engineers, /engineers/decisions, /press-intelligence, ...)
  ├─ API routes found: 34
  ├─ Data sources: 8 (stocks, workflows, engineers, org-hierarchy, ai-engineers, ...)
  ├─ Components: 62
  └─ Tabs per stock: 8 (Overview, Thesis, Capital, Earnings, Sources, Catalyst, EDGAR, Ask)

  PHASE 2: Prompt Inventory
  ├─ Workflow prompts scanned: 31
  ├─ Engineer descriptions scanned: 18
  ├─ Total prompt tokens scanned: ~76,000
  └─ Unique feature references: 142

  PHASE 3: Drift Detection
  ├─ CRITICAL DRIFT:
  │   └─ (none)
  │
  ├─ HIGH DRIFT:
  │   ├─ [HIGH] thesis-review prompt references "6 tabs" but ASTS now has 8 tabs
  │   │   Missing: "Catalyst" tab, "EDGAR" tab
  │   │   File: workflows.ts line 245, variant asts
  │   │
  │   └─ [HIGH] capital-structure prompt doesn't mention warrant exercise tracking
  │       Feature added 2026-03-01 but prompt unchanged
  │       File: workflows.ts line 612, variant asts
  │
  ├─ MEDIUM DRIFT:
  │   ├─ [MED] earnings-call prompt references "5 sections" but template now has 7
  │   ├─ [MED] insider-activity prompt missing reference to 13F institutional holdings
  │   └─ [MED] ask-agent prompt missing awareness of Press Intelligence page
  │
  ├─ LOW DRIFT:
  │   ├─ [LOW] 3 prompts reference old API path /api/research/run (now /api/workflow/run)
  │   └─ [LOW] 2 prompts mention "3 stock coverage" (now 15+ tickers in registry)
  │
  └─ COVERAGE SCORE: 87.3% (target: 95%)

  SUMMARY:
  ├─ Total drift findings: 9
  ├─ Critical: 0 | High: 2 | Medium: 3 | Low: 4
  ├─ Auto-remediable: 7 (via Prompt Remediation Engineer)
  └─ Requires human: 2 (structural — new workflow may be needed for Catalyst tab)

[prompt-auditor] Notifying Bobman in Room #ml...
  → "[Auto] Prompt Auditor run #18 for ASTS completed with 2 HIGH findings. Review the findings in the Decision Dashboard."
[prompt-auditor] Chaining → prompt-remediation-engineer
[prompt-auditor] ✅ COMPLETED — 9 drift findings, coverage 87.3%, chaining to remediation
```

### Deliverable
| Output | Destination |
|--------|-------------|
| 9 drift findings (2H, 3M, 4L) | Passed to Prompt Remediation Engineer via chain |
| Coverage score (87.3%) | `prompt_audit_scores` DB table |
| Room notification | Room #ml → Bobman sees the alert |
| Chain trigger | Prompt Remediation Engineer auto-starts |

---

## 15. Prompt Remediation Engineer

**Division**: Maszka (Frontend & UI)
**Schedule**: Never (chain-triggered only)
**Trigger**: `prompt-audit-completed`
**Decisions for**: Maszka (via Decision Dashboard)

### What It Does
Receives the Prompt Auditor's drift report and generates structured patch operations for each remediable finding. Produces anchor-based text patches that can be applied to workflow prompt templates.

### Simulated Work

```
[prompt-remediation-engineer] Run #18 for ASTS — chained from prompt-auditor (run #18)
[prompt-remediation-engineer] Parsing audit report: 9 findings (7 auto-remediable)
[prompt-remediation-engineer] Running prompt-remediation workflow...

  PATCH 1 (HIGH): thesis-review — add missing tab references
  ├─ Finding: prompt says "6 tabs" but should say "8 tabs"
  ├─ Anchor: "The stock has {{TAB_COUNT}} research tabs:"
  ├─ Operation: REPLACE "6 tabs: Overview, Thesis, Capital, Earnings, Sources, Ask"
  │   → "8 tabs: Overview, Thesis, Capital, Earnings, Sources, Catalyst, EDGAR, Ask"
  ├─ File: workflows.ts, variant asts, line ~245
  └─ Confidence: 95% — straightforward text replacement

  PATCH 2 (HIGH): capital-structure — add warrant tracking mention
  ├─ Finding: prompt missing warrant exercise tracking capability
  ├─ Anchor: "Analyze the capital structure including:"
  ├─ Operation: APPEND after bullet list:
  │   "- Track warrant exercise windows and dilution impact on NAV/share"
  ├─ File: workflows.ts, variant asts, line ~612
  └─ Confidence: 90%

  PATCH 3 (MED): earnings-call — update section count
  ├─ Operation: REPLACE "5 sections" → "7 sections"
  └─ Confidence: 98%

  PATCH 4 (MED): insider-activity — add 13F reference
  ├─ Operation: APPEND "- Monitor 13F institutional holdings for position changes"
  └─ Confidence: 92%

  PATCH 5 (MED): ask-agent — add Press Intelligence awareness
  ├─ Operation: APPEND to known pages list: "Press Intelligence (/press-intelligence)"
  └─ Confidence: 95%

  PATCHES 6–7 (LOW): Fix old API paths and stock count references
  ├─ Operation: REPLACE "/api/research/run" → "/api/workflow/run" (3 locations)
  ├─ Operation: REPLACE "3 stock coverage" → "15+ tickers in coverage universe"
  └─ Confidence: 99%

  SKIPPED (requires human):
  ├─ "Catalyst tab needs its own dedicated workflow" — not a prompt patch
  └─ "EDGAR tab integration needs structural prompt redesign" — beyond patch scope

  SUMMARY:
  ├─ Patches generated: 7
  ├─ Lines changed: 14
  ├─ Dry-run validation: ✅ all patches apply cleanly
  └─ Submitted to Maszka for approval via Decision Dashboard

[prompt-remediation-engineer] Creating decision item for Maszka...
  → PM Decision #42: "Prompt Remediation — 7 patches for ASTS workflows"
  → Status: pending (awaiting Maszka approval)
[prompt-remediation-engineer] ✅ COMPLETED — 7 patches generated, awaiting Maszka approval
```

### Deliverable
| Output | Destination |
|--------|-------------|
| 7 structured patch operations | Decision Dashboard (pending Maszka approval) |
| Dry-run validation results | Attached to decision item payload |
| 2 human-intervention flags | Noted in decision item for Boss review |

### Approval Chain
```
Prompt Auditor (findings) → Prompt Remediation (patches) → Maszka (approve/reject)
```

---

## 16. Documentation Engineer (Doc Reviewer)

**Division**: Bobman (PM)
**Schedule**: Daily
**Trigger**: `code-deployed`, `workflow-updated`, `data-updated`
**Chains to**: UX/UI Engineer
**Notifies**: Bobman

### What It Does
Reviews recent code changes across all divisions and identifies documentation gaps. Creates styling guidelines reports, audits style guides and theme docs for accuracy.

### Simulated Work

```
[doc-reviewer-engineer] Run #12 — triggered by: daily schedule
[doc-reviewer-engineer] Running doc-review workflow...

  SCANNING RECENT CHANGES (last 24h):
  ├─ Files modified: 14
  ├─ New components: 0
  ├─ Modified components: 3 (EngineersDashboard, NetworkGraph, org-hierarchy)
  ├─ New CSS rules: 5 (chain badge styling)
  └─ API changes: 0

  DOCUMENTATION GAPS DETECTED:

  GAP 1: New approval chain badge (data-type="chain")
  ├─ Added in: engineers.css
  ├─ Not documented in: style guide or component docs
  ├─ Severity: MEDIUM
  └─ Recommendation: Add to design token docs and badge catalog

  GAP 2: NetworkGraph dataflow edges updated
  ├─ New edge: prompt-remediation → maszka
  ├─ Not reflected in: org chart documentation
  ├─ Severity: LOW
  └─ Recommendation: Update org hierarchy documentation

  GAP 3: EngineersDashboard chain display
  ├─ New UI section: "Approval Chain" in swimlane cards
  ├─ Not documented in: component usage guide
  ├─ Severity: LOW
  └─ Recommendation: Add to EngineersDashboard API docs

  STYLE GUIDE AUDIT:
  ├─ Color tokens: All used colors have tokens ✅
  ├─ Font usage: Consistent (Outfit/DM Serif Display/Space Mono) ✅
  ├─ Spacing: Some inconsistency in swimlane card padding (12px vs 14px)
  └─ Overall: 94% compliance with style guide

[doc-reviewer-engineer] Notifying Bobman in Room #ml...
  → "[Auto] Documentation Engineer run #12 completed successfully. Review the findings in the Decision Dashboard."
[doc-reviewer-engineer] Chaining → ux-ui-engineer
[doc-reviewer-engineer] ✅ COMPLETED — 3 doc gaps found, style compliance 94%
```

### Deliverable
| Output | Destination |
|--------|-------------|
| 3 documentation gap findings | Passed to UX/UI Engineer via chain |
| Style compliance report (94%) | `doc_audits` DB table |
| Room notification | Room #ml → Bobman |

---

## 17. UX/UI Engineer

**Division**: Maszka (Frontend & UI)
**Schedule**: Never (chain-triggered only)
**Trigger**: `doc-review-completed`
**Decisions for**: Maszka (via Decision Dashboard)

### What It Does
Receives doc-review audit reports, implements proposed documentation/styling changes or creates counter-proposals, then submits to Maszka for approval.

### Simulated Work

```
[ux-ui-engineer] Run #12 — chained from doc-reviewer-engineer (run #12)
[ux-ui-engineer] Parsing audit report: 3 documentation gaps
[ux-ui-engineer] Running ux-ui-implementation workflow...

  IMPLEMENTATION 1: Badge catalog update
  ├─ Gap: Chain badge (data-type="chain") not in docs
  ├─ Action: Add to badge catalog in docs page
  ├─ Proposed change:
  │   Add entry to badge documentation:
  │   - Name: "Approval Chain"
  │   - CSS: `.eng-swim-badge[data-type="chain"]`
  │   - Color: Pink (rgba(244,114,182,0.85))
  │   - Usage: Shows approval chain flow on engineer cards
  └─ Status: Ready for review

  IMPLEMENTATION 2: Org hierarchy docs
  ├─ Gap: New dataflow edge not in docs
  ├─ Action: Update org chart documentation
  ├─ Counter-proposal: Instead of separate doc, suggest the NetworkGraph
  │   itself serves as living documentation — add tooltip to the edge
  └─ Status: Counter-proposal for Maszka review

  IMPLEMENTATION 3: Component usage guide
  ├─ Gap: Approval Chain section not in component docs
  ├─ Action: Add section to EngineersDashboard docs
  ├─ Proposed: Brief section explaining chainsTo/decisionsFor rendering
  └─ Status: Ready for review

  PADDING INCONSISTENCY:
  ├─ Finding: 12px vs 14px in swimlane cards
  ├─ Recommendation: Standardize to 12px (matches rest of dashboard)
  └─ Status: Minor fix, included in proposal

[ux-ui-engineer] Creating decision item for Maszka...
  → PM Decision #43: "UX/UI Documentation Updates — 3 changes + 1 style fix"
  → Status: pending (awaiting Maszka approval)
[ux-ui-engineer] ✅ COMPLETED — 3 doc updates + 1 style fix, awaiting Maszka approval
```

### Deliverable
| Output | Destination |
|--------|-------------|
| 3 documentation update proposals | Decision Dashboard (pending Maszka) |
| 1 counter-proposal (living docs) | Decision Dashboard |
| 1 style fix (padding) | Bundled in decision item |

### Approval Chain
```
Doc Reviewer (audit) → UX/UI Engineer (implement/propose) → Maszka (approve/reject)
```

---

## 18. General Intelligence Agent

**Division**: Claude (Architecture & Backend)
**Schedule**: On-demand only
**Trigger**: `user-query`
**Data source**: User input, research database

### What It Does
Handles freeform questions that don't fit structured workflows. Cross-references data across tabs, explains complex filings, triages ambiguous content.

### Simulated Work (user asks: "How does the AT&T deal compare to Vodafone's?")

```
[ask-agent-engineer] Run #203 for ASTS — triggered by: user-query
[ask-agent-engineer] Query: "How does the AT&T deal compare to Vodafone's?"
[ask-agent-engineer] Running ask-agent workflow...

  RESEARCH PHASE:
  ├─ Searching database for AT&T agreement details...
  ├─ Searching database for Vodafone agreement details...
  ├─ Cross-referencing: carrier_agreements, press_articles, filing_deltas

  COMPARISON OUTPUT:
  ┌─────────────────┬──────────────────────┬──────────────────────┐
  │                 │ AT&T                 │ Vodafone             │
  ├─────────────────┼──────────────────────┼──────────────────────┤
  │ Announced       │ 2026-03-16           │ 2023-09-12           │
  │ Term            │ 5 years              │ 5 years              │
  │ Geography       │ United States        │ Europe (14 countries)│
  │ Value           │ Undisclosed          │ Undisclosed          │
  │ Spectrum        │ AT&T licensed bands  │ Vodafone bands       │
  │ Subscribers     │ ~100M US wireless    │ ~300M European       │
  │ Service type    │ Satellite-to-phone   │ Satellite-to-phone   │
  │ Revenue model   │ Revenue share (est.) │ Revenue share        │
  │ Status          │ Signed, pending FCC  │ Active, limited areas│
  └─────────────────┴──────────────────────┴──────────────────────┘

  KEY DIFFERENCES:
  1. AT&T is a US deal — important because US has highest ARPU
  2. Vodafone was first-mover validation; AT&T is tier-1 US validation
  3. Combined addressable: ~400M subscribers across both deals
  4. AT&T deal came after technology proven (5 operational sats)
     vs. Vodafone which was pre-technology-validation

  THESIS IMPLICATION:
  AT&T deal de-risks the commercial model significantly.
  Vodafone proved carrier willingness; AT&T proves US carrier willingness
  at a stage where the technology is proven — much stronger signal.

[ask-agent-engineer] ✅ COMPLETED — comparison table + thesis implication delivered
```

### Deliverable
| Output | Destination |
|--------|-------------|
| Structured comparison table | Returned directly to user in Ask tab |
| Thesis implication context | Included in response |
| No DB writes | Read-only query, no state change |

---

## Summary: Full Org Run Outcomes

### By the Numbers
| Metric | Value |
|--------|-------|
| Engineers that fired | 18 (General Intel on standby) |
| Total DB writes | ~45 rows across 20+ tables |
| Events emitted | 5 (filing-scan-completed, filing-ingested, form-4-detected, press-release-added, prompt-audit-completed) |
| Chain triggers | 3 (Filing Engineer → DB Ingestor, Prompt Auditor → Remediation, Doc Reviewer → UX/UI) |
| PM notifications | 3 (Gemini: filing review, Bobman: Prompt Auditor + Doc Reviewer) |
| Decision items created | 3 (Claude: SEC patches, Maszka: prompt patches + doc updates) |
| Findings total | 9 drift + 5 security + 3 doc gaps + 3 data quality = **20 actionable findings** |
| Catalysts updated | 2 resolved, 3 alerts set |
| Scores updated | Thesis 8.5, Sentiment 8.4, Quality 99.3%, Security 87, Performance 7.5 |

### Cross-Division Data Flow (this run)

```
EDGAR API
  │
  ▼
SEC Filing Engineer (Gemini) ──filing-scan-completed──→ Gemini Auto-Review
  │                                                        │
  │                                                   APPROVED
  │                                                        │
  │                                                        ▼
  │                                          SEC DB Ingestor (Claude)
  │                                          7-phase deep analysis
  │                                          ├─ Materiality triage
  │                                          ├─ Form-type extraction
  │                                          ├─ Cross-filing correlation
  │                                          ├─ Conflict detection
  │                                          ├─ Patch generation
  │                                          ├─ Pre-write gate
  │                                          └─ Executive summary
  │                                                        │
  │                                                        ▼
  │                                          PM Decision Dashboard
  │                                          (patches await Claude PM approval)
  │
  ├──filing-ingested──→ 8 engineers triggered
  │
  ├──→ Thesis Engineer (Claude) ──→ conviction 7.2 → 8.5
  ├──→ Capital Structure (Claude) ──→ shares updated, warrant alert
  ├──→ Insider Activity (Gemini) ──→ cluster buy detected
  ├──→ Catalyst Tracker (Claude) ──→ AT&T confirmed, Batch 3 complete
  ├──→ Earnings Engineer (Claude) ──→ Q4 data, tone 8.1
  ├──→ Regulatory & IP (Gemini) ──→ patent filed, FCC pending
  ├──→ Data Quality (Claude) ──→ 99.3% score, 1 auto-fix
  └──→ Disclosure (Gemini) ──→ 100% coverage, 100% consistency

Press APIs
  │
  ▼
Press Intelligence (Gemini) ──press-release-added──→ Thesis, Catalyst re-check

Analyst Reports
  │
  ▼
Market Sentiment (Gemini) ──→ score 6.9 → 8.4, aligned with thesis

Daily Schedule
  │
  ├──→ Prompt Auditor (Bobman) ──chain──→ Prompt Remediation (Maszka)
  │     9 drift findings                  7 patches → Decision Dashboard
  │     notifies Bobman                   awaits Maszka approval
  │
  ├──→ Doc Reviewer (Bobman) ──chain──→ UX/UI Engineer (Maszka)
  │     3 doc gaps                       3 updates → Decision Dashboard
  │     notifies Bobman                  awaits Maszka approval
  │
  ├──→ Code Security (Claude) ──→ 87/100, 1 high finding
  └──→ Performance (Maszka) ──→ 7.5/10, 3 optimizations

Filing Engineer Chain (detailed):
  EDGAR API → Filing Engineer (Gemini) → Gemini Auto-Review → SEC DB Ingestor (Claude)
  │                                                              │
  │   filing-scan-completed                              7-phase analysis
  │   form-4-detected                                    4 patches generated
  │                                                              │
  └──→ 8 downstream engineers                         PM Decision Dashboard
       (thesis, capital, catalyst, etc.)               (Claude PM approve/reject)

User Query
  │
  ▼
General Intelligence (Claude) ──→ on-demand comparison table
```

### Pending Decisions

**Claude PM's Queue:**
| # | Item | Source | Patches | Status |
|---|------|--------|---------|--------|
| 44 | SEC Filing Ingestion — 1 8-K (Critical) for ASTS | Filing Engineer → DB Ingestor | 4 | pending |

**Maszka's Queue:**
| # | Item | Source | Patches | Status |
|---|------|--------|---------|--------|
| 42 | Prompt Remediation — 7 patches for ASTS | Prompt Auditor → Remediation | 7 | pending |
| 43 | UX/UI Doc Updates — 3 changes + 1 fix | Doc Reviewer → UX/UI | 4 | pending |

All await approve/reject on the Decision Dashboard at `/engineers/decisions`.
