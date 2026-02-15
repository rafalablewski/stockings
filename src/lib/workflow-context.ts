import {
  FINANCIALS_METADATA,
  QUARTERLY_DATA,
  CAPITAL_METADATA,
  SHARE_CLASSES,
  TOTAL_BASIC_SHARES,
  FULLY_DILUTED_SHARES,
  MAJOR_SHAREHOLDERS,
  EQUITY_OFFERINGS,
  DILUTION_HISTORY,
  CATALYSTS_METADATA,
  UPCOMING_CATALYSTS,
  COMPLETED_MILESTONES,
} from '@/data/asts';

import {
  CAPITAL_METADATA as BMNR_CAP_META,
  SHARE_CLASSES as BMNR_SHARES,
  WARRANTS as BMNR_WARRANTS,
  EQUITY_OFFERINGS as BMNR_OFFERINGS,
  MAJOR_SHAREHOLDERS as BMNR_SHAREHOLDERS,
  CATALYSTS_METADATA as BMNR_CAT_META,
  UPCOMING_CATALYSTS as BMNR_CATALYSTS,
  COMPLETED_MILESTONES as BMNR_MILESTONES,
} from '@/data/bmnr';

import { BMNR_QUARTERLY_DATA } from '@/data/bmnr/quarterly-metrics';

import type { ContextModule } from '@/data/workflows';

export function getWorkflowContext(ticker: string, modules: ContextModule[]): string {
  const parts: string[] = [];
  for (const mod of modules) {
    if (ticker === 'asts') {
      switch (mod) {
        case 'financials': parts.push(serializeASTSFinancials()); break;
        case 'capital': parts.push(serializeASTSCapital()); break;
        case 'catalysts': parts.push(serializeASTSCatalysts()); break;
      }
    } else if (ticker === 'bmnr') {
      switch (mod) {
        case 'financials': parts.push(serializeBMNRFinancials()); break;
        case 'capital': parts.push(serializeBMNRCapital()); break;
        case 'catalysts': parts.push(serializeBMNRCatalysts()); break;
      }
    }
  }
  return parts.join('\n\n');
}

// ============================================================================
// ASTS SERIALIZERS
// ============================================================================

function serializeASTSFinancials(): string {
  const meta = FINANCIALS_METADATA;
  const quarters = Object.keys(QUARTERLY_DATA).slice(0, 4);

  let out = `ASTS QUARTERLY FINANCIALS (as of ${meta.lastUpdated})\n`;
  out += `Source: ${meta.source}\n`;
  out += `${meta.notes || ''}\n\n`;
  out += 'Quarter  | Cash ($M) | Debt ($M) | Rev ($M) | OpEx ($M) | Shares Basic (M) | FD (M) | Price\n';
  out += '---------|-----------|-----------|----------|-----------|-------------------|--------|------\n';

  for (const q of quarters) {
    const d = QUARTERLY_DATA[q];
    out += `${d.quarter.padEnd(8)} | ${String(d.cashAndEquiv ?? '?').padStart(9)} | ${String(d.totalDebt ?? '?').padStart(9)} | ${String(d.revenue ?? '?').padStart(8)} | ${String(d.opEx ?? '?').padStart(9)} | ${String(d.sharesOutstanding ?? '?').padStart(17)} | ${String(d.fullyDiluted ?? '?').padStart(6)} | $${d.stockPrice ?? '?'}\n`;
  }

  return out;
}

function serializeASTSCapital(): string {
  const meta = CAPITAL_METADATA;

  let out = `ASTS CAPITAL STRUCTURE (as of ${meta.lastUpdated})\n`;
  out += `Source: ${meta.source}\n`;
  if (meta.notes) out += `Notes: ${meta.notes}\n`;

  out += '\nShare Classes:\n';
  for (const sc of SHARE_CLASSES) {
    out += `- ${sc.classType}: ${sc.shares}M shares (${sc.votingRights}) — ${sc.description}\n`;
  }
  out += `\nTotal Basic: ${TOTAL_BASIC_SHARES.toFixed(1)}M | Fully Diluted: ${FULLY_DILUTED_SHARES}M\n`;

  out += '\nMajor Shareholders:\n';
  for (const sh of MAJOR_SHAREHOLDERS) {
    out += `- ${sh.name} (${sh.role}): ${sh.shares}M ${sh.shareClass} — ${sh.pct} economic, ${sh.votingPct} voting\n`;
  }

  out += '\nRecent Equity Offerings:\n';
  const recentOfferings = EQUITY_OFFERINGS.slice(-6);
  for (const o of recentOfferings) {
    out += `- ${o.date}: ${o.event} — $${o.amount}M ${o.type}`;
    if (o.shares) out += ` (${o.shares}M shares)`;
    if (o.notes) out += ` — ${o.notes}`;
    out += '\n';
  }

  out += '\nDilution History (recent):\n';
  const recentDilution = DILUTION_HISTORY.slice(-4);
  for (const d of recentDilution) {
    out += `- ${d.quarter}: Class A ${d.classA}M / Implied ${d.implied}M / FD ${d.fullyDiluted}M — ${d.event}\n`;
  }

  return out;
}

