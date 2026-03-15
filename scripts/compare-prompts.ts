import { workflows } from '../src/data/workflows';

// Order matters: longer/more-specific patterns first to avoid partial matches.

const astsReplacements: [RegExp, string][] = [
  // Full company name variations (longest first)
  [/AST SpaceMobile USA/g, '{{COMPANY_SUB}}'],
  [/AST SpaceMobile/g, '{{COMPANY}}'],
  [/SpaceMobile/g, '{{COMPANY_SHORT}}'],
  // Ticker & exchange
  [/NASDAQ/g, '{{EXCHANGE}}'],
  [/ASTS/g, '{{TICKER}}'],
  // Domain-specific phrases (longer first)
  [/satellite-enabled direct-to-device \(D2D\) cellular broadband and LEO constellations/g, '{{SPECIALTY_DESC}}'],
  [/satellite-enabled direct-to-device \(D2D\) cellular broadband/g, '{{SPECIALTY_SHORT}}'],
  [/direct-to-device \(D2D\) cellular broadband/g, '{{CORE_TECH}}'],
  [/direct-to-device/g, '{{CORE_TECH_SHORT}}'],
  [/D2D/g, '{{CORE_TECH_ABBR}}'],
  [/space-based cellular broadband network/g, '{{NETWORK_DESC}}'],
  [/space-based cellular broadband/g, '{{NETWORK_DESC_SHORT}}'],
  [/space-based/g, '{{TECH_PREFIX}}'],
  [/cellular broadband/g, '{{BROADBAND_TYPE}}'],
  // Industry terms
  [/LEO constellations/g, '{{CONSTELLATION_TYPE}}'],
  [/LEO constellation/g, '{{CONSTELLATION_SING}}'],
  [/LEO/g, '{{ORBIT_TYPE}}'],
  [/constellations/gi, '{{CONSTELLATIONS}}'],
  [/constellation/gi, '{{CONSTELLATION}}'],
  [/satellites/gi, '{{UNITS}}'],
  [/satellite/gi, '{{UNIT}}'],
  // Domain categories/tabs
  [/Partners/g, '{{DOMAIN_TAB}}'],
  [/partner/gi, '{{DOMAIN_ENTITY}}'],
  // Regulatory bodies
  [/FCC\/NTIA/g, '{{REGULATORS}}'],
  [/FCC/g, '{{REGULATOR1}}'],
  [/NTIA/g, '{{REGULATOR2}}'],
  // Specific technical terms
  [/spectrum/gi, '{{RESOURCE}}'],
  [/MNO/g, '{{INDUSTRY_PARTNER_TYPE}}'],
  [/mobile network operator/gi, '{{INDUSTRY_PARTNER_DESC}}'],
  [/carrier/gi, '{{CARRIER}}'],
  [/telco/gi, '{{TELCO}}'],
  [/telecom/gi, '{{TELECOM}}'],
  [/coverage gap/gi, '{{COVERAGE_GAP}}'],
  [/BlueBird/g, '{{PRODUCT_GEN}}'],
  [/Block \d+/g, '{{PRODUCT_BLOCK}}'],
];

