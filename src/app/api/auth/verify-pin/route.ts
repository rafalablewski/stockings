import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';

/** Constant-time string comparison to prevent timing attacks. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

/**
 * POST /api/auth/verify-pin
 *
 * Checks if the provided PIN matches AUTH_PIN env var.
 * Returns { ok: true } on match, { ok: true, required: false } if no PIN is configured,
 * or 401 on mismatch.
 */
export async function POST(request: NextRequest) {
  const pin = process.env.AUTH_PIN;

  if (!pin) {
    return NextResponse.json({ ok: true, required: false });
  }

  try {
    const { pin: provided } = await request.json();

    if (typeof provided === 'string' && safeEqual(provided, pin)) {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: 'Invalid PIN' }, { status: 401 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

/**
 * GET /api/auth/verify-pin
 *
 * Returns whether PIN auth is required (without revealing the PIN).
 */
export async function GET() {
  const pin = process.env.AUTH_PIN;
  return NextResponse.json({ required: !!pin });
}
