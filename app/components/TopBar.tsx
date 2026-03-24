"use client";

import Link from "next/link";
import { LanguageSelector } from "./LanguageSelector";
import { useIntl } from "react-intl";

function ShieldIcon() {
  
  return (
    <svg
      className="h-5 w-5 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M9.5 12.5l1.7 1.7 3.3-3.5"
      />
    </svg>
  );
}


export function TopBar() {
  
  const intl = useIntl();
  return (
    <header className="w-full border-b border-zinc-200 bg-white">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link  href="/">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 shadow-sm">
              <ShieldIcon />
            </div>
            <span className="hidden text-2xl font-bold tracking-tight text-zinc-800 md:inline">TaxDecoder</span>
          </div>
        </Link>
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <Link
              href="/pages/term"
              className="inline-flex items-center rounded-full bg-black px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800"
            >
              {intl.formatMessage({ id: "app.header.navBtn" })}
            </Link>
          </div>
      </div>
    </header>
  );
}
