import { NextRequest, NextResponse } from "next/server";
import type { LanguageCode } from "@/lib/types";
import { TAX_TERMS } from "@/lib/taxTermsData";

const backendBaseUrl = () => process.env.BACKEND_URL ?? process.env.TAX_API_BASE_URL;

/** Matches Terms table: term_id (PK), original_term, original_description, original_example, original_action_tip */
interface TermRow {
  term_id: number;
  original_term: string;
  original_description: string;
  original_example?: string;
  original_action_tip?: string;
}

function searchMatches(q: string, row: TermRow): boolean {
  if (!q) return true;
  const lower = q.toLowerCase();
  return (
    row.original_term.toLowerCase().includes(lower) ||
    (row.original_description ?? "").toLowerCase().includes(lower) ||
    (row.original_example ?? "").toLowerCase().includes(lower) ||
    (row.original_action_tip ?? "").toLowerCase().includes(lower)
  );
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim().toLowerCase();
  const lang = (searchParams.get("lang") ?? "en") as LanguageCode;

  const baseUrl = backendBaseUrl();
  if (baseUrl) {
    try {
      const res = await fetch(
        `${baseUrl}/crahelper/getAllEnglishTerms`,
        { cache: "no-store" }
      );
      if (!res.ok) throw new Error("Backend fetch failed");
      const data = (await res.json()) as TermRow[];
      const terms = data.map((t) => ({
        id: String(t.term_id),
        label: t.original_term,
        description: t.original_description ?? "",
      }));
      const filtered = q
        ? terms.filter((t) => {
            const row = data.find((d) => String(d.term_id) === t.id);
            return row ? searchMatches(q, row) : false;
          })
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
