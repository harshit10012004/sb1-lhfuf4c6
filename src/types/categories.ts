export interface Category {
  id: number;
  slug: string;
  color: string;
  premium: number;
  locale: string;
  count: number;
}

export interface CategoryItem {
  id: string;
  label: string;
  icon: string;
}

export interface Phrase {
  type: string;
  phrase: string;
}

export interface Pack {
  slug: string;
  title: string;
  phrases: Phrase[];
}

export interface PackImage {
  url: string;
  category: string;
  name: string;
}