import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = {
  code: string;
  name: string;
  nativeName: string;
};

type LanguageContextType = {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
};

const defaultLanguage: Language = {
  code: 'en',
  name: 'English',
  nativeName: 'English'
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(defaultLanguage);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('priya_language');
    if (storedLanguage) {
      setCurrentLanguage(JSON.parse(storedLanguage));
    }
  }, []);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('priya_language', JSON.stringify(language));
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};