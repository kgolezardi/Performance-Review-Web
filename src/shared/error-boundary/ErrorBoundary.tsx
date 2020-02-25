import React, { ErrorInfo, ReactNode } from 'react';

import { ErrorContext } from './ErrorContext';

interface Props {
  fallback: ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  private retry = () => {
    this.setState({ error: null });
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return (
        <ErrorContext.Provider
          value={{
            error: this.state.error,
            reset: this.retry,
          }}
        >
          {this.props.fallback}
        </ErrorContext.Provider>
      );
    }

    return this.props.children;
  }
}
