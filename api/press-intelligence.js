// api/press-intelligence.js
// Unified press-release proxy for all 14 tickers
// Usage: /api/press-intelligence?ticker=ASTS
// Supported: ASTS, BMNR, IRDM, GSAT, VZ, T, AMZLEO, LYNK,
//            MSTR, MARA, RIOT, CLSK, FRMM, COIN

const caches = {};
const CACHE_TTL_DEFAULT = 5 * 60 * 1000;
const CACHE_TTL_SHORT = 60 * 1000;

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
    sources: ['business wire', 'pr newswire', 'globe newswire', 'globenewswire'],
    filter: (hl) => /echostar|sats|hughes/i.test(hl),
  },
  LUNR: {
    type: 'qm-simple',
    topics: ['LUNR'],
    sources: ['business wire', 'pr newswire', 'globe newswire', 'globenewswire'],
    filter: (hl) => /intuitive\s*machines|lunr/i.test(hl),
  },

  // ─── Crypto tickers (QM + optional fallbacks) ───
  MSTR: {
    type: 'crypto',
    topics: ['MSTR'],
    filter: (hl) => /\bstrategy\b/i.test(hl) || /microstrategy/i.test(hl) || /\bmstr\b/i.test(hl),
  },
  MARA: {
    type: 'crypto',
    topics: ['MARA'],
    filter: (hl) => /marathon\s*digital/i.test(hl) || /\bmara\b/i.test(hl) || /marathon\s*holdings/i.test(hl),
  },
  RIOT: {
    type: 'crypto',
    topics: ['RIOT'],
    filter: (hl) => /riot\s*platforms/i.test(hl) || /\briot\b/i.test(hl),
  },
  CLSK: {
    type: 'crypto',
    topics: ['CLSK'],
    filter: (hl) => /cleanspark/i.test(hl) || /\bclsk\b/i.test(hl),
  },
  HUT: {
    type: 'crypto',
    topics: ['HUT'],
    filter: (hl) => /hut\s*8|hut8|\bhut\b/i.test(hl),
  },
  IREN: {
    type: 'crypto',
    topics: ['IREN'],
    filter: (hl) => /\biren\b|iris\s*energy/i.test(hl),
  },
  COIN: {
    type: 'crypto',
    topics: ['COIN'],
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

  // ─── Complex multi-source tickers ───
  T: { type: 'att' },
  AMZLEO: { type: 'amazon-leo' },
  LYNK: { type: 'lynk' },
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
  return dedupe(filtered);
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
  const config = TICKER_CONFIG[ticker];
  if (!config) {
    return res.status(400).json({
      error: `Unknown ticker: ${ticker}. Supported: ${Object.keys(TICKER_CONFIG).join(', ')}`,
    });
  }

  const ttl = (config.type === 'att' || config.type === 'amazon-leo' || config.type === 'lynk')
    ? CACHE_TTL_SHORT : CACHE_TTL_DEFAULT;

  const now = Date.now();
  const cached = caches[ticker];
  if (cached && now - cached.ts < ttl) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-Cache', 'HIT');
    return res.status(200).send(cached.payload);
  }

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
      case 'lynk':
        items = await fetchLynk();
        break;
      default:
        return res.status(500).json({ error: `Unknown type: ${config.type}` });
    }

    // Wrap in { news: [...] } for AMZLEO and LYNK to match original response format
    const wrapInNews = config.type === 'amazon-leo' || config.type === 'lynk';
    const body = wrapInNews ? { news: items } : items;
    const payload = JSON.stringify(body);

    caches[ticker] = { payload, ts: now };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-Cache', 'MISS');
    res.setHeader('X-Total', items.length);
    return res.status(200).send(payload);
  } catch (err) {
    console.error(`press-intelligence error (${ticker}):`, err);
    return res.status(500).json({ error: err.message });
  }
}
