/**
 * Stock model accent color type.
 *
 * Styles are now in stock-model-styles.css (imported as a regular CSS file).
 * Each stock component sets data-accent on .stock-model-app to pick its color:
 *   <div className="stock-model-app" data-accent="cyan">   // ASTS
 *   <div className="stock-model-app" data-accent="violet"> // BMNR
 *   <div className="stock-model-app" data-accent="mint">   // CRCL
 */

export type AccentColor = 'cyan' | 'violet' | 'mint';
