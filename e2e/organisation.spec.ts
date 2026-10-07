import { test, expect, type Page } from "@playwright/test";

// Lot « preuves agence IA et ERP » (2026-10-07) : page /notre-organisation,
// organigramme compact sur l'accueil et maillage interne.
const PATH = "/notre-organisation";
const CONSEIL_AGENCE = "https://iavarone-conseil.fr/realisations/agence-ia";
const CONSEIL_ERP = "https://iavarone-conseil.fr/realisations/erp-iavarone-conseil";
const EMPLOYE_AGENCE = "https://employe-ia.fr/cas/agence-ia-iavarone-conseil";
const POLES = ["prestations", "produits-saas", "gestion", "systeme-qualite"];

async function openAllDetails(page: Page) {
  await page.evaluate(() =>
    document.querySelectorAll("main details").forEach((d) => d.setAttribute("open", "")),
  );
}

test.describe("server-rendered HTML", () => {
  test.use({ javaScriptEnabled: false });

  test("organisation page: metadata, canonical and sitemap", async ({ page, request }) => {
    const res = await page.goto(PATH);
    expect(res?.status()).toBe(200);
    await expect(page.locator("main h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://iavarone-group.fr${PATH}`,
    );
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{80,}/);
    await expect(page.locator('meta[name="robots"]')).not.toHaveAttribute("content", /noindex/);
    const xml = await (await request.get("/sitemap.xml")).text();
    expect(xml).toContain(`<loc>https://iavarone-group.fr${PATH}</loc>`);
  });

  test("org chart: founder on top, four poles, fourteen agents, readable without JavaScript", async ({
    page,
  }) => {
    await page.goto(PATH);
    const chart = page.locator("[data-org-chart]");
    await expect(chart.getByRole("img", { name: /Jérôme Iavarone/ })).toBeVisible();
    for (const pole of POLES) await expect(chart.locator(`#pole-${pole}`)).toBeVisible();
    const agents = chart.locator("details[data-agent]");
    await expect(agents).toHaveCount(14);
    // Native disclosure: no script needed to read an agent's role.
    const first = agents.first();
    await first.locator("summary").click();
    await expect(first.locator("[data-agent-detail]")).toBeVisible();
    for (const label of ["Mission", "Déclenchement", "Exemple de livrable", "Autonomie et validation"])
      await expect(first.locator("dt", { hasText: label })).toBeVisible();
  });

  test("paused agents are dated configuration, not a live status", async ({ page }) => {
    await page.goto(PATH);
    const paused = page.locator('details[data-agent][data-status="pause"]');
    await expect(paused).toHaveCount(2);
    await expect(page.locator('details[data-agent][data-status="actif"]')).toHaveCount(12);
    await expect(page.locator("[data-org-chart]")).toContainText("7 octobre 2026");
    await expect(page.locator("main")).not.toContainText(/en direct|24\s*h?\s*\/\s*24|24\/7/i);
  });

  test("illustrative ERP scenario is captioned as such", async ({ page }) => {
    await page.goto(PATH);
    const demo = page.locator("figure[data-demo]");
    await expect(demo).toHaveCount(1);
    await expect(demo.locator("figcaption")).toContainText(/illustratif/i);
  });

  test("case studies link to the public studies, never to the private ERP", async ({ page }) => {
    await page.goto(PATH);
    for (const href of [CONSEIL_AGENCE, CONSEIL_ERP, EMPLOYE_AGENCE])
      await expect(page.locator(`main a[href="${href}"]`).first()).toBeVisible();
    await expect(page.locator('a[href*="iac-erp"]')).toHaveCount(0);
  });

  test("final CTA books with an identifiable source", async ({ page }) => {
    await page.goto(PATH);
    const cta = page.locator("[data-org-cta] a", { hasText: /organisation/i }).first();
    const href = new URL((await cta.getAttribute("href"))!);
    expect(`${href.origin}${href.pathname}`).toBe("https://jeromeiavarone.fr/rdv");
    expect(href.searchParams.get("src")).toBe("iavarone-group-cas-agence");
  });

  test("home: compact org chart between expertises and products", async ({ page }) => {
    await page.goto("/");
    const order = await page.evaluate(() => {
      const pos = (sel: string) => {
        const el = document.querySelector(sel);
        return el ? el.getBoundingClientRect().top + scrollY : -1;
      };
      return [pos("#activites"), pos("#organisation"), pos('[aria-label="Les produits du groupe"]')];
    });
    expect(order[0]).toBeGreaterThanOrEqual(0);
    expect(order[1]).toBeGreaterThan(order[0]);
    expect(order[2]).toBeGreaterThan(order[1]);
    const section = page.locator("#organisation");
    await expect(section.locator("[data-org-pole]")).toHaveCount(4);
    await expect(section.locator(`a[href="${PATH}"]`).first()).toBeVisible();
  });

  for (const path of ["/a-propos", "/marques/iavarone-conseil", "/agent-ia"]) {
    test(`${path} links to the organisation page`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator(`main a[href="${PATH}"]`).first()).toBeVisible();
    });
  }

  test("main navigation and footer link to the organisation page", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(`nav[aria-label="Navigation mobile"] a[href="${PATH}"]`)).toHaveCount(1);
    await expect(page.locator(`nav[aria-label="Navigation principale"] a[href="${PATH}"]`)).toHaveCount(1);
    await expect(page.locator(`footer a[href="${PATH}"]`)).toHaveCount(1);
  });

  for (const path of ["/", "/a-propos"]) {
    test(`${path} does not claim a brand count contradicting the directory`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator("main")).not.toContainText(/sept (marques|activités|entités)/i);
    });
  }
});

test("keyboard opens an agent card", async ({ page }) => {
  await page.goto(PATH);
  const summary = page.locator("details[data-agent] summary").first();
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("details[data-agent]").first()).toHaveAttribute("open", "");
});

for (const width of [390, 1280, 1440]) {
  test(`no horizontal overflow at ${width}px, every card open`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [PATH, "/"]) {
      await page.goto(path);
      await openAllDetails(page);
      await page.evaluate(() => document.fonts.ready);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
      expect(overflow, `${path} at ${width}px`).toBe(false);
    }
  });
}
