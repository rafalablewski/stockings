// ============================================================================
// ANALYSIS PARSER — Extracts structured data from AI analysis text
// ============================================================================
// Parses the AI-generated analysis output (with // CATEGORY markers,
// importance prefixes !!!/../.  and › detail lines) into structured
// cross-references and timeline events for database insertion.
// ============================================================================

export interface ParsedEntry {
  category: string;       // e.g. 'capital', 'management', 'timeline', 'overview', 'summary'
  importance: 'critical' | 'important' | 'low';
  headline: string;       // main text line after the importance marker
  details: string[];      // › detail lines
}

export interface ParsedAnalysis {
  entries: ParsedEntry[];
  summary: string;        // first paragraph / one-liner from the analysis (before sections)
}

/**
 * Known category names that map to cross-ref sources.
 * We normalize to lowercase for DB storage.
 */
const KNOWN_CATEGORIES = new Set([
  'capital', 'management', 'overview', 'summary', 'timeline',
  'financials', 'catalysts', 'operations', 'governance', 'legal',
  'risk', 'strategy', 'regulatory', 'technology',
]);

/**
 * Parse structured AI analysis text into entries.
 *
 * Format:
 *   Summary paragraph text...
 *
 *   // CATEGORY (N)
 *   !!!                    ← critical importance
 *   Headline text here
 *   › Detail bullet 1
 *   › Detail bullet 2
 *   ..                     ← important
 *   Another headline
 *   › Detail
 *   .                      ← low importance
 *   Low importance item
 *
 * Also handles markdown-style analysis with bullet points and [VERDICT:] lines.
 */
export function parseAnalysis(text: string): ParsedAnalysis {
  const lines = text.split('\n');
  const entries: ParsedEntry[] = [];
  let summary = '';

  let currentCategory = '';
  let currentImportance: ParsedEntry['importance'] | null = null;
  let currentHeadline = '';
  let currentDetails: string[] = [];

  // Extract summary: everything before the first // CATEGORY line
  const firstCategoryIdx = lines.findIndex(l => /^\/\/\s*[A-Z]+/.test(l.trim()));
  if (firstCategoryIdx > 0) {
    summary = lines.slice(0, firstCategoryIdx).join('\n').trim();
  } else if (firstCategoryIdx === -1) {
    // No structured sections found — try to parse as markdown analysis
    return parseMarkdownAnalysis(text);
  }

  function flushEntry() {
    if (currentCategory && currentHeadline && currentImportance) {
      entries.push({
        category: currentCategory,
        importance: currentImportance,
        headline: currentHeadline.trim(),
        details: [...currentDetails],
      });
    }
    currentHeadline = '';
    currentDetails = [];
    currentImportance = null;
  }

  for (let i = firstCategoryIdx; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Category header: // CAPITAL (6)
    const categoryMatch = trimmed.match(/^\/\/\s*([A-Z_]+)\s*(?:\(\d+\))?$/);
    if (categoryMatch) {
      flushEntry();
      const cat = categoryMatch[1].toLowerCase();
      currentCategory = KNOWN_CATEGORIES.has(cat) ? cat : cat;
      continue;
    }

    // Importance markers
    if (trimmed === '!!!') {
      flushEntry();
      currentImportance = 'critical';
      continue;
    }
    if (trimmed === '..' || trimmed === '...' && trimmed.length <= 3) {
      flushEntry();
      currentImportance = trimmed === '...' ? 'important' : 'important';
      continue;
    }
    if (trimmed === '.') {
      flushEntry();
      currentImportance = 'low';
      continue;
    }

    // Detail line: › Detail text
    if (trimmed.startsWith('›') || trimmed.startsWith('>')) {
      const detail = trimmed.replace(/^[›>]\s*/, '').trim();
      if (detail) {
        currentDetails.push(detail);
      }
      continue;
    }

    // Skip empty lines
    if (!trimmed) continue;

    // If we have an importance marker set but no headline yet, this is the headline
    if (currentImportance !== null && !currentHeadline) {
      currentHeadline = trimmed;
      continue;
    }

    // If we already have a headline, this might be a continuation or a new entry
    // with implicit importance (same as previous)
    if (currentHeadline && currentImportance !== null) {
      // Could be additional headline text — append to details
      currentDetails.push(trimmed);
    }
  }

  // Flush last entry
  flushEntry();

  return { entries, summary };
}

/**
 * Fallback parser for markdown-style analysis (bullet points + [VERDICT:] line).
 * This handles the output from the current edgar/analyze prompt.
 */
