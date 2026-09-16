import { weatherKind } from "../lib/visitor.mjs";
export default function WeatherIcon({ code }) {
  const kind = weatherKind(code);
  return (
    <svg
      className={`weather-symbol weather-${kind}`}
      data-weather={kind}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {["sun", "partly-cloudy"].includes(kind) && (
        <g className="weather-sun">
          <circle cx="12" cy="11" r="4" />
          <path d="M12 2v2m0 14v2M3 11h2m14 0h2M5.6 4.6 7 6m10 10 1.4 1.4M5.6 17.4 7 16M17 6l1.4-1.4" />
        </g>
      )}
      {["partly-cloudy", "cloud", "rain", "snow", "storm"].includes(kind) && (
        <path
          d="M9 21a5 5 0 0 1-1-9 7 7 0 0 1 13-1 5 5 0 1 1 3 10Z"
          fill="var(--paper, #f3f1e9)"
        />
      )}
      {kind === "rain" && (
        <path className="weather-rain" d="m11 25-1 3m7-3-1 3m7-3-1 3" />
      )}
      {kind === "snow" && (
        <path d="M11 25v5m-2-3 4 1m0-1-4 1m13-3v5m-2-3 4 1m0-1-4 1" />
      )}
      {kind === "storm" && <path d="m17 22-4 5h5l-3 4" />}
      {kind === "fog" && <path d="M5 10h22M3 16h20M8 22h21" />}
      {kind === "unknown" && (
        <>
          <circle cx="16" cy="16" r="10" />
          <path d="M13 12a3 3 0 1 1 4 3c-1 1-1 2-1 3m0 4h.01" />
        </>
      )}
    </svg>
  );
}
