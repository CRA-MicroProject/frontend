"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { IntlProvider } from "react-intl";
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
import enCatalog from "../i18n/en.json";
import ptCatalog from "../i18n/pt.json";
import mnCatalog from "../i18n/mn.json";
import { toIntlMessages } from "../i18n/messages";

type Language = "English" | "Mongolian" | "Portuguese";

interface LanguageContextValue {
  language: Language;
  setLanguage: (value: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const localeByLanguage = {
  English: "en",
  Mongolian: "mn",
  Portuguese: "pt",
} as const;

const messagesByLocale = {
  en: toIntlMessages(enCatalog as Record<string, { message?: string }>),
  pt: toIntlMessages(ptCatalog as Record<string, { message?: string }>),
  mn: toIntlMessages(mnCatalog as Record<string, { message?: string }>),
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("English");
  const locale = localeByLanguage[language];
  // English keys are used as defaults when a locale is missing a translation.
  const messages = { ...messagesByLocale.en, ...(messagesByLocale[locale] ?? {}) };
  
  const handleIntlError = (err: { code?: string }) => {
    if (err.code === "MISSING_TRANSLATION") {
      return;
    }
    // console.error(err);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <IntlProvider locale={locale} defaultLocale="en" messages={messages} onError={handleIntlError}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

export type { Language };