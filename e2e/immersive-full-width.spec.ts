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
