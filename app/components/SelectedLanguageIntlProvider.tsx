"use client";

import { useMemo, type ReactNode } from "react";
import { IntlProvider } from "react-intl";
import { useSelectedLanguage } from "../context/SelectedLanguageContext";
import {
  getMergedIntlMessages,
  normalizeIntlCatalogLocale,
} from "../i18n/reactIntlCatalogs";

const handleIntlError = (err: { code?: string }) => {
  if (err.code === "MISSING_TRANSLATION") return;
};

export function SelectedLanguageIntlProvider({ children }: { children: ReactNode }) {
  const { selectedLanguage } = useSelectedLanguage();
  const locale = normalizeIntlCatalogLocale(selectedLanguage?.code);
  const messages = useMemo(() => getMergedIntlMessages(locale), [locale]);

  return (
    <IntlProvider
      locale={locale}
      defaultLocale="en"
      messages={messages}
      onError={handleIntlError}
    >
      {children}
    </IntlProvider>
  );
}
