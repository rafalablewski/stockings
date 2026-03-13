import { engineers } from '@/lib/engineers';
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
        tickers={researchStocks.map(s => s.ticker)}
      />
    </div>
  );
}
