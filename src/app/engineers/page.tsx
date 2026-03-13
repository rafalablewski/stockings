import { engineers } from '@/lib/engineers';
import { researchStocks } from '@/lib/stocks';
import EngineersDashboard from '@/components/EngineersDashboard';

export const metadata = {
  title: 'AI Engineers | ABISON',
  description: 'Autonomous AI engineers that continuously monitor, analyze, and update research data',
};

export default function EngineersPage() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/20 mb-4">
            Autonomous Operations
          </p>
          <h1 className="text-3xl font-light tracking-tight text-white mb-4">
            AI Engineers
          </h1>
          <div className="w-10 h-px bg-white/10 mb-6" />
          <p className="text-[14px] text-white/35 leading-relaxed max-w-xl">
            Full-time AI engineers that work autonomously — monitoring filings,
            analyzing data, and updating research databases without manual prompts.
          </p>
        </div>

        {/* Client-side dashboard */}
        <EngineersDashboard
          engineers={engineers}
          tickers={researchStocks.map(s => s.ticker)}
        />
      </div>
    </div>
  );
}
