import { pgTable, serial, text, timestamp, uniqueIndex, index, boolean, integer } from 'drizzle-orm/pg-core';

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

// ============================================================================
// SEEN FILINGS — tracks EDGAR filings loaded into the UI so that genuinely
// new filings can be flagged with a NEW badge. Stores full filing metadata,
// status (tracked/data_only/new), cross-references, and dismiss state.
// ============================================================================

export const seenFilings = pgTable('seen_filings', {
  id: serial('id').primaryKey(),
  ticker: text('ticker').notNull(),
  accessionNumber: text('accession_number').notNull(),
  form: text('form').notNull(),                   // e.g. '10-Q', '8-K', 'Form 4'
  filingDate: text('filing_date'),                // ISO date from SEC
  description: text('description'),               // primaryDocDescription
  reportDate: text('report_date'),
  fileUrl: text('file_url'),
  status: text('status'),                         // 'tracked' | 'data_only' | 'new'
  crossRefs: text('cross_refs'),                  // JSON stringified cross-reference data
  dismissed: boolean('dismissed').default(false).notNull(),
  hidden: boolean('hidden').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  uniqueIndex('seen_filings_ticker_accession_idx').on(table.ticker, table.accessionNumber),
  index('seen_filings_ticker_idx').on(table.ticker),
]);

// ============================================================================
// SEEN ARTICLES — tracks which fetched articles the user has already seen
// so that genuinely new articles can be flagged with a NEW badge on refresh.
// ============================================================================

export const seenArticles = pgTable('seen_articles', {
  id: serial('id').primaryKey(),
  ticker: text('ticker').notNull(),
  cacheKey: text('cache_key').notNull(),   // articleCacheKey(article)
  headline: text('headline').notNull(),
  date: text('date'),                      // article publication date
  url: text('url'),                        // article URL (null for legacy rows)
  source: text('source'),                  // e.g. 'Yahoo Finance', 'CoinDesk'
  articleType: text('article_type'),       // 'pr' | 'news'
  dismissed: boolean('dismissed').default(false).notNull(), // user clicked NEW to dismiss
  hidden: boolean('hidden').default(false).notNull(),      // user hid this article from view
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  uniqueIndex('seen_articles_ticker_key_idx').on(table.ticker, table.cacheKey),
  index('seen_articles_ticker_idx').on(table.ticker),
]);

// ============================================================================
// AUDIT CHECKS — persists per-finding re-check verdicts so results survive
// across page refreshes and can be referenced in future audit runs.
// ============================================================================

export const auditChecks = pgTable('audit_checks', {
  id: serial('id').primaryKey(),
  findingId: text('finding_id').notNull(),       // e.g. 'CRIT-001'
  verdict: text('verdict').notNull(),            // 'passed' | 'failed'
  summary: text('summary').notNull(),            // AI explanation
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  uniqueIndex('audit_checks_finding_id_idx').on(table.findingId),
]);

// ============================================================================
// PRESS RELEASES — permanent archive of all press releases fetched via
// Press Intelligence. New items are upserted on every API fetch so the
// database accumulates a complete history over time.
// ============================================================================

export const pressReleases = pgTable('press_releases', {
  id: serial('id').primaryKey(),
  ticker: text('ticker').notNull(),
  headlineHash: text('headline_hash').notNull(),  // normalised headline for dedup
  headline: text('headline').notNull(),
  datetime: timestamp('datetime').notNull(),        // ISO date → TIMESTAMPTZ
  source: text('source'),
  summary: text('summary'),
  permalink: text('permalink'),
  storyurl: text('storyurl'),
  newsid: text('newsid'),                          // original source ID
  internalSource: text('internal_source'),         // _source field (quotemedia, gnw-rss, etc.)
  fetchCount: integer('fetch_count').default(1).notNull(), // times seen from upstream
  createdAt: timestamp('created_at').defaultNow().notNull(),
  lastSeenAt: timestamp('last_seen_at').defaultNow().notNull(),
}, (table) => [
  uniqueIndex('press_releases_ticker_hash_idx').on(table.ticker, table.headlineHash),
  index('press_releases_ticker_idx').on(table.ticker),
  index('press_releases_ticker_datetime_idx').on(table.ticker, table.datetime),
]);

// ============================================================================
// NOTES — user scratch-pad for article ideas, enhancements, and other thoughts
// ============================================================================

