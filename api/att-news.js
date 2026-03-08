// api/att-news.js — AT&T (T) press release proxy v5
// Sources:
//   1. QuoteMedia / AccessWire — PR Newswire + Canada Newswire + Business Wire (~188 items)
//   2. corp.att.com/worldwide  — global business press releases 2018-2024 SSR (~50 items)
// Dropped: about.att.com (403 all methods), investors.att.com (JS-rendered Sitecore)
// Cache: 5 min

const VERSION = 'v8d-upcoming-flag-2026-03-08';

let cache = null;
let cacheTime = 0;
const CACHE_TTL = 60 * 1000; // 1 minute — catch releases within seconds of publish

const BROWSER_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Cache-Control': 'no-cache',
};

function decode(str) {
  return (str || '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
    .replace(/&#x2013;/g, '–').replace(/&#x2014;/g, '—')
    .replace(/&#xAE;/g, '®').replace(/&#x2122;/g, '™')
    .replace(/&#x2019;/g, "'").replace(/&#x2018;/g, "'")
    .replace(/&#x201C;/g, '"').replace(/&#x201D;/g, '"')
    .replace(/&#8217;/g, "'").replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"').replace(/&#8221;/g, '"')
    .trim();
}

function strip(str) {
  return (str || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

// Handles all corp.att.com date formats:
//   '10 APRIL 2024'  → April 10, 2024
//   '20 DEC 2022'    → Dec 20, 2022
//   '7 MARCH 2023'   → March 7, 2023
//   'JUNE 2019'      → June 1, 2019
function parseCorpDate(str) {
  if (!str) return null;
  // Title-case: 'MARCH' → 'March'
  const s = str.replace(/\b([A-Z]{2,})\b/g, w => w[0] + w.slice(1).toLowerCase()).trim();
  // 'D MMMM YYYY' or 'DD MMMM YYYY'
  const dmy = s.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (dmy) {
    const d = new Date(`${dmy[2]} ${dmy[1]}, ${dmy[3]}`);
    if (!isNaN(d.getTime())) return d.toISOString();
  }
  // 'MMMM YYYY' (no day — use 1st)
  const my = s.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (my) {
    const d = new Date(`${my[1]} 1, ${my[2]}`);
    if (!isNaN(d.getTime())) return d.toISOString();
  }
  // Anything else
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d.toISOString();
}

// ─── 1. QuoteMedia ────────────────────────────────────────────────────────────

async function fetchQuoteMedia() {
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
      return (
        official.some(s => src.includes(s)) &&
        (hl.includes('at&t') || hl.includes("at&t's"))
      );
    });
    return { items: filtered.map(i => ({ ...i, _source: 'quotemedia' })), error: null };
  } catch (e) {
    return { items: [], error: e.message };
  }
}

// ─── 2. corp.att.com/worldwide/att-press-release/ ────────────────────────────
// SSR WordPress. Structure: <h3>10 APRIL 2024</h3> ... <a href="about.att.com/...">TITLE</a>
// Nav links excluded — only article-domain links kept.

const ARTICLE_DOMAINS = [
  'about.att.com',
  'linkedin.com/pulse',
  'cybersecurity.att.com',
  'alienvault.com',
  'frost.com',
  'business.att.com/learn',
];

async function fetchCorpPR() {
  try {
    const res = await fetch(
      'https://www.corp.att.com/worldwide/att-press-release/',
      { headers: BROWSER_HEADERS }
    );
    if (!res.ok) return { items: [], error: `Corp PR HTTP ${res.status}` };
    const html = await res.text();

    // All date h3s (position = index after closing tag)
    const h3s = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)]
      .map(m => ({ end: m.index + m[0].length, text: strip(m[1]).trim() }))
      .filter(m => {
        const t = m.text;
        return t.length > 4 && !/^\d{4}$/.test(t) && /\d/.test(t) && t.length < 40;
      });

    // Article anchors only
    const anchors = [...html.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)]
      .map(m => ({ index: m.index, href: m[1], text: strip(m[2]).trim() }))
      .filter(a => ARTICLE_DOMAINS.some(d => a.href.includes(d)) && a.text.length > 8);

    const items = [];
    // Anchor-driven: for each article link, find the nearest h3 date BEFORE it
    for (const anchor of anchors) {
      // Find the last h3 whose end position is before this anchor
      let bestH3 = null;
      for (const h3 of h3s) {
        if (h3.end < anchor.index) bestH3 = h3;
        else break;
      }
      if (!bestH3) continue;

      const href = anchor.href.startsWith('http')
        ? anchor.href
        : `https://www.corp.att.com${anchor.href}`;
      const datetime = parseCorpDate(bestH3.text) || '2019-01-01T00:00:00.000Z';

      items.push({
        newsid: `corp-${href.replace(/[^a-z0-9]/gi, '-').slice(-60)}`,
        datetime,
        source: 'AT&T Corp PR',
        headline: decode(anchor.text),
        qmsummary: '',
        permalink: href,
        storyurl: href,
        _source: 'corp-pr',
      });
    }
    return { items, error: null };
  } catch (e) {
    return { items: [], error: e.message };
  }
}


// ─── 3. SEC EDGAR 8-K filings ─────────────────────────────────────────────────
// Uses EDGAR submissions JSON API — returns proper filing descriptions.
// AT&T CIK: 0000732717

async function fetchSECEdgar() {
  try {
    const url = 'https://data.sec.gov/submissions/CIK0000732717.json';
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'StockingsBot/1.0 contact@stockings.vercel.app',
        'Accept': 'application/json',
      },
    });
    if (!res.ok) return { items: [], error: `EDGAR HTTP ${res.status}` };
    const data = await res.json();

    const filings = data?.filings?.recent;
    if (!filings) return { items: [], error: 'No filings data' };

    const { form, filingDate, primaryDocument, accessionNumber, items: filingItems } = filings;
    const results = [];

    for (let i = 0; i < form.length; i++) {
      // Include 8-K, 8-K/A, and press-release-adjacent forms
      if (!['8-K', '8-K/A'].includes(form[i])) continue;

      const accession = (accessionNumber[i] || '').replace(/-/g, '');
      const cik = '732717';
      const doc = primaryDocument[i] || '';
      const date = filingDate[i] || '';
      const description = filingItems[i] || '';

      const permalink = accession
        ? `https://www.sec.gov/Archives/edgar/data/${cik}/${accession}/${doc}`
        : `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${cik}&type=8-K`;

      // Build meaningful headline from filing items field
      // Items field contains e.g. "2.02,9.01" for earnings or "1.01" for agreements
      const itemLabels = {
        '1.01': 'Material Agreement',
        '1.02': 'Material Agreement Terminated',
        '2.01': 'Acquisition/Disposal of Assets',
        '2.02': 'Results of Operations (Earnings)',
        '2.03': 'Material Financial Obligation',
        '2.05': 'Departure of Directors/Officers',
        '2.06': 'Material Impairment',
        '3.01': 'Delisting Notice',
        '5.02': 'Director/Officer Change',
        '5.03': 'Amendments to Charter',
        '7.01': 'Regulation FD Disclosure',
        '8.01': 'Other Events',
        '9.01': 'Financial Statements',
      };

      const itemCodes = (description || '').split(',').map(s => s.trim());
      const labels = itemCodes
        .map(code => itemLabels[code])
        .filter(Boolean);

      const headline = labels.length > 0
        ? `AT&T 8-K: ${labels[0]}${labels.length > 1 ? ` + ${labels.length - 1} more` : ''}`
        : `AT&T 8-K Filing`;

      let datetime = new Date().toISOString();
      try { if (date) datetime = new Date(date).toISOString(); } catch (_) {}

      results.push({
        newsid: `edgar-${accession || i}`,
        datetime,
        source: 'AT&T SEC 8-K',
        headline,
        qmsummary: `SEC Form 8-K filed ${date}. Items: ${description || 'N/A'}`,
        permalink,
        storyurl: permalink,
        _source: 'edgar',
      });
    }

    return { items: results, error: null };
  } catch (e) { return { items: [], error: e.message }; }
}

