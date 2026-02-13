/**
 * BMNR Timeline Events Data
 * Extracted from BMNR.tsx for maintainability.
 * Chronological record of ACTUAL COMPANY changes.
 * Newest first.
 */

export const BMNR_TIMELINE_EVENTS = [
  // [PR_CHECKLIST_EVENT_TIMELINE] - Add new PR entry here at top!
  // === FEBRUARY 11, 2026 - COINDESK CONSENSUS 2026 PRESENTATION ===
  {
    date: '2026-02-11',
    source: 'SEC Filing (8-K)',
    category: 'Corporate',
    title: '🎤 Tom Lee Presents at CoinDesk Consensus 2026 in Hong Kong',
    changes: [
      { metric: 'Event', previous: '—', new: 'CoinDesk Consensus 2026', change: 'Hong Kong' },
      { metric: 'Presenter', previous: '—', new: 'Tom Lee', change: 'Executive Chairman' },
      { metric: 'Filing', previous: '—', new: '8-K (Reg FD)', change: 'Presentation attached as Ex. 99.1' },
    ],
    notes: 'Tom Lee, Executive Chairman, presented at CoinDesk Consensus 2026 Conference in Hong Kong. Presentation filed as Exhibit 99.1 via 8-K (Item 7.01 Regulation FD Disclosure). Major global crypto conference appearance signals continued institutional outreach and thought leadership positioning.',
    impact: 'positive'
  },
  // === FEBRUARY 10, 2026 - BEAST INDUSTRIES ACQUIRES STEP BANKING APP ===
  {
    date: '2026-02-10',
    source: 'CoinDesk / Press Release',
    category: 'Corporate',
    title: '🦁 Beast Industries Acquires Step Banking App — BMNR\'s $200M Investment Expands into Fintech',
    changes: [
      { metric: 'Acquisition', previous: '—', new: 'Step Banking App', change: 'Beast Industries acquires' },
      { metric: 'Step Users', previous: '—', new: '7M+', change: 'Mobile-first fintech users' },
      { metric: 'Step Funding', previous: '—', new: '~$500M raised', change: 'Backers: Curry, D\'Amelio, Timberlake' },
      { metric: 'BMNR Exposure', previous: '$200M equity', new: '$200M + Step platform', change: 'Expanded fintech reach' },
      { metric: 'Beast Subscribers', previous: '450M+', new: '460M+', change: 'YouTube subscribers' },
    ],
    notes: 'Beast Industries (MrBeast, 460M+ YouTube subscribers, 5B monthly views) acquired Step, a mobile-first financial services app with 7M+ users focused on financial literacy and credit-building for younger generations. Step previously raised ~$500M from Stephen Curry, Charli D\'Amelio, Justin Timberlake. BMNR\'s $200M equity investment in Beast Industries now has exposure to a full fintech platform. Jeff Housenbold (Beast CEO) noted expansion into regulated sectors and financial platforms. The article explicitly mentions: "The transaction follows a $200 million investment in Beast Industries from BitMine Immersion Technologies, the leading Ethereum treasury firm, signaling potential expansion into digital asset offerings alongside traditional financial services." MrBeast: "Nobody taught me about investing, building credit, or managing money when I was growing up. I want to give millions of young people the financial foundation I never had."',
    impact: 'positive'
  },
  // === FEBRUARY 9, 2026 - S-8 2025 OMNIBUS INCENTIVE PLAN ===
  {
    date: '2026-02-09',
    source: 'SEC Filing (S-8)',
    category: 'SEC Filing',
    title: '📋 S-8 Filed: 2025 Omnibus Incentive Plan Registration',
    changes: [
      { metric: 'Filing', previous: '—', new: 'Form S-8', change: '2025 Omnibus Incentive Plan' },
      { metric: 'Legal Counsel', previous: '—', new: 'Winston & Strawn LLP', change: 'Houston' },
      { metric: 'Board Signers', previous: '—', new: '8 directors', change: 'Tsang, Kim, Lee, Maloney, Love, Sharbutt, Edgeworth, Howe, Sechan' },
    ],
    notes: 'Bitmine registered shares under the 2025 Omnibus Incentive Plan via Form S-8. Filed by Chi Tsang (CEO) with Winston & Strawn LLP as legal counsel. Signed by full board: Chi Tsang (CEO/Director), Young Kim (CFO/COO/Director), Thomas Lee (Executive Chairman), Michael Maloney, Lori Love, David Sharbutt, Jason Edgeworth, Olivia Howe, Robert Sechan. Incorporates by reference recent 10-K, 10-Q, and 8-K filings. Standard equity compensation registration for employee/director incentive plan.',
    impact: 'neutral'
  },
  // === JANUARY 28, 2026 - NELSON SEPARATION AGREEMENT ===
  {
    date: '2026-01-28',
    source: 'SEC Filing (8-K)',
    category: 'Corporate',
    title: '👤 Erik Nelson Separation — President Terminated Without Cause, $605K Severance',
    changes: [
      { metric: 'Officer', previous: 'Erik Nelson (President)', new: 'Terminated', change: 'Without Cause, effective Jan 22' },
      { metric: 'Notice Payment', previous: '—', new: '$20,000', change: '30 days base salary in lieu of notice' },
      { metric: 'Severance Payment', previous: '—', new: '$585,000', change: 'Lump sum within 30 days' },
      { metric: 'Total Severance', previous: '—', new: '$605,000', change: '$20K notice + $585K severance' },
      { metric: 'Non-Compete', previous: 'Active', new: 'Waived', change: 'Released from Sections 6(a)-(c)' },
      { metric: 'Equity', previous: 'Per company books', new: 'Retained existing shares', change: 'No additional grants' },
    ],
    notes: 'Erik Nelson terminated without Cause as President, effective January 22, 2026. Separation Agreement filed as Exhibit 10.1. Total severance: $605K ($20K notice + $585K lump sum). Non-competition and non-solicitation covenants fully waived and released. Nelson retains existing shares per company books but waived all additional equity rights. Confidentiality obligations continue. Employment Agreement dated September 1, 2025. Board noted termination "is not related to a disagreement with the Company on any matter relating to the Company\'s operations, policies, or practices." Board thanked Nelson for "distinguished service and valuable contributions." Compensation Committee and Board approved the separation. Filed January 28, 2026.',
    impact: 'neutral'
  },
  // === FEBRUARY 9, 2026 - ETH HOLDINGS + ETH -62% FROM HIGHS ===
  {
    date: '2026-02-09',
    source: 'PRNewswire',
    category: 'Holdings',
    title: '📊 ETH Holdings Reach 4.326M — $10.0B Total, ETH -62% from 2025 Highs, V-Recovery Expected',
    changes: [
      { metric: 'ETH Holdings', previous: '4,285,125', new: '4,325,738', change: '+40,613 (+0.9%)' },
      { metric: 'ETH Price', previous: '$2,317', new: '$2,125', change: '-8.3% (Coinbase)' },
      { metric: 'ETH Supply %', previous: '3.55%', new: '3.58%', change: '+0.03pp (72% to 5%)' },
      { metric: 'Staked ETH', previous: '2,897,459', new: '2,897,459', change: 'Unchanged' },
      { metric: 'Staking Ratio', previous: '67.6%', new: '67.0%', change: '-0.6pp (more ETH, same staked)' },
      { metric: 'Total Cash', previous: '$586M', new: '$595M', change: '+$9M' },
      { metric: 'Eightco (ORBS)', previous: '$20M', new: '$19M', change: '-$1M' },
      { metric: 'Trading Rank', previous: '#105', new: '#107', change: '-2 ($1.3B/day)' },
      { metric: 'Total Holdings', previous: '$10.7B', new: '$10.0B', change: '-$0.7B (ETH price)' },
      { metric: 'Staking Revenue', previous: '$188M/yr', new: '$202M/yr', change: '+7% WoW annualized' },
      { metric: 'CESR Rate', previous: '~2.81%', new: '3.11%', change: '+30bp (Quatrefoil)' },
    ],
    notes: 'ETH -62% from 2025 highs, but Tom Lee: this is the 8th time since 2018 ETH has fallen 50%+ from a recent high (happens annually). V-shaped recoveries follow every time. 2025 example: ETH fell -64% Jan→Mar then surged $1,600→$5,000. Ethereum daily txns ATH (2.5M), active addresses ATH (1M daily). "Best investment opportunities present themselves after declines." CESR improved to 3.11%. Annualized staking $202M (+7% WoW). Bitmine 7-day yield 3.3234%. Beast $200M initial investment closed. GENIUS Act + SEC Project Crypto compared to ending Bretton Woods 1971. 193 BTC held. $595M cash.',
    impact: 'positive'
  },
  // === FEBRUARY 2, 2026 - ETH HOLDINGS + STAKING SURGE ===
  {
    date: '2026-02-02',
    source: 'PRNewswire',
    category: 'Holdings',
    title: '📊 ETH Holdings Reach 4.285M — $10.7B Total, Staking Explodes to 67.6%',
    changes: [
      { metric: 'ETH Holdings', previous: '4,243,338', new: '4,285,125', change: '+41,787 (+1.0%)' },
      { metric: 'ETH Price', previous: '$2,839', new: '$2,317', change: '-18.4% (Coinbase)' },
      { metric: 'ETH Supply %', previous: '3.52%', new: '3.55%', change: '+0.03pp (71% to 5%)' },
      { metric: 'Staked ETH', previous: '2,009,267', new: '2,897,459', change: '+888,192 (+44.2%)' },
      { metric: 'Staking Ratio', previous: '47.4%', new: '67.6%', change: '+20.2pp' },
      { metric: 'Total Cash', previous: '$682M', new: '$586M', change: '-$96M' },
      { metric: 'Eightco (ORBS)', previous: '$19M', new: '$20M', change: '+$1M' },
      { metric: 'Trading Rank', previous: '#91', new: '#105', change: '-14 ($1.1B/day)' },
      { metric: 'Total Holdings', previous: '$12.8B', new: '$10.7B', change: '-$2.1B (ETH price)' },
      { metric: 'Staking Revenue', previous: 'N/A', new: '$188M/yr', change: '+18% WoW annualized' },
    ],
    notes: 'ETH price dropped sharply (~$3,000→$2,317) but fundamentals strengthening: Ethereum daily txns hit ATH (2.5M via theblock.co), active addresses soared to ATH (1M daily). Tom Lee: "non-fundamental factors" explain weakness — leverage not returned since Oct 10th, gold "vortex" pulling risk appetite. Gold -9% on Jan 30 (4th largest daily drop) may signal near-term top (similar to Jan 22, 1980 pattern). Staking exploded +888K ETH to 2.9M (67.6% of holdings, largest staker in world). Annualized staking revenue $188M (up 18% WoW). MAVAN on track Q1 2026 (3 staking providers). GENIUS Act + SEC Project Crypto "transformational." Beast $200M closed. 193 BTC held.',
    impact: 'neutral'
  },
  // === JANUARY 26, 2026 - ETH HOLDINGS + DAVOS 2026 ===
  {
    date: '2026-01-26',
    source: 'PRNewswire',
    category: 'Holdings',
    title: '📊 ETH Holdings Reach 4.243M — $12.8B Total, Davos 2026 Bullish',
    changes: [
      { metric: 'ETH Holdings', previous: '4,203,036', new: '4,243,338', change: '+40,302 (+1.0%)' },
      { metric: 'ETH Price', previous: '$3,211', new: '$2,839', change: '-11.6% (Coinbase)' },
      { metric: 'ETH Supply %', previous: '3.48%', new: '3.52%', change: '+0.04pp' },
      { metric: 'Staked ETH', previous: '1,838,003', new: '2,009,267', change: '+171,264 (+9.3%)' },
      { metric: 'Total Cash', previous: '$979M', new: '$682M', change: '-$297M' },
      { metric: 'Eightco (ORBS)', previous: '$22M', new: '$19M', change: '-$3M' },
      { metric: 'Trading Rank', previous: '#60', new: '#91', change: '-31 ($1.2B/day)' },
      { metric: 'Total Holdings', previous: '$14.5B', new: '$12.8B', change: '-$1.7B (ETH price)' },
    ],
    notes: 'Davos 2026 sentiment strongly bullish on crypto/blockchain. Larry Fink (BlackRock): "Tokenization is necessary... if we have one common blockchain, we could reduce corruption." David Sacks (White House): "Banking and crypto will transform into a single digital asset industry." Bill Winters (Standard Chartered): "Most things will settle in digital form... this is the year when this is happening in scale." ETHBTC ratio climbing since mid-October as investors recognize Wall Street building on Ethereum. Staking income: $374M/yr at scale (2.81% CESR). MAVAN on track Q1 2026. Beast Industries $200M closed.',
    impact: 'positive'
  },
  // === JANUARY 20, 2026 - ETH HOLDINGS + SHAREHOLDER VOTE ===
  {
    date: '2026-01-20',
    source: 'PRNewswire',
    category: 'Holdings',
    title: '📊 ETH Holdings Reach 4.203M — $14.5B Total, 81% Shareholder YES',
    changes: [
      { metric: 'ETH Holdings', previous: '4,167,768', new: '4,203,036', change: '+35,268 (+0.8%)' },
      { metric: 'ETH Price', previous: '$3,119', new: '$3,211', change: '+2.9% (Coinbase)' },
      { metric: 'ETH Supply %', previous: '3.45%', new: '3.48%', change: '+0.03pp' },
      { metric: 'Staked ETH', previous: '1,256,083', new: '1,838,003', change: '+581,920 (+46.3%)' },
      { metric: 'Total Cash', previous: '$988M', new: '$979M', change: '-$9M (post Beast)' },
      { metric: 'Shareholder Vote', previous: 'Pending', new: '81% YES', change: '52.2% turnout' },
      { metric: 'Beast Industries', previous: 'Announced', new: 'CLOSED', change: '$200M invested' },
      { metric: 'Stockholders', previous: 'N/A', new: '500,000+', change: 'Individual investors' },
      { metric: 'Trading Rank', previous: '#67', new: '#60', change: '+7 ($1.5B/day)' },
    ],
    notes: 'Shareholder vote passed with 81% YES on Proposal 2 (share authorization 500M→50B), 52.2% of outstanding shares voted. Beast Industries $200M investment officially closed Jan 17. Staking surged to 1.838M ETH (43.7% of holdings, $5.9B value). 500,000+ individual stockholders. BMNR now #60 most traded US stock at $1.5B/day average volume. CESR rate: 2.81%. MAVAN remains on track for Q1 2026.',
    impact: 'positive'
  },
  // === JANUARY 15, 2026 - $200M BEAST INDUSTRIES INVESTMENT ===
  {
    date: '2026-01-15',
    source: 'PRNewswire',
    category: 'Corporate',
    title: '🦁 $200M Strategic Investment in Beast Industries (MrBeast)',
    changes: [
      { metric: 'Investment', previous: '$0', new: '$200M equity', change: 'Beast Industries' },
      { metric: 'Investor Base', previous: 'Institutions', new: '+ MrBeast/Beast Industries', change: 'Strategic partnership' },
      { metric: 'Target Audience', previous: 'Institutions', new: '+ GenZ/GenAlpha/Millennials', change: 'Demographic expansion' },
      { metric: 'Deal Close', previous: '—', new: 'Jan 19, 2026', change: 'Expected' },
      { metric: 'Annual Meeting', previous: '—', new: 'Jan 15, 2026', change: 'Wynn Las Vegas (today)' },
    ],
    notes: '$200M equity investment into Beast Industries (MrBeast - 450M+ YouTube subscribers, 5B monthly views). CEO Jeff Housenbold: "Their support is a strong validation of our vision." Tom Lee: "Beast Industries is the leading content creator of our generation with reach and engagement unmatched with GenZ, GenAlpha and Millennials." Exploring DeFi integration into Beast\'s upcoming financial services platform. Premier institutional investors reaffirmed: ARK (Cathie Wood), MOZAYYX, Founders Fund, Bill Miller III, Pantera, Kraken, DCG, Galaxy Digital, and Tom Lee. Annual Meeting livestreamed on X @bitmnr. Goal: acquiring 5% of ETH.',
    impact: 'positive'
  },
  // === JANUARY 13, 2026 - Q1 2026 10-Q FILING ===
  {
    date: '2026-01-13',
    source: 'SEC Filing (10-Q)',
    category: 'SEC Filing',
    title: '📋 Q1 2026 10-Q: $10.6B Digital Assets, First Staking Revenue',
    changes: [
      { metric: 'Period Covered', previous: '—', new: 'Nov 30, 2025', change: 'Q1 2026' },
      { metric: 'Digital Assets', previous: '$8.26B (FY25)', new: '$10.56B', change: '+$2.3B (+28%)' },
      { metric: 'ETH Holdings', previous: '2.38M (FY25)', new: '3,737,140', change: '+1.36M (+57%)' },
      { metric: 'Cash', previous: '$512M', new: '$888M', change: '+$376M (+73%)' },
      { metric: 'Total Assets', previous: '$8.8B', new: '$11.5B', change: '+$2.7B (+31%)' },
      { metric: 'Stockholders Equity', previous: '$8.69B', new: '$11.25B', change: '+$2.56B (+29%)' },
      { metric: 'Staking Revenue', previous: '$0', new: '$980K', change: 'First ever!' },
      { metric: 'Net Loss', previous: '$349M NI (FY25)', new: '$(5.2B)', change: 'Unrealized ETH loss' },
      { metric: 'Shares Outstanding', previous: '384M', new: '409M (Nov 30)', change: '+25M' },
    ],
    notes: 'First quarterly filing post-ETH pivot. Key highlights: (1) Digital assets grew to $10.56B (3.74M ETH @ $2,821 avg); (2) First staking revenue recognized: $980K; (3) Net loss of $5.2B driven almost entirely by $5.25B unrealized loss on ETH holdings due to price decline; (4) Cash position strengthened to $888M; (5) Eightco investment valued at $35.9M (up from $20M cost); (6) Material weakness in internal controls still being remediated. Chi Tsang confirmed as CEO (Nov 20), Young Kim as CFO/COO (Jan 7). Shares outstanding: 409M (Nov 30) → 455M (Jan 12).',
    impact: 'neutral'
  },
  // === JANUARY 12, 2026 - ETH HOLDINGS UPDATE ===
  {
    date: '2026-01-12',
    source: 'PRNewswire',
    category: 'Holdings',
    title: '📊 ETH Holdings Reach 4.168M — $14.0B Total Holdings',
    changes: [
      { metric: 'ETH Holdings', previous: '4,143,502', new: '4,167,768', change: '+24,266 (+0.6%)' },
      { metric: 'ETH Price', previous: '$3,196', new: '$3,119', change: '-2.4% (Coinbase)' },
      { metric: 'ETH Supply %', previous: '3.43%', new: '3.45%', change: '+0.02pp (70% to 5%)' },
      { metric: 'Staked ETH', previous: '659,219', new: '1,256,083', change: '+596,864 (+90.5%)' },
      { metric: 'Total Cash', previous: '$915M', new: '$988M', change: '+$73M (+8%)' },
      { metric: 'Trading Rank', previous: '#44', new: '#67', change: '-23 ($1.3B/day)' },
      { metric: 'Shares Outstanding', previous: '426M', new: '434M', change: '+8M' },
    ],
    notes: 'Tom Lee urges stockholders to vote YES on proposal #2 (authorized shares increase from 500M to 50B). Staking scaled massively: +596,864 ETH staked in one week to 1.256M total (30% of holdings). MAVAN on track Q1 2026. At scale staking = $374M/yr (>$1M/day). Annual Meeting Jan 15 @ Wynn Las Vegas. BMNR now 70% of the way to "Alchemy of 5%". Tom Lee 2026 thesis: "crypto prices recover with stronger gains in 2027-2028." GENIUS Act compared to Aug 15, 1971 (end of Bretton Woods).',
    impact: 'positive'
  },
  // === JANUARY 9, 2026 - CFO/COO APPOINTMENT ===
  {
    date: '2026-01-09',
    source: 'PRNewswire',
    category: 'Corporate',
    title: '👔 CFO/COO Appointed: Young Kim (MIT/HBS, Columbia Threadneedle)',
    changes: [
      { metric: 'CFO', previous: 'Vacant (Mow Jan 16)', new: 'Young Kim', change: 'Effective immediately' },
      { metric: 'COO', previous: 'N/A', new: 'Young Kim (dual role)', change: 'New position' },
      { metric: 'Board', previous: '—', new: '+Young Kim', change: 'Reports to Tom Lee' },
      { metric: 'Background', previous: '—', new: 'MIT + HBS', change: '"Engineer-investor"' },
      { metric: 'Experience', previous: '—', new: '20+ years', change: 'Multi-billion AUM' },
    ],
    notes: 'Young Kim appointed CFO and COO, effective immediately. Also joins Board of Directors, reports to Tom Lee. Background: MIT engineering + Harvard Business School. 2021-2025: Partner & Senior PM at Axiom Investors. 2011-2021: Senior PM at Columbia Threadneedle Investments. Early career: software engineer, VC, investment research. Tom Lee: "[Young] will play an integral role in helping to execute our roadmap and scale the business." Kim: "With a strong foundation in place, Bitmine is well positioned to scale." Also confirmed: 3.43% ETH supply, Annual Meeting Jan 15 @ Wynn Las Vegas. Institutional backers: ARK, MOZAYYX, Founders Fund, Bill Miller III, Pantera, Kraken, DCG, Galaxy Digital.',
    impact: 'positive'
  },
  // === JANUARY 5, 2026 - 8-K ETH HOLDINGS UPDATE ===
  {
    date: '2026-01-05',
    source: 'SEC Filing (8-K)',
    category: 'Holdings',
    title: '📊 8-K: ETH Holdings $14.2B - 4.144M ETH Milestone',
    changes: [
      { metric: 'ETH Holdings', previous: '4,110,525', new: '4,143,502', change: '+32,977 (+0.8%)' },
      { metric: 'ETH Price', previous: '$2,948', new: '$3,196', change: '+8.4% (Coinbase)' },
      { metric: 'Holdings Value', previous: '$13.2B', new: '$14.2B', change: '+$1.0B (+7.6%)' },
      { metric: 'Staked ETH', previous: '408,627', new: '659,219', change: '+250,592 (+61.3%)' },
      { metric: 'Total Cash', previous: '$500M', new: '$915M', change: '+$415M (+83%)' },
      { metric: 'ETH Supply %', previous: '3.41%', new: '3.43%', change: '+0.02pp' },
    ],
    notes: 'Relentless accumulation continues through holiday week. 32,977 ETH acquired in past week alone. Staking scaled dramatically (+250,592 in one week to 659,219 total staked). Cash position nearly doubled to $915M. BMNR now #44 most traded stock in US ($1.1B/day avg volume). Machine operating at full capacity. Annual Meeting Jan 15 @ Wynn Las Vegas.',
    impact: 'positive'
  },
  // === JANUARY 2, 2026 - CHAIRMAN'S MESSAGE ===
  {
    date: '2026-01-02',
    source: 'SEC Filing (8-K, DEFA14A)',
    category: 'Corporate',
    title: '📢 Chairman\'s Message: Vote YES on Authorized Shares Increase',
    changes: [
      { metric: 'Proposal 2', previous: '500M authorized', new: '50B authorized', change: '100x increase' },
      { metric: 'Vote Deadline', previous: '—', new: 'Jan 14, 2026 11:59 PM ET', change: '12 days' },
      { metric: 'Annual Meeting', previous: '—', new: 'Jan 15, 2026', change: 'Wynn Las Vegas' },
      { metric: 'ETH/BMNR Coefficient', previous: 'Implied', new: '0.015 × ETH + accretion', change: 'Per Bloomberg' },
      { metric: 'Split @ $22k ETH', previous: '—', new: '$500 BMNR → 20:1', change: '8.5B shares' },
      { metric: 'Split @ $250k ETH', previous: '—', new: '$5,000 BMNR → 100:1', change: '43B shares' },
    ],
    notes: 'Tom Lee video explaining why shareholders should vote YES: (1) Capital markets flexibility - ATM, convertibles, warrants; (2) M&A optionality; (3) Future stock splits as ETH price rises. Price correlation formalized: BMNR = 0.015×ETH + ETH/share accretion. Implied splits needed to keep shares ~$25: $22k ETH→20:1, $62.5k→60:1, $250k→100:1. Current shares: 426M. Institutional backers reaffirmed: ARK (Cathie Wood), MOZAYYX, Founders Fund, Bill Miller III, Pantera, Kraken, DCG, Galaxy Digital. ETH/BTC target: 0.25 ("payment rails"). Livestream on X @bitmnr.',
    impact: 'positive'
  },
  // === DECEMBER 29, 2025 - LATEST HOLDINGS UPDATE ===
  {
    date: '2025-12-29',
    source: 'Press Release',
    category: 'Holdings',
    title: '📊 ETH Holdings Reach 4.11 Million - $13.2B Total Holdings',
    changes: [
      { metric: 'ETH Holdings', previous: '4,066,062', new: '4,110,525', change: '+44,463 (+1.1%)' },
      { metric: 'ETH Price', previous: '$2,991', new: '$2,948', change: '-1.4% (Coinbase)' },
      { metric: 'ETH Supply %', previous: '3.37%', new: '3.41%', change: '+0.04pp (⅔ to 5%)' },
      { metric: 'Staked ETH', previous: '342,560', new: '408,627', change: '+66,067 (+19.3%)' },
      { metric: 'Total Cash', previous: '$1.0B', new: '$1.0B', change: 'Unchanged' },
      { metric: 'Trading Rank', previous: '#66', new: '#47', change: '+19 ($980M/day)' },
    ],
    notes: 'Chairman\'s message re: Annual Meeting Jan 15 @ Wynn Las Vegas. 4 key proposals need stockholder approval. MAVAN on track Q1 2026. Working with 3 staking providers. Staking fee at scale: $374M/year ($1M+/day). CESR rate 2.81%. Moonshots: $23M Eightco (ORBS).',
    impact: 'positive'
  },
  // === STAKING UPDATE - Official PR Data ===
  {
    date: '2025-12-29',
    source: 'Press Release (Official)',
    category: 'Product',
    title: '🔥 STAKING UPDATE: 408,627 ETH Staked via 3 Providers',
    changes: [
      { metric: 'ETH Staked', previous: '0', new: '408,627 ETH', change: 'First official disclosure' },
      { metric: 'Staking Value', previous: '$0', new: '$1.2 billion', change: 'At $2,948/ETH' },
      { metric: '% of Holdings Staked', previous: '0%', new: '9.94%', change: 'Of 4.11M ETH' },
      { metric: 'Staking Providers', previous: '0', new: '3 providers', change: 'Pre-MAVAN' },
      { metric: 'CESR Rate', previous: 'N/A', new: '2.81%', change: 'Quatrefoil' },
      { metric: 'Annual Fee @ Scale', previous: 'N/A', new: '$374M/year', change: '>$1M/day' },
    ],
    notes: 'First official PR confirming staking operations: 408,627 ETH staked ($1.2B). Working with 3 staking providers pre-MAVAN. MAVAN (Made in America VAlidator Network) on track for Q1 2026 commercial launch. At full scale, staking generates $374M annual (~$1M+/day) at 2.81% CESR.',
    impact: 'positive'
  },
  // === DECEMBER 2025 WEEKLY HOLDINGS + SEC FILINGS ===
  {
    date: '2025-12-22',
    source: '8-K Filing + Press Release',
    category: 'Holdings',
    title: '🎯 4M MILESTONE: ETH Holdings Reach 4.066 Million Tokens',
    changes: [
      { metric: 'ETH Holdings', previous: '3,967,210', new: '4,066,062', change: '+98,852 (+2.5%)' },
      { metric: 'ETH Price', previous: '$3,074', new: '$2,991', change: '-2.7%' },
      { metric: 'ETH Supply %', previous: '3.29%', new: '3.37%', change: '+0.08pp' },
      { metric: 'Total Holdings', previous: '$13.2B', new: '$13.2B', change: 'Stable' },
      { metric: 'Cash', previous: '$1.0B', new: '$1.0B', change: 'Unchanged' },
      { metric: 'Trading Rank', previous: '#41', new: '#66', change: '-25 (vol down)' },
    ],
    notes: '8-K filed with operational update PR. Exceeded 4M ETH after 5.5 months. Two-thirds to "Alchemy of 5%". Annual meeting Jan 15, 2026 at Wynn Las Vegas.',
    impact: 'positive'
  },
  {
    date: '2025-12-19',
    source: '8-K Filing',
    category: 'SEC Filing',
    title: 'Annual Meeting Announcement - Jan 15, 2026',
    changes: [
      { metric: 'Meeting Date', previous: 'N/A', new: 'Jan 15, 2026', change: 'Wynn Las Vegas' },
      { metric: 'Key Vote', previous: 'N/A', new: '50B authorized shares', change: 'Proposal' },
    ],
    notes: 'Annual shareholder meeting scheduled. DEFR14A proxy filed. 50B authorized shares proposal for future capital flexibility.',
    impact: 'neutral'
  },
  {
    date: '2025-12-15',
    source: '8-K Filing + Press Release',
    category: 'Holdings',
    title: 'ETH Holdings Reach 3.97 Million Tokens',
    changes: [
      { metric: 'ETH Holdings', previous: '3,864,951', new: '3,967,210', change: '+102,259 (+2.6%)' },
      { metric: 'ETH Price', previous: '$3,139', new: '$3,074', change: '-2.1%' },
      { metric: 'Total Holdings', previous: '$13.2B', new: '$13.3B', change: '+0.8%' },
      { metric: 'Cash', previous: '$0.9B', new: '$1.0B', change: '+11%' },
      { metric: 'Trading Rank', previous: '#37', new: '#41', change: '-4' },
    ],
    notes: '8-K filed with operational update. Crypto prices stabilizing post-Oct 10. MAVAN staking to deploy early Q1 2026. Trading $1.9B/day.',
    impact: 'positive'
  },
  {
    date: '2025-12-11',
    source: '8-K Filing',
    category: 'Corporate',
    title: 'CFO Raymond Mow Separation Agreement',
    changes: [
      { metric: 'CFO Departure', previous: 'N/A', new: 'Jan 16, 2026', change: 'Effective date' },
      { metric: 'Severance', previous: 'N/A', new: '$1,137,500 lump sum', change: 'Cash' },
      { metric: 'Bonus', previous: 'N/A', new: '$150K accelerated', change: 'Pro-rated' },
      { metric: 'RSU Vesting', previous: 'N/A', new: '$455K value', change: 'Accelerated' },
      { metric: 'Reason', previous: 'N/A', new: 'Without Cause', change: 'No disagreement' },
    ],
    notes: 'Separation Agreement filed. CFO exits with significant package. Termination "without Cause" - not related to disagreement on operations/policies. Transition period through Jan 16.',
    impact: 'neutral'
  },
  {
    date: '2025-12-08',
    source: '8-K Filing + Press Release',
    category: 'Holdings',
    title: 'ETH Holdings Exceed 3.86 Million + Binance Blockchain Week Video',
    changes: [
      { metric: 'ETH Holdings', previous: '3,726,499', new: '3,864,951', change: '+138,452 (+3.7%)' },
      { metric: 'ETH Price', previous: '$3,008', new: '$3,139', change: '+4.4%' },
      { metric: 'Total Holdings', previous: '$12.1B', new: '$13.2B', change: '+9.1%' },
      { metric: 'Weekly Pace', previous: '54,156', new: '138,452', change: '+156%' },
      { metric: 'Trading Rank', previous: '#39', new: '#37', change: '+2' },
    ],
    notes: '8-K filed with Tom Lee Binance Blockchain Week video + transcript. Chairman message: "The Crypto Supercycle is Intact". Significant buying acceleration.',
    impact: 'positive'
  },
  {
    date: '2025-12-05',
    source: '8-K Filing',
    category: 'Corporate',
    title: 'Director Raymond Mow Resigns from Board',
    changes: [
      { metric: 'Board Resignation', previous: 'N/A', new: 'Raymond Mow', change: 'Immediate' },
      { metric: 'Reason', previous: 'N/A', new: 'Not due to disagreement', change: 'Confirmed' },
    ],
    notes: 'CFO Mow resigned from Board (remains CFO until Jan 16). 8-K confirms resignation not related to disagreement on operations/policies/practices.',
    impact: 'neutral'
  },
  {
    date: '2025-12-04',
    source: '8-K Filing',
    category: 'Corporate',
    title: 'Binance Blockchain Week Presentation Filed',
    changes: [
      { metric: 'Event', previous: 'N/A', new: 'Binance Blockchain Week Dubai', change: 'Dec 2025' },
      { metric: 'Presenter', previous: 'N/A', new: 'Tom Lee (Chairman)', change: 'Keynote' },
    ],
    notes: '8-K filed with Tom Lee Binance Blockchain Week 2025 presentation. "The Crypto Supercycle, Ethereum 1971 Moment & MAVAN Staking Strategy."',
    impact: 'positive'
  },
  {
    date: '2025-12-01',
    source: '8-K Filing + Press Release',
    category: 'Holdings',
    title: 'ETH Holdings Reach 3.73 Million Tokens',
    changes: [
      { metric: 'ETH Holdings', previous: '3,559,879', new: '3,726,499', change: '+166,620 (+4.7%)' },
      { metric: 'ETH Price', previous: '$3,120', new: '$3,008', change: '-3.6%' },
      { metric: 'Total Holdings', previous: '$11.8B', new: '$12.1B', change: '+2.5%' },
      { metric: 'Cash', previous: '$607M', new: '$876M', change: '+44%' },
      { metric: 'ETH Supply %', previous: '2.9%', new: '3.0%', change: '+0.1pp' },
    ],
    notes: '8-K filed. 7+ weeks past Oct 10 shock. Stepped up weekly purchases by 39%. Now >3% of ETH supply.',
    impact: 'positive'
  },
  // === NOVEMBER 2025 - EARNINGS + WEEKLY HOLDINGS ===
  {
    date: '2025-11-21',
    source: '10-K Filing + Press Release',
    category: 'SEC Filing',
    title: '📊 FY25 EARNINGS: GAAP EPS $13.39 + First Dividend',
    changes: [
      { metric: 'FY25 Net Income', previous: 'N/A', new: '$328.2M', change: 'First profitable FY' },
      { metric: 'FY25 EPS', previous: 'N/A', new: '$13.39', change: 'Fully diluted' },
      { metric: 'ETH (Aug 31)', previous: '0', new: '1,874,927', change: 'Audited' },
      { metric: 'ETH Cost Basis', previous: 'N/A', new: '$7.43B', change: 'Audited' },
      { metric: 'Dividend', previous: '$0', new: '$0.01/share', change: 'First ever' },
      { metric: 'Shares Outstanding', previous: '2.5M (Aug 24)', new: '234.7M', change: '+9,305%' },
    ],
    notes: 'First large-cap crypto company to pay dividend. Ex-div Dec 5, pay Dec 29. MAVAN staking pilot testing, full deployment Q1 2026.',
    impact: 'positive'
  },
  {
    date: '2025-11-17',
    source: 'Press Release',
    category: 'Holdings',
    title: 'ETH Holdings Reach 3.6 Million + November Chairman Message',
    changes: [
      { metric: 'ETH Holdings', previous: '3,505,723', new: '3,559,879', change: '+54,156 (+1.5%)' },
      { metric: 'ETH Price', previous: '$3,639', new: '$3,120', change: '-14.3%' },
      { metric: 'Total Holdings', previous: '$13.2B', new: '$11.8B', change: '-10.6%' },
      { metric: 'Cash', previous: '$398M', new: '$607M', change: '+52%' },
      { metric: 'ETH Supply %', previous: '2.9%', new: '2.9%', change: 'Unchanged' },
    ],
    notes: 'Nov Chairman message: 5 factors driving 4-year crypto cycle. Tokenization on ETH is massive unlock for innovation. Post-Oct 10 recovery ongoing.',
    impact: 'neutral'
  },
  {
    date: '2025-11-14',
    source: 'Press Release',
    category: 'Corporate',
    title: '🔄 CEO CHANGE: Chi Tsang Appointed + 3 New Board Members',
    changes: [
      { metric: 'CEO', previous: 'Jonathan Bates', new: 'Chi Tsang', change: 'New appointment' },
      { metric: 'Board +', previous: 'N/A', new: 'Robert Sechan (NewEdge)', change: 'Independent' },
      { metric: 'Board +', previous: 'N/A', new: 'Jason Edgeworth (JPD Holdings)', change: 'Independent' },
      { metric: 'Board +', previous: 'N/A', new: 'Olivia Howe (RigUp CLO)', change: 'Independent' },
      { metric: 'ETH Supply %', previous: 'N/A', new: '>2.9%', change: 'Reference' },
    ],
    notes: 'Chi Tsang: "Mobile/internet explosion of 1990s mirrors blockchain today." Bates: "Proud of building from ground up to NYSE and world\'s largest ETH holder." Sechan: "Known Tom Lee 20 years."',
    impact: 'positive'
  },
  {
    date: '2025-11-11',
    source: '8-K Filing',
    category: 'Corporate',
    title: 'Major Board Restructuring (8-K)',
    changes: [
      { metric: 'Directors Resigned', previous: '6', new: '3 out (Bayles, Kelly, Nelson)', change: '-3' },
      { metric: 'Directors Appointed', previous: 'N/A', new: 'Edgeworth, Howe, Sechan', change: '+3' },
      { metric: 'Corporate Secretary', previous: 'Seth Bayles', new: 'Erik Nelson', change: 'Reassigned' },
    ],
    notes: 'Not due to disagreement. Nelson remains President. New directors bring energy, legal, and investment expertise.',
    impact: 'neutral'
  },
  {
    date: '2025-11-10',
    source: 'Press Release',
    category: 'Holdings',
    title: 'ETH Holdings Reach 3.5 Million Tokens (2.9% of Supply)',
    changes: [
      { metric: 'ETH Holdings', previous: '3,395,422', new: '3,505,723', change: '+110,288 (+3.2%)' },
      { metric: 'ETH Price', previous: '$3,903', new: '$3,639', change: '-6.8%' },
      { metric: 'Total Holdings', previous: '$13.7B', new: '$13.2B', change: '-3.6%' },
      { metric: 'Moonshots', previous: '$62M', new: '$61M (OCTO)', change: '-1.6%' },
      { metric: 'Cash', previous: '$389M', new: '$398M', change: '+2.3%' },
      { metric: 'Weekly Buy Pace', previous: '82,353', new: '110,288', change: '+34%' },
      { metric: 'ETH Supply %', previous: '2.8%', new: '2.9%', change: '+0.1pp (>halfway)' },
      { metric: 'Trading Rank', previous: '#60', new: '#48', change: '+12' },
      { metric: 'MSTR Holdings', previous: '640,808 BTC', new: '641,205 BTC', change: '+397 BTC' },
    ],
    notes: 'Dip buying: +34% more ETH week-over-week. NYSE event with Ethereum Foundation hosted "many financial institutions." Wall Street tokenization interest high. BMNR+MSTR = 88% of global DAT trading volume.',
    impact: 'positive'
  },
  {
    date: '2025-11-03',
    source: 'Press Release',
    category: 'Holdings',
    title: '📊 HALFWAY: ETH Holdings Reach 3.4 Million (2.8% of Supply)',
    changes: [
      { metric: 'ETH Holdings', previous: '3,313,069', new: '3,395,422', change: '+82,353 (+2.5%)' },
      { metric: 'ETH Price', previous: '$4,164', new: '$3,903', change: '-6.3%' },
      { metric: 'Total Holdings', previous: '$14.2B', new: '$13.7B', change: '-3.5%' },
      { metric: 'Moonshots', previous: '$88M', new: '$62M (OCTO)', change: '-30%' },
      { metric: 'Cash', previous: '$305M', new: '$389M', change: '+27%' },
      { metric: 'ETH Supply %', previous: '2.8%', new: '2.8%', change: 'Confirmed' },
      { metric: 'Trading Rank', previous: '#46', new: '#60', change: '-14' },
      { metric: 'MSTR Holdings', previous: '640,418 BTC', new: '640,808 BTC', change: '+390 BTC' },
    ],
    notes: 'Now >halfway to Alchemy of 5%. Oct 10 liquidation = largest ever in crypto history. Open interest on ETH fell -45% (largest decline in ETH history). "Healthy reset."',
    impact: 'positive'
  },
  // === OCTOBER 2025 - MAJOR CRASH + RECOVERY ===
  {
    date: '2025-10-27',
    source: 'Press Release',
    category: 'Holdings',
    title: 'ETH Holdings Exceed 3.31 Million Tokens',
    changes: [
      { metric: 'ETH Holdings', previous: '3,236,014', new: '3,313,069', change: '+77,055 (+2.4%)' },
      { metric: 'ETH Price', previous: '$4,022', new: '$4,164', change: '+3.5%' },
      { metric: 'Total Holdings', previous: '$13.4B', new: '$14.2B', change: '+6.0%' },
      { metric: 'Moonshots', previous: '$119M', new: '$88M (OCTO)', change: '-26%' },
      { metric: 'Cash', previous: '$219M', new: '$305M', change: '+39%' },
      { metric: 'ETH Supply %', previous: '2.7%', new: '2.8%', change: '+0.1pp' },
      { metric: 'Trading Rank', previous: '#33', new: '#46', change: '-13' },
      { metric: 'MSTR Holdings', previous: '640,250 BTC', new: '640,418 BTC', change: '+168 BTC' },
    ],
    notes: 'US-China trade talk progress = positive for crypto. ETH open interest at Jun 30 levels ($2,500 ETH then). BMNR+MSTR = 88% of global DAT volume.',
    impact: 'positive'
  },
  {
    date: '2025-10-20',
    source: 'Press Release',
    category: 'Holdings',
    title: 'ETH Holdings Exceed 3.24 Million (Post-Crash Recovery)',
    changes: [
      { metric: 'ETH Holdings', previous: '3,032,188', new: '3,236,014', change: '+203,826 (+6.7%)' },
      { metric: 'ETH Price', previous: '$4,154', new: '$4,022', change: '-3.2%' },
      { metric: 'Total Holdings', previous: '$12.9B', new: '$13.4B', change: '+3.9%' },
      { metric: 'Moonshots', previous: '$135M', new: '$119M (OCTO)', change: '-12%' },
      { metric: 'Cash', previous: '$104M', new: '$219M', change: '+111%' },
      { metric: 'ETH Supply %', previous: '2.5%', new: '2.7%', change: '+0.2pp (>halfway)' },
      { metric: 'Trading Rank', previous: '#22', new: '#33', change: '-11' },
      { metric: 'MSTR Holdings', previous: '640,031 BTC', new: '640,250 BTC', change: '+219 BTC' },
    ],
    notes: 'Largest deleveraging event last week created price dislocation. ETH open interest = Jun 30 levels (ETH was $2,500). Attractive risk/reward. +203K ETH bought.',
    impact: 'positive'
  },
  {
    date: '2025-10-13',
    source: 'Press Release',
    category: 'Holdings',
    title: '📊 3M MILESTONE: ETH Holdings Exceed 3.03 Million + Oct Chairman Message',
    changes: [
      { metric: 'ETH Holdings', previous: '2,830,151', new: '3,032,188', change: '+202,037 (+7.1%)' },
      { metric: 'ETH Price', previous: '$4,535', new: '$4,154', change: '-8.4%' },
      { metric: 'Total Holdings', previous: '$13.4B', new: '$12.9B', change: '-3.7%' },
      { metric: 'Moonshots', previous: '$113M', new: '$135M (OCTO)', change: '+19%' },
      { metric: 'Cash', previous: '$456M', new: '$104M', change: '-77% (deployed)' },
      { metric: 'ETH Supply %', previous: '2.3%', new: '2.5%', change: '+0.2pp (halfway)' },
      { metric: 'Trading Rank', previous: '#28', new: '#22', change: '+6 (volatility)' },
      { metric: 'MSTR Holdings', previous: '640,031 BTC', new: '640,031 BTC', change: 'Unchanged' },
    ],
    notes: '⚠️ Oct 10 liquidation = LARGEST EVER single-day crypto deleveraging in history. BMNR bought aggressively (+202K ETH). Chairman keynote at Token2049 Singapore: "Ethereum Supercycle." $3.5B/day trading.',
    impact: 'positive'
  },
  {
    date: '2025-10-06',
    source: 'Press Release',
    category: 'Holdings',
    title: 'ETH Holdings Exceed 2.83 Million Tokens',
    changes: [
      { metric: 'ETH Holdings', previous: '2,650,900', new: '2,830,151', change: '+179,251 (+6.8%)' },
      { metric: 'ETH Price', previous: '$4,141', new: '$4,535', change: '+9.5%' },
      { metric: 'Total Holdings', previous: '$11.6B', new: '$13.4B', change: '+15.5%' },
      { metric: 'Moonshots', previous: '$157M', new: '$113M (OCTO)', change: '-28%' },
      { metric: 'Cash', previous: '$436M', new: '$456M', change: '+4.6%' },
      { metric: 'ETH Supply %', previous: '2.2%', new: '2.3%', change: '+0.1pp' },
      { metric: 'Trading Rank', previous: '#26', new: '#28', change: '-2' },
      { metric: 'MSTR Holdings', previous: '639,835 BTC', new: '640,031 BTC', change: '+196 BTC' },
    ],
    notes: 'Token2049 Singapore week. Met Ethereum core developers and ecosystem players. "Clear focus on enabling Wall Street and AI to build on ETH." AI + crypto = two Supercycle narratives.',
    impact: 'positive'
  },
  // === SEPTEMBER 2025 - RAPID GROWTH ===
  {
    date: '2025-09-29',
    source: 'Press Release',
    category: 'Holdings',
    title: 'ETH Holdings Exceed 2.65 Million Tokens',
    changes: [
      { metric: 'ETH Holdings', previous: '2,416,054', new: '2,650,900', change: '+234,846 (+9.7%)' },
      { metric: 'ETH Price', previous: '$4,497', new: '$4,141', change: '-7.9%' },
      { metric: 'Total Holdings', previous: '$11.4B', new: '$11.6B', change: '+1.8%' },
      { metric: 'Moonshots', previous: '$175M', new: '$157M (OCTO)', change: '-10%' },
      { metric: 'Cash', previous: '$345M', new: '$436M', change: '+26%' },
      { metric: 'ETH Supply %', previous: '2.0%', new: '2.2%', change: '+0.2pp' },
      { metric: 'Trading Rank', previous: '#24', new: '#26', change: '-2' },
      { metric: 'MSTR Holdings', previous: '638,460 BTC', new: '639,835 BTC', change: '+1,375 BTC' },
    ],
    notes: 'AI + crypto = two Supercycle narratives. Both require neutral public blockchains. ETH = premier choice (100% uptime, high reliability). "Price is discount to future."',
    impact: 'positive'
  },
  {
    date: '2025-09-22',
    source: 'Press Release',
    category: 'Holdings',
    title: '📊 2% MILESTONE: ETH Holdings Exceed 2.4 Million (2% of Supply)',
    changes: [
      { metric: 'ETH Holdings', previous: '2,151,676', new: '2,416,054', change: '+264,378 (+12.3%)' },
      { metric: 'ETH Price', previous: '$4,632', new: '$4,497', change: '-2.9%' },
      { metric: 'Total Holdings', previous: '$10.77B', new: '$11.4B', change: '+5.8%' },
      { metric: 'Moonshots', previous: '$214M', new: '$175M (OCTO)', change: '-18%' },
      { metric: 'Cash', previous: '$569M', new: '$345M', change: '-39% (deployed)' },
      { metric: 'ETH Supply %', previous: '1.8%', new: '2.0%', change: '+0.2pp' },
      { metric: 'Trading Rank', previous: '#28', new: '#24', change: '+4' },
      { metric: 'Stock Price', previous: 'N/A', new: '$61.29 (20-DMA)', change: 'Reference' },
    ],
    notes: '📈 At 1% ETH (Aug) stock was ~$38. At 2% stock >$61. "Power law benefits large holders." $3.5B/day trading volume.',
    impact: 'positive'
  },
  {
    date: '2025-09-22',
    source: '8-K Filing',
    category: 'Capital',
    title: '$365M Registered Direct Offering @ 14% Premium',
    changes: [
      { metric: 'Shares Sold', previous: 'N/A', new: '5,217,715', change: '@ $70.00' },
      { metric: 'Premium', previous: 'N/A', new: '14% to $61.29 close', change: 'Accretive' },
      { metric: 'Warrants Issued', previous: 'N/A', new: '10,435,430', change: '@ $87.50 exercise' },
      { metric: 'Gross Proceeds', previous: 'N/A', new: '$365.24M', change: 'For ETH' },
      { metric: 'Warrant Expiry', previous: 'N/A', new: 'Mar 22, 2027', change: '18 months' },
      { metric: 'Potential Total', previous: 'N/A', new: '$1.28B', change: 'If warrants exercised' },
      { metric: 'Placement Agent', previous: 'N/A', new: 'Moelis & Company', change: 'New' },
    ],
    notes: 'Sold at premium = "materially accretive to existing shareholders." Total potential $1.28B (common + warrant exercise). Institutional confidence in BMNR execution.',
    impact: 'positive'
  },
  {
    date: '2025-09-15',
    source: 'Press Release',
    category: 'Holdings',
    title: '📊 2M MILESTONE: ETH Holdings Exceed 2.15 Million',
    changes: [
      { metric: 'ETH Holdings', previous: '2,069,443', new: '2,151,676', change: '+82,233 (+4.0%)' },
      { metric: 'ETH Price', previous: '$4,312', new: '$4,632', change: '+7.4%' },
      { metric: 'Total Holdings', previous: '$9.2B', new: '$10.77B', change: '+17.1%' },
      { metric: 'Cash', previous: '$266M', new: '$569M', change: '+114%' },
      { metric: 'Moonshots', previous: '$20M', new: '$214M (Eightco/OCTO)', change: '+970%' },
      { metric: 'Trading Rank', previous: '#30', new: '#28', change: '+2' },
      { metric: 'MSTR Holdings', previous: '636,505 BTC', new: '638,460 BTC', change: '+1,955 BTC' },
    ],
    notes: 'Nearly $11B in total holdings incl moonshots. Surpassed 2M ETH. "Power law benefits large holders." Tom Lee: "AI/agentic-AI creating token economy supercycle." #28 most traded stock ($2.0B/day).',
    impact: 'positive'
  },
  {
    date: '2025-09-08',
    source: 'Press Release',
    category: 'Holdings',
    title: '📊 2M MILESTONE: ETH Holdings Exceed 2.07 Million + First "Moonshot"',
    changes: [
      { metric: 'ETH Holdings', previous: '1,866,974', new: '2,069,443', change: '+202,469 (+10.8%)' },
      { metric: 'ETH Price', previous: '$4,458', new: '$4,312', change: '-3.3%' },
      { metric: 'Total Holdings', previous: '$8.98B', new: '$9.21B', change: '+2.6%' },
      { metric: 'Cash', previous: '$635M', new: '$266M', change: '-58% (deployed)' },
      { metric: 'Moonshot Investment', previous: '$0', new: '$20M (Eightco/OCTO)', change: 'First' },
      { metric: 'Trading Rank', previous: '#22', new: '#30', change: '-8' },
      { metric: 'MSTR Holdings', previous: '629,376 BTC', new: '636,505 BTC', change: 'Reference' },
    ],
    notes: 'Surpassed 2M ETH milestone. $20M into Eightco (OCTO) as first "Moonshot" - Worldcoin treasury strategy. 1% of balance sheet for ETH ecosystem investments. #30 most traded ($1.7B/day).',
    impact: 'positive'
  },
  {
    date: '2025-09-05',
    source: 'Press Release',
    category: 'Corporate',
    title: 'Statement on NYSE American Listing & Capital Markets Access',
    changes: [
      { metric: 'Listing Status', previous: 'NYSE American', new: 'Fully compliant', change: 'Confirmed' },
      { metric: 'ATM Program', previous: 'Active', new: 'No shareholder approval needed', change: 'Clarified' },
    ],
    notes: 'Response to media reports on NASDAQ crypto treasury scrutiny. BMNR on NYSE American, not affected. PIPE closed July 8 with NYSE approval. ATM continues without shareholder vote.',
    impact: 'neutral'
  },
  {
    date: '2025-09-02',
    source: 'Press Release',
    category: 'Holdings',
    title: 'August Chairman Message + Holdings Update (1.87M ETH)',
    changes: [
      { metric: 'ETH Holdings', previous: '1,713,899', new: '1,866,974', change: '+153,075 (+8.9%)' },
      { metric: 'ETH Price', previous: '$4,808', new: '$4,458', change: '-7.3%' },
      { metric: 'Total Holdings', previous: '$8.8B', new: '$8.98B', change: '+2%' },
      { metric: 'Cash', previous: '$562M', new: '$635M', change: '+13%' },
    ],
    notes: 'August Chairman Message discusses 1971 Bretton Woods parallel. GENIUS Act + SEC Project Crypto = "multi-decade opportunity for ETH." #22 most traded stock ($2.3B/day).',
    impact: 'positive'
  },
  {
    date: '2025-09-01',
    source: '8-K Filing',
    category: 'Corporate',
    title: 'Executive Employment Agreements',
    changes: [
      { metric: 'CEO Bates Comp', previous: 'N/A', new: '$3,037,000/yr', change: 'Formalized' },
      { metric: 'CFO Mow Comp', previous: 'N/A', new: '$1,023,750/yr', change: 'Formalized' },
      { metric: 'President Nelson Comp', previous: 'N/A', new: '$406,250/yr', change: 'Formalized' },
    ],
    notes: 'Formal employment agreements. CEO severance: $3.04M (2 years cash) if terminated without cause.',
    impact: 'neutral'
  },
  // === AUGUST 2025 - EXPLOSIVE GROWTH ===
  {
    date: '2025-08-28',
    source: 'Press Release',
    category: 'Corporate',
    title: 'David Sharbutt Joins Board - Digital Infrastructure Vision',
    changes: [
      { metric: 'ETH Holdings', previous: '1,713,899', new: '1,792,690', change: '+78,791' },
      { metric: 'ETH Price', previous: '$4,808', new: '$4,591', change: '-4.5%' },
      { metric: 'Total Holdings', previous: '$8.8B', new: '$9.0B+', change: '+2.3%' },
      { metric: 'Cash', previous: '$562M', new: '$775M', change: '+38%' },
      { metric: 'New Director', previous: 'N/A', new: 'David E. Sharbutt', change: 'American Tower veteran' },
    ],
    notes: 'Sharbutt: 17 years on AMT board (2006-2023), founder/CEO Alamosa Holdings (sold to Sprint 2006). Tom Lee: "ETH Treasuries = digital infrastructure like wireless towers." AMT expanded 6X to 30X EV/EBITDA 2003-2020.',
    impact: 'positive'
  },
  {
    date: '2025-08-25',
    source: 'Press Release',
    category: 'Holdings',
    title: 'ETH Holdings Reach 1.71 Million (#1 ETH Treasury)',
    changes: [
      { metric: 'ETH Holdings', previous: '1,523,373', new: '1,713,899', change: '+190,526 (+12.5%)' },
      { metric: 'ETH Price', previous: '$4,326', new: '$4,808', change: '+11.1%' },
      { metric: 'Total Holdings', previous: '$6.6B', new: '$8.8B', change: '+33%' },
      { metric: 'Cash', previous: '$80M', new: '$562M', change: '+602%' },
      { metric: 'NAV/Share', previous: '$22.84 (Jul 27)', new: '$39.84', change: '+74%' },
    ],
    notes: 'Second consecutive week raising $2B+. #20 most traded US stock ($2.8B/day). NAV/share nearly doubled in 4 weeks.',
    impact: 'positive'
  },
  {
    date: '2025-08-25',
    source: '8-K Filing',
    category: 'Corporate',
    title: 'Director Appointment: David E. Sharbutt (8-K)',
    changes: [
      { metric: 'Board Size', previous: '5', new: '6', change: '+1' },
      { metric: 'New Director', previous: 'N/A', new: 'David E. Sharbutt', change: 'Independent' },
    ],
    notes: 'SEC filing formalizing Sharbutt appointment. BS EE Texas Tech 1971.',
    impact: 'positive'
  },
  {
    date: '2025-08-18',
    source: 'Press Release',
    category: 'Holdings',
    title: 'ETH Holdings Exceed 1.52 Million - #1 ETH, #2 Global Treasury',
    changes: [
      { metric: 'ETH Holdings', previous: '1,150,263', new: '1,523,373', change: '+373,110 (+32%)' },
      { metric: 'ETH Price', previous: '$4,311', new: '$4,326', change: '+0.3%' },
      { metric: 'Total Holdings', previous: '$5.0B', new: '$6.6B', change: '+32%' },
      { metric: 'Trading Rank', previous: '#25', new: '#10', change: '+15' },
    ],
    notes: 'Now #1 ETH treasury and #2 global crypto treasury (behind only MSTR). #10 most liquid US stock at $6.4B/day.',
    impact: 'positive'
  },
  {
    date: '2025-08-12',
    source: '424B5 Filing',
    category: 'SEC Filing',
    title: 'ATM Expansion to $24.5 Billion Total',
    changes: [
      { metric: 'ATM Capacity', previous: '$4.5B', new: '$24.5B', change: '+$20B' },
      { metric: 'Prior ATM Used', previous: 'N/A', new: '$4.5B (99.99%)', change: 'Exhausted' },
    ],
    notes: 'Prior $4.5B ATM exhausted in 5 weeks. Massive $20B expansion via 424B5 prospectus supplement.',
    impact: 'positive'
  },
  {
    date: '2025-08-11',
    source: 'Press Release',
    category: 'Holdings',
    title: '📊 1M MILESTONE: ETH Holdings Exceed 1.15 Million',
    changes: [
      { metric: 'ETH Holdings', previous: '833,137', new: '1,150,263', change: '+317,126 (+38%)' },
      { metric: 'ETH Price', previous: '$3,492', new: '$4,311', change: '+23%' },
      { metric: 'Total Holdings', previous: '$2.9B', new: '$5.0B', change: '+72%' },
      { metric: 'Weekly Increase', previous: 'N/A', new: '+$2.0B', change: 'Largest ever' },
    ],
    notes: 'Passed 1M ETH and became world largest ETH treasury in just 5 weeks. #25 most liquid US stock ($2.2B/day).',
    impact: 'positive'
  },
  {
    date: '2025-08-04',
    source: 'Press Release',
    category: 'Holdings',
    title: 'ETH Holdings Exceed 833K - Largest ETH Treasury',
    changes: [
      { metric: 'ETH Holdings', previous: '~0', new: '833,137', change: 'From zero in 35 days' },
      { metric: 'ETH Price', previous: 'N/A', new: '$3,492', change: 'Reference' },
      { metric: 'Total Holdings', previous: 'N/A', new: '$2.9B', change: '#3 crypto treasury' },
      { metric: 'Bill Miller III', previous: 'N/A', new: 'Top investor', change: 'Confirmed' },
    ],
    notes: 'Lightning speed: 833K ETH from zero in 35 days. #3 largest crypto treasury (behind MSTR, MARA). Bill Miller III joins as major investor.',
    impact: 'positive'
  },
  // === JULY 2025 - ETH PIVOT + FOUNDATION ===
  {
    date: '2025-07-29',
    source: 'Press Release',
    category: 'Capital',
    title: '$1 Billion Stock Repurchase Program Announced',
    changes: [
      { metric: 'Buyback Auth', previous: '$0', new: '$1.0B', change: 'Board approved' },
      { metric: 'ETH Holdings', previous: '566,776', new: '625,000', change: '+58,224' },
      { metric: 'ETH Price', previous: '$3,644', new: '$3,755', change: '+3.0%' },
      { metric: 'Cash', previous: 'N/A', new: '$401.4M', change: 'Unencumbered' },
      { metric: 'BTC Holdings', previous: '154', new: '192', change: '+38 BTC' },
      { metric: 'NAV/Share', previous: 'N/A', new: '$22.76', change: 'First reported' },
      { metric: 'Fully Diluted Shares', previous: 'N/A', new: '121,739,533', change: 'Reference' },
    ],
    notes: 'Open-ended buyback program. Tom Lee: "Best expected return may be to acquire our own shares." Total crypto+cash: $2.77B. First BTC update since June.',
    impact: 'positive'
  },
  {
    date: '2025-07-28',
    source: 'Press Release',
    category: 'Corporate',
    title: 'Launch of "Alchemy of 5%" Investor Presentation + Chairman Message Series',
    changes: [
      { metric: 'New Content', previous: 'None', new: 'Investor deck + video series', change: 'Launched' },
      { metric: 'Strategy Explained', previous: 'N/A', new: '"Alchemy of 5%"', change: 'Public' },
    ],
    notes: 'Tom Lee launches monthly "Chairman\'s Message" video series. Investor presentation titled "The Alchemy of 5%" explains ETH treasury strategy.',
    impact: 'positive'
  },
  {
    date: '2025-07-28',
    source: '8-K + S-3ASR Filing',
    category: 'Capital',
    title: 'ATM Expansion to $4.5B + PIPE Resale Registration',
    changes: [
      { metric: 'ATM Capacity', previous: '$2.0B', new: '$4.5B', change: '+$2.5B' },
      { metric: 'PIPE Shares Registered', previous: '0', new: '56.12M', change: 'Resale' },
      { metric: 'Pre-Funded Warrants', previous: '0', new: '11.0M @ $0.0001', change: 'Registered' },
    ],
    notes: 'Cantor as buyback broker @ $0.02/share. PIPE resale registration for June offering investors. Strategic advisor warrants: 3.19M @ $5.40.',
    impact: 'positive'
  },
  {
    date: '2025-07-24',
    source: 'Press Release',
    category: 'Holdings',
    title: 'ETH Holdings Exceed $2 Billion (566K ETH)',
    changes: [
      { metric: 'ETH Holdings', previous: '300,657', new: '566,776', change: '+88% in 1 week' },
      { metric: 'ETH Price', previous: '$3,462', new: '$3,644', change: '+5.3%' },
      { metric: 'Total Holdings', previous: '$1.0B', new: '$2.0B+', change: '+100%' },
      { metric: 'Days Since PIPE', previous: 'N/A', new: '16 days', change: 'From $250M' },
    ],
    notes: 'Surpassed $2B ETH in 16 days after $250M PIPE. 700%+ increase from initial proceeds. On track for 5% goal.',
    impact: 'positive'
  },
  {
    date: '2025-07-23',
    source: 'Press Release',
    category: 'Corporate',
    title: 'Options Trading Commences on NYSE',
    changes: [
      { metric: 'Options Trading', previous: 'None', new: 'LIVE on NYSE', change: 'New listing' },
      { metric: 'Ticker', previous: 'N/A', new: 'BMNR options', change: 'Active' },
    ],
    notes: 'BMNR options now available on NYSE via OCC. Expands investor access, enhances liquidity, provides hedging tools.',
    impact: 'positive'
  },
  {
    date: '2025-07-22',
    source: 'Press Release',
    category: 'Capital',
    title: '🏆 ARK Invest Acquires $182M of BMNR Shares',
    changes: [
      { metric: 'ARK Investment', previous: '$0', new: '$182M (4.77M shares)', change: 'Major investor' },
      { metric: 'Net Proceeds', previous: 'N/A', new: '$177M for ETH', change: '100% to crypto' },
      { metric: 'Investor Base', previous: 'VCs + institutions', new: '+ Cathie Wood/ARK', change: 'Expanded' },
    ],
    notes: 'Cathie Wood\'s ARK Invest takes substantial stake via ATM block trade. Tom Lee: "Cathie is a pioneer of exponential investing." 100% of proceeds to ETH.',
    impact: 'positive'
  },
  {
    date: '2025-07-17',
    source: 'Press Release',
    category: 'Holdings',
    title: '📊 $1B MILESTONE: ETH Holdings Exceed $1 Billion',
    changes: [
      { metric: 'ETH Holdings', previous: '163,142', new: '300,657', change: '+84% in 3 days' },
      { metric: 'ETH Price', previous: '$3,073', new: '$3,462', change: '+12.7%' },
      { metric: 'Total Holdings', previous: '$500M', new: '$1.0B+', change: '+100%' },
      { metric: 'Days Since PIPE', previous: 'N/A', new: '7 days', change: 'From $250M' },
      { metric: 'ETH via Options', previous: 'N/A', new: '60,000 ETH (~$200M)', change: 'Backed by cash' },
    ],
    notes: 'Surpassed $1B ETH in just 7 days after $250M PIPE close. 60K ETH held via in-the-money options, backed 1:1 with ~$200M cash.',
    impact: 'positive'
  },
  {
    date: '2025-07-14',
    source: 'Press Release',
    category: 'Holdings',
    title: 'ETH Holdings Exceed $500 Million (163K ETH)',
    changes: [
      { metric: 'ETH Holdings', previous: '~0', new: '163,142', change: 'Rapid accumulation' },
      { metric: 'ETH Price', previous: 'N/A', new: '$3,073', change: 'Reference' },
      { metric: 'Total Holdings', previous: '$250M PIPE', new: '$500M+', change: '+100%' },
      { metric: 'Days Since PIPE', previous: 'N/A', new: '3 days', change: 'From close' },
    ],
    notes: 'Doubled PIPE proceeds in 3 days. Tom Lee: "Reflexive benefit of acquiring large holdings." CEO Bates: "Wall Street is getting ETH-pilled."',
    impact: 'positive'
  },
  {
    date: '2025-07-09',
    source: 'Press Release + 8-K',
    category: 'Capital',
    title: '$250M PIPE Closes - ETH Treasury Strategy Begins',
    changes: [
      { metric: 'PIPE Proceeds', previous: '$0', new: '$250M', change: 'Closed' },
      { metric: 'Primary Treasury Asset', previous: 'BTC', new: 'ETH', change: 'PIVOT' },
      { metric: 'Lead Investor', previous: 'N/A', new: 'MOZAYYX', change: 'New' },
      { metric: 'Other Investors', previous: 'N/A', new: 'Founders Fund, Pantera, Kraken, Galaxy, DCG', change: 'Top-tier' },
    ],
    notes: 'Official ETH treasury launch. MOZAYYX led with Founders Fund, Pantera, FalconX, Republic, Kraken, Galaxy, DCG, and Tom Lee. "Foundational step in ETH strategy."',
    impact: 'positive'
  },
  {
    date: '2025-07-09',
    source: '8-K + S-3ASR Filing',
    category: 'SEC Filing',
    title: '$2 Billion ATM Program Launch',
    changes: [
      { metric: 'ATM Program', previous: 'None', new: '$2.0B', change: 'New' },
      { metric: 'Sales Agents', previous: 'N/A', new: 'Cantor + ThinkEquity', change: 'Appointed' },
      { metric: 'Commission Rate', previous: 'N/A', new: '3.0%', change: 'New' },
      { metric: 'Registration', previous: 'N/A', new: '333-288579', change: 'Filed' },
    ],
    notes: 'Controlled Equity Offering Sales Agreement. Automatic shelf (WKSI status) enables rapid capital deployment.',
    impact: 'positive'
  },
  {
    date: '2025-07-08',
    source: '8-K Filing',
    category: 'Corporate',
    title: 'Ethereum Tower Consulting Agreement',
    changes: [
      { metric: 'Treasury Advisor', previous: 'None', new: 'Ethereum Tower LLC', change: '10-year term' },
      { metric: 'Strategic Advisor', previous: 'None', new: 'Ethereum Tower Instant', change: '6-month term' },
      { metric: 'Advisor Fee', previous: 'N/A', new: '1% to $1B, 0.5% $1-5B, 0.25% >$5B', change: 'AUM-based' },
      { metric: 'Advisor Warrants', previous: 'N/A', new: '5% fully diluted @ $5.40', change: '5-year term' },
    ],
    notes: 'ETH Treasury Strategy consulting agreement. Focus on maximizing ETH accumulation and value accretion.',
    impact: 'positive'
  },
  {
    date: '2025-07-02',
    source: '8-K Filing',
    category: 'Capital',
    title: 'IPO Overallotment Exercised',
    changes: [
      { metric: 'Shares Issued', previous: '2,250,000 (IPO)', new: '+337,500', change: '+15%' },
      { metric: 'Price', previous: '$8.00 public', new: '$7.40 to underwriter', change: '92.5%' },
      { metric: 'Gross Proceeds', previous: '$18M', new: '+$2.7M', change: 'Additional' },
    ],
    notes: 'ThinkEquity fully exercised 45-day overallotment option from June 6 offering.',
    impact: 'positive'
  },
  {
    date: '2025-06-30',
    source: '8-K Filing',
    category: 'Capital',
    title: '🚀 FIRST ETH PIVOT - Private Placement',
    changes: [
      { metric: 'Cash Offering Shares', previous: '0', new: '36,309,592', change: '@ $4.50' },
      { metric: 'Pre-Funded Warrants', previous: '0', new: '11,006,444', change: '@ $4.4999' },
      { metric: 'Crypto Offering Shares', previous: '0', new: '8,804,122', change: '@ $4.50 (ETH/BTC)' },
      { metric: 'Use of Proceeds', previous: 'BTC Mining', new: 'ETH Treasury', change: 'PIVOT' },
    ],
    notes: 'WATERSHED EVENT: Birth of BMNR as ETH treasury company. 20% for staking/DeFi, 5% for validator tech.',
    impact: 'positive'
  },
  // === JUNE 2025 - PRE-PIVOT FOUNDATION ===
  {
    date: '2025-06-17',
    source: 'Press Release',
    category: 'Holdings',
    title: 'BTC Treasury Complete: 154.167 BTC Purchased',
    changes: [
      { metric: 'BTC Holdings', previous: '100', new: '154.167', change: '+54.167' },
      { metric: 'Total BTC Spent', previous: 'N/A', new: '$16.347M', change: 'Complete' },
      { metric: 'Avg Price/BTC', previous: 'N/A', new: '$106,033', change: 'Reference' },
      { metric: 'IPO Proceeds Used', previous: '$16.34M', new: '100%', change: 'Deployed' },
    ],
    notes: 'Completed BTC purchases from June 6 IPO. 100% of proceeds invested as committed. Final BTC treasury before ETH pivot.',
    impact: 'positive'
  },
  {
    date: '2025-06-09',
    source: 'Press Release',
    category: 'Holdings',
    title: 'First BTC Purchase: 100 Bitcoin Acquired',
    changes: [
      { metric: 'BTC Holdings', previous: '0', new: '100', change: 'First purchase' },
      { metric: 'Source', previous: 'N/A', new: 'IPO proceeds', change: 'Open market' },
    ],
    notes: 'First open market BTC purchase from June 6 offering. CEO: "Excited to establish our Bitcoin Treasury." Pre-ETH pivot.',
    impact: 'positive'
  },
  {
    date: '2025-06-06',
    source: '8-K Filing',
    category: 'Capital',
    title: 'Public Offering Closes (NYSE Uplisting)',
    changes: [
      { metric: 'Shares Issued', previous: '~2.5M', new: '+2,250,000', change: 'IPO' },
      { metric: 'Price', previous: 'N/A', new: '$8.00', change: 'Public offering' },
      { metric: 'Proceeds', previous: 'N/A', new: '~$18M', change: 'New capital' },
    ],
    notes: 'Concurrent with NYSE American uplisting. First major capital raise enabling ETH pivot.',
    impact: 'positive'
  },
  {
    date: '2025-06-05',
    source: '8-K Filing',
    category: 'Corporate',
    title: 'NYSE American Trading Commences',
    changes: [
      { metric: 'Exchange', previous: 'OTCQX', new: 'NYSE American', change: 'Uplisting' },
      { metric: 'Last OTCQX Day', previous: 'N/A', new: 'June 4, 2025', change: 'Final' },
    ],
    notes: 'Major milestone enabling institutional access and ATM programs.',
    impact: 'positive'
  },
  {
    date: '2025-06-02',
    source: '8-K Filing',
    category: 'Corporate',
    title: 'NYSE American Listing Approved',
    changes: [
      { metric: 'Listing Status', previous: 'Pending', new: 'Approved', change: 'Confirmed' },
      { metric: 'Expected Start', previous: 'N/A', new: '~June 5, 2025', change: 'Announced' },
    ],
    notes: 'Press release announcing NYSE American approval. CEO: Jonathan Bates.',
    impact: 'positive'
  },
  {
    date: '2025-06-01',
    source: '10-K Filing Reference',
    category: 'Corporate',
    title: 'Thomas J. Lee Appointed Chairman',
    changes: [
      { metric: 'Chairman', previous: 'Jonathan Bates', new: 'Thomas J. Lee', change: 'New' },
      { metric: 'Strategic Focus', previous: 'BTC Mining', new: 'ETH Treasury', change: 'Aligned' },
    ],
    notes: 'Tom Lee (Fundstrat co-founder) appointed Chairman. Leadership aligned with ETH treasury vision.',
    impact: 'positive'
  },
];
