import { NextRequest, NextResponse } from "next/server";
import type { LanguageCode } from "@/lib/types";
import { TAX_TERMS } from "@/lib/taxTermsData";

function byLang<T extends Record<LanguageCode, string>>(
  field: T,
  lang: LanguageCode
): string {
  return field[lang] ?? field.en;
}

const backendBaseUrl = () => process.env.BACKEND_URL ?? process.env.TAX_API_BASE_URL;

/** Terms table: term_id (PK), original_term, original_description, original_example, original_action_tip */
interface TermRow {
  term_id: number;
  original_term: string;
  original_description: string;
  original_example?: string;
  original_action_tip?: string;
}

/** Translations table: term_id (FK), locale_code (FK), translated_term, translated_description, translated_example, translated_action_tip */
interface TranslationRow {
  term_id: number;
  locale_code: string;
  translated_term: string;
  translated_description: string;
  translated_example?: string;
  translated_action_tip?: string;
}

function buildTermPayload(
  id: string,
  term: string,
  definition: string,
  example: string | null,
  actionTip: string | null
) {
  // const fallback = definition || term;
  return {
    id,
    term,
    definition: definition || term,
    example: example || null,
    actionTip: actionTip || null,
  };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const lang = (request.nextUrl.searchParams.get("lang") ?? "en") as LanguageCode;

  const baseUrl = backendBaseUrl();
  if (baseUrl) {
    try {
      if (lang === "en") {
        const englishRes = await fetch(
          `${baseUrl}/crahelper/getAllEnglishTerms`,
          { cache: "no-store" }
        );
        if (!englishRes.ok) throw new Error("Backend fetch failed");
        const englishData = (await englishRes.json()) as TermRow[];
        const found = englishData.find((t) => String(t.term_id) === id);
        if (!found) {
          return NextResponse.json(
            { error: "Term not found" },
            { status: 404 }
          );
        }
        const definition = found.original_description || found.original_term;
        const payload = buildTermPayload(
          String(found.term_id),
          found.original_term,
          definition,
          found.original_example ?? "",
          found.original_action_tip ?? ""
        );
        return NextResponse.json(payload);
      }

      const translationRes = await fetch(
        `${baseUrl}/crahelper/getTermTranslation?termId=${encodeURIComponent(id)}&lang=${encodeURIComponent(lang)}`,
        { cache: "no-store" }
      );
      // console.log("translationRes", await translationRes.json());
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
      const row = (await translationRes.json()) as TranslationRow & {
        translated_term?: string | { term: string };
        translated_description?: string | { term?: string };
      };
      const term =
        typeof row.translated_term === "string"
          ? row.translated_term
          : (row.translated_term as { term: string })?.term ?? "";
      const definition =
        typeof row.translated_description === "string"
          ? row.translated_description
          : (row.translated_description as { term?: string })?.term ?? term;
      const payload = buildTermPayload(
        String(row.term_id),
        term,
        definition,
        row.translated_example ?? "",
        row.translated_action_tip ?? ""
      );
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
    example: byLang(record.example, lang),
    actionTip: byLang(record.actionTip, lang),
  };
  if (record.alsoKnownAs) {
    payload.alsoKnownAs = byLang(record.alsoKnownAs, lang);
  }
  return NextResponse.json(payload);
}
