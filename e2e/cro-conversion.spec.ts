import { test, expect, type Page } from "@playwright/test";

// Plan CRO des vitrines (2026-11-17) : mesure des clics de RDV après consentement (emplacement
// typé), bouton de RDV visible dans l'en-tête mobile, ordre RDV puis lien sortant sur les pages
// de service et de ville.
const GOOGLE =
  /googletagmanager\.com|google-analytics\.com|analytics\.google\.com|doubleclick\.net/;
const LOCATIONS = ["header", "hero", "milieu", "fin", "footer", "barre-mobile", "contact"];
const BOOKING_LINKS = 'a[href*="rdv.jeromeiavarone.fr"], a[href^="https://jeromeiavarone.fr/rdv"]';

type TrackedEvent = { name: string; params: Record<string, string> };

test.beforeEach(async ({ context }) => {
  // Rien ne sort vers Google, le chatbot ou l'agenda pendant les tests.
  await context.route(GOOGLE, (route) =>
    route.fulfill({ status: 200, contentType: "application/javascript", body: "" }),
  );
  await context.route("https://chat.iavarone-group.fr/**", (route) =>
    route.fulfill({ status: 200, contentType: "application/javascript", body: "" }),
  );
  await context.route("https://rdv.jeromeiavarone.fr/**", (route) =>
    route.fulfill({ status: 200, contentType: "text/html", body: "<p>Agenda simulé</p>" }),
  );
});

/** Ouvre la page et accepte les cookies : les événements partent ensuite dans le dataLayer de gtag. */
async function openWithConsent(page: Page, path: string) {
  await page.goto(path);
  const banner = page.getByRole("region", { name: "Consentement aux cookies" });
  await banner.getByRole("button", { name: "Accepter", exact: true }).click();
  await expect(banner).toBeHidden();
}

async function trackedEvents(page: Page): Promise<TrackedEvent[]> {
  return page.evaluate(() =>
    ((window as unknown as { dataLayer?: ArrayLike<unknown>[] }).dataLayer || [])
      .filter((entry) => entry[0] === "event")
      .map((entry) => ({
        name: String(entry[1]),
        params: (entry[2] || {}) as Record<string, string>,
      })),
  );
}

async function bookingEvents(page: Page) {
  return (await trackedEvents(page))
    .filter((e) => e.name === "booking_click")
    .map((e) => [e.name, e.params.cta_location, e.params.cta_page]);
}

async function clickAndExpectDialog(page: Page, link: ReturnType<Page["locator"]>) {
  await link.click();
  await expect(
    page.getByRole("dialog", { name: "Prendre rendez-vous avec Jérôme Iavarone" }),
  ).toBeVisible();
}

test("the hero booking link of a service page emits exactly one booking_click from the hero", async ({
  page,
}) => {
  await openWithConsent(page, "/formation-ia");
  const hero = page.locator("main section").first().locator(BOOKING_LINKS);
  await expect(hero).toHaveCount(1);
  const href = new URL((await hero.getAttribute("href"))!);
  expect(href.searchParams.get("src")).toBe("iavarone-group.fr");
  expect(href.searchParams.get("page")).toBe("/formation-ia");
  await clickAndExpectDialog(page, hero);
  expect(await bookingEvents(page)).toEqual([["booking_click", "hero", "/formation-ia"]]);
  // Aucun page_view manuel : seul le `config` de GA4 en envoie un par page vue.
  expect((await trackedEvents(page)).filter((e) => e.name === "page_view")).toEqual([]);
});

