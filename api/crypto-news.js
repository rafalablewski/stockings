// api/crypto-news.js
// Unified proxy for crypto/digital-asset press releases via QuoteMedia/AccessWire
// Supports: MSTR, MARA, RIOT, CLSK, FRMM (prev ETHZ), COIN
// Usage: /api/crypto-news?ticker=MSTR
// Filters to official company releases only (wire services + headline match)
// FRMM: TSX-listed, not in QuoteMedia — uses direct IR page scrape + GlobeNewsWire
// Cache: 5 minutes per ticker

const caches = {};
const CACHE_TTL = 5 * 60 * 1000;

const OFFICIAL_SOURCES = ['pr newswire', 'business wire', 'globe newswire', 'globenewswire', 'accesswire', 'canada newswire', 'newsfile'];

const BROWSER_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
};

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
    topics: ['FRMM', 'ETHZ'],
    filter: (hl) => /forum\s*markets/i.test(hl) || /ether\s*capital/i.test(hl) || /\bfrmm\b/i.test(hl) || /\bethz\b/i.test(hl),
    // FRMM is TSX-listed (Canadian) — QM may not index it; use IR page + GlobeNewsWire fallback
    irUrl: 'https://ir.forum-markets.com/news-events/press-releases',
    gnwSearch: ['Forum+Markets', 'Ether+Capital'],
  },
  COIN: {
    topics: ['COIN'],
    filter: (hl) => /coinbase/i.test(hl) || /\bcoin\b/i.test(hl),
  },
};

// ─── QuoteMedia/AccessWire fetch ───

async function fetchQM(topic) {
  const url =
    'https://www.accesswire.com/qm/data/getHeadlines.json' +
    `?topics=${topic}` +
    '&excludeTopics=NONCOMPANY' +
    '&noSrc=qmr' +
    '&src=pzo,bayaw,prn,bwi,TheNewsWire,nfil,actw,irw,acn,cnw,nwd,glpr,nwmw' +
    '&summary=true&summLen=300&thumbnailurl=true' +
    '&start=1000-01-01&end=3000-01-01';

  try {
    const upstream = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; StockingsBot/1.0)' },
      signal: AbortSignal.timeout(8000),
    });
    if (!upstream.ok) return [];
    const raw = await upstream.json();
    const json = typeof raw === 'string' ? JSON.parse(raw) : raw;
    return json?.results?.news?.[0]?.newsitem ?? [];
  } catch {
    return [];
  }
}

// ─── Direct IR page scrape (for FRMM / sites not in QM) ───

