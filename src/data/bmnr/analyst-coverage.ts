// @ts-nocheck
/**
 * BMNR Analyst Coverage Data
 * Extracted from BMNR.tsx for maintainability.
 * Add new reports at the TOP of each firm's reports array (newest first).
 * NEVER delete historical reports — this is an audit trail.
 */

import type { AnalystCoverage } from '@/components/shared/wallStreetTypes';

export const BMNR_ANALYST_COVERAGE: AnalystCoverage[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // B. RILEY SECURITIES - Fedor Shabalin (Coverage since October 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    firm: 'B. Riley Securities',
    analyst: 'Fedor Shabalin',
    coverageSince: 'October 2025',
    currentPT: 47,
    currentRating: 'Buy',
    currentRatingNormalized: 'bullish',
    notes: 'Part of B. Riley digital asset treasury company (DATCo) coverage universe. Uses mNAV-based methodology, viewing digital asset treasury companies as closed-end fund-like vehicles offering leveraged crypto exposure.',
    reports: [
      // === Jan 16, 2026 - Reiterate Buy/$47 (Beast Industries $200M Investment) ===
      {
        date: '2026-01-16',
        action: 'Reiterate',
        priceTarget: 47,
        previousTarget: 47,
        rating: 'Buy',
        ratingNormalized: 'bullish',
        reportTitle: 'BMNR — Beast Industries Partnership Reinforces Strategic Capital Allocation',
        source: 'B. Riley Securities Research',
        isFullReport: false,
        thesis: 'Partnership with Beast Industries (MrBeast) provides marketing access to 450M+ audience. Creates monetization pathways for MAVAN staking infrastructure through Beast\'s DeFi-integrated financial services platform. Strengthens institutional credibility as strategic capital allocator rather than passive treasury operator.',
        reportSummary: `**REITERATE BUY / $47 PT**
Following BMNR's $200M investment in Beast Industries (MrBeast). Tom Lee appeared on CNBC's "Squawk Box" Jan 15 to discuss the deal.

**PARTNERSHIP VALUE**
Marketing access to MrBeast's 450M+ YouTube subscriber audience. Monetization pathways for MAVAN staking infrastructure through Beast's anticipated DeFi-integrated financial services platform.

**ANALYST QUOTE**
"The partnership provides BMNR with marketing access to MrBeast's 450M+ audience while creating monetization pathways for its MAVAN staking infrastructure."

**STAKING DATA AT TIME**
1,838,003 ETH staked ($5.9B at $3,211/ETH). Annualized staking fee $374M (2.81% CESR). Greater than $1M per day.`,
        assumptions: [
          { label: 'Price Target', value: '$47 (maintained)' },
          { label: 'Rating', value: 'Buy (maintained)' },
          { label: 'Stock Price (~)', value: '$30.77' },
          { label: 'Beast Investment', value: '$200M equity' },
          { label: 'ETH Staked', value: '1,838,003' },
          { label: 'Staked Value', value: '$5.9B (at $3,211/ETH)' },
          { label: 'Annualized Staking Fee', value: '$374M (2.81% CESR)' },
        ],
        risks: [
          'Distribution and compliance risks for Beast Mobile financial platform',
          'Regulatory uncertainty for DeFi-integrated financial services',
          'Reliance on Beast platform that has not yet started operating',
          'Execution risk on MAVAN staking infrastructure integration',
        ],
      },
      // === Nov 20, 2025 - PT Cut $90 → $47, Buy Maintained ===
      {
        date: '2025-11-20',
        action: 'PT Cut',
        priceTarget: 47,
        previousTarget: 90,
        rating: 'Buy',
        ratingNormalized: 'bullish',
        reportTitle: 'DATCo Coverage Update — mNAV and Accumulation Assumptions Reduced',
        source: 'B. Riley Securities Research',
        isFullReport: false,
        thesis: 'Cut mNAV and accumulation assumptions through 2026 amid crypto slump that outpaced declines in underlying tokens. Despite cuts, company continues aggressive ETH accumulation. Still sees arbitrage in companies trading below mNAV. Expects buybacks, preferred deals, and ether restaking to support multiples. "Most constructive on BitMine and SharpLink."',
        reportSummary: `**PT CUT TO $47 FROM $90 (-47.8%)**
Crypto slump deepened. Cut mNAV and accumulation assumptions through 2026. Part of broader DATCo coverage adjustment — also cut FGNX to $5 from $8, NAKA halved to $1. BMNR stock fell ~11% on the day.

**THESIS INTACT**
Company continues aggressive ETH accumulation. Still sees arbitrage in companies trading below mNAV. Expects buybacks, preferred deals, and ether restaking to support multiples.

**KEY QUOTE**
"Most constructive on BitMine and SharpLink."`,
        assumptions: [
          { label: 'Price Target', value: '$47 (from $90)' },
          { label: 'PT Change', value: '-47.8%' },
          { label: 'Rating', value: 'Buy (maintained)' },
          { label: 'Stock Price (~)', value: '$26.02' },
        ],
        risks: [
          'Continued crypto slump reducing mNAV',
          'Accumulation assumptions may need further downward revision',
          'Persistent NAV discount across DATCo universe',
        ],
      },
      // === Oct 16, 2025 - Initiation with Buy, PT $90 ===
      {
        date: '2025-10-16',
        action: 'Initiation',
        priceTarget: 90,
        previousTarget: null,
        rating: 'Buy',
        ratingNormalized: 'bullish',
        reportTitle: 'BitMine Immersion Technologies — Initiation of Coverage',
        source: 'B. Riley Securities Research',
        isFullReport: true,
        thesis: 'Industrial-scale digital asset mining companies primarily hold cryptocurrencies, functioning similarly to closed-end funds. Such firms offer investors an opportunity for leveraged exposure to cryptocurrency returns. Investors optimistic about the future of the crypto market should consider these companies for potential gains.',
        reportSummary: `**INITIATION — BUY / $90 PT**
mNAV-based valuation. Views digital asset treasury companies (DATCos) as closed-end fund-like vehicles offering leveraged crypto exposure.

**METHODOLOGY**
Modified Net Asset Value (mNAV) approach. DATCo companies function similarly to closed-end funds, providing leveraged exposure to underlying crypto assets.

**COVERAGE UNIVERSE**
Part of broader B. Riley digital asset treasury company (DATCo) coverage universe including FGNX and NAKA.

**INSTITUTIONAL CONTEXT**
57 funds/institutions reporting positions (up 2,750% QoQ). Put/call ratio 0.55 (bullish). ARK Innovation ETF holds 4,061K shares (1.43%).`,
        assumptions: [
          { label: 'Price Target', value: '$90' },
          { label: 'Rating', value: 'Buy' },
          { label: 'Stock Price (~)', value: '$51.20' },
          { label: 'Methodology', value: 'mNAV-based (DATCo framework)' },
          { label: 'Implied Upside', value: '~75.8%' },
        ],
        catalysts: [
          'ETH price appreciation increasing mNAV',
          'Continued aggressive ETH accumulation',
          'Transition from NAV discount to NAV premium',
          'Leveraged crypto exposure appeal for bullish investors',
        ],
        risks: [
          'Crypto price decline reducing mNAV',
          'Persistent trading at NAV discount',
          'Regulatory uncertainty on crypto assets',
          'Concentration risk in ETH holdings',
        ],
        methodology: 'Modified Net Asset Value (mNAV). Digital asset treasury companies viewed as closed-end fund-like vehicles. Values based on underlying crypto holdings adjusted for leverage and accumulation trajectory.',
      },
    ]
  },
  // ═══════════════════════════════════════════════════════════════════════════
  // CANTOR FITZGERALD - N/A (Coverage since January 2026)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    firm: 'Cantor Fitzgerald',
    analyst: 'N/A',
    coverageSince: 'January 2026',
    currentPT: 39,
    currentRating: 'Buy',
    currentRatingNormalized: 'bullish',
    reports: [
      // === Jan 5, 2026 - Initiation with Buy, PT $39 (FULL REPORT) ===
      {
        date: '2026-01-05',
        action: 'Initiation',
        priceTarget: 39,
        previousTarget: null,
        rating: 'Buy',
        ratingNormalized: 'bullish',
        reportTitle: 'BitMine Immersion Technologies - Initiation of Coverage',
        source: 'Cantor Fitzgerald Research',
        isFullReport: true,
        thesis: 'We value BMNR using a sum-of-the-parts (SOTP) valuation approach. Digital Asset NAV ($32.09/share) + Staking Business ($7.20/share) + Treasury Operations ($0/share) = $39 PT. Treasury ops valued at $0 because BMNR trades at discount to mNAV, so capital raises are not accretive to ETH/share.',
        reportSummary: `**SOTP VALUATION FRAMEWORK**
We value BMNR using a sum-of-the-parts (SOTP) valuation approach. This includes:

**DIGITAL ASSET NAV — $32.09/share**
BMNR currently has a total NAV of $13,926m or $32.09/share. ETH Holdings: 4,110,525 ETH. ETH Price: $3,135. BTC Value: $17m. EightCo: $23m. Cash: $1,000m. Shares Outstanding: 434.0m.

**STAKING BUSINESS — $7.20/share**
We take our estimated 2026 staking revenue estimate and subtract cash SG&A to arrive at 2026 cash profit estimate. We apply a 10x multiple on cash profits, yielding a per share value of $7.20. 2026 Staking/Validator Fees: $369m. 2026 Cash SG&A: ($55m). Staking Profit: $314m. Multiple: 10.0x. Equity Value: $3,140m.

**TREASURY OPERATIONS — $0/share**
Given BMNR is trading at a discount to mNAV, it is not able to accrete ETH/share from raising capital. As such, we are valuing this part of the business to be worth $0/share. Current ETH + Cash Per Share: 0.01024. Annual Capital Markets Proceeds: $1,000m. Avg ETH Price: $3,135. ETH Acquired: 318,979. Total shares: 434.0m. Current ETH value per share: $32.09. Average premium: 0%. New Shares: 31.2m. Total ETH - New: 4,761,197. ETH Per Share - New: 0.010236. ETH Yield: 0.0%. Capital Markets Profits: $m. Profit Multiple: 12.0x. Equity Value: $m. Share Price: $0.00.

**SOTP VALUATION — $39.00**
Combining all three components, we arrive at a $39/share price target.`,
        assumptions: [
          { label: 'ETH Holdings', value: '4,110,525 ETH' },
          { label: 'ETH Price', value: '$3,135' },
          { label: 'Digital Asset NAV', value: '$13,926m' },
          { label: 'NAV Per Share', value: '$32.09' },
          { label: '2026 Staking Revenue', value: '$369m' },
          { label: '2026 Cash SG&A', value: '($55m)' },
          { label: 'Staking Profit', value: '$314m' },
          { label: 'Staking Multiple', value: '10.0x' },
          { label: 'Shares Outstanding', value: '434.0m' },
        ],
        catalysts: [
          'ETH price appreciation above $3,135 base case',
          'Staking revenue expansion beyond $369m',
          'Transition to trading at NAV premium (enabling accretive capital raises)',
          'Additional ETH accumulation via operating cash flow',
        ],
        risks: [
          'ETH price decline below $3,135 assumption',
          'Persistent NAV discount preventing accretive treasury operations',
          'Staking revenue compression from validator competition',
          'Regulatory uncertainty on crypto assets',
          'Dilution from capital raises at NAV discount',
        ],
        methodology: 'Sum-of-the-Parts (SOTP): Digital Asset NAV + 10x 2026E Staking Profit + Treasury Ops (valued at $0 due to NAV discount)',
        fullNotes: `DETAILED SOTP BREAKDOWN:

DIGITAL ASSET VALUE TABLE:
| Item | Value |
| ETH Holdings | 4,110,525 |
| ETH Price | $3,135 |
| ETH Value | $12,886m |
| BTC Value | $17m |
| EightCo | $23m |
| Cash | $1,000m |
| ETH + Cash NAV | $13,926m |
| Shares Outstanding | 434.0m |
| NAV per Share | $32.09 |

STAKING/VALIDATOR TABLE:
| Item | Value |
| 2026 Staking/Validator Fees | $369m |
| 2026 Cash SG&A | ($55m) |
| Staking Profit | $314m |
| Multiple | 10.0x |
| Equity Value | $3,140m |
| Shares | 434.0m |
| Per Share Value | $7.20 |

TREASURY OPERATIONS TABLE:
| Item | Value |
| Current ETH + Cash Per Share | 0.01024 |
| Annual Capital Markets Proceeds | $1,000m |
| Avg ETH Price | $3,135 |
| ETH Acquired | 318,979 |
| Total shares | 434.0m |
| Current ETH value per share | $32.09 |
| Average premium | 0% |
| New Shares | 31.2m |
| Total Shares - New | 465.1m |
| Total ETH - New | 4,761,197 |
| ETH Per Share - New | 0.010236 |
| ETH Yield | 0.0% |
| ETH Created | 0 |
| Capital Markets Profits | $m |
| Profit Multiple | 12.0x |
| Equity Value | $m |
| New Shares | 465.1m |
| Share Price | $0.00 |

Source: Company Reports, Cantor Fitzgerald Research, Pricing as of 12/29/2025`
      },
    ]
  },
];
