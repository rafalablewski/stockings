/**
 * CIK numbers for tracked companies (zero-padded to 10 digits).
 * Source: SEC EDGAR (data.sec.gov/submissions/CIK{cik}.json)
 *
 * Single source of truth — imported by /api/edgar/[ticker] and /api/sec-intelligence.
 */
export const CIK_MAP: Record<string, string> = {
  // ─── Space Technology ───
  ASTS: '0001780312',
  RKLB: '0001819994',
  SATS: '0001001082',
  LUNR: '0001807707',
  VSAT: '0000797721',
  GSAT: '0001366868',
  IRDM: '0001418819',
  PL:   '0001836935',
  // ─── Digital Assets ───
  BMNR: '0001829311',
  MSTR: '0001050446',
  MARA: '0001507605',
  RIOT: '0001167419',
  CLSK: '0000827876',
  HUT:  '0001964789',
  IREN: '0001822523',
  COIN: '0001679788',
  BITF: '0001725079',
  CORZ: '0001839341',
  APLD: '0001144879',
  CAN:  '0001737995',
  ARBK: '0001833214',
  BKKT: '0001820302',
  CIFR: '0001819454',
  HIVE: '0001820630',
  FRMM: '0001838831',
  // ─── Fintech ───
  AFRM: '0001820953',
  SEZL: '0001662991',
  SQ:   '0001512673',
  V:    '0001403161',
  MA:   '0001141391',
  SOFI: '0001818874',
  PYPL: '0001633917',
  UPST: '0001647639',
  AXP:  '0000004962',
  HOOD: '0001783879',
  CRCL: '0001876042',
  // ─── Financial Services ───
  BLK:  '0001364742',
  CME:  '0001156375',
  ICE:  '0001571949',
  C:    '0000831001',
  HSBC: '0000083246',
  // ─── Telecom ───
  T:    '0000732717',
  VZ:   '0000732712',
  TMUS: '0001283699',
  VOD:  '0000839923',
  NOK:  '0000804328',
  ERIC: '0000717826',
  BCE:  '0000718940',
  // ─── Technology ───
  GOOGL: '0001652044',
  NVDA:  '0001045810',
  IBM:   '0000051143',
  QCOM:  '0000804328',
  // ─── Aerospace & Defense ───
  BA:   '0000012927',
  LMT:  '0000936468',
  // ─── Infrastructure ───
  AMT:  '0001053507',
};

/** Dynamic CIK lookup cache — populated from SEC company_tickers.json on first miss */
let dynamicCikCache: Record<string, string> | null = null;
let dynamicCikFetchPromise: Promise<void> | null = null;

async function fetchDynamicCikMap(): Promise<void> {
  if (dynamicCikCache) return;
  if (dynamicCikFetchPromise) {
    await dynamicCikFetchPromise;
    return;
  }
  dynamicCikFetchPromise = (async () => {
    try {
      const res = await fetch('https://www.sec.gov/files/company_tickers.json', {
        headers: {
          'User-Agent': 'Stockings Research App research@stockings.dev',
          Accept: 'application/json',
        },
        next: { revalidate: 86400 },
      });
      if (!res.ok) throw new Error(`SEC returned ${res.status}`);
      const data: Record<string, { cik_str: number; ticker: string; title: string }> = await res.json();
      const map: Record<string, string> = {};
      for (const entry of Object.values(data)) {
        map[entry.ticker.toUpperCase()] = String(entry.cik_str).padStart(10, '0');
      }
      dynamicCikCache = map;
    } catch {
      dynamicCikCache = {};
    }
  })();
  await dynamicCikFetchPromise;
}

/**
 * Resolve a ticker to its CIK number.
 * Tries static CIK_MAP first, falls back to SEC's company_tickers.json.
 */
export async function resolveCik(ticker: string): Promise<string | null> {
  const upper = ticker.toUpperCase();
  if (CIK_MAP[upper]) return CIK_MAP[upper];
  await fetchDynamicCikMap();
  return dynamicCikCache?.[upper] ?? null;
}
