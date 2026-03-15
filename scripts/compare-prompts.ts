import { workflows } from '../src/data/workflows';

/**
 * Normalize prompts by replacing company-specific terms with generic placeholders.
 *
 * Two-pass strategy to avoid placeholders being corrupted by later regexes:
 *   Pass 1: Replace terms with unique sentinel tokens (e.g. \x00P01\x00)
 *   Pass 2: Replace sentinels with readable placeholder names
 */

type ReplacementDef = [RegExp, string]; // [pattern, placeholder_name]

function normalize(text: string, replacements: ReplacementDef[]): string {
  let result = text;

  // Pass 1: replace with sentinel tokens
  for (let i = 0; i < replacements.length; i++) {
    const [pattern] = replacements[i];
    const sentinel = `\x00P${String(i).padStart(3, '0')}\x00`;
    // Recreate the regex to reset lastIndex (in case of global flag)
    const re = new RegExp(pattern.source, pattern.flags);
    result = result.replace(re, sentinel);
  }

  // Pass 2: replace sentinels with readable placeholders
  for (let i = 0; i < replacements.length; i++) {
    const sentinel = `\x00P${String(i).padStart(3, '0')}\x00`;
    result = result.replaceAll(sentinel, `{{${replacements[i][1]}}}`);
  }

  return result;
}

// ── ASTS replacements (order: longest/most-specific first) ──────────────────

const astsReplacements: ReplacementDef[] = [
  [/AST SpaceMobile USA LLC/g, 'COMPANY_LEGAL'],
  [/AST SpaceMobile/g, 'COMPANY'],
  [/SpaceMobile/g, 'COMPANY_PRODUCT'],
  [/NASDAQ:\s*ASTS/g, 'EXCHANGE_TICKER'],
  [/NASDAQ/g, 'EXCHANGE'],
  [/\bASTS\b/g, 'TICKER'],
  // Domain phrases
  [/satellite-enabled direct-to-device \(D2D\) cellular broadband and LEO constellations/g, 'SPECIALTY'],
  [/satellite-enabled direct-to-device \(D2D\) cellular broadband/g, 'SPECIALTY_SHORT'],
  [/direct-to-device \(D2D\) cellular broadband/g, 'CORE_TECH_LONG'],
  [/space-based cellular broadband network/g, 'NETWORK_TYPE'],
  [/space-based cellular broadband/g, 'NETWORK_SHORT'],
  [/cellular broadband/g, 'BROADBAND'],
  [/direct-to-device/gi, 'CORE_TECH'],
  [/\bD2D\b/g, 'CORE_TECH_ABBR'],
  [/space-based/gi, 'TECH_PREFIX'],
  // Hardware / infrastructure
  [/LEO constellations/g, 'ASSET_NETWORK_PLURAL'],
  [/LEO constellation/g, 'ASSET_NETWORK'],
  [/\bLEO\b/g, 'ORBIT'],
  [/ground gateway/gi, 'GROUND_INFRA'],
  [/Block \d+/g, 'GENERATION'],
  [/BlueBird/g, 'PRODUCT_LINE'],
  [/constellations/gi, 'ASSET_NETWORKS'],
  [/constellation/gi, 'ASSET_NETWORK_S'],
  [/satellites/gi, 'ASSETS_PLURAL'],
  [/satellite/gi, 'ASSET'],
  [/unfurling/gi, 'DEPLOY_ACTION'],
  [/throughput/gi, 'PERF_METRIC'],
  [/launch cadence/gi, 'CADENCE'],
  // People
  [/Abel Avellan/g, 'EXEC_NAME'],
  // Partners / industry
  [/\bMNO\b/g, 'PARTNER_TYPE'],
  [/\bMoU\b/g, 'AGREEMENT_TYPE'],
  [/AT&T/g, 'PARTNER_A'],
  [/Verizon/g, 'PARTNER_B'],
  [/Vodafone/g, 'PARTNER_C'],
  [/\bstc\b/g, 'PARTNER_D'],
  [/Rakuten/g, 'PARTNER_E'],
  [/mobile network operator/gi, 'PARTNER_TYPE_LONG'],
  [/carrier/gi, 'CARRIER'],
  [/telco/gi, 'INDUSTRY'],
  [/telecom/gi, 'INDUSTRY2'],
  // Regulatory
  [/FCC\/NTIA/g, 'REGULATORS'],
  [/\bFCC\b/g, 'REG1'],
  [/\bNTIA\b/g, 'REG2'],
  [/3GPP/g, 'STANDARDS_BODY'],
  [/spectrum/gi, 'REG_RESOURCE'],
  [/coverage gap/gi, 'COVERAGE_GAP'],
  // Tabs
  [/Partners tab/g, 'DOMAIN_TAB_REF'],
  [/Partners/g, 'DOMAIN_TAB'],
];

