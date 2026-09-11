import test from "node:test";
import assert from "node:assert/strict";
import { getVisitorInfo, weatherLabel } from "../src/app/lib/visitor.mjs";
const ok = (value) => ({ ok: true, json: async () => value });
test("returns weather and location while keeping browser credentials out of requests", async () => {
  const calls = [];
  const data = await getVisitorInfo(async (url, opts) => {
    calls.push({ url, opts });
    return url.includes("freeipapi")
      ? ok({
          ipAddress: "192.0.2.1",
          cityName: "Paris",
          countryName: "France",
          latitude: 48.8566,
          longitude: 2.3522,
        })
      : ok({ current: { temperature_2m: 0, weather_code: 0 } });
  }, new AbortController().signal);
  assert.deepEqual(data.weather, { temperature: 0, code: 0 });
  assert.equal(data.location, "Paris, France");
  assert.equal(calls[1].url.includes("latitude=48.86"), true);
  assert.equal(calls[0].opts.credentials, "omit");
});
test("retains location and IP when weather fails", async () => {
  const data = await getVisitorInfo(async (url) => {
    if (url.includes("freeipapi"))
      return ok({
        ipAddress: "192.0.2.1",
        cityName: "Paris",
        latitude: 48,
        longitude: 2,
      });
    throw new Error("offline");
  }, new AbortController().signal);
  assert.equal(data.ip, "192.0.2.1");
  assert.equal(data.location, "Paris");
  assert.equal(data.weather, null);
});
test("falls back to IP only if location is unavailable", async () => {
  const data = await getVisitorInfo(
    async (url) =>
      url.includes("freeipapi")
        ? ok({ success: false })
        : ok({ ip: "2001:db8::1" }),
    new AbortController().signal,
  );
  assert.equal(data.ip, "2001:db8::1");
  assert.equal(data.location, null);
  assert.equal(data.weather, null);
});
test("does not invent location or weather when services fail", async () => {
  const data = await getVisitorInfo(async () => {
    throw new Error("offline");
  }, new AbortController().signal);
  assert.deepEqual(data, { ip: null, location: null, weather: null });
});
test("weather conditions translate including zero code and unknown values", () => {
  assert.equal(weatherLabel(0, "fr"), "Ciel dégagé");
  assert.equal(weatherLabel(95, "en"), "Thunderstorm");
  assert.equal(weatherLabel(999, "fr"), "Conditions inconnues");
});