export const notes = pgTable('notes', {
  id: serial('id').primaryKey(),
  content: text('content').notNull(),
  category: text('category').notNull(),   // 'article' | 'enhancement' | 'other'
  title: text('title'),                   // AI-generated title (nullable)
  description: text('description'),       // AI-generated summary (nullable)
  hidden: boolean('hidden').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ============================================================================
// AGENT RUNS — tracks autonomous AI engineer task executions, schedules,
// and results so the platform can operate agents continuously without
// manual prompt-paste-run cycles.
// ============================================================================

export const agentRuns = pgTable('agent_runs', {
  id: serial('id').primaryKey(),
  ticker: text('ticker').notNull(),
  engineerId: text('engineer_id').notNull(),     // e.g. 'thesis-monitor', 'filing-watcher'
  workflowId: text('workflow_id'),               // links to workflows.ts id if applicable
  status: text('status').notNull(),              // 'queued' | 'running' | 'completed' | 'failed' | 'cancelled'
  triggerType: text('trigger_type').notNull(),    // 'scheduled' | 'event' | 'manual'
  triggerReason: text('trigger_reason'),          // human-readable reason for this run
  inputSummary: text('input_summary'),           // what data was fed in (truncated)
  outputSummary: text('output_summary'),         // key findings / actions taken
  outputFull: text('output_full'),               // complete AI response
  patchesApplied: integer('patches_applied').default(0).notNull(),
  errorsEncountered: text('errors_encountered'), // error details if failed
  durationMs: integer('duration_ms'),            // how long the run took
  hidden: boolean('hidden').default(false).notNull(), // soft-hide from history UI
  scheduledAt: timestamp('scheduled_at'),        // when this run was scheduled for
  startedAt: timestamp('started_at'),            // when execution began
  completedAt: timestamp('completed_at'),        // when execution finished
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('agent_runs_ticker_engineer_idx').on(table.ticker, table.engineerId),
  index('agent_runs_status_idx').on(table.status),
  index('agent_runs_created_idx').on(table.createdAt),
]);

// ============================================================================
// ENGINEER SCHEDULES — persistent configuration for autonomous AI engineers.
// Each row represents one engineer's schedule for a specific ticker.
// ============================================================================

export const engineerSchedules = pgTable('engineer_schedules', {
  id: serial('id').primaryKey(),
  ticker: text('ticker').notNull(),
  engineerId: text('engineer_id').notNull(),
  enabled: boolean('enabled').default(true).notNull(),
  intervalMinutes: integer('interval_minutes').notNull(), // how often to run (e.g. 60 = hourly)
  lastRunAt: timestamp('last_run_at'),
  nextRunAt: timestamp('next_run_at'),
  config: text('config'),                                 // JSON — engineer-specific settings
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  uniqueIndex('engineer_schedules_ticker_engineer_idx').on(table.ticker, table.engineerId),
]);

// ============================================================================
// OFFICE ACTIVITIES — which avatar activities are currently available in the
// 3D office scene. Activities are unlocked as furniture/appliances are added.
// ============================================================================

export const officeActivities = pgTable('office_activities', {
  id: serial('id').primaryKey(),
  type: text('type').notNull(),              // activity key: 'working', 'chatting', 'phone', 'coffee', etc.
  label: text('label').notNull(),            // display name: 'Working', 'Chatting', 'Phone Call'
  enabled: boolean('enabled').default(true).notNull(),
  requiresFurniture: text('requires_furniture'), // null = always available, else furniture key like 'coffee-machine'
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  uniqueIndex('office_activities_type_idx').on(table.type),
]);

// ============================================================================
// ROOM MESSAGES — chat messages in the multi-AI division "Room" where all
// divisions (Claude, Cursor, Gemini, Bobman) and the Boss
// communicate in a shared conversation thread.
// ============================================================================

export const roomMessages = pgTable('room_messages', {
  id: serial('id').primaryKey(),
  sender: text('sender').notNull(),           // 'boss' | 'claude' | 'cursor' | 'gemini' | 'bobman'
  content: text('content').notNull(),
  channel: text('channel').default('general').notNull(), // 'general' | 'backend' | 'frontend' | 'research' | 'ml' | 'planning'
  replyTo: integer('reply_to'),               // id of message being replied to (nullable)
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('room_messages_channel_idx').on(table.channel),
  index('room_messages_created_idx').on(table.createdAt),
  index('room_messages_sender_idx').on(table.sender),
]);

// ── PM Decision Queue ────────────────────────────────────────────────────────
// Tracks items awaiting PM review/approval before Boss final sign-off.
// Used by the Decision Dashboard at /engineers/decisions.
export const pmDecisions = pgTable('pm_decisions', {
  id: serial('id').primaryKey(),
  pm: text('pm').notNull(),                   // PM who owns this decision: 'claude' | 'cursor' | 'gemini' | 'bobman' | 'ai-engineer'
  engineerId: text('engineer_id').notNull(),  // engineer that produced the item
  runId: integer('run_id'),                   // agentRuns.id that generated the content
  ticker: text('ticker').notNull(),
  title: text('title').notNull(),             // short summary of what needs approval
  category: text('category').notNull(),       // 'prompt-patch' | 'data-update' | 'config-change'
  payload: text('payload').notNull(),         // JSON string with structured data (patches, diffs, etc.)
  status: text('status').default('pending').notNull(), // 'pending' | 'pm-approved' | 'pm-rejected' | 'boss-approved' | 'boss-rejected' | 'applied'
  pmNotes: text('pm_notes'),                  // PM's rationale for approval/rejection
  bossNotes: text('boss_notes'),              // Boss's final ruling notes
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  index('pm_decisions_pm_idx').on(table.pm),
  index('pm_decisions_status_idx').on(table.status),
  index('pm_decisions_created_idx').on(table.createdAt),
]);
