import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_PATHS = [
  '/api/edgar/analyze',
  '/api/sources/analyze',
];

/** Constant-time comparison (Edge-compatible, no Node crypto). */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!PROTECTED_PATHS.some(p => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const pin = process.env.AUTH_PIN;
  if (!pin) {
    // No PIN configured → deny access (secure by default)
    return NextResponse.json({ error: 'Access denied — no AUTH_PIN configured' }, { status: 403 });
  }

  const provided = request.headers.get('x-auth-pin');
  if (provided && safeEqual(provided, pin)) return NextResponse.next();

  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

export const config = {
  matcher: '/api/:path*',
};
