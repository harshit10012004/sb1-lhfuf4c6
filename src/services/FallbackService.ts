import { ASSET_MANIFEST } from '../config/asset-manifest';
import type { CategoryData, ImageAsset, CSVData } from '../types/assets';

class FallbackService {
  private static instance: FallbackService;

  private constructor() {}

  public static getInstance(): FallbackService {
    if (!FallbackService.instance) {
      FallbackService.instance = new FallbackService();
    }
    return FallbackService.instance;
  }

  public getFallbackImage(category: string, name: string): ImageAsset {
    return {
      url: `${ASSET_MANIFEST.images.basePath}/fallback.svg`,
      alt: `Fallback for ${category}/${name}`,
      width: 256,
      height: 256
    };
  }

  public getFallbackCategory(category: string): CategoryData {
    return {
      id: category,
      name: category,
      items: [],
      locale: 'en',
      count: 0
    };
  }

  public getFallbackCSV(): CSVData[] {
    return [];
  }
}

export const fallbackService = FallbackService.getInstance();