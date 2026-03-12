// api/press-intelligence.js
// Unified press-release proxy for all 38 tickers
// Usage: /api/press-intelligence?ticker=ASTS
// Supported: ASTS, BMNR, IRDM, GSAT, VZ, T, AMZLEO, LYNK,
//            MSTR, MARA, RIOT, CLSK, FRMM, COIN, HUT, IREN, NBIS, VSAT, RKLB, SATS, LUNR,
//            MA, V, SOFI, AXP, AFRM, SEZL, SQ, PYPL, UPST, HOOD, GLXY, BITF,
//            BLK, HSBC, C, CME, ICE, VOD, ORAN, TU, BCE, AMT, RKUNF, GOOGL

const { neon } = require('@neondatabase/serverless');

// No in-memory cache — DB is the source of truth

// ═══════════════════════════════════════════════════════════════════════════
//  DATABASE PERSISTENCE — stores every press release permanently
// ═══════════════════════════════════════════════════════════════════════════

let _sql = null;
function getSQL() {
  if (!_sql) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      console.error('press-intelligence: DATABASE_URL is not set!');
      return null;
    }
    _sql = neon(url);
  }
  return _sql;
}

// ---------------------------------------------------------------------------
// ensureTable — creates press_releases if it doesn't exist.
// Uses the raw neon() HTTP driver (same pattern as seen-articles).
// ---------------------------------------------------------------------------
let _tableVerified = false;

async function ensureTable() {
  if (_tableVerified) return;

  const sql = getSQL();
  if (!sql) return;

  try {
    await sql`CREATE TABLE IF NOT EXISTS press_releases (
      id SERIAL PRIMARY KEY,
      ticker TEXT NOT NULL,
      headline_hash TEXT NOT NULL,
      headline TEXT NOT NULL,
      datetime TIMESTAMPTZ NOT NULL,
      source TEXT,
      summary TEXT,
      permalink TEXT,
      storyurl TEXT,
      newsid TEXT,
      internal_source TEXT,
      fetch_count INTEGER NOT NULL DEFAULT 1,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      last_seen_at TIMESTAMP DEFAULT NOW() NOT NULL
    )`;

    await sql`CREATE UNIQUE INDEX IF NOT EXISTS press_releases_ticker_hash_idx
      ON press_releases (ticker, headline_hash)`;

    await sql`CREATE INDEX IF NOT EXISTS press_releases_ticker_idx
      ON press_releases (ticker)`;

    await sql`CREATE INDEX IF NOT EXISTS press_releases_ticker_datetime_idx
      ON press_releases (ticker, datetime)`;

    _tableVerified = true;
    console.log('press-intelligence: press_releases table verified/created');
  } catch (err) {
    console.error('press-intelligence: ensureTable failed:', err.message);
  }
}

/**
 * Upsert fresh items into press_releases table.
 * On conflict (ticker + headline_hash), bump fetch_count and last_seen_at.
 */
async function persistItems(ticker, items) {
  const sql = getSQL();
  if (!sql || items.length === 0) return 0;

  const validItems = items.filter(item => {
    const hlHash = normalizeHl(item.headline);
    return hlHash && hlHash.length >= 4;
  });
  if (validItems.length === 0) return 0;

  const queries = validItems.map(item => {
    const hlHash = normalizeHl(item.headline);
    return sql`
      INSERT INTO press_releases (ticker, headline_hash, headline, datetime, source, summary, permalink, storyurl, newsid, internal_source)
      VALUES (${ticker}, ${hlHash}, ${item.headline || ''}, ${item.datetime || ''}, ${item.source || ''}, ${(item.qmsummary || item.summary || '').slice(0, 2000)}, ${item.permalink || ''}, ${item.storyurl || ''}, ${item.newsid || ''}, ${item._source || ''})
      ON CONFLICT (ticker, headline_hash)
      DO UPDATE SET fetch_count = press_releases.fetch_count + 1, last_seen_at = NOW()
    `;
  });

  try {
    await sql.transaction(queries);
    console.log(`press-intelligence: persisted ${queries.length} items for ${ticker}`);
    return queries.length;
  } catch (err) {
    console.error(`press-intelligence DB persist error (${ticker}):`, err.message);
    return 0;
  }
}

/**
 * Load all stored press releases for a ticker from the database.
 * Returns items in the same shape as upstream fetchers.
 */
async function loadFromDB(ticker) {
  const sql = getSQL();
  if (!sql) {
    console.error(`press-intelligence loadFromDB(${ticker}): no SQL connection`);
    return [];
  }

  try {
    const rows = await sql`
      SELECT headline, datetime, source, summary AS qmsummary, permalink, storyurl, newsid, internal_source
      FROM press_releases
      WHERE ticker = ${ticker}
      ORDER BY datetime DESC
      LIMIT 1000
    `;
    console.log(`press-intelligence loadFromDB(${ticker}): ${rows.length} rows`);
    return rows.map(r => ({
      newsid: r.newsid || '',
      headline: r.headline,
      datetime: r.datetime,
      source: r.source || '',
      qmsummary: r.qmsummary || '',
      permalink: r.permalink || '',
      storyurl: r.storyurl || '',
      _source: r.internal_source || 'db',
    }));
  } catch (err) {
    console.error(`press-intelligence DB load error (${ticker}):`, err.message);
    return [];
  }
}

const BROWSER_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
};

// ═══════════════════════════════════════════════════════════════════════════
//  SHARED UTILITIES
// ═══════════════════════════════════════════════════════════════════════════

