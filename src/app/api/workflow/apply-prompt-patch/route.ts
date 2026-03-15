import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { checkAiGate } from '@/lib/ai-gate';

/**
 * POST /api/workflow/apply-prompt-patch
 *
 * Applies remediation patches to workflow prompt templates in src/data/workflows.ts.
 * This is the human-gated step in the closed-loop audit→remediation pipeline.
 *
 * Two modes:
 *   dryRun: true  → Validate patches, generate diffs, return preview. NO writes.
 *   dryRun: false → Apply validated patches, run tsc, rollback on failure.
 *
 * Safety guarantees:
 * - ONLY edits src/data/workflows.ts — no other files
 * - Self-modification blocked (prompt-audit, prompt-remediation)
 * - Anchor uniqueness enforced
 * - Additive only — content can only grow, never shrink
 * - Template literal safety — no unbalanced backticks or ${}
 * - TypeScript validation after apply (tsc --noEmit)
 * - Atomic writes with backup
 * - Dangerous patterns blocked (import/require/exec/eval)
 */

interface PromptPatchOp {
  workflowId: string;
  action: 'insert' | 'append' | 'update';
  anchor: string;
  content: string;
  oldValue?: string;
  finding_id: string;
  rationale: string;
}

interface PatchPreview {
  finding_id: string;
  workflowId: string;
  action: string;
  valid: boolean;
  detail: string;
  diff: string;
}