// ─── 4. PR Newswire RSS direct ────────────────────────────────────────────────
// Direct PR Newswire RSS for AT&T — may overlap with QuoteMedia but has full text.
// Dedup by permalink handles any overlap.

async function fetchPRNDirect() {
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
        // Filter to AT&T only
        const hl = title.toLowerCase();
        if (!hl.includes('at&t') && !hl.includes("at&t's")) continue;
        let datetime = new Date().toISOString();
        try { if (pubDate) datetime = new Date(pubDate).toISOString(); } catch (_) {}
        items.push({
          newsid: `prn-${link.replace(/[^a-z0-9]/gi, '-').slice(-60)}`,
          datetime,
          source: 'PR Newswire',
          headline: title,
          qmsummary: description,
          permalink: link,
          storyurl: link,
          _source: 'prn-direct',
        });
      }
      if (items.length > 0) return { items, error: null, rssUrl: url };
    } catch (_) { continue; }
  }
  return { items: [], error: 'PRN RSS unavailable' };
}

// ─── 5. services.att.com — AT&T Newsroom ─────────────────────────────────────
// Powers about.att.com/allnews.html. Working params: q=*:*&wt=json.
// 951 total articles — fetch full archive with rows=1000.

async function fetchAllNews() {
  try {
    const url = 'https://services.att.com/search/v1/newsroom' +
      '?app-id=attnews&q=*:*&fq=-rejectDoc:true&rows=1000&sort=published_date+desc&wt=json';
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://about.att.com/',
        'Origin': 'https://about.att.com',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
    if (!res.ok) return { items: [], error: `AllNews HTTP ${res.status}` };
    const json = await res.json();
    const numFound = json?.response?.numFound ?? 0;
    const docs = json?.response?.docs ?? [];
    const items = docs.map(doc => ({
      newsid: `allnews-${(doc.article_url || doc.id || '').replace(/[^a-z0-9]/gi, '-').slice(-60)}`,
      datetime: doc.published_date || new Date().toISOString(),
      source: 'AT&T Newsroom',
      headline: decode(doc.article_header || doc.title || ''),
      qmsummary: decode(doc.article_description || doc.description || ''),
      permalink: doc.article_url || (Array.isArray(doc.og_url) ? doc.og_url[0] : doc.og_url) || '',
      storyurl: doc.article_url || '',
      _source: 'allnews',
    })).filter(i => i.headline);
    return { items, error: null, numFound };
  } catch (e) { return { items: [], error: e.message }; }
}

