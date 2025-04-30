import { categories } from '../data/categoryData';
import { languages } from '../data/languageData';

export const ASSET_MANIFEST = {
  images: {
    basePath: 'https://priya-veqs.vercel.app/images',
    categories: categories.map(cat => cat.slug),
    resolutions: ['']  // Only standard resolution for now
  },
  data: {
    basePath: 'https://priya-veqs.vercel.app/data',
    languages: languages.map(lang => lang.code),
    categories: categories.map(cat => cat.slug)
  }
} as const;

export type AssetCategory = typeof ASSET_MANIFEST.images.categories[number];
export type AssetLanguage = typeof ASSET_MANIFEST.data.languages[number];

export const getAssetPath = {
  image: (lang: AssetLanguage, category: AssetCategory, name: string) => 
    `${ASSET_MANIFEST.images.basePath}/${lang}/${category}/${name}.svg`,
    
  data: (lang: AssetLanguage, category: AssetCategory) => 
    `${ASSET_MANIFEST.data.basePath}/${lang}/${category}.json`,
    
  csv: (lang: AssetLanguage, category: AssetCategory) => 
    `${ASSET_MANIFEST.data.basePath}/${lang}/${category}.csv`
};