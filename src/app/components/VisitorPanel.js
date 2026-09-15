"use client";
import { useEffect, useState } from "react";
import { usePreferences } from "./Preferences";
import WeatherIcon from "./WeatherIcon";
import { getVisitorInfo, weatherLabel } from "../lib/visitor.mjs";
export default function VisitorPanel() {
  const { language } = usePreferences();
  const fr = language === "fr";
  const [now, setNow] = useState(null);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
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
  }, [attempt]);
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
      <details>
        <summary>
          <span>{fr ? "LAB INTERACTIF" : "INTERACTIVE LAB"}</span>
          <strong>
            {fr ? "Voir le contexte de votre visite" : "View your visit context"}
          </strong>
          <span aria-hidden="true">+</span>
        </summary>
        <div className="visitor-content">
          <div className="visitor-heading">
        <div>
          <p className="eyebrow">
            {fr ? "VOUS ÊTES ICI / EN DIRECT" : "YOU ARE HERE / LIVE"}
          </p>
          <h2 id="visitor-title">
            {fr ? "Un petit bout de " : "A little of "}
            <em>{fr ? "votre monde." : "your world."}</em>
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
            ◷
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
            ◎
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
            {fr ? "Réessayer ↻" : "Retry ↻"}
          </button>
        )}
      </div>
        </div>
      </details>
    </section>
  );
}
