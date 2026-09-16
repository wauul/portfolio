const FRENCH_LANGUAGE_COUNTRIES = new Set([
  "BE", "BF", "BI", "BJ", "CA", "CD", "CF", "CG", "CH", "CI",
  "CM", "DJ", "DZ", "FR", "GA", "GN", "GP", "GQ", "HT", "KM",
  "LU", "MA", "MC", "MG", "ML", "MQ", "MU", "NE", "RE", "RW",
  "SC", "SN", "TD", "TG", "TN", "VU",
]);

export const dynamic = "force-dynamic";

export async function GET(request) {
  const country = request.headers.get("x-vercel-ip-country")?.toUpperCase();
  const acceptedLanguage = request.headers.get("accept-language") || "";
  const language = country
    ? FRENCH_LANGUAGE_COUNTRIES.has(country)
      ? "fr"
      : "en"
    : acceptedLanguage.trim().toLowerCase().startsWith("fr")
      ? "fr"
      : "en";

  return Response.json(
    { language, source: country ? "country" : "browser" },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
