import { ASSET_MANIFEST, getAssetPath } from '../config/asset-manifest';
import { assetCache } from '../utils/cache';
import type { AssetResponse, CategoryData, CSVData, ImageAsset } from '../types/assets';

const BASE_URL = 'https://priya-veqs.vercel.app';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

class AssetLoader {
  private static instance: AssetLoader | null = null;
  private loadingPromises: Map<string, Promise<any>> = new Map();

  private constructor() {}

  static getInstance(): AssetLoader {
    if (!AssetLoader.instance) {
      AssetLoader.instance = new AssetLoader();
    }
    return AssetLoader.instance;
  }

  async loadImage(category: string, name: string, hd: boolean = false): Promise<AssetResponse<ImageAsset>> {
    const cacheKey = `image_${category}_${name}_${hd ? 'hd' : 'sd'}`;
    
    if (this.loadingPromises.has(cacheKey)) {
      return { success: true, loading: true };
    }

    const cached = assetCache.get(cacheKey);
    if (cached) {
      return { success: true, data: cached, loading: false };
    }

    try {
      const loadPromise = fetch(`${BASE_URL}/images/${category}/${name}${hd ? '@2x' : ''}.svg`, {
        headers: corsHeaders
      });

      this.loadingPromises.set(cacheKey, loadPromise);

      const response = await loadPromise;
      if (!response.ok) throw new Error(`Failed to load image: ${response.statusText}`);

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const imageAsset: ImageAsset = {
        url,
        alt: name,
        width: hd ? 512 : 256,
        height: hd ? 512 : 256
      };

      assetCache.set(cacheKey, imageAsset);
      this.loadingPromises.delete(cacheKey);

      return { success: true, data: imageAsset, loading: false };
    } catch (error) {
      this.loadingPromises.delete(cacheKey);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to load image',
        loading: false
      };
    }
  }

  async loadLanguageData(lang: string, category: string): Promise<AssetResponse<CategoryData>> {
    const cacheKey = `data_${lang}_${category}`;
    
    if (this.loadingPromises.has(cacheKey)) {
      return { success: true, loading: true };
    }

    const cached = assetCache.get(cacheKey);
    if (cached) {
      return { success: true, data: cached, loading: false };
    }

    try {
      const loadPromise = fetch(`${BASE_URL}/data/${lang}/${category}.json`, {
        headers: corsHeaders
      });

      this.loadingPromises.set(cacheKey, loadPromise);

      const response = await loadPromise;
      if (!response.ok) throw new Error(`Failed to load language data: ${response.statusText}`);

      const data = await response.json();
      assetCache.set(cacheKey, data);
      this.loadingPromises.delete(cacheKey);

      return { success: true, data, loading: false };
    } catch (error) {
      this.loadingPromises.delete(cacheKey);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to load language data',
        loading: false
      };
    }
  }

  async loadCSV(lang: string, category: string): Promise<AssetResponse<CSVData[]>> {
    const cacheKey = `csv_${lang}_${category}`;
    
    if (this.loadingPromises.has(cacheKey)) {
      return { success: true, loading: true };
    }

    const cached = assetCache.get(cacheKey);
    if (cached) {
      return { success: true, data: cached, loading: false };
    }

    try {
      const loadPromise = fetch(`${BASE_URL}/data/${lang}/${category}.csv`, {
        headers: corsHeaders
      });

      this.loadingPromises.set(cacheKey, loadPromise);

      const response = await loadPromise;
      if (!response.ok) throw new Error(`Failed to load CSV: ${response.statusText}`);

      const text = await response.text();
      const rows = text.split('\n').map(row => 
        row.split(',').map(cell => cell.trim().replace(/^["']|["']$/g, ''))
      );

      const headers = rows[0];
      const data = rows.slice(1).map(row =>
        headers.reduce((obj: CSVData, header, index) => {
          obj[header] = row[index] || '';
          return obj;
        }, {})
      );

      assetCache.set(cacheKey, data);
      this.loadingPromises.delete(cacheKey);

      return { success: true, data, loading: false };
    } catch (error) {
      this.loadingPromises.delete(cacheKey);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to load CSV',
        loading: false
      };
    }
  }

  clearCache(): void {
    assetCache.clear();
    this.loadingPromises.clear();
  }
}

export const assetLoader = AssetLoader.getInstance();