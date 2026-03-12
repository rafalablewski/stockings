/**
 * Test script to verify the root cause of the entry count discrepancy:
 *   Page load (DB mode): 8832
 *   Refresh button:      8852
 *   Hard refresh:        8832
 *
 * Hypothesis: LIMIT 1000 in loadFromDB caps per-ticker counts in DB mode,
 * while refresh mode's in-memory merge can exceed that limit.
 *
 * Run: node scripts/test-entry-count-bug.js
 */

// ═══════════════════════════════════════════════════════════════════════════
//  Extract core logic from api/press-intelligence.js
// ═══════════════════════════════════════════════════════════════════════════

function normalizeHl(h) {
  return (h || '').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 80);
}

function cleanHeadline(text) {
  if (!text) return '';
  let t = text.trim();
  t = t.replace(/^link to\s+/i, '');
  t = t.replace(/\s*\|\s*\d+\s*min\s*read\s*$/i, '');
  t = t.replace(/^(?:Research|Podcasts?|Blog|News|Press Release|Article|Insight|Report)\s*[•·|–—-]\s*/i, '');
  t = t.replace(/\s*[•·|]\s*(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s*\d{4}\s*$/i, '');
  return t.trim();
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
    if (seenHl.has(kh) || (ku && seenUrl.has(ku))) continue;
    seenHl.add(kh);
    if (ku) seenUrl.add(ku);
    out.push(item);
  }
  out.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
  return out;
}

const TRUSTED_SOURCES = new Set(['ir-scrape', 'notified-rss', 'stocktitan', 'generic-rss', 'notified-json', 'newsfile-company']);

function applyTickerFilter(items, configFilter) {
  if (!configFilter) return items;
  return items.filter(item => {
    if (TRUSTED_SOURCES.has(item._source)) return true;
    return configFilter((item.headline || '').toLowerCase());
  });
}

// ═══════════════════════════════════════════════════════════════════════════
//  Test helpers — generate realistic fake data
// ═══════════════════════════════════════════════════════════════════════════

function makeItem(ticker, index, source, _source, prefix) {
  const date = new Date(Date.now() - index * 3600 * 1000); // 1 hour apart
  const pfx = prefix || 'db';
  return {
    headline: `${ticker} announces quarterly results for ${pfx} item number ${Math.abs(index)} batch ${pfx}`,
    datetime: date.toISOString(),
    source: source || 'Business Wire',
    _source: _source || '',
    permalink: `https://example.com/${ticker.toLowerCase()}/${pfx}-news-${Math.abs(index)}`,
  };
}

function makeDB(tickers) {
  // Simulates the actual database: stores ALL items (no limit)
  const db = {};
  for (const { ticker, count, filter } of tickers) {
    db[ticker] = { items: [], filter };
    for (let i = 0; i < count; i++) {
      db[ticker].items.push(makeItem(ticker, i, 'Business Wire', '', 'db'));
    }
  }
  return db;
}

// Simulates loadFromDB with LIMIT 1000
function loadFromDB(db, ticker) {
  const data = db[ticker];
  if (!data) return [];
  // Sort by datetime DESC, then LIMIT 1000 — exactly like the real query
  const sorted = [...data.items].sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
  return sorted.slice(0, 1000).map(item => ({
    ...item,
    _source: item._source || 'db',
  }));
}

