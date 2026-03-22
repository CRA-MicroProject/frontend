"use client";

import { createElement } from "react";
import { BR, CA, MN } from "country-flag-icons/react/3x2";
import { useIntl } from "react-intl";
import type { Language } from "../hooks/languageContext";

export const LANDING_LANGUAGES: Language[] = ["English", "Mongolian", "Portuguese"];

type FlagComponent = typeof CA;

export const LANGUAGE_FLAGS: Record<Language, FlagComponent> = {
  English: CA,
  Mongolian: MN,
  Portuguese: BR,
};

export function renderLanguageFlag(language: Language, className?: string) {
  const Flag = LANGUAGE_FLAGS[language];
  return createElement(Flag, { className });
}

export function useLandingLanguageLabels(): Record<Language, string> {
  const intl = useIntl();

  return {
    English: intl.formatMessage({ id: "app.language.english" }),
    Mongolian: intl.formatMessage({ id: "app.language.mongolian" }),
    Portuguese: intl.formatMessage({ id: "app.language.portuguese" }),
  };
}
