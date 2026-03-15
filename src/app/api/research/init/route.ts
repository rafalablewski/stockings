import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

/* ═══════════════════════════════════════════════════════════════════════════
   POST /api/research/init
   Scaffolds a new research directory under src/data/<ticker>/
   and registers the stock in src/lib/stocks.ts with hasResearch: true.

   Body: { ticker, name, sector, description }
   ═══════════════════════════════════════════════════════════════════════════ */

const DATA_ROOT = path.join(process.cwd(), 'src', 'data');
const STOCKS_FILE = path.join(process.cwd(), 'src', 'lib', 'stocks.ts');
const TAB_REGISTRY_FILE = path.join(process.cwd(), 'src', 'data', 'tab-registry.ts');
const STOCK_CONTEXT_FILE = path.join(process.cwd(), 'src', 'data', 'stock-context.ts');

function companyTemplate(ticker: string, name: string, sector: string, description: string): string {
  const today = new Date().toISOString().slice(0, 10);
  return `/**
 * ${ticker} (${name.toUpperCase()}) - COMPANY DATA & DEFAULTS
 * ================================================
 *
 * Basic company information and model default values.
 *
 * LAST UPDATED: ${today}
 */

import type { DataMetadata } from '../shared/types';

export const ${ticker}_METADATA: DataMetadata = {
  lastUpdated: '${today}',
  source: 'Initial research scaffold',
  nextExpectedUpdate: 'TBD',
  notes: 'Newly initiated research coverage',
};

export const COMPANY_INFO = {
  name: '${name}',
  ticker: '${ticker}',
  sector: '${sector}',
  description: '${description}',
};

export const DATA_FRESHNESS = {
  company: '${today}',
};
`;
}

function catalystsTemplate(ticker: string): string {
  const today = new Date().toISOString().slice(0, 10);
  return `/**
 * ${ticker} - CATALYSTS & MILESTONES
 * ================================================
 *
 * Upcoming catalysts and completed milestones.
 *
 * LAST UPDATED: ${today}
 */

import type { Catalyst, CompletedMilestone, DataMetadata } from '../shared/types';

export const CATALYSTS_METADATA: DataMetadata = {
  lastUpdated: '${today}',
  source: 'Initial research scaffold',
  nextExpectedUpdate: 'TBD',
};

export const UPCOMING_CATALYSTS: Catalyst[] = [];

export const COMPLETED_MILESTONES: CompletedMilestone[] = [];

export function getCatalystsByImpact(impact: string) {
  return UPCOMING_CATALYSTS.filter(c => c.impact === impact);
}

export function getCatalystsByCategory(category: string) {
  return UPCOMING_CATALYSTS.filter(c => c.category === category);
}

export function getCatalystCategories() {
  return [...new Set(UPCOMING_CATALYSTS.map(c => c.category))];
}
`;
}

