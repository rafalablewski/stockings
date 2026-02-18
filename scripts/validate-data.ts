/**
 * Build-time validation script for competitor news data.
 * Runs Zod schema validation against all three stock data arrays.
 *
 * Usage: npx tsx scripts/validate-data.ts
 */

import { z } from 'zod';
import { competitorNewsEntrySchema } from '../src/data/shared/competitor-schema';
import { COMPS_TIMELINE } from '../src/data/asts/comps-timeline';
import { BMNR_COMPETITOR_NEWS } from '../src/data/bmnr/competitor-news';
import { CRCL_COMPETITOR_NEWS } from '../src/data/crcl/competitor-news';

const arraySchema = z.array(competitorNewsEntrySchema);

let hasErrors = false;

function validate(name: string, data: unknown[]) {
  const result = arraySchema.safeParse(data);
  if (result.success) {
    console.log(`✓ ${name}: ${data.length} entries valid`);
  } else {
    hasErrors = true;
    console.error(`✗ ${name}: validation failed`);
    for (const issue of result.error.issues) {
      console.error(`  → [${issue.path.join('.')}] ${issue.message}`);
    }
  }
}

console.log('Validating competitor news data...\n');

validate('ASTS COMPS_TIMELINE', COMPS_TIMELINE);
validate('BMNR COMPETITOR_NEWS', BMNR_COMPETITOR_NEWS);
validate('CRCL COMPETITOR_NEWS', CRCL_COMPETITOR_NEWS);

console.log('');

if (hasErrors) {
  console.error('Validation FAILED — fix the errors above.');
  process.exit(1);
} else {
  console.log('All competitor news data validated successfully.');
}
