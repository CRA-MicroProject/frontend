/** Language code from API (e.g. en, fr, pt-br). Dynamic per backend. */
export type LanguageCode = string;

/** Language option from getAvailableLanguages API */
export interface LanguageOption {
  code: string;
  name: string;
  translatedName: string;
}

/** Translations for a single field (en, mn, pt) */
export type TranslatedField = Record<LanguageCode, string>;

/** Single source of truth: one object per term with all fields translated */
export interface TaxTermRecord {
  id: string;
  term: TranslatedField;
  alsoKnownAs?: TranslatedField;
  definition: TranslatedField;
  plainLanguage: TranslatedField;
  whyItMatters: TranslatedField;
  example: TranslatedField;
  actionTip: TranslatedField;
}

/** API list item: id + label in the requested language */
export interface TaxTerm {
  id: string;
  label: string;
}

/** API definition response: all fields in the requested language */
export interface TermDefinition {
  id: string;
  term: string;
  alsoKnownAs?: string;
  definition: string;
  plainLanguage: string;
  whyItMatters: string;
  example: string;
  actionTip: string;
}
