import assert from "node:assert/strict";
import test from "node:test";

import { personalProjects } from "../src/app/lib/personal-projects.js";

test("every personal project has a distinct secure live URL", () => {
  const liveUrls = personalProjects.map((project) => project.live);

  assert.equal(liveUrls.length, 9);
  assert.equal(new Set(liveUrls).size, liveUrls.length);
  liveUrls.forEach((url) => assert.equal(new URL(url).protocol, "https:"));
});

test("GetRatchet exposes its public app without a private repository link", () => {
  const project = personalProjects.find((entry) => entry.id === "getratchet");

  assert.ok(project);
  assert.equal(project.live, "https://getratchet.app");
  assert.equal(project.github, undefined);
});
