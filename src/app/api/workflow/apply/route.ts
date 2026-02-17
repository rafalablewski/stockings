import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * POST /api/workflow/apply
 *
 * Two modes:
 *   dryRun: true  → Extract patches from analysis, validate, return diffs. NO writes.
 *   dryRun: false → Apply pre-validated patches from the preview step. Writes files.
 *
 * Merge-only contract — enforced at every level:
 * - INSERT new entries (before anchor)
 * - APPEND new content (after anchor)
 * - UPDATE specific values (old → new, anchor-constrained)
 * - NEVER delete lines, entries, or files
 *
 * Safety guarantees:
 * - Path traversal blocked (resolve + prefix check)
 * - Atomic writes (tmp + rename)
 * - Backup before write (.bak)
 * - Anchor uniqueness enforced
 * - Update: oldValue must be near anchor, appear exactly once
 * - Character-count guard: update content must be >= 50% of old length
 * - Code injection blocked (import/require/exec/eval)
 * - Idempotency: skip if content already present
 * - File line-count can never decrease
 */

interface PatchOp {
  file: string;
  action: 'insert' | 'append' | 'update';
  anchor: string;
  content: string;
  oldValue?: string;
}

interface PatchPreviewItem {
  file: string;
  action: string;
  valid: boolean;
  detail: string;
  diff: string;       // unified diff preview
  linesAdded: number;
}

interface PatchResult {
  file: string;
  action: string;
  success: boolean;
  detail: string;
}

