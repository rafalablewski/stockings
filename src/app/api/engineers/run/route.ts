import { NextRequest, NextResponse } from 'next/server';
import { checkAiGate } from '@/lib/ai-gate';
import { runEngineer } from '@/lib/engineer-engine';
import { z } from 'zod';

const RunBody = z.object({
  ticker: z.string().min(1),
  engineerId: z.string().min(1),
  triggerReason: z.string().optional(),
  workflowId: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const gateError = checkAiGate(request);
  if (gateError) return gateError;

  try {
    const body = await request.json();
    const parsed = RunBody.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Missing required fields: ticker, engineerId', details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const { ticker, engineerId, triggerReason, workflowId } = parsed.data;

    const result = await runEngineer({
      ticker,
      engineerId,
      triggerType: 'manual',
      triggerReason: triggerReason || 'Manual trigger from Engineers dashboard',
      workflowId,
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
