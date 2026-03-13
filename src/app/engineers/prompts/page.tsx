import { researchStocks } from '@/lib/stocks';
import PromptDatabase from '@/components/PromptDatabase';
import '../engineers.css';

export const metadata = {
  title: 'Prompt Database | ABISON',
  description: 'Centralized prompt database for all AI engineer workflows',
};

export default function PromptDatabasePage() {
  return (
    <div className="pt-14">
      <PromptDatabase
        tickers={researchStocks.map(s => ({ ticker: s.ticker, name: s.name }))}
      />
    </div>
  );
}
