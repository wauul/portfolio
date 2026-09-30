"use client";
import { usePreferences } from "./Preferences";
import { FiDownload } from "react-icons/fi";
export default function DownloadCV() {
  const { language } = usePreferences();
  const fr = language === "fr";
  return (
    <a
      className="download-card"
      href={`/api/cv?lang=${language}`}
      download={`Wael-Fezari-CV-${language.toUpperCase()}.pdf`}
    >
      <FiDownload aria-hidden="true" />
      <span>
        <strong>
          {fr ? "Télécharger mon CV" : "Download my CV"}
        </strong>
        <small>PDF · {fr ? "FRANÇAIS" : "ENGLISH"}</small>
      </span>
    </a>
  );
}
