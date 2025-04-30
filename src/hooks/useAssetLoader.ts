import { useState, useEffect } from 'react';
import { assetLoader } from '../services/AssetLoader';
import type { AssetResponse, CategoryData, CSVData, ImageAsset } from '../types/assets';

type AssetType = 'image' | 'language' | 'csv';
type AssetData<T extends AssetType> = 
  T extends 'image' ? ImageAsset :
  T extends 'language' ? CategoryData :
  T extends 'csv' ? CSVData[] :
  never;

interface UseAssetLoaderOptions {
  lang?: string;
  category: string;
  name?: string;
  hd?: boolean;
}

export function useAssetLoader<T extends AssetType>(
  type: T,
  options: UseAssetLoaderOptions
) {
  const [response, setResponse] = useState<AssetResponse<AssetData<T>>>({
    success: false,
    loading: true
  });

  useEffect(() => {
    let mounted = true;

    async function loadAsset() {
      try {
        let result: AssetResponse<any>;

        switch (type) {
          case 'image':
            if (!options.name) throw new Error('Name required for image assets');
            result = await assetLoader.loadImage(options.category, options.name, options.hd);
            break;
          case 'language':
            result = await assetLoader.loadLanguageData(options.lang || 'en', options.category);
            break;
          case 'csv':
            result = await assetLoader.loadCSV(options.lang || 'en', options.category);
            break;
          default:
            throw new Error(`Unsupported asset type: ${type}`);
        }

        if (mounted) {
          setResponse(result);
        }
      } catch (error) {
        if (mounted) {
          setResponse({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to load asset',
            loading: false
          });
        }
      }
    }

    loadAsset();

    return () => {
      mounted = false;
    };
  }, [type, options.lang, options.category, options.name, options.hd]);

  return response;
}