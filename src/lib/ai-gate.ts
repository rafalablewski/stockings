import { NextResponse } from 'next/server';

/**
 * Returns a 503 response if the user has disabled AI features via the footer toggle.
 * Call this near the top of each AI API route handler.
 */
export function checkAiGate(req: Request): NextResponse | null {
  if (req.headers.get('x-ai-disabled') === 'true') {
    return NextResponse.json(
      { error: 'AI features are disabled', disabled: true },
      { status: 503 }
    );
  }
  return null;
}
