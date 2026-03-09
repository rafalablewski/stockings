// api/crypto-news.js
// Unified proxy for crypto/digital-asset press releases via QuoteMedia/AccessWire
// Supports: MSTR, MARA, RIOT, CLSK, FRMM (prev ETHZ), COIN
// Usage: /api/crypto-news?ticker=MSTR
// Filters to official company releases only (wire services + headline match)
// FRMM: TSX-listed, not in QuoteMedia — uses GlobeNewsWire RSS + Notified API + IR scrape
// Cache: 5 minutes per ticker

const caches = {};
const CACHE_TTL = 5 * 60 * 1000;

const OFFICIAL_SOURCES = ['pr newswire', 'business wire', 'globe newswire', 'globenewswire', 'accesswire', 'canada newswire', 'newsfile', 'investor relations', 'globenewswire rss'];

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
    // Try multiple QM ticker variants for Canadian exchanges
    topics: ['FRMM', 'ETHZ', 'FRMM:CA', 'ETHZ:CA'],
    filter: (hl) => /forum\s*markets/i.test(hl) || /ether\s*capital/i.test(hl) || /\bfrmm\b/i.test(hl) || /\bethz\b/i.test(hl),
    // FRMM is TSX-listed (Canadian) — QM may not index it; use multi-source fallback
    irUrl: 'https://ir.forum-markets.com/news-events/press-releases',
    // GlobeNewsWire RSS (NOT Google RSS) — direct wire service feeds
    gnwRssKeywords: ['Forum Markets Inc', 'Forum Markets', 'Ether Capital'],
    // Notified platform RSS + JSON API endpoints
    notifiedApiUrls: [
      'https://ir.forum-markets.com/rss/news-releases.xml',
      'https://ir.forum-markets.com/rss/press-releases.xml',
      'https://ir.forum-markets.com/feed',
    ],
    // Notified JSON API (the backend API the SPA calls)
    notifiedJsonApis: [
      'https://ir.forum-markets.com/api/PressRelease/GetPressReleaseList?pageSize=50&pageNumber=1',
      'https://ir.forum-markets.com/api/News/GetNewsList?pageSize=50&pageNumber=1&category=press-releases',
    ],
    // Newsfile company page (common Canadian wire service)
    newsfileCompanyUrls: [
      'https://www.newsfilecorp.com/company/Forum-Markets',
      'https://www.newsfilecorp.com/company/Forum-Markets-Inc',
      'https://www.newsfilecorp.com/company/Ether-Capital',
    ],
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

// ─── Utilities ───

function decodeEntities(str) {
  return (str || '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'")
    .replace(/&#8217;/g, '\u2019').replace(/&#8220;/g, '\u201C')
    .replace(/&#8221;/g, '\u201D').replace(/&#8211;/g, '\u2013')
    .replace(/&nbsp;/g, ' ').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
}

function stripTags(str) {
  return (str || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

// ─── GlobeNewsWire RSS (direct wire service, NOT Google RSS) ───

function parseRssXml(xml) {
  const items = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = itemRe.exec(xml)) !== null && items.length < 30) {
    const block = m[1];
    const title = decodeEntities(stripTags(block.match(/<title>([\s\S]*?)<\/title>/)?.[1] || ''));
    const link = stripTags(block.match(/<link>([\s\S]*?)<\/link>/)?.[1] || '');
    const pubDate = stripTags(block.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] || '');
    const desc = decodeEntities(stripTags(block.match(/<description>([\s\S]*?)<\/description>/)?.[1] || '')).slice(0, 300);
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

// Atom feed parser (GlobeNewsWire also serves Atom)
function parseAtomXml(xml) {
  const items = [];
  const entryRe = /<entry>([\s\S]*?)<\/entry>/g;
  let m;
  while ((m = entryRe.exec(xml)) !== null && items.length < 30) {
    const block = m[1];
    const title = decodeEntities(stripTags(block.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1] || ''));
    const link = block.match(/<link[^>]+href=["']([^"']+)["']/)?.[1] || '';
    const updated = stripTags(block.match(/<(?:published|updated)>([\s\S]*?)<\/(?:published|updated)>/)?.[1] || '');
    const summary = decodeEntities(stripTags(block.match(/<(?:summary|content)[^>]*>([\s\S]*?)<\/(?:summary|content)>/)?.[1] || '')).slice(0, 300);
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

async function fetchGnwRss(keywords) {
  const items = [];
  for (const keyword of keywords) {
    // Try multiple GlobeNewsWire RSS/Atom URL patterns
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
        if (items.length > 0) break; // got results, skip remaining URLs
      } catch (e) {
        console.warn(`[crypto-news] GNW RSS fetch failed for "${url}":`, e.message);
      }
    }
    if (items.length > 0) break;
  }
  return items;
}

// ─── Notified Platform RSS/API (for IR sites hosted on Notified) ───

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
      if (xml.includes('<item>')) {
        items = parseRssXml(xml);
      } else if (xml.includes('<entry>')) {
        items = parseAtomXml(xml);
      }
      // Re-tag source
      for (const item of items) {
        item.source = 'Investor Relations';
        item._source = 'notified-rss';
      }
      if (items.length > 0) return items;
    } catch (e) {
      console.warn(`[crypto-news] Notified RSS failed for "${url}":`, e.message);
    }
  }
  return [];
}

