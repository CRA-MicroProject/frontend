import { NextRequest, NextResponse } from "next/server";
import type { LanguageCode } from "@/lib/types";
import { TAX_TERMS } from "@/lib/taxTermsData";

function byLang<T extends Record<LanguageCode, string>>(
  field: T,
  lang: LanguageCode
): string {
  return field[lang] ?? field.en;
}

const backendBaseUrl = () =>  process.env.BACKEND_URL ?? process.env.TAX_API_BASE_URL;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const lang = (request.nextUrl.searchParams.get("lang") ?? "en") as LanguageCode;

  const baseUrl = backendBaseUrl();
  if (baseUrl) {
    try {
      const translationRes = await fetch(
        `${baseUrl}/crahelper/getTermTranslation?termId=${encodeURIComponent(id)}&lang=${encodeURIComponent(lang)}`,
        { cache: "no-store" }
      );
      if (!translationRes.ok) {
        const errBody = (await translationRes.json().catch(() => ({}))) as { error?: string };
        const message = errBody?.error ?? "Term not found";
        const isTranslationNotFoundForLanguage =
          translationRes.status === 404 &&
          (message.includes("translation not found for language") ||
            message === "translation not found");
        return NextResponse.json(
          isTranslationNotFoundForLanguage
            ? { error: message, code: "TRANSLATION_NOT_FOUND_FOR_LANGUAGE", language: lang }
            : { error: message },
          { status: translationRes.status }
        );
      }
      const translationData = (await translationRes.json()) as {
        term_id: number;
        locale_code: string;
        translated_term: string | { term: string; description?: string };
        translated_description: string;
        verified_by: string;
        translation_datetime: string;
        translation_id: number;
      };

      const term =
        typeof translationData.translated_term === "string"
          ? translationData.translated_term
          : translationData.translated_term.term;
      let definition: string =
        typeof translationData.translated_description === "string"
          ? translationData.translated_description
          : translationData.translated_description ?? (translationData.translated_term as { term: string }).term;

      if (lang === "en" && !definition) {
        const metaRes = await fetch(
          `${baseUrl}/crahelper/getAllEnglishTermsAndMetadata`,
          { cache: "no-store" }
        );
        if (metaRes.ok) {
          const meta = (await metaRes.json()) as Array<{
            term_id: number;
            english: string;
            description: string;
          }>;
          const found = meta.find((m) => m.term_id === translationData.term_id);
          if (found) definition = found.description;
        }
        if (!definition) definition = term;
      }

      const fallback = definition || translationData.translated_term;
      const payload = {
        id: String(translationData.term_id),
        term,
        definition: definition || (translationData.translated_term as { term: string }).term,
        plainLanguage: fallback,
        whyItMatters: fallback,
        example: fallback,
        actionTip: fallback,
      };
      return NextResponse.json(payload);
    } catch (err) {
      console.error("Backend term error:", err);
      return NextResponse.json(
        { error: "Could not load definition" },
        { status: 502 }
      );
    }
  }

  const record = TAX_TERMS.find((t) => t.id === id);
  if (!record) {
    return NextResponse.json(
      { error: "Term not found" },
      { status: 404 }
    );
  }

  const payload: Record<string, string> = {
    id: record.id,
    term: byLang(record.term, lang),
    definition: byLang(record.definition, lang),
    plainLanguage: byLang(record.plainLanguage, lang),
    whyItMatters: byLang(record.whyItMatters, lang),
    example: byLang(record.example, lang),
    actionTip: byLang(record.actionTip, lang),
  };
  if (record.alsoKnownAs) {
    payload.alsoKnownAs = byLang(record.alsoKnownAs, lang);
  }
  return NextResponse.json(payload);
}
