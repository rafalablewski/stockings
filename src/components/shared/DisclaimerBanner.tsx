'use client';

/**
 * Legal disclaimer banner displayed at the top of every stock model page.
 *
 * Identical across all three models (ASTS, BMNR, CRCL).
 */

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

export function DisclaimerBanner() {
  return (
    <div className="disclaimer-banner">
      <span className="disclaimer-title">⚠️ {LEGAL_DISCLAIMERS.notInvestmentAdvice.title}</span>
      <span className="disclaimer-text">{LEGAL_DISCLAIMERS.notInvestmentAdvice.body}</span>
      <span className="disclaimer-divider">|</span>
      <span className="disclaimer-title">{LEGAL_DISCLAIMERS.forwardLooking.title}</span>
      <span className="disclaimer-text">{LEGAL_DISCLAIMERS.forwardLooking.body}</span>
    </div>
  );
}
