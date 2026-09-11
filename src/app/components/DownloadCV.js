"use client";
import { usePreferences } from "./Preferences";
export default function DownloadCV({ compact = false }) {
  const { language } = usePreferences();
  const fr = language === "fr";
  return (
    <a
      className={`download-card ${compact ? "download-compact" : ""}`}
      href="/Wael-Fezari-CV.pdf"
      download="Wael-Fezari-CV.pdf"
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
          {fr ? "Mon parcours, en une page." : "My story, in one page."}
        </strong>
        <small>{fr ? "TÉLÉCHARGER LE CV" : "DOWNLOAD MY CV"} · PDF · FR</small>
      </span>
      <span className="download-arrow" aria-hidden="true">
        ↓
      </span>
    </a>
  );
}
