import type { InvestmentCurrent, ArchiveEntry } from '@/lib/investmentTypes';

export const ASTS_INVESTMENT_CURRENT: InvestmentCurrent = {
    date: '2026-03-03',
    source: 'FY2025 10-K (March 2, 2026)',
    verdict: 'STRONG BUY',
    verdictColor: 'mint',
    tagline: "Revenue Inflection Confirmed. Scaling to $1B.",

    // Investment Scorecard — Unified 8-category framework (matches BMNR/CRCL)
    scorecard: [
      { category: 'Financial Strength', rating: 'A+', color: 'var(--mint)', detail: '$2,780M cash, fully funded for ~90 sat constellation' },
      { category: 'Profitability', rating: 'B-', color: 'var(--sky)', detail: 'FY2025 rev $70.9M (Q4 $54.3M +268% seq). 2026 guide $150-200M. 2027 target $1B' },
      { category: 'Growth', rating: 'A+', color: 'var(--mint)', detail: '$1.2B RPO backlog, 6 definitive MNOs, 57 MOUs, 2026 rev 2-3x YoY' },
      { category: 'Valuation', rating: 'B+', color: 'var(--sky)', detail: 'EV/2027E Rev ~30x on $1B target. Rich but justified by growth trajectory' },
      { category: 'Competitive Position', rating: 'A', color: 'var(--mint)', detail: '3,000+ patents, 105 MHz licensed spectrum, 4yr lead, 95% vertical integration' },
      { category: 'Execution', rating: 'A', color: 'var(--mint)', detail: 'BB1-6 operational, 28 sat microns complete, 6/month production, $1B+ capex deployed' },
      { category: 'Regulatory/External', rating: 'B+', color: 'var(--sky)', detail: 'FCC STA granted TX/WA gateways, 3 more pending. International expanding post-MWC' },
      { category: 'Capital Structure', rating: 'B', color: 'var(--sky)', detail: '$2,264M debt ($1.625B converts + $420M UBS + $69M secured). Interest income $49M > expense $36M' },
    ],

    // Executive Summary — Unified schema (matches BMNR/CRCL)
    executiveSummary: {
      headline: "Revenue Inflection Confirmed. Scaling to $1B.",
      thesis: "The 10-K closes the book on FY2025: $70.9M revenue (Q4 alone $54.3M, +268% sequentially), $2,780M cash, fully funded for ~90 satellites, and $1.2B RPO backlog. This is no longer a pre-revenue story — it's a revenue-scaling infrastructure play with 2026 guidance of $150-200M and a 2027 target of $1B. The question has shifted from 'will they survive?' to 'how fast does revenue compound?'",
      bottomLine: "Upgrade to Strong Buy. Fully funded constellation, proven revenue ramp, $1B 2027 target. Risk/reward is the best it's been since Block 1 launch.",
      whatsNew: [
        'FY2025 audited: Rev $70.9M, Q4 $54.3M (+268% seq), Net Loss -$461M',
        '$2,780M cash — fully funded for ~90 satellite constellation',
        '$1.2B RPO backlog (9% = ~$108M in next 12 months)',
        '2026 guidance $150-200M, 2027 target $1B revenue',
        '57 MOUs post-MWC 2026 (8 new: Orange, Telefonica, CK Hutchison, etc.)',
        '28 satellite microns completed, BB7 launch imminent (March 2026)',
      ],
    },

    // Growth Drivers
    growthDrivers: [
      { driver: 'Constellation Buildout', impact: 'Critical', description: '28 microns complete, 6 sats/month production. BB7 launching March 2026. ~25 sats needed for beta trials (late summer 2026). $1.06B PPE capex deployed in FY2025 alone.', color: 'var(--mint)' },
      { driver: 'Revenue Ramp', impact: 'Critical', description: 'Q4 rev $54.3M (+268% seq). 2026 guidance $150-200M. 2027 target $1B. RPO $1.2B with $108M due in next 12 months. Products margin ~26%, Services margin ~92%.', color: 'var(--mint)' },
      { driver: 'MNO Partnerships', impact: 'High', description: '6 definitive agreements, 57 MOUs post-MWC 2026. 8 new partners added at MWC (Orange, Telefonica, CK Hutchison, Sunrise, etc.). 3.2B+ addressable subs.', color: 'var(--mint)' },
      { driver: 'Government & Defense', impact: 'High', description: 'MDA SHIELD prime (Jan 2026). SDA, DIU, NSF contracts. Defense sees strategic value in dual-use LEO constellation. Diversifies revenue beyond MNO.', color: 'var(--sky)' },
    ],

    // Competitive Moat
    moatSources: [
      { source: 'Spectrum Holdings', strength: 'Strong', detail: 'More licensed spectrum than any competitor. L-Band and S-Band secured.', color: 'var(--mint)' },
      { source: 'Patent Portfolio', strength: 'Strong', detail: '3,000+ patents protecting core technology. Defensible IP position.', color: 'var(--mint)' },
      { source: 'Manufacturing Scale', strength: 'Strong', detail: '95% vertical integration, 6 sats/month capacity. Hard to replicate.', color: 'var(--mint)' },
      { source: 'Technology Lead', strength: 'Strong', detail: 'Custom ASIC, 4+ year head start. Proven at commercial scale.', color: 'var(--mint)' },
      { source: 'Carrier Relationships', strength: 'Building', detail: 'Exclusive deals with major MNOs. Network effects growing.', color: 'var(--sky)' },
    ],
    moatThreats: [
      { threat: 'Starlink/T-Mobile', risk: 'High', detail: 'Expanding beyond messaging. Musk has resources and execution ability.', color: 'var(--coral)' },
      { threat: 'Lynk Global', risk: 'Medium', detail: 'Pursuing similar D2D approach. Less capitalized but moving fast.', color: 'var(--gold)' },
      { threat: 'Apple/Globalstar', risk: 'Medium', detail: 'Emergency SOS expanding. Could evolve to broader services.', color: 'var(--gold)' },
      { threat: 'Skylo', risk: 'Low', detail: 'NB-IoT focused, different market segment.', color: 'var(--mint)' },
    ],

    // Risk Matrix
    risks: [
      { risk: 'Launch Failure', severity: 'Critical', likelihood: 'Low', impact: 'Severe', detail: 'With 28 microns complete and BB7+ launches accelerating, a catastrophic failure destroys hundreds of millions in hardware and delays the 25-sat beta threshold. SpaceX track record is strong but space is unforgiving.', mitigation: 'Multiple launch providers (SpaceX, ISRO), insurance coverage, phased deployment. 28 microns already built provides hardware redundancy.' },
      { risk: 'Revenue Miss vs Guidance', severity: 'High', likelihood: 'Low-Medium', impact: 'Severe', detail: '2026 guidance is $150-200M and 2027 target is $1B. Missing guidance would compress multiples severely given $32B EV. Q4 $54.3M run rate annualizes to ~$217M, providing some cushion.', mitigation: '$1.2B RPO backlog with $108M due in 12 months. Diversified MNO + government revenue streams. Services margin at 92%.' },
      { risk: 'Manufacturing Bottleneck', severity: 'High', likelihood: 'Medium', impact: 'High', detail: 'Need to sustain 6 sats/month to hit 25-sat beta by late summer 2026 and ~60 sats by year-end. Supply chain issues could delay continuous coverage timeline.', mitigation: '95% vertical integration, 28 microns already complete, Texas + global facilities (~450K sqft). $1B+ capex deployed in FY2025 proves manufacturing scale.' },
      { risk: 'Debt Load', severity: 'Medium', likelihood: 'Medium', impact: 'Moderate', detail: '$2,264M total debt ($1.625B converts at $80-$180+ strikes, $420M UBS, $69M secured). Net interest positive ($49M income vs $36M expense) but converts create dilution overhang as stock rises above strike prices.', mitigation: '$2,780M cash provides massive cushion. Interest income exceeds interest expense. Path to cash flow positive by 2027. No near-term maturities requiring refinancing.' },
      { risk: 'Competitive Response', severity: 'Medium', likelihood: 'Medium', impact: 'Moderate', detail: 'Starlink/T-Mobile expanding beyond messaging to voice/data. Apple/Globalstar evolving. But ASTS works with existing phones via MNO partnerships — fundamentally different model.', mitigation: '105 MHz licensed spectrum, 3,000+ patents, 4+ year technology lead, 6 carrier exclusives. MNO alignment vs Starlink competition with carriers.' },
      { risk: 'Regulatory Delays', severity: 'Medium', likelihood: 'Low-Medium', impact: 'Moderate', detail: 'FCC STA granted for TX/WA gateways, 3 more pending. International spectrum coordination ongoing. Aviation interference concerns still being addressed.', mitigation: 'Proactive FCC engagement, STA progress, experienced spectrum team, MWC 2026 momentum with 8 new MNO partners.' },
    ],

    // Three Perspectives — Unified schema (matches BMNR/CRCL)
    perspectives: {
      cfa: {
        title: 'CFA Analyst',
        assessment: 'STRONG BUY — REVENUE INFLECTION',
        color: 'var(--mint)',
        summary: 'Revenue-stage infrastructure company with audited FY2025 results ($70.9M, Q4 $54.3M). Fortress balance sheet ($2,780M cash, net interest positive). $1.2B RPO backlog and 2026 guidance of $150-200M provide visibility. Upgrade from Constructive — the 10-K confirms the revenue inflection thesis.',
        ecosystemView: 'LEO D2D market entering commercialization phase. ASTS first to demonstrate revenue at scale ($54.3M Q4). 5B people lack reliable coverage. MNO economics strongly favor wholesale model. $1B 2027 revenue target, if achieved, reprices the entire sector.',
        recommendation: 'Allocate 3-5% of growth portfolio. Core position, not a trade. Rebalance on 25%+ moves.',
      },
      hedgeFund: {
        title: 'Hedge Fund PM',
        assessment: 'HIGH CONVICTION LONG — ADD',
        color: 'var(--mint)',
        summary: 'Revenue inflection confirmed by audited 10-K. Catalyst calendar stacked: BB7+ launches monthly, 25-sat beta (summer 2026), Q1 2026 earnings. Stock consolidating at $87 — next leg up on beta service confirmation. Converts create defined support levels.',
        ecosystemView: 'Starlink/T-Mobile validates D2D market but different model (new terminals vs existing phones). $1.2B RPO is real contracted revenue, not projections. Convert strikes at $80-$180+ create structured flows. Short interest provides squeeze fuel on positive catalysts.',
        recommendation: 'Size 4-6% of book. Add on pullbacks to $75 (200-day area). Trim at $120+ if no new catalysts.',
      },
      cio: {
        title: 'Family Office CIO',
        assessment: 'CORE INFRASTRUCTURE POSITION',
        color: 'var(--mint)',
        summary: 'No longer venture-style speculation — this is an infrastructure play with $70.9M audited revenue, $2.8B cash, and $1.2B backlog. AT&T, Verizon, Vodafone, Google backing validates the thesis. Multi-year compounder if $1B 2027 target tracks.',
        ecosystemView: 'Telecom infrastructure is a multi-decade investment theme. ASTS now has audited revenue, contracted backlog, and 6 carrier partnerships. Defense diversification (SHIELD, SDA) adds strategic value. Comparable to early cell tower REIT investments when towers were being built.',
        recommendation: '3-5% portfolio weight. Core hold for 3-5 year thesis. Add on any 25%+ pullback.',
      },
      technicalAnalyst: {
        title: 'Technical Analyst',
        assessment: 'BULLISH — CONSOLIDATION BASE',
        color: 'var(--mint)',
        summary: 'Stock trading at $87, consolidating after the run from $25 (Block 1 launch) through $100+ (convert-driven highs). Holding above 50-day SMA. Volume profile constructive with institutional accumulation. RSI neutral, providing runway for next catalyst-driven move.',
        ecosystemView: 'Key technical levels: Support zone at $70-75 (200-day SMA, prior breakout). Resistance at $100-105 (Feb convert highs). MACD neutral on weekly chart. Relative strength vs NASDAQ positive. Watch for breakout above $100 with volume >15M shares as confirmation of next leg.',
        recommendation: 'Accumulate at $75-85 range. Add on breakout above $100 with volume. Stop loss: weekly close below $65.',
      },
    },

    // Position Sizing
    positionSizing: {
      aggressive: { range: '4-6%', description: 'High-conviction growth portfolios' },
      growth: { range: '2-4%', description: 'Growth-oriented with tech exposure' },
      balanced: { range: '1-2%', description: 'Diversified portfolios seeking asymmetry' },
      conservative: { range: '0-1%', description: 'Risk-averse (speculative allocation only)' },
    },

    // Price Targets
    priceTargets: [
      { period: '0-6 months', range: '$75-120', outlook: 'Constructive', detail: 'BB7+ launches, 25-sat beta threshold, Q1 2026 earnings. ±25% swings on catalysts' },
      { period: '6-18 months', range: '$120-200', outlook: 'Bullish', detail: 'Beta service launch, revenue tracking toward $150-200M guide, continuous US coverage. Analyst upgrades' },
      { period: '18-36 months', range: '$200-350+', outlook: 'Very Bullish', detail: 'Full constellation, $1B revenue run rate, global coverage, potential $50B+ EV' },
    ],
};

