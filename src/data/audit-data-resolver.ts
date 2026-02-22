/**
 * Audit Data Resolver
 *
 * Dynamically loads and serializes the database modules each DBV audit needs.
 * Called by SharedAIAgentsTab before sending an audit prompt to the Claude API,
 * so the AI actually has the data it's asked to audit.
 *
 * Uses dynamic import() for code-splitting — data is only fetched when an audit runs.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DataModule = Record<string, any>;
type ModuleLoader = () => Promise<DataModule>;

// ── Static import path map ──────────────────────────────────────────────────
// Every (ticker, module) pair the audits may need.
// Paths are string literals so webpack/turbopack can resolve them at build time.

const MODULE_LOADERS: Record<string, Record<string, ModuleLoader>> = {
  asts: {
    capital:          () => import('@/data/asts/capital'),
    'sec-filings':    () => import('@/data/asts/sec-filings'),
    company:          () => import('@/data/asts/company'),
    financials:       () => import('@/data/asts/financials'),
    catalysts:        () => import('@/data/asts/catalysts'),
    'press-releases': () => import('@/data/asts/press-releases'),
    partners:         () => import('@/data/asts/partners'),
  },
  bmnr: {
    capital:       () => import('@/data/bmnr/capital'),
    'sec-filings': () => import('@/data/bmnr/sec-filings'),
    company:       () => import('@/data/bmnr/company'),
    catalysts:     () => import('@/data/bmnr/catalysts'),
    historical:    () => import('@/data/bmnr/historical'),
  },
  crcl: {
    company:            () => import('@/data/crcl/company'),
    financials:         () => import('@/data/crcl/financials'),
    catalysts:          () => import('@/data/crcl/catalysts'),
    'research-sources': () => import('@/data/crcl/research-sources'),
    timeline:           () => import('@/data/crcl/timeline'),
  },
};

// ── Per-audit module requirements ───────────────────────────────────────────
// Maps each audit ID → ticker → list of module names to load.

const AUDIT_MODULES: Record<string, Record<string, string[]>> = {
  'capital-parity': {
    asts: ['capital', 'sec-filings', 'company', 'financials', 'catalysts'],
    bmnr: ['capital', 'sec-filings', 'company', 'catalysts'],
    crcl: ['company', 'financials', 'catalysts'],
  },
  'crossref-integrity': {
    asts: ['sec-filings'],
    bmnr: ['sec-filings'],
    crcl: ['financials'],
  },
  'sources-completeness': {
    asts: ['sec-filings', 'press-releases', 'company', 'catalysts'],
    bmnr: ['sec-filings', 'company', 'catalysts'],
    crcl: ['financials', 'research-sources', 'company', 'catalysts'],
  },
  'data-freshness': {
    asts: ['company', 'capital', 'financials', 'catalysts', 'press-releases', 'partners'],
    bmnr: ['company', 'capital', 'catalysts', 'historical'],
    crcl: ['company', 'financials', 'catalysts', 'timeline'],
  },
};

// ── Serialization ───────────────────────────────────────────────────────────

function serializeModule(moduleName: string, mod: DataModule): string {
  const lines: string[] = [`── ${moduleName}.ts ──`];
  for (const [key, value] of Object.entries(mod)) {
    // Skip functions, internal webpack props, and default re-exports
    if (typeof value === 'function') continue;
    if (key.startsWith('__')) continue;
    if (key === 'default') continue;
    try {
      lines.push(`${key}: ${JSON.stringify(value, null, 2)}`);
    } catch {
      // Skip non-serializable values (symbols, circular refs, etc.)
      console.warn(`[audit-data-resolver] Could not serialize key "${key}" in module "${moduleName}".`);
    }
  }
  return lines.join('\n');
}

// ── Public API ──────────────────────────────────────────────────────────────

/**
 * Load and serialize the database context an audit needs.
 * Returns a formatted string ready to be appended to the prompt.
 */
export async function getAuditData(auditId: string, ticker: string): Promise<string> {
  const tickerModules = AUDIT_MODULES[auditId]?.[ticker];
  const tickerLoaders = MODULE_LOADERS[ticker];

  if (!tickerModules || !tickerLoaders) return '';

  const sections = (
    await Promise.all(
      tickerModules.map(async (moduleName) => {
        const loader = tickerLoaders[moduleName];
        if (!loader) return null;
        const mod = await loader();
        return serializeModule(moduleName, mod);
      }),
    )
  ).filter((s): s is string => s !== null);

  return [
    `DATABASE SNAPSHOT — ${ticker.toUpperCase()}`,
    '═'.repeat(60),
    '',
    ...sections,
  ].join('\n\n');
}
