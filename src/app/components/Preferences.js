"use client";
import { createContext, useContext, useEffect, useState } from "react";
import french from "../lib/fr.json";
const Preferences = createContext(null);
export function PreferencesProvider({ children }) {
  const [language, setLanguage] = useState("fr");
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    try {
      if (localStorage.getItem("portfolio-language") === "en")
        setLanguage("en");
    } catch {}
    setTheme(
      document.documentElement.dataset.theme === "light" ? "light" : "dark",
    );
  }, []);
  useEffect(() => {
    document.documentElement.lang = language;
    document.title =
      language === "fr"
        ? "WF · Wael Fezari — Développeur full-stack & IA"
        : "WF · Wael Fezari — Full-stack Developer & Applied AI";
  }, [language]);
  function changeLanguage(value) {
    setLanguage(value);
    try {
      localStorage.setItem("portfolio-language", value);
    } catch {}
  }
  function toggleTheme() {
    const value = theme === "light" ? "dark" : "light";
    setTheme(value);
    document.documentElement.dataset.theme = value;
    try {
      localStorage.setItem("portfolio-theme", value);
    } catch {}
  }
  const t = (text) => (language === "fr" ? (french[text] ?? text) : text);
  return (
    <Preferences.Provider
      value={{ language, theme, changeLanguage, toggleTheme, t }}
    >
      {children}
    </Preferences.Provider>
  );
}
export function usePreferences() {
  return useContext(Preferences);
}
export function PreferenceControls() {
  const { language, theme, changeLanguage, toggleTheme } = usePreferences();
  return (
    <div className="preference-controls">
      <details
        className="language-picker"
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget))
            e.currentTarget.open = false;
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            e.currentTarget.open = false;
            e.currentTarget.querySelector("summary").focus();
          }
        }}
      >
        <summary
          aria-label={language === "fr" ? "Langue du site" : "Site language"}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <ellipse cx="12" cy="12" rx="4" ry="9" />
            <path d="M3 12h18" />
          </svg>
          {language.toUpperCase()}
          <svg
            className="language-chevron"
            viewBox="0 0 24 24"
            aria-hidden="true"
            style={{ display: "block", flexShrink: 0 }}
          >
            <path d="m7 9.5 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </summary>
        <div className="language-options">
          {[
            ["fr", "Français"],
            ["en", "English"],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={language === value}
              onClick={(e) => {
                changeLanguage(value);
                const root = e.currentTarget.closest("details");
                root.open = false;
                root.querySelector("summary").focus();
              }}
            >
              <span>{label}</span>
              <span aria-hidden="true">
                {language === value ? "✓" : value.toUpperCase()}
              </span>
            </button>
          ))}
        </div>
      </details>
      <button
        className="theme-control"
        onClick={toggleTheme}
        aria-label={language === "fr" ? "Mode sombre" : "Dark mode"}
        aria-pressed={theme === "dark"}
      >
        <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
      </button>
    </div>
  );
}
