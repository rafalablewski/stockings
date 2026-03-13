import { engineers } from '@/lib/engineers';
import { workflows } from '@/data/workflows';
import AIAgentsView from './AIAgentsView';
import '../engineers.css';

export const metadata = {
  title: 'AI Agents | ABISON',
  description: 'Hired AI agents that execute tasks from the Prompt Database',
};

export default function AIAgentsPage() {
  return (
    <div className="pt-14">
      <AIAgentsView
        engineers={engineers}
        workflows={workflows}
      />
    </div>
  );
}
