import type { SelectedLanguage } from "../context/SelectedLanguageContext";

export type LandingLanguage = "English" | "Mongolian" | "Portuguese";

const LANDING_BY_CODE: Record<string, LandingLanguage> = {
  en: "English",
  "mn-MN": "Mongolian",
  "pt-BR": "Portuguese",
};

const SELECTED_BY_LANDING: Record<LandingLanguage, SelectedLanguage> = {
  English: { code: "en", english_name: "English", native_name: "English" },
  Mongolian: { code: "mn-MN", english_name: "Mongolian", native_name: "Монгол" },
  Portuguese: { code: "pt-BR", english_name: "Portuguese", native_name: "Português" },
};

export function landingLanguageFromCode(code: string | null | undefined): LandingLanguage {
  if (!code) return "English";
  return LANDING_BY_CODE[code] ?? "English";
}

export function selectedLanguageFromLanding(lang: LandingLanguage): SelectedLanguage {
  return SELECTED_BY_LANDING[lang];
}