function investmentTemplate(ticker: string, name: string): string {
  const today = new Date().toISOString().slice(0, 10);
  return `/**
 * ${ticker} (${name.toUpperCase()}) - INVESTMENT THESIS DATA
 * ================================================
 *
 * Current investment thesis and historical archive.
 *
 * LAST UPDATED: ${today}
 */

import type { InvestmentCurrent, ArchiveEntry } from '@/components/shared/investmentTypes';

export const ${ticker}_INVESTMENT_CURRENT: InvestmentCurrent = {
  date: '${today}',
  source: 'Initial research scaffold',
  verdict: 'INITIATE',
  verdictColor: 'sky',
  tagline: 'Research coverage initiated — thesis under development',

  scorecard: [
    { category: 'Financial Strength', rating: 'NR', color: 'var(--dim)', detail: 'Not yet rated' },
    { category: 'Profitability', rating: 'NR', color: 'var(--dim)', detail: 'Not yet rated' },
    { category: 'Growth', rating: 'NR', color: 'var(--dim)', detail: 'Not yet rated' },
    { category: 'Valuation', rating: 'NR', color: 'var(--dim)', detail: 'Not yet rated' },
    { category: 'Competitive Position', rating: 'NR', color: 'var(--dim)', detail: 'Not yet rated' },
    { category: 'Execution', rating: 'NR', color: 'var(--dim)', detail: 'Not yet rated' },
    { category: 'Regulatory/External', rating: 'NR', color: 'var(--dim)', detail: 'Not yet rated' },
    { category: 'Capital Structure', rating: 'NR', color: 'var(--dim)', detail: 'Not yet rated' },
  ],

  executiveSummary: {
    headline: 'Research coverage initiated — thesis under development',
    thesis: 'Initial research coverage. Investment thesis to be developed as data is gathered and analyzed.',
    bottomLine: 'Coverage initiated. Building position analysis.',
    whatsNew: ['Research coverage initiated'],
  },

  growthDrivers: [],
  moatSources: [],
  moatThreats: [],
  risks: [],
  perspectives: [],
  scenarios: { base: { label: 'Base', probability: '50%', detail: 'TBD' }, bull: { label: 'Bull', probability: '25%', detail: 'TBD' }, bear: { label: 'Bear', probability: '25%', detail: 'TBD' } },
};

export const ${ticker}_INVESTMENT_ARCHIVE: ArchiveEntry[] = [];
`;
}

function timelineTemplate(ticker: string): string {
  const today = new Date().toISOString().slice(0, 10);
  return `/**
 * ${ticker} - TIMELINE EVENTS
 * ================================================
 *
 * Historical events and milestones.
 *
 * LAST UPDATED: ${today}
 */

import type { DataMetadata } from '../shared/types';

export const TIMELINE_METADATA: DataMetadata = {
  lastUpdated: '${today}',
  source: 'Initial research scaffold',
  nextExpectedUpdate: 'TBD',
};

export const TIMELINE: Array<{
  date: string;
  category: string;
  headline: string;
  details: string[];
  impact: 'positive' | 'negative' | 'neutral';
}> = [];
`;
}

function analystCoverageTemplate(ticker: string): string {
  const today = new Date().toISOString().slice(0, 10);
  return `/**
 * ${ticker} - ANALYST COVERAGE
 * ================================================
 *
 * Wall Street analyst ratings and price targets.
 *
 * LAST UPDATED: ${today}
 */

import type { DataMetadata } from '../shared/types';

export const ANALYST_COVERAGE_METADATA: DataMetadata = {
  lastUpdated: '${today}',
  source: 'Initial research scaffold',
  nextExpectedUpdate: 'TBD',
};

export const ${ticker}_ANALYST_COVERAGE: Array<{
  firm: string;
  analyst: string;
  coverageSince: string;
  currentPT: number | null;
  currentRating: string;
  reports: Array<{ date: string; rating: string; pt: number | null; note: string }>;
}> = [];
`;
}

function capitalTemplate(ticker: string): string {
  const today = new Date().toISOString().slice(0, 10);
  return `/**
 * ${ticker} - CAPITAL STRUCTURE DATA
 * ================================================
 *
 * Share classes, shareholders, and equity offerings.
 *
 * LAST UPDATED: ${today}
 */

import type { ShareClass, MajorShareholder, EquityOffering, DataMetadata } from '../shared/types';

export const CAPITAL_METADATA: DataMetadata = {
  lastUpdated: '${today}',
  source: 'Initial research scaffold',
  nextExpectedUpdate: 'TBD',
};

export const SHARE_CLASSES: ShareClass[] = [];
export const MAJOR_SHAREHOLDERS: MajorShareholder[] = [];
export const EQUITY_OFFERINGS: EquityOffering[] = [];
`;
}

function competitorNewsTemplate(ticker: string): string {
  const today = new Date().toISOString().slice(0, 10);
  return `/**
 * ${ticker} - COMPETITOR NEWS
 * ================================================
 *
 * Competitor intelligence using shared CompetitorNewsEntry schema.
 *
 * LAST UPDATED: ${today}
 */

import type { CompetitorNewsEntry } from '../shared/competitor-schema';
import type { DataMetadata } from '../shared/types';

export const COMPETITOR_NEWS_METADATA: DataMetadata = {
  lastUpdated: '${today}',
  source: 'Initial research scaffold',
  nextExpectedUpdate: 'TBD',
};

export const ${ticker}_COMPETITOR_NEWS: CompetitorNewsEntry[] = [];
`;
}

