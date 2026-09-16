import test from "node:test";
import assert from "node:assert/strict";
import {
  handleContact,
  validateContact,
  createLimiter,
  CONTACT_RECIPIENT,
} from "../src/app/lib/contact.mjs";
const good = {
  name: "Camille Test",
  email: "camille@example.com",
  phone: "+33 6 00 00 00 00",
  message: "Bonjour, je souhaite discuter de votre portfolio.",
  website: "",
  submissionId: "550e8400-e29b-41d4-a716-446655440000",
};
const req = (data = good, origin = "https://example.com") =>
  new Request("https://example.com/api/contact", {
    method: "POST",
    headers: { origin, "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
const options = {
  apiKey: "test-only",
  from: "WF <sender@example.com>",
  allow: () => true,
};
test("validates fields and rejects header injection, spam and malformed inputs", () => {
  assert.ok(validateContact(good));
  for (const patch of [
    { name: "X\r\nBcc: bad@example.com" },
    { email: "x\r\n@example.com" },
    { website: "spam" },
    { message: "short" },
    { phone: "abc" },
    { submissionId: "bad" },
  ])
    assert.equal(validateContact({ ...good, ...patch }), null);
  assert.equal(validateContact(null), null);
  assert.ok(validateContact({ ...good, phone: "" }));
});
test("sends only to Wael and sets reply-to, plain text and idempotency", async () => {
  let sent;
  let key;
  const fetcher = async (url, init) => {
    assert.equal(url, "https://api.resend.com/emails");
    sent = JSON.parse(init.body);
    key = init.headers["Idempotency-Key"];
    return Response.json({ id: "confirmed-provider-id" });
  };
  const result = await handleContact(
    req({
      ...good,
      to: "attacker@example.com",
      message: "This <script> is plain text and must not execute.",
    }),
    { ...options, fetcher },
  );
  assert.equal(result.status, 200);
  assert.deepEqual(sent.to, [CONTACT_RECIPIENT]);
  assert.equal(sent.reply_to, good.email);
  assert.ok(sent.text.includes("<script>"));
  assert.equal(sent.html, undefined);
  assert.ok(key.includes(good.submissionId));
});
test("does not claim success without credentials", async () => {
  let called = false;
  const r = await handleContact(req(), {
    allow: () => true,
    fetcher: () => {
      called = true;
    },
  });
  assert.equal(r.status, 503);
  assert.equal(called, false);
  assert.equal((await r.json()).ok, false);
});
test("rejects a different origin before sending", async () => {
  const r = await handleContact(req(good, "https://other.example"), options);
  assert.equal(r.status, 403);
});
test("rejects oversized bodies", async () => {
  const r = await handleContact(
    req({ ...good, message: "x".repeat(21000) }),
    options,
  );
  assert.equal(r.status, 413);
});
test("limits repeated submissions", async () => {
  const allow = createLimiter();
  for (let i = 0; i < 4; i++) assert.equal(allow("test"), true);
  assert.equal(allow("test"), false);
  assert.equal(
    (await handleContact(req(), { ...options, allow: () => false })).status,
    429,
  );
});
test("provider rejection or network failure never reports sent", async () => {
  for (const fetcher of [
    async () => Response.json({ error: "rejected" }, { status: 403 }),
    async () => {
      throw new Error("offline");
    },
    async () => Response.json({}),
  ]) {
    const r = await handleContact(req(), { ...options, fetcher });
    assert.equal(r.status, 502);
    assert.equal((await r.json()).ok, false);
  }
});
test("an identical retry uses the same provider idempotency key", async () => {
  const keys = [];
  const fetcher = async (_, init) => {
    keys.push(init.headers["Idempotency-Key"]);
    return Response.json({ id: "test" });
  };
  await handleContact(req(), { ...options, fetcher });
  await handleContact(req(), { ...options, fetcher });
  assert.equal(keys[0], keys[1]);
});

test("accepts same-origin browser requests when Next normalizes the internal host", async () => {
  const request = new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: {
      origin: "http://127.0.0.1:3000",
      host: "127.0.0.1:3000",
      "content-type": "application/json",
    },
    body: JSON.stringify(good),
  });
  const r = await handleContact(request, {
    ...options,
    fetcher: async () => Response.json({ id: "test" }),
  });
  assert.equal(r.status, 200);
});
