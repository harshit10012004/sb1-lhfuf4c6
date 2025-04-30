import { Component, ReactNode } from 'react';
import { errorHandler } from '../services/ErrorHandler';
import type { AssetError } from '../types/assets';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  error: AssetError | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    error: null
  };

  componentDidCatch(error: Error) {
    const assetError = errorHandler.handleError(error);
    this.setState({ error: assetError });
  }

  render() {
    if (this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-4 bg-red-50 rounded-lg">
          <h3 className="text-lg font-semibold text-red-800">
            Something went wrong
          </h3>
          <p className="text-sm text-red-600 mt-1">
            {this.state.error.message}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}