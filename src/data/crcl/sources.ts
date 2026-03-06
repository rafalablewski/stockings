/**
 * CRCL Research Sources & Competitors
 * Competitors extracted from CRCL.tsx, sources re-exported from research-sources.ts.
 */

import type { Competitor } from '@/components/shared/SharedSourcesTab';

export { CRCL_RESEARCH_SOURCES } from './research-sources';

export const CRCL_COMPETITOR_LABEL = 'Stablecoin Peers';

export const CRCL_COMPETITORS: Competitor[] = [
  { name: 'Tether', url: 'https://tether.to/en/transparency/' },
  { name: 'PayPal PYUSD', url: 'https://www.paypal.com/pyusd' },
  { name: 'Paxos', url: 'https://paxos.com' },
  { name: 'Ripple RLUSD', url: 'https://ripple.com' },
];
