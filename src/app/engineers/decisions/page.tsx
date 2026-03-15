import DecisionDashboard from '@/components/DecisionDashboard';
import '../engineers.css';

export const metadata = {
  title: 'Decision Dashboard | ABISON',
  description: 'PM approval queue for AI engineer outputs — review, approve, or reject proposed changes',
};

export default function DecisionsPage() {
  return (
    <div className="pt-14 eng-app">
      <div style={{ padding: '24px 20px 12px', maxWidth: 1000, margin: '0 auto' }}>
        <h1 style={{ fontSize: 20, fontWeight: 600, color: 'rgba(255,255,255,0.85)', marginBottom: 4 }}>
          Decision Dashboard
        </h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 0 }}>
          Review and approve AI engineer proposals. PMs approve first, then the Boss gives final sign-off.
        </p>
      </div>
      <DecisionDashboard />
    </div>
  );
}