function financialsTemplate(ticker: string): string {
  const today = new Date().toISOString().slice(0, 10);
  return `/**
 * ${ticker} - QUARTERLY FINANCIAL DATA
 * ================================================
 *
 * Historical quarterly data from SEC filings.
 *
 * LAST UPDATED: ${today}
 */

import type { QuarterlyFinancials, DataMetadata } from '../shared/types';

export const FINANCIALS_METADATA: DataMetadata = {
  lastUpdated: '${today}',
  source: 'Initial research scaffold',
  nextExpectedUpdate: 'TBD',
};

export const QUARTERLY_DATA: Record<string, QuarterlyFinancials> = {};
`;
}

function historicalTemplate(ticker: string): string {
  const today = new Date().toISOString().slice(0, 10);
  return `/**
 * ${ticker} - HISTORICAL PRICE DATA
 * ================================================
 *
 * Historical stock prices for backtesting and analysis.
 *
 * LAST UPDATED: ${today}
 */

import type { DataMetadata } from '../shared/types';

export const HISTORICAL_METADATA: DataMetadata = {
  lastUpdated: '${today}',
  source: 'Initial research scaffold',
  nextExpectedUpdate: 'Monthly',
};

export const HISTORICAL_PRICES: Record<string, (number | null)[]> = {};
`;
}

function pressReleasesTemplate(ticker: string): string {
  const today = new Date().toISOString().slice(0, 10);
  return `/**
 * ${ticker} - PRESS RELEASES
 * ================================================
 *
 * Company press releases (newest first).
 *
 * LAST UPDATED: ${today}
 */

import type { PressRelease, DataMetadata } from '../shared/types';

export const PRESS_RELEASES_METADATA: DataMetadata = {
  lastUpdated: '${today}',
  source: 'Initial research scaffold',
  nextExpectedUpdate: 'After new press releases',
};

export const PRESS_RELEASES: PressRelease[] = [];
`;
}

function quarterlyMetricsTemplate(ticker: string): string {
  const today = new Date().toISOString().slice(0, 10);
  return `/**
 * ${ticker} - QUARTERLY METRICS
 * ================================================
 *
 * KPI metrics per quarter for charts and dashboards.
 *
 * LAST UPDATED: ${today}
 */

import type { DataMetadata } from '../shared/types';

export const QUARTERLY_METRICS_METADATA: DataMetadata = {
  lastUpdated: '${today}',
  source: 'Initial research scaffold',
  nextExpectedUpdate: 'TBD',
};

export const ${ticker}_QUARTERLY_DATA: Array<Record<string, unknown>> = [];
`;
}

function secFilingsTemplate(ticker: string): string {
  const today = new Date().toISOString().slice(0, 10);
  return `/**
 * ${ticker} - SEC FILINGS
 * ================================================
 *
 * SEC filing registry with cross-references.
 *
 * LAST UPDATED: ${today}
 */

import type { DataMetadata } from '../shared/types';

export const SEC_METADATA: DataMetadata = {
  lastUpdated: '${today}',
  source: 'Initial research scaffold',
  nextExpectedUpdate: 'TBD',
};

export const ${ticker}_SEC_META = {
  cik: '',
  ticker: '${ticker}',
  exchange: '',
  totalFilingsTracked: 0,
  lastPR: '',
  lastPRTitle: '',
};

export const ${ticker}_SEC_FILINGS: Array<{
  date: string;
  type: string;
  description: string;
  period: string;
  color: string;
}> = [];

export const ${ticker}_FILING_CROSS_REFS: Record<string, Array<{ source: string; data: string }>> = {};
`;
}

