import { supabase } from '../lib/supabase';
import { cacheService } from './CacheService';
import type { AssetVersion } from '../types/assets';

class AssetVersionService {
  private static instance: AssetVersionService;
  private currentVersions: Map<string, string> = new Map();

  private constructor() {}

  public static getInstance(): AssetVersionService {
    if (!AssetVersionService.instance) {
      AssetVersionService.instance = new AssetVersionService();
    }
    return AssetVersionService.instance;
  }

  public async getCurrentVersion(category: string, language: string): Promise<string> {
    const key = `${category}:${language}`;
    
    // Check memory cache first
    if (this.currentVersions.has(key)) {
      return this.currentVersions.get(key)!;
    }

    // Check local storage cache
    const cached = cacheService.get<AssetVersion>(`version_${key}`);
    if (cached) {
      this.currentVersions.set(key, cached.version);
      return cached.version;
    }

    // Fetch from Supabase
    const { data, error } = await supabase
      .from('asset_versions')
      .select('version')
      .eq('category', category)
      .eq('language', language)
      .eq('active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('Failed to fetch asset version:', error);
      return 'latest';
    }

    const version = data?.version || 'latest';
    
    // Update caches
    this.currentVersions.set(key, version);
    cacheService.set(`version_${key}`, { version, timestamp: Date.now() });

    return version;
  }

  public async validateChecksum(
    category: string,
    language: string,
    version: string,
    checksum: string
  ): Promise<boolean> {
    const { data, error } = await supabase
      .from('asset_versions')
      .select('checksum')
      .eq('category', category)
      .eq('language', language)
      .eq('version', version)
      .eq('active', true)
      .single();

    if (error || !data) {
      console.error('Failed to validate checksum:', error);
      return false;
    }

    return data.checksum === checksum;
  }

  public clearCache(): void {
    this.currentVersions.clear();
    const keys = Array.from(this.currentVersions.keys());
    keys.forEach(key => cacheService.remove(`version_${key}`));
  }
}

export const assetVersionService = AssetVersionService.getInstance();