'use client';

/**
 * SharedTimelineTab - Unified Timeline Tab shell
 *
 * Stock-agnostic: receives sectionLabel, title, description. Renders
 * gold-standard hero (sm-tab-hero) and children (SEC filings, event list, etc.).
 * Each stock passes its own SEC + event content as children.
 *
 * @version 1.0.0
 * @created 2026-02-26
 */

import React from 'react';
import type { SharedTimelineTabProps } from './timelineTypes';
import { UpdateIndicators } from './UpdateIndicators';

export const SharedTimelineTab: React.FC<SharedTimelineTabProps> = ({
  sectionLabel,
  title,
  description,
  sources = 'PR',
  children,
}) => {
  return (
    <div className="sm-tab-stack">
      <div className="sm-tab-hero">
        <div className="sm-section-label">{sectionLabel}{sources && <UpdateIndicators sources={sources} />}</div>
        <h2>{title}<span className="sm-accent">.</span></h2>
        <p>{description}</p>
      </div>
      {children}
    </div>
  );
};

export default SharedTimelineTab;
