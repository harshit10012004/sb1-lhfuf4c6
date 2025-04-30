import { languages } from '../data/languageData';
import { assetService } from './AssetService';
import { preloadService } from './PreloadService';
import type { Language } from '../types/languages';

class LanguageService {
  private static instance: LanguageService;
  private currentLanguage: Language;
  private subscribers: Set<(language: Language) => void>;

  private constructor() {
    this.currentLanguage = this.getInitialLanguage();
    this.subscribers = new Set();
  }

  public static getInstance(): LanguageService {
    if (!LanguageService.instance) {
      LanguageService.instance = new LanguageService();
    }
    return LanguageService.instance;
  }

  private getInitialLanguage(): Language {
    // Try to get language from localStorage
    const storedLang = localStorage.getItem('priya_language');
    if (storedLang) {
      const parsed = JSON.parse(storedLang);
      if (this.isValidLanguage(parsed)) {
        return parsed;
      }
    }

    // Try to get language from browser
    const browserLang = navigator.language.split('-')[0];
    const matchedLang = languages.find(lang => lang.code === browserLang);
    if (matchedLang) {
      return matchedLang;
    }

    // Default to English
    return languages[0];
  }

  private isValidLanguage(lang: any): lang is Language {
    return languages.some(l => l.code === lang.code);
  }

  public getCurrentLanguage(): Language {
    return this.currentLanguage;
  }

  public async setLanguage(language: Language): Promise<void> {
    if (!this.isValidLanguage(language)) {
      throw new Error(`Invalid language: ${language.code}`);
    }

    this.currentLanguage = language;
    localStorage.setItem('priya_language', JSON.stringify(language));

    // Update asset service language
    assetService.setLanguage(language.code);

    // Preload essential assets for new language
    await preloadService.preloadEssentialAssets(language.code);

    // Notify subscribers
    this.subscribers.forEach(callback => callback(language));
  }

  public subscribe(callback: (language: Language) => void): () => void {
    this.subscribers.add(callback);
    callback(this.currentLanguage);

    return () => {
      this.subscribers.delete(callback);
    };
  }

  public getSupportedLocales(language: Language): string[] {
    return language.locale;
  }

  public isRightToLeft(language: Language): boolean {
    return language.rightToLeft;
  }

  public async loadTranslations(): Promise<void> {
    await assetService.loadTranslations();
  }

  public clearCache(): void {
    assetService.clearCache();
  }
}

export const languageService = LanguageService.getInstance();