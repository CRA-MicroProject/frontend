"use client";

import { useCallback, useEffect, useState } from "react";
import type { LanguageCode } from "@/lib/types";
import type { TaxTerm, TermDefinition } from "@/lib/types";

function BookIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}
function InfoIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

const SECTION_LABELS: Record<LanguageCode, Record<string, string>> = {
  en: {
    alsoKnownAs: "Also known as",
    plainLanguage: "IN PLAIN LANGUAGE",
    whyItMatters: "WHY DOES THIS MATTER?",
    example: "EXAMPLE",
    actionTip: "ACTION TIP",
  },
  mn: {
    alsoKnownAs: "Өөр нэр",
    plainLanguage: "ЭНГИЙН ХЭЛЭЭР",
    whyItMatters: "ЯАГААД ЭНЭ ЧУХАЛ ВЭ?",
    example: "ЖИШЭЭ",
    actionTip: "ҮЙЛДЭЛ",
  },
  pt: {
    alsoKnownAs: "Também conhecido como",
    plainLanguage: "EM LINGUAGEM SIMPLES",
    whyItMatters: "POR QUE ISSO IMPORTA?",
    example: "EXEMPLO",
    actionTip: "DICA DE AÇÃO",
  },
};

interface TaxTermSearchProps {
  language: LanguageCode;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debouncedValue;
}

export function TaxTermSearch({ language }: TaxTermSearchProps) {
  const [query, setQuery] = useState("");
  const [terms, setTerms] = useState<TaxTerm[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTermId, setSelectedTermId] = useState<string | null>(null);
  const [selectedDefinition, setSelectedDefinition] = useState<TermDefinition | null>(null);
  const [definitionLoading, setDefinitionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebounce(query, 300);

  const searchTerms = useCallback(async (q: string, lang: LanguageCode) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/search?q=${encodeURIComponent(q)}&lang=${lang}`
      );
      if (!res.ok) throw new Error("Search failed");
      const data = await res.json();
      setTerms(data.terms ?? []);
    } catch (e) {
      setError("Could not load terms.");
      setTerms([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // List is always in English; language only affects the right-panel definition
  useEffect(() => {
    searchTerms(debouncedQuery, "en");
  }, [debouncedQuery, searchTerms]);

  // When language changes, show the selected term in the new language (term + definition)
  useEffect(() => {
    if (selectedTermId) {
      fetchDefinition(selectedTermId, language);
    }
    // Only re-fetch when language changes, not when selectedTermId or selection changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const fetchDefinition = useCallback(async (id: string, lang: LanguageCode) => {
    setSelectedTermId(id);
    setDefinitionLoading(true);
    setSelectedDefinition(null);
    setError(null);
    try {
      const res = await fetch(`/api/term/${encodeURIComponent(id)}?lang=${lang}`);
      if (!res.ok) throw new Error("Failed to load definition");
      const data = await res.json();
      setSelectedDefinition(data);
    } catch (e) {
      setError("Could not load definition.");
    } finally {
      setDefinitionLoading(false);
    }
  }, []);

  return (
    <div className="flex w-full flex-col gap-4 md:flex-row md:min-h-[420px]">
      {/* Left panel: search + results */}
      <aside className="flex w-full shrink-0 flex-col gap-3 md:w-80 md:border-r md:border-zinc-200 md:pr-4 dark:md:border-zinc-700">
        <div className="relative">
          <input
            type="search"
            placeholder="Search tax terms..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-white py-2.5 pl-4 pr-10 text-zinc-900 placeholder-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-400"
            aria-label="Search tax terms"
          />
          {loading && (
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
              aria-hidden
            >
              …
            </span>
          )}
        </div>

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">
            {error}
          </p>
        )}

        <ul
          className="flex-1 overflow-y-auto rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-800 md:min-h-0"
          role="listbox"
        >
          {terms.length > 0 ? (
            terms.map((term) => (
              <li key={term.id} role="option">
                <button
                  type="button"
                  onClick={() => fetchDefinition(term.id, language)}
                  className="w-full px-4 py-3 text-left text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:text-zinc-100 dark:hover:bg-zinc-700"
                >
                  {term.label}
                </button>
              </li>
            ))
          ) : (
            <li className="px-4 py-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
              {loading ? "Searching…" : query.trim() ? "No terms found." : "No terms available."}
            </li>
          )}
        </ul>
      </aside>

      {/* Right panel: selected result */}
      <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700 md:min-h-[420px]">
        {definitionLoading && (
          <div className="flex h-full items-center justify-center p-8 text-zinc-500 dark:text-zinc-400">
            Loading definition…
          </div>
        )}
        {selectedDefinition && !definitionLoading && (
          <article className="flex flex-1 flex-col overflow-y-auto">
            {/* Top: term + official definition (dark) */}
            <div className="bg-zinc-800 px-5 py-5 dark:bg-zinc-900">
              {selectedDefinition.alsoKnownAs && (
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-zinc-400">
                  {SECTION_LABELS[language].alsoKnownAs}: {selectedDefinition.alsoKnownAs}
                </p>
              )}
              <h2 className="text-2xl font-bold text-white">
                {selectedDefinition.term}
              </h2>
              <p className="mt-2 italic leading-relaxed text-zinc-200">
                {selectedDefinition.definition}
              </p>
            </div>

            {/* Content sections (light) */}
            <div className="flex flex-1 flex-col gap-0 bg-white dark:bg-zinc-950">
              {/* In plain language */}
              <div className="border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-zinc-500 dark:text-zinc-400" aria-hidden>
                    <BookIcon />
                  </span>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    {SECTION_LABELS[language].plainLanguage}
                  </h3>
                </div>
                <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {selectedDefinition.plainLanguage}
                </p>
              </div>

              {/* Why does this matter? (boxed) */}
              <div className="border-b border-zinc-200 bg-zinc-100/80 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-800/50">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-zinc-500 dark:text-zinc-400" aria-hidden>
                    <InfoIcon />
                  </span>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                    {SECTION_LABELS[language].whyItMatters}
                  </h3>
                </div>
                <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {selectedDefinition.whyItMatters}
                </p>
              </div>

              {/* Example */}
              <div className="border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  {SECTION_LABELS[language].example}
                </h3>
                <p className="italic leading-relaxed text-zinc-600 dark:text-zinc-400">
                  &ldquo;{selectedDefinition.example}&rdquo;
                </p>
              </div>

              {/* Action tip (teal box) */}
              <div className="m-4 mt-4 rounded-lg bg-teal-700 px-4 py-4 text-white dark:bg-teal-800">
                <div className="mb-2 flex items-center gap-2">
                  <span aria-hidden>
                    <CheckIcon />
                  </span>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-teal-100">
                    {SECTION_LABELS[language].actionTip}
                  </h3>
                </div>
                <p className="leading-relaxed text-white">
                  {selectedDefinition.actionTip}
                </p>
              </div>
            </div>
          </article>
        )}
        {!selectedDefinition && !definitionLoading && (
          <div className="flex h-full items-center justify-center p-8 text-center text-zinc-500 dark:text-zinc-400">
            Select a term to view its definition.
          </div>
        )}
      </section>
    </div>
  );
}
