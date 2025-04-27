import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Accent = {
  code: string;
  name: string;
  language: string;
};

type AccentContextType = {
  currentAccent: Accent;
  setAccent: (accent: Accent) => void;
};

const defaultAccent: Accent = {
  code: 'en-US',
  name: 'English',
  language: 'English'
};

const AccentContext = createContext<AccentContextType | undefined>(undefined);

export const AccentProvider = ({ children }: { children: ReactNode }) => {
  const [currentAccent, setCurrentAccent] = useState<Accent>(defaultAccent);

  useEffect(() => {
    const storedAccent = localStorage.getItem('priya_accent');
    if (storedAccent) {
      setCurrentAccent(JSON.parse(storedAccent));
    }
  }, []);

  const setAccent = (accent: Accent) => {
    setCurrentAccent(accent);
    localStorage.setItem('priya_accent', JSON.stringify(accent));
  };

  return (
    <AccentContext.Provider value={{ currentAccent, setAccent }}>
      {children}
    </AccentContext.Provider>
  );
};

export const useAccent = () => {
  const context = useContext(AccentContext);
  if (context === undefined) {
    throw new Error('useAccent must be used within an AccentProvider');
  }
  return context;
};