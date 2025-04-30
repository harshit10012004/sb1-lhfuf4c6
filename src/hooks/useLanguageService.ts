import { useState, useEffect } from 'react';
import { languageService } from '../services/LanguageService';
import type { Language } from '../types/languages';

export function useLanguageService() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    languageService.getCurrentLanguage()
  );

  useEffect(() => {
    return languageService.subscribe(setCurrentLanguage);
  }, []);

  const changeLanguage = async (language: Language) => {
    await languageService.setLanguage(language);
  };

  return {
    currentLanguage,
    changeLanguage,
    isRightToLeft: languageService.isRightToLeft(currentLanguage),
    supportedLocales: languageService.getSupportedLocales(currentLanguage)
  };
}