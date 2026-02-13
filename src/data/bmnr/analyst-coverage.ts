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
