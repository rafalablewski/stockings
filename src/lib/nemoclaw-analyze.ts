import { callNemoClawRaw } from './nemoclaw-bridge';
import { classifyNemoClawError } from './nemoclaw-error';

/**
 * Send an analysis prompt to NemoClaw/Nemotron and return the response.
 * Drop-in alternative to calling Claude for analysis routes.
 *
 * @param prompt - The full analysis prompt (user message)
 * @returns The analysis text
 */
export async function analyzeWithNemoClaw(prompt: string): Promise<string> {
  try {
    return await callNemoClawRaw(
      'You are a senior equity research analyst providing concise, actionable analysis.',
      prompt
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    // Re-classify if it's a raw fetch error
    if (msg.includes('fetch failed') || msg.includes('ECONNREFUSED')) {
      const errInfo = classifyNemoClawError(0, msg);
      throw new Error(errInfo.message);
    }
    throw err;
  }
}
