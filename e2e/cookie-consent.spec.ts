import { test, expect, type Page } from "@playwright/test";

// Bandeau cookies (CNIL) : aucune requête Google avant « Accepter », choix mémorisé et réversible.
const PRIVACY = "/confidentialite";
const GOOGLE =
  /googletagmanager\.com|google-analytics\.com|analytics\.google\.com|doubleclick\.net/;

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

function recordGoogleRequests(page: Page): string[] {
  const seen: string[] = [];
  page.on("request", (request) => {
    if (GOOGLE.test(request.url())) seen.push(request.url());
  });
  return seen;
}

async function scrollAndWait(page: Page) {
  // Défilement et clavier déclenchent les chargements différés : sans consentement, rien ne part.
  await page.mouse.wheel(0, 800);
  await page.keyboard.press("Shift");
  await page.waitForTimeout(5_000);
}

test("no Google request before consent, and the refusal is remembered", async ({ page }) => {
  const google = recordGoogleRequests(page);
  await page.goto("/");
  const banner = page.getByRole("region", { name: "Consentement aux cookies" });
  await expect(banner).toBeVisible();
  await expect(banner.getByRole("link", { name: "En savoir plus" })).toHaveAttribute(
    "href",
    PRIVACY,
  );
  await scrollAndWait(page);
  expect(google).toEqual([]);
  expect(await page.evaluate(() => typeof (window as unknown as { gtag?: unknown }).gtag)).toBe(
    "function",
  );

  await banner.getByRole("button", { name: "Refuser", exact: true }).click();
  await expect(banner).toBeHidden();
  await page.reload();
  await scrollAndWait(page);
  await expect(banner).toBeHidden();
  expect(google).toEqual([]);
  const cookies = await page.context().cookies();
  expect(cookies.find((cookie) => cookie.name === "cookie_consent")?.value).toBe("denied");
  expect(cookies.some((cookie) => cookie.name.startsWith("_ga"))).toBe(false);
});

test("acceptance is remembered and « Gérer les cookies » reopens the banner", async ({ page }) => {
  await page.goto("/");
  const banner = page.getByRole("region", { name: "Consentement aux cookies" });
  await banner.getByRole("button", { name: "Accepter", exact: true }).click();
  await expect(banner).toBeHidden();
  const granted = await page.evaluate(() =>
    ((window as unknown as { dataLayer: ArrayLike<unknown>[] }).dataLayer || []).some(
      (entry) =>
        entry[0] === "consent" &&
        entry[1] === "update" &&
        (entry[2] as { analytics_storage?: string }).analytics_storage === "granted",
    ),
  );
  expect(granted).toBe(true);

  await page.reload();
  await expect(banner).toBeHidden();
  await page.getByRole("button", { name: "Gérer les cookies", exact: true }).click();
  await expect(banner).toBeVisible();
  await expect(banner).toBeFocused();
  await banner.getByRole("button", { name: "Refuser", exact: true }).click();
  await expect(banner).toBeHidden();
  const cookies = await page.context().cookies();
  expect(cookies.find((cookie) => cookie.name === "cookie_consent")?.value).toBe("denied");
});
