"use client";
import { usePreferences } from "./Preferences";
export default function DownloadCV() {
  const { language } = usePreferences();
  const fr = language === "fr";
  return (
    <a
      className="download-card"
      href={`/api/cv?lang=${language}`}
      download={`Wael-Fezari-CV-${language.toUpperCase()}.pdf`}
    >
      <span className="download-file" aria-hidden="true">
        <svg viewBox="0 0 24 28" fill="none">
          <path
            d="M3 1h11l7 7v18H3zM14 1v8h7M7 14h10M7 18h7"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </svg>
      </span>
      <span>
        <strong>
          {fr ? "Télécharger mon CV" : "Download my CV"}
        </strong>
        <small>PDF · {fr ? "FRANÇAIS" : "ENGLISH"}</small>
      </span>
      <span className="download-arrow" aria-hidden="true">
        ↓
      </span>
    </a>
  );
}
