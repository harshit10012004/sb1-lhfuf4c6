import { writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { languages } from '../src/data/languageData.js';
import { categories } from '../src/data/categoryData.js';

const PUBLIC_DIR = resolve('public');
const ASSET_MAP_PATH = resolve('src/config/generated-asset-map.json');

function getAssetStats(dir) {
  const stats = {
    categories: new Set(),
    languages: new Set(),
    assets: {}
  };

  function scanDir(currentPath, relativePath = '') {
    const entries = readdirSync(currentPath);

    for (const entry of entries) {
      const fullPath = join(currentPath, entry);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        scanDir(fullPath, join(relativePath, entry));
      } else {
        const key = join(relativePath, entry).replace(/\\/g, '/');
        stats.assets[key] = {
          size: stat.size,
          mtime: stat.mtime.toISOString()
        };

        // Extract category and language from path
        const parts = relativePath.split('/');
        if (parts[0] === 'images' || parts[0] === 'data') {
          if (parts[1]) stats.languages.add(parts[1]);
          if (parts[2]) stats.categories.add(parts[2]);
        }
      }
    }
  }

  scanDir(dir);
  return stats;
}

function generateAssetMap() {
  const stats = getAssetStats(PUBLIC_DIR);

  const assetMap = {
    version: process.env.npm_package_version || '1.0.0',
    generated: new Date().toISOString(),
    categories: Array.from(stats.categories),
    languages: Array.from(stats.languages),
    assets: stats.assets,
    supportedLanguages: languages.map(lang => ({
      code: lang.code,
      title: lang.title,
      native: lang.native,
      rtl: lang.rightToLeft
    })),
    supportedCategories: categories.map(cat => ({
      slug: cat.slug,
      title: cat.title,
      premium: cat.premium
    }))
  };

  writeFileSync(ASSET_MAP_PATH, JSON.stringify(assetMap, null, 2));
  console.log(`✓ Asset map generated at ${ASSET_MAP_PATH}`);
}

generateAssetMap();