export const ASTS_INVESTMENT_ARCHIVE: ArchiveEntry[] = [
    // ⬇️ ADD NEW ENTRIES HERE (most recent first) ⬇️
    {
      date: '2026-03-03',
      filing: 'FY2025 10-K',
      verdict: 'STRONG BUY',
      headline: 'Revenue Inflection Confirmed — Upgrade to Strong Buy',
      summary: 'Audited FY2025: Rev $70.9M (Q4 $54.3M, +268% seq), Net Loss -$461M. Cash $2,780M, fully funded for ~90 sats. $1.2B RPO backlog. 2026 guide $150-200M, 2027 target $1B. 28 microns complete. 57 MOUs post-MWC. The revenue inflection is real and accelerating.',
      keyDevelopments: ['FY2025 audited: Rev $70.9M, Q4 alone $54.3M (+268% sequential)', '$2,780M cash — fully funded for ~90 satellite constellation', '$1.2B RPO backlog ($108M due in 12 months)', '2026 guidance $150-200M, 2027 target $1B', '28 satellite microns completed, BB7 imminent', '8 new MNO partners at MWC 2026 (Orange, Telefonica, CK Hutchison, etc.)', 'Gross PPE $1,572M, Net PPE $1,399M — massive real asset base', 'NCI reduced to 23.9% from 30.1%, Class A now 292.6M shares'],
      whyItMatters: 'This 10-K transforms the thesis from "pre-revenue speculation" to "revenue-scaling infrastructure." Q4 $54.3M proves commercial traction. $2.8B cash eliminates funding risk. $1.2B backlog provides multi-year revenue visibility. The 2027 $1B target, if achieved, reprices the stock dramatically.',
      lookingAhead: 'BB7+ monthly launches toward 25-sat beta threshold (late summer 2026). Q1 2026 earnings for first post-10-K quarterly validation. Beta service launch is the next major catalyst — proves continuous coverage and unlocks full MNO ramp.',
    },
    {
      date: '2025-11-10',
      filing: 'Q3 2025 10-Q',
      verdict: 'CONSTRUCTIVE',
      headline: 'Inflection Point Reached',
      summary: 'Technology validated, commercial traction accelerating. The thesis has shifted from "will it work?" to "how fast can they scale?"',
      keyDevelopments: ['$1B+ contracted revenue milestone', 'BB6 launched successfully', 'Verizon definitive agreement signed', 'Vodafone SatCo JV announced'],
      whyItMatters: 'This quarter marks the transition from development company to commercial operator. Every major technology risk has been retired.',
      lookingAhead: 'Focus shifts entirely to execution: manufacturing cadence, launch reliability, and MNO integration timelines.',
    },
    {
      date: '2025-08-11',
      filing: 'Q2 2025 10-Q',
      verdict: 'CONSTRUCTIVE',
      headline: 'Strategic Groundwork Complete',
      summary: 'Spectrum secured, partnerships expanding. The company has assembled all the pieces needed for commercial success.',
      keyDevelopments: ['L-Band court approval ($550M spectrum asset)', '60 MHz S-Band acquisition closed', 'Vi India partnership announced', '8 government contracts total'],
      whyItMatters: 'Spectrum ownership creates an unassailable competitive moat. No other D2D player has comparable licensed spectrum holdings.',
      lookingAhead: 'H2 2025 revenue guidance of $50-75M becomes the key metric to watch. First real commercial revenue incoming.',
    },
    {
      date: '2025-05-12',
      filing: 'Q1 2025 10-Q',
      verdict: 'CONSTRUCTIVE',
      headline: 'Block 1 Proving Technology at Scale',
      summary: 'Revenue guidance set for the first time. The company is confident enough to give numbers.',
      keyDevelopments: ['H2 2025 revenue guidance: $50-75M', 'DIU contract expanded to $20M', '5 launches contracted for 2025', 'EXIM/IFC pipeline over $500M'],
      whyItMatters: 'First meaningful revenue guidance signals commercial readiness. Government contracts provide validation and diversification.',
      lookingAhead: 'Block 2 manufacturing ramp becomes critical. Need to hit 6 satellites/month sustained production.',
    },
    {
      date: '2025-03-03',
      filing: 'FY2024 10-K',
      verdict: 'CONSTRUCTIVE',
      headline: 'Transformational Year Complete',
      summary: 'Technology works. Upgrade from Neutral. The question is no longer IF but WHEN.',
      keyDevelopments: ['Block 1 fully operational', '$43M SDA government contract', 'ASIC validated at 10 GHz', 'Vodafone definitive signed', '$1B+ raised in 2024'],
      whyItMatters: 'Block 1 success proves the core technology at commercial scale. This de-risks the entire investment thesis.',
      lookingAhead: 'Constellation buildout is now a manufacturing and logistics challenge, not a technology challenge.',
    },
    {
      date: '2024-11-14',
      filing: 'Q3 2024 10-Q',
      verdict: 'NEUTRAL → CONSTRUCTIVE',
      headline: 'Block 1 Launch De-risks Thesis',
      summary: 'Six satellites in orbit, technology working as designed. The binary bet has paid off.',
      keyDevelopments: ['Block 1 launched September 12', 'Warrant redemption completed ($154M)', 'pLEO program expanded 14x to $13B', 'ISRO added as third launch provider'],
      whyItMatters: 'Successful launch eliminates the largest risk factor. Stock can now be valued on commercial potential, not just technology hope.',
      lookingAhead: 'Capital raise needed in 2025 to fund full constellation. Watch for terms and dilution.',
    },
    {
      date: '2024-08-14',
      filing: 'Q2 2024 10-Q',
      verdict: 'NEUTRAL',
      headline: 'Pre-Launch Tension',
      summary: 'Binary outcome ahead. Success means re-rate; failure means existential crisis.',
      keyDevelopments: ['AT&T definitive agreement signed', 'Verizon $100M commitment', 'FCC license granted', 'ASIC tape-out complete'],
      whyItMatters: 'All regulatory and partnership pieces in place. Everything rides on the September launch.',
      lookingAhead: 'This is the last chance to position before the binary event. Risk management critical.',
    },
    {
      date: '2024-04-01',
      filing: 'FY2023 10-K',
      verdict: 'CAUTIOUS → NEUTRAL',
      headline: 'Survived Near-Death Experience',
      summary: 'Capital secured just in time. The company lives to fight another day.',
      keyDevelopments: ['$100M equity raise at $3.10', '$110M strategic converts', '95% vertical integration achieved', 'BW3 proved 5G capability'],
      whyItMatters: 'The cash crisis is resolved. Management executed when the company was on the brink.',
      lookingAhead: 'Block 1 launch in 2024 becomes the singular focus. Technology must prove out at scale.',
    },
    {
      date: '2023-11-14',
      filing: 'Q3 2023 10-Q',
      verdict: 'CAUTIOUS',
      headline: 'Technology Works, Cash Critical',
      summary: 'BW3 proves 5G at 14 Mbps, but liquidity crisis looms. A race against time.',
      keyDevelopments: ['5G call achieved (14 Mbps)', 'Atlas debt closed ($48.5M)', 'Stock collapsed from $15 to $3', 'Only 3-4 quarters of runway'],
      whyItMatters: 'Technology validation is real, but the company may not survive to commercialize it without emergency capital.',
      lookingAhead: 'Must raise capital in Q1 2024 or face bankruptcy. Position for financing, not fundamentals.',
    },
    {
      date: '2023-08-14',
      filing: 'Q2 2023 10-Q',
      verdict: 'CAUTIOUS',
      headline: '4G Validated, Balance Sheet Stressed',
      summary: 'Technology milestones hit but cash burn unsustainable. Storm clouds gathering.',
      keyDevelopments: ['4G/LTE achieved (10+ Mbps)', '$59M equity raise completed', 'Atlas debt announced', '$176M cash, $48M/quarter burn'],
      whyItMatters: 'The technology works, but financial engineering required to survive. Debt signals desperation.',
      lookingAhead: 'Downgrade to Cautious. The next 12 months will determine survival.',
    },
    {
      date: '2023-05-15',
      filing: 'Q1 2023 10-Q',
      verdict: 'NEUTRAL',
      headline: 'Historic Voice Call Proves Concept',
      summary: 'First-ever D2D voice call from space. The technology is real.',
      keyDevelopments: ['First voice call April 25', 'Constellation reduced to ~90 satellites', 'BW3 operational', '$206M cash adequate near-term'],
      whyItMatters: 'Voice call proves the fundamental technology works. Constellation reduction is positive for economics.',
      lookingAhead: 'Need to secure Block 1 funding. Watch cash burn closely.',
    },
    {
      date: '2023-03-01',
      filing: 'FY2022 10-K',
      verdict: 'NEUTRAL',
      headline: 'BW3 Deployed, Testing Begins',
      summary: 'First full-scale test satellite in orbit. The experiment begins.',
      keyDevelopments: ['BW3 antenna deployed November 14', 'NanoAvionics sold for focus', '$75M equity raise completed', '$301M cash position'],
      whyItMatters: 'BW3 is the proving ground. Results over the next year will validate or invalidate the entire thesis.',
      lookingAhead: 'Maintain Neutral until test results prove commercial viability.',
    },
    {
      date: '2022-11-14',
      filing: 'Q3 2022 10-Q',
      verdict: 'NEUTRAL',
      headline: 'BW3 Launched. Pure Speculation.',
      summary: 'Satellite in orbit. Everything that follows is unprecedented.',
      keyDevelopments: ['BW3 launched September 10', 'Antenna deployment sequence begun', 'Nano sold for strategic focus', 'Pure technology speculation'],
      whyItMatters: 'This is ground zero. No one has done what ASTS is attempting. Success is not guaranteed.',
      lookingAhead: 'Wait for test results before increasing position. High risk, high uncertainty.',
    },
];
