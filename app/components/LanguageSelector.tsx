"use client";

import { useEffect, useState } from "react";
import type { LanguageCode } from "@/lib/types";

interface LanguageOption {
  locale_code: string;
  language_name_english: string;
  language_name_native: string;
}

const ENGLISH_OPTION: LanguageOption = {
  locale_code: "en",
  language_name_english: "English",
  language_name_native: "English",
};

interface LanguageSelectorProps {
  value: LanguageCode;
  onChange: (lang: LanguageCode) => void;
}

export function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
  const [languages, setLanguages] = useState<LanguageOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch("/api/languages")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load languages");
        return res.json();
      })
      .then((data: LanguageOption[]) => {
        if (!cancelled) {
          const withEnglishFirst = [
            ENGLISH_OPTION,
            ...data.filter((l) => l.locale_code !== "en"),
          ];
          setLanguages(withEnglishFirst);
          if (withEnglishFirst.length > 0 && !withEnglishFirst.some((l) => l.locale_code === value)) {
            onChange(withEnglishFirst[0].locale_code);
          }
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Could not load languages");
          setLanguages([]);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fetch once on mount
  }, []);

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="lang-select" className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
        Language
      </label>
      <select
        id="lang-select"
        value={languages.some((l) => l.locale_code === value) ? value : languages[0]?.locale_code ?? value}
        onChange={(e) => onChange(e.target.value as LanguageCode)}
        disabled={loading || languages.length === 0}
        className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 disabled:opacity-60 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
      >
        {loading && languages.length === 0 ? (
          <option value={value}>Loading…</option>
        ) : (
          languages.map(({ locale_code, language_name_english, language_name_native }) => (
            <option key={locale_code} value={locale_code}>
              {language_name_english || language_name_native}
            </option>
          ))
        )}
      </select>
      {error && (
        <span className="text-sm text-amber-600 dark:text-amber-400" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
