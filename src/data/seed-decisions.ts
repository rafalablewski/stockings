// ═══════════════════════════════════════════════════════════════════════════
// SEED DECISIONS — Example pm_decisions rows for the Decision Queue
// ═══════════════════════════════════════════════════════════════════════════
// These mirror the simulated output from the Prompt Auditor → Remediation
// and Doc Reviewer → UX/UI approval chains.

export const SEED_DECISIONS = [
  // ── Prompt Remediation → Maszka ────────────────────────────────────────
  {
    pm: 'maszka',
    engineerId: 'prompt-remediation-engineer',
    runId: 18,
    ticker: 'ASTS',
    title: 'Prompt Remediation — 7 patches for ASTS workflows',
    category: 'prompt-patch',
    status: 'pending',
    payload: JSON.stringify({
      findings_processed: 9,
      patches: [
        {
          finding_id: 'drift-001',
          workflowId: 'thesis-review',
          action: 'REPLACE',
          anchor: 'The stock has {{TAB_COUNT}} research tabs:',
          content: '8 tabs: Overview, Thesis, Capital, Earnings, Sources, Catalyst, EDGAR, Ask',
          rationale: 'Prompt says "6 tabs" but ASTS now has 8 tabs (Catalyst and EDGAR added)',
        },
        {
          finding_id: 'drift-002',
          workflowId: 'capital-structure',
          action: 'APPEND',
          anchor: 'Analyze the capital structure including:',
          content: '- Track warrant exercise windows and dilution impact on NAV/share',
          rationale: 'Warrant exercise tracking feature added 2026-03-01 but prompt unchanged',
        },
        {
          finding_id: 'drift-003',
          workflowId: 'earnings-call',
          action: 'REPLACE',
          anchor: 'Extract insights across 5 sections',
          content: 'Extract insights across 7 sections',
          rationale: 'Earnings call workflow now has 7 extraction sections, prompt says 5',
        },
        {
          finding_id: 'drift-004',
          workflowId: 'insider-activity',
          action: 'APPEND',
          anchor: 'Monitor insider transactions including:',
          content: '- Monitor 13F institutional holdings for position changes',
          rationale: 'Insider workflow now supports 13F tracking but prompt does not mention it',
        },
        {
          finding_id: 'drift-005',
          workflowId: 'ask-agent',
          action: 'APPEND',
          anchor: 'Available research pages:',
          content: '- Press Intelligence (/press-intelligence)',
          rationale: 'Press Intelligence page exists but ask-agent prompt is unaware of it',
        },
        {
          finding_id: 'drift-006',
          workflowId: 'thesis-review',
          action: 'REPLACE',
          anchor: '/api/research/run',
          content: '/api/workflow/run',
          rationale: 'Old API path /api/research/run renamed to /api/workflow/run (3 locations)',
        },
        {
          finding_id: 'drift-007',
          workflowId: 'weekly-digest',
          action: 'REPLACE',
          anchor: '3 stock coverage',
          content: '15+ tickers in coverage universe',
          rationale: 'Stock registry expanded from 3 to 15+ tickers',
        },
      ],
      skipped: [
        { finding_id: 'drift-008', reason: 'Catalyst tab needs its own dedicated workflow — not a prompt patch' },
        { finding_id: 'drift-009', reason: 'EDGAR tab integration needs structural prompt redesign — beyond patch scope' },
      ],
    }),
  },

  // ── UX/UI Engineer → Maszka ────────────────────────────────────────────
  {
    pm: 'maszka',
    engineerId: 'ux-ui-engineer',
    runId: 12,
    ticker: 'ASTS',
    title: 'UX/UI Documentation Updates — 3 changes + 1 style fix',
    category: 'doc-update',
    status: 'pending',
    payload: JSON.stringify({
      findings_processed: 4,
      changes: [
        {
          id: 'doc-001',
          type: 'badge-catalog',
          description: 'Add chain badge (data-type="chain") to badge catalog in docs page',
          css: '.eng-swim-badge[data-type="chain"]',
          color: 'rgba(244,114,182,0.85)',
          usage: 'Shows approval chain flow on engineer swimlane cards',
        },
        {
          id: 'doc-002',
          type: 'counter-proposal',
          description: 'Org hierarchy dataflow edge update — propose using NetworkGraph tooltips as living documentation instead of separate doc file',
          reasoning: 'NetworkGraph already renders all edges interactively; adding a tooltip to the new prompt-remediation → maszka edge is more maintainable than a separate document',
        },
        {
          id: 'doc-003',
          type: 'component-docs',
          description: 'Add "Approval Chain" section to EngineersDashboard component usage guide documenting chainsTo/decisionsFor rendering',
        },
        {
          id: 'doc-004',
          type: 'style-fix',
          description: 'Standardize swimlane card padding to 12px (currently mixed 12px/14px)',
          files: ['src/app/engineers/engineers.css'],
        },
      ],
    }),
  },

  // ── Prompt Remediation (historical — applied) ──────────────────────────
  {
    pm: 'maszka',
    engineerId: 'prompt-remediation-engineer',
    runId: 14,
    ticker: 'BMNR',
    title: 'Prompt Remediation — 3 patches for BMNR workflows',
    category: 'prompt-patch',
    status: 'applied',
    pmNotes: 'Approved — all patches look correct',
    bossNotes: 'Good catch on the ETH treasury reference. Applied.',
    payload: JSON.stringify({
      findings_processed: 4,
      patches: [
        {
          finding_id: 'bmnr-drift-001',
          workflowId: 'thesis-review',
          action: 'REPLACE',
          anchor: 'ETH mining operations',
          content: 'ETH treasury and validator operations',
          rationale: 'BMNR pivoted from mining to treasury/validator model',
        },
        {
          finding_id: 'bmnr-drift-002',
          workflowId: 'capital-structure',
          action: 'APPEND',
          anchor: 'Key metrics:',
          content: '- ETH holdings and staking yield',
          rationale: 'ETH treasury position is core to BMNR valuation',
        },
        {
          finding_id: 'bmnr-drift-003',
          workflowId: 'weekly-digest',
          action: 'REPLACE',
          anchor: 'mining hashrate',
          content: 'validator uptime and staking rewards',
          rationale: 'Weekly digest still references mining metrics post-pivot',
        },
      ],
      skipped: [
        { finding_id: 'bmnr-drift-004', reason: 'Immersion cooling metrics need new data source — not a prompt-only fix' },
      ],
    }),
  },

  // ── UX/UI Engineer (historical — pm-approved, awaiting boss) ───────────
  {
    pm: 'maszka',
    engineerId: 'ux-ui-engineer',
    runId: 9,
    ticker: 'ASTS',
    title: 'Style Guide Update — Press Intelligence page tokens',
    category: 'doc-update',
    status: 'pm-approved',
    pmNotes: 'Approved — color tokens match the design system',
    payload: JSON.stringify({
      findings_processed: 2,
      changes: [
        {
          id: 'style-001',
          type: 'design-tokens',
          description: 'Add Press Intelligence page color tokens to design system (article category badges)',
          tokens: { earnings: '#fbbf24', regulatory: '#f87171', corporate: '#a78bfa', market: '#34d399' },
        },
        {
          id: 'style-002',
          type: 'component-docs',
          description: 'Document PressCard component props and usage in component catalog',
        },
      ],
    }),
  },

  // ── Prompt Auditor notified Bobman (historical — boss-rejected) ────────
  {
    pm: 'bobman',
    engineerId: 'prompt-remediation-engineer',
    runId: 11,
    ticker: 'CRCL',
    title: 'Prompt Remediation — 5 patches for CRCL workflows',
    category: 'prompt-patch',
    status: 'boss-rejected',
    pmNotes: 'Patches look mechanically correct',
    bossNotes: 'Rejected — CRCL workflow prompts are being restructured as part of the Dynamic Prompt Template Architecture. Do not patch the old format.',
    payload: JSON.stringify({
      findings_processed: 5,
      patches: [
        { finding_id: 'crcl-drift-001', workflowId: 'thesis-review', action: 'REPLACE', anchor: 'stablecoin issuer', content: 'stablecoin infrastructure and USDC issuer', rationale: 'CRCL expanded beyond pure issuance' },
        { finding_id: 'crcl-drift-002', workflowId: 'capital-structure', action: 'APPEND', anchor: 'Revenue model:', content: '- USDC reserve yield and transaction fee revenue', rationale: 'Missing primary revenue driver' },
        { finding_id: 'crcl-drift-003', workflowId: 'regulatory-tracker', action: 'REPLACE', anchor: 'SEC oversight', content: 'SEC and state money transmitter licensing', rationale: 'CRCL regulatory scope broader than SEC alone' },
        { finding_id: 'crcl-drift-004', workflowId: 'insider-activity', action: 'APPEND', anchor: 'Track insider activity:', content: '- Monitor IPO lock-up expiration and insider selling windows', rationale: 'CRCL recently IPOd, lock-up periods are material' },
        { finding_id: 'crcl-drift-005', workflowId: 'ask-agent', action: 'APPEND', anchor: 'Covered tickers:', content: '- CRCL (Circle Internet Group)', rationale: 'Ask agent prompt missing CRCL from known tickers' },
      ],
      skipped: [],
    }),
  },
];
