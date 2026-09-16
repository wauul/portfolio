const conditions = [
  [[0], ["Ciel dégagé", "Clear sky"]],
  [
    [1, 2, 3],
    ["Nuageux", "Cloudy"],
  ],
  [
    [45, 48],
    ["Brouillard", "Fog"],
  ],
  [
    [51, 53, 55, 56, 57],
    ["Bruine", "Drizzle"],
  ],
  [
    [61, 63, 65, 66, 67, 80, 81, 82],
    ["Pluie", "Rain"],
  ],
  [
    [71, 73, 75, 77, 85, 86],
    ["Neige", "Snow"],
  ],
  [
    [95, 96, 99],
    ["Orage", "Thunderstorm"],
  ],
];
export function weatherLabel(code, language) {
  return (
    conditions.find(([codes]) => codes.includes(code))?.[1][
      language === "fr" ? 0 : 1
    ] ?? (language === "fr" ? "Conditions inconnues" : "Unknown conditions")
  );
}
export async function getVisitorInfo(fetcher, signal) {
  async function json(url) {
    const r = await fetcher(url, {
      signal,
      cache: "no-store",
      credentials: "omit",
      referrerPolicy: "no-referrer",
    });
    if (!r.ok) throw new Error("Service unavailable");
    return r.json();
  }
  let geo = null;
  try {
    const value = await json("https://free.freeipapi.com/api/json");
    geo = value.ipAddress
      ? {
          ip: value.ipAddress,
          city: value.cityName,
          country: value.countryName,
          latitude: value.latitude,
          longitude: value.longitude,
        }
      : null;
  } catch {
    if (signal.aborted) throw new Error("Aborted");
  }
  const result = {
    ip: typeof geo?.ip === "string" ? geo.ip : null,
    location:
      [geo?.city, geo?.country]
        .filter((x) => typeof x === "string" && x)
        .join(", ") || null,
    weather: null,
  };
  if (!result.ip) {
    try {
      const value = await json("https://api.ipify.org?format=json");
      result.ip = typeof value.ip === "string" ? value.ip : null;
    } catch {
      if (signal.aborted) throw new Error("Aborted");
    }
  }
  if (
    typeof geo?.latitude === "number" &&
    typeof geo?.longitude === "number" &&
    Math.abs(geo.latitude) <= 90 &&
    Math.abs(geo.longitude) <= 180
  ) {
    try {
      const value = await json(
        `https://api.open-meteo.com/v1/forecast?latitude=${geo.latitude.toFixed(2)}&longitude=${geo.longitude.toFixed(2)}&current=temperature_2m,weather_code&timezone=auto`,
      );
      if (
        Number.isFinite(value.current?.temperature_2m) &&
        Number.isFinite(value.current?.weather_code)
      )
        result.weather = {
          temperature: value.current.temperature_2m,
          code: value.current.weather_code,
        };
    } catch {
      /* Keep the available location and IP if the weather provider fails. */
    }
  }
  return result;
}

export function weatherKind(code) {
  if (code === 0) return "sun";
  if ([1, 2].includes(code)) return "partly-cloudy";
  if (code === 3) return "cloud";
  if ([45, 48].includes(code)) return "fog";
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code))
    return "rain";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow";
  if ([95, 96, 99].includes(code)) return "storm";
  return "unknown";
}
