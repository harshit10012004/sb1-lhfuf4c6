import { ASSET_MAP } from '../config/asset-map';

const CACHE_VERSION = ASSET_MAP.version;
const CACHE_PREFIX = 'priya_asset';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface CacheEntry<T> {
  version: string;
  timestamp: number;
  data: T;
}

export class CacheService {
  private static instance: CacheService;

  private constructor() {
    this.cleanupExpiredEntries();
  }

  public static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }
    return CacheService.instance;
  }

  public set<T>(key: string, data: T): void {
    const entry: CacheEntry<T> = {
      version: CACHE_VERSION,
      timestamp: Date.now(),
      data
    };

    try {
      localStorage.setItem(
        this.getCacheKey(key),
        JSON.stringify(entry)
      );
    } catch (error) {
      console.warn('Failed to cache data:', error);
    }
  }

  public get<T>(key: string): T | null {
    try {
      const cached = localStorage.getItem(this.getCacheKey(key));
      if (!cached) return null;

      const entry: CacheEntry<T> = JSON.parse(cached);

      if (
        entry.version !== CACHE_VERSION ||
        Date.now() - entry.timestamp > CACHE_DURATION
      ) {
        this.remove(key);
        return null;
      }

      return entry.data;
    } catch (error) {
      console.warn('Failed to retrieve cached data:', error);
      return null;
    }
  }

  public remove(key: string): void {
    localStorage.removeItem(this.getCacheKey(key));
  }

  public clear(): void {
    const keys = this.getCacheKeys();
    keys.forEach(key => localStorage.removeItem(key));
  }

  private getCacheKey(key: string): string {
    return `${CACHE_PREFIX}_${key}`;
  }

  private getCacheKeys(): string[] {
    return Object.keys(localStorage)
      .filter(key => key.startsWith(CACHE_PREFIX));
  }

  private cleanupExpiredEntries(): void {
    const now = Date.now();
    const keys = this.getCacheKeys();

    keys.forEach(key => {
      try {
        const cached = localStorage.getItem(key);
        if (!cached) return;

        const entry = JSON.parse(cached);
        if (
          entry.version !== CACHE_VERSION ||
          now - entry.timestamp > CACHE_DURATION
        ) {
          localStorage.removeItem(key);
        }
      } catch (error) {
        console.warn('Failed to cleanup cache entry:', error);
        localStorage.removeItem(key);
      }
    });
  }
}

export const cacheService = CacheService.getInstance();