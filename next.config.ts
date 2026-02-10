import type { NextConfig } from "next";
import { readFileSync } from "fs";

// Load ANTHROPIC_API_KEY from .env.local since Turbopack doesn't inject it into API routes
function loadEnvKey(): string {
  if (process.env.ANTHROPIC_API_KEY) return process.env.ANTHROPIC_API_KEY;
  try {
    const envFile = readFileSync('.env.local', 'utf-8');
    const match = envFile.match(/^ANTHROPIC_API_KEY=(.+)$/m);
    return match?.[1]?.trim() ?? '';
  } catch { return ''; }
}

const nextConfig: NextConfig = {
  serverExternalPackages: ['@anthropic-ai/sdk'],
  env: {
    ANTHROPIC_API_KEY: loadEnvKey(),
  },
};

export default nextConfig;
