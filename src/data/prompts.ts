export interface PromptVariant {
  label: string;
  content: string;
}

export interface Prompt {
  name: string;
  description: string;
  variants: PromptVariant[];
}

// All prompts have been migrated to workflows (AI Agents tab).
// This array is kept for type compatibility with the /stocks page.
export const prompts: Prompt[] = [];
