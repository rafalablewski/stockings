/**
 * Error Boundary for financial model components.
 *
 * Wraps each stock model (ASTS, BMNR, CRCL) to catch rendering errors
 * caused by invalid input parameters or calculation failures.
 */
import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import type { ErrorBoundaryProps, ErrorBoundaryState } from './stockModelTypes';

export class FinancialModelErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Financial Model Error:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '48px',
          background: 'linear-gradient(135deg, rgba(255,123,114,0.1) 0%, rgba(255,123,114,0.05) 100%)',
          border: '1px solid rgba(255,123,114,0.3)',
          borderRadius: '16px',
          textAlign: 'center',
          margin: '24px'
        }}>
          <div style={{ fontSize: '48px' }}>⚠️</div>
          <h2 style={{ color: '#FF7B72', fontFamily: 'Outfit, sans-serif' }}>
            Calculation Error
          </h2>
          <p style={{ color: '#8B949E', fontFamily: 'Outfit, sans-serif' }}>
            An error occurred in the financial model. This may be due to invalid input parameters.
          </p>
          <p style={{ color: '#8B949E', fontSize: '14px', fontFamily: 'Space Mono, monospace' }}>
            {this.state.error?.message || 'Unknown error'}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              background: '#22D3EE',
              color: '#05070A',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            Reload Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
