"use client";

import { createContext, useContext, useMemo, useState } from "react";

export interface SelectedTaxTerm {
  id: string;
  term: string;
  description: string | null;
  example: string | null;
  action_tip: string | null;
}

interface SelectedTaxTermContextValue {
  selectedTaxTerm: SelectedTaxTerm | null;
  setSelectedTaxTerm: (term: SelectedTaxTerm | null) => void;
}

const SelectedTaxTermContext = createContext<SelectedTaxTermContextValue | undefined>(
  undefined
);

export function SelectedTaxTermProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedTaxTerm, setSelectedTaxTerm] = useState<SelectedTaxTerm | null>(null);

  const value = useMemo(
    () => ({ selectedTaxTerm, setSelectedTaxTerm }),
    [selectedTaxTerm]
  );

  return (
    <SelectedTaxTermContext.Provider value={value}>
      {children}
    </SelectedTaxTermContext.Provider>
  );
}

export function useSelectedTaxTerm() {
  const context = useContext(SelectedTaxTermContext);
  if (!context) {
    throw new Error("useSelectedTaxTerm must be used within SelectedTaxTermProvider");
  }
  return context;
}
