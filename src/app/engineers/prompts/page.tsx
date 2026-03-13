import { researchStocks } from '@/lib/stocks';
import { engineers } from '@/lib/engineers';
import PromptDatabase from '@/components/PromptDatabase';

export const metadata = {
  title: 'Prompt Database | ABISON',
  description: 'Centralized prompt database for all AI engineer workflows',
};

export default function PromptDatabasePage() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/20 mb-4">
            Engineers / Prompt Database
          </p>
          <h1 className="text-3xl font-light tracking-tight text-white mb-4">
            Prompt Database
          </h1>
          <div className="w-10 h-px bg-white/10 mb-6" />
          <p className="text-[14px] text-white/35 leading-relaxed max-w-xl">
            All AI analysis prompts in one place. Select a ticker to run any workflow
            directly, or browse prompts used by each autonomous engineer.
          </p>
        </div>

        <PromptDatabase
          tickers={researchStocks.map(s => ({ ticker: s.ticker, name: s.name }))}
          engineers={engineers}
        />
      </div>
    </div>
  );
}
