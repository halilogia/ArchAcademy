export interface LocalizedString {
  tr: string;
  en: string;
}

export interface AcronymItem {
  id: string;
  name: string;
  fullName: LocalizedString;
  tagline: LocalizedString;
  description: LocalizedString;
  category: 'core' | 'solid' | 'grasp' | 'function' | 'data' | 'testing' | 'antipattern';
  badgeColor: string;
  details?: { tr: string[]; en: string[] };
  example?: string;
  relatedPath?: string;
}

export interface AcronymCategory {
  id: string;
  title: LocalizedString;
  icon: string;
  color: string;
  desc: LocalizedString;
}
export interface GlossaryTerm {
  id: number;
  term: string;
  term_en?: string;
  definition: string;
  definition_en?: string;
  category: string;
  category_en?: string;
  guruTip: string;
  guruTip_en?: string;
}