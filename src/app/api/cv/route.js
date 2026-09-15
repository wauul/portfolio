import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request) {
  const requestedLanguage = new URL(request.url).searchParams.get("lang");
  const englishPath = path.join(process.cwd(), "public", "Wael-Fezari-CV-EN.pdf");
  const frenchPath = path.join(process.cwd(), "public", "Wael-Fezari-CV.pdf");
  const useEnglish = requestedLanguage === "en" && existsSync(englishPath);
  const filePath = useEnglish ? englishPath : frenchPath;
  const language = useEnglish ? "EN" : "FR";
  const file = await readFile(filePath);

  return new Response(file, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="Wael-Fezari-CV-${language}.pdf"`,
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