// ─── Merge & deduplicate ──────────────────────────────────────────────────────

function normalizeHl(h) {
  return (h || '').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 60);
}

function mergeAndDedup(sources) {
  const seenUrl = new Set();
  const seenHl = new Set();
  const out = [];
  const now = Date.now();
  for (const { items } of sources) {
    for (const item of (items || [])) {
      const kh = normalizeHl(item.headline);
      const ku = item.permalink || '';
      if (!kh || kh.length < 4) continue;
      if (new Date(item.datetime).getTime() > now + 7 * 24 * 60 * 60 * 1000) continue; // drop >7 days future
      if (new Date(item.datetime).getTime() > now) item.isUpcoming = true; // near-future event
      if (seenHl.has(kh) || (ku && seenUrl.has(ku))) continue;
      seenHl.add(kh);
      if (ku) seenUrl.add(ku);
      out.push(item);
    }
  }
  out.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
  return out;
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const debug = req.query?.debug === '1';
  const now = Date.now();

  if (!debug && cache && now - cacheTime < CACHE_TTL) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-Cache', 'HIT');
    return res.status(200).send(cache);
  }

  try {
    const [qm, corpPR, edgar, prnDirect, allNews] = await Promise.all([
      fetchQuoteMedia(),
      fetchCorpPR(),
      fetchSECEdgar(),
      fetchPRNDirect(),
      fetchAllNews(),
    ]);

    const merged = mergeAndDedup([qm, prnDirect, allNews, corpPR, edgar]);

    if (debug) {
      return res.status(200).json({
        version: VERSION,
        sources: {
          quotemedia: { count: qm.items.length, error: qm.error,
            sample: qm.items.slice(0, 2).map(i => ({ headline: i.headline, datetime: i.datetime, source: i.source })) },
          prnDirect:  { count: prnDirect.items.length, error: prnDirect.error, rssUrl: prnDirect.rssUrl,
            sample: prnDirect.items.slice(0, 2).map(i => ({ headline: i.headline, datetime: i.datetime })) },
          corpPR:     { count: corpPR.items.length, error: corpPR.error,
            sample: corpPR.items.slice(0, 3).map(i => ({ headline: i.headline, datetime: i.datetime })) },
          allnews:    { count: allNews.items.length, error: allNews.error, numFound: allNews.numFound,
            sample: allNews.items.slice(0, 2).map(i => ({ headline: i.headline, datetime: i.datetime })) },
          edgar:      { count: edgar.items.length, error: edgar.error,
            sample: edgar.items.slice(0, 3).map(i => ({ headline: i.headline, datetime: i.datetime })) },
        },
        mergedCount: merged.length,
        mergedSample: merged.slice(0, 5).map(i => ({
          headline: i.headline, datetime: i.datetime, source: i.source, _source: i._source,
        })),
      });
    }

    const payload = JSON.stringify(merged);
    cache = payload;
    cacheTime = now;

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-Cache', 'MISS');
    res.setHeader('X-Version', VERSION);
    res.setHeader('X-QM-Count', qm.items.length);
    res.setHeader('X-PRN-Direct-Count', prnDirect.items.length);
    res.setHeader('X-CorpPR-Count', corpPR.items.length);
    res.setHeader('X-Edgar-Count', edgar.items.length);
    res.setHeader('X-Total', merged.length);

    return res.status(200).send(payload);
  } catch (e) {
    console.error('att-news error:', e);
    return res.status(500).json({ error: e.message });
  }
}
