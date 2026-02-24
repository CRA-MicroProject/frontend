"use client";

interface LanguageNotFoundProps {
  /** Language code (e.g. "pt-br") or display name when available */
  languageCodeOrName?: string;
}

export function LanguageNotFound({ languageCodeOrName }: LanguageNotFoundProps) {
  const label = languageCodeOrName ?? "the selected language";
  return (
    <div
      className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-12 text-center"
      role="status"
      aria-live="polite"
    >
      <div
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/40"
        aria-hidden
      >
        <svg
          className="h-7 w-7 text-amber-600 dark:text-amber-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12 17h.01"
          />
        </svg>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
          Not available in this language
        </h2>
        <p className="max-w-sm text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          This term is not yet available in <strong>{label}</strong>. Try choosing another language
          from the dropdown above.
        </p>
      </div>
    </div>
  );
}