const bmnrReplacements: [RegExp, string][] = [
  // Full company name variations (longest first)
  [/Bitmine Immersion Technologies, Inc\.?/g, '{{COMPANY}}'],
  [/Bitmine Immersion Technologies/g, '{{COMPANY}}'],
  [/Bitmine/g, '{{COMPANY_SHORT}}'],
  // Ticker & exchange
  [/NYSE American/g, '{{EXCHANGE}}'],
  [/BMNR/g, '{{TICKER}}'],
  // Domain-specific phrases (longer first)
  [/digital asset treasuries, blockchain infrastructure, and ETH\/BTC ecosystem plays/g, '{{SPECIALTY_DESC}}'],
  [/digital asset treasuries/g, '{{SPECIALTY_SHORT}}'],
  [/Ethereum treasury\/staking strategy/g, '{{CORE_TECH}}'],
  [/Ethereum treasury/g, '{{CORE_TECH_SHORT}}'],
  [/ETH\/BTC/g, '{{CORE_TECH_ABBR}}'],
  [/Bitcoin mining to an Ethereum/g, '{{NETWORK_DESC}}'],
  [/blockchain infrastructure/g, '{{NETWORK_DESC_SHORT}}'],
  [/blockchain/gi, '{{TECH_PREFIX}}'],
  [/cryptocurrency mining/gi, '{{BROADBAND_TYPE}}'],
  // Industry terms
  [/Ethereum ecosystem/gi, '{{CONSTELLATION_TYPE}}'],
  [/Ethereum staking/gi, '{{CONSTELLATION_SING}}'],
  [/ETH/g, '{{ORBIT_TYPE}}'],
  [/Ethereum/gi, '{{CONSTELLATIONS}}'],
  [/staking/gi, '{{CONSTELLATION}}'],
  [/miners/gi, '{{UNITS}}'],
  [/mining/gi, '{{UNIT}}'],
  // Domain categories/tabs
  [/Ethereum Ecosystem/g, '{{DOMAIN_TAB}}'],
  [/Bitcoin/gi, '{{DOMAIN_ENTITY}}'],
  // Regulatory bodies
  [/SEC\/FinCEN/g, '{{REGULATORS}}'],
  [/SEC/g, '{{REGULATOR1}}'],
  [/FinCEN/g, '{{REGULATOR2}}'],
  // Specific technical terms
  [/hash rate/gi, '{{RESOURCE}}'],
  [/hashrate/gi, '{{RESOURCE}}'],
  [/validator/gi, '{{INDUSTRY_PARTNER_TYPE}}'],
  [/node operator/gi, '{{INDUSTRY_PARTNER_DESC}}'],
  [/exchange/gi, '{{CARRIER}}'],
  [/crypto/gi, '{{TELCO}}'],
  [/digital asset/gi, '{{TELECOM}}'],
  [/energy cost/gi, '{{COVERAGE_GAP}}'],
  [/immersion cooling/gi, '{{PRODUCT_GEN}}'],
  [/Phase \d+/g, '{{PRODUCT_BLOCK}}'],
];

function normalize(text: string, replacements: [RegExp, string][]): string {
  let result = text;
  for (const [pattern, replacement] of replacements) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

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
  if (structMatch) matchCount++; else { mismatchCount++; mismatches.push(wf.id); }

  const matchStr = structMatch ? 'YES' : 'NO';

  console.log([
    wf.id.padEnd(28),
    String(astsLen).padStart(10),
    String(bmnrLen).padStart(10),
    String(diff).padStart(8),
    matchStr.padStart(20),
  ].join(' | '));

  // If not matching, show first diff
  if (!structMatch) {
    const minLen = Math.min(normalizedAsts.length, normalizedBmnr.length);
    let firstDiffIdx = -1;
    for (let i = 0; i < minLen; i++) {
      if (normalizedAsts[i] !== normalizedBmnr[i]) {
        firstDiffIdx = i;
        break;
      }
    }
    if (firstDiffIdx === -1) firstDiffIdx = minLen;
    const start = Math.max(0, firstDiffIdx - 40);
    const end = Math.min(Math.max(normalizedAsts.length, normalizedBmnr.length), firstDiffIdx + 60);
    console.log(`  ^ First diff at char ${firstDiffIdx}:`);
    console.log(`    ASTS: ...${JSON.stringify(normalizedAsts.slice(start, end))}...`);
    console.log(`    BMNR: ...${JSON.stringify(normalizedBmnr.slice(start, end))}...`);
  }
}

console.log('-'.repeat(110));
console.log(`\nSummary: ${matchCount} structurally same, ${mismatchCount} different out of ${workflows.length} workflows.`);
if (mismatches.length > 0) {
  console.log(`\nMismatched workflows: ${mismatches.join(', ')}`);
}
console.log('');
