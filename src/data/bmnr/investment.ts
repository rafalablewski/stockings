import type { InvestmentCurrent, ArchiveEntry } from '@/components/shared/investmentTypes';

export const BMNR_INVESTMENT_CURRENT: InvestmentCurrent = {
    date: '2026-02-23',
    source: 'February 23, 2026 — Updated: PR: 4.423M ETH Holdings + $9.6B Total + 3.66% Supply + 73% to Alchemy of 5%',
    verdict: 'STRONG BUY',
    verdictColor: 'mint',
    tagline: 'The ETH Supercycle Play',

    // Investment Scorecard — Unified 8-category framework (matches ASTS/CRCL)
    scorecard: [
      { category: 'Financial Strength', rating: 'A', color: 'var(--mint)', detail: 'Solid: $9.6B total holdings, $691M cash, zero debt (ETH down to $1,958)' },
      { category: 'Profitability', rating: 'A+', color: 'var(--mint)', detail: 'Staking yield: $171M/yr annualized (68.7% deployed, 2.81% CESR), dividend initiated' },
      { category: 'Growth', rating: 'A+', color: 'var(--mint)', detail: '3.66% ETH supply, 73% to "Alchemy of 5%", $24.5B ATM capacity' },
      { category: 'Valuation', rating: 'A+', color: 'var(--mint)', detail: 'Below NAV at $1,958 ETH — deep value, ETH -62% from 2025 highs, V-shaped recoveries expected' },
      { category: 'Competitive Position', rating: 'A+', color: 'var(--mint)', detail: '#1 ETH treasury globally, 4yr+ head start, scale nearly unassailable' },
      { category: 'Execution', rating: 'A+', color: 'var(--mint)', detail: 'Flawless pivot, Young Kim CFO/COO, 81% YES shareholder vote, MAVAN Q1' },
      { category: 'Regulatory/External', rating: 'B+', color: 'var(--sky)', detail: 'Pro-crypto admin, GENIUS Act + SEC Project Crypto; SEC/staking risk persists' },
      { category: 'Capital Structure', rating: 'A', color: 'var(--mint)', detail: '500K+ stockholders, #165 most traded, $200M Beast Industries closed' },
    ],

    // Ecosystem Health Rating (summarizes Ethereum tab metrics)
    ecosystemHealth: {
      overallGrade: 'A',
      overallColor: 'var(--mint)',
      metrics: [
        { metric: 'ETF Flows (7d)', value: '+$340M', signal: 'Bullish', weight: '25%', color: 'var(--mint)' },
        { metric: 'Staking Rate', value: '28.3%', signal: 'Healthy', weight: '20%', color: 'var(--mint)' },
        { metric: 'DeFi TVL Trend', value: '$62.4B', signal: 'Growing', weight: '20%', color: 'var(--mint)' },
        { metric: 'Supply Growth', value: '-0.2%', signal: 'Deflationary', weight: '15%', color: 'var(--mint)' },
        { metric: 'Protocol Progress', value: 'Fusaka Live', signal: 'Upgraded', weight: '20%', color: 'var(--mint)' },
      ],
      summary: 'Strong ecosystem tailwinds despite ETH price weakness (-62% from 2025 highs). Ethereum daily txns hit ATH (2.5M), active addresses ATH (1M daily). Tom Lee: ETH prices see V-shaped recoveries from 50%+ drops (8th time since 2018). GENIUS Act + SEC Project Crypto transformational.',
    },

    // Executive Summary — Unified schema (matches ASTS/CRCL)
    executiveSummary: {
      headline: `BMNR is the single best way to play the Ethereum supercycle with downside protection.`,
      thesis: `This is not just another crypto stock. BMNR has created something unprecedented: a yield-generating, dividend-paying, institutionally-accessible vehicle for leveraged ETH exposure.

They own 3.66% of all Ethereum in existence — 4.423 million tokens. They're over 73% of the way to 5%. No one else is even close.

The MSTR playbook worked. BMNR is running the same play on a yield-bearing asset — and paying you to wait. With $691M cash and $24.5B ATM capacity, the accumulation machine keeps running. 3.04M ETH staked (68.7% of holdings). CESR rate at 2.81%. ETH -62% from 2025 highs — Tom Lee: "mini crypto winter" — 3 secular drivers gaining traction (tokenization, AI agents, creators). MAVAN on track Q1 2026.`,
      bottomLine: `If you believe ETH goes higher, BMNR is the trade. If you're wrong, $9.6B in assets, staking income ($171M/yr annualized at 68.7% staked, $249M at full MAVAN scale), and NAV floor limit your downside. Asymmetric.`,
      whatsNew: [
        'Tom Lee: "mini crypto winter" — 3 secular drivers: Wall Street tokenization, AI/agentic-AI on smart blockchains, creator economy verification',
        '"Price of ETH is not reflective of the high utility of ETH" — Tom Lee',
        'Acquired 51,162 ETH in past week — largest weekly buy in recent weeks, now 3.66% of supply (73% to 5%)',
        'Cash builds to $691M (+$21M WoW) despite continued aggressive accumulation',
        'Staked ETH: 3.04M (68.7%) — mechanical decline in ratio as new ETH not yet staked',
        'ETH -62% from 2025 highs, annualized staking revenue: $171M (2.81% CESR)',
        'BNP Paribas same week tokenizing on public Ethereum — validates thesis',
      ],
    },

    // Growth Drivers (CRCL-style)
    growthDrivers: [
      { driver: 'ETH Price Appreciation', impact: 'Critical', description: 'Every $1,000 ETH move = $4.4B NAV change. ETH -62% from highs — "mini crypto winter", V-shaped recovery expected. At $10K, NAV/share hits $99+.', color: 'var(--mint)' },
      { driver: 'Staking Income Scale', impact: 'High', description: '3.04M ETH staked ($6.0B, 68.7% of holdings). Annualized: $171M, $249M at full MAVAN scale (2.81% CESR).', color: 'var(--mint)' },
      { driver: 'NAV Premium Expansion', impact: 'High', description: 'Currently below NAV at $1,958 ETH. MSTR trades 2-3x. Gap closure = significant upside.', color: 'var(--sky)' },
      { driver: 'Continued Accumulation', impact: 'High', description: '$691M cash + $24.5B ATM capacity. 81% YES vote unlocks massive share authorization.', color: 'var(--sky)' },
      { driver: 'Dividend Growth', impact: 'Medium', description: 'Started at $0.04/yr. As staking scales (now 68.7%), expect 10-20% annual dividend growth.', color: 'var(--gold)' },
    ],

    // Competitive Moat (CRCL-style with sources and threats)
    moatSources: [
      { source: 'Scale Dominance', strength: 'Strong', detail: '4.423M ETH = 3.66% of total supply. #1 ETH treasury, #2 global crypto treasury behind MSTR.', color: 'var(--mint)' },
      { source: 'Yield Advantage', strength: 'Strong', detail: 'Only ETH treasury generating staking yield AND paying dividends. 3.04M ETH staked, $171M/yr annualized (2.81% CESR).', color: 'var(--mint)' },
      { source: 'Capital Access', strength: 'Strong', detail: '$691M cash + $24.5B ATM + 81% shareholder YES vote unlocks massive issuance capacity.', color: 'var(--mint)' },
      { source: 'Management Depth', strength: 'Strong', detail: 'Tom Lee (Chairman) + Young Kim CFO/COO (MIT/HBS, 20yr institutional PM). Backed by ARK, Founders Fund, Pantera, Galaxy, Bill Miller III.', color: 'var(--mint)' },
      { source: 'Retail Base', strength: 'Strong', detail: '500K+ individual stockholders. #165 most traded US stock ($0.7B/day). Deep liquidity.', color: 'var(--mint)' },
    ],
    moatThreats: [
      { threat: 'ETH Price Collapse', risk: 'Critical', detail: '-70% drawdown would devastate NAV. At $1K ETH, NAV/share drops to ~$9.70.', color: 'var(--coral)' },
      { threat: 'NAV Premium Evaporation', risk: 'High', detail: 'Currently near NAV. Could drop to 0.5x or worse. GBTC traded at -40% discount for years.', color: 'var(--coral)' },
      { threat: 'Regulatory Crackdown', risk: 'Medium', detail: 'SEC declares ETH a security, bans staking, or targets crypto treasuries.', color: 'var(--gold)' },
      { threat: 'New Competitors', risk: 'Low', detail: 'Scale advantage nearly unassailable — years + billions required to catch up.', color: 'var(--mint)' },
    ],

    // Catalysts (renamed from predictions)
    catalysts: [
      { event: 'Shareholder Vote', timing: 'Jan 15, 2026 ✅ COMPLETED', impact: '81% YES on Proposal 2 (52.2% turnout) — share authorization approved', color: 'var(--mint)' },
      { event: 'Beast Industries', timing: 'Jan 17, 2026 ✅ CLOSED', impact: '$200M equity investment in MrBeast\'s company — GenZ/Millennial reach + DeFi integration. Feb 10: Beast acquires Step (7M+ users)', color: 'var(--mint)' },
      { event: 'MAVAN Launch', timing: 'Q1 2026', impact: 'Proprietary staking = margin expansion, largest staking provider in crypto (on track)', color: 'var(--mint)' },
      { event: 'Dividend Increase', timing: 'Q1 2026', impact: 'Likely 2-3x current rate as staking scales (68.7% now staked, 2.81% CESR)', color: 'var(--sky)' },
      { event: 'Index Inclusion', timing: 'Jun 2026', impact: 'Russell 2000 inclusion forces passive buying', color: 'var(--sky)' },
      { event: '5% ETH Target', timing: '2026', impact: 'Would own ~6.0M ETH — "Alchemy of 5%" complete (currently 73% there)', color: 'var(--gold)' },
    ],

    // Risk Matrix (CRCL-style)
    risks: [
      { risk: 'ETH Price Collapse', severity: 'Critical', likelihood: 'Low', impact: 'High', detail: 'The existential risk. A -70% drawdown would devastate NAV. At $1,000 ETH, NAV/share drops to ~$9.90. This is a leveraged ETH bet.', mitigation: 'Staking income ($249M/yr at full MAVAN scale) provides cushion; NAV floor via $1B buyback authorization.' },
      { risk: 'NAV Premium Evaporation', severity: 'High', likelihood: 'Medium', impact: 'High', detail: 'Currently below NAV at $1,958 ETH. If sentiment shifts further, could drop to 0.5x. GBTC traded at -40% discount for years.', mitigation: '$1B buyback at discount provides floor; dividend yield supports valuation.' },
      { risk: 'Regulatory Crackdown', severity: 'Medium', likelihood: 'Low', impact: 'High', detail: 'SEC declares ETH a security, bans staking, or targets crypto treasuries. Current environment favorable but politics change.', mitigation: 'Diversified staking providers; compliance-first approach; MAVAN US-based.' },
      { risk: 'MAVAN Execution Failure', severity: 'Medium', likelihood: 'Low', impact: 'Medium', detail: 'Delays or technical issues with proprietary staking. On track for Q1 2026 launch.', mitigation: 'Third-party providers already operational (3.04M staked); upside risk, not existential.' },
      { risk: 'Dilution Fatigue', severity: 'Low', likelihood: 'Low', impact: 'Medium', detail: 'Market stops funding ATMs at premium. Would slow accumulation but not fatal.', mitigation: '$691M cash + staking income ($171M/yr annualized) provides runway without issuance.' },
    ],

    // Three Perspectives (CRCL-style)
    perspectives: {
      cfa: {
        title: 'CFA Analyst',
        assessment: 'FAVORABLE',
        color: 'var(--mint)',
        summary: 'Single-asset concentration with embedded leverage through NAV premium mechanism. Best positioned as 2-5% satellite allocation within alternatives bucket. Execution risk materially reduced — Young Kim (CFO/COO) brings 20yr institutional PM experience. $200M Beast Industries investment (CLOSED). 3.04M ETH staked (68.7%). 81% shareholder YES vote. ETH -62% from highs creates deep value entry.',
        ecosystemView: 'Ethereum network fundamentals support the thesis despite price weakness. ATH daily txns (2.5M), ATH active addresses (1M), deflationary supply (-0.2%), and growing institutional adoption via ETFs. $171M annual staking income at current 68.7% deployment (2.81% CESR). Tom Lee: "mini crypto winter" — 3 secular drivers gaining traction.',
        recommendation: 'Allocate 2-5% of alternatives sleeve. Rebalance quarterly.',
      },
      hedgeFund: {
        title: 'Hedge Fund PM',
        assessment: 'HIGH CONVICTION LONG',
        color: 'var(--mint)',
        summary: 'Cleanest asymmetric setup in crypto equities. Market treating BMNR like simple ETH proxy — it\'s not. Staking yield + dividend + accretive issuance creates compounding machine. Beast Industries CLOSED ($200M, 450M subs). 81% shareholder YES vote. 500K+ stockholders, #165 most traded. ETH -62% from highs — "mini crypto winter", V-shaped recovery expected.',
        ecosystemView: 'ETH price dislocation is the opportunity. $691M cash + $24.5B ATM = unlimited firepower. 3.04M ETH staked (68.7%, $171M/yr). Tom Lee: 3 secular drivers (tokenization, AI agents, creators). "Price of ETH is not reflective of high utility." Best entry points come after sharp declines.',
        recommendation: 'Size up to 8-10% of book. Stop loss at 0.6x NAV.',
      },
      cio: {
        title: 'Family Office CIO',
        assessment: 'CORE POSITION',
        color: 'var(--violet)',
        summary: '$9.6B total holdings. 4.423M ETH (3.66% of supply). $200M Beast Industries (CLOSED). 81% shareholder YES vote. 500K+ stockholders. This is how you get institutional ETH exposure without custody complexity — and now with creator economy upside. Management bench: Tom Lee (Chairman), Young Kim (CFO/COO). Backed by ARK, Founders Fund, Pantera, Galaxy Digital, Bill Miller III, and Tom Lee personally.',
        ecosystemView: 'Ecosystem maturation reduces tail risk despite -62% price decline. ETH fundamentals at ATH (2.5M daily txns, 1M active addresses). Beast Industries ($200M, CLOSED) expands GenZ reach. GENIUS Act + SEC Project Crypto as transformational as ending Bretton Woods in 1971. Tom Lee: "mini crypto winter" — sentiment at rock bottom = contrarian entry.',
        recommendation: '5-10% of crypto allocation. Multi-year hold.',
      },
      technicalAnalyst: {
        title: 'Technical Analyst',
        assessment: 'BULLISH — ACCUMULATE',
        color: 'var(--sky)',
        summary: 'Price structure shows higher highs and higher lows since ETH treasury pivot. RSI holding above 50 on weekly timeframe indicates sustained momentum. MACD histogram expanding on daily chart. Key support at 20-day SMA has held on pullbacks. Volume profile shows accumulation patterns with higher volume on up days vs down days.',
        ecosystemView: 'BMNR exhibits 0.85-0.95 correlation with ETH on 30-day rolling basis — trade it as leveraged ETH proxy. NAV premium/discount cycles provide tactical entry/exit signals: accumulate below 1.0x NAV, trim above 1.5x NAV. Watch ETH $3,500 support and $4,200 resistance for directional cues. Bollinger Band squeeze on weekly suggests imminent volatility expansion.',
        recommendation: 'Buy pullbacks to 20-day SMA. Stop loss at 50-day SMA break. Target: previous swing high + 15%.',
      },
    },

    // Position Sizing (CRCL-style)
    positionSizing: {
      aggressive: { range: '8-12%', description: 'High-conviction crypto portfolios' },
      growth: { range: '4-8%', description: 'Growth-oriented with alternatives allocation' },
      balanced: { range: '2-4%', description: 'Diversified portfolios seeking crypto exposure' },
      conservative: { range: '0-2%', description: 'Risk-averse or income-focused' },
    },

    // Accumulation Zones
    accumulation: [
      { zone: 'Below 0.85x NAV', action: 'Aggressive accumulation', color: 'var(--mint)' },
      { zone: '0.85x-1.0x NAV', action: 'Normal accumulation', color: 'var(--mint)' },
      { zone: '1.0x-1.25x NAV', action: 'Hold / Add on dips', color: 'var(--sky)' },
      { zone: '1.25x-1.7x NAV', action: 'Hold core position', color: 'var(--gold)' },
      { zone: 'Above 1.7x NAV', action: 'Trim 20-30%', color: 'var(--coral)' },
    ],
  };

