export interface VoiceOption {
  id: string;
  name: string;
  locale: string;
  quality: string;
  identifier: string;
}

export const voiceOptions: VoiceOption[] = [
  {
    id: 'flo',
    name: 'Flo',
    locale: 'en-US',
    quality: 'Optimal',
    identifier: 'com.apple.eloquence.en-US.Flo'
  },
  {
    id: 'bahh',
    name: 'Bahh',
    locale: 'en-US',
    quality: 'Optimal',
    identifier: 'com.apple.speech.synthesis.voice.Bahh'
  },
  {
    id: 'albert',
    name: 'Albert',
    locale: 'en-US',
    quality: 'Optimal',
    identifier: 'com.apple.speech.synthesis.voice.Albert'
  },
  {
    id: 'fred',
    name: 'Fred',
    locale: 'en-US',
    quality: 'Optimal',
    identifier: 'com.apple.speech.synthesis.voice.Fred'
  },
  {
    id: 'hysterical',
    name: 'Hysterical',
    locale: 'en-US',
    quality: 'Optimal',
    identifier: 'com.apple.speech.synthesis.voice.Hysterical'
  },
  {
    id: 'organ',
    name: 'Organ',
    locale: 'en-US',
    quality: 'Optimal',
    identifier: 'com.apple.speech.synthesis.voice.Organ'
  },
  {
    id: 'cellos',
    name: 'Cellos',
    locale: 'en-US',
    quality: 'Optimal',
    identifier: 'com.apple.speech.synthesis.voice.Cellos'
  },
  {
    id: 'zarvox',
    name: 'Zarvox',
    locale: 'en-US',
    quality: 'Optimal',
    identifier: 'com.apple.speech.synthesis.voice.Zarvox'
  }
];