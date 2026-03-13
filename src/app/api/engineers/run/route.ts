import { NextRequest, NextResponse } from 'next/server';
import { checkAiGate } from '@/lib/ai-gate';
import { runEngineer } from '@/lib/engineer-engine';

export async function POST(request: NextRequest) {
  const gateError = checkAiGate(request);
  if (gateError) return gateError;

  try {
    const body = await request.json();
    const { ticker, engineerId, triggerReason } = body as {
      ticker: string;
      engineerId: string;
      triggerReason?: string;
    };

    if (!ticker || !engineerId) {
      return NextResponse.json(
        { error: 'Missing required fields: ticker, engineerId' },
        { status: 400 }
      );
    }

    const result = await runEngineer({
      ticker,
      engineerId,
      triggerType: 'manual',
      triggerReason: triggerReason || 'Manual trigger from Engineers dashboard',
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Engineer run error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
