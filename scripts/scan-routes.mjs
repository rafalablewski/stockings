#!/usr/bin/env node
// ============================================================================
// scan-routes.mjs — Pre-build script that scans src/app/ for pages & API routes
// ============================================================================
// Generates src/data/generated/route-inventory.json so that codebase-inventory.ts
// can import it without relying on runtime fs access (Edge-compatible).
//
// Plain .mjs — runs with bare `node`, no tsx/ts-node needed (Vercel-safe).
//
// Also scans src/lib/schema.ts for pgTable() calls to keep DB_TABLES in sync.
//
// Usage:  node scripts/scan-routes.mjs
// Runs automatically before dev and build via package.json scripts.
// ============================================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, '..');
const APP_DIR = path.join(ROOT, 'src', 'app');
const SCHEMA_FILE = path.join(ROOT, 'src', 'lib', 'schema.ts');
const OUT_DIR = path.join(ROOT, 'src', 'data', 'generated');
const OUT_FILE = path.join(OUT_DIR, 'route-inventory.json');

// ── Scan pages (page.tsx files) ─────────────────────────────────────────────

function scanPages(dir, base = '') {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('_') || entry.name.startsWith('.')) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'api') continue;
      results.push(...scanPages(fullPath, `${base}/${entry.name}`));
    } else if (entry.name === 'page.tsx' || entry.name === 'page.ts') {
      const cleanPath = base.replace(/\/\([^)]+\)/g, '') || '/';
      results.push(cleanPath);
    }
  }
  return results;
}

// ── Scan API routes (route.ts files under app/api/) ─────────────────────────

function scanApiRoutes(dir, base = '/api') {
  const results = [];
  const apiDir = path.join(dir, 'api');
  if (!fs.existsSync(apiDir)) return results;

  function walk(d, prefix) {
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

function scanDbTables() {
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
