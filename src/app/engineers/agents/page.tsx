import { engineers } from '@/lib/engineers';
import { agents, resources, connections, dashboardStats } from '@/data/ai-engineers';
import AIAgentsView from './AIAgentsView';
import '../engineers.css';

export const metadata = {
  title: 'AI Agents | ABISON',
  description: 'Structure and topology of hired AI agents — hooks, workflows, pipelines',
};

export default function AIAgentsPage() {
  return (
    <div className="pt-14">
      <AIAgentsView
        engineers={engineers}
        agents={agents}
        resources={resources}
        connections={connections}
        stats={dashboardStats}
      />
    </div>
  );
}