function serializeASTSCatalysts(): string {
  const meta = CATALYSTS_METADATA;

  let out = `ASTS CATALYSTS (as of ${meta.lastUpdated})\n`;
  out += `Source: ${meta.source}\n`;
  if (meta.notes) out += `Notes: ${meta.notes}\n`;

  out += '\nUpcoming Catalysts:\n';
  for (const c of UPCOMING_CATALYSTS) {
    out += `- [${c.impact}] ${c.event} — ${c.timeline}`;
    if (c.category) out += ` (${c.category})`;
    out += '\n';
  }

  out += '\nRecent Completed Milestones:\n';
  const recentMilestones = COMPLETED_MILESTONES.slice(0, 10);
  for (const m of recentMilestones) {
    out += `- ${m.date}: ${m.event}\n`;
  }

  return out;
}

// ============================================================================
// BMNR SERIALIZERS
// ============================================================================

function serializeBMNRFinancials(): string {
  const recent = BMNR_QUARTERLY_DATA.slice(0, 4);

  let out = 'BMNR QUARTERLY FINANCIALS\n\n';
  out += 'Quarter  | Cash ($M) | Crypto ($M) | Assets ($M) | Equity ($M) | Rev ($M) | NetInc ($M) | Shares (M) | ETH Holdings\n';
  out += '---------|-----------|-------------|-------------|-------------|----------|-------------|------------|-------------\n';

  for (const d of recent) {
    const eth = d.ethHoldings ? d.ethHoldings.toLocaleString() : 'N/A';
    out += `${d.quarter.padEnd(8)} | ${String(d.cash).padStart(9)} | ${String(d.crypto).padStart(11)} | ${String(d.assets).padStart(11)} | ${String(d.equity).padStart(11)} | ${String(d.revenue).padStart(8)} | ${String(d.netIncome).padStart(11)} | ${String(d.shares).padStart(10)} | ${eth}\n`;
  }

  return out;
}

function serializeBMNRCapital(): string {
  const meta = BMNR_CAP_META;

  let out = `BMNR CAPITAL STRUCTURE (as of ${meta.lastUpdated})\n`;
  out += `Source: ${meta.source}\n`;
  if (meta.notes) out += `Notes: ${meta.notes}\n`;

  out += '\nShare Classes:\n';
  for (const sc of BMNR_SHARES) {
    out += `- ${sc.class}: ${sc.outstanding.toLocaleString()} outstanding of ${sc.authorized.toLocaleString()} authorized (${sc.voting}) — ${sc.status}\n`;
  }

  out += '\nWarrants:\n';
  for (const w of BMNR_WARRANTS) {
    out += `- ${w.type}: ${w.shares.toLocaleString()} shares @ $${w.strike} — ${w.source}\n`;
  }

  out += '\nEquity Offerings:\n';
  for (const o of BMNR_OFFERINGS) {
    out += `- ${o.date}: ${o.type} $${o.amount}B — ${o.status} — ${o.notes}\n`;
  }

  out += '\nMajor Shareholders:\n';
  for (const sh of BMNR_SHAREHOLDERS) {
    const shares = sh.shares ? sh.shares.toLocaleString() + ' shares' : 'TBD';
    out += `- ${sh.name} (${sh.type}): ${shares} — ${sh.notes}\n`;
  }

  return out;
}

function serializeBMNRCatalysts(): string {
  const meta = BMNR_CAT_META;

  let out = `BMNR CATALYSTS (as of ${meta.lastUpdated})\n`;
  out += `Source: ${meta.source}\n`;
  if (meta.notes) out += `Notes: ${meta.notes}\n`;

  out += '\nUpcoming Catalysts:\n';
  for (const c of BMNR_CATALYSTS) {
    out += `- [${c.impact}] ${c.event} — ${c.timeline}`;
    if (c.category) out += ` (${c.category})`;
    out += '\n';
  }

  out += '\nRecent Completed Milestones:\n';
  const recentMilestones = BMNR_MILESTONES.slice(0, 10);
  for (const m of recentMilestones) {
    out += `- ${m.date}: ${m.event}\n`;
  }

  return out;
}
