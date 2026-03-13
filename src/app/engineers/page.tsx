import { engineers } from '@/lib/engineers';
import { workflows } from '@/data/workflows';
import { researchStocks } from '@/lib/stocks';
import EngineersDashboard from '@/components/EngineersDashboard';
import './engineers.css';

export const metadata = {
  title: 'AI Engineers | ABISON',
  description: 'Autonomous AI engineers that continuously monitor, analyze, and update research data',
};

export default function EngineersPage() {
  return (
    <div className="pt-14">
      <EngineersDashboard
        engineers={engineers}
        workflows={workflows}
        tickers={researchStocks.map(s => ({ ticker: s.ticker, name: s.name }))}
      />
    </div>
  );
}
