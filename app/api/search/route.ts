import { NextRequest, NextResponse } from "next/server";
import type { LanguageCode } from "@/lib/types";
import { TAX_TERMS } from "@/lib/taxTermsData";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim().toLowerCase();
  const lang = (searchParams.get("lang") ?? "en") as LanguageCode;

  const baseUrl = process.env.TAX_API_BASE_URL;
  if (baseUrl) {
    try {
      const res = await fetch(
        `${baseUrl}/search?q=${encodeURIComponent(q)}&lang=${lang}`,
        { cache: "no-store" }
      );
      if (!res.ok) throw new Error("Search failed");
      const data = await res.json();
      return NextResponse.json(data);
    } catch (err) {
      console.error("Tax API search error:", err);
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
