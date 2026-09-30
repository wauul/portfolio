"use client";
import { createContext, useContext, useEffect, useState } from "react";
import french from "../lib/fr.json";
import { FiGlobe, FiChevronDown, FiSun, FiMoon, FiCheck } from "react-icons/fi";
const Preferences = createContext(null);
export function PreferencesProvider({ children }) {
  const [language, setLanguage] = useState("fr");
  const [theme, setTheme] = useState("dark");
  const [reducedMotion, setReducedMotion] = useState(true);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = reducedMotion ? "paused" : "active";
  }, [reducedMotion]);
  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const sync = () => {
      let stored = null;
      try { stored = localStorage.getItem("portfolio-theme"); } catch {}
      if (stored === "dark" || stored === "light") return;
      const value = media.matches ? "dark" : "light";
      document.documentElement.dataset.theme = value;
      setTheme(value);
    };
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    let active = true;
    let storedLanguage = null;
    try {
      storedLanguage = localStorage.getItem("portfolio-language");
      if (storedLanguage === "fr" || storedLanguage === "en") {
        setLanguage(storedLanguage);
      }
    } catch {}
    if (storedLanguage !== "fr" && storedLanguage !== "en") {
      fetch("/api/locale", { cache: "no-store" })
        .then((response) => (response.ok ? response.json() : null))
        .then((value) => {
          if (!active) return;
          if (value?.language === "fr" || value?.language === "en") {
            setLanguage(value.language);
          } else if (!navigator.language.toLowerCase().startsWith("fr")) {
            setLanguage("en");
          }
        })
        .catch(() => {
          if (active && !navigator.language.toLowerCase().startsWith("fr")) {
            setLanguage("en");
          }
        });
    }
    setTheme(
      document.documentElement.dataset.theme === "light" ? "light" : "dark",
    );
    return () => {
      active = false;
    };
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
      value={{ language, theme, changeLanguage, toggleTheme, reducedMotion, t }}
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
          <FiGlobe aria-hidden="true" />
          {language.toUpperCase()}
          <FiChevronDown className="language-chevron" aria-hidden="true" />
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
                <span aria-hidden="true">{language === value ? <FiCheck /> : value.toUpperCase()}</span>
            </button>
          ))}
        </div>
      </details>
      <button
        className="theme-control"
        onClick={toggleTheme}
        aria-label={language === "fr" ? (theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre") : (theme === "dark" ? "Switch to light mode" : "Switch to dark mode")}
        aria-pressed={theme === "dark"}
      >
        {theme === "dark" ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
      </button>
    </div>
  );
}