function parseMarkdownAnalysis(text: string): ParsedAnalysis {
  const entries: ParsedEntry[] = [];
  const lines = text.split('\n');

  // Extract verdict
  const verdictMatch = text.match(/\[VERDICT:\s*(CRITICAL|IMPORTANT|ROUTINE|LOW)\]\s*(?:—\s*)?(.*)/im);
  const verdictLevel = verdictMatch?.[1]?.toUpperCase() ?? 'UNKNOWN';

  // Map verdict to importance
  const importance: ParsedEntry['importance'] =
    verdictLevel === 'CRITICAL' ? 'critical' :
    verdictLevel === 'IMPORTANT' ? 'important' : 'low';

  // Extract bullet points as entries
  const bullets: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('• ')) {
      const bullet = trimmed.replace(/^[-*•]\s*/, '').replace(/\*\*/g, '').trim();
      if (bullet && !bullet.startsWith('[VERDICT:')) {
        bullets.push(bullet);
      }
    }
  }

  // Try to categorize each bullet based on keywords
  for (const bullet of bullets) {
    const category = categorizeBullet(bullet);
    entries.push({
      category,
      importance,
      headline: bullet,
      details: [],
    });
  }

  // Summary is the full text minus verdict line
  const summary = text.replace(/\[VERDICT:.*$/im, '').trim();

  return { entries, summary };
}

/**
 * Categorize a bullet point into a cross-ref source based on keywords.
 */
function categorizeBullet(text: string): string {
  const lower = text.toLowerCase();

  // Capital / financial keywords
  if (/\b(share|stock|equity|offering|warrant|split|dilut|authorized|outstanding|raise|capital|dividend|buyback)\b/.test(lower)) {
    return 'capital';
  }

  // Management keywords
  if (/\b(director|officer|ceo|cfo|coo|appointed|resigned|board|executive|management|compensation)\b/.test(lower)) {
    return 'management';
  }

  // Financial results keywords
  if (/\b(revenue|earnings|eps|income|loss|profit|gaap|ebitda|margin|financial\s+result)\b/.test(lower)) {
    return 'financials';
  }

  // Timeline / event keywords
  if (/\b(completed|filed|approved|announced|launched|acquired|merged|pivot|transformation)\b/.test(lower)) {
    return 'timeline';
  }

  // Default to overview
  return 'overview';
}

/**
 * Build cross-reference data strings from parsed entries.
 * Groups entries by category and creates data strings suitable for filingCrossRefs.
 */
export function entriesToCrossRefs(entries: ParsedEntry[]): { source: string; data: string }[] {
  // Group entries by category
  const grouped = new Map<string, ParsedEntry[]>();
  for (const entry of entries) {
    const existing = grouped.get(entry.category) || [];
    existing.push(entry);
    grouped.set(entry.category, existing);
  }

  const crossRefs: { source: string; data: string }[] = [];

  for (const [category, catEntries] of grouped) {
    // Build a condensed data string for this category
    const parts = catEntries.map(e => {
      const prefix = e.importance === 'critical' ? '[!] ' : e.importance === 'important' ? '' : '';
      const detailStr = e.details.length > 0 ? '; ' + e.details.join('; ') : '';
      return prefix + e.headline + detailStr;
    });

    crossRefs.push({
      source: category,
      data: parts.join(' | '),
    });
  }

  return crossRefs;
}

/**
 * Extract timeline-worthy entries from parsed analysis.
 * Returns entries suitable for the timelineEvents table.
 */
export function entriesToTimelineEvents(
  entries: ParsedEntry[],
  filingDate: string,
  ticker: string,
): Array<{
  ticker: string;
  date: string;
  category: string;
  event: string;
  impact: string;
  source: string;
  verdict: string;
  details: string;
  url: string | null;
}> {
  // Only timeline-category entries or critical entries from any category
  const timelineEntries = entries.filter(
    e => e.category === 'timeline' || e.importance === 'critical'
  );

  return timelineEntries.map(e => ({
    ticker: ticker.toLowerCase(),
    date: filingDate,
    category: e.category === 'timeline' ? mapTimelineCategory(e.headline) : e.category,
    event: e.headline,
    impact: e.importance === 'critical' ? 'High' : e.importance === 'important' ? 'Medium' : 'Low',
    source: 'SEC Filing (AI Analysis)',
    verdict: e.importance === 'critical' ? 'positive' : 'neutral',
    details: e.details.join('; '),
    url: null,
  }));
}

function mapTimelineCategory(headline: string): string {
  const lower = headline.toLowerCase();
  if (/capital|share|equity|offering|raise/.test(lower)) return 'Capital';
  if (/management|director|officer|ceo|cfo/.test(lower)) return 'Management';
  if (/revenue|financial|earnings/.test(lower)) return 'Financials';
  if (/pivot|business|model|strategy/.test(lower)) return 'Strategy';
  if (/merger|acqui|takeover/.test(lower)) return 'M&A';
  return 'Corporate';
}
