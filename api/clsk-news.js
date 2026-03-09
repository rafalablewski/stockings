// api/clsk-news.js
// Proxy for CLSK (CleanSpark) press releases via QuoteMedia/AccessWire
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
    const url =
      'https://www.accesswire.com/qm/data/getHeadlines.json' +
      '?topics=CLSK' +
      '&excludeTopics=NONCOMPANY' +
      '&noSrc=qmr' +
      '&src=pzo,bayaw,prn,bwi,TheNewsWire,nfil,actw,irw,acn,cnw,nwd,glpr,nwmw' +
      '&summary=true&summLen=300&thumbnailurl=true' +
      '&start=1000-01-01&end=3000-01-01';

    const upstream = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; StockingsBot/1.0)' },
    });
    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: `Upstream ${upstream.status}` });
    }

    const raw = await upstream.json();
    const json = typeof raw === 'string' ? JSON.parse(raw) : raw;
    const items = json?.results?.news?.[0]?.newsitem ?? [];

    const officialSources = ['pr newswire', 'business wire', 'globe newswire', 'globenewswire', 'accesswire'];
    const filtered = items.filter((item) => {
      const src = (item.source || '').toLowerCase();
      const hl = (item.headline || '').toLowerCase();
      return (
        officialSources.some((s) => src.includes(s)) &&
        (/cleanspark/i.test(hl) || /\bclsk\b/.test(hl))
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
    res.setHeader('X-Total-Raw', items.length);
    res.setHeader('X-Total-Filtered', deduped.length);
    return res.status(200).send(payload);
  } catch (err) {
    console.error('clsk-news error:', err);
    return res.status(500).json({ error: err.message });
  }
}
