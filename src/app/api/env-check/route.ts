import { NextResponse } from 'next/server';

export async function GET() {
  // List all env var keys to diagnose what Vercel is passing
  const allKeys = Object.keys(process.env).sort();
  const anthropicKeys = allKeys.filter(k => k.includes('ANTHROPIC') || k.includes('API_KEY'));
  const hasKey = allKeys.includes('ANTHROPIC_API_KEY');

  return NextResponse.json({
    hasKey,
    anthropicKeys,
    totalEnvVars: allKeys.length,
    sampleKeys: allKeys.slice(0, 20),
    nodeEnv: process.env.NODE_ENV,
  });
}
