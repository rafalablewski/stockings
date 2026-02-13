/**
 * Spacing scale constants for consistent vertical rhythm
 * Based on 8px base unit system (16px, 24px, 32px, 48px)
 */

export const SPACING = {
  // Base unit
  xs: 8,    // 8px - tight spacing
  sm: 16,   // 16px - small gaps
  md: 24,   // 24px - medium spacing (default)
  lg: 32,   // 32px - large spacing
  xl: 48,   // 48px - extra large (section headers)
  xxl: 64,  // 64px - hero sections

  // Semantic spacing
  cardPadding: 24,      // Standard card padding
  sectionGap: 24,       // Gap between sections
  headerPadding: 48,    // Top padding for section headers
  pagePadding: 24,      // Page-level padding
  gridGap: 24,          // Grid gap between cards
} as const;
