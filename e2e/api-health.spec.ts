import { test, expect } from "@playwright/test";

// GET /api/health: deployment probe (status, revision, environment).
// Discovered by test:smoke and therefore by npm run verify.

test("GET /api/health answers 200 JSON, uncached and not indexable", async ({ request }) => {
  const response = await request.get("/api/health");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/json");
  expect(response.headers()["cache-control"]).toBe("no-store");
  expect(response.headers()["x-robots-tag"]).toContain("noindex");
});

test("GET /api/health body has exactly status, sha and env", async ({ request }) => {
  const response = await request.get("/api/health");
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(Object.keys(body).sort()).toEqual(["env", "sha", "status"]);
  expect(body.status).toBe("ok");
  expect(typeof body.sha).toBe("string");
  expect(body.sha.length).toBeGreaterThan(0);
  expect(typeof body.env).toBe("string");
  expect(body.env.length).toBeGreaterThan(0);
});

test("/sitemap.xml does not list /api/health", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  expect(await response.text()).not.toContain("/api/health");
});
