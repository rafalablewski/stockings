import { NextResponse } from 'next/server';

/**
 * Returns a 503 response if the user has disabled AI features via the nav toggle.
 * Call this near the top of each AI API route handler.
 */
export function checkAiGate(req: Request): NextResponse | null {
  if (req.headers.get('x-ai-disabled') === 'true') {
    return NextResponse.json(
      { error: 'AI features are disabled — re-enable with the AI toggle in the nav bar.', disabled: true },
      { status: 503 }
    );
  }
  return null;
}
