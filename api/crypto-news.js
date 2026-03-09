// api/crypto-news.js
// Unified proxy for crypto/digital-asset press releases via QuoteMedia/AccessWire
// Supports: MSTR, MARA, RIOT, CLSK, FRMM (prev ETHZ), COIN
// Usage: /api/crypto-news?ticker=MSTR
// Filters to official company releases only (wire services + headline match)
// Cache: 5 minutes per ticker

const caches = {};
const CACHE_TTL = 5 * 60 * 1000;

const OFFICIAL_SOURCES = ['pr newswire', 'business wire', 'globe newswire', 'globenewswire', 'accesswire', 'canada newswire'];

// Per-ticker config: QM topics to query and headline regex filters
const TICKER_CONFIG = {
  MSTR: {
    topics: ['MSTR'],
    filter: (hl) => /\bstrategy\b/i.test(hl) || /microstrategy/i.test(hl) || /\bmstr\b/i.test(hl),
  },
  MARA: {
    topics: ['MARA'],
    filter: (hl) => /marathon\s*digital/i.test(hl) || /\bmara\b/i.test(hl) || /marathon\s*holdings/i.test(hl),
  },
  RIOT: {
    topics: ['RIOT'],
    filter: (hl) => /riot\s*platforms/i.test(hl) || /\briot\b/i.test(hl),
  },
  CLSK: {
    topics: ['CLSK'],
    filter: (hl) => /cleanspark/i.test(hl) || /\bclsk\b/i.test(hl),
  },
  FRMM: {
    topics: ['FRMM', 'ETHZ'],  // query both old and new ticker
    filter: (hl) => /forum\s*markets/i.test(hl) || /ether\s*capital/i.test(hl) || /\bfrmm\b/i.test(hl) || /\bethz\b/i.test(hl),
  },
  COIN: {
    topics: ['COIN'],
    filter: (hl) => /coinbase/i.test(hl) || /\bcoin\b/i.test(hl),
  },
};

async function fetchQM(topic) {
  const url =
    'https://www.accesswire.com/qm/data/getHeadlines.json' +
    `?topics=${topic}` +
    '&excludeTopics=NONCOMPANY' +
    '&noSrc=qmr' +
    '&src=pzo,bayaw,prn,bwi,TheNewsWire,nfil,actw,irw,acn,cnw,nwd,glpr,nwmw' +
    '&summary=true&summLen=300&thumbnailurl=true' +
    '&start=1000-01-01&end=3000-01-01';

  const upstream = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; StockingsBot/1.0)' },
  });
  if (!upstream.ok) return [];
  const raw = await upstream.json();
  const json = typeof raw === 'string' ? JSON.parse(raw) : raw;
  return json?.results?.news?.[0]?.newsitem ?? [];
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const ticker = (req.query.ticker || '').toUpperCase();
  const config = TICKER_CONFIG[ticker];
  if (!config) {
    return res.status(400).json({
      error: `Unknown ticker: ${ticker}. Supported: ${Object.keys(TICKER_CONFIG).join(', ')}`,
    });
  }

  const now = Date.now();
  const cached = caches[ticker];
  if (cached && now - cached.ts < CACHE_TTL) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-Cache', 'HIT');
    return res.status(200).send(cached.payload);
  }

  try {
    // Fetch all topics for this ticker in parallel (FRMM queries both FRMM + ETHZ)
    const results = await Promise.all(config.topics.map(fetchQM));
    const allItems = results.flat();

    // Filter to official wire service releases mentioning the company
    const filtered = allItems.filter((item) => {
      const src = (item.source || '').toLowerCase();
      const hl = (item.headline || '').toLowerCase();
      return (
        OFFICIAL_SOURCES.some((s) => src.includes(s)) &&
        config.filter(hl)
      );
    });

    // Deduplicate by permalink
    const seen = new Set();
    const deduped = filtered.filter((item) => {
      const key = item.permalink || item.newsid;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    const payload = JSON.stringify(deduped);
    caches[ticker] = { payload, ts: now };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-Cache', 'MISS');
    res.setHeader('X-Total-Raw', allItems.length);
    res.setHeader('X-Total-Filtered', deduped.length);
    return res.status(200).send(payload);
  } catch (err) {
    console.error(`crypto-news error (${ticker}):`, err);
    return res.status(500).json({ error: err.message });
  }
}
