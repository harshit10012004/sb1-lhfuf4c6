import { useState, useEffect } from 'react';
import { cacheService } from '../services/CacheService';

export function useCache<T>(key: string, loader: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        // Try to get from cache first
        const cached = cacheService.get<T>(key);
        if (cached && mounted) {
          setData(cached);
          setLoading(false);
          return;
        }

        // If not in cache, load fresh data
        const freshData = await loader();
        if (mounted) {
          setData(freshData);
          cacheService.set(key, freshData);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to load data'));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      mounted = false;
    };
  }, [key]);

  return { data, loading, error };
}