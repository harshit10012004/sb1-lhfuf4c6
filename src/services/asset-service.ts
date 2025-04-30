import { ASSET_MANIFEST, AssetLanguage, AssetCategory, getAssetPath } from '../config/asset-manifest';
import { assetCache } from '../utils/cache';

const CACHE_PREFIX = 'priya_asset';

class AssetService {
  private static instance: AssetService | null = null;
  private currentLanguage: AssetLanguage = 'en';

  private constructor() {}

  static getInstance() {
    if (!AssetService.instance) {
      AssetService.instance = new AssetService();
    }
    return AssetService.instance;
  }

  async loadImage(category: AssetCategory, name: string) {
    const cacheKey = `${CACHE_PREFIX}_img_${this.currentLanguage}_${category}_${name}`;
    const cached = assetCache.get(cacheKey);
    
    if (cached) return cached;

    try {
      const response = await fetch(getAssetPath.image(this.currentLanguage, category, name));
      if (!response.ok) throw new Error(`Failed to load image: ${response.statusText}`);
      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      assetCache.set(cacheKey, url);
      return url;
    } catch (error) {
      console.error('Image loading error:', error);
      throw error;
    }
  }

  async loadData(category: AssetCategory) {
    const cacheKey = `${CACHE_PREFIX}_data_${this.currentLanguage}_${category}`;
    const cached = assetCache.get(cacheKey);
    
    if (cached) return cached;

    try {
      const response = await fetch(getAssetPath.data(this.currentLanguage, category));
      if (!response.ok) throw new Error(`Failed to load data: ${response.statusText}`);
      
      const data = await response.json();
      assetCache.set(cacheKey, data);
      return data;
    } catch (error) {
      console.error('Data loading error:', error);
      throw error;
    }
  }

  async loadCSV(category: AssetCategory) {
    const cacheKey = `${CACHE_PREFIX}_csv_${this.currentLanguage}_${category}`;
    const cached = assetCache.get(cacheKey);
    
    if (cached) return cached;

    try {
      const response = await fetch(getAssetPath.csv(this.currentLanguage, category));
      if (!response.ok) throw new Error(`Failed to load CSV: ${response.statusText}`);
      
      const text = await response.text();
      const rows = text.split('\n').map(row => row.split(','));
      
      assetCache.set(cacheKey, rows);
      return rows;
    } catch (error) {
      console.error('CSV loading error:', error);
      throw error;
    }
  }

  setLanguage(lang: AssetLanguage) {
    if (ASSET_MANIFEST.data.languages.includes(lang)) {
      this.currentLanguage = lang;
    } else {
      console.warn(`Unsupported language: ${lang}, falling back to English`);
      this.currentLanguage = 'en';
    }
  }

  getCurrentLanguage() {
    return this.currentLanguage;
  }

  clearCache() {
    assetCache.clear();
  }
}

export const assetService = AssetService.getInstance();