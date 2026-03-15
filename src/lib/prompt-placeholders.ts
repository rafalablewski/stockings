// ============================================================================
// PROMPT PLACEHOLDERS — Resolves {{PLACEHOLDER}} tokens in workflow prompts
// ============================================================================
// Before a prompt is sent to the Claude API, this module replaces placeholder
// tokens with runtime-generated content. Currently supports:
//
//   {{CODEBASE_INVENTORY}} — injects the live codebase feature inventory
//                            (used by the prompt-audit workflow)
// ============================================================================

import { buildCodebaseInventory } from './codebase-inventory';

/**
 * Replace all known {{PLACEHOLDER}} tokens in a prompt string.
 * Unknown placeholders are left as-is (they're harmless in prompt text).
 */
export function resolvePromptPlaceholders(prompt: string): string {
  if (!prompt.includes('{{')) return prompt;

  // Lazy-build inventory only when the placeholder is actually present
  if (prompt.includes('{{CODEBASE_INVENTORY}}')) {
    prompt = prompt.replace('{{CODEBASE_INVENTORY}}', buildCodebaseInventory());
  }

  return prompt;
}
