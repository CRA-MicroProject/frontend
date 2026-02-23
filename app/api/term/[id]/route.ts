import { NextRequest, NextResponse } from "next/server";
import type { LanguageCode } from "@/lib/types";
import { TAX_TERMS } from "@/lib/taxTermsData";

function byLang<T extends Record<LanguageCode, string>>(
  field: T,
  lang: LanguageCode
): string {
  return field[lang] ?? field.en;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const lang = (request.nextUrl.searchParams.get("lang") ?? "en") as LanguageCode;

  const baseUrl = process.env.TAX_API_BASE_URL;
  if (baseUrl) {
    try {
      const res = await fetch(
        `${baseUrl}/term/${encodeURIComponent(id)}?lang=${lang}`,
        { cache: "no-store" }
      );
      if (!res.ok) throw new Error("Definition fetch failed");
      const data = await res.json();
      return NextResponse.json(data);
    } catch (err) {
      console.error("Tax API term error:", err);
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
