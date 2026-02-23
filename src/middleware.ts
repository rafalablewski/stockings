import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_PATHS = [
  '/api/workflow/run',
  '/api/workflow/apply',
  '/api/workflow/commit',
  '/api/edgar/analyze',
  '/api/sources/analyze',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!PROTECTED_PATHS.some(p => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const pin = process.env.AUTH_PIN;
  if (!pin) return NextResponse.next(); // No PIN configured → open access

  const provided = request.headers.get('x-auth-pin');
  if (provided === pin) return NextResponse.next();

  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

export const config = {
  matcher: '/api/:path*',
};
