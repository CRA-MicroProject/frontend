import "@formatjs/intl-pluralrules/polyfill-force.js";
import "@formatjs/intl-pluralrules/locale-data/en";
import "@formatjs/intl-pluralrules/locale-data/pt";
import "@formatjs/intl-pluralrules/locale-data/mn";
import "@formatjs/intl-numberformat/polyfill-force.js";
import "@formatjs/intl-numberformat/locale-data/en";
import "@formatjs/intl-numberformat/locale-data/pt";
import "@formatjs/intl-numberformat/locale-data/mn";
import "@formatjs/intl-datetimeformat/polyfill-force.js";
import "@formatjs/intl-datetimeformat/locale-data/en";
import "@formatjs/intl-datetimeformat/locale-data/pt";
import "@formatjs/intl-datetimeformat/locale-data/mn";
import enCatalog from "./en.json";
import ptCatalog from "./pt.json";
import mnCatalog from "./mn.json";
import { toIntlMessages } from "./messages";

export const SUPPORTED_INTL_LOCALES = ["en", "mn-MN", "pt-BR"] as const;
export type IntlCatalogLocale = (typeof SUPPORTED_INTL_LOCALES)[number];

const messagesByLocale: Record<IntlCatalogLocale, Record<string, string>> = {
  en: toIntlMessages(enCatalog as Record<string, { message?: string }>),
  "pt-BR": toIntlMessages(ptCatalog as Record<string, { message?: string }>),
  "mn-MN": toIntlMessages(mnCatalog as Record<string, { message?: string }>),
};

export function normalizeIntlCatalogLocale(code: string | null | undefined): IntlCatalogLocale {
  if (code && (SUPPORTED_INTL_LOCALES as readonly string[]).includes(code)) {
    return code as IntlCatalogLocale;
  }
  return "en";
}

export function getMergedIntlMessages(locale: IntlCatalogLocale): Record<string, string> {
  return { ...messagesByLocale.en, ...(messagesByLocale[locale] ?? {}) };
}
