import { NextResponse } from 'next/server';

export async function GET() {
  const hasKey = !!process.env.ANTHROPIC_API_KEY;
  const keyPrefix = process.env.ANTHROPIC_API_KEY?.slice(0, 10) || 'NOT SET';
  return NextResponse.json({
    hasKey,
    keyPrefix: hasKey ? keyPrefix + '...' : 'NOT SET',
    nodeEnv: process.env.NODE_ENV,
  });
}
