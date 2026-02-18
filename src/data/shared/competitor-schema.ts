/**
 * SHARED COMPETITOR NEWS SCHEMA
 * ================================================
 *
 * Zod schema + TypeScript type for competitor news entries.
 * Used by ALL stocks (ASTS, BMNR, CRCL) for consistent data structure.
 *
 * AI AGENT INSTRUCTIONS:
 * - Use this type for all competitor news entries
 * - `competitor` is a free-form string (each stock has its own IDs)
 * - `thesisComparison` explains how the news impacts the stock's investment thesis
 * - `implication` is the sentiment: 'positive' (good for our stock), 'negative' (bad), 'neutral'
 * - `details` is an array of bullet points (not a single summary string)
 * - `storyId` / `storyTitle` group related entries across time
 */

import { z } from 'zod';

export const competitorNewsEntrySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  competitor: z.string().min(1),
  category: z.string().min(1),
  headline: z.string().min(1),
  details: z.array(z.string()),
  implication: z.enum(['positive', 'neutral', 'negative']),
  thesisComparison: z.string().optional(),
  source: z.string().optional(),
  sourceUrl: z.string().optional(),
  storyId: z.string().optional(),
  storyTitle: z.string().optional(),
});

export type CompetitorNewsEntry = z.infer<typeof competitorNewsEntrySchema>;
