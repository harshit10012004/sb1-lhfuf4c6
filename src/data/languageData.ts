import { Language } from '../types/languages';

export const languages: Language[] = [
  {
    code: "en",
    locale: ["en-US", "en-GB", "en-AU", "en-CA", "en-CB", "en-IN", "en-NZ"],
    support: ["ios", "android"],
    title: "English",
    native: "English",
    rightToLeft: false,
    readproof: true
  },
  {
    code: "es",
    locale: ["es-MX", "es-ES", "es-CO", "es-AR"],
    support: ["ios", "android"],
    title: "Spanish",
    native: "Español",
    rightToLeft: false,
    readproof: false
  },
  {
    code: "fr",
    locale: ["fr-FR", "fr-CA"],
    support: ["ios", "android"],
    title: "French",
    native: "Français",
    rightToLeft: false,
    readproof: false
  },
  {
    code: "de",
    locale: ["de-DE", "de-AT"],
    support: ["ios", "android"],
    title: "German",
    native: "Deutsch",
    rightToLeft: false,
    readproof: false
  },
  {
    code: "it",
    locale: ["it-it", "it-CH"],
    support: ["ios", "android"],
    title: "Italian",
    native: "Italiano",
    rightToLeft: false,
    readproof: false
  },
  {
    code: "ja",
    locale: ["ja-JP"],
    support: ["ios", "android"],
    title: "Japanese",
    native: "日本語",
    rightToLeft: false,
    readproof: false
  },
  {
    code: "ko",
    locale: ["ko_KR"],
    support: ["ios", "android"],
    title: "Korean",
    native: "한국어",
    rightToLeft: false,
    readproof: false
  },
  {
    code: "zh",
    locale: ["zh-CN", "zh-HK"],
    support: ["ios", "android"],
    title: "Mandarin Chinese",
    native: "普通话",
    rightToLeft: false,
    readproof: false
  },
  {
    code: "ar",
    locale: ["ar-AR"],
    support: ["ios"],
    title: "Arabic",
    native: "العربية",
    rightToLeft: true,
    readproof: false
  },
  {
    code: "cs",
    locale: ["cs-CZ"],
    support: ["ios", "android"],
    title: "Czech",
    native: "čeština",
    rightToLeft: false,
    readproof: false
  },
  {
    code: "da",
    locale: ["da-DK"],
    support: ["ios", "android"],
    title: "Danish",
    native: "dansk",
    rightToLeft: false,
    readproof: false
  },
  {
    code: "nl",
    locale: ["nl-NL", "nl-BE"],
    support: ["ios", "android"],
    title: "Dutch",
    native: "Nederlands",
    rightToLeft: false,
    readproof: false
  },
  {
    code: "fi",
    locale: ["fi-FI"],
    support: ["ios", "android"],
    title: "Finnish",
    native: "suomi",
    rightToLeft: false,
    readproof: false
  },
  {
    code: "el",
    locale: ["el-GR"],
    support: ["ios", "android"],
    title: "Greek",
    native: "ελληνικά",
    rightToLeft: false,
    readproof: false
  },
  {
    code: "he",
    locale: ["he-IL"],
    support: ["ios"],
    title: "Hebrew",
    native: "עברית",
    rightToLeft: true,
    readproof: false
  },
  {
    code: "hi",
    locale: ["hi-IN"],
    support: ["ios", "android"],
    title: "Hindi",
    native: "हिन्दी",
    rightToLeft: false,
    readproof: false
  },
  {
    code: "hu",
    locale: ["hu-HUX"],
    support: ["ios", "android"],
    title: "Hungarian",
    native: "magyar",
    rightToLeft: false,
    readproof: false
  },
  {
    code: "id",
    locale: ["id-ID"],
    support: ["ios", "android"],
    title: "Indonesian",
    native: "Bahasa Indonesia",
    rightToLeft: false,
    readproof: false
  },
  {
    code: "nb",
    locale: ["nb-NO"],
    support: ["ios", "android"],
    title: "Norwegian",
    native: "norsk",
    rightToLeft: false,
    readproof: false
  },
  {
    code: "pl",
    locale: ["pl-PL"],
    support: ["ios", "android"],
    title: "Polish",
    native: "polski",
    rightToLeft: false,
    readproof: false
  },
  {
    code: "pt",
    locale: ["pt-PT", "pt-BR"],
    support: ["ios", "android"],
    title: "Portuguese",
    native: "Português",
    rightToLeft: false,
    readproof: false
  },
  {
    code: "ro",
    locale: ["ro-RO"],
    support: ["ios", "android"],
    title: "Romanian",
    native: "limba română",
    rightToLeft: false,
    readproof: false
  },
  {
    code: "ru",
    locale: ["ru-RU", "ru-MO"],
    support: ["ios", "android"],
    title: "Russian",
    native: "русский",
    rightToLeft: false,
    readproof: false
  },
  {
    code: "sk",
    locale: ["sk-SK"],
    support: ["ios", "android"],
    title: "Slovak",
    native: "slovenčina",
    rightToLeft: false,
    readproof: false
  },
  {
    code: "sv",
    locale: ["sv-FI", "sv-SE"],
    support: ["ios", "android"],
    title: "Swedish",
    native: "svenska",
    rightToLeft: false,
    readproof: false
  },
  {
    code: "th",
    locale: ["th-TH"],
    support: ["ios", "android"],
    title: "Thai",
    native: "ภาษาไทย",
    rightToLeft: false,
    readproof: false
  },
  {
    code: "tr",
    locale: ["tr-TR"],
    support: ["ios", "android"],
    title: "Turkish",
    native: "Türkçe",
    rightToLeft: false,
    readproof: true
  },
  {
    code: "ur",
    locale: ["ur-IN"],
    support: ["android"],
    title: "Urdu",
    native: "اردو",
    rightToLeft: true,
    readproof: false
  },
  {
    code: "bn",
    locale: ["bn-BN", "bn-IN"],
    support: ["android"],
    title: "Bengali",
    native: "বাংলা",
    rightToLeft: false,
    readproof: false
  },
  {
    code: "et",
    locale: ["et-ET"],
    support: ["android"],
    title: "Estonian",
    native: "Eestlane",
    rightToLeft: false,
    readproof: false
  },
  {
    code: "fil",
    locale: ["fil-PH"],
    support: ["android"],
    title: "Filipino",
    native: "Pilipino",
    rightToLeft: false,
    readproof: true
  },
  {
    code: "jv",
    locale: ["jv-ID"],
    support: ["android"],
    title: "Javanese",
    native: "Basa Jawa",
    rightToLeft: false,
    readproof: false
  },
  {
    code: "km",
    locale: ["km-KH"],
    support: ["android"],
    title: "Khmer",
    native: "ខ្មែរ",
    rightToLeft: false,
    readproof: false
  },
  {
    code: "ne",
    locale: ["ne-NP"],
    support: ["android"],
    title: "Nepali",
    native: "नेपाली",
    rightToLeft: false,
    readproof: false
  },
  {
    code: "si",
    locale: ["si-LK"],
    support: ["android"],
    title: "Sinhala",
    native: "සිංහල",
    rightToLeft: false,
    readproof: false
  },
  {
    code: "uk",
    locale: ["uk-UA"],
    support: ["android"],
    title: "Ukrainian",
    native: "Українська",
    rightToLeft: false,
    readproof: false
  },
  {
    code: "vi",
    locale: ["vi-VN"],
    support: ["android"],
    title: "Vietnamese",
    native: "Tiếng Việt",
    rightToLeft: false,
    readproof: false
  }
];