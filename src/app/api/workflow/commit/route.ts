import { NextRequest, NextResponse } from 'next/server';
import { execFileSync } from 'child_process';

/**
 * POST /api/workflow/commit
 *
 * Stages and commits data file changes for a ticker after Apply to Database.
 * Generates a commit message from the agent analysis.
 *
 * Security: uses execFileSync (no shell) to prevent command injection.
 * Ticker validated against strict alphanumeric pattern.
 */

const ROOT = process.cwd();
const TICKER_PATTERN = /^[a-z]{2,10}$/;
const SAFE_PATH_PATTERN = /^src\/data\/[a-z]{2,10}\/[\w.-]+\.ts$/;

function git(...args: string[]): string {
  return execFileSync('git', args, { cwd: ROOT, encoding: 'utf-8', timeout: 10000 }).trim();
}

function npx(...args: string[]): string {
  return execFileSync('npx', args, { cwd: ROOT, encoding: 'utf-8', timeout: 30000 }).trim();
}

// Strip shell metacharacters from commit messages — defense in depth
function sanitizeCommitMsg(msg: string): string {
  return msg
    .replace(/[`$\\]/g, '')        // remove backticks, dollar signs, backslashes
    .replace(/[^\x20-\x7E]/g, '')  // ASCII printable only
    .slice(0, 200)                  // cap length
    .trim();
}

export async function POST(request: NextRequest) {
  try {
    const { ticker, agentId, analysis } = await request.json() as {
      ticker: string;
      agentId: string;
      analysis: string;
    };

    if (!ticker) {
      return NextResponse.json({ error: 'Missing ticker' }, { status: 400 });
    }

    const tickerLower = ticker.toLowerCase();

    // Strict ticker validation — prevent path traversal and injection
    if (!TICKER_PATTERN.test(tickerLower)) {
      return NextResponse.json({ error: 'Invalid ticker format' }, { status: 400 });
    }

    // Check if there are actually staged/unstaged changes in the ticker's data dir
    const diffOutput = git('diff', '--name-only', '--', `src/data/${tickerLower}/`);
    const stagedOutput = git('diff', '--cached', '--name-only', '--', `src/data/${tickerLower}/`);

    const changedFiles = [...new Set(
      [...diffOutput.split('\n'), ...stagedOutput.split('\n')]
        .filter(Boolean)
        .filter(f => SAFE_PATH_PATTERN.test(f))  // Only allow safe paths
    )];

    if (changedFiles.length === 0) {
      return NextResponse.json({
        error: 'No changes detected in data files. Run "Apply to Database" first.',
      }, { status: 400 });
    }

    // Extract a commit message from the analysis (look for "Suggested commit message" pattern)
    let commitMsg = '';
    const commitMatch = analysis?.match(/[Ss]uggested commit message[:\s]*[`"']?([^`"'\n]+)/);
    if (commitMatch) {
      commitMsg = sanitizeCommitMsg(commitMatch[1]);
    }

    // Fallback: generate from agent + ticker
    if (!commitMsg) {
      const agentLabel = (agentId || 'unknown').replace(/[^a-zA-Z0-9 -]/g, '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      commitMsg = `${tickerLower.toUpperCase()}: Update database via ${agentLabel} agent`;
    }

    // Stage only the ticker's data files
    for (const file of changedFiles) {
      git('add', file);
    }

    // TypeScript check before committing — catch broken code
    try {
      npx('tsc', '--noEmit', '--pretty', 'false');
    } catch (tscErr) {
      // Unstage files so the user can fix first
      for (const file of changedFiles) {
        try { git('reset', 'HEAD', file); } catch { /* ignore */ }
      }
      const tscOutput = (tscErr as Error).message.slice(0, 500);
      return NextResponse.json({
        error: `TypeScript check failed — commit aborted. Fix the errors first.\n${tscOutput}`,
      }, { status: 422 });
    }

    // Commit — using execFileSync args array, no shell interpretation
    git('commit', '-m', commitMsg);

    const shortHash = git('rev-parse', '--short', 'HEAD');
    console.log(`[commit] ${shortHash} — ${commitMsg} (${changedFiles.length} files: ${changedFiles.join(', ')})`);

    return NextResponse.json({
      message: `${shortHash} — ${commitMsg}`,
      hash: shortHash,
      files: changedFiles,
    });
  } catch (error) {
    console.error('[commit] Error:', error);
    return NextResponse.json(
      { error: `Commit failed: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
