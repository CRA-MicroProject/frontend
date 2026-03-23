"use client";

import { createContext, useContext, useMemo, useState } from "react";

export interface SelectedLanguage {
  code: string;
  english_name: string;
  native_name: string;
}

interface SelectedLanguageContextValue {
  selectedLanguage: SelectedLanguage | null;
  setSelectedLanguage: (language: SelectedLanguage | null) => void;
}

const SelectedLanguageContext = createContext<SelectedLanguageContextValue | undefined>(
  undefined
);

export function SelectedLanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedLanguage, setSelectedLanguage] = useState<SelectedLanguage | null>(null);

  const value = useMemo(
    () => ({ selectedLanguage, setSelectedLanguage }),
    [selectedLanguage]
  );

  return (
    <SelectedLanguageContext.Provider value={value}>
      {children}
    </SelectedLanguageContext.Provider>
  );
}

export function useSelectedLanguage() {
  const context = useContext(SelectedLanguageContext);
  if (!context) {
    throw new Error("useSelectedLanguage must be used within SelectedLanguageProvider");
  }
  return context;
}