function decode(str) {
  return (str || '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'")
    .replace(/&#039;/g, "'")
    .replace(/&#8217;/g, '\u2019').replace(/&#8216;/g, '\u2018')
    .replace(/&#8220;/g, '\u201C').replace(/&#8221;/g, '\u201D')
    .replace(/&#8211;/g, '\u2013').replace(/&#8230;/g, '\u2026')
    .replace(/&#x2013;/g, '\u2013').replace(/&#x2014;/g, '\u2014')
    .replace(/&#xAE;/g, '\u00AE').replace(/&#x2122;/g, '\u2122')
    .replace(/&#x2019;/g, '\u2019').replace(/&#x2018;/g, '\u2018')
    .replace(/&#x201C;/g, '\u201C').replace(/&#x201D;/g, '\u201D')
    .replace(/&nbsp;/g, ' ')
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .trim();
}

function strip(str) {
  return (str || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function normalizeHl(h) {
  return (h || '').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 80);
}

function dedupe(items) {
  const now = Date.now();
  const seenUrl = new Set();
  const seenHl = new Set();
  const out = [];
  for (const item of items) {
    const kh = normalizeHl(item.headline);
    const ku = (item.permalink || '').split('?')[0].toLowerCase().replace(/\/+$/, '');
    if (!kh || kh.length < 4) continue;
    if (new Date(item.datetime).getTime() > now + 7 * 24 * 60 * 60 * 1000) continue;
    if (new Date(item.datetime).getTime() > now) item.isUpcoming = true;
    if (seenHl.has(kh) || (ku && seenUrl.has(ku))) continue;
    seenHl.add(kh);
    if (ku) seenUrl.add(ku);
    out.push(item);
  }
  out.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
  return out;
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

// ═══════════════════════════════════════════════════════════════════════════
//  SHARED FETCHERS
// ═══════════════════════════════════════════════════════════════════════════

// ─── QuoteMedia / AccessWire ───

async function fetchQM(topic) {
  const url =
    'https://www.accesswire.com/qm/data/getHeadlines.json' +
    `?topics=${encodeURIComponent(topic)}` +
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

// ─── RSS/Atom parsing ───

function parseRssXml(xml) {
  const items = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = itemRe.exec(xml)) !== null && items.length < 30) {
    const block = m[1];
    const title = decode(strip(block.match(/<title>([\s\S]*?)<\/title>/)?.[1] || ''));
    const link = strip(block.match(/<link>([\s\S]*?)<\/link>/)?.[1] || '');
    const pubDate = strip(block.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] || '');
    const desc = decode(strip(block.match(/<description>([\s\S]*?)<\/description>/)?.[1] || '')).slice(0, 300);
    if (!title || title.length < 10) continue;
    let datetime = '';
    if (pubDate) {
      try { datetime = new Date(pubDate).toISOString(); } catch { /* skip */ }
    }
    items.push({
      newsid: `gnw-rss-${items.length}`,
      headline: title,
      datetime: datetime || new Date().toISOString(),
      source: 'GlobeNewsWire RSS',
      qmsummary: desc,
      permalink: link,
      storyurl: link,
      _source: 'gnw-rss',
    });
  }
  return items;
}

function parseAtomXml(xml) {
  const items = [];
  const entryRe = /<entry>([\s\S]*?)<\/entry>/g;
  let m;
  while ((m = entryRe.exec(xml)) !== null && items.length < 30) {
    const block = m[1];
    const title = decode(strip(block.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1] || ''));
    const link = block.match(/<link[^>]+href=["']([^"']+)["']/)?.[1] || '';
    const updated = strip(block.match(/<(?:published|updated)>([\s\S]*?)<\/(?:published|updated)>/)?.[1] || '');
    const summary = decode(strip(block.match(/<(?:summary|content)[^>]*>([\s\S]*?)<\/(?:summary|content)>/)?.[1] || '')).slice(0, 300);
    if (!title || title.length < 10) continue;
    let datetime = '';
    if (updated) {
      try { datetime = new Date(updated).toISOString(); } catch { /* skip */ }
    }
    items.push({
      newsid: `gnw-atom-${items.length}`,
      headline: title,
      datetime: datetime || new Date().toISOString(),
      source: 'GlobeNewsWire',
      qmsummary: summary,
      permalink: link,
      storyurl: link,
      _source: 'gnw-atom',
    });
  }
  return items;
}

// ─── GlobeNewsWire RSS (direct wire service) ───

async function fetchGnwRss(keywords) {
  const items = [];
  for (const keyword of keywords) {
    const urls = [
      `https://www.globenewswire.com/RssFeed/searchresults/keyword/${encodeURIComponent(keyword)}/feedTitle/GlobeNewsWire`,
      `https://www.globenewswire.com/AtomFeed/keyword/${encodeURIComponent(keyword)}`,
    ];
    for (const url of urls) {
      try {
        const res = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; StockingsBot/1.0)',
            'Accept': 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*',
          },
          signal: AbortSignal.timeout(8000),
        });
        if (!res.ok) continue;
        const xml = await res.text();
        if (xml.includes('<item>')) {
          items.push(...parseRssXml(xml));
        } else if (xml.includes('<entry>')) {
          items.push(...parseAtomXml(xml));
        }
        if (items.length > 0) break;
      } catch (e) {
        console.warn(`[press-intelligence] GNW RSS failed for "${url}":`, e.message);
      }
    }
    if (items.length > 0) break;
  }
  return items;
}

// ─── Stock Titan ───

async function fetchStockTitan(slugs) {
  const items = [];
  for (const slug of slugs) {
    try {
      const url = `https://www.stocktitan.net/news/${slug}/`;
      const res = await fetch(url, {
        headers: BROWSER_HEADERS,
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) continue;
      const html = await res.text();
      const linkRe = /<a[^>]+href=["']((?:https:\/\/www\.stocktitan\.net)?\/news\/[^"']+\.html)["'][^>]*>([\s\S]*?)<\/a>/gi;
      let m;
      while ((m = linkRe.exec(html)) !== null && items.length < 30) {
        const href = m[1];
        const text = decode(strip(m[2]));
        if (!text || text.length < 15) continue;
        if (/view all|see more|read more|load more/i.test(text)) continue;
        const fullUrl = href.startsWith('http') ? href : `https://www.stocktitan.net${href}`;
        const datetime = extractDateFromContext(html, m.index);
        items.push({
          newsid: `stocktitan-${items.length}`,
          headline: text,
          datetime: datetime || new Date().toISOString(),
          source: 'Stock Titan',
          permalink: fullUrl,
          storyurl: fullUrl,
          _source: 'stocktitan',
        });
      }
      if (items.length > 0) break;
    } catch (e) {
      console.warn(`[press-intelligence] Stock Titan failed for "${slug}":`, e.message);
    }
  }
  return items;
}

// ─── Notified Platform RSS ───

async function fetchNotifiedRss(rssUrls) {
  for (const url of rssUrls) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; StockingsBot/1.0)',
          'Accept': 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*',
        },
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) continue;
      const xml = await res.text();
      let items = [];
      if (xml.includes('<item>')) items = parseRssXml(xml);
      else if (xml.includes('<entry>')) items = parseAtomXml(xml);
      for (const item of items) {
        item.source = 'Investor Relations';
        item._source = 'notified-rss';
      }
      if (items.length > 0) return items;
    } catch (e) {
      console.warn(`[press-intelligence] Notified RSS failed for "${url}":`, e.message);
    }
  }
  return [];
}

