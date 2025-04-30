import { useState, useEffect } from 'react';
import { errorHandler } from '../services/ErrorHandler';
import type { AssetError } from '../types/assets';

export function useErrorHandler() {
  const [error, setError] = useState<AssetError | null>(null);

  useEffect(() => {
    return errorHandler.addErrorListener(setError);
  }, []);

  return {
    error,
    clearError: () => setError(null)
  };
}