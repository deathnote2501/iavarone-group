import { test, expect } from "@playwright/test";

test.use({ javaScriptEnabled: false });

test("formation-ia/annecy: title, H1, zone d'intervention and elision", async ({ page }) => {
  await page.goto("/formation-ia/annecy");
  await expect(page).toHaveTitle(/Formation IA générative à Annecy et Grand Annecy/);
  await expect(page.locator("h1")).toHaveText("Formation IA générative à Annecy et Grand Annecy");
  const zone = page.locator("section", { has: page.getByRole("heading", { name: "Zone d'intervention : Annecy et Grand Annecy" }) });
  for (const c of ["Annecy-le-Vieux", "Seynod", "Cran-Gevrier", "Meythet", "Pringy", "Argonay", "Épagny Metz-Tessy", "Sévrier"]) {
    await expect(zone).toContainText(c);
  }
  const text = await page.locator("main").innerText();
  expect(text).toContain("entreprises d'Annecy");
  expect(text).not.toContain("de Annecy");
});

test("elision does not alter consonant cities; zone only on Annecy", async ({ page }) => {
  await page.goto("/formation-ia/lyon");
  const text = await page.locator("main").innerText();
  expect(text).toContain("entreprises de Lyon");
  await expect(page.getByRole("heading", { name: /Zone d'intervention/ })).toHaveCount(0);
});

test("sitemap gives a lastmod to formation-ia/annecy only", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  const entry = (u: string) => xml.split("<url>").find((b) => b.includes(`<loc>${u}</loc>`)) ?? "";
  expect(entry("https://iavarone-group.fr/formation-ia/annecy")).toContain("<lastmod>2026-11-04");
  expect(entry("https://iavarone-group.fr/formation-ia/lyon")).not.toContain("<lastmod>");
});
