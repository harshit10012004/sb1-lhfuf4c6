import { useState, useEffect } from 'react';
import { assetService } from '../services/AssetService';
import { ASSET_MAP } from '../config/asset-map';
import type { LoadingState } from '../types/assets';

export function useAssetPreload(language: string) {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: true,
    progress: 0,
    total: ASSET_MAP.categories.length
  });

  useEffect(() => {
    let mounted = true;
    let loaded = 0;

    const loadAssets = async () => {
      assetService.setLanguage(language);

      for (const category of ASSET_MAP.categories) {
        try {
          await assetService.loadCategoryData(category);
          if (mounted) {
            loaded++;
            setLoadingState(prev => ({
              ...prev,
              progress: loaded
            }));
          }
        } catch (error) {
          console.error(`Failed to load category ${category}:`, error);
        }
      }

      if (mounted) {
        setLoadingState(prev => ({
          ...prev,
          isLoading: false
        }));
      }
    };

    loadAssets();

    return () => {
      mounted = false;
    };
  }, [language]);

  return loadingState;
}