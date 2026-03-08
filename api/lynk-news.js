// api/lynk-news.js
// KEY: export const config = { runtime: 'edge' }
// Edge functions run on Cloudflare's own network — CF-protected sites
// like lynk.world pass through CF-to-CF traffic without challenge pages.
// Standard Node.js serverless (Vercel's default) gets blocked because
// Vercel's datacenter IPs are on Cloudflare's challenge list.
export const config = { runtime: 'edge' };
const VERSION = 'v7-edge-2026-03-09';
function strip(s) { return (s||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim(); }
function decode(s) {
  return (s||'')
    .replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>')
    .replace(/&quot;/g,'"').replace(/&#039;/g,"'").replace(/&nbsp;/g,' ')
    .replace(/&#8217;/g,'\u2019').replace(/&#8216;/g,'\u2018')
    .replace(/&#8220;/g,'\u201C').replace(/&#8221;/g,'\u201D')
    .replace(/&#8211;/g,'\u2013').replace(/&#8230;/g,'\u2026');
}
const MONTHS = {january:1,february:2,march:3,april:4,may:5,june:6,july:7,august:8,september:9,october:10,november:11,december:12};
function parseDate(s) {
  if (!s) return null;
  const m = s.trim().match(/^(\w+)\s+(\d{1,2})?,?\s*(\d{4})$/i);
  if (m) {
    const mon = MONTHS[m[1].toLowerCase()];
    const day = m[2] ? parseInt(m[2]) : 1;
    const yr = parseInt(m[3]);
    if (mon && yr) return new Date(yr, mon-1, day).toISOString();
  }
  const d = new Date(s.trim());
  return isNaN(d) ? null : d.toISOString();
}
const NAV_EXACT = new Set([
  'https://lynk.world/','https://lynk.world/what-we-do/','https://lynk.world/how-we-do-it/',
  'https://lynk.world/our-partners/','https://lynk.world/news/','https://lynk.world/careers/',
  'https://lynk.world/our-team/','https://lynk.world/the-human-impact/','https://lynk.world/blog/',
  'https://lynk.world/contact/','https://lynk.world/podcasts-and-videos/',
  'https://lynk.world/op-eds/','https://lynk.world/press-releases/','https://lynk.world/media-coverage/',
  'https://lynk.world/news/#news_anchor','https://lynk.world/media-coverage/#news_anchor',
  'https://lynk.world/podcasts-and-videos/#news_anchor','https://lynk.world/op-eds/#news_anchor',
  'https://lynk.world/press-releases/#news_anchor',
]);
function validHref(href) {
  if (!href) return false;
  if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return false;
  const full = href.startsWith('http') ? href : `https://lynk.world${href.startsWith('/')? href : '/'+href}`;
  return !NAV_EXACT.has(full);
}
function parsePage(html, category) {
  const elements = [];
  let m;
  const reDate = /<p[^>]*>\s*((?:January|February|March|April|May|June|July|August|September|October|November|December)[^<]{3,20})\s*<\/p>/gi;
  while ((m = reDate.exec(html)) !== null) {
    const t = m[1].trim();
    if (/\d{4}/.test(t)) elements.push({ type:'date', pos:m.index, text:t });
  }
  const reH5 = /<h5[^>]*>([\s\S]*?)<\/h5>/gi;
  while ((m = reH5.exec(html)) !== null) {
    const a = m[1].match(/<a\s[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i);
    if (!a) continue;
    const text = decode(strip(a[2]));
    if (!text || text.length < 8) continue;
    if (!validHref(a[1])) continue;
    const full = a[1].startsWith('http') ? a[1] : `https://lynk.world${a[1].startsWith('/')? a[1] : '/'+a[1]}`;
    elements.push({ type:'heading', pos:m.index, href:full, text });
  }
  const reH6 = /<h6[^>]*>([\s\S]*?)<\/h6>/gi;
  while ((m = reH6.exec(html)) !== null) {
    const t = decode(strip(m[1]));
    if (t && t.length > 1 && t.length < 120) elements.push({ type:'source', pos:m.index, text:t });
  }
  const reP = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  while ((m = reP.exec(html)) !== null) {
    const t = decode(strip(m[1]));
    if (t.length > 40 && !/^(January|February|March|April|May|June|July|August|September|October|November|December)/i.test(t)) {
      elements.push({ type:'summary', pos:m.index, text:t });
    }
  }
  elements.sort((a,b) => a.pos - b.pos);
  const headings = elements.filter(e => e.type === 'heading');
  const items = [];
  for (let i = 0; i < headings.length; i++) {
    const h = headings[i];
    const nextH = headings[i+1];
    const nearDate = elements.filter(e => e.type==='date' && e.pos < h.pos).pop();
    const src = elements.find(e => e.type==='source' && e.pos > h.pos && (!nextH || e.pos < nextH.pos));
    const summary = elements.find(e => e.type==='summary' && e.pos > h.pos && (!nextH || e.pos < nextH.pos));
    items.push({
      newsid: `lynk-${h.href.replace(/[^a-z0-9]/gi,'-').slice(-60)}`,
      datetime: parseDate(nearDate?.text) || new Date().toISOString(),
      source: src?.text || 'Lynk Global',
      headline: h.text,
      qmsummary: (summary?.text || '').slice(0, 300),
      permalink: h.href,
      storyurl: h.href,
      category,
      _source: 'lynk',
    });
  }
  return items;
}
async function scrapePage(url, category) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
      },
    });
    const html = await res.text();
    const items = parsePage(html, category);
    return { items, htmlLen: html.length, status: res.status, htmlSnip: html.slice(0, 300) };
  } catch (e) {
    return { items: [], htmlLen: 0, status: 0, htmlSnip: '', error: e.message };
  }
}
export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const isDebug = searchParams.get('debug') === '1';
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: { 'Access-Control-Allow-Origin': '*' } });
  }
  const pages = [
    { url: 'https://lynk.world/news/', category: 'all' },
    { url: 'https://lynk.world/press-releases/', category: 'press-release' },
    { url: 'https://lynk.world/media-coverage/', category: 'media' },
    { url: 'https://lynk.world/podcasts-and-videos/', category: 'media' },
    { url: 'https://lynk.world/op-eds/', category: 'opinion' },
  ];
  const results = await Promise.all(pages.map(p => scrapePage(p.url, p.category)));
  const allItems = results.flatMap(r => r.items);
  const seen = new Set();
  const unique = allItems.filter(item => {
    const key = item.permalink.toLowerCase().replace(/\/+$/,'');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  const now = Date.now();
  for (const item of unique) {
    if (new Date(item.datetime).getTime() > now) item.isUpcoming = true;
  }
  unique.sort((a,b) => new Date(b.datetime) - new Date(a.datetime));
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
    'X-Version': VERSION,
    'X-Total': String(unique.length),
  };
  if (isDebug) {
    return new Response(JSON.stringify({
      version: VERSION,
      total: unique.length,
      pages: pages.map((p,i) => ({
        url: p.url,
        status: results[i].status,
        htmlLen: results[i].htmlLen,
        count: results[i].items.length,
        error: results[i].error || null,
        htmlSnip: results[i].htmlSnip,
      })),
      sample: unique.slice(0,5).map(i => ({ headline: i.headline, datetime: i.datetime, source: i.source })),
    }), { status: 200, headers });
  }
  return new Response(JSON.stringify({ news: unique }), { status: 200, headers });
}
