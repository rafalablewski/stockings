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
      fs.writeFile(path.join(dataDir, 'company.ts'), companyTemplate(normalizedTicker, name, sector, description)),
      fs.writeFile(path.join(dataDir, 'catalysts.ts'), catalystsTemplate(normalizedTicker)),
      fs.writeFile(path.join(dataDir, 'investment.ts'), investmentTemplate(normalizedTicker, name)),
      fs.writeFile(path.join(dataDir, 'timeline.ts'), timelineTemplate(normalizedTicker)),
      fs.writeFile(path.join(dataDir, 'index.ts'), indexTemplate(normalizedTicker)),
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

    return NextResponse.json({
      success: true,
      ticker: normalizedTicker,
      files: ['company.ts', 'catalysts.ts', 'investment.ts', 'timeline.ts', 'index.ts'],
      message: `Research scaffolded for ${normalizedTicker}. Data files created at src/data/${normalizedTicker.toLowerCase()}/`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
