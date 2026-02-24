import { NextRequest, NextResponse } from "next/server";
import type { LanguageCode } from "@/lib/types";
import { TAX_TERMS } from "@/lib/taxTermsData";

const backendBaseUrl = () => process.env.BACKEND_URL ?? process.env.TAX_API_BASE_URL;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim().toLowerCase();
  const lang = (searchParams.get("lang") ?? "en") as LanguageCode;

  const baseUrl = backendBaseUrl();
  if (baseUrl) {
    try {
      const res = await fetch(
        `${baseUrl}/crahelper/getAllEnglishTermsAndMetadata`,
        { cache: "no-store" }
      );
      if (!res.ok) throw new Error("Backend fetch failed");
      const data = (await res.json()) as Array<{
        termId: number;
        english: string;
        description: string;
      }>;
      const terms = data.map((t) => ({
        id: String(t.termId),
        label: t.english,
      }));
      const filtered = q
        ? terms.filter(
            (t) =>
              t.label.toLowerCase().includes(q) ||
              (data.find((d) => String(d.termId) === t.id)?.description ?? "")
                .toLowerCase()
                .includes(q)
          )
        : terms;
      return NextResponse.json({ terms: filtered });
    } catch (err) {
      console.error("Backend search error:", err);
      return NextResponse.json(
        { error: "Search failed" },
        { status: 502 }
      );
    }
  }

  const terms = TAX_TERMS.map((record) => ({
    id: record.id,
    label: record.term[lang] ?? record.term.en,
  }));
  const filtered = q
    ? terms.filter((t) => t.label.toLowerCase().includes(q))
    : terms;
  return NextResponse.json({ terms: filtered });
}
