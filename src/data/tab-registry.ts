// ============================================================================
// TAB REGISTRY — Single source of truth for per-ticker research tabs
// ============================================================================
// Stock components import from here instead of defining tabs inline.
// The codebase inventory builder also imports from here, so adding a tab
// here automatically updates the Prompt Auditor's runtime inventory.
// ============================================================================

export interface TabConfig {
  id: string;
  label: string;
  type: 'tracking' | 'projection';
  group?: string;
  /** What the thesis engineer should analyze in this tab. Tabs without a description are skipped in the deep-dive. */
  thesisScope?: string;
}

// ── ASTS ────────────────────────────────────────────────────────────────────
export const astsTabs: TabConfig[] = [
  { id: 'overview', label: 'Overview', type: 'tracking' },
  { id: 'partners', label: 'Partners', type: 'projection', group: 'ASTS Analysis', thesisScope: 'MNO partner pipeline — MoU-to-definitive conversion progress, revenue share terms, subscriber reach per partner, new partner announcements.' },
  { id: 'catalysts', label: 'Catalysts', type: 'projection', group: 'ASTS Analysis', thesisScope: 'Upcoming catalyst events — launch dates, regulatory milestones, partnership announcements. Ensure scenario timelines align with tracked catalyst dates.' },
  { id: 'constellation', label: 'Constellation', type: 'projection', group: 'ASTS Analysis', thesisScope: 'Satellite deployment status — in-orbit vs. planned count, Block 2/3 launch schedule, unfurling success rate, coverage footprint progress. Primary execution risk indicator.' },
  { id: 'subscribers', label: 'Subscribers', type: 'projection', group: 'ASTS Analysis', thesisScope: 'Subscriber projection models — TAM assumptions, penetration rates, ARPU estimates, MNO partner committed vs. projected subscribers. Primary revenue driver.' },
  { id: 'revenue', label: 'Revenue', type: 'projection', group: 'ASTS Analysis', thesisScope: 'Revenue projections — per-partner revenue share, prepayment schedules, revenue ramp assumptions tied to constellation deployment.' },
  { id: 'dilution', label: 'Dilution', type: 'projection', group: 'ASTS Analysis', thesisScope: 'Dilution waterfall — convertible note tranches, ATM utilization, fully diluted share count vs. basic. Assess if share count growth outpaces asset value growth.' },
  { id: 'model', label: 'Model', type: 'projection' },
  { id: 'monte-carlo', label: 'Monte Carlo', type: 'projection', thesisScope: 'Review probabilistic outcome distributions. Compare base/bear/bull case probabilities with your scenario analysis in Section B. Flag any divergence between Monte Carlo outputs and your qualitative assessment.' },
  { id: 'comps', label: 'Comps', type: 'projection', thesisScope: 'Cross-reference peer valuation multiples and relative positioning against your price/NAV targets.' },
  { id: 'capital', label: 'Capital', type: 'tracking' },
  { id: 'financials', label: 'Financials', type: 'tracking' },
  { id: 'timeline', label: 'Timeline', type: 'tracking', thesisScope: 'Review upcoming catalysts, product launches, regulatory dates, and earnings. Ensure your scenario timelines align with tracked catalyst dates.' },
  { id: 'investment', label: 'Investment', type: 'tracking' },
  { id: 'wall-street', label: 'Wall Street', type: 'tracking' },
  { id: 'sources', label: 'Sources', type: 'tracking', group: 'AI' },
  { id: 'edgar', label: 'EDGAR', type: 'tracking', group: 'AI' },
];