function indexTemplate(ticker: string): string {
  return `/**
 * ${ticker} - DATA EXPORTS
 * ================================================
 *
 * Central export file for all ${ticker} data.
 * Import from this file to get all stock data.
 */

// Company & Defaults
export {
  ${ticker}_METADATA,
  COMPANY_INFO,
  DATA_FRESHNESS,
} from './company';

// Catalysts & Milestones
export {
  CATALYSTS_METADATA,
  UPCOMING_CATALYSTS,
  COMPLETED_MILESTONES,
  getCatalystsByImpact,
  getCatalystsByCategory,
  getCatalystCategories,
} from './catalysts';

// Timeline
export {
  TIMELINE_METADATA,
  TIMELINE,
} from './timeline';

// Analyst Coverage
export {
  ANALYST_COVERAGE_METADATA,
  ${ticker}_ANALYST_COVERAGE,
} from './analyst-coverage';

// Capital Structure
export {
  CAPITAL_METADATA,
  SHARE_CLASSES,
  MAJOR_SHAREHOLDERS,
  EQUITY_OFFERINGS,
} from './capital';

// Competitor News
export {
  COMPETITOR_NEWS_METADATA,
  ${ticker}_COMPETITOR_NEWS,
} from './competitor-news';

// Financials
export {
  FINANCIALS_METADATA,
  QUARTERLY_DATA,
} from './financials';

// Historical
export {
  HISTORICAL_METADATA,
  HISTORICAL_PRICES,
} from './historical';

// Press Releases
export {
  PRESS_RELEASES_METADATA,
  PRESS_RELEASES,
} from './press-releases';

// Quarterly Metrics
export {
  QUARTERLY_METRICS_METADATA,
  ${ticker}_QUARTERLY_DATA,
} from './quarterly-metrics';

// SEC Filings
export {
  SEC_METADATA,
  ${ticker}_SEC_META,
  ${ticker}_SEC_FILINGS,
  ${ticker}_FILING_CROSS_REFS,
} from './sec-filings';

// Re-export types for convenience
export type {
  DataMetadata,
  Catalyst,
  CompletedMilestone,
} from '../shared/types';
`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ticker, name, sector, description } = body;

    if (!ticker || !name || !sector || !description) {
      return NextResponse.json(
        { error: 'Missing required fields: ticker, name, sector, description' },
        { status: 400 },
      );
    }

    const normalizedTicker = ticker.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (!normalizedTicker || normalizedTicker.length > 6) {
      return NextResponse.json(
        { error: 'Ticker must be 1-6 alphanumeric characters' },
        { status: 400 },
      );
    }

    const dataDir = path.join(DATA_ROOT, normalizedTicker.toLowerCase());

    // Check if research already exists
    try {
      await fs.access(dataDir);
      return NextResponse.json(
        { error: `Research directory already exists for ${normalizedTicker}` },
        { status: 409 },
      );
    } catch {
      // Directory doesn't exist — proceed
    }

    // 1. Create data directory and scaffold files
    await fs.mkdir(dataDir, { recursive: true });

    await Promise.all([
      // Scaffold (5)
      fs.writeFile(path.join(dataDir, 'company.ts'), companyTemplate(normalizedTicker, name, sector, description)),
      fs.writeFile(path.join(dataDir, 'catalysts.ts'), catalystsTemplate(normalizedTicker)),
      fs.writeFile(path.join(dataDir, 'investment.ts'), investmentTemplate(normalizedTicker, name)),
      fs.writeFile(path.join(dataDir, 'timeline.ts'), timelineTemplate(normalizedTicker)),
      fs.writeFile(path.join(dataDir, 'index.ts'), indexTemplate(normalizedTicker)),
      // Standard (8)
      fs.writeFile(path.join(dataDir, 'analyst-coverage.ts'), analystCoverageTemplate(normalizedTicker)),
      fs.writeFile(path.join(dataDir, 'capital.ts'), capitalTemplate(normalizedTicker)),
      fs.writeFile(path.join(dataDir, 'competitor-news.ts'), competitorNewsTemplate(normalizedTicker)),
      fs.writeFile(path.join(dataDir, 'financials.ts'), financialsTemplate(normalizedTicker)),
      fs.writeFile(path.join(dataDir, 'historical.ts'), historicalTemplate(normalizedTicker)),
      fs.writeFile(path.join(dataDir, 'press-releases.ts'), pressReleasesTemplate(normalizedTicker)),
      fs.writeFile(path.join(dataDir, 'quarterly-metrics.ts'), quarterlyMetricsTemplate(normalizedTicker)),
      fs.writeFile(path.join(dataDir, 'sec-filings.ts'), secFilingsTemplate(normalizedTicker)),
    ]);

    // 2. Register in stocks.ts — insert before the closing '};'
    const stocksContent = await fs.readFile(STOCKS_FILE, 'utf-8');

    if (stocksContent.includes(`  ${normalizedTicker}:`)) {
      // Already registered — just add hasResearch flag if missing
      if (!stocksContent.includes(`${normalizedTicker}:`) || stocksContent.includes(`${normalizedTicker}:`)) {
        // Update hasResearch to true
        const updatedStocks = stocksContent.replace(
          new RegExp(`(  ${normalizedTicker}: \\{[^}]*?)\\n  \\},`),
          `$1\n    hasResearch: true,\n  },`,
        );
        if (updatedStocks !== stocksContent) {
          await fs.writeFile(STOCKS_FILE, updatedStocks);
        }
      }
    } else {
      // Add new entry before NBIS (last entry) or before closing
      const newEntry = `  ${normalizedTicker}: {
    ticker: '${normalizedTicker}',
    name: '${name}',
    sector: '${sector}',
    description: '${description}',
    hasResearch: true,
  },
`;
      const insertPoint = stocksContent.lastIndexOf('};');
      const updatedStocks = stocksContent.slice(0, insertPoint) + newEntry + stocksContent.slice(insertPoint);
      await fs.writeFile(STOCKS_FILE, updatedStocks);
    }

    // 3. Add default tabs to tab-registry.ts
    const tabRegistryContent = await fs.readFile(TAB_REGISTRY_FILE, 'utf-8');
    if (!tabRegistryContent.includes(`  ${normalizedTicker}:`)) {
      const tabEntry = `  ${normalizedTicker}: defaultTabs,\n`;
      const registryInsertPoint = tabRegistryContent.lastIndexOf('};');
      const updatedTabRegistry = tabRegistryContent.slice(0, registryInsertPoint) + tabEntry + tabRegistryContent.slice(registryInsertPoint);
      await fs.writeFile(TAB_REGISTRY_FILE, updatedTabRegistry);
    }

    // 4. Add starter context to stock-context.ts
    const stockContextContent = await fs.readFile(STOCK_CONTEXT_FILE, 'utf-8');
    if (!stockContextContent.includes(`  ${normalizedTicker}:`)) {
      const escapedName = name.replace(/'/g, "\\'");
      const escapedSector = sector.replace(/'/g, "\\'");
      const escapedDesc = description.replace(/'/g, "\\'");
      const contextEntry = `  ${normalizedTicker}: createStarterContext('${normalizedTicker}', '${escapedName}', '${escapedSector}', '${escapedDesc}'),\n`;
      const contextInsertPoint = stockContextContent.lastIndexOf('};');
      const updatedStockContext = stockContextContent.slice(0, contextInsertPoint) + contextEntry + stockContextContent.slice(contextInsertPoint);
      await fs.writeFile(STOCK_CONTEXT_FILE, updatedStockContext);
    }

    return NextResponse.json({
      success: true,
      ticker: normalizedTicker,
      files: [
        'company.ts', 'catalysts.ts', 'investment.ts', 'timeline.ts', 'index.ts',
        'analyst-coverage.ts', 'capital.ts', 'competitor-news.ts', 'financials.ts',
        'historical.ts', 'press-releases.ts', 'quarterly-metrics.ts', 'sec-filings.ts',
      ],
      registries: ['tab-registry.ts', 'stock-context.ts'],
      message: `Research scaffolded for ${normalizedTicker}. Data files, tab registry, and stock context created.`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
