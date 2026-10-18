import { test, expect, type Locator } from "@playwright/test";

const videoSelector = ".group-immersive-video";
const posterSelector = 'img[src="/brand-v2/group-auvergne-immersive.webp"]';

async function expectPlayback(video: Locator) {
  await expect(video).toHaveJSProperty("paused", false);
  const start = await video.evaluate((element: HTMLVideoElement) => element.currentTime);
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.currentTime)).toBeGreaterThan(start);
}

async function expectLoadedPoster(poster: Locator) {
  await expect(poster).toBeVisible();
  await expect.poll(() => poster.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
}

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.route("https://chat.iavarone-group.fr/**", (route) => route.fulfill({ status: 200, body: "" }));
});

test("a failed local media request leaves a visible loaded illustration", async ({ page }) => {
  await page.route("**/brand-v2/group-auvergne-immersive.mp4", (route) => route.abort("failed"));
  await page.goto("/");
  await expectLoadedPoster(page.locator(posterSelector));
  await expect(page.getByText("Illustration générée par IA", { exact: true })).toBeVisible();
});

test("the illustration remains available without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(baseURL!);
  await expectLoadedPoster(page.locator(posterSelector));
  await context.close();
});

test("document visibility pauses playback and respects a voluntary pause on return", async ({ page }) => {
  await page.goto("/");
  const video = page.locator(videoSelector);
  await expectPlayback(video);
  // Drive the browser visibility event explicitly: headless tabs do not reliably
  // become hidden when a second tab is brought to the front.
  const visibility = async (hidden: boolean) => {
    await page.evaluate((hidden) => {
      Object.defineProperty(document, "hidden", { configurable: true, get: () => hidden });
      Object.defineProperty(document, "visibilityState", { configurable: true, get: () => hidden ? "hidden" : "visible" });
      document.dispatchEvent(new Event("visibilitychange"));
    }, hidden);
  };
  await visibility(true);
  await expect(video).toHaveJSProperty("paused", true);
  const stopped = await video.evaluate((element: HTMLVideoElement) => element.currentTime);
  await page.waitForTimeout(250);
  expect(await video.evaluate((element: HTMLVideoElement) => element.currentTime)).toBeCloseTo(stopped, 1);
  await visibility(false);
  await expectPlayback(video);
  await page.getByRole("button", { name: /mettre en pause/i }).click();
  await visibility(true);
  await visibility(false);
  await expect(video).toHaveJSProperty("paused", true);
  await expect(page.getByRole("button", { name: /reprendre|lancer/i })).toBeVisible();
});

test("the local looping animation lasts twenty seconds and contains no audio track", async ({ page }) => {
  await page.goto("/");
  const video = page.locator(videoSelector);
  await expectPlayback(video);
  await expect(video).toHaveJSProperty("loop", true);
  const media = await video.evaluate((element: HTMLVideoElement) => {
    const stream = (element as HTMLVideoElement & { captureStream(): MediaStream }).captureStream();
    const audioTracks = stream.getAudioTracks().length;
    stream.getTracks().forEach((track) => track.stop());
    return { duration: element.duration, audioTracks };
  });
  expect(media.duration).toBeGreaterThanOrEqual(19.5);
  expect(media.duration).toBeLessThanOrEqual(20.5);
  expect(media.audioTracks).toBe(0);
});
