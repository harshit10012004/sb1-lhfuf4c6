import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { VoiceOption, voiceOptions } from '../data/voiceData';

type VoiceContextType = {
  currentVoice: VoiceOption;
  setVoice: (voice: VoiceOption) => void;
};

const defaultVoice = voiceOptions[0];

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export const VoiceProvider = ({ children }: { children: ReactNode }) => {
  const [currentVoice, setCurrentVoice] = useState<VoiceOption>(defaultVoice);

  useEffect(() => {
    const storedVoice = localStorage.getItem('priya_voice');
    if (storedVoice) {
      setCurrentVoice(JSON.parse(storedVoice));
    }
  }, []);

  const setVoice = (voice: VoiceOption) => {
    setCurrentVoice(voice);
    localStorage.setItem('priya_voice', JSON.stringify(voice));
  };

  return (
    <VoiceContext.Provider value={{ currentVoice, setVoice }}>
      {children}
    </VoiceContext.Provider>
  );
};

export const useVoice = () => {
  const context = useContext(VoiceContext);
  if (context === undefined) {
    throw new Error('useVoice must be used within a VoiceProvider');
  }
  return context;
};