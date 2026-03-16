import { neon } from '@neondatabase/serverless';

/**
 * Lightweight DDL guard — runs CREATE TABLE IF NOT EXISTS for all tables
 * once per cold start. Uses the Neon HTTP driver directly (no drizzle-kit).
 * Safe to call from any API route; subsequent calls are no-ops.
 */

let _ensured = false;

const DDL_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS analysis_cache (
    id SERIAL PRIMARY KEY, ticker TEXT NOT NULL, cache_type TEXT NOT NULL,
    cache_key TEXT NOT NULL, analysis_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL, updated_at TIMESTAMP DEFAULT NOW() NOT NULL)`,
  `CREATE UNIQUE INDEX IF NOT EXISTS analysis_cache_ticker_type_key_idx ON analysis_cache (ticker, cache_type, cache_key)`,

  `CREATE TABLE IF NOT EXISTS sec_filings (
    id SERIAL PRIMARY KEY, ticker TEXT NOT NULL, date TEXT NOT NULL,
    type TEXT NOT NULL, description TEXT NOT NULL, period TEXT NOT NULL,
    color TEXT, accession_number TEXT)`,
  `CREATE INDEX IF NOT EXISTS sec_filings_ticker_date_idx ON sec_filings (ticker, date)`,

  `CREATE TABLE IF NOT EXISTS filing_cross_refs (
    id SERIAL PRIMARY KEY, ticker TEXT NOT NULL, filing_key TEXT NOT NULL,
    source TEXT NOT NULL, data TEXT NOT NULL)`,
  `CREATE INDEX IF NOT EXISTS filing_cross_refs_ticker_key_idx ON filing_cross_refs (ticker, filing_key)`,

  `CREATE TABLE IF NOT EXISTS timeline_events (
    id SERIAL PRIMARY KEY, ticker TEXT NOT NULL, date TEXT NOT NULL,
    category TEXT NOT NULL, event TEXT NOT NULL, impact TEXT NOT NULL,
    source TEXT NOT NULL, verdict TEXT NOT NULL, details TEXT NOT NULL, url TEXT)`,
  `CREATE INDEX IF NOT EXISTS timeline_events_ticker_date_idx ON timeline_events (ticker, date)`,

  `CREATE TABLE IF NOT EXISTS catalysts (
    id SERIAL PRIMARY KEY, ticker TEXT NOT NULL, event TEXT NOT NULL,
    timeline TEXT, impact TEXT, category TEXT, status TEXT NOT NULL, completion_date TEXT)`,
  `CREATE INDEX IF NOT EXISTS catalysts_ticker_status_idx ON catalysts (ticker, status)`,

  `CREATE TABLE IF NOT EXISTS partner_news (
    id SERIAL PRIMARY KEY, ticker TEXT NOT NULL, date TEXT NOT NULL,
    entity_name TEXT NOT NULL, category TEXT NOT NULL, headline TEXT NOT NULL,
    summary TEXT, relevance_text TEXT, impact TEXT, source TEXT, url TEXT,
    entry_type TEXT NOT NULL)`,
  `CREATE INDEX IF NOT EXISTS partner_news_ticker_date_idx ON partner_news (ticker, date)`,

  `CREATE TABLE IF NOT EXISTS seen_filings (
    id SERIAL PRIMARY KEY, ticker TEXT NOT NULL, accession_number TEXT NOT NULL,
    form TEXT NOT NULL, filing_date TEXT, description TEXT, report_date TEXT,
    file_url TEXT, status TEXT, cross_refs TEXT,
    dismissed BOOLEAN NOT NULL DEFAULT FALSE, hidden BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL)`,
  `CREATE UNIQUE INDEX IF NOT EXISTS seen_filings_ticker_accession_idx ON seen_filings (ticker, accession_number)`,
  `CREATE INDEX IF NOT EXISTS seen_filings_ticker_idx ON seen_filings (ticker)`,

  `CREATE TABLE IF NOT EXISTS seen_articles (
    id SERIAL PRIMARY KEY, ticker TEXT NOT NULL, cache_key TEXT NOT NULL,
    headline TEXT NOT NULL, date TEXT, url TEXT, source TEXT, article_type TEXT,
    dismissed BOOLEAN NOT NULL DEFAULT FALSE, hidden BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL)`,
  `CREATE UNIQUE INDEX IF NOT EXISTS seen_articles_ticker_key_idx ON seen_articles (ticker, cache_key)`,
  `CREATE INDEX IF NOT EXISTS seen_articles_ticker_idx ON seen_articles (ticker)`,

  `CREATE TABLE IF NOT EXISTS audit_checks (
    id SERIAL PRIMARY KEY, finding_id TEXT NOT NULL, verdict TEXT NOT NULL,
    summary TEXT NOT NULL, created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL)`,
  `CREATE UNIQUE INDEX IF NOT EXISTS audit_checks_finding_id_idx ON audit_checks (finding_id)`,

  `CREATE TABLE IF NOT EXISTS press_releases (
    id SERIAL PRIMARY KEY, ticker TEXT NOT NULL, headline_hash TEXT NOT NULL,
    headline TEXT NOT NULL, datetime TIMESTAMPTZ NOT NULL, source TEXT,
    summary TEXT, permalink TEXT, storyurl TEXT, newsid TEXT,
    internal_source TEXT, fetch_count INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL, last_seen_at TIMESTAMP DEFAULT NOW() NOT NULL)`,
  `CREATE UNIQUE INDEX IF NOT EXISTS press_releases_ticker_hash_idx ON press_releases (ticker, headline_hash)`,
  `CREATE INDEX IF NOT EXISTS press_releases_ticker_idx ON press_releases (ticker)`,
  `CREATE INDEX IF NOT EXISTS press_releases_ticker_datetime_idx ON press_releases (ticker, datetime)`,

  `CREATE TABLE IF NOT EXISTS notes (
    id SERIAL PRIMARY KEY, content TEXT NOT NULL, category TEXT NOT NULL,
    title TEXT, description TEXT, hidden BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL)`,

  `CREATE TABLE IF NOT EXISTS agent_runs (
    id SERIAL PRIMARY KEY, ticker TEXT NOT NULL, engineer_id TEXT NOT NULL,
    workflow_id TEXT, status TEXT NOT NULL, trigger_type TEXT NOT NULL,
    trigger_reason TEXT, input_summary TEXT, output_summary TEXT, output_full TEXT,
    patches_applied INTEGER NOT NULL DEFAULT 0, errors_encountered TEXT,
    duration_ms INTEGER, hidden BOOLEAN NOT NULL DEFAULT false,
    scheduled_at TIMESTAMP, started_at TIMESTAMP, completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL)`,
  `CREATE INDEX IF NOT EXISTS agent_runs_ticker_engineer_idx ON agent_runs (ticker, engineer_id)`,
  `CREATE INDEX IF NOT EXISTS agent_runs_status_idx ON agent_runs (status)`,
  `CREATE INDEX IF NOT EXISTS agent_runs_created_idx ON agent_runs (created_at)`,

  `CREATE TABLE IF NOT EXISTS engineer_schedules (
    id SERIAL PRIMARY KEY, ticker TEXT NOT NULL, engineer_id TEXT NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT TRUE, interval_minutes INTEGER NOT NULL,
    last_run_at TIMESTAMP, next_run_at TIMESTAMP, config TEXT,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL, updated_at TIMESTAMP DEFAULT NOW() NOT NULL)`,
  `CREATE UNIQUE INDEX IF NOT EXISTS engineer_schedules_ticker_engineer_idx ON engineer_schedules (ticker, engineer_id)`,

  `CREATE TABLE IF NOT EXISTS room_messages (
    id SERIAL PRIMARY KEY, sender TEXT NOT NULL, content TEXT NOT NULL,
    channel TEXT NOT NULL DEFAULT 'general', reply_to INTEGER,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL)`,
  `CREATE INDEX IF NOT EXISTS room_messages_channel_idx ON room_messages (channel)`,
  `CREATE INDEX IF NOT EXISTS room_messages_created_idx ON room_messages (created_at)`,
  `CREATE INDEX IF NOT EXISTS room_messages_sender_idx ON room_messages (sender)`,

  `CREATE TABLE IF NOT EXISTS pm_decisions (
    id SERIAL PRIMARY KEY, pm TEXT NOT NULL, engineer_id TEXT NOT NULL,
    run_id INTEGER, ticker TEXT NOT NULL, title TEXT NOT NULL,
    category TEXT NOT NULL, payload TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending', pm_notes TEXT, boss_notes TEXT,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL, updated_at TIMESTAMP DEFAULT NOW() NOT NULL)`,
  `CREATE INDEX IF NOT EXISTS pm_decisions_pm_idx ON pm_decisions (pm)`,
  `CREATE INDEX IF NOT EXISTS pm_decisions_status_idx ON pm_decisions (status)`,
  `CREATE INDEX IF NOT EXISTS pm_decisions_created_idx ON pm_decisions (created_at)`,

  `CREATE TABLE IF NOT EXISTS office_activities (
    id SERIAL PRIMARY KEY, type TEXT NOT NULL, label TEXT NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT TRUE, requires_furniture TEXT,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL)`,
  `CREATE UNIQUE INDEX IF NOT EXISTS office_activities_type_idx ON office_activities (type)`,
];

export async function ensureTables(): Promise<void> {
  if (_ensured) return;
  const url = process.env.DATABASE_URL;
  if (!url) return; // skip during build
  const sql = neon(url);
  for (const stmt of DDL_STATEMENTS) {
    const tsa = Object.assign([stmt], { raw: [stmt] }) as unknown as TemplateStringsArray;
    await sql(tsa);
  }
  _ensured = true;
}
