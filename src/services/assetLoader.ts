import { LocalizedAsset, AssetResponse, CategoryData, CSVData, ImageAsset } from '../types/assets';
import { assetCache } from '../utils/cache';

const BASE_URL = 'https://priya-veqs.vercel.app';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

async function parseCSV(text: string): Promise<CSVData[]> {
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/["']/g, ''));
  
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim().replace(/["']/g, ''));
    return headers.reduce((obj: CSVData, header, index) => {
      obj[header] = values[index] || '';
      return obj;
    }, {});
  });
}

export async function loadAsset<T>(params: LocalizedAsset): Promise<AssetResponse<T>> {
  try {
    const cacheKey = assetCache.getCacheKey(
      params.language, 
      params.category, 
      params.type,
      params.name
    );
    
    // Check cache first
    const cachedData = assetCache.get(cacheKey);
    if (cachedData) {
      return {
        success: true,
        data: cachedData,
        loading: false
      };
    }

    // If already loading, return loading state
    if (assetCache.isLoading(cacheKey)) {
      return {
        success: true,
        loading: true
      };
    }

    let url: string;
    if (params.type === 'svg') {
      url = `${BASE_URL}/images/${params.language}/${params.category}/${params.name}.svg`;
    } else {
      url = `${BASE_URL}/data/${params.language}/${params.category}.${params.type}`;
    }

    const response = await fetch(url, { headers: corsHeaders });
    
    if (!response.ok) {
      throw new Error(`Failed to load asset: ${response.statusText}`);
    }

    let data: T;
    if (params.type === 'svg') {
      const blob = await response.blob();
      data = URL.createObjectURL(blob) as unknown as T;
    } else if (params.type === 'csv') {
      const text = await response.text();
      data = await parseCSV(text) as unknown as T;
    } else {
      data = await response.json();
    }

    // Store in cache
    assetCache.set(cacheKey, data);

    return {
      success: true,
      data,
      loading: false
    };
  } catch (error) {
    console.error('Asset loading error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      loading: false
    };
  }
}

export async function loadCategoryData(
  language: string, 
  category: string
): Promise<AssetResponse<CategoryData>> {
  return loadAsset<CategoryData>({
    language,
    category,
    name: category,
    type: 'json'
  });
}

export async function loadCategoryImage(
  language: string, 
  category: string, 
  name: string
): Promise<AssetResponse<ImageAsset>> {
  return loadAsset<ImageAsset>({
    language,
    category,
    name,
    type: 'svg'
  });
}

export async function loadCSVData(
  language: string, 
  category: string
): Promise<AssetResponse<CSVData[]>> {
  return loadAsset<CSVData[]>({
    language,
    category,
    name: category,
    type: 'csv'
  });
}

export function getImageUrl(language: string, category: string, name: string): string {
  return `${BASE_URL}/images/${language}/${category}/${name}.svg`;
}

// Preload common assets
export async function preloadCommonAssets(language: string): Promise<void> {
  const commonCategories = ['conversation', 'feelings', 'food', 'animals'];
  
  for (const category of commonCategories) {
    const cacheKey = assetCache.getCacheKey(language, category, 'json');
    assetCache.preload(cacheKey, () => 
      loadCategoryData(language, category).then(response => response.data)
    );
  }
}

// Handle batch loading
export async function loadCategoryBatch(
  language: string,
  categories: string[]
): Promise<Record<string, CategoryData>> {
  const results: Record<string, CategoryData> = {};
  
  await Promise.all(
    categories.map(async category => {
      const response = await loadCategoryData(language, category);
      if (response.success && response.data) {
        results[category] = response.data;
      }
    })
  );
  
  return results;
}

// Retry mechanism for failed loads
export async function loadWithRetry<T>(
  params: LocalizedAsset,
  retries = 3,
  delay = 1000
): Promise<AssetResponse<T>> {
  let lastError: Error | null = null;
  
  for (let i = 0; i < retries; i++) {
    try {
      const response = await loadAsset<T>(params);
      if (response.success) {
        return response;
      }
    } catch (error) {
      lastError = error as Error;
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }
  
  return {
    success: false,
    error: lastError?.message || 'Failed after multiple retries',
    loading: false
  };
}