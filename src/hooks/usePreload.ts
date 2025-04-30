import { useState, useEffect } from 'react';
import { preloadService } from '../services/PreloadService';
import type { LoadingState } from '../types/assets';

export function usePreload(language: string) {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false,
    progress: 0,
    total: 0
  });

  useEffect(() => {
    const unsubscribe = preloadService.subscribe(setLoadingState);
    preloadService.preloadEssentialAssets(language);
    return unsubscribe;
  }, [language]);

  return loadingState;
}