// ─── Direct IR page HTML scrape ───

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
    const linkRe = /<a[^>]+href=["']([^"']*(?:press-release|news-release|press_release|\/detail\/|\/news\/)[^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
    let m;
    while ((m = linkRe.exec(html)) !== null && items.length < 30) {
      const href = m[1];
      const text = decode(strip(m[2]));
      if (!text || text.length < 20) continue;
      const url = href.startsWith('http') ? href : `${origin}${href.startsWith('/') ? '' : '/'}${href}`;
      const datetime = extractDateFromContext(html, m.index);
      items.push({
        newsid: `ir-${items.length}`,
        headline: text,
        datetime: datetime || new Date().toISOString(),
        source: 'Investor Relations',
        permalink: url,
        storyurl: url,
        _source: 'ir-scrape',
      });
    }
    return items;
  } catch (e) {
    console.warn(`[press-intelligence] IR scrape failed for ${irUrl}:`, e.message);
    return [];
  }
}

// ═══════════════════════════════════════════════════════════════════════════
//  TICKER CONFIGURATIONS
// ═══════════════════════════════════════════════════════════════════════════

const OFFICIAL_SOURCES = ['pr newswire', 'business wire', 'globe newswire', 'globenewswire', 'accesswire', 'canada newswire', 'newsfile', 'investor relations', 'globenewswire rss', 'stock titan'];

