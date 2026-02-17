import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * POST /api/workflow/apply
 *
 * Takes an agent's analysis output and uses a second AI call to generate
 * structured patches, then applies them ADDITIVELY to data files.
 *
 * Merge-only contract:
 * - INSERT new entries (at correct position)
 * - APPEND new fields/bullets to existing entries
 * - UPDATE specific values (old → new with validation)
 * - NEVER delete lines, entries, or files
 */

interface PatchOp {
  file: string;           // relative path from src/data, e.g. "asts/sec-filings.ts"
  action: 'insert' | 'append' | 'update';
  anchor: string;         // unique string to locate insertion point
  content: string;        // content to insert/append
  oldValue?: string;      // for 'update' — the value being replaced
}

interface PatchResult {
  file: string;
  action: string;
  success: boolean;
  detail: string;
}

const DATA_DIR = path.join(process.cwd(), 'src', 'data');

// Allowed subdirectories — prevent path traversal
const ALLOWED_PREFIXES = ['asts/', 'bmnr/', 'crcl/'];

function isAllowedFile(filePath: string): boolean {
  const normalized = filePath.replace(/\\/g, '/');
  return ALLOWED_PREFIXES.some(p => normalized.startsWith(p)) && normalized.endsWith('.ts');
}

async function applyPatch(patch: PatchOp): Promise<PatchResult> {
  const base = { file: patch.file, action: patch.action };

  if (!isAllowedFile(patch.file)) {
    return { ...base, success: false, detail: `Blocked: ${patch.file} is not in allowed paths` };
  }

  const fullPath = path.join(DATA_DIR, patch.file);

  let content: string;
  try {
    content = await fs.readFile(fullPath, 'utf-8');
  } catch {
    return { ...base, success: false, detail: `File not found: ${patch.file}` };
  }

  const anchorIdx = content.indexOf(patch.anchor);
  if (anchorIdx === -1) {
    return { ...base, success: false, detail: `Anchor not found: "${patch.anchor.slice(0, 60)}..."` };
  }

  let newContent: string;

  switch (patch.action) {
    case 'insert': {
      // Insert BEFORE the anchor line (for reverse-chronological: new entries go above existing)
      const lineStart = content.lastIndexOf('\n', anchorIdx);
      const insertAt = lineStart === -1 ? 0 : lineStart + 1;
      newContent = content.slice(0, insertAt) + patch.content + '\n' + content.slice(insertAt);
      break;
    }

    case 'append': {
      // Append AFTER the anchor (find end of the anchor line, insert after)
      const lineEnd = content.indexOf('\n', anchorIdx);
      const insertAt = lineEnd === -1 ? content.length : lineEnd + 1;
      newContent = content.slice(0, insertAt) + patch.content + '\n' + content.slice(insertAt);
      break;
    }

    case 'update': {
      // Replace oldValue with new content — ONLY if oldValue is found
      if (!patch.oldValue) {
        return { ...base, success: false, detail: 'Update requires oldValue' };
      }
      if (!content.includes(patch.oldValue)) {
        return { ...base, success: false, detail: `Old value not found: "${patch.oldValue.slice(0, 60)}..."` };
      }
      // Safety: ensure we're not deleting more than we're adding
      // (update should replace a value, not remove lines)
      const oldLines = patch.oldValue.split('\n').length;
      const newLines = patch.content.split('\n').length;
      if (newLines < oldLines) {
        return { ...base, success: false, detail: `Merge-only violation: update would remove ${oldLines - newLines} lines` };
      }
      newContent = content.replace(patch.oldValue, patch.content);
      break;
    }

    default:
      return { ...base, success: false, detail: `Unknown action: ${patch.action}` };
  }

  // Final safety: ensure no lines were removed
  const originalLineCount = content.split('\n').length;
  const newLineCount = newContent.split('\n').length;
  if (newLineCount < originalLineCount) {
    return { ...base, success: false, detail: `Merge-only violation: file would shrink from ${originalLineCount} to ${newLineCount} lines` };
  }

  await fs.writeFile(fullPath, newContent, 'utf-8');
  return { ...base, success: true, detail: `+${newLineCount - originalLineCount} lines` };
}

export async function POST(request: NextRequest) {
  const ANTHROPIC_API_KEY = (process.env as Record<string, string | undefined>)['ANTHROPIC_API_KEY'] || '';

  if (!ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 500 });
  }

  try {
    const { ticker, agentId, analysis } = await request.json() as {
      ticker: string;
      agentId: string;
      analysis: string;
    };

    if (!ticker || !analysis) {
      return NextResponse.json({ error: 'Missing ticker or analysis' }, { status: 400 });
    }

    // Step 1: Ask Claude to extract structured patches from the analysis
    const extractionPrompt = `You are a database patch generator for the ABISON investment research platform. Given an agent analysis output, extract ONLY the concrete database changes proposed.

TICKER: ${ticker.toUpperCase()}
AGENT: ${agentId}

Output ONLY valid JSON — an array of patch operations. No markdown, no explanation.

Each patch object:
{
  "file": "string — relative path from src/data/, e.g. '${ticker}/sec-filings.ts'",
  "action": "insert | append | update",
  "anchor": "string — unique text in the file to locate the insertion point",
  "content": "string — the TypeScript code to insert/append",
  "oldValue": "string — ONLY for 'update' action, the exact text being replaced"
}

Rules:
- action=insert: Insert BEFORE anchor (for adding new entries at top of reverse-chronological lists)
- action=append: Insert AFTER anchor (for adding bullets/fields to existing entries)
- action=update: Replace oldValue with content (for changing specific values like dates, counts)
- NEVER produce patches that delete content
- anchor must be a unique, exact substring from the target file
- content must be valid TypeScript that maintains the file's existing style
- If the analysis says "Skip" or "Already Incorporated" for an item, produce NO patch for it
- If no patches are needed, return an empty array: []

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

    // Parse the JSON patches
    let patches: PatchOp[];
    try {
      // Handle potential markdown wrapping
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
      return NextResponse.json({ error: 'Expected array of patches', rawResponse: responseText.slice(0, 200) }, { status: 422 });
    }

    if (patches.length === 0) {
      return NextResponse.json({
        patchCount: 0,
        results: [],
        summary: 'No database changes needed — analysis found all items already incorporated or skipped.',
      });
    }

    // Step 2: Apply each patch
    const results: PatchResult[] = [];
    for (const patch of patches) {
      const result = await applyPatch(patch);
      results.push(result);
    }

    const successCount = results.filter(r => r.success).length;
    const failCount = results.filter(r => !r.success).length;

    return NextResponse.json({
      patchCount: patches.length,
      applied: successCount,
      failed: failCount,
      results,
      summary: failCount === 0
        ? `Applied ${successCount} patches to ${ticker.toUpperCase()} database`
        : `Applied ${successCount}/${patches.length} patches (${failCount} failed)`,
    });
  } catch (error) {
    console.error('[apply] Error:', error);
    return NextResponse.json(
      { error: `Apply failed: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