// ── BMNR replacements ──────────────────────────────────────────────────────────

const bmnrReplacements: ReplacementDef[] = [
  [/Bitmine Immersion Technologies,? Inc\.?/g, 'COMPANY_LEGAL'],
  [/Bitmine Immersion Technologies/g, 'COMPANY'],
  [/BitMine Immersion Technologies/g, 'COMPANY'],
  [/Bitmine/g, 'COMPANY_PRODUCT'],
  [/BitMine/g, 'COMPANY_PRODUCT'],
  [/NYSE American:\s*BMNR/g, 'EXCHANGE_TICKER'],
  [/NYSE American/g, 'EXCHANGE'],
  [/\bBMNR\b/g, 'TICKER'],
  // Domain phrases
  [/digital asset treasuries, blockchain infrastructure, and ETH\/BTC ecosystem plays/g, 'SPECIALTY'],
  [/digital asset treasuries/g, 'SPECIALTY_SHORT'],
  [/Ethereum treasury\/staking strategy/g, 'CORE_TECH_LONG'],
  [/Ethereum-treasury company/g, 'NETWORK_TYPE'],
  [/Ethereum treasury/gi, 'NETWORK_SHORT'],
  [/cryptocurrency mining/gi, 'BROADBAND'],
  [/blockchain infrastructure/gi, 'CORE_TECH'],
  [/ETH\/BTC/g, 'CORE_TECH_ABBR'],
  [/blockchain/gi, 'TECH_PREFIX'],
  // Crypto assets
  [/Ethereum ecosystem/gi, 'ASSET_NETWORK_PLURAL'],
  [/Ethereum staking/gi, 'ASSET_NETWORK'],
  [/\bETH\b/g, 'ORBIT'],
  [/\bBTC\b/g, 'ALT_ASSET'],
  [/Ethereum/gi, 'ASSET_NETWORKS'],
  [/staking/gi, 'ASSET_NETWORK_S'],
  [/miners/gi, 'ASSETS_PLURAL'],
  [/mining/gi, 'ASSET'],
  [/validator/gi, 'DEPLOY_ACTION'],
  [/hash\s*rate/gi, 'PERF_METRIC'],
  [/accumulation pace/gi, 'CADENCE'],
  // Infrastructure
  [/MAVAN/g, 'PRODUCT_LINE'],
  [/immersion cooling/gi, 'GROUND_INFRA'],
  [/Phase \d+/g, 'GENERATION'],
  [/restaking/gi, 'RESTAKING'],
  [/DeFi/g, 'DEFI'],
  // People
  [/Tom Lee/g, 'EXEC_NAME'],
  // Tabs (before generic replacements)
  [/Ethereum Ecosystem tab/g, 'DOMAIN_TAB_REF'],
  [/Ethereum Ecosystem/g, 'DOMAIN_TAB'],
  [/Ethereum tab/g, 'DOMAIN_TAB_REF'],
  // Regulatory
  [/SEC\/FinCEN/g, 'REGULATORS'],
  [/\bSEC\b/g, 'REG1'],
  [/FinCEN/g, 'REG2'],
  [/\bIRS\b/g, 'STANDARDS_BODY'],
  // Partners / industry
  [/Strategy Inc\.?/g, 'PARTNER_A'],
  [/ETHZilla/g, 'PARTNER_B'],
  [/Marathon/g, 'PARTNER_C'],
  [/node operator/gi, 'PARTNER_TYPE_LONG'],
  [/exchange/gi, 'CARRIER'],
  [/crypto/gi, 'INDUSTRY'],
  [/digital asset/gi, 'INDUSTRY2'],
  // Remaining
  [/energy cost/gi, 'COVERAGE_GAP'],
  [/Bitcoin/gi, 'DOMAIN_ENTITY'],
  [/treasury/gi, 'TREASURY'],
];

