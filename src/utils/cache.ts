import { AssetCache } from '../types/assets';

// Cache duration in milliseconds (30 minutes)
const CACHE_DURATION = 30 * 60 * 1000;

class AssetCacheManager {
  private static instance: AssetCacheManager;
  private cache: AssetCache = {};
  private preloadQueue: Set<string> = new Set();
  private loading: Map<string, Promise<any>> = new Map();

  private constructor() {
    // Initialize cache from localStorage if available
    try {
      const savedCache = localStorage.getItem('assetCache');
      if (savedCache) {
        const parsed = JSON.parse(savedCache);
        this.cleanExpiredEntries(parsed);
        this.cache = parsed;
      }
    } catch (error) {
      console.warn('Failed to load cache from localStorage:', error);
    }
  }

  public static getInstance(): AssetCacheManager {
    if (!AssetCacheManager.instance) {
      AssetCacheManager.instance = new AssetCacheManager();
    }
    return AssetCacheManager.instance;
  }

  public set(key: string, data: any): void {
    this.cache[key] = {
      data,
      timestamp: Date.now()
    };
    
    // Persist to localStorage
    try {
      localStorage.setItem('assetCache', JSON.stringify(this.cache));
    } catch (error) {
      console.warn('Failed to persist cache to localStorage:', error);
    }
  }

  public get(key: string): any | null {
    const cached = this.cache[key];
    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > CACHE_DURATION;
    if (isExpired) {
      delete this.cache[key];
      return null;
    }

    return cached.data;
  }

  public preload(key: string, loader: () => Promise<any>): void {
    if (this.get(key) || this.preloadQueue.has(key)) return;
    
    this.preloadQueue.add(key);
    const promise = loader()
      .then(data => {
        this.set(key, data);
        this.preloadQueue.delete(key);
        this.loading.delete(key);
        return data;
      })
      .catch(error => {
        this.preloadQueue.delete(key);
        this.loading.delete(key);
        throw error;
      });

    this.loading.set(key, promise);
  }

  public isLoading(key: string): boolean {
    return this.loading.has(key);
  }

  public clear(): void {
    this.cache = {};
    localStorage.removeItem('assetCache');
  }

  public getCacheKey(language: string, category: string, type: string, name?: string): string {
    return name 
      ? `${language}:${category}:${type}:${name}`
      : `${language}:${category}:${type}`;
  }

  private cleanExpiredEntries(cache: AssetCache): void {
    const now = Date.now();
    Object.keys(cache).forEach(key => {
      if (now - cache[key].timestamp > CACHE_DURATION) {
        delete cache[key];
      }
    });
  }
}

export const assetCache = AssetCacheManager.getInstance();