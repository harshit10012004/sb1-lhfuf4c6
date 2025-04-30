import { ASSET_MAP } from '../config/asset-map';
import { assetCache } from '../utils/cache';
import { loadAsset, loadWithRetry, preloadCommonAssets } from './assetLoader';
import type { AssetResponse, CategoryData, CSVData, ImageAsset } from '../types/assets';

class AssetService {
  private static instance: AssetService;
  private currentLanguage: string = 'en';
  private loadingPromises: Map<string, Promise<any>> = new Map();

  private constructor() {
    this.preloadEssentialAssets();
  }

  public static getInstance(): AssetService {
    if (!AssetService.instance) {
      AssetService.instance = new AssetService();
    }
    return AssetService.instance;
  }

  public setLanguage(lang: string): void {
    if (ASSET_MAP.languages.includes(lang)) {
      this.currentLanguage = lang;
      this.preloadEssentialAssets();
    }
  }

  public async loadCategoryData(category: string): Promise<AssetResponse<CategoryData>> {
    const cacheKey = `${this.currentLanguage}:${category}:json`;
    
    if (this.loadingPromises.has(cacheKey)) {
      return {
        success: true,
        loading: true
      };
    }

    const loadPromise = loadWithRetry<CategoryData>({
      language: this.currentLanguage,
      category,
      name: category,
      type: 'json'
    });

    this.loadingPromises.set(cacheKey, loadPromise);

    try {
      const result = await loadPromise;
      this.loadingPromises.delete(cacheKey);
      return result;
    } catch (error) {
      this.loadingPromises.delete(cacheKey);
      throw error;
    }
  }

  public async loadImage(category: string, name: string): Promise<AssetResponse<ImageAsset>> {
    return loadWithRetry<ImageAsset>({
      language: this.currentLanguage,
      category,
      name,
      type: 'svg'
    });
  }

  public async loadTranslations(): Promise<AssetResponse<CSVData[]>> {
    return loadWithRetry<CSVData[]>({
      language: this.currentLanguage,
      category: 'translations',
      name: 'translations',
      type: 'csv'
    });
  }

  private async preloadEssentialAssets(): Promise<void> {
    await preloadCommonAssets(this.currentLanguage);
  }

  public clearCache(): void {
    assetCache.clear();
  }
}

export const assetService = AssetService.getInstance();