const DATA_DIR = path.resolve(process.cwd(), 'src', 'data');
const ALLOWED_PREFIXES = ['asts/', 'bmnr/', 'crcl/'];
const MAX_ANALYSIS_LENGTH = 50_000;
const MAX_PATCH_CONTENT_LENGTH = 5_000;
const DANGEROUS_PATTERN = /\b(import\s|require\s*\(|exec\s*\(|eval\s*\(|process\.|child_process|Function\s*\()\b/;

// ─── Path safety ────────────────────────────────────────────────────────────

function resolveAndValidate(filePath: string): { valid: boolean; fullPath: string; detail: string } {
  const normalized = filePath.replace(/\\/g, '/');
  if (!ALLOWED_PREFIXES.some(p => normalized.startsWith(p)) || !normalized.endsWith('.ts')) {
    return { valid: false, fullPath: '', detail: `Blocked: ${filePath} not in allowed paths` };
  }
  const fullPath = path.resolve(DATA_DIR, filePath);
  if (!fullPath.startsWith(DATA_DIR + path.sep)) {
    return { valid: false, fullPath: '', detail: `Path traversal blocked: ${filePath}` };
  }
  return { valid: true, fullPath, detail: '' };
}

// ─── Simple diff generator ──────────────────────────────────────────────────

function generateDiff(original: string, modified: string, filePath: string): string {
  const oldLines = original.split('\n');
  const newLines = modified.split('\n');
  const diffLines: string[] = [`--- a/${filePath}`, `+++ b/${filePath}`];

  // Find ranges that changed — simple approach: walk both arrays
  let i = 0;
  let j = 0;
  while (i < oldLines.length || j < newLines.length) {
    if (i < oldLines.length && j < newLines.length && oldLines[i] === newLines[j]) {
      i++;
      j++;
      continue;
    }
    // Found a difference — collect context
    const contextStart = Math.max(0, i - 2);
    // Find how far the difference extends
    let iEnd = i;
    let jEnd = j;
    // Advance until lines match again
    while (iEnd < oldLines.length || jEnd < newLines.length) {
      if (iEnd < oldLines.length && jEnd < newLines.length && oldLines[iEnd] === newLines[jEnd]) {
        // Check if next few lines also match (to avoid false re-sync)
        let matchLen = 0;
        while (iEnd + matchLen < oldLines.length && jEnd + matchLen < newLines.length && oldLines[iEnd + matchLen] === newLines[jEnd + matchLen] && matchLen < 3) matchLen++;
        if (matchLen >= 2) break;
      }
      if (iEnd < oldLines.length && !newLines.includes(oldLines[iEnd])) { iEnd++; continue; }
      if (jEnd < newLines.length && !oldLines.includes(newLines[jEnd])) { jEnd++; continue; }
      iEnd++;
      jEnd++;
    }
    const contextEnd = Math.min(oldLines.length, iEnd + 2);
    const newContextEnd = Math.min(newLines.length, jEnd + 2);

    diffLines.push(`@@ -${contextStart + 1},${contextEnd - contextStart} +${Math.max(0, j - 2) + 1},${newContextEnd - Math.max(0, j - 2)} @@`);
    for (let c = contextStart; c < i; c++) diffLines.push(` ${oldLines[c]}`);
    for (let r = i; r < iEnd; r++) diffLines.push(`-${oldLines[r]}`);
    for (let a = j; a < jEnd; a++) diffLines.push(`+${newLines[a]}`);
    for (let c = iEnd; c < contextEnd; c++) diffLines.push(` ${oldLines[c]}`);

    i = contextEnd;
    j = newContextEnd;
  }

  return diffLines.join('\n');
}

// ─── Patch validation (no writes) ───────────────────────────────────────────

async function validatePatch(patch: PatchOp): Promise<PatchPreviewItem> {
  const base = { file: patch.file, action: patch.action };

  // Path check
  const pathCheck = resolveAndValidate(patch.file);
  if (!pathCheck.valid) {
    return { ...base, valid: false, detail: pathCheck.detail, diff: '', linesAdded: 0 };
  }

  // Content size limit
  if (patch.content.length > MAX_PATCH_CONTENT_LENGTH) {
    return { ...base, valid: false, detail: `Content too large: ${patch.content.length} chars (max ${MAX_PATCH_CONTENT_LENGTH})`, diff: '', linesAdded: 0 };
  }

  // Code injection check
  if (DANGEROUS_PATTERN.test(patch.content)) {
    return { ...base, valid: false, detail: 'Blocked: patch content contains dangerous code patterns', diff: '', linesAdded: 0 };
  }

  // Read file
  let content: string;
  try {
    content = await fs.readFile(pathCheck.fullPath, 'utf-8');
  } catch {
    return { ...base, valid: false, detail: `File not found: ${patch.file}`, diff: '', linesAdded: 0 };
  }

  // Anchor check — must exist and be unique
  const anchorIdx = content.indexOf(patch.anchor);
  if (anchorIdx === -1) {
    return { ...base, valid: false, detail: `Anchor not found: "${patch.anchor.slice(0, 80)}..."`, diff: '', linesAdded: 0 };
  }
  if (content.indexOf(patch.anchor, anchorIdx + 1) !== -1) {
    return { ...base, valid: false, detail: `Ambiguous anchor (appears multiple times): "${patch.anchor.slice(0, 60)}..."`, diff: '', linesAdded: 0 };
  }

  // Idempotency check for insert/append
  if ((patch.action === 'insert' || patch.action === 'append') && content.includes(patch.content.trim())) {
    return { ...base, valid: false, detail: 'Already present in file (duplicate)', diff: '', linesAdded: 0 };
  }

  // Compute preview
  let newContent: string;

  switch (patch.action) {
    case 'insert': {
      const lineStart = content.lastIndexOf('\n', anchorIdx);
      const insertAt = lineStart === -1 ? 0 : lineStart + 1;
      newContent = content.slice(0, insertAt) + patch.content + '\n' + content.slice(insertAt);
      break;
    }

    case 'append': {
      const lineEnd = content.indexOf('\n', anchorIdx);
      const insertAt = lineEnd === -1 ? content.length : lineEnd + 1;
      newContent = content.slice(0, insertAt) + patch.content + '\n' + content.slice(insertAt);
      break;
    }

    case 'update': {
      if (!patch.oldValue) {
        return { ...base, valid: false, detail: 'Update requires oldValue', diff: '', linesAdded: 0 };
      }

      // oldValue must appear exactly once in file
      const occurrences = content.split(patch.oldValue).length - 1;
      if (occurrences === 0) {
        return { ...base, valid: false, detail: `Old value not found: "${patch.oldValue.slice(0, 80)}..."`, diff: '', linesAdded: 0 };
      }
      if (occurrences > 1) {
        return { ...base, valid: false, detail: `Old value appears ${occurrences} times — ambiguous. Use a longer/more unique oldValue.`, diff: '', linesAdded: 0 };
      }

      // oldValue must be near the anchor (within ±2000 chars)
      const oldIdx = content.indexOf(patch.oldValue);
      if (Math.abs(oldIdx - anchorIdx) > 2000) {
        return { ...base, valid: false, detail: `Old value is ${Math.abs(oldIdx - anchorIdx)} chars from anchor — too far (max 2000)`, diff: '', linesAdded: 0 };
      }

      // Character-count guard: new content must be >= 50% of old
      if (patch.content.length < patch.oldValue.length * 0.5) {
        return { ...base, valid: false, detail: `Suspicious shrink: replacing ${patch.oldValue.length} chars with ${patch.content.length} chars (<50%)`, diff: '', linesAdded: 0 };
      }

      // Line-count guard
      const oldLines = patch.oldValue.split('\n').length;
      const newLines = patch.content.split('\n').length;
      if (newLines < oldLines) {
        return { ...base, valid: false, detail: `Would remove ${oldLines - newLines} lines`, diff: '', linesAdded: 0 };
      }

      newContent = content.slice(0, oldIdx) + patch.content + content.slice(oldIdx + patch.oldValue.length);
      break;
    }

    default:
      return { ...base, valid: false, detail: `Unknown action: ${patch.action}`, diff: '', linesAdded: 0 };
  }

  // Final line-count safety
  const originalLines = content.split('\n').length;
  const newLines = newContent.split('\n').length;
  if (newLines < originalLines) {
    return { ...base, valid: false, detail: `File would shrink: ${originalLines} → ${newLines} lines`, diff: '', linesAdded: 0 };
  }

  const diff = generateDiff(content, newContent, patch.file);

  return { ...base, valid: true, detail: `+${newLines - originalLines} lines`, diff, linesAdded: newLines - originalLines };
}

// ─── Patch application (with writes) ────────────────────────────────────────

async function applyPatch(patch: PatchOp): Promise<PatchResult> {
  const base = { file: patch.file, action: patch.action };

  const pathCheck = resolveAndValidate(patch.file);
  if (!pathCheck.valid) {
    return { ...base, success: false, detail: pathCheck.detail };
  }

  let content: string;
  try {
    content = await fs.readFile(pathCheck.fullPath, 'utf-8');
  } catch {
    return { ...base, success: false, detail: `File not found: ${patch.file}` };
  }

  const anchorIdx = content.indexOf(patch.anchor);
  if (anchorIdx === -1) {
    return { ...base, success: false, detail: `Anchor not found` };
  }

  let newContent: string;

  switch (patch.action) {
    case 'insert': {
      if (content.includes(patch.content.trim())) {
        return { ...base, success: false, detail: 'Already present (duplicate)' };
      }
      const lineStart = content.lastIndexOf('\n', anchorIdx);
      const insertAt = lineStart === -1 ? 0 : lineStart + 1;
      newContent = content.slice(0, insertAt) + patch.content + '\n' + content.slice(insertAt);
      break;
    }

    case 'append': {
      if (content.includes(patch.content.trim())) {
        return { ...base, success: false, detail: 'Already present (duplicate)' };
      }
      const lineEnd = content.indexOf('\n', anchorIdx);
      const insertAt = lineEnd === -1 ? content.length : lineEnd + 1;
      newContent = content.slice(0, insertAt) + patch.content + '\n' + content.slice(insertAt);
      break;
    }

    case 'update': {
      if (!patch.oldValue) return { ...base, success: false, detail: 'Update requires oldValue' };
      const oldIdx = content.indexOf(patch.oldValue);
      if (oldIdx === -1) return { ...base, success: false, detail: 'Old value not found' };
      if (content.indexOf(patch.oldValue, oldIdx + 1) !== -1) return { ...base, success: false, detail: 'Old value ambiguous' };
      if (Math.abs(oldIdx - anchorIdx) > 2000) return { ...base, success: false, detail: 'Old value too far from anchor' };
      if (patch.content.length < patch.oldValue.length * 0.5) return { ...base, success: false, detail: 'Suspicious content shrink' };
      newContent = content.slice(0, oldIdx) + patch.content + content.slice(oldIdx + patch.oldValue.length);
      break;
    }

    default:
      return { ...base, success: false, detail: `Unknown action: ${patch.action}` };
  }

  // Final line-count safety
  const originalLines = content.split('\n').length;
  const newLines = newContent.split('\n').length;
  if (newLines < originalLines) {
    return { ...base, success: false, detail: `File would shrink: ${originalLines} → ${newLines}` };
  }

  // Backup original
  const backupPath = pathCheck.fullPath + '.bak.' + Date.now();
  await fs.copyFile(pathCheck.fullPath, backupPath);

  // Atomic write: tmp file + rename
  const tmpPath = pathCheck.fullPath + '.tmp.' + Date.now();
  await fs.writeFile(tmpPath, newContent, 'utf-8');
  await fs.rename(tmpPath, pathCheck.fullPath);

  // Clean up backup on success (keep last one for safety — optional)
  // await fs.unlink(backupPath);

  return { ...base, success: true, detail: `+${newLines - originalLines} lines` };
}

// ─── Route handler ──────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const ANTHROPIC_API_KEY = (process.env as Record<string, string | undefined>)['ANTHROPIC_API_KEY'] || '';

  if (!ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 500 });
  }

  try {
    const body = await request.json() as {
      ticker: string;
      agentId: string;
      analysis?: string;
      dryRun?: boolean;
      patches?: PatchOp[];
    };

    const { ticker, agentId, dryRun = true } = body;

    if (!ticker) {
      return NextResponse.json({ error: 'Missing ticker' }, { status: 400 });
    }

    let patches: PatchOp[];

    if (dryRun) {
      // ── PREVIEW MODE: extract patches from analysis via AI ──
      const analysis = (body.analysis || '').slice(0, MAX_ANALYSIS_LENGTH);
      if (!analysis) {
        return NextResponse.json({ error: 'Missing analysis for preview' }, { status: 400 });
      }

      const extractionPrompt = `You are a database patch generator for the ABISON investment research platform. Given an agent analysis output, extract ONLY the concrete database changes proposed.

TICKER: ${ticker.toUpperCase()}
AGENT: ${agentId}

Output ONLY valid JSON — an array of patch operations. No markdown, no explanation.

Each patch object:
{
  "file": "string — relative path from src/data/, e.g. '${ticker.toLowerCase()}/sec-filings.ts'",
  "action": "insert | append | update",
  "anchor": "string — unique text in the target file to locate the insertion point (must appear EXACTLY ONCE)",
  "content": "string — the TypeScript code to insert/append (must NOT contain import/require/exec/eval)",
  "oldValue": "string — ONLY for 'update' action, the exact text being replaced (must appear EXACTLY ONCE in file)"
}

Rules:
- action=insert: Insert BEFORE anchor (for adding new entries at top of reverse-chronological lists)
- action=append: Insert AFTER anchor (for adding bullets/fields to existing entries)
- action=update: Replace oldValue with content (oldValue must be UNIQUE in the file — use enough surrounding context)
- anchor must appear EXACTLY ONCE in the target file — include enough context for uniqueness
- NEVER produce patches that delete content or shrink data
- content must be valid TypeScript matching the file's style
- If the analysis says "Skip" or "Already Incorporated", produce NO patch
- If no patches are needed, return: []

ANALYSIS TO EXTRACT FROM:
${analysis}`;

      const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-5-20250929',
          max_tokens: 8192,
          messages: [{ role: 'user', content: extractionPrompt }],
        }),
      });

      if (!claudeRes.ok) {
        const errText = await claudeRes.text();
        console.error('[apply] Claude API error:', errText);
        return NextResponse.json({ error: 'AI patch extraction failed' }, { status: 502 });
      }

      const claudeData = await claudeRes.json() as {
        content: Array<{ type: string; text?: string }>;
      };
      const responseText = claudeData.content
        .filter((b) => b.type === 'text')
        .map((b) => b.text)
        .join('');

      try {
        const jsonStr = responseText.replace(/^```json?\n?/, '').replace(/\n?```$/, '').trim();
        patches = JSON.parse(jsonStr);
      } catch {
        console.error('[apply] Failed to parse patches:', responseText.slice(0, 500));
        return NextResponse.json({
          error: 'Failed to parse structured patches from AI',
          rawResponse: responseText.slice(0, 200),
        }, { status: 422 });
      }

      if (!Array.isArray(patches)) {
        return NextResponse.json({ error: 'Expected array of patches' }, { status: 422 });
      }

      if (patches.length === 0) {
        return NextResponse.json({
          dryRun: true,
          patchCount: 0,
          previews: [],
          patches: [],
          summary: 'No database changes needed — all items already incorporated or skipped.',
        });
      }

      // Validate each patch and generate diffs (NO writes)
      const previews: PatchPreviewItem[] = [];
      for (const patch of patches) {
        previews.push(await validatePatch(patch));
      }

      const validCount = previews.filter(p => p.valid).length;
      const invalidCount = previews.filter(p => !p.valid).length;
      const totalLinesAdded = previews.reduce((sum, p) => sum + p.linesAdded, 0);
      const filesAffected = new Set(previews.filter(p => p.valid).map(p => p.file)).size;

      return NextResponse.json({
        dryRun: true,
        patchCount: patches.length,
        validCount,
        invalidCount,
        totalLinesAdded,
        filesAffected,
        previews,
        patches: patches.filter((_, i) => previews[i].valid), // Only return valid patches for confirm step
        summary: `${validCount} valid patches across ${filesAffected} files (+${totalLinesAdded} lines)${invalidCount > 0 ? ` — ${invalidCount} rejected` : ''}`,
      });

    } else {
      // ── APPLY MODE: apply pre-validated patches ──
      patches = body.patches || [];

      if (patches.length === 0) {
        return NextResponse.json({ error: 'No patches to apply' }, { status: 400 });
      }

      // Re-validate and apply each patch
      const results: PatchResult[] = [];
      for (const patch of patches) {
        // Content safety checks (re-check even though preview validated)
        if (DANGEROUS_PATTERN.test(patch.content)) {
          results.push({ file: patch.file, action: patch.action, success: false, detail: 'Blocked: dangerous code pattern' });
          continue;
        }
        if (patch.content.length > MAX_PATCH_CONTENT_LENGTH) {
          results.push({ file: patch.file, action: patch.action, success: false, detail: 'Content too large' });
          continue;
        }
        results.push(await applyPatch(patch));
      }

      const successCount = results.filter(r => r.success).length;
      const failCount = results.filter(r => !r.success).length;

      return NextResponse.json({
        dryRun: false,
        patchCount: patches.length,
        applied: successCount,
        failed: failCount,
        results,
        summary: failCount === 0
          ? `Applied ${successCount} patches to ${ticker.toUpperCase()} database`
          : `Applied ${successCount}/${patches.length} patches (${failCount} failed)`,
      });
    }
  } catch (error) {
    console.error('[apply] Error:', error);
    return NextResponse.json(
      { error: `Apply failed: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
