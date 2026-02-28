'use client';

/**
 * Legal disclaimer banner displayed at the top of every stock model page.
 *
 * Identical across all three models (ASTS, BMNR, CRCL).
 * Collapsible — preference persisted via localStorage.
 */

import { useState, useEffect } from 'react';

export const LEGAL_DISCLAIMERS = {
  notInvestmentAdvice: {
    title: 'NOT INVESTMENT ADVICE:',
    body: "This model is for educational and informational purposes only. It does not constitute investment advice, financial advice, trading advice, or any other sort of advice. You should not treat any of the model's content as such."
  },
  forwardLooking: {
    title: 'FORWARD-LOOKING STATEMENTS:',
    body: "This model contains forward-looking statements based on assumptions about the future. Actual results may differ materially from those projected. Past performance is not indicative of future results."
  }
};

const STORAGE_KEY = 'disclaimer-collapsed';

export function DisclaimerBanner() {
  const [collapsed, setCollapsed] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'false') {
      setCollapsed(false);
    }
  }, []);

  function toggle() {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem(STORAGE_KEY, next ? 'true' : 'false');
  }

  const isCollapsed = !mounted || collapsed;

  return (
    <div className={`disclaimer-banner${isCollapsed ? ' disclaimer-collapsed' : ''}`}>
      {isCollapsed ? (
        <span className="disclaimer-title">⚠️ Legal Disclaimers</span>
      ) : (
        <>
          <span className="disclaimer-title">⚠️ {LEGAL_DISCLAIMERS.notInvestmentAdvice.title}</span>
          <span className="disclaimer-text">{LEGAL_DISCLAIMERS.notInvestmentAdvice.body}</span>
          <span className="disclaimer-divider">|</span>
          <span className="disclaimer-title">{LEGAL_DISCLAIMERS.forwardLooking.title}</span>
          <span className="disclaimer-text">{LEGAL_DISCLAIMERS.forwardLooking.body}</span>
        </>
      )}
      <button
        className="disclaimer-toggle"
        onClick={toggle}
        title={isCollapsed ? 'Expand disclaimers' : 'Collapse disclaimers'}
        aria-label={isCollapsed ? 'Expand disclaimers' : 'Collapse disclaimers'}
      >
        {isCollapsed ? '▸ Show' : '▾ Hide'}
      </button>
    </div>
  );
}
