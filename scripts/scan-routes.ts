#!/usr/bin/env npx tsx
// ============================================================================
// scan-routes.ts — Pre-build script that scans src/app/ for pages & API routes
// ============================================================================
// Generates src/data/generated/route-inventory.json so that codebase-inventory.ts
// can import it without relying on runtime fs access (Edge-compatible).
//
// Also scans src/lib/schema.ts for pgTable() calls to keep DB_TABLES in sync.
//
// Usage:  npx tsx scripts/scan-routes.ts
// Runs automatically via the "prebuild" npm script.
// ============================================================================

import * as fs from 'fs';
import * as path from 'path';

const ROOT = path.resolve(__dirname, '..');
const APP_DIR = path.join(ROOT, 'src', 'app');
const SCHEMA_FILE = path.join(ROOT, 'src', 'lib', 'schema.ts');
const OUT_DIR = path.join(ROOT, 'src', 'data', 'generated');
const OUT_FILE = path.join(OUT_DIR, 'route-inventory.json');

// ── Scan pages (page.tsx files) ─────────────────────────────────────────────

function scanPages(dir: string, base = ''): string[] {
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('_') || entry.name.startsWith('.')) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip api/ — those are API routes, not pages
      if (entry.name === 'api') continue;
      results.push(...scanPages(fullPath, `${base}/${entry.name}`));
    } else if (entry.name === 'page.tsx' || entry.name === 'page.ts') {
      // Convert route groups like (dashboard) to nothing
      const cleanPath = base.replace(/\/\([^)]+\)/g, '') || '/';
      results.push(cleanPath);
    }
  }
  return results;
}

// ── Scan API routes (route.ts files under app/api/) ─────────────────────────

function scanApiRoutes(dir: string, base = '/api'): string[] {
  const results: string[] = [];
  const apiDir = path.join(dir, 'api');
  if (!fs.existsSync(apiDir)) return results;

  function walk(d: string, prefix: string) {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      if (entry.name.startsWith('_') || entry.name.startsWith('.')) continue;
      const fullPath = path.join(d, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath, `${prefix}/${entry.name}`);
      } else if (entry.name === 'route.ts' || entry.name === 'route.js') {
        results.push(prefix);
      }
    }
  }

  walk(apiDir, base);
  return results;
}

// ── Scan DB tables from schema.ts ───────────────────────────────────────────

function scanDbTables(): string[] {
  if (!fs.existsSync(SCHEMA_FILE)) return [];
  const content = fs.readFileSync(SCHEMA_FILE, 'utf-8');
  const matches = content.matchAll(/pgTable\(\s*['"]([^'"]+)['"]/g);
  return [...matches].map(m => m[1]);
}

// ── Main ────────────────────────────────────────────────────────────────────

const pages = scanPages(APP_DIR).sort();
const apiRoutes = scanApiRoutes(APP_DIR).sort();
const dbTables = scanDbTables().sort();

const inventory = { pages, apiRoutes, dbTables, generatedAt: new Date().toISOString() };

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_FILE, JSON.stringify(inventory, null, 2) + '\n');

console.log(`[scan-routes] ${pages.length} pages, ${apiRoutes.length} API routes, ${dbTables.length} DB tables → ${path.relative(ROOT, OUT_FILE)}`);
