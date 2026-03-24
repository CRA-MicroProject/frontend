"use client";

import type { LanguageCode } from "@/lib/types";
import type { TaxTerm } from "@/lib/types";

interface SearchListProps {
  query: string;
  loading: boolean;
  error: string | null;
  terms: TaxTerm[];
  language: LanguageCode;
  selectedTermId: string | null;
  onQueryChange: (value: string) => void;
  onSelectTerm: (id: string, lang: LanguageCode) => void;
}

export function SearchList({
  query,
  loading,
  error,
  terms,
  language,
  selectedTermId,
  onQueryChange,
  onSelectTerm,
}: SearchListProps) {
  return (
    <aside className="flex min-h-0 w-full shrink-0 flex-col gap-3 md:w-80 md:border-r md:border-zinc-200 md:pr-4 dark:md:border-zinc-700">
      <div className="relative">
        <input
          type="search"
          placeholder="Search tax terms..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
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
        className="min-h-0 flex-1 overflow-y-auto rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-800"
        role="listbox"
      >
        {terms.length > 0 ? (
          terms.map((term) => {
            const isSelected = selectedTermId === term.id;
            return (
              <li key={term.id} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => onSelectTerm(term.id, language)}
                  className={`w-full px-4 py-3 text-left text-sm font-medium dark:text-zinc-100 ${
                    isSelected
                      ? "bg-zinc-100 text-zinc-950 dark:bg-zinc-700"
                      : "text-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-700"
                  }`}
                >
                  {term.label}
                </button>
              </li>
            );
          })
        ) : (
          <li className="px-4 py-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
            {loading ? "Searching…" : query.trim() ? "No terms found." : "No terms available."}
          </li>
        )}
      </ul>
    </aside>
  );
}
