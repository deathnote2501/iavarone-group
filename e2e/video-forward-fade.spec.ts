import { expect, test } from '@playwright/test'

test.beforeEach(async ({ context }) => {
  await context.route('**/widget.js', (route) => route.fulfill({ status: 200, body: '' }))
  await context.route('https://www.googletagmanager.com/**', (route) =>
    route.fulfill({ status: 200, body: '' })
  )
  await context.addCookies([
    { name: 'cookie_consent', value: 'denied', domain: 'localhost', path: '/' },
  ])
})

test('fades to the first frame and repeats only the forward half over several loops', async ({
  page,
}) => {
  await page.goto('/')
  const video = page.getByTestId('immersive-video')
  await expect
    .poll(() => video.evaluate((media: HTMLVideoElement) => media.currentTime))
    .toBeGreaterThan(0.2)
  await video.evaluate((media: HTMLVideoElement) => {
    media.dataset.restarts = '0'
    media.dataset.latestFrame = '0'
    media.dataset.fadeSamples = '[]'
    media.addEventListener('seeked', () => {
      if (media.currentTime < 1) media.dataset.restarts = String(Number(media.dataset.restarts) + 1)
    })
    const sample = (_now: number, metadata: VideoFrameCallbackMetadata) => {
      media.dataset.latestFrame = String(
        Math.max(Number(media.dataset.latestFrame), metadata.mediaTime)
      )
      if (metadata.mediaTime >= 9 && metadata.mediaTime < 10) {
        const samples = JSON.parse(media.dataset.fadeSamples!)
        samples.push({ time: metadata.mediaTime, opacity: Number(getComputedStyle(media).opacity) })
        media.dataset.fadeSamples = JSON.stringify(samples)
      }
      media.requestVideoFrameCallback(sample)
    }
    media.requestVideoFrameCallback(sample)
  })
  for (let cycle = 1; cycle <= 3; cycle++) {
    await video.evaluate((media) => {
      media.dataset.fadeSamples = '[]'
    })
    await video.evaluate((media: HTMLVideoElement) => {
      media.currentTime = 9.4
    })
    await expect
      .poll(() => video.evaluate((media) => Number(getComputedStyle(media).opacity)))
      .toBeLessThan(0.7)
    await expect.poll(() => video.getAttribute('data-restarts')).toBe(String(cycle))
    expect(await video.evaluate((media: HTMLVideoElement) => media.currentTime)).toBeLessThan(2)
    await expect
      .poll(() => video.evaluate((media) => Number(getComputedStyle(media).opacity)))
      .toBeGreaterThan(0.9)
    expect(await video.evaluate((media: HTMLVideoElement) => media.paused)).toBe(false)
    expect(Number(await video.getAttribute('data-latest-frame'))).toBeGreaterThan(9)
    expect(Number(await video.getAttribute('data-latest-frame'))).toBeLessThanOrEqual(10.1)
    const samples: { time: number; opacity: number }[] = JSON.parse(
      (await video.getAttribute('data-fade-samples'))!
    )
    const fading = samples.filter((sample) => sample.opacity > 0 && sample.opacity < 1)
    expect(
      new Set(fading.map((sample) => sample.opacity)).size,
      'several intermediate values prove a gradual fade'
    ).toBeGreaterThan(3)
    expect(fading.at(-1)!.opacity).toBeLessThan(fading[0]!.opacity - 0.1)
    expect(
      await page.locator('.video-hero-copy').evaluate((element) => getComputedStyle(element).opacity)
    ).toBe('1')
  }
})

test('voluntary pause freezes the fade and resumes the forward loop without revealing reverse frames', async ({
  page,
}) => {
  await page.goto('/')
  const video = page.getByTestId('immersive-video')
  await expect
    .poll(() => video.evaluate((media: HTMLVideoElement) => media.currentTime))
    .toBeGreaterThan(0.2)
  await video.evaluate((media: HTMLVideoElement) => {
    media.currentTime = 9.4
  })
  await expect
    .poll(() => video.evaluate((media) => Number(getComputedStyle(media).opacity)))
    .toBeLessThan(0.7)
  await page.getByRole('button', { name: 'Mettre en pause l’animation', exact: true }).click()
  const paused = await video.evaluate((media: HTMLVideoElement) => ({
    time: media.currentTime,
    opacity: media.style.opacity,
  }))
  await page.waitForTimeout(450)
  const stillPaused = await video.evaluate((media: HTMLVideoElement) => ({
    time: media.currentTime,
    opacity: media.style.opacity,
  }))
  expect(stillPaused).toEqual(paused)
  await page.getByRole('button', { name: 'Reprendre l’animation', exact: true }).click()
  await expect
    .poll(() => video.evaluate((media: HTMLVideoElement) => media.currentTime))
    .toBeLessThan(2)
  await expect
    .poll(() => video.evaluate((media) => Number(getComputedStyle(media).opacity)))
    .toBeGreaterThan(0.9)
})


for (const height of [720, 770, 820]) {
 test(`pause remains clickable beside the chatbot at 1280x${height}`, async ({ page }) => {
  await page.setViewportSize({ width: 1280, height });
  await page.goto('/');
  const video = page.getByTestId('immersive-video');
  await expect.poll(() => video.evaluate((media: HTMLVideoElement) => media.currentTime)).toBeGreaterThan(0.2);
  await page.evaluate(() => {
    const panel = document.createElement('aside');
    panel.style.cssText = 'position:fixed;right:20px;bottom:88px;width:380px;height:560px;z-index:2147483000;background:white';
    document.body.append(panel);
  });
  await page.getByRole('button', { name: 'Mettre en pause l’animation', exact: true }).click();
  await expect.poll(() => video.evaluate((media: HTMLVideoElement) => media.paused)).toBe(true);
});

}
