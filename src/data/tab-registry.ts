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
}

// ── ASTS ────────────────────────────────────────────────────────────────────
export const astsTabs: TabConfig[] = [
  { id: 'overview', label: 'Overview', type: 'tracking' },
  { id: 'partners', label: 'Partners', type: 'projection', group: 'ASTS Analysis' },
  { id: 'catalysts', label: 'Catalysts', type: 'projection', group: 'ASTS Analysis' },
  { id: 'constellation', label: 'Constellation', type: 'projection', group: 'ASTS Analysis' },
  { id: 'subscribers', label: 'Subscribers', type: 'projection', group: 'ASTS Analysis' },
  { id: 'revenue', label: 'Revenue', type: 'projection', group: 'ASTS Analysis' },
  { id: 'dilution', label: 'Dilution', type: 'projection', group: 'ASTS Analysis' },
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

// ── BMNR ────────────────────────────────────────────────────────────────────
export const bmnrTabs: TabConfig[] = [
  { id: 'overview', label: 'Overview', type: 'tracking' },
  { id: 'ethereum', label: 'Ethereum', type: 'projection', group: 'BMNR Analysis' },
  { id: 'staking', label: 'Staking', type: 'projection', group: 'BMNR Analysis' },
  { id: 'dilution', label: 'Dilution', type: 'projection', group: 'BMNR Analysis' },
  { id: 'debt', label: 'Debt', type: 'projection', group: 'BMNR Analysis' },
  { id: 'sensitivity', label: 'Sensitivity', type: 'projection', group: 'BMNR Analysis' },
  { id: 'backtest', label: 'Backtest', type: 'projection', group: 'BMNR Analysis' },
  { id: 'model', label: 'Model', type: 'projection' },
  { id: 'monte-carlo', label: 'Monte Carlo', type: 'projection' },
  { id: 'comps', label: 'Comps', type: 'projection' },
  { id: 'purchases', label: 'Purchases', type: 'projection', group: 'BMNR Analysis' },
  { id: 'capital', label: 'Capital', type: 'tracking' },
  { id: 'financials', label: 'Financials', type: 'tracking' },
  { id: 'timeline', label: 'Timeline', type: 'tracking' },
  { id: 'investment', label: 'Investment', type: 'tracking' },
  { id: 'wall-street', label: 'Wall Street', type: 'tracking' },
  { id: 'sources', label: 'Sources', type: 'tracking', group: 'AI' },
  { id: 'edgar', label: 'EDGAR', type: 'tracking', group: 'AI' },
];

// ── CRCL ────────────────────────────────────────────────────────────────────
export const crclTabs: TabConfig[] = [
  { id: 'overview', label: 'Overview', type: 'tracking' },
  { id: 'usdc', label: 'USDC', type: 'projection', group: 'CRCL Analysis' },
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
