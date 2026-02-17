import { NextRequest, NextResponse } from 'next/server';
import { execSync } from 'child_process';

/**
 * POST /api/workflow/commit
 *
 * Stages and commits data file changes for a ticker after Apply to Database.
 * Generates a commit message from the agent analysis.
 */

const ROOT = process.cwd();

function run(cmd: string): string {
  return execSync(cmd, { cwd: ROOT, encoding: 'utf-8', timeout: 10000 }).trim();
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

    // Check if there are actually staged/unstaged changes in the ticker's data dir
    const diffOutput = run(`git diff --name-only -- src/data/${tickerLower}/`);
    const stagedOutput = run(`git diff --cached --name-only -- src/data/${tickerLower}/`);

    const changedFiles = [...new Set([...diffOutput.split('\n'), ...stagedOutput.split('\n')].filter(Boolean))];

    if (changedFiles.length === 0) {
      return NextResponse.json({
        error: 'No changes detected in data files. Run "Apply to Database" first.',
      }, { status: 400 });
    }

    // Extract a commit message from the analysis (look for "Suggested commit message" pattern)
    let commitMsg = '';
    const commitMatch = analysis.match(/[Ss]uggested commit message[:\s]*[`"']?([^`"'\n]+)/);
    if (commitMatch) {
      commitMsg = commitMatch[1].trim();
    }

    // Fallback: generate from agent + ticker
    if (!commitMsg) {
      const agentLabel = agentId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      commitMsg = `${ticker.toUpperCase()}: Update database via ${agentLabel} agent`;
    }

    // Stage only the ticker's data files
    for (const file of changedFiles) {
      run(`git add "${file}"`);
    }

    // Commit
    const safeMsg = commitMsg.replace(/"/g, '\\"');
    run(`git commit -m "${safeMsg}"`);

    const shortHash = run('git rev-parse --short HEAD');

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
