import { NextResponse } from "next/server";

const backendBaseUrl = () =>
  process.env.CRA_HELPER_API_URL ??
  process.env.BACKEND_URL ??
  process.env.TAX_API_BASE_URL;

/** Matches Languages table: locale_code (PK), language_name_english, language_name_native */
export interface LanguageOption {
  locale_code: string;
  language_name_english: string;
  language_name_native: string;
}

export async function GET() {
  const baseUrl = backendBaseUrl();
  if (baseUrl) {
    try {
      const res = await fetch(`${baseUrl}/crahelper/getAvailableLanguages`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Backend fetch failed");
      const data = (await res.json()) as LanguageOption[];
      return NextResponse.json(data);
    } catch (err) {
      console.error("Backend languages error:", err);
      return NextResponse.json(
        { error: "Could not load languages" },
        { status: 502 }
      );
    }
  }

  return NextResponse.json([
    { locale_code: "en", language_name_english: "English", language_name_native: "English" },
    { locale_code: "mn", language_name_english: "Mongolian", language_name_native: "Монгол хэл" },
    { locale_code: "pt", language_name_english: "Portuguese", language_name_native: "Português" },
  ]);
}
