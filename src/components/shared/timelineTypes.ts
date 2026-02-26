/**
 * Shared Timeline Tab Types
 * Unified schema for ASTS, BMNR, CRCL Timeline/SEC Filings data.
 *
 * Extensibility: Pass all stock-specific content (SEC table, filters, event list, CFA notes)
 * as children of SharedTimelineTab. For new stocks with different event shapes, extend
 * TimelineEvent (e.g. TimelineEventDetailed | TimelineEventChanges | YourStockEvent) and
 * render in the child content. No need to change SharedTimelineTab for new fields.
 */

import type { ReactNode } from 'react';
import type { UpdateSource } from './stockModelTypes';

export interface SECFiling {
  date: string;
  type: '10-K' | '10-Q' | '8-K' | 'S-1' | 'S-3' | 'S-8' | '424B5' | 'DEFA14A' | 'DEF 14A' | string;
  description: string;
  period: string;
  color?: string;
}

export interface SECMeta {
  cik: string;
  ticker: string;
  exchange: string;
  lastPR: {
    date: string;
    title: string;
  };
}

export interface SECTypeColor {
  bg: string;
  text: string;
}

// ASTS-style timeline event (detailed format)
export interface TimelineEventDetailed {
  date: string;
  category: 'Guidance' | 'Data' | 'Event' | 'Launch' | 'Product' | 'Earnings' | 'News' | string;
  title: string;
  summary: string;
  details: string[];
  sources: string[];
  prevValue?: string;
  newValue?: string;
  impact: 'Positive' | 'Neutral' | 'Negative' | 'positive' | 'neutral' | 'negative';
  supersedes?: string;
  corrected?: boolean;
  correctedBy?: string;
}

// BMNR-style timeline event (changes format)
export interface TimelineEventChanges {
  date: string;
  source: string;
  category: 'Holdings' | 'Corporate' | 'SEC Filing' | 'Product' | 'News' | string;
  title: string;
  changes: {
    metric: string;
    previous: string;
    new: string;
    change: string;
  }[];
  notes: string;
  impact: 'positive' | 'neutral' | 'negative';
}

// Union type for flexibility
export type TimelineEvent = TimelineEventDetailed | TimelineEventChanges;

export interface SharedTimelineTabProps {
  /** Section label above title (e.g. "Corporate Events") */
  sectionLabel: string;
  /** Tab title (e.g. "Timeline") */
  title: string;
  /** Hero description paragraph */
  description: string;
  /** Optional: SEC filings table + event list rendered as children */
  children: ReactNode;
  /** Optional: update indicator sources for the section label (PR, SEC, WS, MARKET) */
  sources?: UpdateSource | UpdateSource[];
}
