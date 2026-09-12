import { test, expect } from "@playwright/test";

// Check the crawler-visible HTML, before hydration and without third-party scripts.
test.use({ javaScriptEnabled: false });

for (const path of ["/contact", "/a-propos"]) {
  test(`self canonical on ${path}`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://iavarone-group.fr${path}`);
    await expect(page.locator("h1")).toBeVisible();
  });
}
test("sitemap excludes noindex legal pages", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  expect(xml).not.toContain("/mentions-legales</loc>");
  expect(xml).not.toContain("/confidentialite</loc>");
  expect(xml).toContain("/contact</loc>");
});
test("certification is attributed to partners, not the person", async ({ page }) => {
  await page.goto("/a-propos");
  await expect(page.locator("main")).toContainText("partenaires certifiés Qualiopi");
  await expect(page.locator("main")).not.toContainText("Formateur certifié Qualiopi");
  const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
  for (const raw of schemas) {
    const value = JSON.parse(raw);
    const nodes = value["@graph"] || [value];
    for (const node of nodes) expect(JSON.stringify(node.hasCredential || {})).not.toContain("Qualiopi");
  }
});