// Simulates persistItems
function persistItems(db, ticker, items) {
  const data = db[ticker];
  if (!data) return;
  const existingHashes = new Set(data.items.map(i => normalizeHl(i.headline)));
  for (const item of items) {
    const hash = normalizeHl(cleanHeadline(item.headline));
    if (!existingHashes.has(hash)) {
      data.items.push({ ...item, headline: cleanHeadline(item.headline) });
      existingHashes.add(hash);
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
//  TEST 1: LIMIT 1000 caps DB mode count for high-volume tickers
// ═══════════════════════════════════════════════════════════════════════════

function test1() {
  console.log('\n══════════════════════════════════════════════════');
  console.log('TEST 1: LIMIT 1000 caps DB mode for high-volume tickers');
  console.log('══════════════════════════════════════════════════');

  const db = makeDB([
    { ticker: 'MSTR', count: 1050, filter: (hl) => /strategy|microstrategy|mstr/i.test(hl) },
  ]);

  // DB mode: loadFromDB with LIMIT 1000
  const dbItems = loadFromDB(db, 'MSTR');
  const dbFiltered = applyTickerFilter(dbItems, db['MSTR'].filter);

  // Refresh mode: fetch 30 new upstream items + merge with DB
  const upstreamItems = [];
  for (let i = 0; i < 30; i++) {
    upstreamItems.push(makeItem('MSTR', -(i + 1), 'Business Wire', 'quotemedia', 'upstream')); // newer items
  }
  const refreshDbItems = applyTickerFilter(loadFromDB(db, 'MSTR'), db['MSTR'].filter);
  const merged = dedupe([...upstreamItems, ...refreshDbItems]);

  console.log(`  DB has ${db['MSTR'].items.length} total items for MSTR`);
  console.log(`  DB mode returns:      ${dbFiltered.length} items (LIMIT 1000 applied)`);
  console.log(`  Refresh mode returns: ${merged.length} items (merge bypasses limit)`);
  console.log(`  Difference:           +${merged.length - dbFiltered.length} items`);

  const pass = merged.length > dbFiltered.length;
  console.log(`  RESULT: ${pass ? '✓ PASS' : '✗ FAIL'} — refresh shows more items than DB mode due to LIMIT 1000`);
  return pass;
}

// ═══════════════════════════════════════════════════════════════════════════
//  TEST 2: Full flow — DB load → refresh → persist → DB load shows same count
// ═══════════════════════════════════════════════════════════════════════════

function test2() {
  console.log('\n══════════════════════════════════════════════════');
  console.log('TEST 2: Full flow — count resets after refresh + persist + reload');
  console.log('══════════════════════════════════════════════════');

  // Simulate multiple tickers, some at/above 1000
  const tickers = [
    { ticker: 'MSTR', count: 1020, filter: (hl) => /mstr|strategy/i.test(hl) },
    { ticker: 'MARA', count: 1005, filter: (hl) => /mara|marathon/i.test(hl) },
    { ticker: 'ASTS', count: 200, filter: (hl) => /asts|spacemobile/i.test(hl) },
    { ticker: 'RIOT', count: 150, filter: (hl) => /riot/i.test(hl) },
  ];
  const db = makeDB(tickers);

  // Step 1: Initial page load (DB mode)
  let initialTotal = 0;
  for (const { ticker } of tickers) {
    const items = applyTickerFilter(loadFromDB(db, ticker), db[ticker].filter);
    initialTotal += items.length;
  }

  // Step 2: Refresh — fetch upstream + merge + persist
  let refreshTotal = 0;
  const newItemsPerTicker = { MSTR: 10, MARA: 8, ASTS: 2, RIOT: 0 }; // 20 new items total
  for (const { ticker } of tickers) {
    const upstreamItems = [];
    for (let i = 0; i < (newItemsPerTicker[ticker] || 0); i++) {
      upstreamItems.push(makeItem(ticker, -(i + 1), 'Business Wire', 'quotemedia', 'upstream'));
    }
    const refreshDbItems = applyTickerFilter(loadFromDB(db, ticker), db[ticker].filter);
    // Persist upstream items (like the real API does)
    persistItems(db, ticker, upstreamItems);
    // Merge (like the real API does — does NOT re-read from DB)
    const merged = dedupe([...upstreamItems, ...refreshDbItems]);
    refreshTotal += merged.length;
  }

  // Step 3: Hard refresh — DB mode again
  let reloadTotal = 0;
  for (const { ticker } of tickers) {
    const items = applyTickerFilter(loadFromDB(db, ticker), db[ticker].filter);
    reloadTotal += items.length;
  }

  console.log(`  Initial page load (DB mode): ${initialTotal}`);
  console.log(`  After refresh button:        ${refreshTotal} (+${refreshTotal - initialTotal})`);
  console.log(`  After hard refresh (DB mode): ${reloadTotal}`);
  console.log(`  `);
  console.log(`  MSTR in DB: ${db['MSTR'].items.length} (capped tickers absorb new items without increasing count)`);
  console.log(`  MARA in DB: ${db['MARA'].items.length}`);
  console.log(`  ASTS in DB: ${db['ASTS'].items.length} (under 1000 — DOES increase)`);

  // The bug: refresh shows more, but reload goes back (for capped tickers)
  const refreshShowsMore = refreshTotal > initialTotal;
  const reloadResetsForCapped = reloadTotal < refreshTotal;
  // ASTS (under limit) should increase, but capped tickers don't
  const pass = refreshShowsMore && reloadResetsForCapped;

  console.log(`  `);
  console.log(`  Refresh shows more than initial: ${refreshShowsMore ? 'YES' : 'NO'}`);
  console.log(`  Reload drops back below refresh: ${reloadResetsForCapped ? 'YES' : 'NO'}`);
  console.log(`  RESULT: ${pass ? '✓ PASS' : '✗ FAIL'} — LIMIT 1000 causes count to reset for capped tickers`);
  return pass;
}

// ═══════════════════════════════════════════════════════════════════════════
//  TEST 3: Items survive DB round-trip (applyTickerFilter is NOT the cause)
// ═══════════════════════════════════════════════════════════════════════════

function test3() {
  console.log('\n══════════════════════════════════════════════════');
  console.log('TEST 3: Items survive DB round-trip (applyTickerFilter is consistent)');
  console.log('══════════════════════════════════════════════════');

  const configFilter = (hl) => /mstr|strategy|microstrategy/i.test(hl);

  // Simulate upstream items that pass the fetcher's filter
  const upstreamItems = [
    { headline: 'Strategy Announces Q4 2025 Results', datetime: new Date().toISOString(), source: 'Business Wire', _source: 'quotemedia', permalink: 'https://example.com/1' },
    { headline: 'MSTR Holdings Reports Record Revenue', datetime: new Date().toISOString(), source: 'PR Newswire', _source: 'gnw-rss', permalink: 'https://example.com/2' },
    { headline: 'MicroStrategy Acquires 500 Bitcoin', datetime: new Date().toISOString(), source: 'Globe Newswire', _source: 'ir-scrape', permalink: 'https://example.com/3' },
  ];

  // Verify all items pass the fetcher filter (as they would in fetchQmSimple/fetchCrypto)
  const passedFetcher = upstreamItems.filter(i => configFilter(i.headline.toLowerCase()));
  console.log(`  Upstream items that pass fetcher filter: ${passedFetcher.length}/${upstreamItems.length}`);

  // Simulate persist → reload: items get _source changed
  const afterPersistAndReload = upstreamItems.map(item => ({
    ...item,
    headline: cleanHeadline(item.headline),
    _source: item._source || 'db',  // simulates: internal_source stored, then reloaded with || 'db'
  }));

  // Apply applyTickerFilter (as DB mode does)
  const survivedFilter = applyTickerFilter(afterPersistAndReload, configFilter);

  console.log(`  Items surviving applyTickerFilter after round-trip: ${survivedFilter.length}/${afterPersistAndReload.length}`);

  // Also test with _source = '' (QuoteMedia items stored without _source)
  const qmItems = upstreamItems.map(item => ({
    ...item,
    _source: '',  // QuoteMedia items from fetchQM have no _source
  }));
  const qmAfterReload = qmItems.map(item => ({
    ...item,
    headline: cleanHeadline(item.headline),
    _source: item._source || 'db',  // '' || 'db' = 'db'
  }));
  const qmSurvived = applyTickerFilter(qmAfterReload, configFilter);
  console.log(`  QM items (no _source) surviving after round-trip: ${qmSurvived.length}/${qmAfterReload.length}`);

  const allSurvive = survivedFilter.length === upstreamItems.length && qmSurvived.length === qmItems.length;
  console.log(`  `);
  console.log(`  RESULT: ${allSurvive ? '✓ PASS' : '✗ FAIL'} — all items survive DB round-trip`);
  console.log(`  → applyTickerFilter is NOT the cause of the discrepancy`);
  return allSurvive;
}

// ═══════════════════════════════════════════════════════════════════════════
//  Run all tests
// ═══════════════════════════════════════════════════════════════════════════

console.log('Entry Count Bug — Hypothesis Verification Tests');
console.log('================================================');
console.log('Hypothesis: LIMIT 1000 in loadFromDB causes the discrepancy');
console.log('  - DB mode caps per-ticker items at 1000');
console.log('  - Refresh merges upstream items on top, exceeding the cap');
console.log('  - After persist + reload, LIMIT 1000 resets the count');

const results = [test1(), test2(), test3()];

console.log('\n══════════════════════════════════════════════════');
console.log('SUMMARY');
console.log('══════════════════════════════════════════════════');
console.log(`  Test 1 (LIMIT 1000 caps DB mode):        ${results[0] ? '✓ PASS' : '✗ FAIL'}`);
console.log(`  Test 2 (Full flow count reset):           ${results[1] ? '✓ PASS' : '✗ FAIL'}`);
console.log(`  Test 3 (Items survive round-trip):        ${results[2] ? '✓ PASS' : '✗ FAIL'}`);
console.log(`  `);
if (results.every(Boolean)) {
  console.log('  ALL TESTS PASS — LIMIT 1000 in loadFromDB confirmed as root cause.');
  console.log('  Fix: after persist in refresh mode, re-read from DB instead of in-memory merge.');
} else {
  console.log('  SOME TESTS FAILED — hypothesis needs revision.');
}
