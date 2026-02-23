"use client";

import { useState } from "react";
import type { LanguageCode } from "@/lib/types";
import { LanguageSelector } from "./LanguageSelector";
import { TaxTermSearch } from "./TaxTermSearch";

export function TaxGlossary() {
  const [language, setLanguage] = useState<LanguageCode>("en");

  return (
    <div className="flex flex-col gap-6">
      <LanguageSelector value={language} onChange={setLanguage} />
      <TaxTermSearch language={language} />
    </div>
  );
}
