import React from 'react';
import ErrorState from './ErrorState';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center">
          <ErrorState 
            message="Ocurrió un error inesperado en la aplicación." 
            onRetry={() => window.location.reload()} 
          />
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
