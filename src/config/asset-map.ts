import { AssetManifest } from '../types/assets';

export const ASSET_MAP: AssetManifest = {
  version: '1.0.0',
  categories: [
    'activities',
    'animals',
    'clothes',
    'colors',
    'conversation',
    'drinks',
    'feelings',
    'food',
    'medical',
    'numbers',
    'people',
    'shapes',
    'toys',
    'transport'
  ],
  languages: [
    'en',
    'ar',
    'bn',
    'cs',
    'da',
    'de',
    'el',
    'es',
    'fi',
    'fr',
    'he',
    'hi',
    'it',
    'ja',
    'ko',
    'nl',
    'pl',
    'pt',
    'ru',
    'sv',
    'tr',
    'zh'
  ],
  assets: {
    categories: {
      type: 'json',
      path: '/data/{lang}/{category}.json',
      required: true
    },
    translations: {
      type: 'csv',
      path: '/data/{lang}/translations.csv',
      required: true
    },
    icons: {
      type: 'svg',
      path: '/images/{lang}/{category}/{name}.svg',
      required: true
    }
  }
};