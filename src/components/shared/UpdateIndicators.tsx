'use client';

/**
 * Update Indicator System — visual markers showing data source freshness.
 *
 * Shared across all stock model components (ASTS, BMNR, CRCL).
 * Tiny colored dots (PR / SEC / WS / Market) with tooltip on hover.
 */
import React from 'react';
import type { UpdateSource } from './stockModelTypes';

// Context for global indicator visibility toggle
export const UpdateIndicatorContext = React.createContext<{
  showIndicators: boolean;
  setShowIndicators: (v: boolean) => void;
}>({ showIndicators: true, setShowIndicators: () => {} });

const UPDATE_SOURCE_CONFIG: Record<UpdateSource, { tooltip: string; className: string }> = {
  PR: { tooltip: 'Press Release', className: 'pr' },
  SEC: { tooltip: 'SEC Filing', className: 'sec' },
  WS: { tooltip: 'Wall Street', className: 'ws' },
  MARKET: { tooltip: 'Market Data', className: 'market' },
};

/** Single dot indicator */
const UpdateIndicator = React.memo<{ source: UpdateSource; hidden?: boolean }>(({ source, hidden }) => {
  const config = UPDATE_SOURCE_CONFIG[source];
  return (
    <span
      className={`update-indicator ${config.className}${hidden ? ' hidden' : ''}`}
      data-tooltip={config.tooltip}
      title={config.tooltip}
    />
  );
});
UpdateIndicator.displayName = 'UpdateIndicator';

/** Renders one or more update indicators — always present to prevent layout shift */
export const UpdateIndicators = React.memo<{ sources?: UpdateSource | UpdateSource[] }>(({ sources }) => {
  const { showIndicators } = React.useContext(UpdateIndicatorContext);
  if (!sources) return null;
  const sourceArray = Array.isArray(sources) ? sources : [sources];
  return (
    <span className="update-indicator-wrap">
      {sourceArray.map((s) => <UpdateIndicator key={s} source={s} hidden={!showIndicators} />)}
    </span>
  );
});
UpdateIndicators.displayName = 'UpdateIndicators';

/** Legend explaining what each indicator color means, with toggle button */
export const UpdateLegend = React.memo(() => {
  const { showIndicators, setShowIndicators } = React.useContext(UpdateIndicatorContext);
  return (
    <div className="update-legend">
      <span className="sm-legend-label">Sources</span>
      <div className="update-legend-item"><span className="dot pr" /><span>PR</span></div>
      <div className="update-legend-item"><span className="dot sec" /><span>SEC</span></div>
      <div className="update-legend-item"><span className="dot ws" /><span>WS</span></div>
      <div className="update-legend-item"><span className="dot market" /><span>Live</span></div>
      <button
        onClick={() => setShowIndicators(!showIndicators)}
        className="sm-legend-toggle"
        data-active={showIndicators ? 'true' : undefined}
      >
        {showIndicators ? 'On' : 'Off'}
      </button>
    </div>
  );
});
UpdateLegend.displayName = 'UpdateLegend';
