import { useState, useEffect } from 'react';
import { assetVersionService } from '../services/AssetVersionService';
import type { AssetVersionResponse } from '../types/assets';

export function useAssetVersion(category: string, language: string) {
  const [response, setResponse] = useState<AssetVersionResponse>({
    success: false
  });

  useEffect(() => {
    let mounted = true;

    async function fetchVersion() {
      try {
        const version = await assetVersionService.getCurrentVersion(category, language);
        
        if (mounted) {
          setResponse({
            success: true,
            version
          });
        }
      } catch (error) {
        if (mounted) {
          setResponse({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch version'
          });
        }
      }
    }

    fetchVersion();

    return () => {
      mounted = false;
    };
  }, [category, language]);

  return response;
}