// api/press-intelligence.js
// Unified press-release proxy for all tickers
// Usage: /api/press-intelligence?ticker=ASTS
// Supported: ASTS, BMNR, IRDM, GSAT, VZ, T, AMZLEO,
//            MSTR, MARA, RIOT, CLSK, FRMM, COIN, HUT, IREN, NBIS, VSAT, RKLB, SATS, LUNR,
//            MA, V, SOFI, AXP, AFRM, SEZL, SQ, PYPL, UPST, HOOD, GLXY, BITF,
//            BLK, HSBC, C, CME, ICE, VOD, ORAN, TU, BCE, AMT, RKUNF, GOOGL,
//            PL, BA, LMT, QCOM, NOK, ERIC, TMUS, NVDA, IBM,
//            CIFR, HIVE, CORZ, APLD, CAN, ARBK, BKKT

const { neon } = require('@neondatabase/serverless');

// No in-memory cache — DB is the source of truth
let _lastJunkPurge = 0; // timestamp of last junk purge (throttle to once per hour)

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
    const cleaned = cleanHeadline(item.headline);
    const hlHash = normalizeHl(cleaned);
    return hlHash && hlHash.length >= 4 && !isJunkHeadline(cleaned);
  });
  if (validItems.length === 0) return 0;

  const queries = validItems.map(item => {
    const cleaned = cleanHeadline(item.headline);
    const hlHash = normalizeHl(cleaned);
    return sql`
      INSERT INTO press_releases (ticker, headline_hash, headline, datetime, source, summary, permalink, storyurl, newsid, internal_source)
      VALUES (${ticker}, ${hlHash}, ${cleaned}, ${item.datetime || ''}, ${item.source || ''}, ${(item.qmsummary || item.summary || '').slice(0, 2000)}, ${item.permalink || ''}, ${item.storyurl || ''}, ${item.newsid || ''}, ${item._source || ''})
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
      headline: cleanHeadline(r.headline),
      datetime: r.datetime,
      source: r.source || '',
      qmsummary: r.qmsummary || '',
      permalink: r.permalink || '',
      storyurl: r.storyurl || '',
      _source: r.internal_source || 'db',
    })).filter(item => !isJunkHeadline(item.headline));
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
//  JUNK HEADLINE FILTER — blocks navigation/category links from all sources
// ═══════════════════════════════════════════════════════════════════════════

const JUNK_HEADLINE_RE = /^(stock news live|merger\s*&\s*acquisitions?|clinical trials?|market research|ipo\b|insider trad|analyst rat|stock buyback|dividend\b|sec filing|media room|investor relations|press room|newsroom|contact us|about us|home|back to|all news|all press|view all|see more|read more|load more|subscribe|sign up|log ?in|cookie|privacy|terms of|footer|header|navigation|menu|skip to|jump to|link to\b)/i;

const JUNK_CONTENT_RE = /\b(share on (facebook|twitter|linkedin|x|whatsapp|messenger|email|reddit)|email a link|open in new window|opens in new window|link to .{1,30} page|follow us|cookie settings|accept cookies|manage preferences|subscribe for|sign up for|download the app|get the app|read media release|download pdf|\(pdf\b|\bpdf \d+kb\b|\d+ min read$)/i;

function isJunkHeadline(text) {
  if (!text) return true;
  const t = text.trim();
  if (JUNK_HEADLINE_RE.test(t)) return true;
  if (JUNK_CONTENT_RE.test(t)) return true;
  if (t.split(/\s+/).length < 4) return true; // real headlines have 4+ words
  if (t.length > 300) return true; // real headlines are not full article bodies
  return false;
}

/**
 * Clean scraped headline text — strip common prefixes/suffixes
 * that are navigation artifacts, not part of the actual headline.
 */
function cleanHeadline(text) {
  if (!text) return '';
  let t = text.trim();
  // Strip "Link to " prefix (Vodafone-style navigation)
  t = t.replace(/^link to\s+/i, '');
  // Strip trailing metadata like "| 4 min read", "• March 06, 2026", category tags
  t = t.replace(/\s*\|\s*\d+\s*min\s*read\s*$/i, '');
  // Strip leading category/type labels like "Research •", "Podcasts •"
  t = t.replace(/^(?:Research|Podcasts?|Blog|News|Press Release|Article|Insight|Report)\s*[•·|–—-]\s*/i, '');
  // Strip trailing date patterns that got scraped into headline
  t = t.replace(/\s*[•·|]\s*(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s*\d{4}\s*$/i, '');
  return t.trim();
}

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

  // 1. <time datetime="..."> is the most reliable signal
  const timeTag = ctx.match(/<time[^>]+datetime=["']([^"']+)["']/i);
  if (timeTag) {
    try {
      const d = new Date(timeTag[1]);
      if (!isNaN(d.getTime())) return d.toISOString();
    } catch { /* skip */ }
  }

  const patterns = [
    /(\d{4}-\d{2}-\d{2})/,                                         // 2026-03-12
    /(\d{1,2}\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4})/i,  // 12 March 2026
    /(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4})/i,  // 12 Mar 2026
    /((?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s*\d{4})/i, // March 12, 2026
    /((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2},?\s*\d{4})/i, // Mar 12, 2026
    /(\d{1,2}\/\d{1,2}\/\d{4})/,                                   // 03/12/2026
    /(\d{1,2}\.\d{1,2}\.\d{4})/,                                   // 12.03.2026
  ];
  for (const p of patterns) {
    const m = ctx.match(p);
    if (m) {
      try {
        const d = new Date(m[1]);
        if (!isNaN(d.getTime()) && d.getFullYear() >= 2020 && d.getFullYear() <= 2030) return d.toISOString();
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
        if (isJunkHeadline(text)) continue;
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
    const linkRe = /<a[^>]+href=["']([^"']*(?:press-release|news-release|press_release|media-release|\/detail\/|\/news\/|\/release\/|\/announcement)[^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
    let m;
    while ((m = linkRe.exec(html)) !== null && items.length < 30) {
      const href = m[1];
      const rawText = decode(strip(m[2]));
      const text = cleanHeadline(rawText);
      if (!text || text.length < 20) continue;
      if (isJunkHeadline(text)) continue;
      const url = href.startsWith('http') ? href : `${origin}${href.startsWith('/') ? '' : '/'}${href}`;
      const datetime = extractDateFromContext(html, m.index);
      if (!datetime) continue; // skip items without a discoverable date
      items.push({
        newsid: `ir-scrape-${url.replace(/[^a-z0-9]/gi, '-').slice(-60)}`,
        headline: text,
        datetime,
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

// ─── Newsroom page scrape (broader link matching than IR scrape) ───

async function fetchNewsroomPage(url) {
  try {
    const res = await fetch(url, {
      headers: BROWSER_HEADERS,
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return [];
    const html = await res.text();
    const items = [];
    const origin = new URL(url).origin;
    const linkRe = /<a[^>]+href=["']([^"']*(?:press-release|news-release|press_release|media-release|\/detail\/|\/news\/|\/article\/|\/story\/|\/stories\/|\/blog\/|\/insight|\/announcement|\/statement|\/release|\/post\/|\/update\/)[^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
    let m;
    while ((m = linkRe.exec(html)) !== null && items.length < 40) {
      const href = m[1];
      // Skip social media / sharing / tracking links
      if (/\b(facebook|twitter|linkedin|share|mailto:|javascript:|#$)/i.test(href)) continue;
      const rawText = decode(strip(m[2]));
      const text = cleanHeadline(rawText);
      if (!text || text.length < 15) continue;
      if (isJunkHeadline(text)) continue;
      if (/^(home|about|contact|careers|privacy|terms|login|sign)/i.test(text.trim())) continue;
      const fullUrl = href.startsWith('http') ? href : `${origin}${href.startsWith('/') ? '' : '/'}${href}`;
      if (fullUrl === url || href.startsWith('#')) continue;
      const datetime = extractDateFromContext(html, m.index);
      if (!datetime) continue; // skip items without a discoverable date
      items.push({
        newsid: `newsroom-scrape-${fullUrl.replace(/[^a-z0-9]/gi, '-').slice(-60)}`,
        headline: text,
        datetime,
        source: 'Newsroom',
        permalink: fullUrl,
        storyurl: fullUrl,
        _source: 'newsroom-scrape',
      });
    }
    return items;
  } catch (e) {
    console.warn(`[press-intelligence] Newsroom scrape failed for ${url}:`, e.message);
    return [];
  }
}

// ─── Generic RSS fetcher (for arbitrary RSS/Atom feed URLs) ───

async function fetchGenericRss(rssUrls) {
  const promises = rssUrls.map(async (url) => {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; StockingsBot/1.0)',
          'Accept': 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*',
        },
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) return [];
      const xml = await res.text();
      let parsed = [];
      if (xml.includes('<item>')) parsed = parseRssXml(xml);
      else if (xml.includes('<entry>')) parsed = parseAtomXml(xml);
      for (const item of parsed) {
        item.source = item.source || 'RSS Feed';
        item._source = 'generic-rss';
      }
      return parsed;
    } catch (e) {
      console.warn(`[press-intelligence] Generic RSS failed for "${url}":`, e.message);
      return [];
    }
  });
  const itemArrays = await Promise.all(promises);
  return itemArrays.flat();
}

// ═══════════════════════════════════════════════════════════════════════════
//  TICKER GRADES — snapshot from comprehensive review (2026-03-12)
//  A = perfect, no changes needed
//  B = was working, enhanced with additional sources (new sources may break)
//  C = had missing articles, fixed via config/threshold changes
//  D = had quality issues (junk headlines, wrong dates, metadata noise)
//  F = was broken, showing old/wrong data, or returning wrong company
// ═══════════════════════════════════════════════════════════════════════════

const GRADE_META = {
  A: { label: 'Perfect',       monitorPriority: 0, description: 'No changes needed during review' },
  B: { label: 'Enhanced',      monitorPriority: 1, description: 'Working but enhanced with new sources' },
  C: { label: 'Config-fixed',  monitorPriority: 2, description: 'Had missing articles, fixed via config changes' },
  D: { label: 'Quality-fixed', monitorPriority: 3, description: 'Had quality issues (junk/noise), fixes applied' },
  F: { label: 'Broken-fixed',  monitorPriority: 4, description: 'Was broken or showing wrong data, fixed' },
};

// ═══════════════════════════════════════════════════════════════════════════
//  TICKER CONFIGURATIONS
// ═══════════════════════════════════════════════════════════════════════════

const OFFICIAL_SOURCES = ['pr newswire', 'business wire', 'globe newswire', 'globenewswire', 'accesswire', 'canada newswire', 'newsfile', 'investor relations', 'globenewswire rss', 'stock titan'];

const TICKER_CONFIG = {
  // ─── Simple QM tickers ───
  ASTS: {
    grade: 'A',
    type: 'qm-simple',
    topics: ['ASTS'],
    sources: ['business wire'],
    filter: (hl) => /ast\s*spacemobile|asts/i.test(hl),
  },
  BMNR: {
    grade: 'A',
    type: 'qm-simple',
    topics: ['BMNR'],
    sources: ['pr newswire', 'prnewswire', 'business wire', 'accesswire', 'globe newswire'],
    filter: (hl) => /bitmine|bmnr|bit\s*mine/i.test(hl),
  },
  IRDM: {
    grade: 'A',
    type: 'qm-simple',
    topics: ['IRDM'],
    sources: ['pr newswire', 'canada newswire', 'business wire'],
    filter: (hl) => /iridium/i.test(hl),
  },
  GSAT: {
    grade: 'A',
    type: 'qm-simple',
    topics: ['GSAT'],
    sources: ['business wire', 'pr newswire', 'canada newswire'],
    filter: (hl) => /globalstar/i.test(hl),
  },
  VZ: {
    grade: 'A',
    type: 'qm-simple',
    topics: ['VZ'],
    sources: ['globenewswire', 'pr newswire', 'business wire'],
    filter: (hl) => /verizon/i.test(hl),
  },
  VSAT: {
    grade: 'A',
    type: 'qm-simple',
    topics: ['VSAT'],
    sources: ['business wire', 'pr newswire', 'globe newswire', 'globenewswire'],
    filter: (hl) => /viasat/i.test(hl),
  },
  RKLB: {
    grade: 'A',
    type: 'qm-simple',
    topics: ['RKLB'],
    sources: ['business wire', 'pr newswire', 'globe newswire', 'globenewswire'],
    filter: (hl) => /rocket\s*lab|rklb/i.test(hl),
  },
  SATS: {
    grade: 'A',
    type: 'qm-simple',
    topics: ['SATS'],
    sources: ['business wire', 'pr newswire', 'globe newswire', 'globenewswire', 'accesswire'],
    filter: (hl) => /echostar|sats|hughes/i.test(hl),
  },
  LUNR: {
    grade: 'A',
    type: 'qm-simple',
    topics: ['LUNR'],
    sources: ['business wire', 'pr newswire', 'globe newswire', 'globenewswire'],
    filter: (hl) => /intuitive\s*machines|lunr/i.test(hl),
    irUrl: 'https://investors.intuitivemachines.com/news-releases',
  },

  MSTR: {
    grade: 'C',
    type: 'qm-simple',
    topics: ['MSTR', 'STRC'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /\bstrategy\b/i.test(hl) || /microstrategy/i.test(hl) || /\bmstr\b/i.test(hl) || /\bstrc\b/i.test(hl),
    gnwRssKeywords: ['Strategy', 'MicroStrategy', 'STRC'],
  },
  MARA: {
    grade: 'C',
    type: 'qm-simple',
    topics: ['MARA'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /marathon\s*digital/i.test(hl) || /\bmara\b/i.test(hl) || /marathon\s*holdings/i.test(hl) || /mara\s*holdings/i.test(hl),
    gnwRssKeywords: ['MARA Holdings', 'Marathon Digital'],
    irUrl: 'https://ir.mara.com/news-events/press-releases',
    notifiedApiUrls: ['https://ir.mara.com/rss/news-releases.xml'],
  },
  RIOT: {
    grade: 'A',
    type: 'qm-simple',
    topics: ['RIOT'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /riot\s*platforms/i.test(hl) || /\briot\b/i.test(hl),
  },
  CLSK: {
    grade: 'A',
    type: 'qm-simple',
    topics: ['CLSK'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /cleanspark/i.test(hl) || /\bclsk\b/i.test(hl),
  },
  HUT: {
    grade: 'A',
    type: 'qm-simple',
    topics: ['HUT'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /hut\s*8|hut8|\bhut\b/i.test(hl),
  },
  IREN: {
    grade: 'A',
    type: 'qm-simple',
    topics: ['IREN'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /\biren\b|iris\s*energy/i.test(hl),
    irUrl: 'https://irisenergy.gcs-web.com/news-releases',
    notifiedApiUrls: ['https://irisenergy.gcs-web.com/rss/news-releases.xml'],
  },
  NBIS: {
    grade: 'C',
    type: 'qm-simple',
    topics: ['NBIS'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /\bnbis\b|nebius/i.test(hl),
    gnwRssKeywords: ['Nebius'],
    newsroomUrls: ['https://nebius.com/blog'],
  },
  COIN: {
    grade: 'B',
    type: 'qm-simple',
    topics: ['COIN'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /coinbase/i.test(hl) || /\bcoin\b/i.test(hl),
    newsroomUrls: ['https://www.coinbase.com/blog/landing'],
    rssUrls: ['https://www.coinbase.com/blog/rss.xml'],
  },
  FRMM: {
    grade: 'A',
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
    grade: 'C',
    type: 'qm-simple',
    topics: ['MA'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /mastercard/i.test(hl) || (/\bma\b/i.test(hl) && /payment|transaction|card|network/i.test(hl)),
    gnwRssKeywords: ['Mastercard'],
    irUrl: 'https://investor.mastercard.com/news-events/press-releases/default.aspx',
    newsroomUrls: [
      'https://www.mastercard.com/news/press/press-releases',
      'https://www.mastercard.com/us/en/news-and-trends/stories.html',
    ],
  },
  V: {
    grade: 'A',
    type: 'qm-simple',
    topics: ['V'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /\bvisa\b/i.test(hl),
  },
  SOFI: {
    grade: 'A',
    type: 'qm-simple',
    topics: ['SOFI'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /sofi/i.test(hl),
  },
  AXP: {
    grade: 'B',
    type: 'qm-simple',
    topics: ['AXP'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /american\s*express/i.test(hl) || /\bamex\b/i.test(hl) || /\baxp\b/i.test(hl),
    newsroomUrls: ['https://www.americanexpress.com/en-us/newsroom/'],
    irUrl: 'https://ir.americanexpress.com/news/news-details/default.aspx',
  },
  AFRM: {
    grade: 'A',
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
    grade: 'A',
    type: 'qm-simple',
    topics: ['SEZL'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /sezzle/i.test(hl) || /\bsezl\b/i.test(hl),
  },
  SQ: {
    grade: 'A',
    type: 'qm-simple',
    topics: ['SQ', 'XYZ'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /block,?\s*inc/i.test(hl) || /\bsquare\b/i.test(hl) || /cash\s*app/i.test(hl) || /\bsq\b/i.test(hl) || /\bxyz\b/i.test(hl),
    stockTitanSlugs: ['XYZ', 'SQ'],
    irUrl: 'https://investors.block.xyz/investor-news/default.aspx',
  },
  PYPL: {
    grade: 'F',
    type: 'qm-simple',
    topics: ['PYPL'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /paypal/i.test(hl) || /\bpypl\b/i.test(hl) || /venmo/i.test(hl),
    gnwRssKeywords: ['PayPal'],
    irUrl: 'https://newsroom.paypal-corp.com/news',
    newsroomUrls: ['https://newsroom.paypal-corp.com/news'],
    rssUrls: ['https://newsroom.paypal-corp.com/rss/news-releases.xml'],
  },
  UPST: {
    grade: 'A',
    type: 'qm-simple',
    topics: ['UPST'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /upstart/i.test(hl) || /\bupst\b/i.test(hl),
    stockTitanSlugs: ['UPST'],
    irUrl: 'https://ir.upstart.com/news-and-events/news-releases',
    notifiedApiUrls: ['https://ir.upstart.com/rss/news-releases.xml'],
  },
  HOOD: {
    grade: 'A',
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
    grade: 'D',
    type: 'qm-simple',
    topics: ['GLXY'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /galaxy\s*digital/i.test(hl) || /\bglxy\b/i.test(hl) || /galaxy\s*(?:asset|fund)/i.test(hl) || (/\bgalaxy\b/i.test(hl) && /crypto|bitcoin|digital|blockchain|mining|asset/i.test(hl)),
    stockTitanSlugs: ['GLXY'],
    gnwRssKeywords: ['Galaxy Digital'],
    irUrl: 'https://investor.galaxy.com/',
    newsroomUrls: ['https://www.galaxy.com/all-news'],
  },
  BITF: {
    grade: 'A',
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
    grade: 'A',
    type: 'qm-simple',
    topics: ['BLK'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /blackrock/i.test(hl) || /\bblk\b/i.test(hl),
    irUrl: 'https://ir.blackrock.com/news-and-events/press-releases/default.aspx',
  },
  HSBC: {
    grade: 'D',
    type: 'qm-simple',
    topics: ['HSBC'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /hsbc/i.test(hl),
    newsroomUrls: [
      'https://www.hsbc.com/news-and-views/news/media-releases',
      'https://www.hsbc.com/news-and-views/news',
    ],
  },
  C: {
    grade: 'C',
    type: 'qm-simple',
    topics: ['C'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /citigroup/i.test(hl) || /\bciti\b/i.test(hl) || /citibank/i.test(hl),
    gnwRssKeywords: ['Citigroup', 'Citi'],
    irUrl: 'https://www.citigroup.com/global/news/press-release',
    newsroomUrls: ['https://www.citigroup.com/global/news'],
  },
  CME: {
    grade: 'A',
    type: 'qm-simple',
    topics: ['CME'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /cme\s*group/i.test(hl) || /\bcme\b/i.test(hl),
  },
  ICE: {
    grade: 'A',
    type: 'qm-simple',
    topics: ['ICE'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /intercontinental\s*exchange/i.test(hl) || /\bnyse\b/i.test(hl) || (/\bice\b/i.test(hl) && /exchange|futures|data|mortgage|clearing|nyse/i.test(hl)),
  },

  // ─── Telecom (new) ───
  VOD: {
    grade: 'F',
    type: 'qm-simple',
    topics: ['VOD'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /vodafone/i.test(hl) || /\bvod\b/i.test(hl),
    gnwRssKeywords: ['Vodafone'],
    irUrl: 'https://investors.vodafone.com/news-and-results/news',
    newsroomUrls: [
      'https://www.vodafone.com/news/press-releases',
      'https://www.vodafone.com/news',
    ],
  },
  ORAN: {
    grade: 'F',
    type: 'qm-simple',
    topics: ['ORAN'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /\borange\b/i.test(hl) && /telecom|network|mobile|5g|fiber|group|s\.a|press|ceo|quarter|revenue|result|partner|launch|invest/i.test(hl),
    gnwRssKeywords: ['Orange S.A.', 'Orange Telecom'],
    newsroomUrls: [
      'https://www.orange.com/en/newsroom/press-releases',
      'https://www.orange.com/en/newsroom/news',
    ],
  },
  TU: {
    grade: 'A',
    type: 'qm-simple',
    topics: ['TU'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /telus/i.test(hl) || /\btu\b/i.test(hl),
  },
  BCE: {
    grade: 'A',
    type: 'qm-simple',
    topics: ['BCE'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /\bbce\b/i.test(hl) || (/\bbell\b/i.test(hl) && /canada|media|wireless/i.test(hl)),
    stockTitanSlugs: ['BCE'],
    irUrl: 'https://www.bce.ca/news-and-media/newsroom',
  },

  // ─── Infrastructure & Tech ───
  AMT: {
    grade: 'A',
    type: 'qm-simple',
    topics: ['AMT'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /american\s*tower/i.test(hl) || /\bamt\b/i.test(hl),
    stockTitanSlugs: ['AMT'],
    irUrl: 'https://americantower.gcs-web.com/press-releases',
    notifiedApiUrls: ['https://americantower.gcs-web.com/rss/news-releases.xml'],
  },
  RKUNF: {
    grade: 'F',
    type: 'qm-simple',
    topics: ['RKUNF'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /rakuten/i.test(hl) || /\brkunf\b/i.test(hl),
    irUrl: 'https://global.rakuten.com/corp/news/press/',
    rssUrls: ['https://global.rakuten.com/corp/rss/press.xml'],
    newsroomUrls: ['https://corp.mobile.rakuten.co.jp/english/news/'],
  },
  GOOGL: {
    grade: 'F',
    type: 'qm-simple',
    topics: ['GOOGL', 'GOOG'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /alphabet/i.test(hl) || /\bgoogle\b/i.test(hl) || /\bgoogl\b/i.test(hl) || /google\s*cloud/i.test(hl),
    gnwRssKeywords: ['Alphabet', 'Google'],
    irUrl: 'https://abc.xyz/investor/',
    newsroomUrls: [
      'https://www.googlecloudpresscorner.com/latest-news',
      'https://blog.google/press/',
    ],
  },

  // ─── Aerospace & Defense ───
  PL: {
    grade: 'F',
    type: 'qm-simple',
    topics: ['PL'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /planet\s*lab/i.test(hl) || (/\bplanet\b/i.test(hl) && /satellite|earth|imaging|data/i.test(hl)) || /\bpl\b/i.test(hl),
    stockTitanSlugs: ['PL'],
    gnwRssKeywords: ['Planet Labs'],
    irUrl: 'https://investors.planet.com/news/default.aspx',
    notifiedApiUrls: ['https://investors.planet.com/rss/news-releases.xml'],
  },
  BA: {
    grade: 'F',
    type: 'qm-simple',
    topics: ['BA'],
    sources: ['pr newswire', 'business wire'],
    filter: (hl) => /boeing/i.test(hl),
    stockTitanSlugs: ['BA'],
    gnwRssKeywords: ['Boeing'],
    irUrl: 'https://boeing.mediaroom.com/news-releases-statements',
    rssUrls: ['https://boeing.mediaroom.com/rss'],
  },
  LMT: {
    grade: 'F',
    type: 'qm-simple',
    topics: ['LMT'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /lockheed\s*martin/i.test(hl) || /\blmt\b/i.test(hl),
    stockTitanSlugs: ['LMT'],
    gnwRssKeywords: ['Lockheed Martin'],
    irUrl: 'https://news.lockheedmartin.com/news-releases',
    newsroomUrls: ['https://news.lockheedmartin.com/home'],
    rssUrls: ['https://news.lockheedmartin.com/rss/news-releases.xml'],
  },

  // ─── Semiconductors & Telecom Equipment ───
  QCOM: {
    grade: 'F',
    type: 'qm-simple',
    topics: ['QCOM'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /qualcomm/i.test(hl) || /\bqcom\b/i.test(hl) || /snapdragon/i.test(hl),
    stockTitanSlugs: ['QCOM'],
    gnwRssKeywords: ['Qualcomm'],
    irUrl: 'https://investor.qualcomm.com/news-events/press-releases/default.aspx',
    newsroomUrls: ['https://www.qualcomm.com/news/releases'],
  },
  NOK: {
    grade: 'F',
    type: 'qm-simple',
    topics: ['NOK'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /nokia/i.test(hl) || /\bnok\b/i.test(hl),
    stockTitanSlugs: ['NOK'],
    gnwRssKeywords: ['Nokia'],
    irUrl: 'https://www.nokia.com/about-us/investors/news',
    newsroomUrls: ['https://www.nokia.com/about-us/newsroom/'],
    rssUrls: ['https://www.nokia.com/rss/press-releases.xml'],
  },
  ERIC: {
    grade: 'F',
    type: 'qm-simple',
    topics: ['ERIC'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /ericsson/i.test(hl) || /\beric\b/i.test(hl),
    stockTitanSlugs: ['ERIC'],
    gnwRssKeywords: ['Ericsson'],
    irUrl: 'https://www.ericsson.com/en/press-releases',
    newsroomUrls: ['https://www.ericsson.com/en/newsroom'],
    rssUrls: ['https://www.ericsson.com/en/rss?type=press-releases'],
  },
  TMUS: {
    grade: 'D',
    type: 'qm-simple',
    topics: ['TMUS'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /t.mobile/i.test(hl) || /\btmus\b/i.test(hl),
    stockTitanSlugs: ['TMUS'],
    irUrl: 'https://investor.t-mobile.com/events-and-presentations/news/default.aspx',
    newsroomUrls: ['https://www.t-mobile.com/news/stories'],
  },
  NVDA: {
    grade: 'B',
    type: 'qm-simple',
    topics: ['NVDA'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /nvidia/i.test(hl) || /\bnvda\b/i.test(hl),
    stockTitanSlugs: ['NVDA'],
    gnwRssKeywords: ['NVIDIA'],
    newsroomUrls: ['https://nvidianews.nvidia.com/news/all'],
    notifiedApiUrls: ['https://investor.nvidia.com/rss/news-releases.xml'],
  },
  IBM: {
    grade: 'B',
    type: 'qm-simple',
    topics: ['IBM'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /\bibm\b/i.test(hl),
    stockTitanSlugs: ['IBM'],
    irUrl: 'https://newsroom.ibm.com/announcements',
    newsroomUrls: ['https://newsroom.ibm.com/press-releases'],
    rssUrls: ['https://newsroom.ibm.com/rss/news-releases.xml'],
  },

  // ─── Bitcoin Mining (additional) ───
  CIFR: {
    grade: 'F',
    type: 'qm-simple',
    topics: ['CIFR'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /cipher\s*mining/i.test(hl) || /\bcifr\b/i.test(hl),
    stockTitanSlugs: ['CIFR'],
    gnwRssKeywords: ['Cipher Mining'],
    irUrl: 'https://investors.ciphermining.com/news-events/press-releases',
    notifiedApiUrls: ['https://investors.ciphermining.com/rss/news-releases.xml'],
  },
  HIVE: {
    grade: 'A',
    type: 'qm-simple',
    topics: ['HIVE'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /hive\s*digital/i.test(hl) || /\bhive\b/i.test(hl),
    stockTitanSlugs: ['HIVE'],
    gnwRssKeywords: ['HIVE Digital'],
    irUrl: 'https://www.hivedigitaltechnologies.com/news',
  },
  CORZ: {
    grade: 'A',
    type: 'qm-simple',
    topics: ['CORZ'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /core\s*scientific/i.test(hl) || /\bcorz\b/i.test(hl),
    stockTitanSlugs: ['CORZ'],
    irUrl: 'https://investors.corescientific.com/news-events/press-releases',
  },
  APLD: {
    grade: 'A',
    type: 'qm-simple',
    topics: ['APLD'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /applied\s*digital/i.test(hl) || /\bapld\b/i.test(hl),
    stockTitanSlugs: ['APLD'],
    gnwRssKeywords: ['Applied Digital'],
    irUrl: 'https://ir.applieddigital.com/news-events/press-releases',
  },
  CAN: {
    grade: 'A',
    type: 'qm-simple',
    topics: ['CAN'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /canaan/i.test(hl) || (/\bcan\b/i.test(hl) && /mining|bitcoin|miner|asic/i.test(hl)),
    stockTitanSlugs: ['CAN'],
    irUrl: 'https://investor.canaaninc.com/news-releases',
  },
  ARBK: {
    grade: 'F',
    type: 'qm-simple',
    topics: ['ARBK'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /argo\s*blockchain/i.test(hl) || /\barbk\b/i.test(hl),
    stockTitanSlugs: ['ARBK'],
    gnwRssKeywords: ['Argo Blockchain'],
    irUrl: 'https://www.argoblockchain.com/investors/news',
    newsroomUrls: ['https://www.argoblockchain.com/news'],
  },
  BKKT: {
    grade: 'A',
    type: 'qm-simple',
    topics: ['BKKT'],
    sources: OFFICIAL_SOURCES,
    filter: (hl) => /bakkt/i.test(hl) || /\bbkkt\b/i.test(hl),
    stockTitanSlugs: ['BKKT'],
    gnwRssKeywords: ['Bakkt'],
    irUrl: 'https://investors.bakkt.com/news-and-events/news-releases',
  },

  // ─── Complex multi-source tickers ───
  T: { grade: 'B', type: 'att' },
  AMZLEO: { grade: 'A', type: 'amazon-leo' },
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

  // Always fetch additional sources when configured for comprehensive coverage
  if (config.gnwRssKeywords || config.irUrl || config.stockTitanSlugs || config.notifiedApiUrls || config.newsroomUrls || config.rssUrls) {
    const fallbackPromises = [];
    if (config.stockTitanSlugs) fallbackPromises.push(fetchStockTitan(config.stockTitanSlugs));
    if (config.notifiedApiUrls) fallbackPromises.push(fetchNotifiedRss(config.notifiedApiUrls));
    if (config.gnwRssKeywords) fallbackPromises.push(fetchGnwRss(config.gnwRssKeywords));
    if (config.irUrl) fallbackPromises.push(fetchIRPage(config.irUrl));
    if (config.newsroomUrls) fallbackPromises.push(...config.newsroomUrls.map(fetchNewsroomPage));
    if (config.rssUrls) fallbackPromises.push(fetchGenericRss(config.rssUrls));

    const results = await Promise.allSettled(fallbackPromises);
    const TRUSTED = new Set(['stocktitan', 'notified-rss', 'notified-json', 'ir-scrape', 'generic-rss', 'newsfile-company']);
    const filterFallback = (items) => items.filter((item) => {
      const hl = (item.headline || '').toLowerCase();
      if (hl.length < 15) return false;
      if (TRUSTED.has(item._source || '')) return true;
      return config.filter(hl);
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

  // Always fetch additional sources when configured for comprehensive coverage
  if (config.stockTitanSlugs || config.gnwRssKeywords || config.notifiedApiUrls || config.irUrl || config.newsroomUrls || config.rssUrls) {
    const fallbackPromises = [];
    if (config.stockTitanSlugs) fallbackPromises.push(fetchStockTitan(config.stockTitanSlugs));
    if (config.notifiedApiUrls) fallbackPromises.push(fetchNotifiedRss(config.notifiedApiUrls));
    if (config.gnwRssKeywords) fallbackPromises.push(fetchGnwRss(config.gnwRssKeywords));
    if (config.irUrl) fallbackPromises.push(fetchIRPage(config.irUrl));
    if (config.newsroomUrls) fallbackPromises.push(...config.newsroomUrls.map(fetchNewsroomPage));
    if (config.rssUrls) fallbackPromises.push(fetchGenericRss(config.rssUrls));

    const results = await Promise.allSettled(fallbackPromises);

    const TRUSTED = new Set(['stocktitan', 'notified-rss', 'notified-json', 'ir-scrape', 'generic-rss', 'newsfile-company']);
    const filterFallback = (items) => items.filter((item) => {
      const hl = (item.headline || '').toLowerCase();
      if (hl.length < 15) return false;
      if (TRUSTED.has(item._source || '')) return true;
      return config.filter(hl);
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
    const url = `https://services.att.com/search/v1/newsroom?app-id=attnews&q=*:*&fq=-rejectDoc:true&rows=1000&sort=published_date+desc&wt=json`;
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

async function fetchAttInvestorNews() {
  try {
    const url = `https://services.att.com/search/v1/newsroom?app-id=attnews&q=*:*&fq=-rejectDoc:true&fq=tags:Investors&rows=200&sort=published_date+desc&wt=json`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://about.att.com/', 'Origin': 'https://about.att.com',
        'Accept': 'application/json, text/javascript, */*; q=0.01', 'X-Requested-With': 'XMLHttpRequest',
      },
    });
    if (!res.ok) return { items: [], error: `InvestorNews HTTP ${res.status}` };
    const json = await res.json();
    const docs = json?.response?.docs ?? [];
    const items = docs.map(doc => ({
      newsid: `investor-${(doc.article_url || doc.id || '').replace(/[^a-z0-9]/gi, '-').slice(-60)}`,
      datetime: doc.published_date || new Date().toISOString(),
      source: 'AT&T Investor News',
      headline: decode(doc.article_header || doc.title || ''),
      qmsummary: decode(doc.article_description || doc.description || ''),
      permalink: doc.article_url || (Array.isArray(doc.og_url) ? doc.og_url[0] : doc.og_url) || '',
      storyurl: doc.article_url || '', _source: 'investor-news',
    })).filter(i => i.headline);
    return { items, error: null };
  } catch (e) { return { items: [], error: e.message }; }
}