// ── BMNR ────────────────────────────────────────────────────────────────────
export const bmnrTabs: TabConfig[] = [
  { id: 'overview', label: 'Overview', type: 'tracking' },
  { id: 'ethereum', label: 'Ethereum', type: 'projection', group: 'BMNR Analysis', thesisScope: 'ETH treasury exposure — total holdings, market value, staked vs. unstaked split, protocol positioning, correlation risk to crypto markets.' },
  { id: 'staking', label: 'Staking', type: 'projection', group: 'BMNR Analysis', thesisScope: 'Staking economics — yield rates, locked capital duration, validator economics (MAVAN), staking revenue as % of total revenue. Assess if staked capital creates liquidity constraints.' },
  { id: 'dilution', label: 'Dilution', type: 'projection', group: 'BMNR Analysis', thesisScope: 'Dilution waterfall — ATM utilization, pre-funded warrants, authorized share expansion. Assess if dilution-to-NAV accretion ratio is favorable.' },
  { id: 'debt', label: 'Debt', type: 'projection', group: 'BMNR Analysis', thesisScope: 'Debt obligations and convertible instruments — maturity schedules, conversion terms, covenant compliance. Assess refinancing risk.' },
  { id: 'sensitivity', label: 'Sensitivity', type: 'projection', group: 'BMNR Analysis', thesisScope: 'ETH price sensitivity — NAV impact per $100 ETH move, break-even ETH price, downside scenario floor prices.' },
  { id: 'backtest', label: 'Backtest', type: 'projection', group: 'BMNR Analysis', thesisScope: 'Historical strategy backtesting — how would the accumulation strategy have performed under various crypto market regimes.' },
  { id: 'model', label: 'Model', type: 'projection' },
  { id: 'monte-carlo', label: 'Monte Carlo', type: 'projection', thesisScope: 'Review probabilistic outcome distributions. Compare base/bear/bull case probabilities with your scenario analysis in Section B. Flag any divergence between Monte Carlo outputs and your qualitative assessment.' },
  { id: 'comps', label: 'Comps', type: 'projection', thesisScope: 'Cross-reference peer valuation multiples and relative positioning against your price/NAV targets.' },
  { id: 'purchases', label: 'Purchases', type: 'projection', group: 'BMNR Analysis', thesisScope: 'ETH purchase history — timing, price, quantities, pacing. Assess if management is buying at favorable prices relative to thesis assumptions.' },
  { id: 'capital', label: 'Capital', type: 'tracking' },
  { id: 'financials', label: 'Financials', type: 'tracking' },
  { id: 'timeline', label: 'Timeline', type: 'tracking', thesisScope: 'Review upcoming catalysts, product launches, regulatory dates, and earnings. Ensure your scenario timelines align with tracked catalyst dates.' },
  { id: 'investment', label: 'Investment', type: 'tracking' },
  { id: 'wall-street', label: 'Wall Street', type: 'tracking' },
  { id: 'sources', label: 'Sources', type: 'tracking', group: 'AI' },
  { id: 'edgar', label: 'EDGAR', type: 'tracking', group: 'AI' },
];

// ── CRCL ────────────────────────────────────────────────────────────────────
export const crclTabs: TabConfig[] = [
  { id: 'overview', label: 'Overview', type: 'tracking' },
  { id: 'usdc', label: 'USDC', type: 'projection', group: 'CRCL Analysis', thesisScope: 'Reserve composition — Treasury/repo vs. cash split, redemption mechanisms, reserve attestation freshness, regulatory risk exposure. Assess reserve adequacy and confidence. USDC circulation growth and market share trends.' },
  { id: 'model', label: 'Model', type: 'projection' },
  { id: 'monte-carlo', label: 'Monte Carlo', type: 'projection', thesisScope: 'Review probabilistic outcome distributions. Compare base/bear/bull case probabilities with your scenario analysis in Section B. Flag any divergence between Monte Carlo outputs and your qualitative assessment.' },
  { id: 'comps', label: 'Comps', type: 'projection', thesisScope: 'Cross-reference peer valuation multiples and relative positioning against your price/NAV targets.' },
  { id: 'capital', label: 'Capital', type: 'tracking' },
  { id: 'financials', label: 'Financials', type: 'tracking' },
  { id: 'timeline', label: 'Timeline', type: 'tracking', thesisScope: 'Review upcoming catalysts, product launches, regulatory dates, and earnings. Ensure your scenario timelines align with tracked catalyst dates.' },
  { id: 'investment', label: 'Investment', type: 'tracking' },
  { id: 'wall-street', label: 'Wall Street', type: 'tracking' },
  { id: 'sources', label: 'Sources', type: 'tracking', group: 'AI' },
  { id: 'edgar', label: 'EDGAR', type: 'tracking', group: 'AI' },
];

// ── DEFAULT TABS ────────────────────────────────────────────────────────────
// Every new stock gets these tabs. Stock-specific tabs (Partners, Ethereum, etc.)
// are added manually later when a custom analysis component is built.
export const defaultTabs: TabConfig[] = [
  { id: 'overview', label: 'Overview', type: 'tracking' },
  { id: 'model', label: 'Model', type: 'projection' },
  { id: 'monte-carlo', label: 'Monte Carlo', type: 'projection' },
  { id: 'comps', label: 'Comps', type: 'projection' },
  { id: 'capital', label: 'Capital', type: 'tracking' },
  { id: 'financials', label: 'Financials', type: 'tracking' },
  { id: 'timeline', label: 'Timeline', type: 'tracking' },
  { id: 'investment', label: 'Investment', type: 'tracking' },
  { id: 'wall-street', label: 'Wall Street', type: 'tracking' },
  { id: 'sources', label: 'Sources', type: 'tracking', group: 'AI' },
  { id: 'edgar', label: 'EDGAR', type: 'tracking', group: 'AI' },
];

// ── REGISTRY ────────────────────────────────────────────────────────────────
// Maps ticker → tab config. Add new tickers here when creating stock components.
// Initiate Research auto-adds entries with defaultTabs.
export const tabRegistry: Record<string, TabConfig[]> = {
  ASTS: astsTabs,
  BMNR: bmnrTabs,
  CRCL: crclTabs,
};