// ─── Notified Platform JSON API (backend API that IR SPA calls) ───

async function fetchNotifiedJson(apiUrls) {
  for (const url of apiUrls) {
    try {
      const res = await fetch(url, {
        headers: {
          ...BROWSER_HEADERS,
          'Accept': 'application/json, text/plain, */*',
          'X-Requested-With': 'XMLHttpRequest',
        },
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) {
        console.warn(`[crypto-news] Notified JSON API returned ${res.status} for ${url}`);
        continue;
      }
      const data = await res.json();

      // Notified API returns various formats — try common shapes
      const releases = data?.GetPressReleaseListResult || data?.data || data?.items || data?.results || (Array.isArray(data) ? data : []);
      if (!Array.isArray(releases) || releases.length === 0) continue;

      const items = [];
      for (const pr of releases) {
        const title = pr.Headline || pr.Title || pr.headline || pr.title || '';
        const date = pr.PressReleaseDate || pr.Date || pr.date || pr.publishDate || '';
        const prUrl = pr.LinkToDetailPage || pr.Url || pr.url || pr.link || '';
        if (!title || title.length < 10) continue;

        let datetime = '';
        if (date) {
          try { datetime = new Date(date).toISOString(); } catch { /* skip */ }
        }

        const origin = new URL(url).origin;
        const fullUrl = prUrl
          ? (prUrl.startsWith('http') ? prUrl : `${origin}${prUrl.startsWith('/') ? '' : '/'}${prUrl}`)
          : origin;

        items.push({
          newsid: `notified-json-${items.length}`,
          headline: decodeEntities(title),
          datetime: datetime || new Date().toISOString(),
          source: 'Investor Relations',
          permalink: fullUrl,
          storyurl: fullUrl,
          _source: 'notified-json',
        });
      }
      if (items.length > 0) {
        console.log(`[crypto-news] Notified JSON API returned ${items.length} items from ${url}`);
        return items;
      }
    } catch (e) {
      console.warn(`[crypto-news] Notified JSON API failed for "${url}":`, e.message);
    }
  }
  return [];
}

// ─── Newsfile Corp company page (direct company press releases) ───

async function fetchNewsfileCompany(companyUrls) {
  for (const url of companyUrls) {
    try {
      const res = await fetch(url, {
        headers: BROWSER_HEADERS,
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) continue;
      const html = await res.text();

      const items = [];
      // Newsfile company pages list releases with /release/[id]/ links
      const linkRe = /<a[^>]+href=["']((?:https:\/\/www\.newsfilecorp\.com)?\/release\/\d+\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
      let m;
      while ((m = linkRe.exec(html)) !== null && items.length < 30) {
        const href = m[1];
        const text = decodeEntities(stripTags(m[2]));
        if (!text || text.length < 15) continue;
        const fullUrl = href.startsWith('http') ? href : `https://www.newsfilecorp.com${href}`;
        const datetime = extractDateFromContext(html, m.index);

        items.push({
          newsid: `newsfile-${items.length}`,
          headline: text,
          datetime: datetime || new Date().toISOString(),
          source: 'Newsfile Corp',
          permalink: fullUrl,
          storyurl: fullUrl,
          _source: 'newsfile-company',
        });
      }
      if (items.length > 0) {
        console.log(`[crypto-news] Newsfile company page returned ${items.length} items from ${url}`);
        return items;
      }
    } catch (e) {
      console.warn(`[crypto-news] Newsfile company page failed for "${url}":`, e.message);
    }
  }
  return [];
}

// ─── Direct IR page HTML scrape (last resort) ───

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
    if (!res.ok) {
      console.warn(`[crypto-news] IR page returned ${res.status} for ${irUrl}`);
      return [];
    }
    const html = await res.text();
    const items = [];
    const origin = new URL(irUrl).origin;

    // Pattern 1: press-release/news-release/detail links (common IR platforms)
    const linkRe = /<a[^>]+href=["']([^"']*(?:press-release|news-release|press_release|\/detail\/|\/news\/)[^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
    let m;
    while ((m = linkRe.exec(html)) !== null && items.length < 30) {
      const href = m[1];
      const text = decodeEntities(stripTags(m[2]));
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
    console.warn(`[crypto-news] IR page scrape failed for ${irUrl}:`, e.message);
    return [];
  }
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

    // Fallback for tickers with extra sources (FRMM): try multiple data sources
    if ((config.gnwRssKeywords || config.notifiedApiUrls || config.notifiedJsonApis || config.newsfileCompanyUrls || config.irUrl) && finalItems.length < 3) {
      console.log(`[crypto-news] QM returned ${finalItems.length} for ${ticker}, trying fallback sources`);

      const fallbackPromises = [];

      // 1. Notified platform JSON API (most likely to have current data)
      if (config.notifiedJsonApis) {
        fallbackPromises.push(fetchNotifiedJson(config.notifiedJsonApis));
      }

      // 2. Newsfile Corp company page (common Canadian wire service)
      if (config.newsfileCompanyUrls) {
        fallbackPromises.push(fetchNewsfileCompany(config.newsfileCompanyUrls));
      }

      // 3. Notified platform RSS feeds (ir.forum-markets.com/rss/...)
      if (config.notifiedApiUrls) {
        fallbackPromises.push(fetchNotifiedRss(config.notifiedApiUrls));
      }

      // 4. GlobeNewsWire RSS feed (direct wire service, NOT Google)
      if (config.gnwRssKeywords) {
        fallbackPromises.push(fetchGnwRss(config.gnwRssKeywords));
      }

      // 5. Direct IR page HTML scrape (last resort)
      if (config.irUrl) {
        fallbackPromises.push(fetchIRPage(config.irUrl));
      }

      const results = await Promise.allSettled(fallbackPromises);

      // Filter fallback results:
      // - Sources from the company's own IR site (notified-json, notified-rss, ir-scrape)
      //   don't need company-name matching — they ARE the company's releases
      // - External sources (gnw-rss, newsfile) need headline filter to avoid unrelated results
      const filterFallback = (items) => items.filter((item) => {
        const hl = (item.headline || '').toLowerCase();
        if (hl.length < 15) return false; // skip nav links
        const src = item._source || '';
        // Trust company IR sources directly
        if (src === 'notified-json' || src === 'notified-rss' || src === 'newsfile-company') return true;
        // External sources need company-name headline match
        return hl.length >= 20 && config.filter(hl);
      });

      let fallbackItems = [];
      for (const r of results) {
        if (r.status === 'fulfilled' && r.value.length > 0) {
          fallbackItems.push(...filterFallback(r.value));
        }
      }

      finalItems = [...qmFiltered, ...fallbackItems];

      console.log(`[crypto-news] ${ticker} fallback: ${fallbackItems.length} items after filtering (from ${results.map(r => r.status === 'fulfilled' ? r.value.length : 0).join('+')} raw)`);
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
