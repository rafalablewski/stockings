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
        <div className="sm-error-boundary">
          <div style={{ fontSize: '48px' }}>⚠️</div>
          <h2>Calculation Error</h2>
          <p>
            An error occurred in the financial model. This may be due to invalid input parameters.
          </p>
          <p className="sm-error-detail">
            {this.state.error?.message || 'Unknown error'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="sm-error-reload"
          >
            Reload Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