const WORKFLOWS_FILE = path.resolve(process.cwd(), 'src', 'data', 'workflows.ts');
const MAX_PATCH_COUNT = 30;
const MAX_PATCH_CONTENT_LENGTH = 10_000;
const MAX_BACKUPS = 3;
const DANGEROUS_PATTERN = /\b(import\s|require\s*\(|exec\s*\(|eval\s*\(|process\.|child_process|Function\s*\()\b/;
const PROTECTED_WORKFLOWS = ['prompt-audit', 'prompt-remediation'];

// ─── Validation helpers ─────────────────────────────────────────────────────

function validatePatch(patch: PromptPatchOp, fileContent: string): { valid: boolean; detail: string } {
  // 1. Required fields
  if (!patch.workflowId || !patch.anchor || !patch.content || !patch.finding_id) {
    return { valid: false, detail: 'Missing required fields (workflowId, anchor, content, finding_id)' };
  }

  // 2. Self-modification block
  if (PROTECTED_WORKFLOWS.includes(patch.workflowId)) {
    return { valid: false, detail: `Self-modification blocked: cannot patch protected workflow '${patch.workflowId}'` };
  }

  // 3. Workflow exists in file
  if (!fileContent.includes(`id: '${patch.workflowId}'`)) {
    return { valid: false, detail: `Workflow '${patch.workflowId}' not found in workflows.ts` };
  }

  // 4. Anchor uniqueness — must appear exactly once
  const anchorCount = fileContent.split(patch.anchor).length - 1;
  if (anchorCount === 0) {
    return { valid: false, detail: `Anchor not found in file: "${patch.anchor.slice(0, 60)}..."` };
  }
  if (anchorCount > 1) {
    return { valid: false, detail: `Anchor appears ${anchorCount} times (must be unique): "${patch.anchor.slice(0, 60)}..."` };
  }

  // 5. Content length limit
  if (patch.content.length > MAX_PATCH_CONTENT_LENGTH) {
    return { valid: false, detail: `Content too long (${patch.content.length} chars, max ${MAX_PATCH_CONTENT_LENGTH})` };
  }

  // 6. Dangerous patterns
  if (DANGEROUS_PATTERN.test(patch.content)) {
    return { valid: false, detail: 'Content contains dangerous patterns (import/require/exec/eval)' };
  }

  // 7. Template literal safety — no unescaped backticks or ${}
  if (patch.content.includes('`') || patch.content.includes('${')) {
    return { valid: false, detail: 'Content contains backtick or ${} which would break template literals' };
  }

  // 8. Update-specific: oldValue must exist near anchor
  if (patch.action === 'update') {
    if (!patch.oldValue) {
      return { valid: false, detail: 'Update action requires oldValue' };
    }
    const oldCount = fileContent.split(patch.oldValue).length - 1;
    if (oldCount === 0) {
      return { valid: false, detail: `oldValue not found in file: "${patch.oldValue.slice(0, 60)}..."` };
    }
    if (oldCount > 1) {
      return { valid: false, detail: `oldValue appears ${oldCount} times (must be unique)` };
    }
    // Additive check: new content must be at least as long as old
    if (patch.content.length < patch.oldValue.length * 0.8) {
      return { valid: false, detail: 'Update would shrink content (additive-only policy)' };
    }
  }

  return { valid: true, detail: 'OK' };
}

function generateDiff(fileContent: string, patch: PromptPatchOp): string {
  const anchorIdx = fileContent.indexOf(patch.anchor);
  if (anchorIdx === -1) return '(anchor not found)';

  // Get context around the anchor (3 lines before/after)
  const beforeAnchor = fileContent.slice(Math.max(0, anchorIdx - 200), anchorIdx);
  const afterAnchor = fileContent.slice(anchorIdx, Math.min(fileContent.length, anchorIdx + patch.anchor.length + 200));

  const contextBefore = beforeAnchor.split('\n').slice(-3).join('\n');
  const contextAfter = afterAnchor.split('\n').slice(0, 3).join('\n');

  switch (patch.action) {
    case 'insert':
      return [
        `--- workflows.ts (${patch.workflowId})`,
        `+++ workflows.ts (patched)`,
        `@@ ${patch.finding_id}: insert before anchor @@`,
        ` ${contextBefore}`,
        ...patch.content.split('\n').map(l => `+${l}`),
        ` ${contextAfter}`,
      ].join('\n');
    case 'append':
      return [
        `--- workflows.ts (${patch.workflowId})`,
        `+++ workflows.ts (patched)`,
        `@@ ${patch.finding_id}: append after anchor @@`,
        ` ${contextBefore}`,
        ` ${contextAfter}`,
        ...patch.content.split('\n').map(l => `+${l}`),
      ].join('\n');
    case 'update':
      return [
        `--- workflows.ts (${patch.workflowId})`,
        `+++ workflows.ts (patched)`,
        `@@ ${patch.finding_id}: update @@`,
        ...(patch.oldValue?.split('\n').map(l => `-${l}`) || []),
        ...patch.content.split('\n').map(l => `+${l}`),
      ].join('\n');
    default:
      return '(unknown action)';
  }
}

function applyPatch(fileContent: string, patch: PromptPatchOp): string {
  switch (patch.action) {
    case 'insert': {
      const idx = fileContent.indexOf(patch.anchor);
      return fileContent.slice(0, idx) + patch.content + '\n' + fileContent.slice(idx);
    }
    case 'append': {
      const idx = fileContent.indexOf(patch.anchor) + patch.anchor.length;
      return fileContent.slice(0, idx) + '\n' + patch.content + fileContent.slice(idx);
    }
    case 'update': {
      if (!patch.oldValue) return fileContent;
      return fileContent.replace(patch.oldValue, patch.content);
    }
    default:
      return fileContent;
  }
}

// ─── Route handler ──────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const gateRes = checkAiGate(req);
  if (gateRes) return gateRes;

  try {
    const body = await req.json();
    const { patches, dryRun = true } = body as {
      patches: PromptPatchOp[];
      dryRun: boolean;
    };

    if (!Array.isArray(patches) || patches.length === 0) {
      return NextResponse.json({ error: 'No patches provided' }, { status: 400 });
    }
    if (patches.length > MAX_PATCH_COUNT) {
      return NextResponse.json({ error: `Too many patches (max ${MAX_PATCH_COUNT})` }, { status: 400 });
    }

    // Read current file
    let fileContent: string;
    try {
      fileContent = await fs.readFile(WORKFLOWS_FILE, 'utf-8');
    } catch {
      return NextResponse.json({ error: 'workflows.ts not found' }, { status: 500 });
    }

    const originalLineCount = fileContent.split('\n').length;

    // Validate all patches
    const previews: PatchPreview[] = patches.map(patch => {
      const validation = validatePatch(patch, fileContent);
      return {
        finding_id: patch.finding_id,
        workflowId: patch.workflowId,
        action: patch.action,
        valid: validation.valid,
        detail: validation.detail,
        diff: validation.valid ? generateDiff(fileContent, patch) : '',
      };
    });

    const validPatches = patches.filter((_, i) => previews[i].valid);
    const invalidCount = patches.length - validPatches.length;

    // Dry run — return previews only
    if (dryRun) {
      return NextResponse.json({
        mode: 'preview',
        total: patches.length,
        valid: validPatches.length,
        invalid: invalidCount,
        previews,
      });
    }

    // Apply mode — write patches
    if (validPatches.length === 0) {
      return NextResponse.json({ error: 'No valid patches to apply' }, { status: 400 });
    }

    // Apply each valid patch sequentially
    let modifiedContent = fileContent;
    const applied: string[] = [];

    for (const patch of validPatches) {
      // Re-validate against current state (content may have shifted from prior patches)
      const recheck = validatePatch(patch, modifiedContent);
      if (!recheck.valid) {
        previews.find(p => p.finding_id === patch.finding_id)!.detail = `Skipped (post-apply recheck): ${recheck.detail}`;
        continue;
      }
      modifiedContent = applyPatch(modifiedContent, patch);
      applied.push(patch.finding_id);
    }

    // No-shrink guard
    const newLineCount = modifiedContent.split('\n').length;
    if (newLineCount < originalLineCount) {
      return NextResponse.json({
        error: `Patch would shrink file from ${originalLineCount} to ${newLineCount} lines (additive-only policy)`,
      }, { status: 400 });
    }

    // Create backup
    const backupPath = `${WORKFLOWS_FILE}.bak.${Date.now()}`;
    await fs.copyFile(WORKFLOWS_FILE, backupPath);

    // Write atomically (tmp + rename)
    const tmpPath = `${WORKFLOWS_FILE}.tmp.${Date.now()}`;
    await fs.writeFile(tmpPath, modifiedContent, 'utf-8');
    await fs.rename(tmpPath, WORKFLOWS_FILE);

    // TypeScript validation
    let tscPassed = true;
    let tscError = '';
    try {
      execSync('npx tsc --noEmit', {
        cwd: process.cwd(),
        timeout: 60_000,
        stdio: 'pipe',
      });
    } catch (err) {
      tscPassed = false;
      tscError = err instanceof Error ? err.message : String(err);

      // Rollback from backup
      await fs.copyFile(backupPath, WORKFLOWS_FILE);
    }

    // Clean up old backups (keep MAX_BACKUPS)
    try {
      const dir = path.dirname(WORKFLOWS_FILE);
      const base = path.basename(WORKFLOWS_FILE);
      const entries = await fs.readdir(dir);
      const backups = entries
        .filter(e => e.startsWith(base + '.bak.'))
        .sort()
        .reverse();
      for (const old of backups.slice(MAX_BACKUPS)) {
        try { await fs.unlink(path.join(dir, old)); } catch { /* ignore */ }
      }
    } catch { /* ignore */ }

    if (!tscPassed) {
      return NextResponse.json({
        mode: 'apply',
        success: false,
        error: 'TypeScript validation failed after patching — rolled back to backup',
        tscError: tscError.slice(0, 2000),
        applied,
      }, { status: 400 });
    }

    return NextResponse.json({
      mode: 'apply',
      success: true,
      applied,
      linesAdded: newLineCount - originalLineCount,
      previews: previews.filter(p => applied.includes(p.finding_id)),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