for (const service of ["formation-ia", "conseil-ia", "agent-ia"]) {
  test(`/${service} puts the booking link before the brand link and repeats it at the end`, async ({
    page,
  }) => {
    await openWithConsent(page, `/${service}`);
    const hero = page.locator("main section").first();
    const order = await hero.locator("a").evaluateAll((links) =>
      links.map((a) =>
        a.getAttribute("href")?.includes("rdv.jeromeiavarone.fr") ? "rdv" : "autre",
      ),
    );
    expect(order[0]).toBe("rdv");
    expect(order.length).toBeGreaterThan(1);
    const end = page.locator('main a[data-cta="fin"][href*="rdv.jeromeiavarone.fr"]');
    await expect(end).toHaveCount(1);
    await end.scrollIntoViewIfNeeded();
    await clickAndExpectDialog(page, end);
    expect(await bookingEvents(page)).toEqual([["booking_click", "fin", `/${service}`]]);
  });
}

test("the trainer link of a city page comes after the booking link and opens a new tab", async ({
  page,
}) => {
  await page.goto("/formation-ia/clermont-ferrand");
  const hero = page.locator("main section").first();
  const links = await hero.locator("a").evaluateAll((items) =>
    items.map((a) => ({ href: a.getAttribute("href") ?? "", target: a.getAttribute("target") })),
  );
  const booking = links.findIndex((l) => l.href.includes("rdv.jeromeiavarone.fr"));
  const trainer = links.findIndex((l) => l.href.startsWith("https://jeromeiavarone.fr/formation"));
  expect(booking).toBeGreaterThanOrEqual(0);
  expect(trainer).toBeGreaterThan(booking);
  expect(links[trainer]!.target).toBe("_blank");
});

test("the hero booking link of a city page is tracked from the hero", async ({ page }) => {
  await openWithConsent(page, "/conseil-ia/paris");
  const hero = page.locator("main section").first().locator(BOOKING_LINKS);
  await expect(hero).toHaveCount(1);
  await clickAndExpectDialog(page, hero);
  expect(await bookingEvents(page)).toEqual([["booking_click", "hero", "/conseil-ia/paris"]]);
});

test("on a 360 px screen the header shows the booking link without opening the menu", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 760 });
  await openWithConsent(page, "/conseil-ia/paris");
  const header = page.locator("header.group-site-header");
  const booking = header.locator('a[data-cta="header"]');
  await expect(booking).toBeVisible();
  // Logo, bouton et menu tiennent sur une seule ligne, sans débordement horizontal.
  const boxes = await Promise.all(
    [header.locator('a[href="/"]'), booking, header.locator(".group-mobile-menu summary")].map(
      async (l) => (await l.boundingBox())!,
    ),
  );
  for (let i = 1; i < boxes.length; i++) {
    expect(boxes[i]!.x).toBeGreaterThanOrEqual(boxes[i - 1]!.x + boxes[i - 1]!.width);
    expect(Math.abs(boxes[i]!.y + boxes[i]!.height / 2 - (boxes[0]!.y + boxes[0]!.height / 2))).toBeLessThan(4);
  }
  expect(boxes[2]!.x + boxes[2]!.width).toBeLessThanOrEqual(360);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
  // Un seul bouton de RDV dans l'en-tête : le menu n'en répète pas.
  await expect(header.locator(BOOKING_LINKS)).toHaveCount(1);
  await clickAndExpectDialog(page, booking);
  expect(await bookingEvents(page)).toEqual([["booking_click", "header", "/conseil-ia/paris"]]);
});

for (const path of [
  "/",
  "/formation-ia",
  "/conseil-ia/paris",
  "/formation-ia/clermont-ferrand",
  "/contact",
  "/references",
  "/marques/jeromeiavarone",
  "/notre-organisation",
  "/a-propos",
  "/ressources/roi-ia-generative-pme",
]) {
  test(`every booking link of ${path} declares a known location`, async ({ page }) => {
    await page.goto(path);
    const links = page.locator(BOOKING_LINKS);
    expect(await links.count()).toBeGreaterThan(0);
    for (const cta of await links.all()) {
      expect(LOCATIONS, await cta.evaluate((a) => a.outerHTML.slice(0, 160))).toContain(
        await cta.getAttribute("data-cta"),
      );
    }
  });
}
