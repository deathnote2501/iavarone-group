import { test, expect } from "@playwright/test";

for (const width of [390, 1920]) {
  test(`the immersive video reaches both viewport edges without fades at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.route("https://chat.iavarone-group.fr/**", (route) => route.fulfill({ status: 200, body: "" }));
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const video = page.locator(".group-immersive-video");
    await expect(video).toBeVisible();
    const geometry = await video.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return {
        left: rect.left,
        right: rect.right,
        viewport: innerWidth,
        maskImage: style.maskImage,
        filter: style.filter,
        documentWidth: document.documentElement.scrollWidth,
      };
    });
    expect.soft(Math.abs(geometry.left), "video touches the left viewport edge").toBeLessThanOrEqual(1);
    expect.soft(Math.abs(geometry.right - geometry.viewport), "video touches the right viewport edge").toBeLessThanOrEqual(1);
    expect.soft(geometry.maskImage, "no faded video edges").toBe("none");
    expect.soft(geometry.filter, "no video blur").toBe("none");
    expect.soft(geometry.documentWidth, "no horizontal overflow").toBeLessThanOrEqual(geometry.viewport + 1);
  });
}

const introduction = "IAvarone Group est un groupe français d'intelligence artificielle générative fondé en 2020 par Jérôme Iavarone, formateur et consultant IA. Le groupe rassemble des marques B2B complémentaires : formation, conseil, développement d'applications métier, agents IA autonomes, SaaS et e-commerce industriel.";

test("the approved introduction precedes the panorama and identifies its imaginary illustration", async ({ page }) => {
  await page.route("https://chat.iavarone-group.fr/**", (route) => route.fulfill({ status: 200, body: "" }));
  await page.goto("/");
  const paragraph = page.locator(".group-hero-copy > p");
  await expect(paragraph).toHaveText(introduction);
  await expect(paragraph.locator("strong")).toHaveText("IAvarone Group");
  const hero = page.locator(".group-hero-copy");
  const video = page.locator(".group-immersive-video");
  const heroBounds = await hero.boundingBox();
  const videoBounds = await video.boundingBox();
  expect(heroBounds).not.toBeNull();
  expect(videoBounds).not.toBeNull();
  expect(videoBounds!.y).toBeGreaterThanOrEqual(heroBounds!.y + heroBounds!.height);
  await expect(page.getByText("Illustration générée par IA", { exact: true })).toBeVisible();
});
