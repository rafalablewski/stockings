/**
 * Shared mapper functions used by both the API setup route and the CLI seed script.
 */
import * as schema from './schema';

// ── Types ────────────────────────────────────────────────────────────────────
export type SecFilingRow = typeof schema.secFilings.$inferInsert;
export type CrossRefRow = typeof schema.filingCrossRefs.$inferInsert;
export type TimelineRow = typeof schema.timelineEvents.$inferInsert;
export type CatalystRow = typeof schema.catalysts.$inferInsert;
export type PartnerNewsRow = typeof schema.partnerNews.$inferInsert;

// ── Helpers ──────────────────────────────────────────────────────────────────

export function mapImpactToVerdict(impact?: string): string {
  if (!impact) return 'neutral';
  const lower = impact.toLowerCase();
  if (lower === 'bullish' || lower === 'positive') return 'positive';
  if (lower === 'bearish' || lower === 'negative') return 'negative';
  if (lower === 'mixed') return 'mixed';
  return 'neutral';
}

// ── SEC Filings ──────────────────────────────────────────────────────────────

export function mapSecFilings(ticker: string, filings: Array<{ date: string; type: string; description: string; period: string; color?: string; accessionNumber?: string }>): SecFilingRow[] {
  return filings.map(f => ({
    ticker,
    date: f.date,
    type: f.type,
    description: f.description,
    period: f.period,
    color: f.color ?? null,
    accessionNumber: f.accessionNumber ?? null,
  }));
}

export function mapCrossRefs(ticker: string, refs: Record<string, { source: string; data: string }[]>): CrossRefRow[] {
  const rows: CrossRefRow[] = [];
  for (const [filingKey, entries] of Object.entries(refs)) {
    for (const entry of entries) {
      rows.push({
        ticker,
        filingKey,
        source: entry.source,
        data: entry.data,
      });
    }
  }
  return rows;
}

// ── Timeline Events ──────────────────────────────────────────────────────────

export function mapCrclTimeline(entries: Array<{ date: string; category: string; event: string; impact: string; source: string; verdict: string; details: string; url?: string }>): TimelineRow[] {
  return entries.map(e => ({
    ticker: 'CRCL',
    date: e.date,
    category: e.category,
    event: e.event,
    impact: e.impact,
    source: e.source,
    verdict: e.verdict,
    details: e.details,
    url: e.url ?? null,
  }));
}

export function mapAstsTimeline(entries: Array<{ date: string; category: string; title: string; summary?: string; details?: string[]; sources?: string[]; impact?: string }>): TimelineRow[] {
  return entries.map(e => ({
    ticker: 'ASTS',
    date: e.date,
    category: e.category,
    event: e.title,
    impact: e.impact ?? '',
    source: (e.sources ?? []).join(', '),
    verdict: mapImpactToVerdict(e.impact),
    details: [e.summary, ...(e.details ?? [])].filter(Boolean).join('\n'),
    url: null,
  }));
}

export function mapBmnrTimeline(entries: Array<{ date: string; category: string; title: string; source?: string; changes?: Array<{ metric: string; previous: string; new: string; change: string }>; notes?: string; impact?: string }>): TimelineRow[] {
  return entries.map(e => {
    const changesText = (e.changes ?? []).map(c => `${c.metric}: ${c.previous} → ${c.new} (${c.change})`).join('\n');
    return {
      ticker: 'BMNR',
      date: e.date,
      category: e.category,
      event: e.title,
      impact: e.impact ?? '',
      source: e.source ?? '',
      verdict: mapImpactToVerdict(e.impact),
      details: [e.notes, changesText].filter(Boolean).join('\n'),
      url: null,
    };
  });
}

// ── Catalysts ────────────────────────────────────────────────────────────────

export function mapCatalysts(ticker: string, upcoming: Array<{ event: string; timeline: string; impact: string; category?: string }>, completed: Array<{ event: string; date: string; category?: string }>): CatalystRow[] {
  const rows: CatalystRow[] = [];
  for (const c of upcoming) {
    rows.push({
      ticker,
      event: c.event,
      timeline: c.timeline,
      impact: c.impact,
      category: c.category ?? null,
      status: 'active',
      completionDate: null,
    });
  }
  for (const m of completed) {
    rows.push({
      ticker,
      event: m.event,
      timeline: null,
      impact: null,
      category: m.category ?? null,
      status: 'completed',
      completionDate: m.date,
    });
  }
  return rows;
}

// ── Partner/Competitor News ──────────────────────────────────────────────────

export function mapPartnerNews(entries: Array<{ date: string; partner: string; category: string; headline: string; summary: string; astsRelevance: string; impact: string; source: string; url?: string }>): PartnerNewsRow[] {
  return entries.map(e => ({
    ticker: 'ASTS',
    date: e.date,
    entityName: e.partner,
    category: e.category,
    headline: e.headline,
    summary: e.summary,
    relevanceText: e.astsRelevance,
    impact: e.impact,
    source: e.source,
    url: e.url ?? null,
    entryType: 'partner_news',
  }));
}

export function mapCompetitorNews(ticker: string, entries: Array<{ date: string; competitor: string; category: string; headline: string; details: string[]; implication: string; thesisComparison?: string; source?: string; sourceUrl?: string }>): PartnerNewsRow[] {
  return entries.map(e => ({
    ticker,
    date: e.date,
    entityName: e.competitor,
    category: e.category,
    headline: e.headline,
    summary: e.details.join('\n'),
    relevanceText: e.thesisComparison ?? null,
    impact: e.implication,
    source: e.source ?? null,
    url: e.sourceUrl ?? null,
    entryType: 'competitor_news',
  }));
}

export function mapEthereumAdoption(entries: Array<{ date: string; category: string; company: string; title: string; summary: string; significance: string; bmnrImplication: string; impact: string; source: string; url?: string }>): PartnerNewsRow[] {
  return entries.map(e => ({
    ticker: 'BMNR',
    date: e.date,
    entityName: e.company,
    category: e.category,
    headline: e.title,
    summary: e.summary,
    relevanceText: e.bmnrImplication,
    impact: e.impact,
    source: e.source,
    url: e.url ?? null,
    entryType: 'ethereum_adoption',
  }));
}
