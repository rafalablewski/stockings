import { NextRequest } from 'next/server';
import { checkAiGate } from '@/lib/ai-gate';
import { runEngineer } from '@/lib/engineer-engine';
import { getEngineer } from '@/lib/engineers';
import { PIPELINES } from '@/lib/derive-pipelines';
import { z } from 'zod';

// Allow up to 5 minutes for full pipeline runs (Vercel Hobby max: 300)
export const maxDuration = 300;

const RunPipelineBody = z.object({
  ticker: z.string().min(1),
  pipelineId: z.string().min(1),
});

/**
 * POST /api/engineers/run-pipeline
 *
 * Runs a full pipeline end-to-end, streaming progress events via SSE.
 * Each engineer step is executed sequentially, with outputs passed as
 * chainContext to the next engineer in the chain.
 *
 * SSE event types:
 *   { type: "pipeline:start", pipelineId, name, stepCount }
 *   { type: "step:start", stepIndex, engineerId, label, totalSteps }
 *   { type: "step:log", stepIndex, message }
 *   { type: "step:complete", stepIndex, engineerId, durationMs, outputPreview }
 *   { type: "step:error", stepIndex, engineerId, error }
 *   { type: "step:skip", stepIndex, label, reason }
 *   { type: "pipeline:complete", durationMs, stepsCompleted, stepsFailed }
 *   { type: "pipeline:error", error }
 *   data: [DONE]
 */
export async function POST(request: NextRequest) {
  const gateError = checkAiGate(request);
  if (gateError) return gateError;

  let parsedBody: z.infer<typeof RunPipelineBody>;
  try {
    const body = await request.json();
    const result = RunPipelineBody.safeParse(body);
    if (!result.success) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: ticker, pipelineId', details: result.error.flatten() }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }
    parsedBody = result.data;
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid JSON body' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const { ticker, pipelineId } = parsedBody;

  // Look up the pipeline definition
  const pipeline = PIPELINES.find(p => p.id === pipelineId);
  if (!pipeline) {
    return new Response(
      JSON.stringify({ error: `Unknown pipeline: ${pipelineId}` }),
      { status: 404, headers: { 'Content-Type': 'application/json' } },
    );
  }

  // Extract engineer steps (only 'engineer' type steps have engineerId)
  const engineerSteps = pipeline.steps.filter(s => s.type === 'engineer' && s.engineerId);

  if (engineerSteps.length === 0) {
    return new Response(
      JSON.stringify({ error: `Pipeline ${pipelineId} has no executable engineer steps` }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: Record<string, unknown>) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      const pipelineStart = Date.now();
      let stepsCompleted = 0;
      let stepsFailed = 0;
      let lastOutput: string | null = null;

      send({
        type: 'pipeline:start',
        pipelineId: pipeline.id,
        name: pipeline.name,
        stepCount: engineerSteps.length,
      });

      for (let i = 0; i < engineerSteps.length; i++) {
        const step = engineerSteps[i];
        const engineerId = step.engineerId!;
        const engineer = getEngineer(engineerId);

        if (!engineer) {
          send({
            type: 'step:skip',
            stepIndex: i,
            label: step.label,
            reason: `Engineer ${engineerId} not found`,
          });
          continue;
        }

        send({
          type: 'step:start',
          stepIndex: i,
          engineerId,
          label: step.label,
          totalSteps: engineerSteps.length,
        });

        // Log what we're about to do
        const workflowCount = engineer.workflowIds.length;
        send({
          type: 'step:log',
          stepIndex: i,
          message: `Executing ${engineer.name} (${workflowCount} workflow${workflowCount !== 1 ? 's' : ''}) for ${ticker.toUpperCase()}`,
        });

        if (lastOutput) {
          send({
            type: 'step:log',
            stepIndex: i,
            message: `Injecting ${(lastOutput.length / 1000).toFixed(1)}k chars from previous step as chain context`,
          });
        }

        const stepStart = Date.now();

        try {
          // Build chainContext from the previous step's output
          const chainContext = lastOutput
            ? { LATEST_AUDIT_OUTPUT: lastOutput }
            : undefined;

          const result = await runEngineer({
            ticker,
            engineerId,
            triggerType: 'manual',
            triggerReason: `Pipeline run: ${pipeline.name} (step ${i + 1}/${engineerSteps.length})`,
            chainContext,
          });

          const stepDuration = Date.now() - stepStart;

          if (result.status === 'failed') {
            stepsFailed++;
            send({
              type: 'step:error',
              stepIndex: i,
              engineerId,
              error: result.error || 'Unknown error',
              durationMs: stepDuration,
            });

            send({
              type: 'step:log',
              stepIndex: i,
              message: `FAILED after ${(stepDuration / 1000).toFixed(1)}s — ${result.error || 'see run history for details'}`,
            });

            // Stop pipeline on failure — downstream steps depend on this output
            send({
              type: 'step:log',
              stepIndex: i,
              message: 'Pipeline halted — downstream steps depend on this output',
            });
            break;
          }

          stepsCompleted++;
          lastOutput = result.outputFull;

          const preview = result.outputSummary?.slice(0, 200) || '';
          send({
            type: 'step:complete',
            stepIndex: i,
            engineerId,
            durationMs: stepDuration,
            runId: result.runId,
            outputPreview: preview,
            decisionId: result.decisionId,
          });

          send({
            type: 'step:log',
            stepIndex: i,
            message: `Completed in ${(stepDuration / 1000).toFixed(1)}s — ${((result.outputFull?.length || 0) / 1000).toFixed(1)}k chars output${result.decisionId ? ` — decision #${result.decisionId} created for PM review` : ''}`,
          });

          // Log any warnings
          if (result.warnings) {
            for (const w of result.warnings) {
              send({ type: 'step:log', stepIndex: i, message: `Warning: ${w}` });
            }
          }
        } catch (err) {
          stepsFailed++;
          const errorMsg = err instanceof Error ? err.message : String(err);
          const stepDuration = Date.now() - stepStart;

          send({
            type: 'step:error',
            stepIndex: i,
            engineerId,
            error: errorMsg,
            durationMs: stepDuration,
          });

          send({
            type: 'step:log',
            stepIndex: i,
            message: `EXCEPTION after ${(stepDuration / 1000).toFixed(1)}s — ${errorMsg}`,
          });

          // Stop on error
          break;
        }
      }

      const totalDuration = Date.now() - pipelineStart;

      send({
        type: 'pipeline:complete',
        durationMs: totalDuration,
        stepsCompleted,
        stepsFailed,
      });

      controller.enqueue(encoder.encode('data: [DONE]\n\n'));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
