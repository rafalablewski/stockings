import { pgTable, serial, text, timestamp, uniqueIndex, index } from 'drizzle-orm/pg-core';

// ============================================================================
// ANALYSIS CACHE — replaces analysis-cache.json files
// ============================================================================

export const analysisCache = pgTable('analysis_cache', {
  id: serial('id').primaryKey(),
  ticker: text('ticker').notNull(),
  cacheType: text('cache_type').notNull(), // 'edgar' | 'sources'
  cacheKey: text('cache_key').notNull(),   // accession number or article key
  analysisText: text('analysis_text').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  uniqueIndex('analysis_cache_ticker_type_key_idx').on(table.ticker, table.cacheType, table.cacheKey),
]);

// ============================================================================
// SEC FILINGS — replaces disk reads in check-analyzed + refresh-local
// ============================================================================

export const secFilings = pgTable('sec_filings', {
  id: serial('id').primaryKey(),
  ticker: text('ticker').notNull(),
  date: text('date').notNull(),           // e.g. 'Feb 17, 2026' or 'Sep 3-15, 2025'
  type: text('type').notNull(),           // e.g. '10-Q', '8-K', 'Form 4'
  description: text('description').notNull(),
  period: text('period').notNull(),       // e.g. 'Q3 2025' or '—'
  color: text('color'),                   // display color
  accessionNumber: text('accession_number'), // SEC accession number (optional)
}, (table) => [
  index('sec_filings_ticker_date_idx').on(table.ticker, table.date),
]);

// ============================================================================
// FILING CROSS REFS — replaces FILING_CROSS_REFS in sec-filings.ts
// ============================================================================

export const filingCrossRefs = pgTable('filing_cross_refs', {
  id: serial('id').primaryKey(),
  ticker: text('ticker').notNull(),
  filingKey: text('filing_key').notNull(), // e.g. '8-K|2026-02-17' or accession number
  source: text('source').notNull(),        // e.g. 'capital', 'timeline'
  data: text('data').notNull(),            // the cross-reference text
}, (table) => [
  index('filing_cross_refs_ticker_key_idx').on(table.ticker, table.filingKey),
]);

// ============================================================================
// TIMELINE EVENTS — replaces disk reads in check-analyzed
// ============================================================================

export const timelineEvents = pgTable('timeline_events', {
  id: serial('id').primaryKey(),
  ticker: text('ticker').notNull(),
  date: text('date').notNull(),
  category: text('category').notNull(),
  event: text('event').notNull(),          // headline
  impact: text('impact').notNull(),
  source: text('source').notNull(),
  verdict: text('verdict').notNull(),      // 'positive' | 'negative' | 'neutral' | 'mixed'
  details: text('details').notNull(),
  url: text('url'),
}, (table) => [
  index('timeline_events_ticker_date_idx').on(table.ticker, table.date),
]);

// ============================================================================
// CATALYSTS — replaces disk reads in check-analyzed
// ============================================================================

export const catalysts = pgTable('catalysts', {
  id: serial('id').primaryKey(),
  ticker: text('ticker').notNull(),
  event: text('event').notNull(),
  timeline: text('timeline'),              // e.g. 'Q1 2026' (null for completed)
  impact: text('impact'),                  // 'Critical' | 'High' | 'Medium' | 'Low'
  category: text('category'),
  status: text('status').notNull(),        // 'active' | 'completed'
  completionDate: text('completion_date'), // for completed milestones
}, (table) => [
  index('catalysts_ticker_status_idx').on(table.ticker, table.status),
]);

// ============================================================================
// PARTNER NEWS — unified table for partner_news, competitor_news, ethereum_adoption, comps_timeline
// ============================================================================

export const partnerNews = pgTable('partner_news', {
  id: serial('id').primaryKey(),
  ticker: text('ticker').notNull(),
  date: text('date').notNull(),
  entityName: text('entity_name').notNull(),  // partner name, competitor name, or company
  category: text('category').notNull(),
  headline: text('headline').notNull(),
  summary: text('summary'),                   // summary, details joined, or significance
  relevanceText: text('relevance_text'),       // astsRelevance, bmnrImplication, thesisComparison
  impact: text('impact'),                      // 'Bullish'/'Bearish'/'Neutral' or 'positive'/'negative'/'neutral'
  source: text('source'),
  url: text('url'),
  entryType: text('entry_type').notNull(),     // 'partner_news' | 'competitor_news' | 'ethereum_adoption'
}, (table) => [
  index('partner_news_ticker_date_idx').on(table.ticker, table.date),
]);
