import { test, expect } from "@playwright/test";

// Crawler-visible HTML: the contextual link must be in the server-rendered body.
test.use({ javaScriptEnabled: false });

const HREF = "https://jeromeiavarone.fr/formation-ia-clermont-ferrand";

test("formation-ia/clermont-ferrand links to the trainer site in body text, dofollow", async ({ page }) => {
  await page.goto("/formation-ia/clermont-ferrand");
  const link = page.locator(`main a[href="${HREF}"]`);
  await expect(link).toHaveCount(1);
  await expect(link).toHaveText("formation IA générative à Clermont-Ferrand avec Jérôme Iavarone");
  expect(await link.getAttribute("rel")).toBeNull();
  await expect(page.locator(`main p:has(a[href="${HREF}"])`)).toBeVisible();
});

for (const path of ["/formation-ia/lyon", "/conseil-ia/clermont-ferrand"]) {
  test(`no trainer link on ${path}`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator(`a[href="${HREF}"]`)).toHaveCount(0);
  });
}
