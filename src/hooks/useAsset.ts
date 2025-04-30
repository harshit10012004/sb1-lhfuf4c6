import { useState, useEffect } from 'react';
import { assetService } from '../services/asset-service';
import type { AssetCategory } from '../config/asset-manifest';

interface AssetState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useAsset<T>(category: AssetCategory, type: 'data' | 'image' | 'csv', name?: string) {
  const [state, setState] = useState<AssetState<T>>({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    let mounted = true;

    async function loadAsset() {
      try {
        let data;
        switch (type) {
          case 'data':
            data = await assetService.loadData(category);
            break;
          case 'image':
            if (!name) throw new Error('Name required for image assets');
            data = await assetService.loadImage(category, name);
            break;
          case 'csv':
            data = await assetService.loadCSV(category);
            break;
        }

        if (mounted) {
          setState({ data, loading: false, error: null });
        }
      } catch (error) {
        if (mounted) {
          setState({ data: null, loading: false, error: error as Error });
        }
      }
    }

    loadAsset();

    return () => {
      mounted = false;
    };
  }, [category, type, name]);

  return state;
}