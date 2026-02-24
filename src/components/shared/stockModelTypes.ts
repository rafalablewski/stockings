/**
 * Shared type definitions for all stock model components (ASTS, BMNR, CRCL).
 *
 * Single source of truth — imported by both shared UI primitives
 * and individual stock model files.
 */
import type { ReactNode } from 'react';

export type UpdateSource = 'PR' | 'SEC' | 'WS' | 'MARKET';

export interface StatProps {
  label: string;
  value: string | number;
  color?: 'white' | 'cyan' | 'mint' | 'coral' | 'sky' | 'violet' | 'gold';
  updateSource?: UpdateSource | UpdateSource[];
}

export interface CardProps {
  label: string;
  value: string | number;
  sub?: string;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'orange' | 'cyan' | 'violet' | 'mint' | 'emerald';
  updateSource?: UpdateSource | UpdateSource[];
}

export interface RowProps {
  label: string;
  value: string | number;
  highlight?: boolean;
  updateSource?: UpdateSource | UpdateSource[];
}

export interface InputProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  step?: number;
  min?: number;
  max?: number;
}

export interface PanelProps {
  title?: string;
  children: ReactNode;
}

export interface GuideProps {
  title: string;
  children: ReactNode;
}

export interface CFANotesProps {
  title?: string;
  items: Array<{ term: string; def: string }>;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}
