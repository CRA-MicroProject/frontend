import { NextResponse } from "next/server";

const backendBaseUrl = () =>
  process.env.CRA_HELPER_API_URL ??
  process.env.BACKEND_URL ??
  process.env.TAX_API_BASE_URL;

export interface LanguageOption {
  code: string;
  name: string;
  translatedName: string;
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
    { code: "en", name: "English", translatedName: "English" },
    { code: "mn", name: "Mongolian", translatedName: "Монгол хэл" },
    { code: "pt", name: "Portuguese", translatedName: "Português" },
  ]);
}
