"use client";

import type { LanguageCode } from "@/lib/types";
import type { SelectedTaxTerm } from "../context/SelectedTaxTermContext";
import { LanguageNotFound } from "./LanguageNotFound";

function CheckIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

const SECTION_LABELS: Record<string, Record<string, string>> = {
  en: {
    example: "EXAMPLE",
    actionTip: "ACTION TIP",
  },
  mn: {
    example: "ЖИШЭЭ",
    actionTip: "ҮЙЛДЭЛ",
  },
  pt: {
    example: "EXEMPLO",
    actionTip: "DICA DE AÇÃO",
  },
  fr: {
    example: "EXEMPLE",
    actionTip: "CONSEIL D'ACTION",
  },
  "pt-br": {
    example: "EXEMPLO",
    actionTip: "DICA DE AÇÃO",
  },
};

function getSectionLabels(lang: string): Record<string, string> {
  return SECTION_LABELS[lang] ?? SECTION_LABELS.en;
}

interface TermProps {
  language: LanguageCode;
  definitionLoading: boolean;
  translationNotFoundForLanguage: string | null;
  selectedTaxTerm: SelectedTaxTerm | null;
}

export function Term({
  language,
  definitionLoading,
  translationNotFoundForLanguage,
  selectedTaxTerm,
}: TermProps) {
  return (
    <section className="flex h-fit min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700 md:min-h-[420px]">
      {definitionLoading && (
        <div className="flex h-full items-center justify-center p-8 text-zinc-500 dark:text-zinc-400">
          Loading definition…
        </div>
      )}
      {selectedTaxTerm && !definitionLoading && (
        <article className="flex flex-1 flex-col overflow-y-auto">
          <div className="bg-zinc-800 px-5 py-5 dark:bg-zinc-900">
            <h2 className="text-2xl font-bold text-white">
              {selectedTaxTerm.term}
            </h2>
          </div>

          <div className="flex flex-1 flex-col gap-0 bg-white dark:bg-zinc-950">
            {selectedTaxTerm.description && (
              <div className="border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
                <p className="italic leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {selectedTaxTerm.description}
                </p>
              </div>
            )}
            {selectedTaxTerm.example && (
              <div className="border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  {getSectionLabels(language).example}
                </h3>
                <p className="italic leading-relaxed text-zinc-600 dark:text-zinc-400">
                  &ldquo;{selectedTaxTerm.example}&rdquo;
                </p>
              </div>
            )}

            {selectedTaxTerm.action_tip && (
              <div className="m-4 mt-4 rounded-lg bg-teal-700 px-4 py-4 text-white dark:bg-teal-800">
                <div className="mb-2 flex items-center gap-2">
                  <span aria-hidden>
                    <CheckIcon />
                  </span>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-teal-100">
                    {getSectionLabels(language).actionTip}
                  </h3>
                </div>
                <p className="leading-relaxed text-white">
                  {selectedTaxTerm.action_tip}
                </p>
              </div>
            )}
          </div>
        </article>
      )}
      {translationNotFoundForLanguage && !definitionLoading && (
        <LanguageNotFound languageCodeOrName={translationNotFoundForLanguage} />
      )}
      {!selectedTaxTerm && !translationNotFoundForLanguage && !definitionLoading && (
        <div className="flex h-full items-center justify-center p-8 text-center text-zinc-500 dark:text-zinc-400">
          Select a term to view its definition.
        </div>
      )}
    </section>
  );
}
