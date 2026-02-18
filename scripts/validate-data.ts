/**
 * Build-time validation script for competitor news data.
 * Runs Zod schema validation against all three stock data arrays.
 * Also warns about unknown competitor IDs or categories (does NOT fail the build).
 *
 * Usage: npx tsx scripts/validate-data.ts
 */

import { z } from 'zod';
import { competitorNewsEntrySchema } from '../src/data/shared/competitor-schema';
import { COMPS_TIMELINE } from '../src/data/asts/comps-timeline';
import { BMNR_COMPETITOR_NEWS } from '../src/data/bmnr/competitor-news';
import { CRCL_COMPETITOR_NEWS } from '../src/data/crcl/competitor-news';

const arraySchema = z.array(competitorNewsEntrySchema);

// Known competitor IDs and categories per stock (from data file headers).
// These are NOT enforced — unknown values produce warnings, not errors.
// Update these lists when new competitors or categories are added.
const KNOWN = {
  ASTS: {
    competitors: ['starlink-tmobile', 'lynk', 'apple-globalstar', 'skylo', 'iridium', 'amazon-leo', 'echostar', 'oq-technology', 'other'],
    categories: ['Launch', 'Partnership', 'Technology', 'Regulatory', 'Financial', 'Coverage', 'Product'],
  },
  BMNR: {
    competitors: ['mstr', 'mara', 'riot', 'coin', 'clsk', 'hut8', 'ethz', 'kraken', 'other'],
    categories: ['Acquisition', 'Funding', 'Yield', 'Regulatory', 'Technology', 'Partnership', 'Financial', 'Strategy'],
  },
  CRCL: {
    competitors: ['kraken', 'tether', 'coinbase', 'paypal', 'fdusd', 'other'],
    categories: ['Partnership', 'Product', 'Regulatory', 'Technology', 'Financial', 'Strategy', 'Distribution'],
  },
} as const;

let hasErrors = false;
let warningCount = 0;

interface Entry {
  competitor: string;
  category: string;
  headline: string;
  [key: string]: unknown;
}

function validate(name: string, data: unknown[], known: { competitors: readonly string[]; categories: readonly string[] }) {
  const result = arraySchema.safeParse(data);
  if (result.success) {
    console.log(`✓ ${name}: ${data.length} entries valid`);
  } else {
    hasErrors = true;
    console.error(`✗ ${name}: validation failed`);
    for (const issue of result.error.issues) {
      console.error(`  → [${issue.path.join('.')}] ${issue.message}`);
    }
    return; // Skip warnings if schema validation fails
  }

  // Warnings for unknown competitor IDs and categories
  const entries = data as Entry[];
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    if (!known.competitors.includes(entry.competitor)) {
      warningCount++;
      console.warn(`  ⚠ [${i}] Unknown competitor '${entry.competitor}' — "${entry.headline}"`);
    }
    if (!known.categories.includes(entry.category)) {
      warningCount++;
      console.warn(`  ⚠ [${i}] Unknown category '${entry.category}' — "${entry.headline}"`);
    }
  }
}

console.log('Validating competitor news data...\n');

validate('ASTS COMPS_TIMELINE', COMPS_TIMELINE, KNOWN.ASTS);
validate('BMNR COMPETITOR_NEWS', BMNR_COMPETITOR_NEWS, KNOWN.BMNR);
validate('CRCL COMPETITOR_NEWS', CRCL_COMPETITOR_NEWS, KNOWN.CRCL);

console.log('');

if (hasErrors) {
  console.error('Validation FAILED — fix the errors above.');
  process.exit(1);
} else if (warningCount > 0) {
  console.log(`All entries structurally valid. ${warningCount} warning(s) — unknown competitor IDs or categories detected.`);
  console.log('If these are new competitors/categories, add them to the KNOWN lists in this script and the data file header comments.');
} else {
  console.log('All competitor news data validated successfully.');
}
