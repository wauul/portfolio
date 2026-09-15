import { createHash } from "node:crypto";
export const CONTACT_RECIPIENT = "waelfezari@gmail.com";
const EMAIL = /^[^\s@<>\r\n]+@[^\s@<>\r\n]+\.[^\s@<>\r\n]+$/;
export function validateContact(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const data = Object.fromEntries(
    ["name", "email", "phone", "message", "website", "submissionId"].map(
      (k) => [k, typeof input[k] === "string" ? input[k].trim() : ""],
    ),
  );
  if (
    data.website ||
    data.name.length < 2 ||
    data.name.length > 80 ||
    /[\r\n\x00-\x1f]/.test(data.name) ||
    !EMAIL.test(data.email) ||
    data.email.length > 254 ||
    (data.phone &&
      (!/^[+\d\s().-]{6,40}$/.test(data.phone) || /[\r\n]/.test(data.phone))) ||
    data.message.length < 20 ||
    data.message.length > 5000 ||
    !/^[a-f0-9-]{36}$/i.test(data.submissionId)
  )
    return null;
  return data;
}
// Lightweight burst protection per server instance; no raw IPs or message content are stored.
export function createLimiter() {
  const hits = new Map();
  return (key) => {
    const now = Date.now();
    for (const [k, v] of hits) if (v.until < now) hits.delete(k);
    const previous = hits.get(key);
    if (previous && previous.count >= 4) return false;
    if (hits.size >= 10000 && !previous) return false;
    hits.set(key, {
      count: (previous?.count || 0) + 1,
      until: previous?.until || now + 600000,
    });
    return true;
  };
}
const limiter = createLimiter();
const reply = (status, code) =>
  Response.json(
    { ok: status === 200, code },
    { status, headers: { "Cache-Control": "no-store" } },
  );
export async function handleContact(
  request,
  { apiKey, from, fetcher = fetch, allow = limiter } = {},
) {
  const origin = request.headers.get("origin");
  const target = new URL(request.url);
  // Next.js can normalize the internal request URL to localhost behind its proxy.
  const host = request.headers.get("host") || target.host;
  const protocol =
    request.headers.get("x-forwarded-proto") || target.protocol.slice(0, -1);
  const publicOrigin = protocol + "://" + host;
  if (!origin || origin !== publicOrigin) return reply(403, "origin");
  if (!request.headers.get("content-type")?.includes("application/json"))
    return reply(415, "format");
  const identity = createHash("sha256")
    .update(
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        "unknown",
    )
    .digest("hex");
  if (!allow(identity)) return reply(429, "rate_limit");
  let input;
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply(400, "validation");
    const chunks = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 20000) {
        await reader.cancel();
        return reply(413, "too_large");
      }
      chunks.push(value);
    }
    input = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return reply(400, "validation");
  }
  const data = validateContact(input);
  if (!data) return reply(400, "validation");
  if (!apiKey || !from) return reply(503, "unconfigured");
  const body = {
    from,
    to: [CONTACT_RECIPIENT],
    reply_to: data.email,
    subject: `Portfolio WF — ${data.name}`,
    text: `Nouveau message depuis le portfolio WF\n\nNom : ${data.name}\nEmail : ${data.email}\nTéléphone : ${data.phone || "Non renseigné"}\n\nMessage :\n${data.message}`,
  };
  const fingerprint = createHash("sha256")
    .update(JSON.stringify(body))
    .digest("hex");
  try {
    const result = await fetcher("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `contact-${data.submissionId}-${fingerprint}`,
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(15000),
    });
    const response = await result.json();
    if (!result.ok || typeof response.id !== "string") {
      console.error(
        "Contact provider rejected request:",
        result.status,
        response.name,
      );
      return reply(502, "delivery");
    }
    return reply(200, "sent");
  } catch (error) {
    console.error(
      "Contact provider connection failed:",
      error.name,
      error.cause?.code || "",
    );
    return reply(502, "delivery");
  }
}
