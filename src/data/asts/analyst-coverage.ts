// @ts-nocheck
/**
 * ASTS Analyst Coverage Data
 * Extracted from ASTS.tsx for maintainability.
 * Add new reports at the TOP of each firm's reports array (newest first).
 * NEVER delete historical reports — this is an audit trail.
 */

import type { AnalystCoverage } from '@/components/shared/wallStreetTypes';

export const ASTS_ANALYST_COVERAGE: AnalystCoverage[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // DEUTSCHE BANK - Bryan Kraft (Coverage since June 2021)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    firm: 'Deutsche Bank',
    analyst: 'Bryan Kraft',
    coverageSince: 'June 2021',
    currentPT: 137,
    currentRating: 'Buy',
    currentRatingNormalized: 'bullish',
    reports: [
      // === Jan 2026 - PT Raise $81 → $137 (FULL REPORT - Revamped Model) ===
      {
        date: '2026-01-20',
        action: 'PT Raise',
        priceTarget: 137,
        previousTarget: 81,
        rating: 'Buy',
        ratingNormalized: 'bullish',
        reportTitle: 'Our New Model Includes A Larger TAM, Greater Capex, And Lower Supplemental Coverage ARPU',
        source: 'Deutsche Bank Research',
        isFullReport: true,
        thesis: 'We\'re publishing a revamped model with updated TAM, penetration, pricing, and launch/capex assumptions. Our updated model also mathematically analyzes capacity against utilization to determine the number of satellites required to support the business, which then drives our build/launch and capex forecast. PT raised to $137 from $81 (+69%).',
        reportSummary: `**VALUATION METHODOLOGY UPDATE**
Raising PT to $137, from $81, driven by rolling forward our valuation given the new year and an increase in our EV/2030E EBITDA multiple to 20x, from 15x. The reason for the increase in our 2030 valuation multiple is that our new forecast exits 2030 with a 60% higher EBITDA growth rate of 40%.

**MODEL CHANGES**
- Larger TAM (Total Addressable Market)
- Greater Capex assumptions
- Lower Supplemental Coverage ARPU
- Mathematical capacity vs utilization analysis for satellite requirements
- Updated penetration and pricing assumptions

**STOCK OUTLOOK — LAUNCH EXECUTION IS KEY IN 2026**
We believe that ASTS has the MNO partnerships in place to be successful and scale its D2D business, while also adding incremental revenue in government and potentially enterprise over time. The next step in realizing future success for ASTS is executing the company's satellite build and launch plan in order to enable a 24 hour continuous commercial service.

**LAUNCH TIMELINE EXPECTATIONS**
- Target: 45-60 satellites by YE2026
- 5 launches by end of March 2026 (including Dec 23, 2025 successful launch)
- Goal: 24-hour continuous commercial service by late 2026/1H27
- Minor timeline slips acceptable (1 launch into 2Q or early 2027)

**EXECUTION MATTERS**
The company has historically experienced delays in launch plans (as many in the satellite industry have historically, especially new entrants) and, therefore, it is critical that the company largely delivers on schedule this year. ASTS needs to show that it can accelerate the launch cadence and deliver a 24 hour continuous service to its MNO partners in late 2026/1H27. Meeting this timeline would represent significant progress against operationalizing the business plan and we believe would drive continued upside in the stock price.`,
        assumptions: [
          { label: 'Price Target', value: '$137.00' },
          { label: 'Prev Target', value: '$81.00' },
          { label: 'PT Change', value: '+69%' },
          { label: 'EV/2030E EBITDA Multiple', value: '20x (from 15x)' },
          { label: '2030 EBITDA Growth Rate', value: '40%' },
          { label: 'YE2026 Satellite Target', value: '45-60 satellites' },
          { label: 'Q1 2026 Launch Target', value: '5 launches by end of March' },
        ],
        catalysts: [
          'Execute satellite build and launch plan for 24-hour continuous service',
          '5 launches by end of Q1 2026 (including Dec 23, 2025 successful launch)',
          '45-60 satellites in orbit by YE2026',
          '24-hour continuous commercial service by late 2026/1H27',
          'Incremental government and enterprise revenue opportunities',
        ],
        risks: [
          'Launch schedule execution risk — historical delays in satellite industry',
          'Manufacturing capacity constraints',
          'Regulatory approval timing',
        ],
        methodology: 'EV/2030E EBITDA multiple increased to 20x (from 15x) due to higher 2030 exit EBITDA growth rate of 40%. Valuation rolled forward to reflect new year.',
        fullNotes: `KEY MODEL UPDATES:
- Revamped TAM assumptions (larger addressable market)
- Updated penetration and pricing assumptions
- Greater capex forecast driven by capacity/utilization analysis
- Lower Supplemental Coverage ARPU assumptions
- Mathematical satellite requirement modeling

LAUNCH EXECUTION TIMELINE (Illustrative):
Note: Company has not provided specific future launch dates for Bluebird 7 and beyond; these are hypothetical launch estimates.

DISCLOSURE: Deutsche Bank does and seeks to do business with companies covered in its research reports. Distributed January 2026.`
      },
      // === Nov 2025 - PT Raise to $81 (Quick Update) ===
      {
        date: '2025-11-01',
        action: 'PT Raise',
        priceTarget: 81,
        previousTarget: 63,
        rating: 'Buy',
        ratingNormalized: 'bullish',
        source: 'TipRanks',
        sourceUrl: 'https://www.tipranks.com/',
        isFullReport: false
      },
      // === Mar 4, 2025 - PT Raise $53 → $64 (FULL REPORT) ===
      {
        date: '2025-03-04',
        action: 'PT Raise',
        priceTarget: 64,
        previousTarget: 53,
        rating: 'Buy',
        ratingNormalized: 'bullish',
        reportTitle: 'Progress In Funding, MNO Agreements, & Satellite Build',
        source: 'Deutsche Bank Research',
        isFullReport: true,
        thesis: 'AST SpaceMobile has expanded its MNO footprint, accelerated the satellite build pace, and secured substantial funding ($1B in cash). We continue to believe AST\'s stock offers an asymmetrically favorable risk/reward, based on the large size of the TAM, a highly differentiated product, and a competitive position cemented by MNO relationships. PT raised to $64 from $53 (+20.8%).',
        reportSummary: `**VODAFONE DEFINITIVE AGREEMENT & JV**
AST and Vodafone signed a definitive commercial agreement in early December and announced a JV this past Monday, which should expedite the introduction of SpaceMobile service across Europe. The Vodafone commercial agreement runs through 2034, formalizes the terms for the partnership, maintains 5 year co-exclusivity, and provides a scalable framework for Vodafone to offer D2D satellite broadband service to its 340M customers in 15 countries and to network partners in 45 additional markets. The JV will cover 100% of the continent and establish a turnkey solution to efficiently facilitate interoperability with MNOs in smaller European markets. AST now has agreements/MOUs with operators covering 3B subscribers globally.

**FCC SPECIAL TEMPORARY AUTHORITY**
The FCC granted AST a Special Temporary Authority on January 30th, authorizing AST to test broadband, voice, and video service in the US with AT&T and Verizon on its BlueBird satellites. This regulatory approval represents an important step towards commercializing service in the US. The company has continued to make progress testing its service, including conducting video calls with AT&T, Verizon, Vodafone and Rakuten.

**$43M GOVERNMENT CONTRACT**
AST announced on 2/26/25 that it had secured a government contract for $43M in total revenue. Government and defense business represents an underappreciated market opportunity for the company, and it will be addressable before AST can fully commercialize consumer service.

**MODEL SUMMARY — SATELLITE BUILD**
Cumulative Commercial Satellites: 25 (2025E) → 65 (2026E) → 95 (2027E) → 115 (2028E) → 135 (2029E) → 155 (2030E)
New Satellites Launched: 10 (2025E) → 40 (2026E) → 30 (2027E) → 20 (2028E) → 20 (2029E) → 20 (2030E)

**MODEL SUMMARY — SUBSCRIBERS (000s)**
Supplemental Coverage Subs (Monthly): 1,492 (2025E) → 4,698 (2026E) → 8,222 (2027E) → 10,360 (2028E) → 11,784 (2029E)
Day Pass Units Sold (per Year): 26,102 (2025E) → 105,711 (2026E) → 217,883 (2027E) → 285,238 (2028E) → 348,087 (2029E)
Primary Broadband Subs (Monthly): 0 (2025E) → 18,032 (2026E) → 66,267 (2027E) → 99,400 (2028E) → 125,244 (2029E)

**MODEL SUMMARY — REVENUE BY SEGMENT ($M)**
Supplemental Coverage: $172.7 (2025E) → $544.1 (2026E) → $952.1 (2027E) → $1,199.7 (2028E) → $1,364.6 (2029E)
Day Pass: $125.9 (2025E) → $510.1 (2026E) → $1,051.3 (2027E) → $1,376.3 (2028E) → $1,679.5 (2029E)
Primary Broadband: $0.0 (2025E) → $216.4 (2026E) → $795.2 (2027E) → $1,192.8 (2028E) → $1,502.9 (2029E)
Government & Other: $75.0 (2025E) → $150.0 (2026E) → $270.0 (2027E) → $442.8 (2028E) → $669.5 (2029E)
Total Revenue: $373.7 (2025E) → $1,420.5 (2026E) → $3,068.6 (2027E) → $4,211.5 (2028E) → $5,216.6 (2029E)

**ARPU ASSUMPTIONS (AST's 50% Share)**
Supplemental Coverage (Monthly): $9.65
Day Pass (Daily): $4.83
Primary Broadband (Monthly): $1.00`,
        assumptions: [
          { label: 'Price Target', value: '$64.00' },
          { label: 'Prev Target', value: '$53.00' },
          { label: 'PT Change', value: '+20.8%' },
          { label: 'Stock Price (4-Mar)', value: '$28.61' },
          { label: '52-Week Range', value: '$2.01-$38.60' },
          { label: 'EPS Change', value: '-$0.67 to -$0.77 (-16.2%)' },
          { label: 'MNO Subs Coverage', value: '3.2B globally' },
          { label: 'Vodafone Agreement', value: 'Through 2034' },
        ],
        catalysts: [
          'Vodafone JV to expedite SpaceMobile service across Europe',
          'FCC STA granted Jan 30th for US broadband/voice/video testing',
          '$43M government contract secured (announced 2/26/25)',
          'Video calls completed with AT&T, Verizon, Vodafone, Rakuten',
          'Commercial service expected to begin in earnest 2026',
          '$1B cash position — fully funded through satellite build',
        ],
        risks: [
          'Execution risk on satellite manufacturing and launch schedule',
          'Commercial service timing dependent on regulatory approvals',
          'Competition from other D2D providers',
        ],
        estimates: [
          { metric: 'Revenue ($M)', fy25: '373.7', fy26: '1,420.5', fy27: '3,068.6', fy28: '4,211.5', fy29: '5,216.6', fy30: '5,216.6' },
          { metric: 'Adj. EBITDA ($M)', fy25: '187.1', fy26: '1,175.8', fy27: '2,808.9', fy28: '3,942.8', fy29: '4,940.5', fy30: '' },
          { metric: 'EBITDA Margin %', fy25: '50.1%', fy26: '82.8%', fy27: '91.5%', fy28: '93.6%', fy29: '94.7%', fy30: '' },
          { metric: 'Free Cash Flow ($M)', fy25: '(600.6)', fy26: '294.3', fy27: '1,705.7', fy28: '2,653.8', fy29: '3,476.2', fy30: '' },
          { metric: 'Capex ($M)', fy25: '(765.0)', fy26: '(570.0)', fy27: '(400.0)', fy28: '(405.0)', fy29: '(410.0)', fy30: '' },
          { metric: 'Satellites (Cumulative)', fy25: '25', fy26: '65', fy27: '95', fy28: '115', fy29: '135', fy30: '155' },
        ],
        methodology: 'Base Case valuation using 12x 2030E EBITDA discounted at 25% cost of equity. Share price targets: $26.92 (2025E) → $64.00 (2026E) → $80.00 (2027E) → $100.00 (2028E).',
        fullNotes: `VALUATION MULTIPLES TABLE:
| Metric | 2024 | 2025E | 2026E | 2027E | 2028E |
| Share Price | $21.10 | $26.92 | $64.00 | $80.00 | $100.00 |
| Growth | 249.9% | 27.6% | 137.7% | 25.0% | 25.0% |
| EOP Shares (M) | 331.0 | 339.3 | 344.0 | 344.0 | 344.0 |
| Market Cap ($M) | 6,983.3 | 9,133.8 | 22,015.0 | 27,518.8 | 34,398.5 |
| Net Debt ($M) | (558.6) | 124.5 | 1,275.2 | 980.8 | (724.8) |
| Adj Enterprise Value ($M) | 6,368.1 | 9,201.7 | 23,233.5 | 28,443.0 | 33,617.0 |

| Metric | 2024 | 2025E | 2026E | 2027E | 2028E |
| EBITDA ($M) | (147.4) | (90.0) | 187.1 | 1,175.8 | 2,808.9 |
| EV/EBITDA (CY) | — | (102.2x) | 124.2x | 24.2x | 12.0x |
| EV/EBITDA (CY+1) | 5.9x* | 7.8x* | 19.8x | 10.1x | 8.5x |

| Metric | 2024 | 2025E | 2026E | 2027E | 2028E |
| Levered FCF ($M) | (300.3) | (638.6) | (600.6) | 294.3 | 1,705.7 |
| Levered FCF Yield (CY) | — | -7.0% | -2.7% | 1.1% | 5.0% |
| Price/FCF (CY+1) | 23.7x* | 31.0x* | 74.8x | 16.1x | 13.0x |

* '27E Multiple

DISCLOSURE: Deutsche Bank does and seeks to do business with companies covered in its research reports. Distributed March 4, 2025.`
      },
      // === Sep 4, 2024 - PT Raise $22 → $63 (FULL REPORT) ===
      {
        date: '2024-09-04',
        action: 'PT Raise',
        priceTarget: 63,
        previousTarget: 22,
        rating: 'Buy',
        ratingNormalized: 'bullish',
        source: 'TipRanks',
        sourceUrl: 'https://www.tipranks.com/',
        isFullReport: true,
        thesis: 'Improving risk profile warrants re-valuation. Shifting from weighted-average scenario approach to Base Case only. Company progress on technology, commercial agreements (AT&T, Verizon), funding, and regulatory approvals justifies new methodology. Applying 12x 2030E EBITDA discounted at 25% cost of equity yields $63 PT.',
        reportSummary: `**VALUATION METHODOLOGY CHANGE — BASE CASE ONLY**
Previous approach used weighted-average of three scenarios: DB Model Case ($44/40%), Conservative Case ($10/40%), and $0 Scenario (20%). Furthermore, we valued on 20x/10x 2026E EBITDA — still very early in company lifecycle, undervaluing growth opportunity. We now derive valuation solely from Base Case model at $63. We account for execution risk via 25% cost of equity; as AST makes additional progress, we'd anticipate revisiting this assumption to reflect decreasing risk.

**PROGRESS JUSTIFYING NEW APPROACH**
(1) Proving efficacy of core technology and satellite design; (2) Completing construction and ground testing for first 5 commercial satellites (launching this month); (3) Deepening partnerships including finalizing commercial agreements with AT&T and Verizon; (4) Continuing to raise funding including non-dilutive financing and warrant redemption; (5) Obtaining regulatory approvals (namely in the US).

**VALUATION FRAMEWORK**
12x multiple on 2030E EBITDA ($4.9B) = $58.9B Enterprise Value. Net cash 2030E of $8.0B yields $66.9B Market Cap. Discounted back at 25% per year = $17.5B Market Cap 2024E. Divided by 279M shares = $62.82/share (rounded to $63 PT).

**SATELLITE LAUNCH SCHEDULE**
2024E: 5 satellites | 2025E: +20 (25 cumulative) | 2026E: +30 (55 cumulative) | 2027E: +40 (95 cumulative). AST needs 45-60 satellites for full continuous Northern Hemisphere service (US, Europe, Japan); ~90 satellites for full global service.

**REVENUE BUILD TIMELINE**
Northern Hemisphere "supplemental coverage" revenue begins 2026. Equatorial "connecting the unconnected" revenue begins 2027. Positive EBITDA in 2026 at $221M, increasing to $4.9B in 2030. FCF turns positive in 2027.

**TAM OPPORTUNITY**
Northern Hemisphere supplemental coverage: 284M mobile users (based on current MNO partners). Connecting unconnected: 1.6B people for primary broadband service. Large TAM equates to significant optionality for upside growth scenarios.`,
        assumptions: [
          { label: 'Price Target', value: '$63.00' },
          { label: 'Prev Target', value: '$22.00' },
          { label: 'Cost of Equity', value: '25.0%' },
          { label: 'EV/EBITDA Multiple', value: '12.0x' },
          { label: '2030E EBITDA', value: '$4.9B' },
          { label: '2030E EV', value: '$58.9B' },
          { label: '2030E Net Cash', value: '$8.0B' },
          { label: 'Shares O/S', value: '279M' },
        ],
        catalysts: [
          'First 5 commercial BlueBirds launching September 2024',
          'Commercial agreements finalized with AT&T and Verizon',
          'Non-dilutive funding from strategic partners',
          'Public warrant redemption completed',
          'US regulatory approvals obtained',
          'Northern Hemisphere revenue begins 2026',
          'FCF positive in 2027',
        ],
        risks: [
          'Launch failures',
          'Unforeseen technology shortcomings',
          'Increased direct competition',
          'Inability to raise funding on attractive terms',
          'Lack of demand for AST\'s service',
          'Failure to secure all necessary regulatory approvals',
          'Failure to convert MOUs into commercial contracts',
        ],
        estimates: [
          { metric: 'Satellites (Cum.)', fy24: '5', fy25: '25', fy26: '55', fy27: '95' },
          { metric: 'Revenue ($M)', fy24: '10.7', fy25: '50', fy26: '366', fy27: '1,400' },
          { metric: 'EBITDA ($M)', fy24: '(136)', fy25: '(87)', fy26: '222', fy27: '1,242' },
          { metric: 'FCF ($M)', fy24: '(184)', fy25: '(380)', fy26: '(257)', fy27: '447' },
          { metric: 'Capex ($M)', fy24: '(96)', fy25: '(385)', fy26: '(440)', fy27: '(475)' },
        ],
        methodology: '12x EV/EBITDA on 2030E ($4.9B EBITDA), discounted back at 25% cost of equity. Base Case only — discontinued weighted-average scenario approach. Implies $63/share.',
        fullNotes: `EXTENDED PROJECTIONS (2028-2030E):
- 2028E: 115 satellites, $2,977M revenue, $2,806M EBITDA, $1,823M FCF
- 2029E: 135 satellites, $4,087M revenue, $3,912M EBITDA, $2,720M FCF
- 2030E: 155 satellites, $5,082M revenue, $4,905M EBITDA, $3,534M FCF

ARPU ASSUMPTIONS (AST's 50% share):
- Supplemental Coverage: $10/month
- Day Pass: $5/day
- Primary Broadband: $1/month

FUNDING: Pro forma warrant redemption, AST has enough cash through 2025 but would have near-zero balance. Will need additional funding in 2025 — expect export financing and strategic investor prepaid revenue.

DISCLOSURE: Deutsche Bank has managed/co-managed public offering, received IB compensation. Distributed Sep 4, 2024.`
      },
      // === May 29, 2024 - Reiterate Buy, PT $22 (FULL REPORT - VZ Investment) ===
      {
        date: '2024-05-29',
        action: 'Reiterate',
        priceTarget: 22,
        rating: 'Buy',
        ratingNormalized: 'bullish',
        isFullReport: true,
        thesis: 'Verizon $100M investment further demonstrates feasibility of AST\'s business plan. AT&T + VZ partnership gives access to 64% of US postpaid lines, more than doubling TAM. Combined 850 MHz spectrum enables more robust service. Stock +69% on the day with >100M shares traded.',
        reportSummary: `**VERIZON $100M INVESTMENT BREAKDOWN**
Verizon will provide $100M in funding: $65M in prepaid commercial revenue and $35M via a 10-year convertible subordinated note ($5.75 strike, 5.5% PIK interest). This follows a similar stock reaction two weeks ago when AT&T and AST announced finalization of a definitive commercial agreement and appointment of Chris Sambar (Head of Network, AT&T) to AST's Board.

**FIVE KEY POSITIVES**
1. Further evidence of feasibility of AST's technology and ability to operationalize it
2. AT&T + Verizon = 64% of US postpaid phone lines, more than doubling US TAM vs AT&T only
3. 2024 strategic investors now include: AT&T, Google, Verizon, and Vodafone — should drive increased engagement from other prospective partners
4. Reduces AST's 2025 capital need to ~$300M (assuming capital-unconstrained build pace)
5. Combined 850 MHz spectrum from AT&T and Verizon enables more robust, available service and better user experience

**MARKET REACTION**
Stock traded up 69% on the day with over 100 million shares traded.`,
        assumptions: [
          { label: 'Price Target', value: '$22.00' },
          { label: 'Rating', value: 'Buy' },
          { label: 'VZ Prepaid Revenue', value: '$65M' },
          { label: 'VZ Convertible Note', value: '$35M' },
          { label: 'Convert Strike', value: '$5.75' },
          { label: 'Convert Interest', value: '5.5% PIK' },
          { label: 'US TAM Access', value: '64% postpaid' },
          { label: '2025 Capital Need', value: '~$300M' },
        ],
        catalysts: [
          'Verizon $100M investment ($65M prepaid + $35M convert)',
          'AT&T + VZ = 64% of US postpaid lines',
          '2024 strategic investors: AT&T, Google, Verizon, Vodafone',
          'Combined 850 MHz spectrum for robust US service',
          'Chris Sambar (AT&T Head of Network) appointed to Board',
        ],
        risks: [
          'Execution risk on technology deployment',
          'Additional funding needed in 2025',
          'Regulatory approvals still pending',
          'Competition from other DTC satellite providers',
        ],
        methodology: 'Price target unchanged at $22. This is a catalyst update note following Verizon investment announcement.',
        fullNotes: `STOCK REACTION: +69% on May 29, 2024 with >100M shares traded.

FUNDING STRUCTURE:
- $65M prepaid commercial revenue
- $35M convertible subordinated note
- 10-year term
- $5.75 strike price
- 5.5% PIK interest

2024 STRATEGIC INVESTMENTS TO DATE:
- AT&T: Commercial agreement + Board seat
- Google: Strategic investment
- Verizon: $100M ($65M prepaid + $35M convert)
- Vodafone: Strategic partner

DISCLOSURE: Deutsche Bank has managed/co-managed public offering, received IB compensation. Distributed May 29, 2024.`
      },
      // === May 16, 2024 - PT Raise $19 → $22 (FULL REPORT - AT&T Agreement) ===
      {
        date: '2024-05-16',
        action: 'PT Raise',
        priceTarget: 22,
        previousTarget: 19,
        rating: 'Buy',
        ratingNormalized: 'bullish',
        isFullReport: true,
        thesis: 'AT&T Agreement Is An Important Step and Proof Point. First definitive commercial agreement with wireless carrier finalizes terms through 2030 on revenue share model. Chris Sambar appointment to Board demonstrates AT&T confidence. Expect FCC approval imminent. PT raised to $22 from $19 due to time value as we roll forward valuation framework.',
        reportSummary: `**AT&T COMMERCIAL AGREEMENT — KEY DETAILS**
AST announced it has finalized a commercial agreement with AT&T, its first definitive agreement with a wireless carrier partner to date. The agreement runs through 2030 and formalizes terms of SpaceMobile service in the US based on a revenue share model — the foundation of AST's business model.

**STRATEGIC SIGNIFICANCE**
1. Agreement demonstrates AT&T's confidence in AST's technology and ability to execute
2. Chris Sambar (AT&T Head of Network) appointed to AST Board of Directors
3. Provides framework for additional carrier partners in other markets
4. AST believed to be close to receiving FCC approval for market access in US

**SATELLITE LAUNCH TIMELINE**
First 5 Block1 BlueBird satellites expected to reach Cape Canaveral in July/August 2024. These commercial satellites will offer "nationwide non-continuous service" in the US using low band spectrum, supporting sporadic voice, text, and data capabilities. Service expected for AT&T customers by late 2024 or early 2025.

**FUNDING SITUATION**
Management confirmed sufficient liquidity to meet needs over next 12 months with no plans to pursue a security offering in 2024. AST remains in "advanced discussions" with additional strategic partners and government/export credit agencies for potential non-dilutive financing.

**TECHNOLOGY PROGRESS**
BlueWalker 3 test satellite continues to perform well, demonstrating technology across multiple spectrum bands. Company has validated 2G, 4G, and 5G connectivity via BlueWalker 3.

**VALUATION**
We maintain our scenario-weighted valuation framework. PT raised to $22 from $19 to account for time value (rolling forward valuation). Distribution of probability across scenarios unchanged.`,
        assumptions: [
          { label: 'Price Target', value: '$22.00' },
          { label: 'Prev Target', value: '$19.00' },
          { label: 'Agreement Term', value: 'Through 2030' },
          { label: 'Model', value: 'Revenue Share' },
          { label: 'BB1 Launch', value: 'Jul/Aug 2024' },
          { label: 'Service Start', value: 'Late 2024/Early 2025' },
        ],
        catalysts: [
          'First definitive commercial agreement with AT&T (through 2030)',
          'Chris Sambar (AT&T Head of Network) appointed to Board',
          'FCC approval expected imminent',
          'First 5 BB satellites to Cape Canaveral Jul/Aug 2024',
          'Nationwide non-continuous service for AT&T customers',
          'Advanced discussions with additional strategic partners',
        ],
        risks: [
          'Technology execution risk',
          'Regulatory approval timing',
          'Competition from Starlink DTC',
          'Funding needs in 2025',
        ],
        methodology: 'Scenario-weighted valuation framework maintained. PT raised to $22 from $19 due to time value roll-forward.',
        fullNotes: `DISCLOSURE: Deutsche Bank has managed/co-managed public offering, received IB compensation. Distributed May 16, 2024.`
      },
      // === Nov 20, 2023 - Q3 2023 Update (FULL REPORT) ===
      {
        date: '2023-11-20',
        action: 'Update',
        priceTarget: 23,
        rating: 'Buy',
        ratingNormalized: 'bullish',
        source: 'Moomoo',
        isFullReport: true,
        thesis: 'Q3 2023 update with continued positive outlook on AST SpaceMobile\'s technology development and commercial progress.',
        reportSummary: `**Q3 2023 TECHNOLOGY UPDATE**
BlueWalker 3 continues to demonstrate strong performance across multiple tests. Company has successfully validated connectivity across 2G, 4G, and 5G networks with unmodified smartphones.

**COMMERCIAL PROGRESS**
MNO partnership pipeline continues to expand with over 35 agreements covering 1.8 billion subscribers. AT&T and Vodafone remain anchor partners providing spectrum access and commercial validation.

**BLUEBIRD DEVELOPMENT**
First five commercial BlueBird satellites on track for completion in 2024. These satellites will be significantly more capable than BlueWalker 3, with larger phased arrays and higher power output.

**FUNDING POSITION**
Company maintains adequate liquidity runway. Management focused on non-dilutive funding sources including export credit agencies and strategic partner prepayments.`,
        assumptions: [
          { label: 'Price Target', value: '$23.00' },
          { label: 'MNO Partners', value: '35+' },
          { label: 'Covered Subs', value: '1.8B' },
        ],
        catalysts: [
          'BlueWalker 3 successful technology validation',
          '35+ MNO agreements covering 1.8B subscribers',
          'First 5 BlueBird satellites on track for 2024',
          'AT&T and Vodafone anchor partnerships',
        ],
      },
      // === May 23, 2022 - Q1 2022 Update (FULL REPORT) ===
      {
        date: '2022-05-23',
        action: 'Update',
        priceTarget: 31,
        rating: 'Buy',
        ratingNormalized: 'bullish',
        isFullReport: true,
        thesis: 'Q1 2022 update ahead of BlueWalker 3 launch. Technology development on track with key milestones approaching.',
        reportSummary: `**BLUEWALKER 3 PREPARATION**
Company preparing for launch of BlueWalker 3 test satellite later in 2022. This will be the largest commercial communications array ever deployed in low Earth orbit, measuring 64 square meters.

**TECHNOLOGY VALIDATION AHEAD**
BlueWalker 3 will validate key technology assumptions including:
- Phased array deployment and operation in space
- Direct cellular connectivity to standard smartphones
- Multi-band operation across partner MNO spectrum
- Thermal management and power systems

**MNO PARTNERSHIP EXPANSION**
Partnership count continues to grow with new MOUs signed across multiple regions. Total addressable subscriber base through MNO partners now exceeds 1.5 billion.

**REGULATORY PROGRESS**
Working with FCC on Supplemental Coverage from Space (SCS) framework. Engaged with international regulators for global service authorization.`,
        assumptions: [
          { label: 'Price Target', value: '$31.00' },
          { label: 'BW3 Array', value: '64 sq meters' },
          { label: 'Partner Subs', value: '1.5B+' },
        ],
        catalysts: [
          'BlueWalker 3 launch preparation on track',
          'Largest commercial comms array (64 sq m) to be deployed',
          'MNO partnerships exceeding 1.5B subscribers',
          'FCC SCS framework engagement',
        ],
      },
      // === Nov 17, 2021 - Q3 2021 Update (FULL REPORT) ===
      {
        date: '2021-11-17',
        action: 'Update',
        priceTarget: 35,
        rating: 'Buy',
        ratingNormalized: 'bullish',
        isFullReport: true,
        thesis: 'Q3 2021 update following SPAC completion. Company executing on technology development roadmap with BlueWalker 3 on schedule.',
        reportSummary: `**POST-SPAC PROGRESS**
AST SpaceMobile successfully completed SPAC merger in April 2021, providing capital to execute on technology development. Company focused on BlueWalker 3 development and MNO partnership expansion.

**BLUEWALKER 3 DEVELOPMENT**
Test satellite development progressing on schedule for 2022 launch. This satellite will demonstrate key technology including:
- 64 square meter phased array antenna
- Direct-to-device cellular connectivity
- Multi-band spectrum operation

**MNO PARTNERSHIP STRATEGY**
Partnership model validated with commitments from major carriers including Vodafone, AT&T, and Rakuten. Revenue share model provides alignment of interests between AST and MNO partners.

**TECHNOLOGY DIFFERENTIATION**
AST's approach using massive phased arrays enables compliance with OOBE limits that smaller satellites cannot achieve. This regulatory compliance creates meaningful barriers to entry.`,
        assumptions: [
          { label: 'Price Target', value: '$35.00' },
          { label: 'BW3 Launch', value: '2022' },
          { label: 'Array Size', value: '64 sq m' },
        ],
        catalysts: [
          'SPAC merger completed successfully',
          'BlueWalker 3 on track for 2022 launch',
          'Vodafone, AT&T, Rakuten partnerships',
          'Technology differentiation via massive phased arrays',
        ],
      },
      // === Aug 17, 2021 - Q2 2021 Update ===
      { date: '2021-08-17', action: 'Update', priceTarget: 35, rating: 'Buy', ratingNormalized: 'bullish', isFullReport: false },
      // === Jun 30, 2021 - Initiation (FULL REPORT) ===
      {
        date: '2021-06-30',
        action: 'Initiation',
        priceTarget: 35,
        rating: 'Buy',
        ratingNormalized: 'bullish',
        reportTitle: 'Where No LEO Has Gone Before',
        source: 'Benzinga',
        sourceUrl: 'https://www.benzinga.com/',
        isFullReport: true,
        thesis: 'Initiating coverage with Buy rating and $35 price target. AST SpaceMobile represents a unique opportunity to provide cellular broadband connectivity directly to unmodified smartphones from space. The company\'s massive phased array technology differentiates it from competitors and enables regulatory compliance.',
        reportSummary: `**INVESTMENT THESIS**
AST SpaceMobile is developing a space-based cellular broadband network capable of providing connectivity directly to standard, unmodified smartphones. This "holy grail" of satellite communications has eluded the industry for decades, but AST's innovative approach using massive phased array antennas may finally make it possible.

**TECHNOLOGY DIFFERENTIATION**
Unlike competitors using smaller satellites with limited capability, AST deploys massive phased array antennas (64+ square meters) that enable:
- High-gain beams for smartphone connectivity
- Compliance with FCC Out-of-Band Emission limits
- Multi-band operation across MNO partner spectrum
- True broadband speeds (not just text/voice)

**MASSIVE TAM OPPORTUNITY**
The company targets two primary markets:
1. Supplemental Coverage: 284M mobile users in developed markets who experience coverage gaps
2. Connecting the Unconnected: 1.6B people globally without any broadband access

**MNO PARTNERSHIP MODEL**
AST's revenue share model with MNO partners provides:
- Spectrum access without AST owning spectrum
- Distribution through existing MNO customer bases
- Aligned incentives between AST and carriers
- De-risked go-to-market through established partners

**REGULATORY MOAT**
The company's technology is designed to comply with strict OOBE limits that smaller satellite designs cannot achieve. This creates meaningful barriers to entry and potential first-mover advantage in Supplemental Coverage from Space (SCS) regulation.`,
        assumptions: [
          { label: 'Price Target', value: '$35.00' },
          { label: 'Supplemental TAM', value: '284M users' },
          { label: 'Unconnected TAM', value: '1.6B people' },
          { label: 'Array Size', value: '64+ sq m' },
        ],
        catalysts: [
          'BlueWalker 3 test satellite launch (2022)',
          'Technology validation with unmodified smartphones',
          'MNO partnership expansion',
          'FCC SCS regulatory framework',
          'Commercial satellite production ramp',
        ],
        risks: [
          'Technology execution risk',
          'Regulatory approval uncertainty',
          'Competition from SpaceX and others',
          'Significant capital requirements',
          'Unproven business model at scale',
        ],
        methodology: 'Scenario-weighted DCF analysis with probability-weighted outcomes. Base case assumes successful technology deployment and commercial traction.',
      },
      // === Earlier updates (Quick Updates) ===
      { date: '2022-11-22', action: 'Update', priceTarget: 32, rating: 'Buy', ratingNormalized: 'bullish', isFullReport: false },
      { date: '2022-08-16', action: 'Update', priceTarget: 30, rating: 'Buy', ratingNormalized: 'bullish', isFullReport: false },
      { date: '2022-03-31', action: 'Update', priceTarget: 32, rating: 'Buy', ratingNormalized: 'bullish', isFullReport: false },
      { date: '2024-04-02', action: 'Update', priceTarget: 19, rating: 'Buy', ratingNormalized: 'bullish', isFullReport: false },
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // BARCLAYS - Mathieu Robilliard (Coverage since July 2021)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    firm: 'Barclays',
    analyst: 'Mathieu Robilliard',
    coverageSince: 'July 2021',
    currentPT: 60,
    currentRating: 'Underweight',
    currentRatingNormalized: 'bearish',
    reports: [
      { date: '2025-10-17', action: 'Double Downgrade', priceTarget: 60, rating: 'Underweight', ratingNormalized: 'bearish', source: 'Seeking Alpha', sourceUrl: 'https://seekingalpha.com/', isFullReport: false },
      { date: '2025-10-01', action: 'PT Raise', priceTarget: 60, previousTarget: 38, rating: 'Overweight', ratingNormalized: 'bullish', source: 'GuruFocus', sourceUrl: 'https://www.gurufocus.com/', isFullReport: false },
      // === Mar 24, 2025 - PT Raise $15 → $38 (FULL REPORT) ===
      {
        date: '2025-03-24',
        action: 'PT Raise',
        priceTarget: 38,
        previousTarget: 15,
        rating: 'Overweight',
        ratingNormalized: 'bullish',
        reportTitle: 'Raising PT to $38, reiterate Overweight',
        source: 'Barclays Equity Research',
        isFullReport: true,
        thesis: 'AST has achieved important milestones over the past 12 months. There are still significant execution and technological risks ahead (as illustrated by our downside case), but as and when AST progresses through the next steps, we see material upside. PT raised 153% from $15 to $38 based on DCF with 14% WACC.',
        reportSummary: `**IMPORTANT MILESTONES ACHIEVED**
a/ On the operational front it has successfully launched and tested its BB1 satellites; started to manufacture its BB2 satellites and secured launch for up to 60 BB2 satellites (between April 2025 - YE2026). b/ On the financing side, AST issued a $460m convertible bond (4.25% coupon) in January 2025 raising its cash balance at c. $1bn, which together with its outstanding ATM means it is fully financed until YE2025. c/ On the commercial side, it signed a definitive commercial agreement until 2034 and the creation of a JV to serve MNOs in all European markets with Vodafone. AST also signed a deal with the US government that will generate c. $43m of revenues in 2025. d/Spectrum/Regulation: AST received an STA from the FCC to commence testing its services in the US. Also AST has signed a binding agreement to lease c. 45MHz of L-band spectrum from Ligado.

**COMPETITION LOOMS BUT AST HAS UNIQUE ATTRIBUTES**
There are number of competing projects on the Direct to Device/Direct to Cellular vertical but we believe AST business model presents strong advantage vs competing projects. Its partnership from the start with MNO means a/ access to terrestrial spectrum that can be used in current smartphones b/customer billing & care outsourced to experienced MNOs and most importantly the ability to market and sale its services to their existing customer base. This is major differentiation vs. Apple's services on Globalstar which operates on L-band that is not widely available on smartphones. Starlink has signed a similar deal with TMUS than AST has with VZ/AT&T and is quickly deploying D2D/C enabled satellites. However we believe the specs of AST satellites provide a competitive advantage: a/ the size of its antennas/satellites is significantly larger than Starlink's satellite and can therefore provide a much better and reliable service. b/the signing of a deal with Ligado for 45 MHz on L-band provides much more spectrum to AST than competitors. Lastly with Starlink focused essentially on the residential broadband market and hence representing a competitive risk for telecom operators, we believe that a number of MNOs will prefer to cooperate with AST which product is complementary to their mobile services rather than with a competitor on the broadband market.

**DCF VALUATION — $38 PRICE TARGET**
Our price target is derived from a DCF model using 14% WACC and 3% terminal growth rate.
- Value of explicit cash flows (15Y): $6,999M
- Terminal value (2041E): $5,916M
- Enterprise Value: $12,916M
- Net Debt/(Net Cash) YE 2025E: $235M
- Ligado payment NPV (2026E): ($438M)
- Equity Value: $12,243M
- Shares Outstanding: 323M
- Price Target: $38
- Upside/Downside: +54%

**FLEET MODELING**
Global coverage fleet (BB1): 5 satellites maintained 2024-2034, $23M/sat
Global coverage fleet (BB2): 28 in 2025E → 55 in 2026E → 90 by 2027E (maintained through 2034), $21M/sat
Global coverage fleet (BB3): Starts 2035 with 125 satellites, $24M/sat
Global capacity fleet (BBC): 30 in 2027E → 60 by 2028E → 115 by 2040E, $22-25M/sat
Total satellites: 5 (2024) → 33 (2025E) → 60 (2026E) → 95 (2027E) → 125 (2028E) → 155 (2030E) → 240 (2040E)`,
        assumptions: [
          { label: 'Price Target', value: '$38.00' },
          { label: 'Prev Target', value: '$15.00' },
          { label: 'PT Change', value: '+153%' },
          { label: 'WACC', value: '14%' },
          { label: 'Terminal Growth', value: '3%' },
          { label: 'EV', value: '$12,916M' },
          { label: 'Equity Value', value: '$12,243M' },
          { label: 'Shares O/S', value: '323M' },
          { label: 'Market Cap', value: '$8,137M' },
          { label: 'Stock Price', value: '$25.71' },
          { label: 'Upside', value: '+47.8%' },
        ],
        catalysts: [
          'BB1 satellites successfully launched and tested',
          'BB2 manufacturing started; secured launch for up to 60 BB2 (Apr 2025 - YE2026)',
          '$460M convertible bond (4.25% coupon) Jan 2025 → cash ~$1B',
          'Fully financed until YE2025 with ATM',
          'Vodafone JV: definitive commercial agreement until 2034 for all European MNOs',
          '$43M US government deal for 2025 revenues',
          'FCC STA granted to commence US testing',
          'Ligado spectrum deal: 45MHz L-band binding agreement',
        ],
        risks: [
          'Significant execution and technological risks remain',
          'Downside case illustrates risks if milestones not achieved',
          'Competition from Starlink D2D/C enabled satellites',
          'Ligado payment NPV of $438M due 2026E',
        ],
        estimates: [
          { metric: 'Revenue ($M)', fy24: '4', fy25: '78', fy26: '228', fy27: '598', fy28: '1,256' },
          { metric: 'EBITDA ($M)', fy24: '(179)', fy25: '(112)', fy26: '(48)', fy27: '314', fy28: '958' },
          { metric: 'Net Income ($M)', fy24: '(521)', fy25: '(262)', fy26: '(255)', fy27: '(9)', fy28: '570' },
          { metric: 'Diluted EPS', fy24: '($1.9)', fy25: '($0.8)', fy26: '($0.8)', fy27: '($0.0)', fy28: '$1.8' },
          { metric: 'FCF ($M)', fy24: '(300)', fy25: '(792)', fy26: '(1,238)', fy27: '(600)', fy28: '115' },
          { metric: 'Capex ($M)', fy24: '(174)', fy25: '(631)', fy26: '(615)', fy27: '(785)', fy28: '(721)' },
          { metric: 'Satellites', fy24: '5', fy25: '33', fy26: '60', fy27: '95', fy28: '125' },
        ],
        methodology: 'DCF model with 14% WACC and 3% terminal growth rate. 15-year explicit cash flow period through 2041E. Equity value of $12,243M divided by 323M shares = $38 PT.',
        fullNotes: `ESTIMATE CHANGES (New vs Old):
| Metric | 2025E New | 2025E Old | Change |
| Revenue | $78M | $34M | +131% |
| Revenue 2026E | $228M | $144M | +59% |
| Revenue 2027E | $598M | $345M | +73% |
| EBITDA 2027E | $314M | $90M | +247% |
| Net Income 2028E | $570M | $175M | +226% |

MARKET MULTIPLES:
| Metric | 2024 | 2025E | 2026E | 2027E | 2028E | 2029E | 2030E |
| P/E (x) | -14.3 | -32.2 | -33.8 | 401.5 | 13.2 | 7.2 | 4.8 |
| EV/EBITDA (x) | -38.7 | -73.1 | -195.8 | 32.1 | 10.4 | 4.9 | 2.9 |
| EFCF yield (%) | -2.3% | -9.1% | -8.5% | -7.6% | -0.5% | 8.3% | 22.7% |

CASH FLOW PROJECTIONS (2029E-2030E):
| Metric | 2029E | 2030E |
| Revenue | $2,206M | $2,875M |
| EBITDA | $1,884M | $2,524M |
| Net Income | $1,085M | $1,603M |
| FCF | $673M | $1,822M |
| Diluted EPS | $3.4 | $5.0 |

SATELLITE COST ASSUMPTIONS:
- BB1: $23M per satellite
- BB2: $21M per satellite
- BB3: $24M per satellite
- BBC (capacity): $22-25M per satellite

DISCLOSURE: Barclays Capital Inc. and/or one of its affiliates does and seeks to do business with companies covered in its research reports. Completed: 23-Mar-25, 19:26 GMT. Released: 24-Mar-25, 04:00 GMT.`
      },
      { date: '2022-11-15', action: 'Update', priceTarget: 15, rating: 'Overweight', ratingNormalized: 'bullish', isFullReport: false },
      { date: '2022-10-19', action: 'Update', priceTarget: 15, rating: 'Overweight', ratingNormalized: 'bullish', reportTitle: 'To Infinity and Beyond – Vol 2', source: 'StreetInsider', sourceUrl: 'https://www.streetinsider.com/', isFullReport: false },
      {
        date: '2021-07-12',
        action: 'Initiation',
        priceTarget: 29,
        rating: 'Overweight',
        ratingNormalized: 'bullish',
        reportTitle: 'Bridging Space and Earth',
        source: 'Benzinga',
        sourceUrl: 'https://www.benzinga.com/',
        isFullReport: true,
        thesis: 'Initiating coverage with Overweight rating. AST SpaceMobile\'s technology could bridge the digital divide by providing cellular connectivity from space directly to unmodified smartphones.',
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // B. RILEY SECURITIES - Mike Crawford (Coverage since October 2022)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    firm: 'B. Riley Securities',
    analyst: 'Mike Crawford',
    coverageSince: 'October 2022',
    currentPT: 105,
    currentRating: 'Neutral',
    currentRatingNormalized: 'neutral',
    reports: [
      { date: '2026-01-13', action: 'Downgrade', priceTarget: 105, previousTarget: 95, rating: 'Neutral', ratingNormalized: 'neutral', source: 'MT Newswires', isFullReport: false, reportSummary: 'Downgraded to Neutral from Buy. PT raised to $105 from $95. Analyst notes sufficient time to evaluate potential drivers of additional upside in 2026 as company launches and integrates more productive Block 2 BlueBird satellites into its D2D constellation.' },
      { date: '2025-10-23', action: 'PT Raise', priceTarget: 95, previousTarget: 60, rating: 'Buy', ratingNormalized: 'bullish', source: 'GuruFocus', sourceUrl: 'https://www.gurufocus.com/', isFullReport: false },
      { date: '2025-08-01', action: 'PT Raise', priceTarget: 60, previousTarget: 44, rating: 'Buy', ratingNormalized: 'bullish', source: 'Yahoo Finance', sourceUrl: 'https://finance.yahoo.com/', isFullReport: false },
      { date: '2025-06-16', action: 'PT Raise', priceTarget: 44, previousTarget: 15, rating: 'Buy', ratingNormalized: 'bullish', source: 'Yahoo Finance', sourceUrl: 'https://finance.yahoo.com/', isFullReport: false },
      { date: '2022-11-15', action: 'Update', priceTarget: 15, rating: 'Buy', ratingNormalized: 'bullish', isFullReport: false },
      // === Oct 27, 2022 - Initiation of Coverage $15 (FULL REPORT - 18 pages) ===
      {
        date: '2022-10-27',
        action: 'Initiation',
        priceTarget: 15,
        rating: 'Buy',
        ratingNormalized: 'bullish',
        reportTitle: 'ASTS Aims to Close Digital Divide with Space-Based Cellular Broadband Network—Initiating at Buy, $15 PT',
        source: 'B. Riley Securities Research',
        isFullReport: true,
        thesis: 'We initiate coverage of AST SpaceMobile, Inc. (ASTS) with a Buy rating and a 12-month price target of $15 per share. ASTS went public in April 2021 via a business combination with New Providence Acquisition Corp., a SPAC where nearly the entire $232M of cash rolled from the trust, plus another $230M from PIPE investors led by ASTS\'s strategic partners Rakuten, Vodafone, and American Tower. Backed by proprietary IP, including some 2,400 patented and pending claims, ASTS is constructing a global space-based cellular broadband network enabled by large, revolutionary pizza box-shaped satellites serving as radio repeaters in low Earth orbit (LEO) space. The company\'s first such satellite, BlueWalker 3 (BW3), is now hurtling through space at 17,000 mph, circumnavigating the Earth every 90 minutes after launching on a SpaceX Falcon 9 rideshare on September 10, and with ASTS ready to perform a critical phased array unfolding maneuver to deploy the 693-square-foot payload.',
        reportSummary: `**SUMMARY AND RECOMMENDATION**
ASTS strives to connect the billions of unconnected individuals, as well as the billions of mobile subscribers moving in and out of cellular coverage zones, not competing against but partnering with mobile network operators (MNOs) in a wholesale, B2B business model featuring revenue share with MNO partners and low to no subscriber acquisition costs (SAC) for ASTS. Moreover, the SpaceMobile network is designed to operate directly with existing, unmodified mobile devices and without any separate costly ground antenna. We believe BW3 will withstand structural dynamics, thermal management, and other cellular-to-satellite link challenges, demonstrating a successful network architecture, which ASTS intends to begin deploying in 2023 with the launch of five "Block 1 BlueBird" satellites, enabling initial service. To be sure, the global market is massive—including 5.3B unique cellular subscribers, plus another 2.6B people who remain unconnected—and with ASTS already talking with 25 MNOs representing 1.8B potential mobile subscribers. Our $15 PT equates to a $3.0B EV at the end of FY23e.

**KEY POINTS**

• Billions upon billions. Just as Carl Sagan sent the first physical messages into space and searched for life among billions upon billions of stars, ASTS founder Abel Avellan wants to connect billions of people on Earth—both the currently unconnected and those roaming outside of terrestrial cell service coverage—and to potentially generate billions of dollars of profits for AST SpaceMobile investors in the process.

• Ample runway to revenue. ASTS carried $197M net cash on its books at 2Q22 and offset most of its 3Q operational burn with $27M received in early September, following the close of the sale of its 51% majority-owned NanoAvionics satellite manufacturing subsidiary to Kongsberg Defense (at a 3.6x LTM EV/revenue multiple no less), deemed surplus to requirements given that ASTS now is capable of producing two satellites/month with its 35,000 square feet of clean-room manufacturing capacity at its Midland, Texas, headquarters. Additionally, ASTS is readying an adjacent facility that, when placed into production, is expected to bring clean-room capacity to 135,000 square feet, lifting production capacity to six satellites/month.

• Unfettered connectivity. If SpaceMobile service works as expected, we believe ASTS will have a killer application and go on to be a multi-billion-dollar stock. We see the utility of unfettered connectivity via satellite outside of existing, limited cellular footprints as without question. We also believe a planned 50-50 incremental revenue share with MNO partners is reasonable and sustainable. Consider, to provide a sense of scale, that just a 10% penetration of existing engaged MNOs and an incremental $2/month gross revenue share to the partners would result in over $2B in revenue annually for ASTS.

• Smart money. We look at Vodafone, Rakuten, and American Tower as early and repeat strategic investors, with these three (along with Samsung) comprising ASTS's $111M Series B round before coming back for another bite in the $230M business combination PIPE. We doubt Hiroshi Mikitani, the billionaire founder and CEO of Rakuten, which owns 17% of the company, would continue to invest in ASTS without performing extensive due diligence. In the same vein, Vodafone (bringing its 265M mobile subscribers) has not just an MOU with ASTS but also mutually exclusive rights in most of its markets.

**BLUEWALKER 3 TEST SATELLITE**
ASTS began construction of its BW3 test satellite in 2H19 following its Series B round, investing a total of ~$87M, much of which was related to one-time R&D expenditures that are not expected to show up in future commercial satellite costs, which we estimate are running at around $16M each for the Block 1 BlueBirds. On September 10, 2022, ASTS successfully launched BW3, the largest commercial communications array ever deployed to LEO. ASTS engineers made contact with BW3 less than an hour after takeoff, and BW3 is now circling the Earth, thermally stable, and communicating with ground stations.

CEO Abel Avellan tweeted on October 5 that the company planned to unfold the ~1,500 kg, 64-square-meter (693-square-foot) phased array satellite, which was folded into a cube to fit in the rocket, "in the second half of October during optimal conditions," a timeline that now has pushed to "on or about November 10" given optimal solar power generation conditions for deployment. This deployment mission, when accomplished, will orient the satellite's array of antenna elements pointing down toward Earth and its solar elements facing the Sun, and we see successful array deployment as a near-term positive catalyst for ASTS shares.

**SPACEMOBILE SERVICE MODEL**
ASTS is going to market with MNOs under a 50-50 revenue share model to offer SpaceMobile directly to partners' existing mobile subscribers, seamless to the end user. As envisioned, subscribers roaming beyond terrestrial cellular footprints will receive text messages to their phones asking if they would like to turn on SpaceMobile service. On top of this envisioned "day pass" offering, ASTS and its partners are exploring a monthly add-on tier for consumers and enterprises where, for a fixed monthly rate, users can add SpaceMobile as a supplemental service to their existing cellular plans, enabling users' devices to automatically connect to the SpaceMobile network upon entering areas without terrestrial cell coverage.

**CONSTELLATION BUILD PLAN**
While BB1 through BB5 will each be similar in size and weight to BW3, we believe ASTS will look to launch larger arrays in subsequent batches, starting with a next-gen or Block 2 of BlueBirds where ASTS hopes to demonstrate 1.3M GB/month of capacity from each satellite, and eventually building up to 2x the size of BW3 per initial BB business plans, implying a targeted endpoint of ~128-square-meter phased array satellites that will weigh more than 3,000 kg each.

• By the time ASTS has 20 commercial BBs in orbit, we believe in early 2025, ASTS expects to be able to deliver service to 49 countries along the equator, addressing an ~1.6B population
• 110-satellite constellation expected to enable full global mobile coverage for major MNO partners
• Final 58-satellite batch would bring constellation to 168 BBs for full global MIMO coverage with faster data rates

**COMPETITOR ANALYSIS**
• Lynk Global: Closest pure-play competitor with similar MNO partnership model. Claims 15 commercial contracts covering 36 countries representing >240M subscribers. Behind ASTS in development; link-challenged given undersized antenna aperture compared with family-sized BlueBird satellites.
• Skylo Technologies: NB-IoT connectivity focus using existing Inmarsat GEO satellites. Raised $116M through two rounds. Not compatible with standard cell phones.
• Sateliot: Spanish startup focused on 5G NB-IoT devices. Raised €10M Series A; needs additional ~$100M for full 250-satellite constellation.
• Omnispace: Owns near-global 2 GHz spectrum assets. Operating two LEO prototypes; targeting 200 LEO + 15 MEO satellites operational in 2024.
• SpaceX/T-Mobile: Announced Starlink V2 direct-to-cellular for text messaging in August 2022.
• Apple/Globalstar: First mover with Emergency SOS from space on iPhone 14.

**LONG-TERM REVENUE POTENTIAL**
Potential constellation-build ROI remains stellar. ASTS's B2B wholesale business model with revenue share and links to existing, unmodified endpoints means the company spends essentially nothing on subscriber acquisition cost. We believe ARPU assumptions of $7–$8 per month in the U.S. and Europe, combined with a $1 cost to users in poorer equatorial regions and perhaps $2/month in the rest of the world, work to ASTS being able to generate over $9B revenue if it hits its 373M-subscriber number.

We see little reason why cash opex should scale much beyond $200M given the sheer amount of manufacturing and engineering resources ASTS already has at its disposal and with little need for a larger sales, billing, or customer services footprint given the company's super wholesale model. This means most of ASTS' revenue, after covering fixed costs, flows straight to operating income, with the potential at scale to attain 90%+ EBITDA margins.

Although ASTS at something approaching a steady state will start having to replace its satellites, BlueBirds currently are designed to an expected operational life exceeding seven years. Even if ASTS had to replace 20% of its constellation every year, this would mean building and launching ~37 BlueBirds per year, at around a $600M expense.`,
        assumptions: [
          { label: 'Price Target', value: '$15.00' },
          { label: 'Stock Price (10/26/22)', value: '$6.14' },
          { label: '52-Week Range', value: '$4.84-$14.27' },
          { label: 'Market Cap', value: '$1,123.4M' },
          { label: 'Enterprise Value', value: '$918.4M' },
          { label: 'Shares Out', value: '183.0M' },
          { label: 'Float', value: '67.2%' },
          { label: 'Valuation Basis', value: '$3.0B EV at end of FY23e' },
          { label: 'Satellite Cost (Block 1)', value: '~$16M per satellite' },
          { label: 'Full Constellation Cost Est', value: '$2.0-2.7B (168 satellites)' },
          { label: 'MNO Partners', value: '25 MNOs representing 1.8B subs' },
        ],
        catalysts: [
          'BlueWalker 3 phased array deployment (693 sq ft) - November 2022',
          'BW3 in-orbit testing with AT&T, Vodafone, Rakuten, Orange - Q4 2022',
          'Block 1 BlueBird (BB1-BB5) launch expected 2H23',
          'Initial time-limited SpaceMobile service - Q4 2023',
          'Expansion to 20 satellites for equatorial coverage - early 2025',
          '110 satellites for full global MNO partner coverage',
          'Ethiopia early-access market via Vodafone/Safaricom partnership',
        ],
        risks: [
          'History of operating losses — no assurance of sustained profitability',
          'Capital-intensive business — significant expenses for constellation development',
          'Third-party launch provider dependency — delays or price increases',
          'SpaceMobile service still in development — not yet commercialized',
          'Capital access — needs additional funds for full constellation deployment',
          'Regulatory approvals required in each country for landing rights',
          'Reliance on MNO partners for spectrum access and revenue generation',
          'Competition from Starlink, Lynk Global, Apple/Globalstar and others',
          'Currency exchange risk from international MNO agreements',
        ],
        estimates: [
          { metric: 'Revenue ($M)', fy22: '9.7', fy23: '1.0', fy24: '23.9' },
          { metric: 'EBITDA ($M)', fy22: '(131.2)', fy23: '(157.2)', fy24: '(152.2)' },
          { metric: 'EV/Revenue', fy22: '49.1x', fy23: '1,193.3x', fy24: '61.9x' },
          { metric: 'EV/EBITDA', fy22: '(7.5)x', fy23: '(7.8)x', fy24: '(10.0)x' },
          { metric: 'Net Cash (2Q22)', value: '$197M' },
        ],
        methodology: '$15 PT represents $3.0B EV at end of FY23e. Business model assumes 50-50 revenue share with MNOs, minimal SAC due to wholesale model. At scale, 90%+ EBITDA margins achievable. ARPU: $7-8/month US/Europe, $1-2/month developing markets. 10% penetration of engaged MNOs = $2B+ annual revenue for ASTS.',
        fullNotes: `FOUNDING AND FUNDING HISTORY:
• January 2017: Abel Avellan provided $6M seed funding (six months after selling EMC for $550M)
• June 2018: $10M Series A from Cisneros
• 2019-2020: $111M Series B led by Rakuten ($79M), Vodafone ($25M), American Tower ($6M), Samsung Next ($1M)
• April 2021: Business combination with New Providence Acquisition Corp. — $232M cash roll + $230M PIPE
• September 2022: $27M from NanoAvionics sale to Kongsberg Defense at 3.6x LTM EV/revenue
• Total shares: 53M Class A, 52M Class B, 78M Class C (super-voting held by CEO Avellan = 88.3% voting power)

BALANCE SHEET DATA (2Q22):
• Cash & Equivalents: $202.4M
• Accounts Receivable: $3.6M
• Accounts Payable: $13.8M
• Total Debt: $4.9M
• Shareholders' Equity: $310.3M

MANUFACTURING CAPABILITIES:
• Current: 35,000 sq ft clean-room at Midland, Texas HQ = 2 satellites/month capacity
• Expansion: Adjacent facility to bring capacity to 135,000 sq ft = 6 satellites/month
• Block 1 BlueBird cost: ~$16M per satellite (up 14% due to inflation)
• 168-satellite full constellation: $2.0-2.7B total capex

NOKIA PARTNERSHIP:
• Five-year partnership for critical network infrastructure
• AirScale portfolio integration into ground station gateways
• AirScale Baseband module: up to 90k simultaneous connected users per box
• AirScale Single RAN: 4G and 5G integration
• NetAct solution for network management
• Nokia Bell Labs engineering support

LANDING RIGHTS SECURED:
• FCC experimental license (May 2022): Texas and Hawaii landing rights for BW3
• Countries with L Band and V Band frequency landing rights: Nigeria, Kenya, Papua New Guinea, and 4 others
• Test licenses in 10 additional countries including Japan (expected imminent)
• Ethiopia expected via Vodafone/Safaricom $850M license ($8B investment pledge)

SATELLITE SERVICES COMPS (FY23E):
| Company | EV/Sales | EV/EBITDA | EBITDA Margin |
| Eutelsat | 4.1x | 5.6x | 76.0% |
| Globalstar | 5.2x | 98.8x | 29.0% |
| Iridium | 17.1x | 10.3x | 59.8% |
| EchoStar | 2.8x | 2.5x | 31.2% |
| SES | 5.9x | 5.6x | 55.4% |
| Sirius XM | 3.8x | 11.3x | 31.1% |
| Viasat | 3.8x | 6.2x | 25.1% |
| Median | 3.8x | 6.2x | 31.2% |

MANAGEMENT TEAM:
• Abel Avellan (Founder, Chairman, CEO): 25+ years space industry; inventor on 24 US patents; founded EMC (sold for $550M in 2016)
• Sean Wallace (CFO): Former VP/CFO/Treasurer at Cogent Communications; 30+ years finance experience
• Dr. Huiwen Yao (CTO): Former Northrop Grumman; 55+ technical papers; 2 US patents
• Scott Wisniewski (EVP, Chief Strategy Officer): Former Barclays TMT Investment Banking MD; helped raise $3B for OneWeb
• Shanti Gupta (SVP, Chief Accounting Officer): Former EY partner; 25+ years experience

BOARD OF DIRECTORS:
• Mickey (Hiroshi) Mikitani: Founder/Chairman/CEO of Rakuten Group
• Luke Ibbetson: Head of Group R&D for Vodafone; NGMN Alliance Board Strategy Chairman
• Adriana Cisneros: CEO of Cisneros
• Tareq Amin: CEO of Rakuten Mobile
• Ed Knapp: CTO of American Tower
• Richard Sarnoff: Partner at KKR
• Ronald Rubin: Co-founder Tower Alliance & Southcom Holdings
• Alexander Coleman: Chairman New Providence Acquisition Corp. II

DISCLOSURE: B. Riley Securities, Inc. Mike Crawford, Senior Research Analyst. (310) 689-2241. October 27, 2022. Technology: Communications. Discovery Group.`
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // UBS - Christopher Schoell (Coverage since March 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    firm: 'UBS',
    analyst: 'Christopher Schoell',
    coverageSince: 'March 2025',
    currentPT: 43,
    currentRating: 'Neutral',
    currentRatingNormalized: 'neutral',
    reports: [
      // === Sep 9, 2025 - Downgrade (FULL REPORT) ===
      {
        date: '2025-09-09',
        action: 'Downgrade',
        priceTarget: 43,
        previousTarget: 62,
        rating: 'Neutral',
        ratingNormalized: 'neutral',
        source: 'Seeking Alpha',
        sourceUrl: 'https://seekingalpha.com/',
        isFullReport: true,
        thesis: 'Downgrading to Neutral from Buy with PT cut to $43 from $62. Starlink competitive threat has increased materially following SpaceX\'s expanded DTC beta and carrier partnerships.',
        reportSummary: `**DOWNGRADE RATIONALE**
We are downgrading ASTS to Neutral from Buy and cutting our PT to $43 from $62. While we remain constructive on the long-term DTC opportunity, near-term competitive dynamics have shifted unfavorably following SpaceX's accelerated Starlink DTC rollout and expanded carrier partnerships.

**STARLINK COMPETITIVE THREAT**
SpaceX has made faster-than-expected progress on Starlink direct-to-cell:
- Expanded beta service to additional carriers
- Demonstrated text messaging capability at scale
- Secured regulatory approvals in multiple markets
- Announced plans for voice and data service expansion

**VALUATION RESET**
We are reducing our multiple from 11x to 9x 2028E EBITDA to reflect increased competitive risk. Our new $43 PT implies meaningful upside from current levels but acknowledges higher uncertainty around market share assumptions.

**MAINTAINING CONSTRUCTIVE VIEW**
Despite the downgrade, we believe ASTS technology offers differentiated capabilities (true broadband vs text-only) that should enable meaningful market share. However, the competitive environment warrants a more cautious stance.`,
        assumptions: [
          { label: 'Price Target', value: '$43.00' },
          { label: 'Prev Target', value: '$62.00' },
          { label: 'EV/EBITDA Multiple', value: '9x (was 11x)' },
          { label: 'Discount Rate', value: '14%' },
        ],
        risks: [
          'Starlink competitive pressure increasing',
          'Market share assumptions at risk',
          'Execution risk on commercial launch',
          'Regulatory uncertainty in key markets',
        ],
      },
      // === Aug 14, 2025 - PT Raise to $62 (FULL REPORT) ===
      {
        date: '2025-08-14',
        action: 'PT Raise',
        priceTarget: 62,
        previousTarget: 38,
        rating: 'Buy',
        ratingNormalized: 'bullish',
        source: 'GuruFocus',
        sourceUrl: 'https://www.gurufocus.com/',
        isFullReport: true,
        thesis: 'ASTS made progress on several fronts in recent months and its partners lend credibility to its tech/funding. Our PT is now based on 11x \'28E EBITDA discounted back at 14%. This sits toward the high-end of satellite comps (7-12x over past 5 yrs). Prior PT was based on 9x \'28E EBITDA (discounted at 14%) but we believe a higher multiple is justified given regulatory, partner & funding progress and faster LT growth.',
        reportSummary: `**BUY RATED**
ASTS made progress on several fronts in recent months and its partners lend credibility to its tech/funding. Our PT is now based on 11x '28E EBITDA discounted back at 14%. This sits toward the high-end of satellite comps (7-12x over past 5 yrs). Prior PT was based on 9x '28E EBITDA (discounted at 14%) but we believe a higher multiple is justified given regulatory, partner & funding progress and faster LT growth.

**KEY PROGRESS POINTS**
1. FCC approved initial space-based operations
2. First 5 commercial satellites delivered to Florida
3. 1H September 2024 launch imminent
4. 17 Block 2 satellites in production
5. 45+ carrier agreements serving 2.8B+ subs
6. Government traction increasing

**ESTIMATE CHANGES**
- 2028E Revenue: $1.8B (was $1.1B) — effectively pulls forward 2030 estimate by 2 years
- 2028E EBITDA Margin: ~70% (was ~60%)
- Multiple: 11x (was 9x)

**TAM FRAMEWORK**
Method 1 (Partner subs): 2.8B subs × 5-15% penetration × $5-15/pass × 50% rev share = $500M-$3B
Method 2 (Capacity): 100 sats × 1M GB/sat/mo × $2.5-5/GB = $4-8B/yr at full utilization

Prior base case implied ~15% utilization. Upside scenarios assume higher utilization driven by multiple use cases including government.`,
        assumptions: [
          { label: 'Price Target', value: '$62.00' },
          { label: 'Prior Target', value: '$38.00' },
          { label: 'Stock Price', value: '$20.81' },
          { label: 'EV/EBITDA Multiple', value: '11x (was 9x)' },
          { label: 'Discount Rate', value: '14%' },
          { label: '2028E Revenue', value: '$1.8B (was $1.1B)' },
          { label: '2028E EBITDA Margin', value: '~70% (was ~60%)' },
          { label: 'Funding Need', value: '$275-325M' },
        ],
        catalysts: [
          'FCC approved initial space-based operations',
          'First 5 commercial satellites delivered to Florida',
          '1H September 2024 launch imminent',
          '17 Block 2 satellites in production',
          '45+ carrier agreements serving 2.8B+ subs',
          'Government traction increasing',
        ],
        risks: [
          'Launch execution risk',
          'Technology scaling challenges',
          'Funding requirements ($275-325M for 25 satellites)',
          'Competitive dynamics',
          'Regulatory approvals in international markets',
        ],
        estimates: [
          { metric: 'Revenue ($M)', fy24: '3,650', fy25: '20,535', fy26: '420,468', fy27: '973,814', fy28: '1,787,923' },
          { metric: 'EBIT ($M)', fy24: '(214,757)', fy25: '(255,282)', fy26: '(35,221)', fy27: '120,995', fy28: '620,771' },
          { metric: 'EPS (diluted)', fy24: '($1.13)', fy25: '($0.97)', fy26: '($0.33)', fy27: '$0.38', fy28: '$1.93' },
          { metric: 'Net debt/cash ($M)', fy24: '75,839', fy25: '(120,778)', fy26: '(413,958)', fy27: '(433,025)', fy28: '16,066' },
        ],
        methodology: '11x 2028E EBITDA discounted back at 14%. Higher multiple (vs 9x prior) justified by regulatory approval, partner progress, and faster growth trajectory. Sits at high-end of satellite comps (7-12x range).',
        fullNotes: `ESTIMATE CHANGES:
- 2028E Revenue: $1.8B (was $1.1B) — effectively pulls forward 2030 estimate by 2 years
- 2028E EBITDA Margin: ~70% (was ~60%)
- Multiple: 11x (was 9x)

TAM FRAMEWORK:
Method 1 (Partner subs): 2.8B subs × 5-15% penetration × $5-15/pass × 50% rev share = $500M-$3B
Method 2 (Capacity): 100 sats × 1M GB/sat/mo × $2.5-5/GB = $4-8B/yr at full utilization

Prior base case implied ~15% utilization. Upside scenarios assume higher utilization driven by multiple use cases including government.

FUNDING:
$275-325M needed to launch 25 satellites (down from $350-400M prior). Expect capital raise in 2025.

DISCLOSURE: UBS does and seeks to do business with companies covered in its research reports.`
      },
      // === Aug 14, 2024 - Initiation at $30 (FULL REPORT) ===
      {
        date: '2024-08-14',
        action: 'Initiation',
        priceTarget: 30,
        rating: 'Buy',
        ratingNormalized: 'bullish',
        isFullReport: true,
        thesis: 'Initiating coverage with Buy rating and $30 price target. ASTS represents a unique investment opportunity in the emerging direct-to-device satellite market.',
        reportSummary: `**INITIATION OF COVERAGE**
We are initiating coverage of AST SpaceMobile with a Buy rating and $30 price target. The company is positioned to capture a significant share of the emerging direct-to-device (DTC) satellite market.

**INVESTMENT THESIS**
ASTS offers differentiated technology that enables true broadband connectivity to standard smartphones from space. Unlike competitors limited to text messaging, ASTS satellites can deliver 4G/5G data speeds for browsing, streaming, and video calls.

**VALUATION**
Our $30 PT is based on 9x 2028E EBITDA discounted back at 14%. This sits at the mid-range of satellite comps (7-12x over past 5 years).

**KEY CATALYSTS**
- First 5 commercial BlueBird satellites launching September 2024
- US commercial service expected late 2024/early 2025
- Continued MNO partnership expansion
- Government contract opportunities`,
        assumptions: [
          { label: 'Price Target', value: '$30.00' },
          { label: 'EV/EBITDA Multiple', value: '9x' },
          { label: 'Discount Rate', value: '14%' },
        ],
      },
      { date: '2025-03-05', action: 'PT Raise', priceTarget: 38, rating: 'Buy', ratingNormalized: 'bullish', isFullReport: false },
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SCOTIABANK - Andres Coello (Coverage since August 2024)
  // FULL DETAILED REPORTS PRESERVED
  // ═══════════════════════════════════════════════════════════════════════════
  {
    firm: 'Scotiabank',
    analyst: 'Andres Coello',
    coverageSince: 'August 2024',
    currentPT: 45.60,
    currentRating: 'Sector Underperform',
    currentRatingNormalized: 'bearish',
    reports: [
      // === Jan 6, 2026 - Downgrade to Sector Underperform (FULL REPORT) ===
      // Title: "Downgrading to Sell on Valuation: Starlink's Space Leadership Means ASTS Faces an Uphill Battle"
      {
        date: '2026-01-06',
        action: 'Downgrade',
        priceTarget: 45.60,
        rating: 'Sector Underperform',
        ratingNormalized: 'bearish',
        source: 'Scotiabank Equity Research',
        isFullReport: true,
        reportTitle: 'Downgrading to Sell on Valuation: Starlink\'s Space Leadership Means ASTS Faces an Uphill Battle',
        thesis: 'Downgrade to Sector Underperform. Stock at $97.49 ($35.8B market cap) has overshot to irrational levels. Still no retail customers, needs ~50 satellites for continuous service (late 2026/early 2027). Slow U.S./Japan adoption (KDDI only 6%), modest ARPUs ($2.92 vs Starlink $85), high capex mean EFCF may not come until 2028-29. Starlink\'s accelerated growth poses existential competitive threat with 2-year head start. 5-year delay (110 sats by 2023 → now 2027/2028) gave Starlink time to become absolute leader. Valuation range: $45-55/share.',
        reportSummary: `**OUR TAKE: Negative**
Without yet a single retail customer and faced by the challenge of orbiting ~50 satellites to hit continuous service in a handful of markets in late 2026 or early 2027, ASTS's share price at US$97.49/share has once again overshot to what we see as irrational levels (market cap of US$35.8B).

**SLOW ADOPTION & HIGH CAPEX**
Evidence of slow user adoption in the U.S. and Japan, modest ARPUs and high capex (including duplicated satellites for new frequencies) means investors may have to wait until 2028 or 2029 for tangible EFCF generation. ASTS commercial launch in U.S. may have to wait until early 2027, while carriers overseas may have to wait until 2028 or 2029.

**KDDI JAPAN: ONLY 6% ADOPTION**
Early figures by KDDI in Japan suggest only 6% of the wireless base subscribed to the new service (launched earlier last year). Japan is a highly penetrated market with impressive tower density (KDDI operates more towers than Vivo or TIMB in Brazil, a country with 21x Japan's landmass). DTC opportunity in other territories such as the Americas should be greater, but 225M paid subscribers by 2028 looks aggressive.

**STARLINK COMPETITIVE THREAT**
Starlink's accelerated fixed growth and global brand recognition means ASTS competes with a leader that already has, in terms of revenues, the equivalent of 340 million global DTC users (~680 million by the time ASTS launches in select markets). While it has been an ordeal for ASTS to launch seven satellites since 2017, in 2025 alone Starlink orbited 3,126 units. Starlink's ARPU is $85/month — 34x greater than ASTS's modest $2.5/month blended ARPU.

**STARLINK'S NETFLIX-LIKE GROWTH**
What made Netflix such a powerful substitute wasn't only superior technology and UI, but the ability to dilute content costs among a global base, making it virtually impossible for local broadcasters to compete. Starlink has similar characteristics: easy install (15 minutes), autonomous from utilities, long-reach modem, cleaner product (fewer cables). At current growth rate, Starlink could have 20M subs a year from now. In 47 days, Starlink added 1M subs (8M→9M from Nov 5 to Dec 22, 2025) — what took a full year in 2022-2023.

**STARLINK 2-YEAR ADVANTAGE**
Starlink has a two-year advantage over ASTS, which may lose customers impatient to get service. Starlink operates 650 DTC satellites. Recent partnerships with Liberty LatAm (Jamaica, Melissa emergency), Virgin-O2 UK (Telefónica/Liberty Global) suggest some carriers with ASTS MOUs may not wait until 2027-2028 for DTC service. EchoStar deal adds 10 MHz AWS H-Block + 40 MHz AWS-4 + global MSS licenses with optimized 5G protocols.

**NEXT-GEN STARLINK DTC**
Next generation of DTC satellites will feature custom SpaceX silicon, advanced phased array antennas, thousands of spatial beams, delivering 20x higher throughput per satellite and 100x overall system capacity, enabling a 5G experience. DTC sats operate at 360km altitude, connect to Starlink's broader laser mesh network of over 9,000 satellites, and function as cell towers in space with regenerative architecture. This is a particular differentiating advantage over ASTS, which lacks a fixed constellation for wireless meshing.

**48-HOUR DELAY = FALLING FURTHER BEHIND**
"To be clear, as little as a 48-hour delay (let alone weeks or months) means ASTS will fall further behind Starlink, which is completing a mission every one to two days." Starlink guiding to launch first Starship load soon (satellites expelled like bread from a toaster); next-gen DTC satellites 100x more powerful than current 650.

**MEXICO / TELCEL RISK**
Concerned about Starlink's coming launch in Mexico, home to América Móvil (world's 4th-largest wireless company). If Starlink succeeds in partnering with Telcel, sell-side analysts may have to slash their subs projections for ASTS in South America and Southeast Europe.

**SPECTRUM LIMITATION**
ASTS satellites can only operate in low spectrum, requiring entirely new satellites in mid-band frequencies (e.g. Ligado).

**TIMING TRACK RECORD**
"The technology is impressive, but we cannot remember a single time when the company got timing right." In late 2020, ASTS was guiding to have 110 satellites in orbit by 2023, a goal that — if all goes according to plan — may now be achieved in 2027 or 2028. This five-year delay allowed Starlink not only to get two years ahead of ASTS in the direct-to-cell race (Starlink's DTC now positioned to serve one billion people), but to become the absolute leader on the satellite fixed-broadband side in 150 countries.

**BALANCED VIEW**
We disagree with those seeing ASTS as a "meme stock"; the technology remains highly disruptive and with potential for dual use. But we also disagree with those dismissing ASTS's multi-year delays and Starlink's unstoppable growth. The middle-ground scenario points to a valuation range between US$45/share and US$55/share. Sell.`,
        catalysts: [],
        risks: [
          'Still zero retail customers',
          'Need ~50 satellites for continuous service (late 2026/early 2027)',
          'Slow user adoption in U.S. and Japan (KDDI only 6% of wireless base)',
          'Modest ARPUs ($2.92 blended vs Starlink $85/month — 34x gap)',
          'High capex including duplicated satellites for new frequencies',
          'EFCF may not materialize until 2028-2029',
          '5-year delay: 110 sats by 2023 guidance → now 2027/2028',
          'Starlink 2-year head start in DTC race',
          'Starlink orbited 3,126 satellites in 2025 alone (9,500 cumulative)',
          'Starlink equivalent of 340M DTC users (~680M by ASTS launch)',
          'Starlink 47 days to add 1M subs (vs full year in 2022-2023)',
          'Starlink could have 20M subs within a year at current pace',
          'Starlink next-gen: 100x more powerful, 20x throughput, custom SpaceX silicon',
          'Starlink laser mesh network of 9,000+ satellites (ASTS lacks wireless meshing)',
          'Virgin-O2, Liberty LatAm deals suggest carriers may not wait for ASTS',
          'Mexico/Telcel risk: If Starlink partners with América Móvil, ASTS LatAm projections at risk',
          'ASTS satellites only operate in low spectrum — need new satellites for mid-band (Ligado)',
          '48-hour delay = falling further behind (Starlink mission every 1-2 days)',
          'First Starship load coming (satellites "like bread from toaster")',
        ],
        assumptions: [
          { label: 'Stock Price', value: '$97.49' },
          { label: 'Market Cap', value: '$35,781M' },
          { label: 'Enterprise Value', value: '$35,626M' },
          { label: 'Shares O/S', value: '367M' },
          { label: 'Float O/S', value: '155M' },
          { label: 'Net Debt + Pref', value: '$(155)M' },
          { label: '1-Yr Return', value: '-53.2%' },
          { label: 'Valuation Range', value: '$45-55/share' },
          { label: 'Continuous Service', value: 'Late 2026/Early 2027' },
          { label: 'Satellites Needed', value: '~50' },
          { label: 'US Commercial Launch', value: 'Early 2027' },
          { label: 'Overseas Carriers', value: '2028-2029' },
          { label: 'EFCF Timeline', value: '2028-2029' },
          { label: '2028E EFCF', value: '$3.5B' },
          { label: '2028E Paid Subs', value: '225M' },
          { label: 'Global Avg ARPU', value: '$2.92/sub' },
          { label: 'Starlink ARPU', value: '$85/month (34x ASTS)' },
          { label: 'Starlink DTC Sats', value: '650' },
          { label: 'Starlink 2025 Launches', value: '3,126' },
          { label: 'Starlink Total Launches', value: '9,500 cumulative' },
          { label: 'Starlink Fixed Subs', value: '6M monthly users (expanding to 1B)' },
          { label: 'KDDI Japan Adoption', value: 'Only 6% of wireless base' },
        ],
        estimates: [
          { metric: 'EBITDA ($M)', fy24: '(147)', fy25: '(180)', fy26: '516', fy27: '2,744', fy28: '5,236' },
          { metric: 'Organic Capex ($M)', fy24: '(174)', fy25: '(997)', fy26: '(1,366)', fy27: '(1,003)', fy28: '(1,560)' },
          { metric: 'Net Interest Paid ($M)', fy24: '(5)', fy25: '15', fy26: '(89)', fy27: '(96)', fy28: '(84)' },
          { metric: 'Cash Taxes ($M)', fy24: '(2)', fy25: '(1)', fy26: '0', fy27: '(69)', fy28: '(75)' },
          { metric: 'FCF ($M)', fy24: '(328)', fy25: '(1,163)', fy26: '(939)', fy27: '1,486', fy28: '3,517' },
          { metric: 'FCF per Share', fy24: '(1.1)', fy25: '(3.2)', fy26: '(2.6)', fy27: '4.0', fy28: '9.4' },
          { metric: 'NPV of FCF/Share', fy24: '(2.9)', fy25: '(2.0)', fy26: '2.8', fy27: '5.8', fy28: '8.7' },
          { metric: 'Current FCF Yield', fy24: '-1.1%', fy25: '-3.3%', fy26: '-2.6%', fy27: '4.1%', fy28: '9.6%' },
        ],
        methodology: `Equity Free Cash Flow model demanding 12.7% yield on the present value of first year of meaningful EFCF generation (2028). This is well above SpaceMobile's 10.0% 10Y funding cost, reflecting 37% proportional difference vs Telecom sector average 7.3% funding cost. Telecom 10Y Average FCF Yield is 9.3%.

VALUATION CALCULATION:
• SpaceMobile 10Y Funding Cost: 10.0%
• Telecom 10Y Average Funding Cost: 7.3%
• SpaceMobile Proportional Difference vs Sector Avg: 37.0%
• Telecom 10Y Average FCF Yield: 9.3%
• Fair FCF Yield (d/e * g): 12.7%
• Value per share (b/h): $45.6

2028E ASSUMPTIONS:
• EFCF: $3.5B
• Paid subscribers: 225M
• Global average ARPU: $2.92/sub
• "Not a conservative projection"

Middle-ground valuation scenario points to $45-55/share range. Current price of $97.49 deemed irrational given execution delays, Starlink competitive dynamics, and need for entirely new satellites for mid-band spectrum.`,
        fullNotes: `REPORT TITLE: "Downgrading to Sell on Valuation: Starlink's Space Leadership Means ASTS Faces an Uphill Battle"

CAPITALIZATION:
| Metric | Value |
| Market Cap (M) | $35,781 |
| Net Debt + Pref (M) | $(155) |
| Enterprise Value (M) | $35,626 |
| Shares O/S (M) | 367 |
| Float O/S (M) | 155 |

PERTINENT REVISIONS:
| | New | Old |
| Rating | SU | SP |

VALUATION MODEL (Exhibit 7) - USD M Unless Otherwise Stated:
| Metric | 2024A | 2025E | 2026E | 2027E | 2028E | 2029E | 2030E | 2031E | 2032E |
| EBITDA | (147) | (180) | 516 | 2,744 | 5,236 | 8,664 | 15,062 | 22,061 | 26,458 |
| Organic Capex | (174) | (997) | (1,366) | (1,003) | (1,560) | (1,580) | (1,601) | (1,764) | (2,966) |
| Net Interest Paid | (5) | 15 | (89) | (96) | (84) | (53) | 47 | 156 | 314 |
| Cash Taxes | (2) | (1) | 0 | (69) | (75) | (1,000) | (1,919) | (3,903) | (6,011) |
| FCF | (328) | (1,163) | (939) | 1,486 | 3,517 | 6,031 | 11,589 | 16,550 | 17,795 |
| FCF per Share | (1.1) | (3.2) | (2.6) | 4.0 | 9.4 | 15.9 | 30.1 | 42.3 | 44.8 |
| NPV of FCF/Share | (2.9) | (2.0) | 2.8 | 5.8 | 8.7 | 14.6 | 18.3 | 17.1 | — |
| Current FCF Yield | -1.1% | -3.3% | -2.6% | 4.1% | 9.6% | 16.3% | 30.9% | 43.4% | 45.9% |

STARLINK NET ADDS (Exhibit 1) - Millions:
| 2022 | 2023 | 2024 | 2025 | 2026E |
| 0.9 | 1.3 | 2.3 | 4.6 | 10 |
(Compared to Netflix early growth: 2007: 1.2M, 2008: 1.9M, 2009: 2.9M, 2010: 7.7M)

STARLINK COMPETITIVE DATA:
• 650 DTC satellites currently operating
• 9,500 cumulative satellite launches (3,126 in 2025 alone)
• 6M monthly users to DTC services (expanding to 1B coverage)
• Available in: Australia, Canada, Chile, Japan, New Zealand, UK, Ukraine, Zambia, US + expanding to Kazakhstan, Mexico, Mongolia, Peru, Switzerland
• 47 days to add 1M subs (Dec 22, 2025: 9M from Nov 5: 8M)
• Brazil Anatel: 63,141 new Starlink subs Nov 2025 (vs 17,524 prior year — 3.6x increase)
• ARPU: $85/month (34x higher than ASTS $2.5/month)
• Next-gen: Custom SpaceX silicon, advanced phased arrays, thousands of spatial beams
• 20x higher throughput/satellite, 100x system capacity
• 360km altitude, laser mesh network 9,000+ satellites
• Regenerative architecture (cell towers in space)

TIMING HISTORY:
• Late 2020: ASTS guided 110 satellites by 2023
• Reality: 7 satellites since 2017, 110 now targeted for 2027/2028
• 5-year delay gave Starlink 2-year DTC head start

CARRIER DEFECTION RISK:
• Virgin-O2 UK deal (Telefónica/Liberty Global) — may not wait for ASTS
• Liberty LatAm Jamaica partnership during Melissa emergency
• América Móvil/Telcel Mexico risk — could slash ASTS LatAm projections

KEY QUOTES:
• "The technology is impressive, but we cannot remember a single time when the company got timing right."
• "To be clear, as little as a 48-hour delay (let alone weeks or months) means ASTS will fall further behind Starlink, which is completing a mission every one to two days."
• "We disagree with those seeing ASTS as a 'meme stock'; the technology remains highly disruptive and with potential for dual use."

DISCLOSURE: Scotiabank has IB relationship with ASTS. Production: January 6, 2026 (Daily Edge | After Close).`
      },
      // === Nov 25, 2025 - Upgrade to Sector Perform (Quick Update) ===
      { date: '2025-11-25', action: 'Upgrade', priceTarget: 45.60, previousTarget: 42.90, rating: 'Sector Perform', ratingNormalized: 'neutral', source: 'Quiver Quant', sourceUrl: 'https://www.quiverquant.com/', isFullReport: false },
      // === Oct 7, 2025 - Downgrade (Quick Update) ===
      { date: '2025-10-07', action: 'Downgrade', priceTarget: 42.90, rating: 'Sector Underperform', ratingNormalized: 'bearish', source: 'GuruFocus', sourceUrl: 'https://www.gurufocus.com/', isFullReport: false },
      // === Aug 7, 2025 - PT Cut (Quick Update) ===
      { date: '2025-08-07', action: 'PT Cut', priceTarget: 42.90, rating: 'Sector Perform', ratingNormalized: 'neutral', isFullReport: false },
      // === May 13, 2025 - PT Cut $47.90 → $45.40 (FULL REPORT) ===
      {
        date: '2025-05-13',
        action: 'PT Cut',
        priceTarget: 45.40,
        previousTarget: 47.90,
        rating: 'Buy',
        ratingNormalized: 'bullish',
        isFullReport: true,
        thesis: 'Q1 production at full steam. Starlink feedback from South America: service is intermittent (30 seconds then drops), only limited SMS (not even WhatsApp). Nothing close to what ASTS can deliver. Golden Dome ($25B defense project) on sight — ASTS expects to be "important contributor." PT cut 5% on ATM dilution and tariff-driven cost increases.',
        reportSummary: `**STARLINK STRUGGLING — ASTS ADVANTAGE**
Feedback from a carrier in South America suggests that Starlink's direct-to-cell service is currently intermittent (works for 30 seconds, then drops) and can only provide limited SMS services (not even WhatsApp). We understand this is delaying and watering-down the commercial launch. In practical terms, there is nothing close to the wireless broadband service that ASTS can deliver with its gigantic satellites, which will be in position to deliver 5G browsing, apps and videoconferencing from the very first beta test later this year.

**PRODUCTION STATUS**
40 satellites are at different stages of production (50 in total including procurement). A beta version should be available in the U.S. by Q4/25, with commercial launch happening "early in 2026." Japan and Europe would happen shortly after.

**GOLDEN DOME DEFENSE OPPORTUNITY ($25B)**
Management expects ASTS to become an "important contributor" (e.g., radar/detection) to the US$25B Golden Dome defense project, which could soon be funded by the U.S. Senate. New guidance: generate $50M to $75M in revenue in 2H25 (from virtually zero in Q1/25). This is relevant insofar as it shows that the government and MNOs are positioning themselves to use the technology, but this is far from reflecting the full revenue opportunity.

**PRODUCTION & LAUNCH CADENCE**
Satellite manufacturing is expected to hit a cadence of 6 satellites per month by Q4/25. The company has scheduled 5 contracted launches (around 20 satellites in total) over the next 6-9 months, with launches occurring every 1-2 months. The first Block 2 BlueBird satellite ("FM1" with special tail) is expected to ship to India shortly, with orbital launch scheduled for July.

**CRITICAL 25 SATELLITE MILESTONE**
We expect the critical 25 mark for positive operating cash flow and non-continuous beta service in the U.S. to be reached in late 2025. The cadence of launches should accelerate further in 1H26, reaching a total fleet of 60 satellites by mid-2026 (continuous service in U.S. and initial launch in Europe and Japan). End year with 80-90 satellites (up from 75 in previous model), positioning for global launch in early 2027.

**NEW ATM FACILITY & FUNDING**
Management announced a new $500M ATM program (5.8% of market cap) covering 2025-2028. Although ASTS has completed initial clearance of up to $500M in EXIM and IFC non-dilutive funding, the new ATM may not be used in full. Precisely because of non-dilutive sources (including operating cash flow as soon as 25 satellites reached), our model dilutes ATM over 8 quarters starting Q2/25. The ATM and EXIM-IFC financing should be enough considering $874.5M cash as at Q1/25. Tariffs and launching costs explain production cost guidance increase to $21M-23M per unit (from $19M-21M).

**PRICE TARGET REVISION**
Minimal changes to our target incorporating the ATM and modest increase in production costs: $45.40/share from $47.90 (small 5% revision). We have NOT incorporated the impact of possible Golden Dome contracts.`,
        assumptions: [
          { label: 'Price Target', value: '$45.40' },
          { label: 'Prev Target', value: '$47.90' },
          { label: 'Yield Demanded', value: '13.4%' },
          { label: 'Market Cap', value: '$8.9B' },
          { label: 'Cash Q1/25', value: '$874.5M' },
          { label: 'Shares O/S', value: '328M' },
          { label: 'ATM Program', value: '$500M' },
          { label: 'Sat Cost', value: '$21-23M/unit' },
        ],
        catalysts: [
          'Starlink struggling: intermittent service (30 sec drops), only SMS (no WhatsApp)',
          'ASTS: 5G browsing, apps, videoconferencing from first beta test',
          'Golden Dome ($25B defense project) — ASTS to be "important contributor"',
          '2H25 defense guidance: $50M-$75M revenue (from zero in Q1)',
          'FM1 (first BB2 with special tail) shipping to India, July launch',
          '6 satellites/month production cadence by Q4/25',
          '5 contracted launches (20 sats) over next 6-9 months',
          '25 satellites by late 2025 → positive operating cash flow',
          '60 satellites by mid-2026 → continuous US service',
          '80-90 satellites by end 2026 (up from 75 prior model)',
        ],
        risks: [
          'ATM dilution: $500M program over 2025-2028',
          'Tariffs increased production costs to $21-23M/unit (from $19-21M)',
          'Golden Dome contracts NOT yet incorporated in model',
          'Execution on accelerated launch cadence',
          'Risk Ranking: Speculative',
        ],
        estimates: [
          { metric: 'EBITDA ($M)', fy25: '(174)', fy26: '730', fy27: '—' },
          { metric: 'EBITDA Old ($M)', fy25: '(179)', fy26: '724', fy27: '—' },
          { metric: 'Price/Revenue', fy25: '55.9x', fy26: '6.1x', fy27: '—' },
        ],
        methodology: 'Equity Free Cash Flow model demanding 13.4% yield on present value of first year of meaningful EFCF generation (2028). 5% PT cut reflects ATM dilution and tariff-driven cost increases. Golden Dome upside NOT included.',
        fullNotes: `ESTIMATE REVISIONS:
| Metric | New | Old |
| 1-Yr Target | $45.40 | $47.90 |
| EBITDA (M) 25E | $(174) | $(179) |
| EBITDA (M) 26E | $730 | $724 |

QUARTERLY EBITDA:
| Year | Q1 | Q2 | Q3 | Q4 | Year | P/Rev |
| 2024A | $(31) | $(34) | $(44) | $(39) | $(147) | n.m. |
| 2025E | $(44)A | $(30) | $(59) | $(40) | $(174) | 55.9x |
| 2026E | $32 | $150 | $243 | $306 | $730 | 6.1x |

NOTE: There is a missing report between Feb 26, 2025 ($40.20) and May 13, 2025 that raised PT to $47.90. We do not have this report.

DISCLOSURE: Scotiabank has IB relationship with ASTS. Production: May 13, 2025, 02:02 ET. Dissemination: May 13, 2025, 05:24 ET.`
      },
      // === Feb 26, 2025 - Reiterate $40.20 (FULL REPORT) ===
      {
        date: '2025-02-26',
        action: 'Reiterate',
        priceTarget: 40.20,
        previousTarget: 45.90,
        rating: 'Buy',
        ratingNormalized: 'bullish',
        isFullReport: true,
        thesis: 'New $43M SDA defense contract shows military potential; estimates look conservative again. AT&T/Verizon completed first satellite video call on BlueBird. T-Mobile pricing ($15/mo, $7.50 ARPU) is 66% above our $4.50 model assumption. Defense could be "multiple times" current projections.',
        reportSummary: `**DEFENSE CONTRACT & MILITARY THESIS**
The U.S. Space Development Agency (SDA), through a prime contractor, awarded ASTS a new $43M contract. This is a "green shoot" — if ASTS can secure such contracts with just 5 satellites providing 30 minutes/day coverage, the opportunity with a full 50-satellite constellation is exponentially bigger. Our model projects only $512M in global defense revenues by 2030, which looks conservative as a single U.S. agency could demand as much. ASTS satellites are designed to "mirror" wireless signals (data processing happens terrestrially), which is specially relevant for governments that don't want the DTC provider accessing data itself. This is a KEY DIFFERENCE vs SpaceX's design where data transmission happens satellite-to-satellite through lasers, potentially raising security concerns. ASTS satellites could provide connectivity to military AND potentially "drop broadband" in remote regions where rogue regimes don't allow people to access the web.

**PWSA — PROLIFERATED WARFIGHTER SPACE ARCHITECTURE**
SDA will accelerate delivery of space-based capabilities to support terrestrial missions through development, fielding, and operation of PWSA. This is the network of LEO satellites that will provide the U.S. military with satellite-based connectivity for terrestrial missions worldwide. PWSA is divided into several layers (tranches), each adding new capabilities and resilience — including tracking missile threats and ensuring encrypted connectivity.

**AT&T/VERIZON VIDEO CALL MILESTONE**
AT&T and Verizon announced they successfully completed a satellite-based VIDEO CALL over their spectrum using BlueBird satellites and everyday smartphones. These are the same satellites that will be used to start commercial service. The events come after ASTS was granted in mid-February a "Special Temporary Authority" to test their terrestrial gateways in Texas and Washington. Three more gateways pending STA approval.

**T-MOBILE PRICING REFERENCE — BULLISH FOR ARPU**
T-Mobile provided an impressive pricing reference for the U.S.: Starting July 2025, DTC will cost $15.00/month, representing 30% to 42% of TMUS's Q4/24 reported postpaid ($49.73) and prepaid ($35.49) ARPU. DTC will be included "for free" in Go5G postpaid packages starting at $100/month ($85 for seniors 55+) — a big jump vs current plans. Using the $15.00/month reference and 50-50 revenue split, this implies $7.50/month ARPU for the DTC provider — 66% HIGHER than the $4.50 we incorporated into our ASTS model for developed markets. Chile visit also provided first-ever EM pricing reference: 14% to 28% of Entel's blended ARPU.

**REVENUE MIX EVOLUTION (2026-2030)**
In 2026E, we project revenues from sources unrelated to wireless users (defense, emergency response, initial carrier commitments) to comprise 57% of monetization. This changes dramatically as service becomes available in developed markets (2H26+) and Equatorial markets (2027+). By 2027E, user-generated revenues comprise 73% while defense drops to 9%. By 2030E, defense drops to just 3% ($512M) of $17.6B total revenue, with 95% user-generated. The new SDA contract shows defense could be "materially bigger to what we are projecting, possibly multiple times more."

**VALUATION & CATALYSTS**
Using Equity Free Cash Flow model demanding 13.4% yield (down from 16.4% in Aug '24) on present value of first year of meaningful EFCF generation (2028). Waiting for news on BB2 launch cadence/timing, time-to-market guidance in U.S. and abroad. Q4/24 release and conference call scheduled March 3-4. Investors will react positively to faster-than-expected satellite production and MNO monetization news.

**PRICE TARGET HISTORY (SCOTIABANK)**
$7.50 (Mar '24) → $7.40 (Apr '24) → $12.90 (May '24) → $21.10 (Jul '24) → $28.00 (Aug '24) → $40.20 (Feb '25). PT has more than 5x'd in under 12 months. [Source: PT history from Aug 15, 2024 report page 7; current PT from Feb 26, 2025 report]`,
        assumptions: [
          { label: 'Price Target', value: '$40.20' },
          { label: 'Yield Demanded', value: '13.4%' },
          { label: 'ARPU Model', value: '$4.50 (dev)' },
          { label: 'T-Mobile Ref', value: '$7.50 ARPU' },
          { label: 'Defense 2030E', value: '$512M (3%)' },
          { label: 'Market Cap', value: '$7.9B' },
          { label: 'EV', value: '$7.9B' },
          { label: 'Shares O/S', value: '290M' },
        ],
        catalysts: [
          'AT&T/Verizon completed satellite VIDEO CALL on BlueBird + everyday smartphones',
          '$43M SDA defense contract — "green shoot" for military revenue',
          'T-Mobile: DTC $15/mo starting July 2025 (implies $7.50 ARPU vs $4.50 model)',
          'Special Temporary Authority granted for TX/WA gateways; 3 more pending',
          'Q4/24 earnings + conference call March 3-4, 2025',
          'BB2 launch cadence/timing guidance expected',
          'Defense could be "multiple times" current projections',
        ],
        risks: [
          'Execution on BB2 launches and time-to-market',
          'Regulatory approvals for commercial service in multiple countries',
          'Competition from SpaceX (though different architecture)',
          'Continued cash burn until commercial ramp',
          'Risk Ranking: Speculative',
        ],
        estimates: [
          { metric: 'Revenue ($M)', fy25: '—', fy26: '2,793', fy27: '4,350' },
          { metric: 'EBITDA ($M)', fy25: '363', fy26: '1,313', fy27: '—' },
          { metric: 'EBITDA Margin', fy25: '—', fy26: '47%', fy27: '—' },
          { metric: 'Price/Revenue', fy25: '6.8x', fy26: '3.3x', fy27: '—' },
          { metric: 'User-Gen Rev %', fy25: '—', fy26: '43%', fy27: '73%' },
          { metric: 'Defense Rev %', fy25: '—', fy26: '13%', fy27: '9%' },
        ],
        methodology: 'Equity Free Cash Flow model demanding 13.4% yield (reduced from 16.4% in Aug \'24 — source: prior report) on present value of first year of meaningful EFCF generation (2028). Implies $40.20/share.',
        fullNotes: `SOURCES: PT and stock price from Feb 26, 2025 report header. Previous PT ($28.00) and PT history from Aug 15, 2024 report. Yield reduction (16.4% → 13.4%) inferred from methodology comparison.

DISCLOSURE: Scotiabank has IB relationship with ASTS. Production: Feb 26, 2025, 18:34 ET. Dissemination: Feb 26, 2025, 18:42 ET.`
      },
      // === Feb 10, 2025 - PT Cut $45.90 → $40.20 (FULL REPORT) ===
      {
        date: '2025-02-10',
        action: 'PT Cut',
        priceTarget: 40.20,
        previousTarget: 45.90,
        rating: 'Buy',
        ratingNormalized: 'bullish',
        isFullReport: true,
        thesis: 'Fresh DTC pricing references from T-Mobile ($15/mo, implying $7.50 ARPU — 66% above our $4.50 model) and Chile (14-28% of Entel ARPU) suggest upside to numbers. Shatters the bear thesis that DTC would be free. Carriers struggling to monetize see DTC as "water in the desert."',
        reportSummary: `**T-MOBILE PRICING SHATTERS "FREE DTC" BEAR THESIS**
Perhaps the most misleading argument of the ASTS bear thesis is that DTC would be included for free to all customers. T-Mobile just proved otherwise: Starting July 2025, DTC will cost $15.00/month, representing 30-42% of TMUS's Q4/24 postpaid ($49.73) and prepaid ($35.49) ARPU. This didn't make sense for multiple reasons: (1) Carriers struggling to find new monetization; DTC is "like water in the desert"; (2) Carriers making prepayments can't afford to give it for free; (3) DTC companies investing billions in global constellations; (4) As little as 10% reduction in wireless capex from satellites → +$30B in capex savings per year for carriers (pure EFCF incentive for fair pricing).

**PRICING DETAILS & IMPLICATIONS**
Using the $15.00/month reference and 50-50 revenue split, this implies $7.50/month ARPU for the DTC provider — 66% HIGHER than the $4.50 we incorporated into our ASTS model for developed markets. While monetization is the most visible face of the DTC story, we believe capex savings to MNOs may turn out to be as relevant as the new revenue stream from an equity free cash flow standpoint.

**TIMING IS IMPORTANT**
Beta period will be free until July. After July, DTC will be included at no extra cost only to Go5G Next ($100/month). T-Mobile customers on any other plan can add the service for $15/month/line. Through February, beta registrants get $10/month/line early adopter discount. During the beta period, Verizon and AT&T customers can experience T-Mobile Starlink text messaging for free. Once the service launches in July, it will be available for $20/month/line to AT&T/Verizon customers.

**STARLINK SERVICE QUALITY ISSUES**
The July reference is interesting because today the service is only text and users are complaining about connectivity issues. This is likely showing that Starlink is under pressure to improve service and increase densification. The reference is also relevant for ASTS as it gives the company time to launch the first BB2 satellites with real data capabilities (up to 120 Mbps) while in compliance with OOBE limits.

**NEXT STEPS FOR ASTS**
Now that ASTS has received Special Temporary Authority (STA) from the FCC for AT&T and Verizon tests, we expect more info on the 5 BB1 Bluebirds: maximum download speeds, capacity per satellite, performance on continuous coverage, indoor coverage (penetrating at least one wall), video/streaming capabilities, and possible security/defense uses. Cash is now ~$1.0B after the $460M in 2032 convertible notes.

**PRODUCTION & TIMELINE**
Management more confident about manufacturing, with production potentially ramping to 4-6 satellites per month. The 17 BB2 satellites that began building last year are now fully completed. We would not be surprised if management announces launch of not one but a couple of satellites at first BB2 launch from India in April. Timeline: 25 satellites by end of 2025 (critical for breakeven), continuous US coverage by 1H26, Europe and Japan by 2H26.

**ARPU TIERS BY MARKET**
- Below $1/month: India
- $1-$3/month: Brazil, Chile, Mexico
- $3-$15/month: U.S. (premium)
- T-Mobile's $15/month is at the high end of the range`,
        assumptions: [
          { label: 'Price Target', value: '$40.20' },
          { label: 'ARPU Model', value: '$4.50 (dev)' },
          { label: 'T-Mobile Ref', value: '$7.50 ARPU' },
          { label: 'Upside to Model', value: '+66%' },
          { label: 'Market Cap', value: '$7.7B' },
          { label: 'Cash', value: '~$1.0B' },
          { label: 'Shares O/S', value: '290M' },
          { label: '17 BB2 Sats', value: 'Completed' },
        ],
        catalysts: [
          'T-Mobile: DTC $15/mo starting July 2025 ($7.50 ARPU = 66% above model)',
          'Chile pricing reference: 14-28% of Entel blended ARPU',
          'STA granted for AT&T/Verizon tests on BB1 Bluebirds',
          '17 BB2 satellites now fully completed',
          'First BB2 launch from India in April — could be multiple satellites',
          'Production ramping to 4-6 satellites per month',
          '25 satellites by end 2025 (breakeven threshold)',
          '$460M convertible notes → ~$1.0B cash position',
        ],
        risks: [
          'Starlink text service has connectivity issues (users complaining)',
          'Execution on BB2 launches and time-to-market',
          'AT&T/Verizon customers: $20/mo (vs $15 for T-Mobile) — competitive dynamics',
          'Risk Ranking: Speculative',
        ],
        estimates: [
          { metric: 'EBITDA ($M)', fy25: '363', fy26: '1,313', fy27: '—' },
          { metric: 'Price/Revenue', fy25: '6.7x', fy26: '3.3x', fy27: '—' },
        ],
        methodology: 'Equity Free Cash Flow model demanding 13.4% yield on present value of first year of meaningful EFCF generation (2028). Implies $40.20/share.',
        fullNotes: `T-MOBILE STARLINK DTC PRICING TABLE (Starting July 2025):
| Customer Type | Price | Specs |
| TMUS Customers | $15.00 | Starlink DTC Service |
| AT&T & Verizon | $20.00 | Starlink DTC Service |
| TMUS Go5G Next | $100.00 | Unlimited + DTC included + Apple TV+, Netflix, Hulu |
| TMUS Go5G Next 55 | $85.00 | Same as above, 55+ years old |

DISCLOSURE: Scotiabank has IB relationship with ASTS. Production: Feb 10, 2025, 16:26 ET. Dissemination: Feb 10, 2025, 16:28 ET.`
      },
      // === Sep 30, 2024 - Reiterate $45.90 (FULL REPORT) ===
      {
        date: '2024-09-30',
        action: 'Reiterate',
        priceTarget: 45.90,
        rating: 'Buy',
        ratingNormalized: 'bullish',
        isFullReport: true,
        thesis: 'European carriers (Vodafone, Telenor, Telefónica, Orange, Liberty Global) filed joint FCC letter opposing SpaceX\'s OOBE waiver request. If FCC stays firm, ASTS may emerge as THE ONLY licensed SCS player with cellular broadband. Barriers to entry are vastly underestimated. Buy on weakness.',
        reportSummary: `**EUROPEAN CARRIERS OPPOSE SPACEX WAIVER**
Vodafone, United Group, Telenor, Telefónica, PPF Group, Orange and Liberty Global filed a joint letter to the FCC calling for the regulator to "reject any effort to relax its aggregate Out-of-Band-Emission (OOBE) limit of -120 dBW/m2/MHz." The carriers stated: "Any D2D system that deploys in cellular frequencies, rather than a mobile satellite service (MSS) allocation, must satisfy Article 4.4's noninterference obligation, and we do not accept that a D2D system operating with an OOBE limit more relaxed than -120 dBW/m2/MHz is satisfying this fundamental condition."

**IF FCC STAYS FIRM — ASTS WINS**
If the FCC stays firm on the limits, ASTS may emerge not only as the first, but THE ONLY licensed SCS player with cellular broadband capabilities, giving it a precious pioneering advantage that could have M&A implications. SpaceX would face tough choices, such as re-designing its DTC fleet from scratch at a risk of falling under patent-enforcement actions by ASTS. The barriers to entry of this nascent industry, from a technical, regulatory and patents perspective, are vastly underestimated.

**THE ROOT PROBLEM: SUB-OPTIMAL SPACEX DESIGN**
FCC filings by SpaceX and ASTS make it possible to compare beam patterns. What you want to see is a tall beam in the licensed frequency and minimal lobes in contiguous spectrum. The ASTS satellites are very powerful in the spectrum provided by AT&T-Verizon (850 MHz) with small sidelobes (compliant with EPFD limits). The SpaceX beam in the PCS spectrum (T-Mobile) is relatively weak and the sidelobes are tall. SpaceX itself accepted that "even a single direct-to-cellular satellite with power amplifiers ('PA') operating at full load could not meet the Section 25.202(k)(1) limit..." EPFD limits are "ten times more restrictive" than SpaceX requires to function normally.

**WARRANT REDEMPTION STRENGTHENS CASH**
99.89% of warrant holders exercised, with total cash proceeds of $156M. Some holders may have taken profits, explaining recent stock weakness. The next corporate milestone is the correct unfolding and testing of BB1 satellites, which would trigger payments from AT&T, Verizon and Vodafone.

**PRICE TARGET RAISED TO $45.90**
Buy ASTS on weakness. The 64% PT increase from $28.00 reflects the strengthening regulatory moat as European carriers join U.S. incumbents in opposing SpaceX's waiver request.`,
        assumptions: [
          { label: 'Price Target', value: '$45.90' },
          { label: 'Prev Target', value: '$28.00' },
          { label: 'Yield Demanded', value: '13.4%' },
          { label: 'Market Cap', value: '$7.0B' },
          { label: 'EV', value: '$7.0B' },
          { label: 'Shares O/S', value: '267M' },
          { label: 'Float', value: '121M' },
          { label: 'Warrant Proceeds', value: '$156M' },
        ],
        catalysts: [
          'European carriers (VOD, TEF, Orange, Liberty) filed joint FCC letter opposing SpaceX OOBE waiver',
          'If FCC stays firm → ASTS = THE ONLY licensed SCS player with cellular broadband',
          'SpaceX admitted single satellite at full load cannot meet regulatory limits',
          'Warrant redemption: 99.89% exercised, $156M cash proceeds',
          'Next milestone: BB1 unfolding/testing → triggers AT&T/VZ/VOD payments',
          'SpaceX may need to redesign fleet (patent risk from ASTS)',
        ],
        risks: [
          'FCC could still grant SpaceX waiver despite carrier opposition',
          'Execution risk on BB1 satellite deployment',
          'Some warrant holders took profits (explains recent weakness)',
          'Risk Ranking: Speculative',
        ],
        estimates: [
          { metric: 'Revenue ($M)', fy25: '1,345', fy26: '—', fy27: '—' },
          { metric: 'EBITDA ($M)', fy25: '404', fy26: '—', fy27: '—' },
          { metric: 'Price/Revenue', fy25: '6.3x', fy26: '—', fy27: '—' },
        ],
        methodology: 'Equity Free Cash Flow model demanding 13.4% yield on present value of first year of meaningful EFCF generation (2028). Implies $45.90/share.',
        fullNotes: `BEAM PATTERN COMPARISON (FCC Filings):
- Exhibit 1: ASTS beam pattern shows tall, focused beam with minimal sidelobes (Chebyshev taper 55dB SLL)
- Exhibit 2: SpaceX/Starlink beam pattern shows weaker main beam with tall sidelobes extending to 90 degrees off-axis
- ASTS compliant with EPFD limits; SpaceX is "ten times" away from compliance

DISCLOSURE: Scotiabank has IB relationship with ASTS. Production: Sep 30, 2024, 17:23 ET. Dissemination: Sep 30, 2024, 17:27 ET.`
      },
      // === Aug 26, 2024 - PT Raise $28 → $45.90 (FULL REPORT) ===
      {
        date: '2024-08-26',
        action: 'PT Raise',
        priceTarget: 45.90,
        previousTarget: 28.00,
        rating: 'Buy',
        ratingNormalized: 'bullish',
        isFullReport: true,
        thesis: 'FirstNet approves $2.0B network upgrade with explicit satellite DTC plans. ASTS peak data rates up to 120 Mbps (vs 14 Mbps in BW3). Lowering funding cost assumption to 10.5% (from 12.9%) and yield to 13.4% (from 16.4%) drives 64% PT increase. For every $1 of DTC revenue, MNOs save ~$1.5 in capex and tower leases.',
        reportSummary: `**FIRSTNET $2.0B INVESTMENT — SATELLITE DTC INCLUDED**
At a board meeting on August 21, FirstNet approved a $2.0B investment program to upgrade coverage: "We can continue to enhance coverage for FirstNet subscribers, including an estimated $2 billion in coverage investments over the next 10 years [...] we are also planning on additional investments that will over time enable satellite direct-to-device capability for FirstNet subscribers." This marks FirstNet Authority's second major strategic investment this year, totaling more than $8.0B over the next 10 years. We're raising our 2026 emergency-response estimate from $60M to $150M, still conservative as it represents less than 2% of FirstNet's budget — and there are hundreds of emergency agencies globally.

**ASTS TECHNOLOGY: 120 MBPS PEAK DATA RATES**
In its latest corporate video, ASTS suggests that the Birds are capable of delivering peak data rates of up to 120 Mbps, up from the initial 14 Mbps announced last year (BW3 tests). Our Buy rating is not based on short-term trading but on the company's potential to become the world's largest wireless company by subscribers. Days ahead of the BB1 launch, our attention is focused on ASTS securing a pioneering advantage over SpaceX on the back of superior satellite design, whose hallmark is a giant phase array that allows for greater beam precision compliant with FCC interference limits.

**SPACEX'S TOUGH CHOICES**
If the FCC stays firm on EPFD rules, SpaceX faces, in our view, tough choices: (1) Redesign its satellites at risk of falling under patent-enforcement actions by ASTS; (2) Wait until 2027 for the WRC to change EPFD limits; (3) Find other available frequencies or buy contiguous blocks; or (4) Buy ASTS. As FirstNet commits more resources, we find yet another area where our estimates fail to capture the project's potential.

**WRC AND FDD FREQUENCIES**
On August 20, SpaceX filed comments on WRC proposals to be considered at the next WRC in 2027. SpaceX wants the FCC to "study all FDD (Frequency Division Duplex) frequency bands between 694-2700 MHz to avoid foreclosing promising bands..." ASTS is building 17 BB2 satellites for Q1/25 launch. By 2027, ASTS could have global capabilities. In a filing released August 23, SpaceX takes issue with AT&T and Verizon comments and again asks for FCC to waive OOBE limits.

**LOWER FUNDING COSTS — KEY VALUATION DRIVER**
When we initiated coverage in Q1/24, the funding references were not reflective of the project's potential. The senior secured facility (14.8%) is more of a mortgage backed by assets, not a credit based on global reach. The 12.9% funding cost was punishing valuation in two ways: (1) equity premium over debt was even higher at 13.7%; and (2) we bring to present value the first year of significant EFCF (2028). As ASTS gets access to cheaper credit-export loans, funding costs should drop. Our new $45.90/share target is based on 10.5% funding rate, still higher than strategic partners (5.1%) and satellite comps (7.3%).

**FUNDING COST COMPARISONS**
Strategic Partners: AT&T 4.8%, Verizon 4.9%, Vodafone 5.5% → Average 5.1%
Satellite Companies: Viasat 12.8%, Eutelsat 8.4%, SES 7.6% → Average 9.6%
Average Funding Costs: 7.3%
ASTS Model (New): 10.5% (conservative)

**MNO CAPEX SAVINGS — THE HIDDEN BULL CASE**
Each year, the global telecom industry spends over $310B in capex and $68B in tower leases. 35% to 50% of total capex is in RAN; 10% to 20% is spent in rural, semi-rural, remote and non-profitable areas. Using satellites could save MNOs on average $46.5B/year in capex. MNOs would also save $6.3B/year in lease savings. "For every dollar of additional DTC revenues, MNOs are positioned to save around $1.5 in capex and tower leases." While "connect the unconnected" is the public face, capex/tower savings may be the far more powerful reason behind MNO support.

**ASTS COULD QUALIFY AS 5G FOR FCC PURPOSES**
Initial performance data suggests that ASTS's technology could qualify as 5G coverage for FCC purposes in terms of speeds, which could play a key role in the regulator's future acceptance of the SCS service as compliant with license requirements (thus triggering significant capex and tower savings).

**FIRSTNET FISCAL YEAR**
FirstNet has a September fiscal year-end, so we might see something for ASTS as soon as Q4/24.`,
        assumptions: [
          { label: 'Price Target', value: '$45.90' },
          { label: 'Prev Target', value: '$28.00' },
          { label: 'Funding Cost', value: '10.5%' },
          { label: 'Old Funding', value: '12.9%' },
          { label: 'Fair FCF Yield', value: '13.4%' },
          { label: 'Old Yield', value: '16.4%' },
          { label: 'Market Cap', value: '$8.8B' },
          { label: 'Emergency Rev 26E', value: '$150M' },
        ],
        catalysts: [
          'FirstNet $2.0B investment with explicit satellite DTC capability plans',
          'ASTS peak data rates: 120 Mbps (up from 14 Mbps in BW3)',
          'Lower funding cost (10.5% vs 12.9%) drives PT increase',
          '17 BB2 satellites building for Q1/25 launch',
          'By 2027, ASTS could have global capabilities',
          'Emergency-response estimate raised $60M → $150M (2026)',
          'FirstNet Sept fiscal year-end → possible Q4/24 announcement',
          'MNO capex savings: $46.5B/year + $6.3B/year lease savings',
          'For every $1 DTC revenue, MNOs save $1.5 in capex/tower leases',
        ],
        risks: [
          'SpaceX could still receive FCC waiver on OOBE limits',
          'Execution risk on BB1 launch (September)',
          'WRC 2027 could change EPFD limits in SpaceX favor',
          'Risk Ranking: Speculative',
        ],
        estimates: [
          { metric: 'Revenue ($M)', fy25: '1,345', fy26: '2,793', fy27: '4,350' },
          { metric: 'EBITDA ($M)', fy25: '404', fy26: '1,397', fy27: '2,697' },
          { metric: 'FCF/Share', fy25: '($2.4)', fy26: '($0.2)', fy27: '$4.3' },
          { metric: 'NPV FCF/Share', fy25: '($2.1)', fy26: '($0.1)', fy27: '$2.9' },
          { metric: 'Subscribers (M)', fy25: '5', fy26: '55', fy27: '120' },
        ],
        methodology: 'Equity Free Cash Flow model. Lowered funding cost from 12.9% to 10.5% (access to credit-export loans). Fair FCF yield now 13.4% (down from 16.4%). Applied to first year of meaningful EFCF (2028). Implies $45.90/share.',
        fullNotes: `VALUATION MODEL (Exhibit 3):
- SpaceMobile 10Y Funding Cost: 10.5%
- Telecom 10Y Average Funding Cost: 7.3%
- SpaceMobile Proportional Difference vs Sector: 43.8%
- Telecom 10Y Average FCF Yield: 9.3%
- Fair FCF Yield (d/e * g): 13.4%
- Value per share: $45.9

TYPICAL TELECOM CAPEX BREAKDOWN (Exhibit 1):
- CPEs: 10-20%
- Core Network/Data Centers: 8-12%
- Transport Network: 5-15%
- IT/Development/Systems: 15-25%
- Other (Shops, Facilities): 3-8%
- ACCESS (RAN, BACKHAUL, FIXED ACCESS): 35-50% ← Target for satellite replacement

DISCLOSURE: Scotiabank has IB relationship with ASTS. Production: Aug 23, 2024, 17:44 ET. Dissemination: Aug 26, 2024, 06:08 ET.`
      },
      // === Aug 15, 2024 - PT Raise $21.10 → $28 (FULL REPORT) ===
      {
        date: '2024-08-15',
        action: 'PT Raise',
        priceTarget: 28,
        previousTarget: 21.10,
        rating: 'Buy',
        ratingNormalized: 'bullish',
        isFullReport: true,
        thesis: 'If FCC stays firm on EPFD rules, ASTS could be sole licensed SCS player in the world\'s richest telecom market, giving it precious pioneering advantage. Raising PT on: (1) faster subscriber loading in developed markets starting late 2025 vs 2026; (2) higher ARPU ($4.50 vs $3.50 prior); (3) stronger MNO prepayments.',
        reportSummary: `**REGULATORY BATTLEGROUND — THE BULL CASE**
In a flurry of FCC filings, SpaceX continues pushing for relaxed aggregate out-of-band emissions limits (EPFD). The key question: what message would the FCC send to players like ASTS that invested billions in R&D to comply with regulations (including a giant phased array for beam precision), in order to favor players whose smaller satellites can't meet long-known standards? EchoStar remains "vehemently opposed" to granting SpaceX a waiver, stating the Commission has already rejected SpaceX's call for weaker limits. If the FCC stays firm, ASTS could find itself as the SOLE licensed SCS player in the world's richest telecom market. SpaceX would face tough choices: (1) redesign satellites amid possible ASTS patent enforcement, or (2) find other frequencies and/or buy contiguous spectrum from EchoStar.

**Q2/24 OPERATIONAL HIGHLIGHTS**
In a major surprise, management announced building 17 BB2 satellites ready for Q1/25 launch — versus just 1 BB2 originally planned. BB2 satellites are 3.4x bigger than BlueWalker 3. Combined with 5 BB1 satellites launching September 2024, ASTS would have 22 satellites — almost half the 45+ needed for continuous US coverage. The company has achieved 95% vertical integration in its Texas facility, currently running at only 75% capacity. BlueWalker 3 has proven "remarkably resilient" to solar storms and weather events. Cost per satellite remains unchanged despite the production acceleration.

**FUNDING & CAPITAL STRATEGY**
ASTS does not expect to raise equity in 2024. Management explicitly prefers non-dilutive alternatives: export agency credit facilities and MNO prepayments should support constellation growth. Current cash: $370M. Prepayments from AT&T, Verizon, Vodafone and others have NOT yet been collected — they're subject to hitting BB1 operational milestones. Company is making progress with "a number of MNO partners" on formalizing agreements from the ~50 MNOs in the pipeline.

**MONETIZATION THESIS — THE TAM**
AT&T CEO John Stankey said at an investor conference that 30-40% of customers would pay for permanent connectivity. ASTS President Scott Wisniewski estimates initial pricing at $10-15/month, with ASTS receiving 50% ($5-7.50). With AT&T and Verizon's 146.4M postpaid phone customers (184M including prepaid), a 30-40% adoption rate implies $5.3-10.5B in total revenues, of which ASTS would get $2.65-5.25B — from the US market alone. Scotiabank's prior ARPU estimate of $3.50/month for developed markets was too low; they're raising to $4.50 (still conservative vs. the $10-15 reference). Emerging market ARPU estimated at $0.95/month.

**VALUATION FRAMEWORK**
Using an Equity Free Cash Flow model, Scotiabank demands a 16.4% yield (well above the 12.9% funding cost) on the present value of first meaningful EFCF generation in 2028. This yields a $28 price target. The model projects ASTS reaching profitability in 2026 (Net Income: $6M) before scaling to $795M net profit in 2027 and $2.6B by 2029. The path to profitability is driven by operating leverage: EBITDA margins expand from 30% (2025) to 50% (2026) to 62% (2027) as the high-fixed-cost satellite infrastructure is leveraged across a growing subscriber base.

**PRICE TARGET PROGRESSION**
$7.50 (Mar 5, 2024) → $7.40 (Apr 1, 2024) → $12.90 (May 29, 2024) → $21.10 (Jul 25, 2024) → $28.00 (Aug 15, 2024). The PT has nearly 4x'd in 5 months as execution milestones de-risk the story.`,
        assumptions: [
          { label: 'Rev 2024E', value: '$184M' },
          { label: 'Rev 2025E', value: '$1.35B' },
          { label: 'EBITDA 2025E', value: '$404M' },
          { label: 'Global ARPU', value: '$4.50 (dev)' },
          { label: 'EM ARPU', value: '$0.95/mo' },
          { label: 'Sats 2024E', value: '6' },
          { label: 'Sats 2025E', value: '55' },
          { label: 'Yield Demanded', value: '16.4%' },
          { label: 'Funding Cost', value: '12.9%' },
        ],
        catalysts: [
          '5 BB1 satellites launch first half Sep 2024',
          '17 BB2 satellites (3.4x bigger than BW3) ready for Q1/25 launch',
          'With 5 BB1 + 17 BB2 = 22 sats, almost half of 45+ needed for continuous US coverage',
          'FCC EPFD ruling could make ASTS sole licensed US SCS player if SpaceX denied',
          'MNO prepayments from ~50 partners yet to formalize (subject to BB1 milestones)',
          'Defense & government contracts expanding (2 new contracts recent months)',
          'AT&T/Verizon 146.4M postpaid subs; 30-40% willing to pay $10-15/mo per CEO Stankey',
        ],
        risks: [
          'Failure to launch/deploy/operate 5 BB1 satellites would be major setback vs Starlink',
          'Need 25 satellites to reach most attractive markets',
          'Additional funding required for Phase II and global constellation',
          'Regulatory permits needed in multiple countries for commercial service',
          'Risk Ranking: SPECULATIVE (exceptionally high financial/operational risk)',
        ],
        estimates: [
          { metric: 'Revenue ($M)', fy25: '1,345', fy26: '2,703', fy27: '4,213' },
          { metric: 'EBITDA ($M)', fy25: '404', fy26: '1,352', fy27: '2,612' },
          { metric: 'EBITDA Margin', fy25: '30%', fy26: '50%', fy27: '62%' },
          { metric: 'Net Profit ($M)', fy25: '(210)', fy26: '6', fy27: '795' },
          { metric: 'EPS', fy25: '($0.65)', fy26: '$0.02', fy27: '$2.46' },
          { metric: 'Satellites', fy25: '55', fy26: '115', fy27: '175' },
          { metric: 'Subscribers (M)', fy25: '5', fy26: '55', fy27: '210' },
          { metric: 'Capex ($M)', fy25: '1,115', fy26: '1,326', fy27: '1,130' },
        ],
        methodology: 'Equity Free Cash Flow (EFCF) model demanding 16.4% yield (well above 12.9% funding cost) on present value of first year of meaningful EFCF generation (2028). Implies $28/share.',
        fullNotes: `DISCLOSURE: Scotiabank has managed/co-managed public offering in past 12 months, received IB compensation, and undertaken underwriting liability for ASTS. Analysts employed by non-U.S. affiliates are not registered with FINRA.`
      },
      // === Jul 25, 2024 - PT Raise $12.90 → $21.10 (FULL REPORT) ===
      {
        date: '2024-07-25',
        action: 'PT Raise',
        priceTarget: 21.10,
        previousTarget: 12.90,
        rating: 'Buy',
        ratingNormalized: 'bullish',
        isFullReport: true,
        thesis: 'BlueBirds heading to Cape Canaveral; 66-page FCC Interference Analysis paves way for first-ever SCS license. Discontinuing short-term valuation methods and focusing solely on long-term EFCF potential. VOD/VZ tower divestitures may signal pressure on tower valuations. Buy.',
        reportSummary: `**BLUEBIRDS HEADING TO CAPE CANAVERAL**
First 5 commercial BlueBird satellites completed, each with 693 sq ft communications arrays. Ready for shipment to Cape Canaveral during first week of August, with 7-day launch window in September. The "string of pearls" formation will allow coverage of 99% of planet's population for less than an hour a day, allowing MNOs worldwide to test capabilities and begin monetization efforts in the U.S.

**66-PAGE FCC INTERFERENCE ANALYSIS**
On July 18, 2024, ASTS filed a 66-page Interference Analysis demonstrating compatibility with incumbent operations in SCS service link bands. We find the filing impressive in terms of technical details, which we contrast with SpaceX's two-page letter asking FCC to soften regulations. The Analysis demonstrates SCS operations in frequencies below 1 GHz (850 MHz) and above 1 GHz (PCS) will not create harmful interference. Crucial step towards first-ever SCS license.

**DISCONTINUING SHORT-TERM VALUATION METHODS**
When we initiated coverage in March 2024, investors feared the company's ability to survive funding needs. Today we are in a different situation: (1) First 5 BB satellites ready for launch; (2) Financial backing from AT&T ($20M), Verizon ($100M total), Vodafone ($25M) = ~$408M firepower; (3) FCC issued SCS ruling making it world's first regulator to adopt satellite+wireless framework; (4) Advantage over SpaceX on interference compliance. We're discontinuing SOTP models based on 2026 Rev/EBITDA and focusing exclusively on EFCF (2028).

**TOWER VALUATIONS MAY BE UNDER PRESSURE**
Vodafone and Verizon are SpaceMobile shareholders. The fact that they're divesting towers weeks before BB1 launch could signal tower valuations may soon be under pressure. Both companies have first-hand access to technical data. As we explained in our initiation, it is at least 10x more expensive to bring connectivity to a remote area with a traditional tower than with a Bluebird.

**FUNDING MATH**
Cash at hand + credit facilities + VZ deal ($100M) + AT&T ($20M) + VOD ($25M) = ~$408M. If all warrants exercised: $201M proceeds, +17.5M shares. Continuous US service with 45 satellites would cost ~$900M, implying $291M deficit. However, prepaid commitments in 2025 (ASTS has relationships with 45 MNOs) plus defense/emergency contracts could completely fund the deficit. Verizon alone committed $65M in prepayments.

**VALUATION: $21.10/SHARE**
Equity Free Cash Flow model demanding 16.4% yield (well above funding costs of 12.9%) on present value of first year of meaningful EFCF generation (2028). 2028 is only the first year of strong EFCF, which is expected to grow exponentially afterwards. Our $21.10/share estimate remains conservative subject to significant upside.`,
        assumptions: [
          { label: 'Price Target', value: '$21.10' },
          { label: 'Prev Target', value: '$12.90' },
          { label: 'Funding Cost', value: '12.9%' },
          { label: 'Fair FCF Yield', value: '16.4%' },
          { label: 'Market Cap', value: '$3.6B' },
          { label: 'EV', value: '$3.6B' },
          { label: 'Shares O/S', value: '269M' },
          { label: 'Float', value: '121M' },
        ],
        catalysts: [
          'First 5 BlueBird satellites completed, shipping to Cape Canaveral',
          '7-day launch window in September 2024',
          '66-page FCC Interference Analysis filed (vs SpaceX 2-page letter)',
          '"String of pearls" formation covers 99% of population',
          'Financial backing: AT&T $20M, Verizon $100M, Vodafone $25M',
          'VOD/VZ tower divestitures may signal tower valuation pressure',
          'FCC SCS ruling — world\'s first satellite+wireless framework',
          'Prepaid commitments in 2025 from 45 MNOs could fund deficit',
        ],
        risks: [
          'Failure to successfully launch/deploy 5 BB1 satellites would be major setback',
          'ASTS will need to raise additional funds for Phase II and global constellation',
          'Additional regulatory permits needed in multiple countries',
          'Risk Ranking: Speculative',
        ],
        estimates: [
          { metric: 'Revenue ($M)', fy25: '611', fy26: '—', fy27: '—' },
          { metric: 'EBITDA ($M)', fy25: '153', fy26: '424', fy27: '1,702' },
          { metric: 'FCF ($M)', fy25: '(613)', fy26: '(384)', fy27: '859' },
          { metric: 'FCF/Share', fy25: '($2.0)', fy26: '($1.2)', fy27: '$2.8' },
          { metric: 'Satellites', fy25: '45', fy26: '75', fy27: '110' },
        ],
        methodology: 'Equity Free Cash Flow model demanding 16.4% yield (well above funding costs of 12.9%) on present value of first year of meaningful EFCF generation (2028). Discontinuing EV/Sales and EV/EBITDA SOTP methods. Implies $21.10/share.',
        fullNotes: `VALUATION MODEL (Exhibit 1):
- SpaceMobile 10Y Funding Cost: 12.9%
- Telecom 10Y Average Funding Cost: 7.3%
- SpaceMobile Proportional Difference vs Sector: 76.7%
- Telecom 10Y Average FCF Yield: 9.3%
- Fair FCF Yield (d/e * g): 16.4%
- Value per share: $21.1

PRICE TARGET HISTORY (Page 8):
- Mar 5, 2024: $7.50 (Initiation)
- Apr 1, 2024: $7.40
- May 29, 2024: $12.90
- Jul 25, 2024: $21.10 (This report)

DISCLOSURE: Scotiabank has managed/co-managed public offering in past 12 months, received IB compensation, and undertaken underwriting liability for ASTS.`
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CANTOR FITZGERALD - Colin Canfield (Coverage since February 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    firm: 'Cantor Fitzgerald',
    analyst: 'Colin Canfield',
    coverageSince: 'February 2025',
    currentPT: 30,
    currentRating: 'Overweight',
    currentRatingNormalized: 'bullish',
    reports: [
      { date: '2025-05-13', action: 'Maintained', priceTarget: 30, rating: 'Overweight', ratingNormalized: 'bullish', source: 'Investing.com', sourceUrl: 'https://www.investing.com/', isFullReport: false },
      { date: '2025-03-04', action: 'Maintained', priceTarget: 30, rating: 'Overweight', ratingNormalized: 'bullish', source: 'Investing.com', sourceUrl: 'https://www.investing.com/', isFullReport: false },
      { date: '2025-02-06', action: 'Initiation', priceTarget: 30, rating: 'Overweight', ratingNormalized: 'bullish', source: 'Investing.com', sourceUrl: 'https://www.investing.com/', isFullReport: true,
        thesis: 'Initiating coverage with Overweight rating and $30 price target on AST SpaceMobile.'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // BANK OF AMERICA - Michael Funk (Coverage since June 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    firm: 'Bank of America',
    analyst: 'Michael Funk',
    coverageSince: 'June 2025',
    currentPT: 100,
    currentRating: 'Neutral',
    currentRatingNormalized: 'neutral',
    reports: [
      // === Jan 8, 2026 - PT Raise to $100 (FULL REPORT) ===
      {
        date: '2026-01-08',
        action: 'PT Raise',
        priceTarget: 100,
        previousTarget: 85,
        rating: 'Neutral',
        ratingNormalized: 'neutral',
        source: 'BofA Global Research',
        sourceUrl: 'https://www.marketbeat.com/',
        isFullReport: true,
        thesis: 'LEO will gain more attention in 2026 as ASTS and Starlink jockey for full cellular service. Multiple catalysts on horizon.',
        keyPoints: [
          'Fully funded with $1.2B cash on Q3 balance sheet',
          'BB6 launch provides additional step toward full-service with 45-60 satellites',
          'Partnerships with AT&T, Verizon, Vodafone, and 50+ MNOs provide subscriber opportunity',
          'DCF assumptions: 12% WACC, 10% terminal growth (up from 9%)',
          'Await progress on: (1) BlueBird constellation launch, (2) successful operation, (3) subscriber capture'
        ],
        catalysts2026: [
          { catalyst: 'Manufacturing Cadence', impact: 'Positive', outlook: '>11 BlueBirds in manufacturing, ~40 satellite equivalent microns by early 2026', timeframe: 'Increasing to start 2026' },
          { catalyst: 'Launch Cadence', impact: 'Positive', outlook: 'Launch every 45 days, 45-60 satellites by YE26, ~75 launches contracted (SpaceX, Blue Origin)', timeframe: 'Throughout 2026' },
          { catalyst: 'Partial Service', impact: 'Positive', outlook: 'Partial service in primary markets 1H26 with >25 satellites in LEO', timeframe: '1H26' },
          { catalyst: 'Full Space Service', impact: 'Positive', outlook: '45-60 satellites providing global coverage, revenue acceleration from >50 MNO partners (~3.2B subscribers)', timeframe: 'YE2026' }
        ]
      },
      // === Oct 30, 2025 - PT Raise to $85 ===
      {
        date: '2025-10-30',
        action: 'PT Raise',
        priceTarget: 85,
        previousTarget: 80,
        rating: 'Hold',
        ratingNormalized: 'neutral',
        source: 'TipRanks/Futu News',
        sourceUrl: 'https://www.tipranks.com/',
        isFullReport: false,
        thesis: 'Raising price target ahead of Q3 earnings. Maintaining Hold rating.'
      },
      // === Sep 12, 2025 - PT Raise to $80 (FULL REPORT) ===
      {
        date: '2025-09-12',
        action: 'PT Raise',
        priceTarget: 80,
        previousTarget: 55,
        rating: 'Neutral',
        ratingNormalized: 'neutral',
        source: 'BofA Global Research',
        sourceUrl: 'https://www.marketbeat.com/',
        isFullReport: true,
        thesis: 'Catalysts closer to reality as management shipped BlueBird 2 satellite for launch.',
        keyPoints: [
          'DCF valuation appropriate due to early stage, high projected growth, outyear FCF timeline',
          'DCF assumptions: 12% WACC, ~9% terminal growth (up from 8%)',
          '$80 PO based on DCF analysis supported by EV/Sales/Growth multiple vs high-growth software'
        ],
        methodology: 'DCF-based PO implies 0.50x 2026 EV/Sales/Growth multiple. Software companies trade at 0.44-0.50x 2025/2026 EV/Sales/Growth.',
        upside: ['Faster satellite manufacturing/launch cadence', 'Lower satellite-related capex', 'Accelerated subscriber adoption', 'Higher ARPUs'],
        downside: ['Manufacturing and launch delays', 'Long-dated subscriber adoption', 'Lower ARPUs', 'Increased satellite costs', 'Unforeseen collisions/constellation destruction', 'Technology malfunctions']
      },
      // === Jun 25, 2025 - Initiation at $55 ===
      {
        date: '2025-06-25',
        action: 'Initiation',
        priceTarget: 55,
        rating: 'Neutral',
        ratingNormalized: 'neutral',
        source: 'MarketBeat',
        sourceUrl: 'https://www.marketbeat.com/',
        isFullReport: true,
        thesis: 'Initiating coverage with Neutral rating. AST SpaceMobile presents significant opportunity but also substantial execution risks.'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // WILLIAM BLAIR - Louie DiPalma (Coverage since August 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    firm: 'William Blair',
    analyst: 'Louie DiPalma',
    coverageSince: 'August 2025',
    currentPT: null,
    currentRating: 'Market Perform',
    currentRatingNormalized: 'neutral',
    reports: [
      { date: '2025-08-21', action: 'Initiation', priceTarget: null, rating: 'Market Perform', ratingNormalized: 'neutral', source: 'Investing.com', sourceUrl: 'https://www.investing.com/', isFullReport: true,
        thesis: 'Initiating coverage with Market Perform rating. No price target provided.'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // OPPENHEIMER - Timothy Horan (Coverage since May 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    firm: 'Oppenheimer',
    analyst: 'Timothy Horan',
    coverageSince: 'May 2025',
    currentPT: null,
    currentRating: 'Perform',
    currentRatingNormalized: 'neutral',
    reports: [
      { date: '2025-05-05', action: 'Initiation', priceTarget: null, rating: 'Perform', ratingNormalized: 'neutral', source: 'TipRanks', sourceUrl: 'https://www.tipranks.com/', isFullReport: true,
        thesis: 'Initiating coverage with Perform rating. No price target provided.'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CLEAR STREET - Greg Pendy (Coverage since July 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    firm: 'Clear Street',
    analyst: 'Greg Pendy',
    coverageSince: 'July 2025',
    currentPT: 137,
    currentRating: 'Buy',
    currentRatingNormalized: 'bullish',
    reports: [
      // === Jan 2026 - PT Raise $87 → $137 (FULL REPORT - Golden Dome & DoD) ===
      {
        date: '2026-01-20',
        action: 'PT Raise',
        priceTarget: 137,
        previousTarget: 87,
        rating: 'Buy',
        ratingNormalized: 'bullish',
        reportTitle: "A 'BlueBird' in the Hand and a 'Golden Dome' on the Horizon",
        source: 'Clear Street Research',
        isFullReport: true,
        thesis: 'We raise our price target on AST SpaceMobile to $137 (from $87) and reiterate our Buy rating. We remain bullish on the direct-to-cellular market, as rising competition from SpaceX/Starlink is likely to push mobile network operators to rely more heavily on ASTS partnerships to defend subscriber bases. Higher defense revenue adds ~$460M to 2029E EBITDA with the commercial outlook largely unchanged.',
        reportSummary: `**RECENT DEVELOPMENTS REINFORCING OUR VIEW**
✅ Direct-to-Cell Execution: In late 2025 the BlueBird-6 launched, deploying the largest communications array ever placed in LEO.
✅ Department of Defense Opportunity Expanding: On January 16th, ASTS was chosen to compete in a program under Golden Dome.
✅ Raising Outlook: Higher defense revenue adds ~$460M to 2029E EBITDA with the commercial outlook largely unchanged.

**VALUATION ADJUSTMENT**
Our revised target of $137 is based on two primary changes: extending our valuation period to 2029E (up from 2028E) and applying a lower 20x EBITDA multiple (down from 25x). The reduced multiple is a consequence of the projected forward EBITDA CAGR decreasing from ~22% in 2028E to ~16% in 2029E. The new $137 target is derived from a revised 2029E EBITDA of $2.5B, which now incorporates additional revenue from the Department of Defense (DoD).

**BLUEBIRD-6 LAUNCH VALIDATES EXECUTION**
ASTS's successful late-December launch of the largest LEO satellite array to date marks a key milestone, further validating its 2026 pathway of 45 to 60 launches.

**DUAL-USE BEYOND DIRECT-TO-CELL**
The Missile Defense Agency's SHIELD program validates ASTS's constellation for high-priority defense missions beyond commercial Direct-to-Cell.

**RAISING REVENUE AND EBITDA ON EXPANDED OPPORTUNITY**
We primarily increase government DoD estimates, driving consolidated estimates upward:
• 2028E: Revenue up 14% to $2.6B; EBITDA up 20% to $1.5B
• 2029E: Revenue up 18% to $4.0B; EBITDA up 24% to $2.5B

**SPECTRUM OPPORTUNITY**
ASTS's well-timed early 2025 bid for 45 MHz of U.S. L-band spectrum is now seeking FCC approval. Based on recent comparable transactions, we estimate the spectrum value at ~$16B (~$1.05 per POP across 350M people), or ~$24 per share.`,
        assumptions: [
          { label: 'Price Target', value: '$137.00' },
          { label: 'Prev Target', value: '$87.00' },
          { label: 'PT Change', value: '+57%' },
          { label: 'Valuation Period', value: '2029E (from 2028E)' },
          { label: 'EBITDA Multiple', value: '20x (from 25x)' },
          { label: '2029E EBITDA', value: '$2.5B' },
          { label: 'DoD EBITDA Contribution', value: '+$460M to 2029E' },
          { label: 'L-band Spectrum Value', value: '~$16B (~$24/share)' },
        ],
        catalysts: [
          'BlueBird-6 launch validates execution — largest LEO array ever deployed',
          'Golden Dome program selection (Jan 16) expands DoD opportunity',
          'MDA SHIELD program validates dual-use defense capability',
          '45 MHz L-band spectrum bid awaiting FCC approval (~$16B value)',
          '2026 pathway of 45-60 satellite launches',
        ],
        risks: [
          'SpaceX/Starlink competition in direct-to-cellular market',
          'Forward EBITDA CAGR declining from ~22% to ~16%',
          'FCC approval timing for L-band spectrum',
        ],
        methodology: '20x multiple on 2029E EBITDA of $2.5B. Valuation period extended to 2029E (from 2028E). Multiple reduced from 25x due to lower forward EBITDA CAGR (~16% vs ~22%).',
        fullNotes: `ESTIMATE REVISIONS:
| Metric | 2028E Old | 2028E New | Change | 2029E Old | 2029E New | Change |
| Revenue | $2.3B | $2.6B | +14% | $3.4B | $4.0B | +18% |
| EBITDA | $1.3B | $1.5B | +20% | $2.0B | $2.5B | +24% |

SPECTRUM VALUATION:
- 45 MHz of U.S. L-band spectrum
- Value: ~$16B (~$1.05 per POP × 350M people)
- Per share value: ~$24

DISCLOSURE: Clear Street does and seeks to do business with companies covered in its research reports. Distributed January 2026.`
      },
      { date: '2025-11-12', action: 'PT Raise', priceTarget: 87, previousTarget: 59, rating: 'Buy', ratingNormalized: 'bullish', source: 'TipRanks', sourceUrl: 'https://www.tipranks.com/', isFullReport: false,
        thesis: 'Raising price target post-Q3 results.'
      },
      { date: '2025-07-10', action: 'Initiation', priceTarget: 59, rating: 'Buy', ratingNormalized: 'bullish', source: 'Investing.com', sourceUrl: 'https://www.investing.com/', isFullReport: true,
        thesis: 'Initiating coverage with Buy rating and $59 price target.'
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ROTH CAPITAL - Scott Searle (Coverage since April 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    firm: 'Roth Capital',
    analyst: 'Scott Searle',
    coverageSince: 'April 2025',
    currentPT: 82.50,
    currentRating: 'Buy',
    currentRatingNormalized: 'bullish',
    reports: [
      { date: '2025-11-11', action: 'PT Raise', priceTarget: 82.50, previousTarget: 56, rating: 'Buy', ratingNormalized: 'bullish', source: 'TipRanks', sourceUrl: 'https://www.tipranks.com/', isFullReport: false,
        thesis: 'Raising price target post-Q3 results.'
      },
      // === Sep 8, 2025 - Reiterate $56 (FULL REPORT) ===
      {
        date: '2025-09-08',
        action: 'Reiterate',
        priceTarget: 56,
        rating: 'Buy',
        ratingNormalized: 'bullish',
        reportTitle: 'Starlink Spectrum Buy Validates Strategy & Market Opportunity',
        source: 'Roth Capital Research',
        isFullReport: true,
        thesis: 'The Echostar fire sale continues as the company entered a definitive agreement to sell spectrum (AWS-4/H-block) to Starlink for $17B+. While providing Starlink with incremental capacity for D2D, we believe services will require next-gen satellites and smartphone refresh. The D2D go-to-market continues to favor ASTS with AT&T and Verizon relationships vs Starlink\'s T-Mobile partnership. The long-term story is unchanged. Maintain Buy and $56 PT.',
        reportSummary: `**$17B+ ECHOSTAR-STARLINK TRANSACTION**
This AM, Echostar announced it has entered a definitive agreement with SpaceX to sell the company's AWS-4 and H-block spectrum for $17B+ to Starlink. This consists of up to $8.5 billion in cash and up to $8.5 billion in SpaceX stock, plus ~$2B of SpaceX cash interest payments payable on EchoStar debt through November of 2027. We believe the transaction entails 50MHz of spectrum (5MHz of paired H-Block spectrum (1915-1920/1995-2000) and 20MHz of paired AWS-4 spectrum (2000-2020/2180-2200), which translates to ~$1.15 per MHz/pop). We believe this deal is consistent with FCC mandates, which under incoming Chairman Brendan Carr, continues to prioritize putting the spectrum into the hands of operators that will deploy services, and thus the economy (in contrast to the Echostar spectrum warehousing strategy).

**MORE D2D CAPACITY...AND DIRECT TO CONSUMER?**
Ultimately, this spectrum will enable incremental capacity for Starlink's Direct-to-Device ("D2D") services, which today are competitively deficient and simply provide text capabilities. To provide AST SpaceMobile-like services (broadband, voice & text), we believe Starlink will require next-gen satellites, as part of the regular satellite refresh cycle, but initial details are sparse. We also believe that current generation smartphones lack support for Echostar spectrum (AWS-4 and H-block spectrum, or bands 66 and 70). Importantly, beyond spectrum and satellites, the D2D model currently utilizes mobile network operators (MNOs) for go-to-market. At present, ASTS has agreements with AT&T and Verizon, while Starlink has a relationship with T-Mobile (text only services, at present). However, we believe that the amount of spectrum under the Echostar transaction (50MHz) opens the door for a direct to consumer model for D2D services, which is consistent with its broadband LEO strategy (FWA). This go-to-market strategy would likely push mobile operators into the ASTS ecosystem, in our opinion.

**STRATEGY VALIDATED AND LONG-TERM MODEL UNCHANGED**
While we expect ASTS shares to be weaker on the announcement, the Starlink move continues to validate the ASTS strategy and market opportunity. Additionally, the timeline to market should trail ASTS, given the lead times on satellite and smartphone upgrades. We also believe that a direct-to-consumer model would further enhance the ASTS partnerships with both domestic and international carriers. Additionally, with early T-Mo satellite text adoption validating the market opportunity (1.8M registrations or 1.5%+ penetration of the T-Mo subscriber base at launch), we believe that our estimates in 2028+ are conservative. Combined with our pricing assumptions of $10-15/month for superior services, we remain comfortable with our expectations and highlight that each incremental 50bp penetration of the top 10 MNO customers translates to $0.80+ incremental EPS by 2030. We maintain our Buy and $56PT.`,
        assumptions: [
          { label: 'Price Target', value: '$56.00' },
          { label: 'Stock Price (9/5/25)', value: '$42.41' },
          { label: '52-Week Range', value: '$17.72-$60.06' },
          { label: 'Shares Out (mil)', value: '269.13' },
          { label: 'Market Cap (mil)', value: '$15,007.57' },
          { label: 'Cash (mil)', value: '$939.4' },
          { label: 'Total Debt (mil)', value: '$490.2' },
        ],
        catalysts: [
          'Echostar spectrum sale validates D2D market opportunity',
          'ASTS maintains AT&T and Verizon relationships vs Starlink/T-Mobile',
          'T-Mo 1.8M registrations (1.5%+ penetration) validates market',
          'Each 50bp penetration of top 10 MNOs = $0.80+ incremental EPS by 2030',
        ],
        risks: [
          'Starlink incremental D2D capacity from Echostar spectrum',
          'Potential Starlink direct-to-consumer model bypassing MNOs',
          'Near-term share weakness expected on announcement',
        ],
        estimates: [
          { metric: 'Revenue ($M)', fy24: '4.4', fy25: '51.9', fy26: '159.8', fy27: '', fy28: '' },
          { metric: 'EBITDA ($M)', fy24: '(147.0)', fy25: '(180.0)', fy26: '(106.0)', fy27: '', fy28: '' },
          { metric: 'Non-GAAP EPS', fy24: '($1.96)', fy25: 'NM', fy26: 'NM', fy27: '', fy28: '' },
        ],
        methodology: 'Maintain $56 PT based on reduced discount rate due to mitigating risk factors around market adoption and access to capital. 2028-2030 EPS estimates believed to be conservative given T-Mo validation.',
        fullNotes: `REVENUE ESTIMATES:
| Yr Dec | Q1 | Q2 | Q3 | Q4 | FY |
| 2024A | $0.5A | $0.9A | $1.1A | $1.9A | $4.4A |
| 2025E | $0.7A | $1.2E | $22.6E | $27.4E | $51.9E |
| 2026E | $27.2E | $34.4E | $43.4E | $54.8E | $159.8E |

EBITDA ESTIMATES:
| Yr Dec | Q1 | Q2 | Q3 | Q4 | FY |
| 2024A | $30.6A | $33.7A | $44.2A | $38.8A | $(147.0)A |
| 2025E | $(44.2)A | $(50.5)E | $(43.7)E | $(41.3)E | $(180.0)E |
| 2026E | $(38.5)E | $(32.2)E | $(22.7)E | $(12.2)E | $(106.0)E |

DISCLOSURE: Roth Capital Partners. Scott W. Searle, CFA, Managing Director, Sr. Research Analyst. September 8, 2025.`
      },
      // === Jul 6, 2025 - PT Raise to $51 (FULL REPORT) ===
      {
        date: '2025-07-06',
        action: 'PT Raise',
        priceTarget: 51,
        previousTarget: 42,
        rating: 'Buy',
        ratingNormalized: 'bullish',
        reportTitle: 'T-Mo Subs Validate D2D Opportunity; Raising PT to $51',
        source: 'Roth Capital Research',
        isFullReport: true,
        thesis: 'ASTS shares are up 89% since our April initiation (vs. 20% for the NASDAQ) driven by positive news flow and an improving competitive landscape. T-Mo\'s announcement of 1.8M registrations for Starlink-enabled D2D text services is a key market validation. With an inferior service (text vs. voice, text and broadband) and $10 pricing, we believe this is extremely positive for ASTS penetration and pricing. Raising our PT to $51.',
        reportSummary: `**T-MO OFFERS POSITIVE DATA POINTS FOR THE MARKET**
Beyond the funding, timing, and technical performance of commercial services, customer adoption and pricing are the most asked questions by institutional investors. While ASTS has not provided details or formal targets for subscriber penetration or anticipated ARPUs, T-Mo's recent disclosures of registrations for its Starlink-enabled Direct-to-Device (D2D) provide positive early market momentum. The anticipated service launch on 7/23 provides basic text, including E-911, versus the anticipated text, voice, and broadband capabilities of ASTS. The service is currently being marketed as free for Premium pricing plans ("Experience Beyond"), which offers an upsell opportunity, and $10 per month for other users. Importantly, T-Mo's 1.8M registrations are impressive and represent 1.5%+ penetration of the T-Mo subscriber base. This is penetration at year 2-3 in our current ASTS model for Verizon, AT&T, and Vodafone (crossing 2% in 2028). Combined with our pricing assumptions of $10-15/month for superior services, we remain comfortable with our expectations and highlight that each incremental 50bp penetration of the top 10 MNO customers translates to $0.80+ incremental EPS by 2030.

**OPPORTUNISTIC FINANCING POSITIONS CONSTELLATION FOR CONTINUED EXPANSION**
Opportunistically, an ASTS PIPE effectively traded new shares for retirement of $235M of 4.5% 2032 converts (net impact of 1.1M shares and EPS neutral). Additionally, we anticipate Ligado debt in late 2025 and believe that the company has been active against its existing $500M ATM given the recent stock price. Finally, ASTS added $100M of non-dilutive equipment financing to support ongoing network deployment in 2025 and 2026. In aggregate, we believe that ASTS is near-fully funded for phase 1 of its constellation commercialization (45-60 satellites).

**RAISING PT TO $51; MAINTAIN BUY**
We are adjusting our share count for the recent PIPE and $235M convert retirement (EPS net neutral). Given the T-Mo model validation, we are raising our PT to $51, on a reduced discount rate due to mitigating risk factors, particularly around expected market adoption and access to capital. While we believe there could be meaningful upside to our 2028-2030 EPS expectations. Given the early nature of commercial services, we expect shares to remain volatile ahead of 2H26 service commercialization and would look for entry points at modestly lower levels.

**POSITIVE NEWS FLOW TRACKS EXPECTATIONS**
In addition to T-Mo's model validation, news flow remains positive, launch timelines continue to broadly track expectations, and we believe the company is near-fully funded for phase 1 of the constellation commercialization (45-60 satellites). Importantly, ASTS continues to expect 5 launches over the next 6-9 months, with non-continuous coverage (20-25) anticipated by year-end, which should permit initial revenue recognition for select government contracts (consistent with our model).

**KEY DEVELOPMENTS**
• Fairwinds Technologies: Field tests for key defense-related use cases validate the technology performance of the AST SpaceMobile constellation with service-level capabilities sufficient to support VPNs and other military tactical requirements.
• Vodafone: Vodafone has announced its European JV with ASTS (SatCo) offering its European go-to-market channel, and Vi (Vodafone India) provides a formal relationship to service the 1.1B Indian market by expanding Vi's telecom services of terrestrial connectivity with voice, video, data streaming, and internet access.
• Ligado: A term sheet has been established to provide ASTS access to 45MHz of incremental midband spectrum (largely L-band) to enable broadband speeds of 120Mbps. We expect this to be phased in over the next several years as smartphones incorporate support for these frequencies.`,
        assumptions: [
          { label: 'Price Target', value: '$51.00' },
          { label: 'Prev Target', value: '$42.00' },
          { label: 'Stock Price (7/3/25)', value: '$45.60' },
          { label: '52-Week Range', value: '$11.88-$53.22' },
          { label: 'Shares Out (mil)', value: '248.25' },
          { label: 'Market Cap (mil)', value: '$15,396.38' },
          { label: 'Cash (mil)', value: '$874.5' },
          { label: 'Total Debt (mil)', value: '$465.9' },
        ],
        catalysts: [
          'T-Mo 1.8M registrations (1.5%+ penetration) validates D2D market',
          '$235M PIPE + convert retirement (EPS neutral)',
          '$100M non-dilutive equipment financing added',
          'Near-fully funded for Phase 1 (45-60 satellites)',
          '5 launches expected over next 6-9 months',
          'Non-continuous coverage (20-25 sats) by year-end',
          'Fairwinds defense field tests validate technology',
          'Vodafone European JV (SatCo) + Vi India relationship',
          'Ligado 45MHz L-band term sheet for 120Mbps speeds',
        ],
        risks: [
          'Shares expected to remain volatile ahead of 2H26 commercialization',
          'Early nature of commercial services',
          'Would look for entry points at modestly lower levels',
        ],
        estimates: [
          { metric: 'Revenue ($M)', fy24: '4.4', fy25: '60.7', fy26: '159.8', fy27: '', fy28: '' },
          { metric: 'EBITDA ($M)', fy24: '(147.0)', fy25: '(157.5)', fy26: '(81.1)', fy27: '', fy28: '' },
          { metric: 'Non-GAAP EPS', fy24: '($1.96)', fy25: 'NM', fy26: 'NM', fy27: '', fy28: '' },
        ],
        methodology: 'PT raised to $51 on reduced discount rate due to mitigating risk factors around market adoption (T-Mo validation) and access to capital (PIPE, ATM, equipment financing). Each incremental 50bp penetration of top 10 MNOs = $0.80+ EPS by 2030.',
        fullNotes: `2028E EPS SENSITIVITY ANALYSIS (by ARPU and Avg Subscribers):
| ARPU | 9.0M | 9.5M | 10.0M | 10.5M | 11.0M | 11.5M | 12.0M | 12.5M |
| $5.00 | $0.08 | $0.16 | $0.24 | $0.32 | $0.40 | $0.48 | $0.56 | $0.64 |
| $6.00 | $0.37 | $0.46 | $0.56 | $0.65 | $0.75 | $0.84 | $0.94 | $1.03 |
| $6.50 | $0.51 | $0.61 | $0.72 | $0.82 | $0.92 | $1.03 | $1.13 | $1.23 |
| $7.00 | $0.65 | $0.76 | $0.87 | $0.99 | $1.10 | $1.21 | $1.32 | $1.43 |
| $7.50 | $0.80 | $0.91 | $1.03 | $1.15 | $1.27 | $1.39 | $1.51 | $1.63 |
| $8.00 | $0.94 | $1.06 | $1.19 | $1.32 | $1.45 | $1.57 | $1.70 | $1.83 |
| $8.50 | $1.08 | $1.22 | $1.35 | $1.49 | $1.62 | $1.75 | $1.89 | $2.02 |
| $9.00 | $1.22 | $1.37 | $1.51 | $1.65 | $1.79 | $1.94 | $2.08 | $2.22 |
Note: Yellow brackets the existing estimates.

2030E EPS SENSITIVITY FOR TOP 10 OEM PARTNER PENETRATION:
| ARPU | 1.0% | 1.5% | 2.0% | 2.5% | 3.0% | 3.5% | 4.0% | 4.5% |
| $5.00 | $0.48 | $1.41 | $2.53 | $3.18 | $3.84 | $4.49 | $5.14 | $5.80 |
| $6.00 | $0.85 | $1.97 | $3.05 | $3.84 | $4.62 | $5.41 | $6.19 | $6.98 |
| $6.50 | $1.04 | $2.25 | $3.31 | $4.16 | $5.01 | $5.86 | $6.71 | $7.56 |
| $7.00 | $1.23 | $2.53 | $3.57 | $4.49 | $5.41 | $6.32 | $7.24 | $8.15 |
| $7.50 | $1.41 | $2.81 | $3.84 | $4.82 | $5.80 | $6.78 | $7.76 | $8.74 |
| $8.00 | $1.60 | $3.09 | $4.10 | $5.14 | $6.19 | $7.24 | $8.28 | $9.33 |
| $8.50 | $1.79 | $3.37 | $4.36 | $5.47 | $6.58 | $7.69 | $8.81 | $9.92 |
| $9.00 | $1.97 | $3.66 | $4.62 | $5.80 | $6.98 | $8.15 | $9.33 | $10.51 |
Note: Yellow brackets the existing estimates.

REVENUE ESTIMATES:
| Yr Dec | Q1 | Q2 | Q3 | Q4 | FY |
| 2024A | $0.5A | $0.9A | $1.1A | $1.9A | $4.4A |
| 2025E | $0.7A | $10.0E | $22.6E | $27.4E | $60.7E |
| 2026E | $27.2E | $34.4E | $43.4E | $54.8E | $159.8E |

EBITDA ESTIMATES:
| Yr Dec | Q1 | Q2 | Q3 | Q4 | FY |
| 2024A | $30.6A | $33.7A | $44.2A | $38.8A | $(147.0)A |
| 2025E | $(44.2)A | $(40.5)E | $(37.5)E | $(35.2)E | $(157.5)E |
| 2026E | $(32.3)E | $(26.1)E | $(16.5)E | $(6.1)E | $(81.1)E |

PRIOR NON-GAAP EPS ESTIMATES:
| 2026E | $(0.23)E | $(0.23)E | $(0.22)E | $(0.20)E | $(0.88)E |

DISCLOSURE: Roth Capital Partners. Scott W. Searle, CFA, Managing Director, Sr. Research Analyst. July 6, 2025.`
      },
      // === Apr 10, 2025 - Initiation of Coverage $42 (FULL REPORT - 29 pages) ===
      {
        date: '2025-04-10',
        action: 'Initiation',
        priceTarget: 42,
        rating: 'Buy',
        ratingNormalized: 'bullish',
        reportTitle: 'ASTS: D2D Pioneer Set for Launch; Initiating Coverage With a Buy and $42PT',
        source: 'Roth Capital Research',
        isFullReport: true,
        thesis: 'We are initiating coverage of AST SpaceMobile (ASTS) with a Buy rating and $42PT. ASTS is a satellite pioneer of direct-to-device (D2D) broadband cellular services that utilize existing mobile network operator (MNO) spectrum to deliver connectivity to a pre-existing base of 5.6B unique global smartphone users. With 85-90% of the Earth uncovered by terrestrial services, we estimate a 2030 TAM of $30B+. With the company near-fully funded and network commercialization expected to ramp up in 2026, we expect rapidly accelerating sales growth in late 2026/2027.',
        reportSummary: `**WHAT IS AST SPACEMOBILE?**
AST SpaceMobile is a next-gen Low Earth Orbit ("LEO") constellation that provides direct-to-device (D2D) broadband cellular services. However, whereas historic solutions (and existing competitors) used proprietary protocols and frequencies, AST SpaceMobile is a standards-based (4G/5G) solution that utilizes existing carrier spectrum. In essence, this translates to an addressable ecosystem and installed base of 5B+ unique cellular users; or everyone who has a smartphone. By essentially roaming with existing carriers, ASTS plugs the gaps in terrestrial coverage which total 85-90% of the Earth's surface. The bottom line is that ASTS is a paradigm shift to provide global broadband coverage with Direct-to-Device capabilities.

**A $30B+ MARKET OPPORTUNITY**
AST SpaceMobile addresses an estimated $30B+ TAM (ROTH estimates) for direct-to-device (D2D) services. This is headlined by complementing the $1T+ market (source: AST SpaceMobile) for traditional terrestrial cellular services for subscribers that move in and out of cellular coverage—an estimated 3.4B people, representing $25B+ of subscription services by the end of the decade (source: GSMA: Satellite and NTN Summit). Beyond D2D services for MNOs (mobile network operators), ASTS has significant near-term opportunities servicing government, emergency services and select verticals such as maritime applications. Combined, we estimate these markets to comprise billions of dollars of annual opportunity. Finally, the rapidly emerging non-terrestrial network (NTN) opportunity for IoT devices is expected to ramp from less than $1B in 2024 with an estimated 4-5M connected devices, to billions of dollars with tens of millions of devices by the end of the decade.

**THE AST SPACEMOBILE SOLUTION — A DEFENSIBLE MOAT**
Key elements of the AST SpaceMobile solution include:
• A technology moat: ASTS is vertically integrated. The company supplies its own ASICs (AST5000 for next-gen satellites) and manufactures its own satellites at its Midland, Texas facility. This provides performance, cost and time-to-market advantages. This vertical integration is also supported by a strong IP portfolio around Doppler, beam forming, interference management, etc. (3,450 patent and patent-pending claims worldwide, of which approximately 1,390 have been officially granted or allowed). To date, the constellation has demonstrated throughput of 21Mbps with a near-term roadmap to 120Mbps. In contrast, competing solutions, including Starlink, offer simple text, voice or narrowband data capabilities.
• Regulatory simplicity: By utilizing existing carrier spectrum, the resource (spectrum) has already been allocated. The process only requires regulatory approval for D2D services. In the US, the FCC has granted the company Special Temporary Authority (STA) authorizing testing service, which we expect to evolve to approval for commercial services in 2H25. The company is going through a similar approval process in select international markets. Again, the spectrum is supported by an existing installed base of 5.6B unique global subscribers.
• Unique carrier relationships (and, in some cases, investment): ASTS has relationships with 50 carrier partners covering 3.2B+ subs including the Vodafone Group, AT&T, Verizon, Rakuten Mobile, Bell Canada, Orange, Telefonica, and TIM. Additionally, the company has secured strategic investment from AT&T, Google, Verizon, Vodafone, Rakuten, Bell Canada and American Tower. This provides an immediately addressable installed subscriber base to extend coverage.

**KEY MNO CUSTOMERS**
AST SpaceMobile has partnership agreements with 50 operators covering 3.2B+ subscribers. This list includes Vodafone Group, AT&T, Verizon, Rakuten Mobile, Bell Canada, Orange, Telefonica, TIM, Saudi Telecom Company, Zain KSA, Etisalat, Indosat Ooredoo Hutchison, Telkomsel, Smart Communications, Globe Telecom, Millicom, Smartfren, Telecom Argentina, MTN, Telstra, Africell, Liberty Latin America and others. Initial operations are expected to start in the US market upon anticipated regulatory approval in 3Q25 (largely expected to be beta subs and other "friendlies"), with ramping commercial sales in 2027. Similarly, we expect initial international contribution starting in late 2025 (markets serviceable above 30 degrees North latitude) with the full 2026 constellation accelerating driven by the Vodafone relationship.

**TOP 10 MNO RELATIONSHIPS**
| MNO | Markets | Subs | Investor | Notes |
| AT&T | United States | 118M | X | AST SpaceMobile investor |
| Verizon | United States | 115M | X | AST SpaceMobile investor |
| Vodafone | 15 markets | 261M | X | 71M Europe & 165M Africa, 158M IoT |
| Rakuten Mobile | Japan | 8M | X | New Japanese Operator |
| Bell Canada | Canada | 10M | X | AST SpaceMobile investor |
| Orange | 26 countries | 253M | — | 160M+ in Africa & MidEast |
| Telefonica | 12 markets Europe/LatAm | 299M | — | Pan-European/LatAm MNO |
| TIM | Italy & Brazil | 30M | — | — |
| Saudi Telecom | Saudi Arabia & MidEast | 30M | — | — |
| Zain | 7 markets | 54M | — | Pan Mideast/African MNO |

**NEAR FULLY FUNDED**
Over the past 5+ years, AST SpaceMobile has raised over $1.1B of capital, not including investments from strategic investors. This spans a combination of equity offerings, warrants, strategic investments (including carrier partners) and converts. Post the most recent raise ($460M convertible notes on 1/27/25), ASTS has $950M+ on the balance sheet. We estimate that phase 1 of the constellation deployment (45-60 satellites) will cost an additional ~$1B+ of cap-ex to commercialization, with the total global constellation (95 satellites) costs slightly exceeding $2B. Importantly, we believe that expansion beyond primary North American coverage can scale investment according to FCF and the ability to tap capital markets. Overall, ASTS's cost of capital has dramatically improved. Additionally, the company also has access to low-cost quasi-government funding.

Again, we estimate Adj EBITDA break-even for the initial constellation at 4-5M subs, with the global constellation at 6-7M subs. The constellation becomes internally fundable at an incremental 1M+ subs and ~3M subs for NA and global operations, respectively, given an estimated satellite commercial lifetime of seven years.

**VALUATION**
We are initiating coverage of ASTS with a Buy rating and $42PT. ASTS is effectively pre-revenue, but on the verge of a meaningful commercialization of services. However, the ASTS constellation with D2D capabilities combined with global operator partnerships is unique in the marketplace, in our opinion. Overall, ASTS has significant first mover and performance advantages versus legacy and next-gen satellite constellations. With break-even at ~2% US partner penetration (4-5M subs with phase 1 of 45-60 satellites), we see several dollars of earnings power as we approach 2030 (~$3.00+, or ~1.5% penetration (~18M subs) of the existing top 10 MNO customers). Consequently, we see longer-term upside to $74, or 25x 2030 EPS. We discount this target back 15% over 4 years to reach our $42PT.

Near-term we expect shares to be volatile and event driven, i.e. launch news, MNO relationships, etc., particularly given the current EV/2027 sales multiple of 15-20x. Consequently, we caution some near-term patience and to buy on the dips (such as we have been experiencing over the past two weeks). Also, Street consensus expectations entail significant sales ramps in 2026+, which could be subject to delays, in our opinion.

**RISKS**
• Unproven financial model: At present, ASTS has an unproven financial model. While arguably a meaningful opportunity exists for global satellite-based connectivity (mil/aero/gov, emergency services, consumer roaming, verticals, IoT, etc.), the pricing model has yet to be accepted in the marketplace. However, given the 3B+ sub installed base from its 50 global operators and North America subset of 200M+ subs (AT&T, Verizon) we believe that some fluidity and evolution of the pricing model does not materially derail the long-term opportunity. Again, we highlight adj EBITDA break-even in North America at 4-5M subs under our current model in late 2027.
• Additional capital requirements: We estimate that ASTS capital requirements to fully deploy phase 1 of the constellation (45+ satellites) and funding of operating losses translates to incremental capital slightly in excess of $1B. Post the January 2025 $460M convert offering, ASTS has $900M of cash on the balance sheet. Additionally, we believe that ASTS maintains adequate access to capital markets to fund the constellation completion and can scale its investment to 90 satellites in a more constrained capital environment.
• Competition: The market for satellite services is highly competitive including legacy GEO offerings, as well as high profile next-gen constellations, most notably Starlink among others. However, legacy constellations require specialized devices and entail significantly higher pricing models (typically $60-100+). Meanwhile, although Starlink occupies significant investor attention, the constellation has been constructed predominantly for broadband communications (FWA) and utilizes specialized equipment. Its most recent D2D services are text oriented (currently offered through T-Mobile) and the timeline for a full constellation (300-400 satellites with a planned 840 D2D satellite constellation) is undisclosed. However, we believe that architecture including power limitations translates to speeds significantly below AST SpaceMobile (14Mbps versus 120Mbps). Finally, IoT optimized constellations remain in the early deployment phase (Sateliot) and will address the lower end of the market (lower revisit rates, speeds, latency and ARPUs).
• Technology risk: While the first five Bluebird satellites have been successfully deployed and tested, there remains technology risk associated with the AST SpaceMobile constellation. This includes the successful launch of the remaining 45+ satellite constellation over the next 18 months. Additionally, further design assembly, integration, testing and launch of satellites and ground infrastructure will be ongoing. Compounding this are potential for delays and incremental costs associated with the development, launch and commercialization of the constellation as witnessed by the expected increase in satellite costs from $14M to between $15M and $19M for the next round of launches. That said, we believe that AST SpaceMobile has made significant advances with the launch of the first wave of satellites and the next wave of satellites has been contracted for launch services.
• Regulatory approval: AST SpaceMobile relies on MNO partners' spectrum and regulatory approval to operate in each market. Given that the company utilizes existing terrestrial spectrum licensed by MNOs, regulatory approval in each country is required to operate the constellation for MSS use. This process can be prolonged and subject to delays. Additionally, global D2D services could therefore be disrupted by select markets not achieving regulatory approval. To date, ASTS has regulatory approval in the US and is working towards approval in Europe and other markets.
• Global impacts: AST SpaceMobile is subject to multiple global issues including supply chain (components, etc.), regulatory approval, and geopolitical uncertainty.`,
        assumptions: [
          { label: 'Price Target', value: '$42.00' },
          { label: 'Stock Price (4/9/25)', value: '$24.14' },
          { label: '52-Week Range', value: '$2.02-$38.60' },
          { label: 'Shares Out (mil)', value: '227.10' },
          { label: 'Market Cap (mil)', value: '$6,424.78' },
          { label: 'Cash (mil)', value: '$982.0' },
          { label: 'Total Debt (mil)', value: '$618.0' },
          { label: 'Long-term Upside PT', value: '$74.00' },
          { label: 'Valuation Method', value: '25x 2030 EPS, 15% discount' },
          { label: 'TAM (2030E)', value: '$30B+' },
          { label: 'Break-even Subs', value: '4-5M (~2% penetration)' },
          { label: 'MNO Partners', value: '50 carriers, 3.2B+ subs' },
        ],
        catalysts: [
          'Near-fully funded for Phase 1 constellation (45-60 satellites)',
          '$460M convertible notes (Jan 2025) → $950M+ cash',
          'FCC STA granted; commercial approval expected 2H25',
          'Commercial services expected to commence 2H25 (beta), 2H26 (widespread)',
          '50 MNO partnerships covering 3.2B+ subscribers globally',
          'Strategic investors: AT&T, Verizon, Vodafone, Google, Rakuten, Bell Canada, American Tower',
          'Vodafone JV (SatCo) to accelerate European deployment',
          'Ligado 45MHz L-band spectrum access for 120Mbps speeds',
          '$43M SDA government contract (12-month recognition)',
        ],
        risks: [
          'Unproven financial model — pricing yet to be validated in marketplace',
          'Additional capital requirements of ~$1B+ for Phase 1 completion',
          'Competition from Starlink (840 D2D satellites planned), legacy GEO providers',
          'Technology risk — 45+ satellites to launch over next 18 months',
          'Satellite cost inflation: $14M → $15-19M per satellite',
          'Regulatory approval required in each market; potential delays',
          'Global supply chain and geopolitical risks',
        ],
        estimates: [
          { metric: 'Revenue ($M)', fy24: '4.4', fy25: '48.0', fy26: '159.8', fy27: '482.2', fy28: '929.7', fy29: '1,361.9', fy30: '1,781.3' },
          { metric: 'Adj EBITDA ($M)', fy24: '(147.0)', fy25: '(158.8)', fy26: '(78.7)', fy27: '(5.5)', fy28: '307.0', fy29: '711.8', fy30: '1,147.2' },
          { metric: 'EBITDA Margin %', fy24: 'NM', fy25: 'NM', fy26: 'NM', fy27: 'NM', fy28: '17.9%', fy29: '37.0%', fy30: '58.4%' },
          { metric: 'Operating Income ($M)', fy24: '(145.8)', fy25: '(242.8)', fy26: '(258.9)', fy27: '(266.1)', fy28: '(63.6)', fy29: '307.0', fy30: '1,107.2' },
          { metric: 'Net Income ($M)', fy24: '(221.7)', fy25: '(526.3)', fy26: '(266.4)', fy27: '(289.7)', fy28: '(88.6)', fy29: '285.5', fy30: '709.9' },
          { metric: 'Non-GAAP EPS', fy24: '($1.96)', fy25: '($0.58)', fy26: '($0.87)', fy27: '($0.87)', fy28: '($0.25)', fy29: '$0.75', fy30: '$1.96' },
          { metric: 'Cap-Ex ($M)', fy24: '$57M', fy25: '$119M', fy26: '$174M', fy27: '$310M', fy28: '$560M', fy29: '$230M', fy30: '$60M' },
        ],
        methodology: 'Initiate with Buy and $42PT. Long-term upside to $74 based on 25x 2030 EPS (~$3.00+). Discount $74 target back 15% per year over 4 years = $42. Break-even Adj EBITDA at 4-5M subs (~2% US partner penetration). Each 1% penetration of top 10 MNOs (~1.2B subs) = ~$1.50+ incremental fully taxed EPS.',
        fullNotes: `THE MODEL — REVENUE SEGMENTS:
• Military/aerospace, government and emergency services: To date, AST SpaceMobile has established a relationship with the SDA for critical government applications such as the Proliferated Warfighter Space Architecture representing a total of $43M of multi-year contract value. Further opportunities include emergency services (such as disaster recovery, FEMA). We believe the addressable market for ASTS could exceed $100M annually by the end of the decade.
• Maritime and other verticals: Geographically limited markets provide a near-term opportunity including maritime (government, commercial and personal), oil & gas (ocean rigs, remote operations), mining, etc. We estimate this opportunity at hundreds of thousands of addressable devices that could exceed $50M of annual revenue by the end of the decade.
• Consumer and enterprise: Via relationships with 45 operators including Verizon, AT&T, Vodafone, etc., AST SpaceMobile will launch its consumer services in 3Q25. This is expected to be the largest contributor to sales starting in 2026. Initially this will target US (first expected approval) and then international operators within 30 degrees North latitude. Services offerings are expected to comprise a combination of monthly subscriptions and day passes. While the model remains fluid, initial market pricing with T-Mobile on the limited Starlink network (text only) is charging $15-20/month. With the recently expanded Vodafone relationship (SatCo JV for European MNOs), we expect Europe/Vodafone to ramp in late 2026 (covering ~600M potential subs).
• IoT: We expect lower pricing on IoT subscription services given more limited utilization rates. However, with the addressable market measured in tens of million of units we believe that IoT could exceed $100M of annual sales by 2030. We expect this opportunity to ramp more meaningfully in 2027+ with global coverage.

SALES MODEL — QUARTERLY ESTIMATES:
| Quarter | 1Q26E | 2Q26E | 3Q26E | 4Q26E | 1Q27E | 2Q27E | 3Q27E | 4Q27E |
| Subscription | $7.2 | $14.4 | $23.4 | $34.8 | $52.7 | $77.7 | $105.6 | $136.2 |
| Other/Gov | $20.0 | $20.0 | $20.0 | $20.0 | $25.0 | $25.0 | $30.0 | $30.0 |
| Total Rev | $27.2 | $34.4 | $43.4 | $54.8 | $77.7 | $102.7 | $135.6 | $166.2 |

SUBSCRIBER PENETRATION MODEL:
| Year | 2026E | 2027E | 2028E | 2029E | 2030E |
| Developed Markets | 0.2M | 1.7M | 5.8M | 9.2M | 13.0M |
| Developing Markets | 0.0M | 0.0M | 0.4M | 0.8M | 1.2M |
| IoT/Other | 0.3M | 0.5M | 0.8M | 1.1M | 1.7M |
| Total Subs | 0.5M | 2.9M | 5.7M | 7.2M | 14.0M |
| Penetration (Top 10 MNOs) | 0.0% | 0.1% | 0.5% | 0.8% | 1.2% |

REVENUE MIX BY SEGMENT:
| Segment | 2026E | 2027E | 2028E | 2029E | 2030E |
| Subscription | 50% | 72% | 77% | 85% | 92% |
| Other/Gov | 50% | 24% | 22% | 15% | 8% |

2028E EPS SENSITIVITY ANALYSIS (ARPU × Average Subscribers):
| ARPU | 9.0M | 9.5M | 10.0M | 10.5M | 11.0M | 11.5M | 12.0M | 12.5M |
| $5.00 | $0.08 | $0.16 | $0.24 | $0.32 | $0.40 | $0.48 | $0.56 | $0.64 |
| $6.00 | $0.37 | $0.46 | $0.56 | $0.65 | $0.75 | $0.84 | $0.94 | $1.03 |
| $6.50 | $0.51 | $0.61 | $0.72 | $0.82 | $0.92 | $1.03 | $1.13 | $1.23 |
| $7.00 | $0.65 | $0.76 | $0.87 | $0.99 | $1.10 | $1.21 | $1.32 | $1.43 |
| $7.50 | $0.80 | $0.91 | $1.03 | $1.15 | $1.27 | $1.39 | $1.51 | $1.63 |
| $8.00 | $0.94 | $1.06 | $1.19 | $1.32 | $1.45 | $1.57 | $1.70 | $1.83 |
| $8.50 | $1.08 | $1.22 | $1.35 | $1.49 | $1.62 | $1.75 | $1.89 | $2.02 |
| $9.00 | $1.22 | $1.37 | $1.51 | $1.65 | $1.79 | $1.94 | $2.08 | $2.22 |
Note: Yellow brackets ($6.50-$7.00 ARPU, 9.5-10.0M subs) = existing estimates.

2030E EPS SENSITIVITY FOR TOP 10 OEM PARTNER PENETRATION:
| ARPU | 1.0% | 1.5% | 2.0% | 2.5% | 3.0% | 3.5% | 4.0% | 4.5% |
| $5.00 | $0.48 | $1.41 | $2.53 | $3.18 | $3.84 | $4.49 | $5.14 | $5.80 |
| $6.00 | $0.85 | $1.97 | $3.05 | $3.84 | $4.62 | $5.41 | $6.19 | $6.98 |
| $6.50 | $1.04 | $2.25 | $3.31 | $4.16 | $5.01 | $5.86 | $6.71 | $7.56 |
| $7.00 | $1.23 | $2.53 | $3.57 | $4.49 | $5.41 | $6.32 | $7.24 | $8.15 |
| $7.50 | $1.41 | $2.81 | $3.84 | $4.82 | $5.80 | $6.78 | $7.76 | $8.74 |
| $8.00 | $1.60 | $3.09 | $4.10 | $5.14 | $6.19 | $7.24 | $8.28 | $9.33 |
| $8.50 | $1.79 | $3.37 | $4.36 | $5.47 | $6.58 | $7.69 | $8.81 | $9.92 |
| $9.00 | $1.97 | $3.66 | $4.62 | $5.80 | $6.98 | $8.15 | $9.33 | $10.51 |
Note: Yellow brackets ($6.50-$7.00 ARPU, 1.5-2.0% penetration) = existing estimates. EPS taxed at 30% above 1.5% penetration in 2030.

EPS SENSITIVITY TO TOP 10 MNO PENETRATION (2026-2030E):
| Scenario | 2026E | 2027E | 2028E | 2029E | 2030E |
| Aggressive (2.3%) | ($0.80) | $0.22 | $1.69 | $3.35 | $4.98 |
| Moderate (1.5%) | ($0.87) | ($0.26) | $0.75 | $1.85 | $2.95 |
| Low (1.0%) | ($0.89) | ($0.64) | ($0.11) | $0.56 | $1.33 |

SATELLITE CONSTELLATION COMPARISON:
| Provider | Constellation | Frequency | # Satellites | Altitude | Latency | Lifetime | ARPU | Service |
| AST SpaceMobile | LEO | Cellular (850MHz) | 45+/95 | 508-527km | 20-40ms | 7+ yrs | $5-15* | Broadband cellular (120Mbps), 50 MNO relationships |
| Starlink | LEO | Ku/D2D | 7,000/12,000+ | 540-570km | 30ms | 5-7 yrs | $100/$15+ | Broadband FWA, Cellular: Text only, 6 MNO relationships |
| Viasat | GEO | Ku & KA | 3 | 35,786km | 560ms | 15 yrs | $350-$1k+ | Voice & data (up to 100Mbps) |
| Iridium | LEO | L Band | 66 | 780km | 40-50ms | 12.5 yrs | $60-100 | Voice & narrowband data |
| OneWeb | LEO | Ku | 716/6,372 | 1,200km | ~40ms | ~5 yrs | TBD | Broadband |
| Kuiper (Amazon) | LEO | KA | 578/3,236 | 590-630km | ~30ms | 7 yrs | TBD | Broadband FWA |
| Telesat | LEO | KA | 298/1,671 | 1,015-1,320km | 40-50ms | 10-12 yrs | TBD | Broadband FWA |
| Lynk | LEO | Cellular | 5/38 | 456-545km | NA | 7+ yrs | TBD | Text, voice, data. 35+ MNO relationships |
* ROTH Capital expectations

BALANCE SHEET (Historical):
| Item | 2021 | 2022 | 2023 | 2024 |
| Cash & equivalents | $324.5M | $239.3M | $88.1M | $567.5M |
| Total current assets | $335.8M | $268.3M | $106.9M | $600.2M |
| PP&E | $95.9M | $146.0M | $238.5M | $337.7M |
| Total Assets | $443.9M | $438.4M | $360.9M | $954.6M |
| Total current liabilities | $21.4M | $27.8M | $46.2M | $75.9M |
| LT Debt & Cap Lease | $5.0M | $4.8M | $59.3M | $155.6M |
| Total liabilities | $92.0M | $39.6M | $117.4M | $244.2M |
| Total Equity | $352.0M | $359.8M | $213.6M | $669.1M |

INCOME STATEMENT ESTIMATES:
| Metric | 2025E | 2026E | 2027E | 2028E | 2029E | 2030E |
| Revenue | $48.0M | $159.8M | $482.2M | $929.7M | $1,361.9M | $1,781.3M |
| Gross Profit | $22.5M | $116.8M | $427.2M | $862.2M | $1,291.9M | $1,711.3M |
| Engineering | $78.1M | $89.3M | $93.8M | $98.6M | $103.4M | $108.2M |
| R&D | $28.8M | $29.1M | $34.7M | $40.3M | $45.9M | $51.5M |
| G&A | $108.3M | $119.9M | $220.1M | $317.5M | $371.5M | $399.6M |
| Operating Income | $(242.8)M | $(258.9)M | $(266.1)M | $(63.6)M | $307.0M | $1,107.2M |
| Net Income | $(526.3)M | $(266.4)M | $(289.7)M | $(88.6)M | $285.5M | $709.9M |
| Shares (FD) | 324.0M | 324.0M | 334.0M | 354.5M | 378.2M | 378.2M |
| EPS (Basic) | $(1.41) | $(0.84) | $(0.87) | $(0.16) | $1.18 | $3.08 |
| Pro Forma EPS (FD) | $(0.58) | $(0.87) | $(0.87) | $(0.25) | $0.75 | $1.96 |

TECHNICAL STRATEGY (JC O'Hara, CAIA, CMT):
After trading in a well-defined downtrend starting in early 2021, ASTS was able to surge above resistance and form a higher high in June 2024. That swift move put many of our technical indicators into overbought conditions. Over the last few months, ASTS has been consolidating, showing sturdy support at $20 and stiff resistance at $35.50. Price has started to bounce nicely off support with an upside target closer to $35.

OPTIONS INSIGHTS (Alex Panagiotidis, Head of Derivatives):
ASTS's implied volatility appears fairly priced, trading at the 35th percentile over the prior year (2-month expiry) and at a small premium to 30-day realized volatility. The total Open Interest is ~645k contracts, skewed ~2:1 toward call options with January 2026 having the top 5 open interest positions (could be related to its convert). The average daily options volume of the last 20 days is ~64k contracts. ASTS is particularly volatile around financial disclosures such as earnings, where the average absolute earnings day move has been ~35% over the prior 1 year. ASTS has been moving ~7.12% per day over the prior one month.

DISCLOSURE: Roth Capital Partners, LLC. Scott W. Searle, CFA, Managing Director, Sr. Research Analyst. ssearle@roth.com (646) 616-2782. April 10, 2025. Important Disclosures & Regulation AC Certification(s) are located on pages 27 to 29 of this report.`
      }
    ]
  }
];
