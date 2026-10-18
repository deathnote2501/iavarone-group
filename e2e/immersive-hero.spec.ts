import { test, expect, type Locator, type Page } from "@playwright/test";

const videoSelector = ".group-immersive-video";

async function expectPlayback(video: Locator) {
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.paused)).toBe(false);
  const start = await video.evaluate((element: HTMLVideoElement) => element.currentTime);
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.currentTime)).toBeGreaterThan(start);
}

async function leaveAndReturn(page: Page, video: Locator) {
  await page.locator("footer").scrollIntoViewIfNeeded();
  await expect(video).not.toBeInViewport();
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.paused)).toBe(true);
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(video).toBeInViewport();
}

test.beforeEach(async ({ page }) => {
  await page.route("https://chat.iavarone-group.fr/**", (route) => route.fulfill({ status: 200, body: "" }));
});

for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
  test(`immersive banner, original title and primary CTA share the initial ${viewport.width}px viewport`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("main h1")).toHaveText("L'IA générative au service des entreprises, organisations et indépendants.");
    await expect(page.locator("main h1")).toBeInViewport({ ratio: 1 });
    const cta = page.getByRole("link", { name: "Trouver le bon point de départ" });
    await expect(cta).toBeInViewport({ ratio: 1 });
    const video = page.locator(videoSelector);
    await expect(video).toBeVisible();
    const visibleHeight = await video.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return Math.max(0, Math.min(innerHeight, rect.bottom) - Math.max(0, rect.top));
    });
    expect(visibleHeight).toBeGreaterThanOrEqual(120);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport.width + 1);
  });
}

test("the decorative video plays silently and has an accessible persistent pause control", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const video = page.locator(videoSelector);
  await expect(video).toHaveAttribute("src", "/brand-v2/group-auvergne-immersive.mp4");
  await expect(video).toHaveAttribute("poster", "/brand-v2/group-auvergne-immersive.webp");
  await expect(video).toHaveJSProperty("muted", true);
  await expect(video).toHaveJSProperty("playsInline", true);
  await expect(video).toHaveJSProperty("controls", false);
  await expectPlayback(video);
  const pause = page.getByRole("button", { name: /mettre en pause/i });
  await expect(pause).toBeVisible();
  await pause.click();
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.paused)).toBe(true);
  const pausedTime = await video.evaluate((element: HTMLVideoElement) => element.currentTime);
  await leaveAndReturn(page, video);
  await expect(page.getByRole("button", { name: /reprendre|lancer/i })).toBeVisible();
  await expect(video).toHaveJSProperty("paused", true);
  expect(await video.evaluate((element: HTMLVideoElement) => element.currentTime)).toBeCloseTo(pausedTime, 1);
  await page.getByRole("button", { name: /reprendre|lancer/i }).click();
  await expectPlayback(video);
});

test("leaving the viewport pauses playback and returning resumes automatic playback", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const video = page.locator(videoSelector);
  await expectPlayback(video);
  await leaveAndReturn(page, video);
  await expectPlayback(video);
});

test("the pause control remains usable beside the open desktop chatbot", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const video = page.locator(videoSelector);
  await expectPlayback(video);
  // Reproduce the actual chatbot panel's occupied area without contacting its service.
  await page.evaluate(() => {
    const panel = document.createElement("aside");
    panel.setAttribute("aria-label", "Panneau de conversation ouvert — fixture");
    Object.assign(panel.style, {
      position: "fixed", bottom: "88px", right: "20px", width: "380px",
      height: "560px", zIndex: "2147483000", background: "white",
    });
    document.body.append(panel);
  });
  await expect(page.getByRole("complementary", { name: "Panneau de conversation ouvert — fixture" })).toBeVisible();
  await page.getByRole("button", { name: /mettre en pause/i }).click({ timeout: 3000 });
  await expect(video).toHaveJSProperty("paused", true);
  await expect(page.getByRole("button", { name: /reprendre|lancer/i })).toBeVisible();
});

test("reduced motion shows the loaded poster until explicit playback", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const video = page.locator(videoSelector);
  await expect(video).toBeVisible();
  await expect(video).toHaveAttribute("poster", "/brand-v2/group-auvergne-immersive.webp");
  const poster = await page.request.get("/brand-v2/group-auvergne-immersive.webp");
  expect(poster.status()).toBe(200);
  expect(poster.headers()["content-type"]).toContain("image/webp");
  await expect(video).toHaveJSProperty("paused", true);
  await expect(video).toHaveJSProperty("currentTime", 0);
  await leaveAndReturn(page, video);
  await expect(video).toHaveJSProperty("paused", true);
  await page.getByRole("button", { name: /reprendre|lancer/i }).click();
  await expectPlayback(video);
});
