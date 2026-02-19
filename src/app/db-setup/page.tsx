'use client';

import { useState } from 'react';

export default function DbSetupPage() {
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [result, setResult] = useState<string>('');

  async function runSetup() {
    setStatus('running');
    setResult('');
    try {
      const res = await fetch('/api/db/setup', { method: 'POST' });
      const data = await res.json();
      setResult(JSON.stringify(data, null, 2));
      setStatus(data.success ? 'success' : 'error');
    } catch (err) {
      setResult(err instanceof Error ? err.message : String(err));
      setStatus('error');
    }
  }

  return (
    <div style={{ maxWidth: 720, margin: '4rem auto', fontFamily: 'monospace', padding: '0 1rem' }}>
      <h1>Database Setup</h1>
      <p>Creates all tables and seeds data. Safe to re-run.</p>
      <button
        onClick={runSetup}
        disabled={status === 'running'}
        style={{
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          cursor: status === 'running' ? 'wait' : 'pointer',
          background: status === 'running' ? '#666' : '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
        }}
      >
        {status === 'running' ? 'Running...' : 'Run Setup'}
      </button>

      {result && (
        <pre style={{
          marginTop: '1.5rem',
          padding: '1rem',
          background: status === 'error' ? '#2a0000' : '#0a1a0a',
          color: status === 'error' ? '#f88' : '#8f8',
          borderRadius: 6,
          overflow: 'auto',
          maxHeight: '60vh',
          fontSize: '0.85rem',
        }}>
          {result}
        </pre>
      )}
    </div>
  );
}