const TICKER_CONFIG = {
  // ─── Simple QM tickers ───
  ASTS: {
    type: 'qm-simple',
    topics: ['ASTS'],
    sources: ['business wire'],
    filter: (hl) => /ast\s*spacemobile|asts/i.test(hl),
  },
  BMNR: {
    type: 'qm-simple',
    topics: ['BMNR'],
    sources: ['pr newswire', 'prnewswire', 'business wire', 'accesswire', 'globe newswire'],
    filter: (hl) => /bitmine|bmnr|bit\s*mine/i.test(hl),
  },
  IRDM: {
    type: 'qm-simple',
    topics: ['IRDM'],
    sources: ['pr newswire', 'canada newswire', 'business wire'],
    filter: (hl) => /iridium/i.test(hl),
  },
  GSAT: {
    type: 'qm-simple',
    topics: ['GSAT'],
    sources: ['business wire', 'pr newswire', 'canada newswire'],
    filter: (hl) => /globalstar/i.test(hl),
  },
  VZ: {
    type: 'qm-simple',
    topics: ['VZ'],
    sources: ['globenewswire', 'pr newswire', 'business wire'],
    filter: (hl) => /verizon/i.test(hl),
  },
  VSAT: {
    type: 'qm-simple',
    topics: ['VSAT'],
    sources: ['business wire', 'pr newswire', 'globe newswire', 'globenewswire'],
    filter: (hl) => /viasat/i.test(hl),
  },
  RKLB: {
    type: 'qm-simple',
    topics: ['RKLB'],
    sources: ['business wire', 'pr newswire', 'globe newswire', 'globenewswire'],
    filter: (hl) => /rocket\s*lab|rklb/i.test(hl),
  },
  SATS: {
    type: 'qm-simple',
    topics: ['SATS'],
    sources: ['business wire', 'pr newswire', 'globe newswire', 'globenewswire', 'accesswire'],
    filter: (hl) => /echostar|sats|hughes/i.test(hl),
  },
  LUNR: {
    type: 'qm-simple',
    topics: ['LUNR'],
    sources: ['business wire', 'pr newswire', 'globe newswire', 'globenewswire'],
    filter: (hl) => /intuitive\s*machines|lunr/i.test(hl),
  },

  MSTR: {
    type: 'qm-simple',
    topics: ['MSTR'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /\bstrategy\b/i.test(hl) || /microstrategy/i.test(hl) || /\bmstr\b/i.test(hl),
  },
  MARA: {
    type: 'qm-simple',
    topics: ['MARA'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /marathon\s*digital/i.test(hl) || /\bmara\b/i.test(hl) || /marathon\s*holdings/i.test(hl),
  },
  RIOT: {
    type: 'qm-simple',
    topics: ['RIOT'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /riot\s*platforms/i.test(hl) || /\briot\b/i.test(hl),
  },
  CLSK: {
    type: 'qm-simple',
    topics: ['CLSK'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /cleanspark/i.test(hl) || /\bclsk\b/i.test(hl),
  },
  HUT: {
    type: 'qm-simple',
    topics: ['HUT'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /hut\s*8|hut8|\bhut\b/i.test(hl),
  },
  IREN: {
    type: 'qm-simple',
    topics: ['IREN'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /\biren\b|iris\s*energy/i.test(hl),
  },
  NBIS: {
    type: 'qm-simple',
    topics: ['NBIS'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /\bnbis\b|nebius/i.test(hl),
  },
  COIN: {
    type: 'qm-simple',
    topics: ['COIN'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /coinbase/i.test(hl) || /\bcoin\b/i.test(hl),
  },
  FRMM: {
    type: 'crypto',
    topics: ['FRMM', 'ETHZ'],
    filter: (hl) => /forum\s*markets/i.test(hl) || /\bforum\b/i.test(hl) || /ethzilla/i.test(hl) || /\bfrmm\b/i.test(hl) || /\bethz\b/i.test(hl),
    irUrl: 'https://ir.forum-markets.com/news-events/press-releases',
    stockTitanSlugs: ['ETHZ', 'FRMM'],
    gnwRssKeywords: ['ETHZilla', 'Forum Markets'],
    notifiedApiUrls: [
      'https://ir.forum-markets.com/rss/news-releases.xml',
      'https://ir.forum-markets.com/rss/press-releases.xml',
    ],
  },

  // ─── Fintech & Payments ───
  MA: {
    type: 'qm-simple',
    topics: ['MA'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /mastercard/i.test(hl) || /\bma\b/i.test(hl),
  },
  V: {
    type: 'qm-simple',
    topics: ['V'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /\bvisa\b/i.test(hl),
  },
  SOFI: {
    type: 'qm-simple',
    topics: ['SOFI'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /sofi/i.test(hl),
  },
  AXP: {
    type: 'qm-simple',
    topics: ['AXP'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /american\s*express/i.test(hl) || /\bamex\b/i.test(hl) || /\baxp\b/i.test(hl),
  },
  AFRM: {
    type: 'qm-simple',
    topics: ['AFRM'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /affirm/i.test(hl) || /\bafrm\b/i.test(hl),
    stockTitanSlugs: ['AFRM'],
    irUrl: 'https://investors.affirm.com/news-events/all-news',
    notifiedApiUrls: [
      'https://investors.affirm.com/rss/news-releases.xml',
      'https://investors.affirm.com/rss/press-releases.xml',
    ],
  },
  SEZL: {
    type: 'qm-simple',
    topics: ['SEZL'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /sezzle/i.test(hl) || /\bsezl\b/i.test(hl),
  },
  SQ: {
    type: 'qm-simple',
    topics: ['SQ', 'XYZ'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /\bblock\b/i.test(hl) || /\bsquare\b/i.test(hl) || /cash\s*app/i.test(hl) || /\bsq\b/i.test(hl) || /\bxyz\b/i.test(hl),
    stockTitanSlugs: ['XYZ', 'SQ'],
    irUrl: 'https://investors.block.xyz/investor-news/default.aspx',
  },
  PYPL: {
    type: 'qm-simple',
    topics: ['PYPL'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /paypal/i.test(hl) || /\bpypl\b/i.test(hl) || /venmo/i.test(hl),
  },
  UPST: {
    type: 'qm-simple',
    topics: ['UPST'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /upstart/i.test(hl) || /\bupst\b/i.test(hl),
    stockTitanSlugs: ['UPST'],
    irUrl: 'https://ir.upstart.com/news-and-events/news-releases',
    notifiedApiUrls: ['https://ir.upstart.com/rss/news-releases.xml'],
  },
  HOOD: {
    type: 'qm-simple',
    topics: ['HOOD'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /robinhood/i.test(hl) || /\bhood\b/i.test(hl),
    stockTitanSlugs: ['HOOD'],
    irUrl: 'https://investors.robinhood.com/press-releases',
    notifiedApiUrls: ['https://investors.robinhood.com/rss/news-releases.xml'],
  },

  // ─── Digital Assets (new) ───
  GLXY: {
    type: 'qm-simple',
    topics: ['GLXY'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /galaxy\s*digital/i.test(hl) || /\bglxy\b/i.test(hl) || /galaxy\s*(?:asset|fund)/i.test(hl),
    stockTitanSlugs: ['GLXY'],
    irUrl: 'https://investor.galaxy.com/',
  },
  BITF: {
    type: 'qm-simple',
    topics: ['BITF'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /bitfarms/i.test(hl) || /\bbitf\b/i.test(hl),
    gnwRssKeywords: ['Bitfarms'],
    stockTitanSlugs: ['BITF'],
    irUrl: 'https://investor.bitfarms.com/news-events/press-releases',
    notifiedApiUrls: ['https://investor.bitfarms.com/rss/news-releases.xml'],
  },

  // ─── Financial Services ───
  BLK: {
    type: 'qm-simple',
    topics: ['BLK'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /blackrock/i.test(hl) || /\bblk\b/i.test(hl),
    irUrl: 'https://ir.blackrock.com/news-and-events/press-releases/default.aspx',
  },
  HSBC: {
    type: 'qm-simple',
    topics: ['HSBC'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /hsbc/i.test(hl),
  },
  C: {
    type: 'qm-simple',
    topics: ['C'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /citigroup/i.test(hl) || /\bciti\b/i.test(hl) || /citibank/i.test(hl),
    irUrl: 'https://www.citigroup.com/global/news/press-release',
  },
  CME: {
    type: 'qm-simple',
    topics: ['CME'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /cme\s*group/i.test(hl) || /\bcme\b/i.test(hl),
  },
  ICE: {
    type: 'qm-simple',
    topics: ['ICE'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /intercontinental\s*exchange/i.test(hl) || /\bice\b/i.test(hl) || /\bnyse\b/i.test(hl),
  },

  // ─── Telecom (new) ───
  VOD: {
    type: 'qm-simple',
    topics: ['VOD'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /vodafone/i.test(hl) || /\bvod\b/i.test(hl),
  },
  ORAN: {
    type: 'qm-simple',
    topics: ['ORAN'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /\borange\b/i.test(hl) && /telecom|network|mobile|5g|fiber|group|s\.a/i.test(hl),
  },
  TU: {
    type: 'qm-simple',
    topics: ['TU'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /telus/i.test(hl) || /\btu\b/i.test(hl),
  },
  BCE: {
    type: 'qm-simple',
    topics: ['BCE'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /\bbce\b/i.test(hl) || (/\bbell\b/i.test(hl) && /canada|media|wireless/i.test(hl)),
    stockTitanSlugs: ['BCE'],
    irUrl: 'https://www.bce.ca/news-and-media/newsroom',
  },

  // ─── Infrastructure & Tech ───
  AMT: {
    type: 'qm-simple',
    topics: ['AMT'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /american\s*tower/i.test(hl) || /\bamt\b/i.test(hl),
    stockTitanSlugs: ['AMT'],
    irUrl: 'https://americantower.gcs-web.com/press-releases',
    notifiedApiUrls: ['https://americantower.gcs-web.com/rss/news-releases.xml'],
  },
  RKUNF: {
    type: 'qm-simple',
    topics: ['RKUNF'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /rakuten/i.test(hl) || /\brkunf\b/i.test(hl),
    irUrl: 'https://global.rakuten.com/corp/news/press/',
  },
  GOOGL: {
    type: 'qm-simple',
    topics: ['GOOGL', 'GOOG'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /alphabet/i.test(hl) || /\bgoogle\b/i.test(hl) || /\bgoogl\b/i.test(hl),
    irUrl: 'https://abc.xyz/investor/news/default.aspx',
  },

  // ─── Complex multi-source tickers ───
  T: { type: 'att' },
  AMZLEO: { type: 'amazon-leo' },
  LYNK: {
    type: 'lynk',
    stockTitanSlugs: ['SLAM'],
    irUrl: 'https://lynk.world/press-releases/',
  },
};

// ═══════════════════════════════════════════════════════════════════════════
//  QM-SIMPLE FETCHER (ASTS, BMNR, IRDM, GSAT, VZ)
// ═══════════════════════════════════════════════════════════════════════════

async function fetchQmSimple(config) {
  const allItems = (await Promise.all(config.topics.map(fetchQM))).flat();
  const filtered = allItems.filter((item) => {
    const src = (item.source || '').toLowerCase();
    const hl = (item.headline || '').toLowerCase();
    return config.sources.some((s) => src.includes(s)) && config.filter(hl);
  });
  let finalItems = dedupe(filtered);

  // Fallback sources when QM returns too few results
  if ((config.gnwRssKeywords || config.irUrl || config.stockTitanSlugs || config.notifiedApiUrls) && finalItems.length < 3) {
    const fallbackPromises = [];
    if (config.stockTitanSlugs) fallbackPromises.push(fetchStockTitan(config.stockTitanSlugs));
    if (config.notifiedApiUrls) fallbackPromises.push(fetchNotifiedRss(config.notifiedApiUrls));
    if (config.gnwRssKeywords) fallbackPromises.push(fetchGnwRss(config.gnwRssKeywords));
    if (config.irUrl) fallbackPromises.push(fetchIRPage(config.irUrl));

    const results = await Promise.allSettled(fallbackPromises);
    const filterFallback = (items) => items.filter((item) => {
      const hl = (item.headline || '').toLowerCase();
      if (hl.length < 15) return false;
      const src = item._source || '';
      if (src === 'stocktitan' || src === 'notified-rss' || src === 'ir-scrape' || src === 'gnw-rss' || src === 'gnw-atom') return true;
      return hl.length >= 20 && config.filter(hl);
    });

    let fallbackItems = [];
    for (const r of results) {
      if (r.status === 'fulfilled' && r.value.length > 0) {
        fallbackItems.push(...filterFallback(r.value));
      }
    }
    finalItems = dedupe([...finalItems, ...fallbackItems]);
  }

  return finalItems;
}

// ═══════════════════════════════════════════════════════════════════════════
//  CRYPTO FETCHER (MSTR, MARA, RIOT, CLSK, COIN, FRMM)
// ═══════════════════════════════════════════════════════════════════════════

async function fetchCrypto(config) {
  const qmResults = await Promise.all(config.topics.map(fetchQM));
  let allItems = qmResults.flat();

  const qmFiltered = allItems.filter((item) => {
    const src = (item.source || '').toLowerCase();
    const hl = (item.headline || '').toLowerCase();
    return OFFICIAL_SOURCES.some((s) => src.includes(s)) && config.filter(hl);
  });

  let finalItems = qmFiltered;

  // Fallback for tickers with extra sources (FRMM)
  if ((config.stockTitanSlugs || config.gnwRssKeywords || config.notifiedApiUrls || config.irUrl) && finalItems.length < 3) {
    const fallbackPromises = [];
    if (config.stockTitanSlugs) fallbackPromises.push(fetchStockTitan(config.stockTitanSlugs));
    if (config.notifiedApiUrls) fallbackPromises.push(fetchNotifiedRss(config.notifiedApiUrls));
    if (config.gnwRssKeywords) fallbackPromises.push(fetchGnwRss(config.gnwRssKeywords));
    if (config.irUrl) fallbackPromises.push(fetchIRPage(config.irUrl));

    const results = await Promise.allSettled(fallbackPromises);

    const filterFallback = (items) => items.filter((item) => {
      const hl = (item.headline || '').toLowerCase();
      if (hl.length < 15) return false;
      const src = item._source || '';
      if (src === 'stocktitan' || src === 'notified-json' || src === 'notified-rss' || src === 'newsfile-company') return true;
      return hl.length >= 20 && config.filter(hl);
    });

    let fallbackItems = [];
    for (const r of results) {
      if (r.status === 'fulfilled' && r.value.length > 0) {
        fallbackItems.push(...filterFallback(r.value));
      }
    }
    finalItems = [...qmFiltered, ...fallbackItems];
  }

  return dedupe(finalItems);
}

// ═══════════════════════════════════════════════════════════════════════════
//  AT&T (T) — 5 sources
// ═══════════════════════════════════════════════════════════════════════════

function parseCorpDate(str) {
  if (!str) return null;
  const s = str.replace(/\b([A-Z]{2,})\b/g, w => w[0] + w.slice(1).toLowerCase()).trim();
  const dmy = s.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (dmy) {
    const d = new Date(`${dmy[2]} ${dmy[1]}, ${dmy[3]}`);
    if (!isNaN(d.getTime())) return d.toISOString();
  }
  const my = s.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (my) {
    const d = new Date(`${my[1]} 1, ${my[2]}`);
    if (!isNaN(d.getTime())) return d.toISOString();
  }
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d.toISOString();
}

const ATT_ARTICLE_DOMAINS = [
  'about.att.com', 'linkedin.com/pulse', 'cybersecurity.att.com',
  'alienvault.com', 'frost.com', 'business.att.com/learn',
];

async function fetchAttQuoteMedia() {
  try {
    const url =
      'https://www.accesswire.com/qm/data/getHeadlines.json' +
      '?topics=T&excludeTopics=NONCOMPANY&noSrc=qmr' +
      '&src=pzo,bayaw,prn,bwi,TheNewsWire,nfil,actw,irw,acn,cnw,nwd,glpr,nwmw' +
      '&summary=true&summLen=300&thumbnailurl=true&start=1000-01-01&end=3000-01-01';
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; StockingsBot/1.0)' },
    });
    if (!res.ok) return { items: [], error: `QM HTTP ${res.status}` };
    const raw = await res.json();
    const json = typeof raw === 'string' ? JSON.parse(raw) : raw;
    const items = json?.results?.news?.[0]?.newsitem ?? [];
    const official = ['pr newswire', 'canada newswire', 'business wire', 'globenewswire'];
    const filtered = items.filter(i => {
      const src = (i.source || '').toLowerCase();
      const hl = (i.headline || '').toLowerCase();
      return official.some(s => src.includes(s)) && (hl.includes('at&t') || hl.includes("at&t's"));
    });
    return { items: filtered.map(i => ({ ...i, _source: 'quotemedia' })), error: null };
  } catch (e) {
    return { items: [], error: e.message };
  }
}

async function fetchAttCorpPR() {
  try {
    const res = await fetch('https://www.corp.att.com/worldwide/att-press-release/', { headers: BROWSER_HEADERS });
    if (!res.ok) return { items: [], error: `Corp PR HTTP ${res.status}` };
    const html = await res.text();
    const h3s = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)]
      .map(m => ({ end: m.index + m[0].length, text: strip(m[1]).trim() }))
      .filter(m => m.text.length > 4 && !/^\d{4}$/.test(m.text) && /\d/.test(m.text) && m.text.length < 40);
    const anchors = [...html.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)]
      .map(m => ({ index: m.index, href: m[1], text: strip(m[2]).trim() }))
      .filter(a => ATT_ARTICLE_DOMAINS.some(d => a.href.includes(d)) && a.text.length > 8);
    const items = [];
    for (const anchor of anchors) {
      let bestH3 = null;
      for (const h3 of h3s) {
        if (h3.end < anchor.index) bestH3 = h3;
        else break;
      }
      if (!bestH3) continue;
      const href = anchor.href.startsWith('http') ? anchor.href : `https://www.corp.att.com${anchor.href}`;
      const datetime = parseCorpDate(bestH3.text) || '2019-01-01T00:00:00.000Z';
      items.push({
        newsid: `corp-${href.replace(/[^a-z0-9]/gi, '-').slice(-60)}`,
        datetime, source: 'AT&T Corp PR',
        headline: decode(anchor.text), qmsummary: '',
        permalink: href, storyurl: href, _source: 'corp-pr',
      });
    }
    return { items, error: null };
  } catch (e) {
    return { items: [], error: e.message };
  }
}

async function fetchAttEdgar() {
  try {
    const res = await fetch('https://data.sec.gov/submissions/CIK0000732717.json', {
      headers: { 'User-Agent': 'StockingsBot/1.0 contact@stockings.vercel.app', 'Accept': 'application/json' },
    });
    if (!res.ok) return { items: [], error: `EDGAR HTTP ${res.status}` };
    const data = await res.json();
    const filings = data?.filings?.recent;
    if (!filings) return { items: [], error: 'No filings data' };
    const { form, filingDate, primaryDocument, accessionNumber, items: filingItems } = filings;
    const itemLabels = {
      '1.01': 'Material Agreement', '1.02': 'Material Agreement Terminated',
      '2.01': 'Acquisition/Disposal of Assets', '2.02': 'Results of Operations (Earnings)',
      '2.03': 'Material Financial Obligation', '2.05': 'Departure of Directors/Officers',
      '2.06': 'Material Impairment', '3.01': 'Delisting Notice',
      '5.02': 'Director/Officer Change', '5.03': 'Amendments to Charter',
      '7.01': 'Regulation FD Disclosure', '8.01': 'Other Events', '9.01': 'Financial Statements',
    };
    const results = [];
    for (let i = 0; i < form.length; i++) {
      if (!['8-K', '8-K/A'].includes(form[i])) continue;
      const accession = (accessionNumber[i] || '').replace(/-/g, '');
      const doc = primaryDocument[i] || '';
      const date = filingDate[i] || '';
      const description = filingItems[i] || '';
      const permalink = accession
        ? `https://www.sec.gov/Archives/edgar/data/732717/${accession}/${doc}`
        : `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=732717&type=8-K`;
      const itemCodes = (description || '').split(',').map(s => s.trim());
      const labels = itemCodes.map(code => itemLabels[code]).filter(Boolean);
      const headline = labels.length > 0
        ? `AT&T 8-K: ${labels[0]}${labels.length > 1 ? ` + ${labels.length - 1} more` : ''}`
        : `AT&T 8-K Filing`;
      let datetime = new Date().toISOString();
      try { if (date) datetime = new Date(date).toISOString(); } catch (_) {}
      results.push({
        newsid: `edgar-${accession || i}`, datetime,
        source: 'AT&T SEC 8-K', headline,
        qmsummary: `SEC Form 8-K filed ${date}. Items: ${description || 'N/A'}`,
        permalink, storyurl: permalink, _source: 'edgar',
      });
    }
    return { items: results, error: null };
  } catch (e) { return { items: [], error: e.message }; }
}

async function fetchAttPRNDirect() {
  const urls = [
    'https://www.prnewswire.com/rss/news-releases-list.rss?company=att',
    'https://www.businesswire.com/rss/home/?rss=G7&company=att',
  ];
  for (const url of urls) {
    try {
      const res = await fetch(url, {
        headers: { ...BROWSER_HEADERS, 'Accept': 'application/rss+xml, application/xml, */*' },
      });
      if (!res.ok) continue;
      const xml = await res.text();
      if (!xml.includes('<item>')) continue;
      const entries = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)];
      const items = [];
      for (const entry of entries) {
        const inner = entry[1];
        const title = decode(strip(inner.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || ''));
        const link = strip(inner.match(/<link>([\s\S]*?)<\/link>/i)?.[1] || '') ||
                     strip(inner.match(/<guid[^>]*>([\s\S]*?)<\/guid>/i)?.[1] || '');
        const pubDate = strip(inner.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)?.[1] || '');
        const description = decode(strip(inner.match(/<description[^>]*>([\s\S]*?)<\/description>/i)?.[1] || ''));
        if (!title || title.length < 5) continue;
        const hl = title.toLowerCase();
        if (!hl.includes('at&t') && !hl.includes("at&t's")) continue;
        let datetime = new Date().toISOString();
        try { if (pubDate) datetime = new Date(pubDate).toISOString(); } catch (_) {}
        items.push({
          newsid: `prn-${link.replace(/[^a-z0-9]/gi, '-').slice(-60)}`,
          datetime, source: 'PR Newswire', headline: title, qmsummary: description,
          permalink: link, storyurl: link, _source: 'prn-direct',
        });
      }
      if (items.length > 0) return { items, error: null };
    } catch (_) { continue; }
  }
  return { items: [], error: 'PRN RSS unavailable' };
}

async function fetchAttAllNews() {
  try {
    const url = 'https://services.att.com/search/v1/newsroom' +
      '?app-id=attnews&q=*:*&fq=-rejectDoc:true&rows=1000&sort=published_date+desc&wt=json';
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://about.att.com/', 'Origin': 'https://about.att.com',
        'Accept': 'application/json, text/javascript, */*; q=0.01', 'X-Requested-With': 'XMLHttpRequest',
      },
    });
    if (!res.ok) return { items: [], error: `AllNews HTTP ${res.status}` };
    const json = await res.json();
    const docs = json?.response?.docs ?? [];
    const items = docs.map(doc => ({
      newsid: `allnews-${(doc.article_url || doc.id || '').replace(/[^a-z0-9]/gi, '-').slice(-60)}`,
      datetime: doc.published_date || new Date().toISOString(),
      source: 'AT&T Newsroom',
      headline: decode(doc.article_header || doc.title || ''),
      qmsummary: decode(doc.article_description || doc.description || ''),
      permalink: doc.article_url || (Array.isArray(doc.og_url) ? doc.og_url[0] : doc.og_url) || '',
      storyurl: doc.article_url || '', _source: 'allnews',
    })).filter(i => i.headline);
    return { items, error: null };
  } catch (e) { return { items: [], error: e.message }; }
}

async function fetchAtt() {
  const [qm, corpPR, edgar, prnDirect, allNews] = await Promise.all([
    fetchAttQuoteMedia(), fetchAttCorpPR(), fetchAttEdgar(), fetchAttPRNDirect(), fetchAttAllNews(),
  ]);
  return dedupe([...qm.items, ...prnDirect.items, ...allNews.items, ...corpPR.items, ...edgar.items]);
}

// ═══════════════════════════════════════════════════════════════════════════
//  AMAZON LEO (AMZLEO)
// ═══════════════════════════════════════════════════════════════════════════

function msToIso(ms) {
  if (!ms) return null;
  try {
    const n = Number(ms);
    if (n > 1e12) return new Date(n).toISOString();
    if (n > 1e9)  return new Date(n * 1000).toISOString();
    return null;
  } catch { return null; }
}

function parseAmazonArticle(a) {
  if (!a || typeof a !== 'object') return null;
  const headline =
    a.promo?.title ||
    a.headlines?.find(h => h.role === 'main')?.value ||
    a.seoAttributes?.title || '';
  const summary =
    a.headlines?.find(h => h.role === 'subheadline')?.value ||
    a.seoAttributes?.description || '';
  const rawUrl = a.canonicalLink || a.promo?.url || '';
  const url = rawUrl.startsWith('http') ? rawUrl : `https://www.aboutamazon.com${rawUrl}`;
  const datetime =
    msToIso(a.publishDateTimestamp) ||
    msToIso(a.updateTimestamp) ||
    (a.publishDate ? new Date(a.publishDate).toISOString() : null) ||
    new Date().toISOString();
  if (!headline || headline.length < 5) return null;
  return {
    newsid: `amzleo-${a.id || url.split('/').pop() || Math.random().toString(36).slice(2)}`,
    datetime, source: 'Amazon Leo',
    headline: decode(headline), qmsummary: decode(summary).slice(0, 300),
    permalink: url, storyurl: url,
    tags: a.searchTags || [], _source: 'amazon-flight',
  };
}

async function fetchAmazonLeo() {
  try {
    const res = await fetch('https://www.aboutamazon.com/news/amazon-leo', { headers: BROWSER_HEADERS });
    if (!res.ok) return [];
    const html = await res.text();
    const pushRe = /self\.__next_f\.push\(\[1,\s*"([\s\S]*?)"\]\)/g;
    let fullFlight = '';
    let m;
    while ((m = pushRe.exec(html)) !== null) {
      try { fullFlight += JSON.parse(`"${m[1]}"`); } catch { fullFlight += m[1]; }
    }
    const artMatch = fullFlight.match(/"articles"\s*:\s*(\[[\s\S]*?\])\s*,\s*"metadata"/);
    if (!artMatch) return [];
    let articles;
    try { articles = JSON.parse(artMatch[1]); } catch { return []; }
    const items = articles.map(parseAmazonArticle).filter(Boolean);
    return dedupe(items);
  } catch {
    return [];
  }
}

// ═══════════════════════════════════════════════════════════════════════════
//  LYNK GLOBAL (LYNK) — WordPress REST API
// ═══════════════════════════════════════════════════════════════════════════

const LYNK_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  'Accept': 'application/json',
};

async function fetchLynkPosts(page = 1) {
  const url = `https://lynk.world/wp-json/wp/v2/posts?per_page=100&page=${page}&_fields=id,title,link,date,excerpt,categories,tags&orderby=date&order=desc`;
  try {
    const res = await fetch(url, { headers: LYNK_HEADERS });
    const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1');
    if (!res.ok) return { posts: [], totalPages: 0, error: `HTTP ${res.status}` };
    const posts = await res.json();
    return { posts, totalPages, error: null };
  } catch (e) {
    return { posts: [], totalPages: 0, error: e.message };
  }
}

async function fetchLynk() {
  const first = await fetchLynkPosts(1);
  if (first.error) return [];
  let all = [...first.posts];
  if (first.totalPages > 1) {
    const rest = await Promise.all(
      Array.from({ length: first.totalPages - 1 }, (_, i) => fetchLynkPosts(i + 2))
    );
    for (const r of rest) {
      if (!r.error) all = all.concat(r.posts);
    }
  }
  const items = all.map(post => {
    const title = decode(strip(post.title?.rendered || ''));
    if (!title || title.length < 5) return null;
    const summary = decode(strip(post.excerpt?.rendered || '')).slice(0, 300);
    const link = post.link || '';
    const datetime = post.date ? new Date(post.date).toISOString() : new Date().toISOString();
    return {
      newsid: `lynk-${post.id}`, datetime,
      source: 'Lynk Global', headline: title, qmsummary: summary,
      permalink: link, storyurl: link,
      category: 'all', _source: 'lynk-wp-api',
    };
  }).filter(Boolean);
  return dedupe(items);
}

// ═══════════════════════════════════════════════════════════════════════════
//  MAIN HANDLER
// ═══════════════════════════════════════════════════════════════════════════

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const ticker = (req.query.ticker || '').toUpperCase();
  const mode = req.query.mode || 'db';   // "db" = page load, "refresh" = upstream fetch
  const config = TICKER_CONFIG[ticker];
  if (!config) {
    return res.status(400).json({
      error: `Unknown ticker: ${ticker}. Supported: ${Object.keys(TICKER_CONFIG).join(', ')}`,
    });
  }

  const wrapInNews = config.type === 'amazon-leo' || config.type === 'lynk';

  // Ensure DB table exists before any DB operations
  await ensureTable();

  // ── MODE: DB — serve from database only (page load) ──
  if (mode === 'db') {
    try {
      const dbItems = await loadFromDB(ticker);
      for (const item of dbItems) item._inDb = true;
      const body = wrapInNews ? { news: dbItems } : dbItems;
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('X-Source', 'db');
      res.setHeader('X-Total-DB', dbItems.length);
      return res.status(200).send(JSON.stringify(body));
    } catch (err) {
      console.error(`press-intelligence DB load error (${ticker}):`, err.message);
      // DB failed — return empty so frontend still works
      const body = wrapInNews ? { news: [] } : [];
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).send(JSON.stringify(body));
    }
  }

  // ── MODE: REFRESH — fetch upstream, compare with DB, persist new items ──
  try {
    let items;

    switch (config.type) {
      case 'qm-simple':
        items = await fetchQmSimple(config);
        break;
      case 'crypto':
        items = await fetchCrypto(config);
        break;
      case 'att':
        items = await fetchAtt();
        break;
      case 'amazon-leo':
        items = await fetchAmazonLeo();
        break;
      case 'lynk': {
        items = await fetchLynk();
        // Fallback to StockTitan + IR page scrape if WordPress returns empty
        if (items.length < 3 && (config.stockTitanSlugs || config.irUrl)) {
          const fallbackPromises = [];
          if (config.stockTitanSlugs) fallbackPromises.push(fetchStockTitan(config.stockTitanSlugs));
          if (config.irUrl) fallbackPromises.push(fetchIRPage(config.irUrl));
          const results = await Promise.allSettled(fallbackPromises);
          for (const r of results) {
            if (r.status === 'fulfilled') items.push(...r.value);
          }
          items = dedupe(items);
        }
        break;
      }
      default:
        return res.status(500).json({ error: `Unknown type: ${config.type}` });
    }

    // Load existing DB items to know what's already stored
    let dbHashes = new Set();
    let dbItems = [];
    try {
      dbItems = await loadFromDB(ticker);
      for (const d of dbItems) dbHashes.add(normalizeHl(d.headline));
      console.log(`press-intelligence refresh (${ticker}): ${dbItems.length} existing DB items, ${items.length} upstream items`);
    } catch (dbErr) {
      console.error(`press-intelligence DB read error (${ticker}):`, dbErr.message);
    }

    // Persist fresh upstream items to database
    try {
      await persistItems(ticker, items);
    } catch (persistErr) {
      console.error(`press-intelligence persist failed (${ticker}):`, persistErr.message);
    }

    // Merge fresh upstream + historical DB items, deduplicated
    let merged = items;
    if (dbItems.length > 0) {
      merged = dedupe([...items, ...dbItems]);
    }

    // Mark each item: _inDb = true if it was already in the database BEFORE this fetch
    for (const item of merged) {
      item._inDb = dbHashes.has(normalizeHl(item.headline));
    }

    const body = wrapInNews ? { news: merged } : merged;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-Source', 'refresh');
    res.setHeader('X-Total-Upstream', items.length);
    res.setHeader('X-Total-Merged', merged.length);
    return res.status(200).send(JSON.stringify(body));
  } catch (err) {
    // If upstream fetch failed entirely, try serving from database
    try {
      const dbItems = await loadFromDB(ticker);
      if (dbItems.length > 0) {
        for (const item of dbItems) item._inDb = true;
        const body = wrapInNews ? { news: dbItems } : dbItems;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('X-Source', 'db-fallback');
        res.setHeader('X-Total-DB', dbItems.length);
        return res.status(200).send(JSON.stringify(body));
      }
    } catch { /* DB also failed */ }
    console.error(`press-intelligence error (${ticker}):`, err);
    return res.status(500).json({ error: err.message });
  }
}
