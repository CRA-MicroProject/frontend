"use client";

import { useCallback, useEffect, useState } from "react";
import type { LanguageCode } from "@/lib/types";
import type { TaxTerm, TermDefinition } from "@/lib/types";
import { useSelectedLanguage } from "../context/SelectedLanguageContext";
import { useSelectedTaxTerm } from "../context/SelectedTaxTermContext";
import { SearchList } from "./SearchList";
import { Term } from "./Term";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debouncedValue;
}

export function TaxGlossary() {
  const { selectedLanguage } = useSelectedLanguage();
  const { selectedTaxTerm, setSelectedTaxTerm } = useSelectedTaxTerm();
  const language = (selectedLanguage?.code ?? "en") as LanguageCode;
  const [query, setQuery] = useState("");
  const [terms, setTerms] = useState<TaxTerm[]>([]);
  const [loading, setLoading] = useState(false);
  const [definitionLoading, setDefinitionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [translationNotFoundForLanguage, setTranslationNotFoundForLanguage] = useState<string | null>(null);

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
    } catch {
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
    if (selectedTaxTerm?.id) {
      fetchDefinition(selectedTaxTerm.id, language);
    }
    // Only re-fetch when language changes, not when selected term selection changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const fetchDefinition = useCallback(async (id: string, lang: LanguageCode) => {
    setDefinitionLoading(true);
    setSelectedTaxTerm(null);
    setError(null);
    setTranslationNotFoundForLanguage(null);
    try {
      const res = await fetch(`/api/term/${encodeURIComponent(id)}?lang=${lang}`);
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        code?: string;
        language?: string;
      };
      if (!res.ok) {
        if (res.status === 404 && data.code === "TRANSLATION_NOT_FOUND_FOR_LANGUAGE") {
          setTranslationNotFoundForLanguage(data.language ?? lang);
        } else {
          setError("Could not load definition.");
        }
      } else {
        const definitionData = data as TermDefinition;
        setSelectedTaxTerm({
          id: definitionData.id,
          term: definitionData.term,
          description: definitionData.definition ?? null,
          example: definitionData.example ?? null,
          action_tip: definitionData.actionTip ?? null,
        });
      }
    } catch {
      setError("Could not load definition.");
    } finally {
      setDefinitionLoading(false);
    }
  }, [setSelectedTaxTerm]);

  return (
    <div className="flex md:h-[calc(100vh-15rem)] w-full min-h-0 flex-col items-stretch gap-4 overflow-hidden md:flex-row">
      <SearchList
        query={query}
        loading={loading}
        error={error}
        terms={terms}
        language={language}
        selectedTermId={selectedTaxTerm?.id ?? null}
        onQueryChange={setQuery}
        onSelectTerm={fetchDefinition}
      />

      <Term
        language={language}
        definitionLoading={definitionLoading}
        translationNotFoundForLanguage={translationNotFoundForLanguage}
        selectedTaxTerm={selectedTaxTerm}
      />
    </div>
  );
}
