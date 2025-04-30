import { ASSET_MAP } from '../config/asset-map';
import { assetService } from './AssetService';
import { assetCache } from '../utils/cache';
import type { LoadingState } from '../types/assets';

class PreloadService {
  private static instance: PreloadService;
  private loadingState: LoadingState = {
    isLoading: false,
    progress: 0,
    total: 0
  };
  private subscribers: Set<(state: LoadingState) => void> = new Set();

  private constructor() {}

  public static getInstance(): PreloadService {
    if (!PreloadService.instance) {
      PreloadService.instance = new PreloadService();
    }
    return PreloadService.instance;
  }

  public subscribe(callback: (state: LoadingState) => void): () => void {
    this.subscribers.add(callback);
    callback(this.loadingState);
    
    return () => {
      this.subscribers.delete(callback);
    };
  }

  private updateState(newState: Partial<LoadingState>) {
    this.loadingState = { ...this.loadingState, ...newState };
    this.subscribers.forEach(callback => callback(this.loadingState));
  }

  public async preloadEssentialAssets(language: string): Promise<void> {
    const essentialCategories = ['conversation', 'feelings', 'food', 'medical'];
    
    this.updateState({
      isLoading: true,
      progress: 0,
      total: essentialCategories.length
    });

    let loaded = 0;

    for (const category of essentialCategories) {
      try {
        const cacheKey = assetCache.getCacheKey(language, category, 'json');
        
        if (!assetCache.get(cacheKey)) {
          await assetService.loadCategoryData(category);
        }
        
        loaded++;
        this.updateState({ progress: loaded });
      } catch (error) {
        console.error(`Failed to preload ${category}:`, error);
      }
    }

    this.updateState({ isLoading: false });
  }

  public async preloadCategory(language: string, category: string): Promise<void> {
    try {
      const cacheKey = assetCache.getCacheKey(language, category, 'json');
      
      if (!assetCache.get(cacheKey)) {
        await assetService.loadCategoryData(category);
      }
    } catch (error) {
      console.error(`Failed to preload category ${category}:`, error);
    }
  }

  public async preloadAllCategories(language: string): Promise<void> {
    const categories = ASSET_MAP.categories;
    
    this.updateState({
      isLoading: true,
      progress: 0,
      total: categories.length
    });

    let loaded = 0;

    for (const category of categories) {
      try {
        await this.preloadCategory(language, category);
        loaded++;
        this.updateState({ progress: loaded });
      } catch (error) {
        console.error(`Failed to preload category ${category}:`, error);
      }
    }

    this.updateState({ isLoading: false });
  }
}

export const preloadService = PreloadService.getInstance();