// ─── Output ────────────────────────────────────────────────────────────────────

console.log('');
console.log('='.repeat(110));
console.log('WORKFLOW PROMPT COMPARISON: ASTS vs BMNR');
console.log('='.repeat(110));
console.log('');

const header = [
  'Workflow ID'.padEnd(28),
  'ASTS len'.padStart(10),
  'BMNR len'.padStart(10),
  'Diff'.padStart(8),
  'Structurally Same?'.padStart(20),
].join(' | ');

console.log(header);
console.log('-'.repeat(110));

let matchCount = 0;
let mismatchCount = 0;
const mismatches: string[] = [];

for (const wf of workflows) {
  const astsVariant = wf.variants.find(v => v.ticker === 'asts');
  const bmnrVariant = wf.variants.find(v => v.ticker === 'bmnr');

  if (!astsVariant || !bmnrVariant) {
    console.log(`${wf.id.padEnd(28)} | ${'N/A'.padStart(10)} | ${'N/A'.padStart(10)} | ${'N/A'.padStart(8)} | ${'Missing variant(s)'.padStart(20)}`);
    continue;
  }

  const astsLen = astsVariant.prompt.length;
  const bmnrLen = bmnrVariant.prompt.length;
  const diff = Math.abs(astsLen - bmnrLen);

  const normalizedAsts = normalize(astsVariant.prompt, astsReplacements);
  const normalizedBmnr = normalize(bmnrVariant.prompt, bmnrReplacements);

  const structMatch = normalizedAsts === normalizedBmnr;
  if (structMatch) matchCount++;
  else {
    mismatchCount++;
    mismatches.push(wf.id);
  }

  const matchStr = structMatch ? 'YES' : 'NO';

  console.log([
    wf.id.padEnd(28),
    String(astsLen).padStart(10),
    String(bmnrLen).padStart(10),
    String(diff).padStart(8),
    matchStr.padStart(20),
  ].join(' | '));

  if (!structMatch) {
    const maxLen = Math.max(normalizedAsts.length, normalizedBmnr.length);
    let firstDiffIdx = -1;
    for (let i = 0; i < maxLen; i++) {
      if (normalizedAsts[i] !== normalizedBmnr[i]) {
        firstDiffIdx = i;
        break;
      }
    }
    if (firstDiffIdx === -1) firstDiffIdx = Math.min(normalizedAsts.length, normalizedBmnr.length);
    const start = Math.max(0, firstDiffIdx - 40);
    const end = Math.min(maxLen, firstDiffIdx + 80);
    console.log(`  ^ First diff at char ${firstDiffIdx}:`);
    console.log(`    ASTS: ...${JSON.stringify(normalizedAsts.slice(start, end))}...`);
    console.log(`    BMNR: ...${JSON.stringify(normalizedBmnr.slice(start, end))}...`);
  }
}

console.log('-'.repeat(110));
console.log(`\nSummary: ${matchCount} structurally same, ${mismatchCount} structurally different out of ${workflows.length} workflows.`);
if (mismatches.length > 0) {
  console.log(`\nStructurally different workflows:\n  ${mismatches.join('\n  ')}`);
}
console.log('');