function decodeEntities(str) {
  return (str || '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'")
    .replace(/&#8217;/g, '\u2019').replace(/&#8220;/g, '\u201C')
    .replace(/&#8221;/g, '\u201D').replace(/&#8211;/g, '\u2013')
    .replace(/&nbsp;/g, ' ');
}

function stripTags(str) {
  return (str || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function extractDateFromContext(html, idx) {
  const start = Math.max(0, idx - 500);
  const end = Math.min(html.length, idx + 1000);
  const ctx = html.slice(start, end);
  const patterns = [
    /(\d{4}-\d{2}-\d{2})/,
    /(\w+ \d{1,2},?\s*\d{4})/,
    /(\d{1,2}\/\d{1,2}\/\d{4})/,
  ];
  for (const p of patterns) {
    const m = ctx.match(p);
    if (m) {
      try {
        const d = new Date(m[1]);
        if (!isNaN(d.getTime())) return d.toISOString();
      } catch { /* skip */ }
    }
  }
  return '';
}

async function fetchIRPage(irUrl) {
  try {
    const res = await fetch(irUrl, {
      headers: BROWSER_HEADERS,
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return [];
    const html = await res.text();
    const items = [];
    const origin = new URL(irUrl).origin;

    // Pattern 1: press-release/news-release links (common IR platforms)
    const linkRe = /<a[^>]+href=["']([^"']*(?:press-release|news-release|press_release|news\/)[^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
    let m;
    while ((m = linkRe.exec(html)) !== null && items.length < 30) {
      const href = m[1];
      const text = decodeEntities(stripTags(m[2]));
      if (!text || text.length < 10) continue;
      const url = href.startsWith('http') ? href : `${origin}${href.startsWith('/') ? '' : '/'}${href}`;
      const datetime = extractDateFromContext(html, m.index);
      items.push({
        newsid: `frmm-ir-${items.length}`,
        headline: text,
        datetime: datetime || new Date().toISOString(),
        source: 'Investor Relations',
        permalink: url,
        storyurl: url,
        _source: 'ir-scrape',
      });
    }

    // Pattern 2: Generic anchor links in article/listing containers
    if (items.length === 0) {
      const genericRe = /<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
      while ((m = genericRe.exec(html)) !== null && items.length < 30) {
        const href = m[1];
        const text = decodeEntities(stripTags(m[2]));
        if (!text || text.length < 20) continue;
        // Skip navigation/footer links
        if (/^\s*(home|about|contact|privacy|terms|login|sign|menu|nav)/i.test(text)) continue;
        if (href.includes('#') && !href.includes('/')) continue;
        const url = href.startsWith('http') ? href : `${origin}${href.startsWith('/') ? '' : '/'}${href}`;
        const datetime = extractDateFromContext(html, m.index);
        items.push({
          newsid: `frmm-ir-${items.length}`,
          headline: text,
          datetime: datetime || new Date().toISOString(),
          source: 'Investor Relations',
          permalink: url,
          storyurl: url,
          _source: 'ir-scrape',
        });
      }
    }

    return items;
  } catch (e) {
    console.warn(`[crypto-news] IR page scrape failed for ${irUrl}:`, e.message);
    return [];
  }
}

// ─── GlobeNewsWire search scrape ───

async function fetchGlobeNewsWire(searchTerms) {
  const items = [];
  for (const term of searchTerms) {
    try {
      // GlobeNewsWire search page
      const url = `https://www.globenewswire.com/search/keyword/${encodeURIComponent(term)}`;
      const res = await fetch(url, {
        headers: BROWSER_HEADERS,
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) continue;
      const html = await res.text();

      // GNW search results: links containing /news-release/
      const linkRe = /<a[^>]+href=["'](\/news-release\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
      let m;
      while ((m = linkRe.exec(html)) !== null && items.length < 30) {
        const href = m[1];
        const text = decodeEntities(stripTags(m[2]));
        if (!text || text.length < 10) continue;
        const fullUrl = `https://www.globenewswire.com${href}`;

        // Extract date from URL pattern: /news-release/2026/03/07/
        const dateMatch = href.match(/\/news-release\/(\d{4})\/(\d{2})\/(\d{2})\//);
        const datetime = dateMatch
          ? new Date(`${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}`).toISOString()
          : '';

        items.push({
          newsid: `frmm-gnw-${items.length}`,
          headline: text,
          datetime: datetime || new Date().toISOString(),
          source: 'GlobeNewsWire',
          permalink: fullUrl,
          storyurl: fullUrl,
          _source: 'gnw-search',
        });
      }
    } catch (e) {
      console.warn(`[crypto-news] GNW search failed for "${term}":`, e.message);
    }
  }
  return items;
}

// ─── Newsfile Corp search (common Canadian wire service) ───

async function fetchNewsfile(searchTerms) {
  const items = [];
  for (const term of searchTerms) {
    try {
      const url = `https://www.newsfilecorp.com/search?query=${encodeURIComponent(term)}`;
      const res = await fetch(url, {
        headers: BROWSER_HEADERS,
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) continue;
      const html = await res.text();

      // Newsfile links: /release/ pattern
      const linkRe = /<a[^>]+href=["']((?:https:\/\/www\.newsfilecorp\.com)?\/release\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
      let m;
      while ((m = linkRe.exec(html)) !== null && items.length < 30) {
        const href = m[1];
        const text = decodeEntities(stripTags(m[2]));
        if (!text || text.length < 10) continue;
        const fullUrl = href.startsWith('http') ? href : `https://www.newsfilecorp.com${href}`;
        const datetime = extractDateFromContext(html, m.index);

        items.push({
          newsid: `frmm-nf-${items.length}`,
          headline: text,
          datetime: datetime || new Date().toISOString(),
          source: 'Newsfile Corp',
          permalink: fullUrl,
          storyurl: fullUrl,
          _source: 'newsfile',
        });
      }
    } catch (e) {
      console.warn(`[crypto-news] Newsfile search failed for "${term}":`, e.message);
    }
  }
  return items;
}

// ─── Deduplication ───

function dedupe(items) {
  const seenUrl = new Set();
  const seenHl = new Set();
  const out = [];
  for (const item of items) {
    const kh = (item.headline || '').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 80);
    const ku = (item.permalink || '').split('?')[0].toLowerCase().replace(/\/+$/, '');
    if (!kh || kh.length < 4) continue;
    if (seenHl.has(kh) || (ku && seenUrl.has(ku))) continue;
    seenHl.add(kh);
    if (ku) seenUrl.add(ku);
    out.push(item);
  }
  return out;
}

// ─── Main handler ───

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
    // Fetch from QuoteMedia for all tickers
    const qmResults = await Promise.all(config.topics.map(fetchQM));
    let allItems = qmResults.flat();

    // Filter QM results to official wire service releases mentioning the company
    const qmFiltered = allItems.filter((item) => {
      const src = (item.source || '').toLowerCase();
      const hl = (item.headline || '').toLowerCase();
      return (
        OFFICIAL_SOURCES.some((s) => src.includes(s)) &&
        config.filter(hl)
      );
    });

    let finalItems = qmFiltered;

    // FRMM fallback: if QM returned few/no results, try IR page + GlobeNewsWire + Newsfile
    if (config.irUrl && finalItems.length < 3) {
      console.log(`[crypto-news] QM returned ${finalItems.length} for ${ticker}, trying IR/GNW/Newsfile fallbacks`);

      const [irItems, gnwItems, nfItems] = await Promise.allSettled([
        fetchIRPage(config.irUrl),
        config.gnwSearch ? fetchGlobeNewsWire(config.gnwSearch) : Promise.resolve([]),
        config.gnwSearch ? fetchNewsfile(config.gnwSearch) : Promise.resolve([]),
      ]);

      const irResults = irItems.status === 'fulfilled' ? irItems.value : [];
      const gnwResults = gnwItems.status === 'fulfilled' ? gnwItems.value : [];
      const nfResults = nfItems.status === 'fulfilled' ? nfItems.value : [];

      // Apply the same company-name headline filter to all fallback results
      const filterFallback = (items) => items.filter((item) => {
        const hl = (item.headline || '').toLowerCase();
        // Must mention the company AND have a meaningful headline (not nav links)
        return hl.length >= 20 && config.filter(hl);
      });

      // Merge all sources: QM results first, then filtered fallbacks
      finalItems = [
        ...qmFiltered,
        ...filterFallback(irResults),
        ...filterFallback(gnwResults),
        ...filterFallback(nfResults),
      ];
    }

    // Deduplicate
    const deduped = dedupe(finalItems);

    // Sort newest first
    deduped.sort((a, b) => {
      const da = new Date(b.datetime || 0).getTime();
      const db = new Date(a.datetime || 0).getTime();
      return da - db;
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
