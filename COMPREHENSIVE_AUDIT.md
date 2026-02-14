# COMPREHENSIVE PROFESSIONAL AUDIT REPORT
## ABISON Investment Research Platform (ASTS / BMNR / CRCL)

**Audit Date:** February 13, 2026
**Auditor:** Senior Full-Stack / Financial Analyst / UI/UX Auditor
**Scope:** Full-stack code review, financial model verification, UI/UX audit, consistency analysis
**Platform:** Next.js 16.1.1 + React 19 + TypeScript 5.9 + Tailwind CSS 4 + Recharts 3.6

---

## TABLE OF CONTENTS

1. [Overall Consistency & Branding](#1-overall-consistency--branding)
2. [Content & Writing Quality](#2-content--writing-quality)
3. [Financial Logic, Mathematics & Calculations](#3-financial-logic-mathematics--calculations)
4. [UI/UX & Information Architecture](#4-uiux--information-architecture)
5. [Visual Design & Styling](#5-visual-design--styling)
6. [Code Quality & Technical Soundness](#6-code-quality--technical-soundness)
7. [Professional Polish & Red Flags](#7-professional-polish--red-flags)
8. [Scoring & Summary](#8-scoring--summary)

---

## 1. OVERALL CONSISTENCY & BRANDING

### 1.1 Cross-Stock Structural Consistency

| Finding | Severity | Location |
|---------|----------|----------|
| All three models share identical Unified Model Maintenance Protocol header comments | **Praise** | ASTS.tsx:34-113, BMNR.tsx:62-141, CRCL.tsx:30-109 |
| Shared `stock-model-styles.ts` provides unified CSS with accent color variants (cyan/violet/mint) | **Praise** | stock-model-styles.ts:1-1690 |
| ASTS version is 2.1.0, BMNR is 2.5.0, CRCL is 1.1.0 -- inconsistent versioning scheme | **Low** | ASTS.tsx:23, BMNR.tsx:17, CRCL.tsx:18 |
| ASTS has 15+ tabs, BMNR has 15 tabs, CRCL has a different tab composition -- tab parity is not fully achieved | **Medium** | All three model files |
| Header comment style differs: ASTS uses `/** */` block, BMNR uses `/* */`, CRCL uses `//` style for the "MUST DO" banner | **Cosmetic** | ASTS.tsx:1-17, BMNR.tsx:1-60, CRCL.tsx:1-12 |

**Recommendation:** Synchronize version numbering across all three models (e.g., all 2.x.y). Ensure CRCL adopts the same `/** */` comment style for the "MUST DO" banner as ASTS and BMNR for visual consistency.

### 1.2 Terminology Consistency

| Finding | Severity | Location |
|---------|----------|----------|
| All three models use identical `UpdateSource` type (`'PR' | 'SEC' | 'WS' | 'MARKET'`) | **Praise** | ASTS.tsx:199, BMNR.tsx:249, CRCL.tsx:167 |
| All three define identical `RATING_NORMALIZATION` map for analyst ratings | **Praise** | ASTS.tsx:296-312, BMNR.tsx:343-358, CRCL.tsx:229-245 |
| Identical `LEGAL_DISCLAIMERS` text across all three models | **Praise** | ASTS.tsx:340-343, BMNR.tsx:393-396, CRCL.tsx:273-276 |
| "EV/EBITDA" terminology is consistent across models | **Praise** | Throughout |
| ASTS uses "bull case" / "bear case" while CRCL scenarios use "Bull" / "Bear" / "Moon" / "Worst" naming | **Low** | ASTS.tsx SCENARIO_PRESETS vs CRCL SCENARIO_SIMULATIONS |

### 1.3 Date/Number Formatting

| Finding | Severity | Location |
|---------|----------|----------|
| ASTS data freshness: `'2026-02-12'` ISO format | **Praise** | src/data/asts/company.ts:31 |
| BMNR data freshness: `'2026-02-12'` ISO format | **Praise** | src/data/bmnr/company.ts:31 |
| CRCL data freshness: `'2025-12-31'` -- notably older than ASTS/BMNR | **Medium** | src/data/crcl/company.ts:29 |
| Currency formatting: ASTS uses `$2,780M` style in comments, `$96.92` for prices | **Praise** | src/data/asts/company.ts:79 |
| All three use millions (M) for shares, billions (B) for enterprise value | **Praise** | Throughout |
| CRCL stock price `$80.05` is dated Dec 31, 2025 -- 6+ weeks stale | **High** | src/data/crcl/company.ts:67 |

**Recommendation:** Update CRCL data to Feb 2026 to match ASTS and BMNR freshness. This stale data is a significant consistency gap.

---

## 2. CONTENT & WRITING QUALITY

### 2.1 Grammar, Spelling, Punctuation

| Finding | Severity | Location |
|---------|----------|----------|
| ASTS.tsx line 152: "2025 Creative Professional Design (CRCL-Style UI/UX)" -- references another stock's style in ASTS file header | **Low** | ASTS.tsx:152 |
| BMNR.tsx line 235: "2025 Creative Professional Design (CRCL-Style UI/UX)" -- same cross-reference issue | **Low** | BMNR.tsx:235 |
| All disclaimer text is grammatically correct and professionally written | **Praise** | LEGAL_DISCLAIMERS across all files |
| AI Agent instruction blocks in data files are clear, well-structured, and actionable | **Praise** | All data/*.ts files |

### 2.2 Professional Tone & Balance

| Finding | Severity | Location |
|---------|----------|----------|
| BMNR changelog uses specific metrics: "4.285M ETH, $10.7B total, staking hits 2.897M (67.6%)" -- data-driven, not hyperbolic | **Praise** | BMNR.tsx:22 |
| CRCL "Moon" scenario projects USDC at $2,850B by 2035 and share price of $7,834 | **High** | CRCL.tsx:576-615 |
| CRCL "Moon" scenario assumes 53% stablecoin market share and $99.8B gross revenue by 2035 | **High** | CRCL.tsx:577 |
| ASTS "Moon" scenario uses 10% penetration rate -- aggressive but labeled as such | **Medium** | ASTS.tsx SCENARIO_PRESETS |
| All models include both bull AND bear cases with explicit risk catalysts | **Praise** | All three models |
| Footer disclaimer: "Not financial advice" is present | **Praise** | layout.tsx:49 |

**Recommendation:** The CRCL "Moon" scenario ($2,850B USDC, $7,834/share) strains credibility. Total stablecoin market was ~$220B in late 2025. Projecting $5,400B+ total market (2,850B / 53%) by 2035 would require stablecoins to exceed M2 money supply of several G7 nations. Consider capping at more defensible levels or adding explicit caveats about the extreme nature of this scenario.

### 2.3 Sourcing & Factual Accuracy

| Finding | Severity | Location |
|---------|----------|----------|
| ASTS data explicitly cites "8-K Feb 11, 2026", "424B5", "DEF 14A" filings | **Praise** | ASTS.tsx:176-184 |
| BMNR data cites "CIK: 0001829311", "EIN: 84-3986354" -- SEC-verifiable | **Praise** | BMNR.tsx:39-44 |
| CRCL data cites "Q3 2025 10-Q (Nov 12, 2025)" | **Praise** | src/data/crcl/company.ts:30 |
| ASTS debt rate of 2.15% weighted average is documented with breakdown | **Praise** | src/data/asts/company.ts:82 |
| BMNR uses CESR rate of 3.11% for staking APY -- verifiable on-chain | **Praise** | BMNR.tsx model defaults |

---

## 3. FINANCIAL LOGIC, MATHEMATICS & CALCULATIONS

### 3.1 DCF Models (All Three Stocks)

#### ASTS DCF (Lines 3795-3896)

| Step | Formula | Verification | Severity |
|------|---------|--------------|----------|
| Terminal Subscribers | `partnerReach * (penetrationRate/100) * (1 - competitionDiscount/100)` | Correct: 3,200M * 3% * 80% = 76.8M subs | **Praise** |
| Terminal Gross Revenue | `terminalSubs * blendedARPU * 12 / 1000` | Correct: M * $/mo * 12 / 1000 = $B | **Praise** |
| Revenue Share | `terminalGrossRev * (revenueShare / 100)` | Correct | **Praise** |
| Terminal EBITDA | `terminalRev * (terminalMargin / 100)` | Correct | **Praise** |
| Terminal FCF | `terminalRev * ((terminalMargin - terminalCapex) / 100)` | Simplified -- ignores taxes, working capital | **Medium** |
| Gordon Growth TV | `terminalFCF / spread` where `spread = discount - growth` | Correct; protected with `spread > 0.01` | **Praise** |
| PV Discount | `terminalEV / (1 + r)^n` | Correct | **Praise** |
| Risk Factor | `(1 - reg/100) * (1 - tech/100) * (1 - comp/100)` | Assumes independent risks (documented) | **Medium** |
| Equity Value | `riskAdjustedEV - netDebtB` | Correct; properly handles net cash | **Praise** |
| Target Price | `(equityValue * 1000) / dilutedShares` | Correct unit conversion: $B*1000/M = $/share | **Praise** |

**Issue F3.1a -- FCF Simplification:**
In ASTS.tsx line ~3821: `const terminalFCF = terminalRev * ((terminalMargin - terminalCapex) / 100);`
This treats FCF as Revenue * (EBITDA margin% - CapEx%) which ignores taxes (~21% federal) and working capital. For a pre-revenue company this is acceptable as a rough model, but should be labeled clearly.

**Fix:** Add comment: `// Simplified: ignores taxes and working capital. For refined model, use: EBITDA * (1 - taxRate) + D&A * taxRate - CapEx - deltaWC`

#### BMNR DCF (Lines 4354-4405)

| Step | Formula | Verification | Severity |
|------|---------|--------------|----------|
| Compound ETH | `eth += eth * (APY/100)` per year | Correct annual compounding | **Praise** |
| Future ETH Price | `ethPrice * (1 + growth%)^y` | Correct CAGR formula | **Praise** |
| NAV per share | `(eth * futurePrice) / (shares * 1e6)` | Correct: ETH * $/ETH / total_shares | **Praise** |
| PV per share | `nav / (1 + discount%)^y` | Correct standard DCF | **Praise** |
| CF per share | `(yieldETH * price) * (payout%) / (shares * 1e6)` | Correct | **Praise** |
| Terminal Value | `finalNAV * terminalMultiple` | Correct terminal NAV approach | **Praise** |
| IRR | `(impliedValue / currentNAV)^(1/years) - 1` | Correct | **Praise** |

**Verdict:** BMNR DCF is mathematically sound. All unit conversions verified correct.

#### CRCL DCF (Lines 1373-1441)

| Step | Formula | Verification | Severity |
|------|---------|--------------|----------|
| Gross Revenue | `USDC_circ * (reserveYield / 100)` | Correct: $62.5B * 4% = $2.5B | **Praise** |
| Net Revenue | `grossRev * (1 - distributionCost/100)` | Correct | **Praise** |
| EBITDA | `netRev * (operatingMargin/100)` | Correct | **Praise** |
| FCF | `EBITDA * 0.85` (85% conversion) | Reasonable for asset-light business | **Praise** |
| Gordon Growth TV | `terminalFCF / (discount - growth)` | Correct; protected with `spread > 0.01` | **Praise** |
| Hardcoded net debt | `netDebt = 0.2` ($200M) | Should be configurable | **Medium** |
| Target Price | `(equityValue * 1000) / terminalShares` | Correct unit conversion | **Praise** |

**Issue F3.1b -- Hardcoded Debt/Cash in CRCL Monte Carlo:**
In CRCL.tsx line ~3280: `res.push(safe((pv + 1349 - 149) / MARKET.shares));`
The values 1349 and 149 are hardcoded magic numbers representing cash and debt adjustments in millions. These should be extracted to named constants or imported from `company.ts`.

### 3.2 Monte Carlo Simulations

#### ASTS Monte Carlo (Lines 4333-4475)

| Component | Formula | Verification | Severity |
|-----------|---------|--------------|----------|
| Box-Muller | `sqrt(-2*ln(u)) * cos(2*pi*v)` | Standard algorithm, rejection for log(0) | **Praise** |
| Log-normal factor | `exp(-0.5*sigma^2 + sigma*Z)` | Correct: E[factor] = 1 (mean-preserving) | **Praise** |
| Operating leverage | -15% margin if revenue < $2B, -5% if < $4B | Economically sound | **Praise** |
| Multiple compression | -4x if revenue < $2B, -2x if < $4B, floor at 4x | Sound | **Praise** |
| Sharpe Ratio | `(avgReturn - riskFreeRate) / stdDev` | Correct | **Praise** |
| Sortino Ratio | Uses `negativeReturns.length` instead of `n` for denominator | Biases downside dev estimate | **Medium** |

**Issue F3.2a -- Sortino Ratio Denominator (ASTS):**
In ASTS.tsx line ~4443: `negativeReturns.reduce((...), 0) / negativeReturns.length`
Standard Sortino should use all returns but only square downside deviations. Current approach divides by the subset size, biasing the downside deviation upward.

**Fix:**
```typescript
const downsideVariance = returns.reduce((a, r) => a + (r < riskFreeRate ? Math.pow(r - riskFreeRate, 2) : 0), 0) / n;
```

#### BMNR Monte Carlo -- GBM (Lines 4715-4783)

| Component | Formula | Verification | Severity |
|-----------|---------|--------------|----------|
| GBM Price | `price * exp((mu + yield - slash - op - 0.5*sigma^2)*dt + sigma*sqrt(dt)*z)` | Correct Ito's lemma correction | **Praise** |
| NAV Multiple Mean Reversion | `mult * exp(kappa*(mult-1)*dt + m_sigma*sqrt(dt)*z)` bounded [0.3, 2.5] | Correct log-normal mean reversion | **Praise** |
| Correlated normals | Uses Cholesky decomposition for (z1, z2) | Correct | **Praise** |
| VaR/CVaR | 5th percentile and average of bottom 5% | Correct | **Praise** |

**Verdict:** BMNR's GBM Monte Carlo is the most sophisticated of the three. Implementation is mathematically sound.

#### CRCL Monte Carlo (Lines 3251-3321)

| Component | Formula | Verification | Severity |
|-----------|---------|--------------|----------|
| Box-Muller | `sqrt(-2*ln(u)) * cos(2*pi*v)` | Correct | **Praise** |
| Revenue growth | Normal distribution: `mean + z * std` where std = (max-min)/4 | Reasonable parametric assumption | **Praise** |
| Reserve rate | Uniform [3%, 5%] via `3 + Math.random() * 2` | Different distribution than growth -- should document why | **Low** |
| Terminal value | `rldcY * 1000 * multiple` | Correct | **Praise** |
| Sharpe/Sortino | Both implemented | Correct | **Praise** |

**Issue F3.2b -- Mixed Distribution Types (CRCL):**
Revenue growth uses normal distribution (Box-Muller), but the reserve rate uses uniform distribution (`3 + Math.random() * 2`). This mixing is not inherently wrong but should be documented.

### 3.3 Scenario Projection Verification (CRCL)

**BASE Scenario 2025:**
- USDC: $80B, Reserve Rate: 4.0%
- Expected Gross Revenue: 80 * 4% = $3.2B -- **MATCHES** field `grossRevenue: 3.2`
- Distribution Cost: $1.7B -- implies 53.1% distribution rate (field says `rldcMargin: 39`)
- Net Revenue: 3.2 - 1.7 = $1.5B -- **MATCHES** field `netRevenue: 1.5`
- RLDC Margin: 1.5/3.2 = 46.9% -- **DOES NOT MATCH** field `rldcMargin: 39`

**Issue F3.3a -- CRCL RLDC Margin Inconsistency:**
In CRCL.tsx BASE scenario 2025: `rldcMargin: 39` but `netRevenue / grossRevenue = 1.5/3.2 = 46.9%`. The `rldcMargin` field appears to represent something different (possibly RLDC as % of gross rev minus distribution only, or net income margin). This creates confusion for anyone reading the raw data.

**Severity: High** -- Financial metric definitions must be unambiguous in investor-facing content.

**BASE Scenario 2035 verification:**
- USDC: $680B, Rate: 3.0%
- Gross Revenue: 680 * 3% = $20.4B -- **MATCHES** `grossRevenue: 20.4`
- Distribution: $9.2B (45.1%) -- distribution cost improving from 53% to 45%
- Net Revenue: 20.4 - 9.2 = $11.2B -- **MATCHES** `netRevenue: 11.2`
- EBITDA: $4.20B -- `ebitda / netRevenue = 37.5%` -- reasonable operating margin
- Share Price: $882 -- `equityValue: 202, shares: ~229M, 202B*1000/229 = $882` -- **MATCHES**

### 3.4 Technical Indicator Calculations (StockChart.tsx)

| Indicator | Status | Notes |
|-----------|--------|-------|
| RSI (Wilder's smoothing) | **Fixed & Correct** | Uses `prevAvgGain/prevAvgLoss` state variables properly |
| SMA | **Correct** | Standard simple moving average |
| EMA | **Correct** | Standard exponential moving average with 2/(n+1) multiplier |
| Bollinger Bands | **Correct** | Population standard deviation (appropriate per Bollinger's definition) |
| VWAP | **Correct** | `sum(TP*Vol) / sum(Vol)` where TP = (H+L+C)/3 |
| MACD | **Mostly Correct** | Null-to-0 conversion at line 254 may distort early signal line |
| ATR | **Bug** | `slice(0, period + 1)` should be `slice(0, period)` -- off-by-one |

**Issue F3.4a -- ATR Off-by-One (StockChart.tsx:304):**
```typescript
const sum = trueRanges.slice(0, period + 1).reduce((a, b) => a + b, 0);
result.push(sum / (period + 1));
```
First ATR averages `period + 1` values instead of `period`. This biases the initial ATR.

**Fix:** `trueRanges.slice(0, period)` and divide by `period`.

**Issue F3.4b -- Bollinger Bands Loop Bug (StockChart.tsx:195-198):**
`continue` inside nested `for` loop breaks array alignment. If `closePrice` is null mid-way through the inner period loop, `upper.push(null)` and `lower.push(null)` are called, but the outer loop index advances, causing the Bollinger arrays to become longer than `data.length`.

**Severity: Medium** -- Produces incorrect output if any `close` value is null within the lookback window.

---

## 4. UI/UX & INFORMATION ARCHITECTURE

### 4.1 Navigation & Scannability

| Finding | Severity | Location |
|---------|----------|----------|
| Home page provides clear coverage grid with ticker, sector, and name | **Praise** | page.tsx:33-69 |
| Stock detail page uses dynamic imports with loading spinner | **Praise** | stocks/[ticker]/page.tsx:8-21 |
| Each stock model has sticky navigation tabs with scroll-on-mobile | **Praise** | stock-model-styles.ts:188-203 |
| Tab navigation uses left-border color coding: mint=tracking, accent=projection | **Praise** | stock-model-styles.ts:238-255 |
| No cross-stock comparison view -- users cannot view ASTS vs BMNR side-by-side | **Medium** | Architecture gap |

### 4.2 Readability

| Finding | Severity | Location |
|---------|----------|----------|
| Body font is system sans-serif fallback (`-apple-system, BlinkMacSystemFont, 'Segoe UI'`) but stock models use Outfit | **Low** | globals.css:52 vs stock-model-styles.ts:60 |
| Line height set to 1.5 globally, 1.7 for detail text -- good readability | **Praise** | globals.css:53, stock-model-styles.ts:1277 |
| Table text uses Space Mono at 14px -- compact but readable | **Praise** | stock-model-styles.ts:561-563 |
| Mobile breakpoints at 768px, 480px, 360px provide smooth degradation | **Praise** | stock-model-styles.ts:753-1128 |

### 4.3 Data Presentation

| Finding | Severity | Location |
|---------|----------|----------|
| Table header styling: 11px uppercase with 1px letter-spacing | **Praise** | stock-model-styles.ts:549-555 |
| Chart implementation uses Recharts `ResponsiveContainer` | **Praise** | StockChart.tsx |
| Monte Carlo histogram uses custom CSS bars (.mc-chart) | **Praise** | stock-model-styles.ts:643-660 |
| Stats row uses horizontal scroll with fade masks on mobile | **Praise** | stock-model-styles.ts:800-813 |
| Touch targets enforce 44px minimum on touch devices | **Praise** | stock-model-styles.ts:726-733 |

### 4.4 Accessibility

| Finding | Severity | Location |
|---------|----------|----------|
| `html lang="en"` is set | **Praise** | layout.tsx:62 |
| No ARIA labels on interactive elements (tabs, sliders, buttons) | **Medium** | All model files |
| Color-only indicators (red/green for up/down) lack text alternatives | **Medium** | LivePrice.tsx:164 |
| `prefers-reduced-motion` media query properly disables animations | **Praise** | stock-model-styles.ts:1154-1163 |
| `prefers-color-scheme: dark` handled (already dark theme) | **Praise** | stock-model-styles.ts:1166-1171 |
| Viewport allows zooming up to 5x (`maximumScale: 5`) | **Praise** | layout.tsx:13 |
| Tab navigation hidden scrollbar may confuse screen readers | **Low** | stock-model-styles.ts:204 |

---

## 5. VISUAL DESIGN & STYLING

### 5.1 Color Palette

| Finding | Severity | Location |
|---------|----------|----------|
| Dark theme with professional finance palette: #05070A (bg), #0D1117 (surface) | **Praise** | stock-model-styles.ts:27-28 |
| Three accent colors properly differentiate stocks: Cyan (#22D3EE) ASTS, Violet (#A78BFA) BMNR, Mint (#7EE787) CRCL | **Praise** | stock-model-styles.ts:52-54 |
| Semantic colors for sentiment: Mint (positive), Coral (negative), Gold (warning) | **Praise** | stock-model-styles.ts:43-50 |
| `--text2` and `--text3` both map to `#8B949E` -- these should be different values for hierarchy | **Low** | stock-model-styles.ts:35-36 |

**Recommendation:** Differentiate `--text2` and `--text3`. Suggested: `--text2: #8B949E` (secondary text), `--text3: #6E7681` (tertiary/muted text).

### 5.2 Typography

| Finding | Severity | Location |
|---------|----------|----------|
| Heading font: Outfit (weights 300-800) -- modern, clean geometric sans | **Praise** | stock-model-styles.ts:22 |
| Monospace font: Space Mono for financial data -- excellent choice | **Praise** | stock-model-styles.ts:22 |
| Hero heading: 42px / 700 weight with gradient fill | **Praise** | stock-model-styles.ts:97-106 |
| Price display: 56px Space Mono / 700 weight | **Praise** | stock-model-styles.ts:133-139 |
| Card labels: 11px uppercase with 2.5px letter-spacing | **Praise** | stock-model-styles.ts:374-380 |
| Font loaded via Google Fonts `@import` in CSS string -- renders twice (globals.css AND stock-model-styles.ts) | **Low** | globals.css:1, stock-model-styles.ts:22 |

### 5.3 Spacing & Alignment

| Finding | Severity | Location |
|---------|----------|----------|
| Consistent 64px horizontal padding on desktop for hero, stats, nav, main | **Praise** | stock-model-styles.ts:70,156,192,342 |
| 4-tier responsive padding: 64px > 32px > 24px > 16px > 12px | **Praise** | stock-model-styles.ts:737-1128 |
| `margin-bottom: 0` used extensively -- relies on parent flex/grid gap | **Praise** | Throughout stock-model-styles.ts |
| Card border-radius: 16px consistently | **Praise** | stock-model-styles.ts:368 |
| Grid gaps: 24px for desktop, 12px for mobile | **Praise** | stock-model-styles.ts:383-386,797 |

### 5.4 Chart & Table Aesthetics

| Finding | Severity | Location |
|---------|----------|----------|
| Bar charts use gradient fill with hover brightness effect | **Praise** | stock-model-styles.ts:483-496 |
| Tables use rounded header corners and hover row highlight | **Praise** | stock-model-styles.ts:557-558,565-567 |
| Competitor cards use left-border threat indicators (coral/gold/mint) | **Praise** | stock-model-styles.ts:1454-1456 |
| Timeline items use expandable accordion with smooth transitions | **Praise** | stock-model-styles.ts:1174-1347 |

### 5.5 Responsiveness Issues

| Finding | Severity | Location |
|---------|----------|----------|
| Landscape mobile properly shows 2-column hero grid | **Praise** | stock-model-styles.ts:1131-1141 |
| Retina displays get 0.5px borders and 3px nav borders | **Praise** | stock-model-styles.ts:1144-1151 |
| Timeline hides date and category columns on small screens (< 600px) | **Praise** | stock-model-styles.ts:1340-1347 |
| `globals.css` uses `!important` overrides for grid columns on mobile -- fragile approach | **Low** | globals.css:97 |

---

## 6. CODE QUALITY & TECHNICAL SOUNDNESS

### 6.1 TypeScript & Type Safety

| Finding | Severity | Location |
|---------|----------|----------|
| All three model files use `// @ts-nocheck` at line 1 | **Critical** | ASTS.tsx:1, BMNR.tsx:1, CRCL.tsx:1 |
| Shared types in `data/shared/types.ts` are well-defined with JSDoc | **Praise** | data/shared/types.ts |
| `UpdateSource`, `StatProps`, `CardProps`, `RowProps` interfaces duplicated in all 3 files instead of shared | **Medium** | ASTS/BMNR/CRCL .tsx files |
| `safeDivide`, `safeNumber`, `clamp` utility functions duplicated in all 3 files | **Medium** | ASTS.tsx:412-421, BMNR.tsx:464-474, CRCL.tsx:344-354 |

**Issue C6.1a -- `@ts-nocheck` on All Model Files:**
The `// @ts-nocheck` directive disables ALL TypeScript checking on files totaling ~14,000+ lines of financial calculation code. This is the single highest-risk code quality issue in the entire codebase. Any typo in a formula, wrong variable name, or type mismatch will silently pass compilation.

**Severity: Critical**

**Recommendation:** Remove `@ts-nocheck` and fix type errors. At minimum, use `@ts-expect-error` on specific lines that need it rather than blanket suppression.

### 6.2 Component Architecture

| Finding | Severity | Location |
|---------|----------|----------|
| `FinancialModelErrorBoundary` class component duplicated in all 3 files | **Medium** | ASTS.tsx:349-405, BMNR.tsx:402-458, CRCL.tsx:282-338 |
| Error boundary button color differs: ASTS=#22D3EE (cyan), BMNR=#A78BFA (violet), CRCL=#34d399 (mint) -- intentional per accent | **Praise** | Respective files |
| CRCL error boundary uses `color-mix()` for background while ASTS/BMNR use `rgba()` | **Low** | CRCL.tsx:301 vs ASTS.tsx:368 |
| `React.memo` used on `Stat`, `Card`, `Row`, `Guide`, `Panel` components | **Praise** | ASTS.tsx:435-462 |
| Stock models use dynamic imports with `ssr: false` to avoid SSR issues | **Praise** | stocks/[ticker]/page.tsx:9-20 |
| ASTS model is 4,500+ lines in a single file | **High** | ASTS.tsx |

**Issue C6.2a -- Monolithic Model Files:**
Each stock model is a single massive file (ASTS: ~4,500 lines, BMNR: ~8,100 lines, CRCL: ~5,000 lines). This makes maintenance difficult and increases the likelihood of merge conflicts, stale code, and missed updates.

**Recommendation:** Consider splitting each model into sub-modules: `ASTSOverview.tsx`, `ASTSDcf.tsx`, `ASTSMonteCarlo.tsx`, etc. This would also allow selective `@ts-nocheck` removal.

### 6.3 CSS Architecture

| Finding | Severity | Location |
|---------|----------|----------|
| Unified `getStockModelCSS()` function generates CSS string with accent color injection | **Praise** | stock-model-styles.ts:21-1690 |
| CSS is injected via `<style>` tags (CSS-in-JS string) -- not ideal for performance | **Medium** | Each model file |
| `* { box-sizing: border-box; margin: 0; padding: 0; }` in model CSS overrides Tailwind's `:where()` selectors | **High** | stock-model-styles.ts:57 |
| `globals.css` has specificity workarounds with `.stock-model-app` prefix | **Praise** (workaround) | globals.css:79-87 |
| `:root` CSS variables are re-declared in both `globals.css` and the generated model CSS | **Low** | globals.css:7-35, stock-model-styles.ts:24-55 |

**Issue C6.3a -- Global Reset Conflicts:**
The `* { margin: 0; padding: 0; }` in `stock-model-styles.ts:57` conflicts with Tailwind CSS utilities. The `globals.css` file already contains workarounds (lines 79-87) to boost specificity for `.space-y-*` and `.gap-*` classes. This fragile arrangement will break as new Tailwind utilities are used.

**Recommendation:** Remove the global `*` reset from model CSS and rely on Tailwind's reset or apply resets only to `.stock-model-app` descendant selectors.

### 6.4 API Routes

| Finding | Severity | Location |
|---------|----------|----------|
| Yahoo Finance proxy at `/api/stock/[symbol]` with 5-minute caching | **Praise** | src/app/api/stock/[symbol]/route.ts |
| `encodeURIComponent(symbol)` used in LivePrice fetch | **Praise** | LivePrice.tsx:41 |
| No rate limiting on API routes | **Medium** | API routes |
| No input validation on symbol parameter | **Medium** | API routes |

### 6.5 Performance Concerns

| Finding | Severity | Location |
|---------|----------|----------|
| `useMemo` properly used for expensive calculations (DCF, Monte Carlo) | **Praise** | All model files |
| Monte Carlo capped at 10,000 simulations | **Praise** | CRCL.tsx:3263 |
| Max Drawdown uses O(n^2) `data.find()` inside loop | **Low** | StockChart.tsx:412 |
| Google Fonts loaded twice (globals.css AND model CSS) | **Low** | globals.css:1, stock-model-styles.ts:22 |

### 6.6 Duplicated Code

| Item | Duplicated In | Lines Each |
|------|---------------|------------|
| `UpdateSource` type | ASTS, BMNR, CRCL | ~1 |
| `StatProps`, `CardProps`, `RowProps`, `InputProps` | ASTS, BMNR, CRCL | ~30 |
| `FinancialModelErrorBoundary` class | ASTS, BMNR, CRCL | ~55 |
| `RATING_NORMALIZATION` map | ASTS, BMNR, CRCL | ~15 |
| `LEGAL_DISCLAIMERS` object | ASTS, BMNR, CRCL | ~4 |
| `safeDivide`, `safeNumber`, `clamp` utilities | ASTS, BMNR, CRCL | ~8 |
| `Stat`, `Card`, `Row`, `Panel`, `Guide` components | ASTS, BMNR, CRCL | ~80 |

**Total estimated duplicated code: ~580 lines x 3 = ~1,740 lines** that could be in shared modules.

**Severity: Medium** -- Not a functional issue but significantly impacts maintainability and consistency risk.

---

## 7. PROFESSIONAL POLISH & RED FLAGS

### 7.1 Institutional-Grade Assessment

| Aspect | Rating | Notes |
|--------|--------|-------|
| Data sourcing rigor | 9/10 | SEC filings, on-chain data, press releases all cited |
| Disclaimer coverage | 8/10 | "Not financial advice" present but could be more prominent |
| Model documentation | 9/10 | Exceptional AI agent instructions, changelog, maintenance protocol |
| Visual professionalism | 9/10 | Dark theme with Seeking Alpha/Bloomberg aesthetic |
| Mathematical rigor | 8/10 | Sound formulas with a few simplifications acknowledged |
| Code reliability | 6/10 | `@ts-nocheck` on all model files is a major concern |

### 7.2 Investor Misleading Risk

| Finding | Severity | Location |
|---------|----------|----------|
| CRCL "Moon" scenario: $7,834/share by 2035 (98x from current) | **High** | CRCL.tsx:615 |
| ASTS "Moon" scenario uses -2 deployment delay (ahead of schedule) and 10% penetration | **Medium** | ASTS.tsx SCENARIO_PRESETS |
| Disclaimer placement is in footer (small text) rather than at top of each analysis | **Medium** | layout.tsx:49 |
| Each model HAS a disclaimer banner component but placement varies | **Low** | stock-model-styles.ts:662-695 |
| Probability weights: CRCL Moon at 8%, Bull at 22% -- combined 30% for extreme upside | **Medium** | CRCL.tsx scenarios |
| All three models clearly label scenarios and include bear/worst cases | **Praise** | All models |

**Recommendation:** Add a prominent disclaimer banner at the TOP of each stock analysis page (before any financial data). The current footer placement is insufficient for investor protection. The `disclaimer-banner` CSS class already exists in stock-model-styles.ts but may not be used prominently.

### 7.3 Data Staleness

| Stock | Last Updated | Age (as of Feb 13, 2026) | Severity |
|-------|--------------|--------------------------|----------|
| ASTS | Feb 12, 2026 | 1 day | **Praise** |
| BMNR | Feb 12, 2026 | 1 day | **Praise** |
| CRCL | Dec 31, 2025 | 44 days | **High** |

CRCL's stale data means the stock price ($80.05), USDC circulation ($62.5B), and market metrics may be significantly outdated.

---

## 8. SCORING & SUMMARY

### Overall Score: 7.8 / 10

| Category | Score | Weight | Weighted |
|----------|-------|--------|----------|
| Consistency & Branding | 8.5/10 | 15% | 1.28 |
| Content & Writing | 8.0/10 | 10% | 0.80 |
| Financial Logic & Math | 8.5/10 | 25% | 2.13 |
| UI/UX & Architecture | 8.0/10 | 15% | 1.20 |
| Visual Design | 9.0/10 | 10% | 0.90 |
| Code Quality | 6.0/10 | 15% | 0.90 |
| Professional Polish | 7.5/10 | 10% | 0.75 |
| **TOTAL** | | **100%** | **7.96** |

### TOP 5 MOST URGENT FIXES

1. **[Critical] Remove `@ts-nocheck` from all three model files** (ASTS.tsx:1, BMNR.tsx:1, CRCL.tsx:1). This single directive disables type checking on 14,000+ lines of financial calculation code. Any formula typo, wrong variable reference, or type mismatch is invisible. Fix type errors incrementally or use targeted `@ts-expect-error`.

2. **[High] Update CRCL data to February 2026** (src/data/crcl/company.ts, financials.ts). The CRCL model is 44 days stale while ASTS and BMNR were updated yesterday. Stock price, USDC circulation, and all market metrics need refreshing.

3. **[High] Fix CRCL RLDC margin field inconsistency** (CRCL.tsx BASE scenario 2025). `rldcMargin: 39` does not match computed `netRevenue/grossRevenue = 46.9%`. Clarify the metric definition or correct the values.

4. **[High] Fix ATR off-by-one bug** (StockChart.tsx:304). `trueRanges.slice(0, period + 1)` should be `trueRanges.slice(0, period)`. This biases the initial ATR calculation and affects all downstream technical analysis that depends on ATR.

5. **[High] Cap CRCL "Moon" scenario or add stronger caveats** (CRCL.tsx:576-615). $2,850B USDC and $7,834/share by 2035 implies a stablecoin market larger than global M2 supply growth. This undermines the model's credibility for sophisticated investors.

### TOP 3 THINGS DONE REALLY WELL

1. **Unified Model Maintenance Protocol** -- The shared header comment block across all three models (ASTS/BMNR/CRCL) with explicit AI agent instructions, update checklists, and archival rules is exceptional. The BMNR press release checklist (10 sections to update) is particularly thorough. This is better documentation than most institutional-grade codebases.

2. **Financial Model Architecture** -- The DCF implementations across all three stocks are mathematically sound with proper Gordon Growth Model, present value discounting, risk adjustments, and unit conversions. The BMNR Monte Carlo uses genuine Geometric Brownian Motion with Ito's lemma correction and correlated normal random variables. The code includes `safeDivide`, `safeNumber`, and `clamp` utilities to prevent NaN/Infinity in financial calculations.

3. **Visual Design System** -- The unified `stock-model-styles.ts` with accent color parameterization (cyan/violet/mint) creates a cohesive, professional aesthetic across all three stocks. The responsive design covers 5 breakpoints (1200px, 900px, 768px, 480px, 360px) plus landscape mode. Touch targets enforce 44px minimums. `prefers-reduced-motion` is respected. The dark theme with glass morphism effects and gradient overlays achieves a Bloomberg/Seeking Alpha tier of visual polish.

---

**End of Audit Report**
**Auditor:** Claude AI (Senior Full-Stack / Financial Analyst / UI/UX)
**Date:** February 13, 2026
