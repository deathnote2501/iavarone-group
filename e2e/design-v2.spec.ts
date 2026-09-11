import { test, expect } from "@playwright/test";
import baseline from "../docs/5-sources/design-v2-before-all.json";

test.beforeEach(async ({ page }) => {
  await page.route("**/api/contact", (route) => route.abort());
  await page.route("https://chat.iavarone-group.fr/**", (route) =>
    route.fulfill({ status: 200, body: "" }),
  );
});

for (const width of [360, 768, 1440]) {
  test(`81 pages without overflow at ${width}px, with their indexing rules`, async ({
    page,
  }) => {
    test.setTimeout(240_000);
    await page.setViewportSize({ width, height: 900 });
    for (const expected of baseline.pages) {
      const response = await page.goto(expected.path, {
        waitUntil: "domcontentloaded",
      });
      expect(response?.status(), expected.path).toBe(200);
      await expect(page.locator("main h1"), expected.path).toHaveCount(1);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        expected.meta.robots,
      );
      await page.evaluate(() => document.fonts.ready);
      const overflowing = await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth + 1,
      );
      expect(
        overflowing,
        `Horizontal overflow: ${expected.path} at ${width}px`,
      ).toBe(false);
    }
  });
}

test("the approved panorama loads and the original video remains available on request", async ({
  page,
}) => {
  await page.goto("/");
  const photo = page.locator(".group-panorama img");
  await expect(photo).toBeVisible();
  await expect
    .poll(() =>
      photo.evaluate(
        (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
      ),
    )
    .toBe(true);
  await expect(page.locator("video")).not.toHaveAttribute("autoplay");
  await page.locator(".group-video summary").click();
  await expect(page.locator("video")).toBeVisible();
  await expect(page.locator("video")).toHaveAttribute("controls");
  await expect(page.locator("video")).toHaveAttribute("src", "/hero-video.mp4");
});

test("all four orientation paths work without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(
    "http://localhost:" + (process.env.PORT || 3100) + "/marques",
  );
  await expect(page.locator(".group-path")).toHaveCount(4);
  const links = await page
    .locator(".group-path a")
    .evaluateAll((items) => items.map((item) => item.getAttribute("href")));
  expect(links).toEqual([
    "/marques/jeromeiavarone",
    "/marques/iavarone-conseil",
    "/marques/employe-ia",
    "/marques/crm-ia",
  ]);
  for (const href of links)
    expect((await page.request.get(href!)).status()).toBe(200);
  await context.close();
});

test("keyboard skip link and complete mobile navigation", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.locator(".group-skip")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main-content$/);
  await page.locator(".group-mobile-menu summary").click();
  const nav = page.getByRole("navigation", { name: "Navigation mobile" });
  await expect(nav).toBeVisible();
  await expect(nav.getByRole("link")).toHaveCount(9);
  await nav.getByRole("link", { name: "Marques", exact: true }).click();
  await expect(page).toHaveURL(/\/marques$/);
  await expect(nav).not.toBeVisible();
});

test("contact channels and tracked booking dialog are preserved", async ({
  page,
}) => {
  await page.route("https://rdv.jeromeiavarone.fr/**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "text/html",
      body: "<p>Booking stub: no appointment created</p>",
    }),
  );
  await page.goto("/contact");
  await expect(page.locator('main a[href^="tel:"]')).toHaveCount(1);
  await expect(page.locator('main a[href^="mailto:"]')).toHaveCount(1);
  await page.getByRole("link", { name: /^Prendre RDV Réservez/ }).click();
  const dialog = page.getByRole("dialog", {
    name: "Prendre rendez-vous avec Jérôme Iavarone",
  });
  await expect(dialog).toBeVisible();
  const src = await dialog.locator("iframe").getAttribute("src");
  expect(src).toContain("https://rdv.jeromeiavarone.fr/");
  expect(src).toContain("page=%2Fcontact");
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
});

test("existing permanent redirects remain active", async ({ request }) => {
  for (const [from, to] of [
    ["/activites", "/marques"],
    [
      "/ressources/financer-formation-ia-opco-cpf",
      "/ressources/financer-formation-ia-opco",
    ],
  ]) {
    const response = await request.get(from, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toContain(to);
  }
});

test("social preview images render for group, service and city", async ({
  page,
  request,
}) => {
  for (const route of ["/", "/formation-ia", "/conseil-ia/lyon"]) {
    await page.goto(route);
    const image = await page
      .locator('meta[property="og:image"]')
      .first()
      .getAttribute("content");
    const url = new URL(image!);
    const response = await request.get(url.pathname + url.search);
    expect(response.status(), route).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");
    expect((await response.body()).length).toBeGreaterThan(10000);
  }
});