async function fetchAtt() {
  const [qm, corpPR, edgar, prnDirect, allNews, investorNews] = await Promise.all([
    fetchAttQuoteMedia(), fetchAttCorpPR(), fetchAttEdgar(), fetchAttPRNDirect(), fetchAttAllNews(), fetchAttInvestorNews(),
  ]);
  return dedupe([...qm.items, ...prnDirect.items, ...allNews.items, ...investorNews.items, ...corpPR.items, ...edgar.items]);
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
  res.setHeader('X-Ticker-Grade', config.grade || 'U');

  // ── MODE: METHODOLOGY — return source configuration for this ticker ──
  if (mode === 'methodology') {
    const methodology = {
      ticker,
      grade: config.grade || 'U',
      type: config.type,
      sources: [],
      headlineFilter: config.filter ? config.filter.toString() : null,
    };

    // Primary source
    if (config.type === 'qm-simple' || config.type === 'crypto') {
      methodology.sources.push({
        name: 'QuoteMedia / AccessWire',
        type: 'primary',
        detail: `Topics: ${(config.topics || []).join(', ')}`,
        sourceFilter: (config.sources || []).join(', '),
      });
    } else if (config.type === 'att') {
      methodology.sources.push({
        name: 'AT&T Multi-Source Fetcher',
        type: 'primary',
        detail: '6 dedicated AT&T sources (IR, newsroom, RSS)',
        sourceFilter: 'AT&T-specific',
      });
    } else if (config.type === 'amazon-leo') {
      methodology.sources.push({
        name: 'Amazon LEO Page Parser',
        type: 'primary',
        detail: 'Dedicated Amazon Kuiper/LEO page scraper',
        sourceFilter: 'Amazon-specific',
      });
    }

    // Additional sources
    if (config.stockTitanSlugs) {
      methodology.sources.push({
        name: 'Stock Titan',
        type: 'supplementary',
        detail: `Slugs: ${config.stockTitanSlugs.join(', ')}`,
      });
    }
    if (config.notifiedApiUrls) {
      methodology.sources.push({
        name: 'Notified IR RSS',
        type: 'supplementary',
        detail: config.notifiedApiUrls.join(', '),
      });
    }
    if (config.gnwRssKeywords) {
      methodology.sources.push({
        name: 'GlobeNewsWire RSS',
        type: 'supplementary',
        detail: `Keywords: ${config.gnwRssKeywords.join(', ')}`,
      });
    }
    if (config.irUrl) {
      methodology.sources.push({
        name: 'IR Page Scrape',
        type: 'supplementary',
        detail: config.irUrl,
      });
    }
    if (config.newsroomUrls) {
      methodology.sources.push({
        name: 'Newsroom Scrape',
        type: 'supplementary',
        detail: config.newsroomUrls.join(', '),
      });
    }
    if (config.rssUrls) {
      methodology.sources.push({
        name: 'Generic RSS/Atom',
        type: 'supplementary',
        detail: config.rssUrls.join(', '),
      });
    }

    // DB stats
    try {
      await ensureTable();
      const sql = getSQL();
      if (sql) {
        const [stats] = await sql`
          SELECT
            COUNT(*) AS total,
            MIN(datetime) AS oldest,
            MAX(datetime) AS newest,
            COUNT(DISTINCT source) AS source_count
          FROM press_releases WHERE ticker = ${ticker}`;
        methodology.dbStats = {
          totalRows: Number(stats.total),
          oldest: stats.oldest,
          newest: stats.newest,
          distinctSources: Number(stats.source_count),
        };
        const topSources = await sql`
          SELECT source, COUNT(*) AS cnt
          FROM press_releases WHERE ticker = ${ticker}
          GROUP BY source ORDER BY cnt DESC LIMIT 10`;
        methodology.dbStats.topSources = topSources.map(r => ({
          source: r.source || '(empty)',
          count: Number(r.cnt),
        }));
      }
    } catch { /* stats are best-effort */ }

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).send(JSON.stringify(methodology));
  }

  const wrapInNews = config.type === 'amazon-leo';

  // Ensure DB table exists before any DB operations
  await ensureTable();

  // Clean up junk headlines from DB — throttled to once per hour to avoid
  // count oscillation (items deleted then re-fetched on every request cycle)
  const now = Date.now();
  if (now - _lastJunkPurge > 60 * 60 * 1000) {
    try {
      const sql = getSQL();
      if (sql) {
        await sql`DELETE FROM press_releases WHERE
          headline ~* '^(stock news live|merger\\s*&\\s*acquisitions?|clinical trials?|market research|media room|investor relations|press room|newsroom|link to\\b)' OR
          headline ~* '(opens in new window|read media release|\\(pdf\\b|\\d+ min read$)' OR
          array_length(string_to_array(trim(headline), ' '), 1) < 4 OR
          length(trim(headline)) > 300`;
        // Purge NOK Group (Japanese rubber company) entries — wrong company
        await sql`DELETE FROM press_releases WHERE
          ticker = 'NOK' AND
          headline ~* '(rubber|hydrogen energy|workplace|workshop|seal|gasket|nok group|carbon.neutral|global one nok)'`;
        // Purge NVDA newsroom-scrape articles that don't mention nvidia/nvda (generic blog posts)
        await sql`DELETE FROM press_releases WHERE
          ticker = 'NVDA' AND
          internal_source = 'newsroom-scrape' AND
          headline !~* '(nvidia|\mnvda\M)'`;
        _lastJunkPurge = now;
      }
    } catch { /* cleanup is best-effort */ }
  }

  // Filter DB items: trust ticker-specific sources (IR, RSS), but
  // apply headline filter to newsroom-scrape and keyword-search sources (GNW)
  const TRUSTED_SOURCES = new Set(['ir-scrape', 'notified-rss', 'stocktitan', 'generic-rss', 'notified-json', 'newsfile-company']);
  const applyTickerFilter = (items) => {
    if (!config.filter) return items; // T and AMZLEO have no filter
    return items.filter(item => {
      if (TRUSTED_SOURCES.has(item._source)) return true;
      return config.filter((item.headline || '').toLowerCase());
    });
  };

  // ── MODE: DB — serve from database only (page load) ──
  if (mode === 'db') {
    try {
      const dbItems = applyTickerFilter(await loadFromDB(ticker));
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
      default:
        return res.status(500).json({ error: `Unknown type: ${config.type}` });
    }

    // Load existing DB items to know what's already stored
    let dbHashes = new Set();
    let dbItems = [];
    try {
      dbItems = applyTickerFilter(await loadFromDB(ticker));
      for (const d of dbItems) dbHashes.add(normalizeHl(d.headline));
      console.log(`press-intelligence refresh (${ticker}) [grade=${config.grade}]: ${dbItems.length} existing DB items, ${items.length} upstream items`);
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
    // Clean upstream headlines to match DB format before merge/dedupe
    for (const item of items) {
      if (item.headline) item.headline = cleanHeadline(item.headline);
    }

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
      const dbItems = applyTickerFilter(await loadFromDB(ticker));
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
