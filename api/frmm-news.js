// api/frmm-news.js
// Proxy for FRMM (Forum Markets, formerly ETHZ/Ether Capital) press releases via QuoteMedia/AccessWire
// Filters to official company releases only (wire services + headline match)
// Cache: 5 minutes
let cache = null;
let cacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const now = Date.now();
  if (cache && now - cacheTime < CACHE_TTL) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-Cache', 'HIT');
    return res.status(200).send(cache);
  }

  try {
    // Try both old (ETHZ) and new (FRMM) tickers for broader coverage
    const urls = [
      'https://www.accesswire.com/qm/data/getHeadlines.json' +
      '?topics=FRMM' +
      '&excludeTopics=NONCOMPANY' +
      '&noSrc=qmr' +
      '&src=pzo,bayaw,prn,bwi,TheNewsWire,nfil,actw,irw,acn,cnw,nwd,glpr,nwmw' +
      '&summary=true&summLen=300&thumbnailurl=true' +
      '&start=1000-01-01&end=3000-01-01',
      'https://www.accesswire.com/qm/data/getHeadlines.json' +
      '?topics=ETHZ' +
      '&excludeTopics=NONCOMPANY' +
      '&noSrc=qmr' +
      '&src=pzo,bayaw,prn,bwi,TheNewsWire,nfil,actw,irw,acn,cnw,nwd,glpr,nwmw' +
      '&summary=true&summLen=300&thumbnailurl=true' +
      '&start=1000-01-01&end=3000-01-01',
    ];

    let allItems = [];
    for (const url of urls) {
      try {
        const upstream = await fetch(url, {
          headers: { 'User-Agent': 'Mozilla/5.0 (compatible; StockingsBot/1.0)' },
        });
        if (!upstream.ok) continue;
        const raw = await upstream.json();
        const json = typeof raw === 'string' ? JSON.parse(raw) : raw;
        const items = json?.results?.news?.[0]?.newsitem ?? [];
        allItems = allItems.concat(items);
      } catch {
        // continue to next URL
      }
    }

    const officialSources = ['pr newswire', 'business wire', 'globe newswire', 'globenewswire', 'accesswire', 'canada newswire'];
    const filtered = allItems.filter((item) => {
      const src = (item.source || '').toLowerCase();
      const hl = (item.headline || '').toLowerCase();
      return (
        officialSources.some((s) => src.includes(s)) &&
        (/forum\s*markets/i.test(hl) || /ether\s*capital/i.test(hl) || /\bfrmm\b/.test(hl) || /\bethz\b/.test(hl))
      );
    });

    const seen = new Set();
    const deduped = filtered.filter((item) => {
      const key = item.permalink || item.newsid;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    const payload = JSON.stringify(deduped);
    cache = payload;
    cacheTime = now;

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-Cache', 'MISS');
    res.setHeader('X-Total-Raw', allItems.length);
    res.setHeader('X-Total-Filtered', deduped.length);
    return res.status(200).send(payload);
  } catch (err) {
    console.error('frmm-news error:', err);
    return res.status(500).json({ error: err.message });
  }
}
