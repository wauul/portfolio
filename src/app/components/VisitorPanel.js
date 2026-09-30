"use client";
import { useEffect, useState } from "react";
import { usePreferences } from "./Preferences";
import WeatherIcon from "./WeatherIcon";
import { getVisitorInfo, weatherLabel } from "../lib/visitor.mjs";
import { FiClock, FiMapPin, FiPlus, FiRefreshCw } from "react-icons/fi";
export default function VisitorPanel() {
  const { language } = usePreferences();
  const fr = language === "fr";
  const [now, setNow] = useState(null);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [attempt, setAttempt] = useState(0);
  const [opened, setOpened] = useState(false);
  useEffect(() => {
    if (!opened) return;
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, [opened]);
  useEffect(() => {
    if (!opened) return;
    const controller = new AbortController();
    let active = true;
    const timeout = setTimeout(() => controller.abort(), 15000);
    setLoading(true);
    getVisitorInfo(fetch, controller.signal)
      .then((value) => {
        if (active) setInfo(value);
      })
      .catch(() => {
        if (active) setInfo({});
      })
      .finally(() => {
        clearTimeout(timeout);
        if (active) setLoading(false);
      });
    return () => {
      active = false;
      clearTimeout(timeout);
      controller.abort();
    };
  }, [attempt, opened]);
  const fallback = loading
    ? fr
      ? "Connexion…"
      : "Connecting…"
    : fr
      ? "Indisponible"
      : "Unavailable";
  return (
    <section
      className="visitor-section visitor-lab section-wrap"
      aria-labelledby="visitor-title"
    >
      <details onToggle={event => setOpened(event.currentTarget.open)}>
        <summary>
          <span>{fr ? "En direct" : "Live context"}</span>
          <strong>
            {fr ? "Voir le contexte de votre visite" : "View your visit context"}
          </strong>
          <span aria-hidden="true"><FiPlus /></span>
        </summary>
        <div className="visitor-content">
          <div className="visitor-heading">
        <div>
          <h2 id="visitor-title">
            {fr ? "Le contexte de votre visite" : "Your visit context"}
          </h2>
        </div>
        <span className="live-indicator">
          <i />
          {fr ? "Heure en direct" : "Live local time"}
        </span>
      </div>
      <div className="visitor-grid">
        <div>
          <span className="visitor-icon" aria-hidden="true">
            <FiClock />
          </span>
          <span>{fr ? "Heure locale" : "Local time"}</span>
          <strong suppressHydrationWarning>
            {now ? now.toLocaleTimeString(fr ? "fr-FR" : "en-GB") : "—:—:—"}
          </strong>
          <small>
            {now
              ? Intl.DateTimeFormat().resolvedOptions().timeZone
              : fr
                ? "Votre fuseau horaire"
                : "Your time zone"}
          </small>
        </div>
        <div>
          <span className="visitor-icon" aria-hidden="true">
            <FiMapPin />
          </span>
          <span>
            {fr ? "Localisation approximative" : "Approximate location"}
          </span>
          <strong>{info?.location || fallback}</strong>
          <small>
            {fr ? "Estimée à partir de votre IP" : "Estimated from your IP"}
          </small>
        </div>
        <div>
          <span className="visitor-icon" aria-hidden="true">
            <WeatherIcon code={info?.weather?.code} />
          </span>
          <span>{fr ? "Météo locale" : "Local weather"}</span>
          <strong>
            {info?.weather
              ? `${Math.round(info.weather.temperature)} °C`
              : fallback}
          </strong>
          <small>
            {info?.weather
              ? weatherLabel(info.weather.code, language)
              : fr
                ? "Selon la ville estimée"
                : "Based on the estimated city"}
          </small>
        </div>
      </div>
      <div className="visitor-footnote">
        <p>
          {fr
            ? "Données affichées uniquement pour votre visite. Localisation IP indicative, sans accès au GPS. Services externes : "
            : "Displayed for your visit only. Approximate IP location, no GPS access. External services: "}
          <a
            href="https://freeipapi.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            FreeIPAPI
          </a>
          ,{" "}
          <a
            href="https://www.ipify.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ipify
          </a>{" "}
          &{" "}
          <a
            href="https://open-meteo.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open-Meteo
          </a>
          .
        </p>
        {!loading && (!info?.ip || !info?.location || !info?.weather) && (
          <button onClick={() => setAttempt((a) => a + 1)}>
            <FiRefreshCw aria-hidden="true" />{fr ? "Réessayer" : "Retry"}
          </button>
        )}
      </div>
        </div>
      </details>
    </section>
  );
}