export const BMNR_INVESTMENT_ARCHIVE: ArchiveEntry[] = [
    {
      date: '2026-02-23',
      source: 'PR: 4.423M ETH Holdings + $9.6B Total + 3.66% Supply + 73% to Alchemy of 5%',
      verdict: 'STRONG BUY',
      verdictColor: 'mint',
      summary: '4.423M ETH ($9.6B @ $1,958). 3.04M ETH staked (68.7% — mechanical decline as new ETH not yet staked). +51,162 ETH acquired. 3.66% of supply (73% to 5%). $691M cash. Tom Lee: "mini crypto winter" — 3 fundamental drivers gaining traction.',
      fullAnalysis: {
        context: 'February 23, 2026 PR shows continued aggressive accumulation (+51,162 ETH WoW) despite further ETH price weakness ($1,998→$1,958). Supply % advances to 3.66% (73% to "Alchemy of 5%"). Cash builds to $691M (+$21M). Staked ETH unchanged at 3.04M — staking ratio mechanically declined to 68.7% as denominator grew. CESR slipped further to 2.81%. Tom Lee reiterates "mini crypto winter" framing and highlights 3 secular drivers: (i) Wall Street tokenization, (ii) AI/agentic-AI using smart blockchains for execution + payments, (iii) emerging creator economy using blockchains for verification. "Price of ETH is not reflective of the high utility of ETH." MAVAN on track Q1 2026. Trading liquidity declining (#165, $0.7B/day).',
        keyHighlights: [
          'ETH holdings: 4,422,659 ETH @ $1,958 = $8.66B (3.66% of 120.7M supply)',
          'Total holdings: $9.6B (ETH + cash + BTC + moonshots + Beast Industries)',
          'Cash position: $691M (up from $670M — +$21M)',
          'Staked ETH: 3,040,483 ($6.0B) — 68.7% of holdings (mechanical decline)',
          'Annualized staking revenue: $171M/yr (down from $176M — lower ETH price)',
          'Full MAVAN staking revenue: $249M/yr projected at full deployment',
          'CESR rate: 2.81% (Quatrefoil), BMNR 7-day yield: 2.89% annualized',
          'Acquired 51,162 ETH in past week — largest weekly buy in recent weeks',
          'Over 73% of the way to Alchemy of 5% target (was 72%)',
          'Trading rank: #165 ($0.7B/day avg, 5-day as of Feb 20) — declining',
          'Tom Lee: "mini crypto winter" — 3 secular drivers (tokenization, AI agents, creators)',
          '"Price of ETH is not reflective of high utility and role as future of finance"',
          'Beast Industries $200M stake, 193 BTC, $17M Eightco (ORBS)',
          'Institutional: ARK/Cathie Wood, MOZAYYX, Founders Fund, Bill Miller III, Pantera, Kraken, DCG, Galaxy Digital',
          'MAVAN on track Q1 2026 (3 staking providers)',
        ],
        verdict: 'Continued aggressive accumulation + cash build + supply % progression = strong execution. ETH price weakness creating opportunity window. 73% to 5% target. MAVAN imminent.',
        scorecard: 9.3,
        risks: 'ETH price continued decline ($1,998→$1,958). Staking ratio declining mechanically (69.6→68.7%). CESR rate falling (2.84→2.81%). Trading liquidity declining (#158→#165). Annualized staking revenue -3% WoW.',
        strategy: 'STRONG BUY. Accumulation pace accelerating (51K ETH WoW — largest recent weekly buy). Cash building ($691M). Supply % advancing (3.66%). Sentiment at rock bottom = contrarian entry. MAVAN imminent. BNP Paribas same week tokenizing on public Ethereum validates thesis.'
      }
    },
    {
      date: '2026-02-17',
      source: 'PR: 4.371M ETH Holdings + $9.6B Total + Staking 3.04M (69.5%)',
      verdict: 'STRONG BUY',
      verdictColor: 'mint',
      summary: '4.371M ETH ($9.6B @ $1,998). 3.04M ETH staked (69.5%) — crossed 3M milestone, largest staker globally. +45,759 ETH acquired. 3.62% of supply. $670M cash. Tom Lee post-Consensus HK: 3 secular drivers (tokenization, AI agents, creators). Sentiment at "rock bottom" = mini-winter, not structural.',
      fullAnalysis: {
        context: 'February 17, 2026 PR shows continued accumulation despite ETH price weakness ($2,125→$1,998). Staked ETH crossed 3M milestone (3,040,483 — +143,024 WoW, +4.9%). Tom Lee at Consensus HK outlined 3 secular drivers: (i) Wall Street tokenization/privacy on Ethereum, (ii) AI agents using ETH for payments + verification, (iii) creators/proof-of-human on L2s (Worldchain). Sentiment at "rock bottom" comparable to Nov 2022/2018 lows but no FTX/3AC-scale failures — "mini-winter" framing. MAVAN on track Q1 2026. GENIUS Act + SEC Project Crypto = transformational.',
        keyHighlights: [
          'ETH holdings: 4,371,497 ETH @ $1,998 = $9.6B (3.62% of 120.7M supply)',
          'Total holdings: $9.6B (ETH + cash + BTC + moonshots + Beast Industries)',
          'Cash position: $670M (up from $595M — +$75M)',
          'Staked ETH: 3,040,483 ($6.1B) — 69.5% of holdings, crossed 3M milestone',
          'Annualized staking revenue: $176M/yr (down 13% — lower rate + price)',
          'Full MAVAN staking revenue: $252M/yr projected at full deployment',
          'CESR rate: 2.84% (Quatrefoil), BMNR 7-day yield: 2.89% annualized',
          'Acquired 45,759 ETH in past week',
          'Trading rank: #158 ($0.9B/day avg) — down 51 ranks',
          'Tom Lee post-Consensus HK: 3 secular ETH drivers (tokenization, AI agents, creators)',
          'Sentiment "rock bottom" — mini-winter framing, no structural failures',
          'Beast Industries $200M stake, Step Banking App acquired (7M+ users)',
          'Institutional: ARK/Cathie Wood, Founders Fund, Bill Miller III, Pantera, Kraken, Galaxy Digital',
          'MAVAN on track Q1 2026 (3 staking providers)',
        ],
        verdict: 'Staking 3M ETH milestone + $670M cash build + Tom Lee secular thesis = continued conviction. ETH price weakness creating accumulation opportunity. Rock-bottom sentiment historically precedes recovery.',
        scorecard: 9.4,
        risks: 'ETH price continued decline ($2,125→$1,998). Total holdings $9.6B (down from $10.0B). CESR rate declining (3.11%→2.84%). Trading rank dropped from #107 to #158. Annualized staking revenue -13%.',
        strategy: 'STRONG BUY. Staking infrastructure scaling (69.5%, 3M+ ETH). Cash building ($670M). Tom Lee secular thesis strengthening. Sentiment at rock bottom = contrarian entry. MAVAN imminent.'
      }
    },
    {
      date: '2026-02-09',
      source: 'PR: 4.326M ETH Holdings + $10.0B Total + ETH -62% from Highs',
      verdict: 'STRONG BUY',
      verdictColor: 'mint',
      summary: '4.326M ETH ($9.2B @ $2,125). 2.9M ETH staked (67%). +40,613 ETH acquired. 3.58% of supply. $595M cash. #107 most traded US stock ($1.3B/day). ETH -62% from 2025 highs — V-shaped recovery expected.',
      fullAnalysis: {
        context: 'February 9, 2026 PR shows ETH price declined further ($2,317→$2,125, -62% from 2025 highs) but Tom Lee emphasizes this is the 8th time since 2018 ETH has fallen 50%+ and V-shaped recoveries follow every time. Ethereum daily txns ATH (2.5M), active addresses ATH (1M). CESR improved to 3.11%. Annualized staking revenue $202M (+7% WoW). $200M Beast Industries initial investment closed. MAVAN on track Q1 2026.',
        keyHighlights: [
          'ETH holdings: 4,325,738 ETH @ $2,125 = $9.2B (3.58% of 120.7M supply)',
          'Total holdings: $10.0B (ETH + cash + BTC + moonshots + Beast Industries)',
          'Cash position: $595M (up from $586M)',
          'Staked ETH: 2,897,459 ($6.2B) — 67% of holdings',
          'Annualized staking revenue: $202M (up +7% WoW), 3.11% CESR',
          'At scale staking: $374M/yr (3.115% CESR), >$1M/day',
          'BMNR 7-day staking yield: 3.3234% annualized',
          'Acquired 40,613 ETH in past week',
          '#107 most traded US stock ($1.3B/day, 5-day avg as of Feb 6)',
          'ETH -62% from 2025 highs — 8th time since 2018 with 50%+ decline',
          'Tom Lee: V-shaped recoveries follow every major ETH decline',
          'Ethereum fundamentals: ATH daily txns (2.5M), ATH active addresses (1M)',
          'GENIUS Act + SEC Project Crypto compared to ending Bretton Woods (1971)',
          'MAVAN on track Q1 2026 (3 staking providers)',
        ],
        verdict: 'Deep value entry point. ETH fundamentals at ATH while price -62% from highs. V-shaped recovery pattern highly likely (8 prior instances). Staking revenue growing. Accumulation continues.',
        scorecard: 9.5,
        risks: 'ETH price declined further from $2,317 to $2,125. Total holdings down from $10.7B to $10.0B. Continued price weakness could test NAV floor.',
        strategy: 'STRONG BUY. ETH -62% from highs = generational entry point. Fundamentals diverging from price (ATH txns/addresses). V-shaped recovery pattern. Accumulate aggressively.'
      }
    },
    {
      date: '2026-02-02',
      source: 'PR: 4.285M ETH Holdings + $10.7B Total + Staking 67.6%',
      verdict: 'STRONG BUY',
      verdictColor: 'mint',
      summary: '4.285M ETH ($9.9B @ $2,317). 2.9M ETH staked (67.6%). +41,788 ETH acquired. 3.55% of supply. $586M cash. #105 most traded US stock ($1.1B/day). ETH fundamentals strong despite price drop.',
      fullAnalysis: {
        context: 'February 2, 2026 PR shows ETH price dropped sharply ($3,000→$2,317) but fundamentals strengthening: Ethereum daily txns hit ATH (2.5M), active addresses ATH (1M daily). Tom Lee: non-fundamental factors (leverage, gold rotation) explain weakness. Staking exploded +888K ETH in one week to 2.9M (67.6%). MAVAN on track Q1 2026. GENIUS Act transformational.',
        keyHighlights: [
          'ETH holdings: 4,285,125 ETH @ $2,317 = $9.9B (3.55% of 120.7M supply)',
          'Total holdings: $10.7B (ETH + cash + BTC + moonshots + Beast Industries)',
          'Cash position: $586M (down from $682M)',
          'Staked ETH: 2,897,459 ($6.7B) — up 888,192 in one week (+44%)',
          'Staking ratio: 67.6% of holdings now staked (was 47.4%)',
          'Annualized staking revenue: $188M (up 18% WoW), $374M at scale (2.81% CESR)',
          'Acquired 41,788 ETH in past week',
          '#105 most traded US stock ($1.1B/day avg)',
          'MAVAN launch on track for Q1 2026 (working with 3 staking providers)',
          'Ethereum fundamentals: ATH daily txns (2.5M), ATH active addresses (1M)',
          'Tom Lee: ETH price weakness is non-fundamental (leverage, gold rotation)',
          'Gold -9% on Jan 30 (4th largest daily drop) — potential near-term top signal',
          'GENIUS Act + SEC Project Crypto "transformational to financial services"',
        ],
        verdict: 'Accumulation continues during price weakness. Staking exploded to 67.6% of holdings. ETH fundamentals (txns, addresses) at ATH while price depressed. Asymmetric opportunity.',
        scorecard: 9.4,
        risks: 'ETH price collapsed from $3,000 to $2,317 (-23%). Total holdings down from $12.8B to $10.7B. Cash position declining ($682M→$586M). NAV compression risk.',
        strategy: 'STRONG BUY. ETH price weakness = accumulation opportunity. Fundamentals strengthening. Staking at 67.6% generates real income. MAVAN imminent.'
      }
    },
    {
      date: '2026-01-26',
      source: 'PR: 4.243M ETH Holdings + $12.8B Total + Davos 2026',
      verdict: 'STRONG BUY',
      verdictColor: 'mint',
      summary: '4.243M ETH ($12.0B @ $2,839). 2.0M ETH staked (47.4%). +40,302 ETH acquired. 3.52% of supply. $682M cash. #91 most traded US stock ($1.2B/day). Davos: Wall Street embraces crypto.',
      fullAnalysis: {
        context: 'January 26, 2026 PR shows continued aggressive ETH accumulation (+40,302 ETH in one week) and staking expansion (now 2.0M ETH, 47.4%). Davos 2026 featured overwhelming bullish sentiment on crypto from Larry Fink (BlackRock), David Sacks (White House AI/Crypto), Bill Winters (Standard Chartered), and others. Tom Lee: "2026 is the year policymakers and world leaders now view digital assets as central to the future of the financial system."',
        keyHighlights: [
          'ETH holdings: 4,243,338 ETH @ $2,839 = $12.0B (3.52% of 120.7M supply)',
          'Total holdings: $12.8B (ETH + cash + BTC + moonshots + Beast Industries)',
          'Cash position: $682M',
          'Staked ETH: 2,009,267 ($5.7B) — up 171,264 in one week',
          'Staking ratio: 47.36% of holdings now staked (was 43.7%)',
          'Staking income: $374M/yr at scale (2.81% CESR)',
          'Acquired 40,302 ETH in past week',
          '#91 most traded US stock ($1.2B/day, behind Accenture, ahead of PepsiCo)',
          'MAVAN launch on track for Q1 2026',
          'Davos 2026: Larry Fink — "Tokenization is necessary... if we have one common blockchain, we could reduce corruption"',
          'Davos 2026: David Sacks — "Banking and crypto will transform into a single digital asset industry"',
          'Davos 2026: Bill Winters — "Most things will settle in digital form... this is the year when this is happening in scale"',
          'ETHBTC ratio climbing since mid-October — investors recognizing Wall Street building on Ethereum',
        ],
        verdict: 'Accumulation machine running smoothly. Staking approaching 50% of holdings. Davos 2026 sentiment shift validates institutional thesis. ETH price weakness ($2,839) is buying opportunity for long-term holders.',
        scorecard: 9.6,
        risks: 'ETH price declined from $3,211 to $2,839 (-11.6%). Total holdings down from $14.5B to $12.8B. Price volatility remains key risk.',
        strategy: 'STRONG BUY. ETH weakness = accumulation opportunity. Davos consensus validates long-term thesis. MAVAN launch imminent.'
      }
    },
    {
      date: '2026-01-20',
      source: 'PR: 4.203M ETH Holdings + 81% Shareholder Vote YES + Beast CLOSED',
      verdict: 'STRONG BUY',
      verdictColor: 'mint',
      summary: '4.203M ETH ($13.5B). 81% YES on Proposal 2 (52.2% turnout). 1.84M ETH staked (43.7%). Beast Industries CLOSED. 500K+ stockholders. #60 most traded US stock.',
      fullAnalysis: {
        context: 'January 20, 2026 marks multiple landmark achievements: 81% shareholder YES vote on Proposal 2 (share authorization), Beast Industries $200M investment officially closed, staking surged to 1.84M ETH (43.7%), and trading volume hit $1.5B/day making BMNR the #60 most traded US stock.',
        keyHighlights: [
          'ETH holdings: 4,203,036 ETH @ $3,211 = $13.5B (3.48% of 120.7M supply)',
          'Total holdings: $14.5B (ETH + cash + BTC + moonshots + Beast Industries)',
          'Cash position: $979M (post Beast Industries closing)',
          'Staked ETH: 1,838,003 ($5.9B) — up 582K in one week (+46.3%)',
          'Staking ratio: 43.73% of holdings now staked (was 30%)',
          'Staking income run rate: $518M/yr at 2.81% CESR',
          'Shareholder vote: 81% YES on Proposal 2 (52.2% of outstanding voted)',
          'Beast Industries: $200M investment CLOSED Jan 17, 2026',
          '500,000+ individual stockholders',
          '#60 most traded US stock ($1.5B/day average volume)',
          'MAVAN launch on track for Q1 2026',
        ],
        verdict: 'All catalysts delivering. Shareholder vote approved with overwhelming 81% YES (only needed 50.1%). Beast Industries closed successfully. Staking accelerating rapidly. Retail adoption exploding with 500K+ stockholders.',
        scorecard: 9.7,
        risks: 'ETH price risk remains primary concern. Execution now de-risked with management bench in place.',
        strategy: 'STRONG BUY. All near-term catalysts completed successfully. Focus shifts to MAVAN launch Q1 and continued ETH accumulation.'
      }
    },
    {
      date: '2026-01-15',
      source: 'PR: $200M Beast Industries Investment + Annual Meeting',
      verdict: 'STRONG BUY',
      verdictColor: 'mint',
      summary: '$200M strategic equity investment into Beast Industries (MrBeast). GenZ/Millennial demographic expansion. DeFi integration planned. Annual Meeting TODAY @ Wynn Las Vegas.',
      fullAnalysis: {
        context: 'January 15, 2026 marks a pivotal day for BMNR: the Annual Meeting at Wynn Las Vegas coincides with the announcement of a $200M equity investment into Beast Industries — MrBeast\'s entertainment and CPG empire. This represents BMNR\'s first major strategic investment outside pure crypto, positioning the company at the intersection of digital assets and the creator economy.',
        keyHighlights: [
          '$200M equity investment into Beast Industries (MrBeast)',
          'Beast Industries: 450M+ YouTube subscribers, 5B monthly views across all channels',
          'Target audience expansion: GenZ, GenAlpha, Millennials (previously institutional-focused)',
          'DeFi integration: Beast Industries exploring incorporation into upcoming financial services platform',
          'Deal expected to close on or about January 19, 2026',
          'Tom Lee: "Beast Industries is the leading content creator of our generation"',
          'Jeff Housenbold (Beast CEO): "Strong validation of our vision, strategy, and growth trajectory"',
          'Beast Industries brands: Feastables, #TeamTrees, #TeamSeas, #TeamWater, Beast Philanthropy',
          'Annual Meeting held same day @ Wynn Las Vegas — share authorization vote (500M→50B)',
          'Premier institutional investors reaffirmed: ARK (Cathie Wood), MOZAYYX, Founders Fund, Bill Miller III, Pantera, Kraken, DCG, Galaxy Digital, Tom Lee',
          'Company goal: acquiring 5% of ETH supply',
          'MAVAN (Made-in America Validator Network) launching Q1 2026',
        ],
        verdict: 'Bold strategic move. Beast Industries investment expands BMNR\'s reach to younger demographics while exploring DeFi integration. This positions BMNR as more than just an ETH treasury — it\'s becoming a bridge between crypto and mainstream audiences.',
        scorecard: 9.5,
        risks: 'Investment concentration in single creator (MrBeast). $200M reduces cash position from $988M to ~$788M (still ample). Deal must close Jan 19.',
        strategy: 'STRONG BUY. Annual Meeting today is the key catalyst for share authorization. Beast Industries deal expands TAM beyond institutional crypto allocators.'
      }
    },
    {
      date: '2026-01-12',
      source: 'PR: ETH Holdings Reach 4.168M, $14.0B Total',
      verdict: 'BUY',
      verdictColor: 'mint',
      summary: 'Staking surge: 1.26M ETH staked (30% of holdings, +597K in one week). Cash up to $988M. 70% to "Alchemy of 5%". Annual Meeting in 3 days.',
      fullAnalysis: {
        context: 'The January 12, 2026 PR confirms BMNR\'s relentless accumulation and explosive staking growth. 24,266 ETH acquired in past week while also increasing cash by $73M. Staking nearly doubled in one week (+596,864 to 1.256M). Tom Lee urges stockholders to VOTE YES on Proposal #2 (share authorization).',
        keyHighlights: [
          'ETH holdings: 4,167,768 ETH @ $3,119 = $13.0B (3.45% of 120.7M supply)',
          'Total holdings: $14.0B (ETH + cash + BTC + moonshots)',
          'Cash position: $988M (up $73M while still buying ETH)',
          'Staked ETH: 1,256,083 ($3.9B) — up 596,864 in one week (+90.5%)',
          'Staking ratio: 30.14% of holdings now staked (was ~16%)',
          'At scale staking income: $374M/yr (>$1M/day) using 2.81% CESR',
          'MAVAN launch on track for Q1 2026 — largest staking provider in crypto',
          'Annual Meeting Jan 15 @ Wynn Las Vegas — VOTE YES on Proposal #2',
          'Share authorization: 500M→50B (requires 50.1% of all outstanding)',
          '#67 most traded US stock ($1.3B/day 5-day avg)',
          '70% of the way to "Alchemy of 5%" (up from two-thirds)',
          'Tom Lee: "2026 is the year crypto prices recover with stronger gains in 2027-2028"',
          'GENIUS Act compared to Aug 15, 1971 (end of Bretton Woods) — transformational',
        ],
        verdict: 'Execution remains flawless. Staking scaling faster than anyone expected. The machine is operating at peak capacity. Annual Meeting is THE near-term catalyst.',
        scorecard: 9.4,
        risks: 'Share authorization vote needs 50.1% of ALL shares (not just votes cast). High bar. ETH price remains the existential risk.',
        strategy: 'BUY. VOTE YES on Proposal #2. Annual Meeting Jan 15 is the catalyst. Position for 2026 recovery thesis.'
      }
    },
    {
      date: '2026-01-09',
      source: 'PR: CFO/COO Young Kim Appointed',
      verdict: 'BUY',
      verdictColor: 'mint',
      summary: 'Leadership upgrade: Young Kim (MIT/HBS, Columbia Threadneedle, Axiom) appointed CFO+COO+Board. Management depth now matches asset scale.',
      fullAnalysis: {
        context: 'The January 9, 2026 PR announces Young Kim as CFO and COO, filling the vacancy from Raymond Mow\'s January 16 departure. Kim joins the Board and reports to Tom Lee. This is a significant leadership upgrade — Kim brings 20+ years of institutional asset management experience managing multi-billion dollar portfolios at Columbia Threadneedle and Axiom Investors.',
        keyHighlights: [
          'Young Kim appointed CFO + COO (dual role), effective immediately',
          'Also appointed to Board of Directors, reports to Tom Lee (Chairman)',
          'Background: MIT engineering + Harvard Business School — "engineer-investor" profile',
          '2021-2025: Partner & Senior PM at Axiom Investors (multi-billion global)',
          '2011-2021: Senior PM at Columbia Threadneedle (decade of institutional experience)',
          'Early career: software engineer → VC → investment research → PM',
          'ETH holdings confirmed at 3.43% — two-thirds to "Alchemy of 5%"',
          'Annual Meeting Jan 15, 2026 @ Wynn Las Vegas — 4 key proposals',
          'Institutional backers reaffirmed: ARK, MOZAYYX, Founders Fund, Bill Miller III, Pantera, Kraken, DCG, Galaxy Digital',
          'Tom Lee: "[Young] will play an integral role in helping to execute our roadmap and scale the business"',
        ],
        verdict: 'Management depth now matches the $14B+ asset base. Kim\'s institutional PM background is ideal for capital markets strategy and investor relations. CFO vacancy filled ahead of schedule with a significant upgrade.',
        scorecard: 9.3,
        risks: 'Execution risk reduced with experienced CFO/COO. Key person risk remains with Tom Lee as strategic driver.',
        strategy: 'BUY. Leadership continuity secured. Annual Meeting Jan 15 is next catalyst. Vote YES on share authorization.'
      }
    },
    {
      date: '2026-01-05',
      source: '8-K: ETH Holdings $14.2B, 4.14M ETH',
      verdict: 'BUY',
      verdictColor: 'mint',
      summary: 'Fortress balance sheet: $14.2B total holdings, $915M cash, 659K ETH staked. Two-thirds to "Alchemy of 5%". MAVAN Q1 2026.',
      fullAnalysis: {
        context: 'The January 5, 2026 8-K confirms BMNR\'s relentless accumulation continues even through holiday-week low volume. 32,977 ETH acquired in the past week alone. Staking scaled dramatically (+250K in one week to 659K total). Cash position nearly doubled to $915M. The machine is operating at full capacity.',
        keyHighlights: [
          'ETH holdings: 4,143,502 ETH @ $3,196 = $13.2B (3.43% of 120.7M supply)',
          'Total holdings: $14.2B (ETH + cash + BTC + moonshots)',
          'Cash position: $915M (up from ~$512M) — massive war chest',
          'Staked ETH: 659,219 ($2.1B) — up 250,592 in one week',
          'At scale staking income: $374M/yr (>$1M/day) using 2.81% CESR',
          'MAVAN launch on track for Q1 2026 — proprietary US validator network',
          'Annual Meeting Jan 15 at Wynn Las Vegas — share authorization vote',
          'Institutional backers reaffirmed: ARK, Founders Fund, Pantera, Galaxy, Bill Miller III',
          'Tom Lee 2026 thesis: Gov\'t support, stablecoins, tokenization, AI authentication, metals correlation',
          '#44 most traded US stock ($980M/day 5-day avg), ahead of Home Depot'
        ],
        verdict: 'Execution continues to be flawless. Every metric improving. The only question is ETH price — and management is doing everything right to maximize upside.',
        scorecard: 9.2,
        risks: 'ETH price concentration remains. But with $915M cash, $24.5B ATM, and institutional backing, runway is effectively unlimited.',
        strategy: 'BUY. Accumulate on any weakness. Annual Meeting Jan 15 is near-term catalyst. Vote YES on share authorization.'
      }
    },
    {
      date: '2026-01-02',
      source: 'Chairman\'s Message (8-K, DEFA14A)',
      verdict: 'STRONG BUY',
      verdictColor: 'mint',
      summary: 'ETH/BMNR correlation formalized. Split roadmap disclosed. Premium thesis explained to market.',
      fullAnalysis: {
        context: 'Tom Lee published video explaining the authorized share increase (500M→50B) and explicitly quantified the ETH/BMNR correlation. This is management giving shareholders the exact framework for valuation: BMNR = 0.015×ETH + accretion. The split roadmap at various ETH prices reveals long-term ambitions.',
        keyHighlights: [
          'ETH/BMNR coefficient: 0.015×ETH price + accretion (per Bloomberg)',
          'Implied prices: $22k ETH → $500 BMNR, $62.5k → $1,500, $250k → $5,000',
          'Split roadmap: 20:1 at $500, 60:1 at $1,500, 100:1 at $5,000',
          '50B authorized shares = capacity for 100:1 split (keeps price ~$25)',
          'ETH/BTC target: 0.25 ("payment rails") — massive conviction signal',
          'Institutional backers reaffirmed: ARK, Founders Fund, Pantera, Galaxy, etc.'
        ],
        verdict: 'Management is explicitly laying out the bull case to shareholders. This level of transparency is rare. They WANT people to understand the thesis.',
        scorecard: 9.0,
        risks: 'Dilution if splits happen without ETH appreciation. But that\'s the point — splits come WITH appreciation.',
        strategy: 'Vote YES. The share increase enables splits, not dilution. This is pro-shareholder.'
      }
    },
    {
      date: '2025-11-24',
      source: 'FY2025 10-K Annual Report',
      verdict: 'STRONG BUY',
      verdictColor: 'mint',
      summary: 'Transformation complete. First profitable year. Going concern eliminated. The thesis is validated.',
      fullAnalysis: {
        context: 'The 10-K filing confirmed what we suspected: BMNR has pulled off one of the most remarkable corporate pivots in recent memory. From a distressed BTC miner with going concern warnings to an $8.8B ETH treasury powerhouse — in less than 6 months.',
        keyHighlights: [
          'First profitable fiscal year: $328M net income vs ($3.3M) loss prior year',
          'Going concern language ELIMINATED — balance sheet is now fortress-like',
          '$8.36B raised through capital markets, all deployed into ETH',
          'Retained earnings turned positive ($337M) for first time in company history',
          'ETH holdings at 2.47M, representing ~2% of total supply'
        ],
        verdict: 'This filing removed all doubt. Management executed flawlessly. The only question now is how high the premium goes.',
        scorecard: 8.5,
        risks: 'ETH price risk remains. Premium sustainability uncertain. But execution risk is now minimal.',
        strategy: 'Accumulate aggressively. This is the confirmation filing — thesis validated, execution proven.'
      }
    },
    {
      date: '2025-08-12',
      source: 'ATM Expansion to $24.5B (424B5)',
      verdict: 'BUY',
      verdictColor: 'mint',
      summary: 'Market is funding the accumulation at premium. Momentum is undeniable.',
      fullAnalysis: {
        context: 'The prior $4.5B ATM was exhausted in just 5 weeks. Let that sink in. The market absorbed $4.5 BILLION in equity issuance in 35 days, and they came back for more. This $24.5B expansion signals unlimited appetite.',
        keyHighlights: [
          '$4.5B ATM exhausted in 5 weeks — unprecedented demand',
          '$20B expansion via 424B5 supplement — massive firepower',
          'Market clearly willing to fund accumulation at premium to NAV',
          'Institutional demand confirmed — this is not retail mania',
          'Path to 5% ETH supply now financially viable'
        ],
        verdict: 'When the market gives you unlimited capital at favorable terms, you take it. Management is doing exactly that.',
        scorecard: 7.8,
        risks: 'Execution speed is the risk. Can they deploy this fast enough? ETH price during accumulation matters.',
        strategy: 'Buy the momentum. The market is telling you something — listen to it.'
      }
    },
    {
      date: '2025-07-29',
      source: '$1B Buyback Authorization + Holdings Update',
      verdict: 'BUY',
      verdictColor: 'mint',
      summary: 'Management putting money where their mouth is. Aligned with shareholders.',
      fullAnalysis: {
        context: 'The $1B buyback authorization is a powerful signal. Tom Lee\'s comment about "acquiring our own shares" if trading below NAV tells you everything about management alignment. Combined with 625K ETH accumulated, the framework is complete.',
        keyHighlights: [
          '$1B buyback authorization — NAV floor protection',
          '625,000 ETH accumulated — rapid execution',
          '$401M cash on hand for operational runway',
          'Management explicitly committed to buying back below NAV',
          'Multiple value creation mechanisms now in place'
        ],
        verdict: 'The strategic framework is complete: accumulate at premium, buy back at discount, earn yield in between. Elegant.',
        scorecard: 7.5,
        risks: 'Still early in transition. Market acceptance of ETH pivot not fully proven yet.',
        strategy: 'Build position. The playbook is now clear — execution is what matters.'
      }
    },
    {
      date: '2025-06-30',
      source: 'ETH Pivot Announcement',
      verdict: 'SPECULATIVE',
      verdictColor: 'gold',
      summary: 'Bold move. High risk, high reward. Either genius or desperation.',
      fullAnalysis: {
        context: 'This is either the most visionary corporate pivot since Netflix went streaming, or a desperate Hail Mary from a dying company. The BTC mining business was bleeding cash post-halving. Something had to change.',
        keyHighlights: [
          'Complete strategic pivot from BTC mining to ETH treasury',
          'Tom Lee appointed as Chairman — brings credibility',
          'Going concern warning still active — clock is ticking',
          'Zero ETH holdings at announcement — starting from scratch',
          'Market reaction will determine if capital is available'
        ],
        verdict: 'Binary outcome. If they can raise capital and execute, this is a 10-bagger. If not, it\'s zero. No middle ground.',
        scorecard: 5.0,
        risks: 'EVERYTHING is risk at this stage. Capital availability, execution, ETH price, credibility, timing.',
        strategy: 'Small speculative position only. This is venture-style risk in a public equity wrapper.'
      }
    },
    {
      date: '2025-07-14',
      source: 'Q3 FY2025 10-Q Filing',
      verdict: 'SELL',
      verdictColor: 'coral',
      summary: 'Going concern. Cash burning. Without change, this company dies.',
      fullAnalysis: {
        context: 'The final quarterly filing before the pivot tells a grim story. Cash declined from $797K to $392K. Losses mounting. BTC mining completely uneconomic post-halving. This company was circling the drain.',
        keyHighlights: [
          'Going concern doubt persists — auditors waving red flags',
          'Cash position: $392K (down from $797K) — runway measured in weeks',
          'Quarterly net loss: ($1.16M) — bleeding continues',
          'BTC mining operations uneconomic at current difficulty/price',
          'No clear path to profitability under current strategy'
        ],
        verdict: 'Without a strategic pivot, this company was heading for bankruptcy or delisting. The fundamentals were broken.',
        scorecard: 2.0,
        risks: 'Insolvency risk was HIGH. Delisting risk was REAL. Total loss of equity was the base case.',
        strategy: 'SELL or avoid entirely. No thesis here. Just hope, and hope is not a strategy.'
      }
    },
  ];
