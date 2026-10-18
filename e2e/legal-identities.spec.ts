import { test, expect, type Page } from "@playwright/test";

// Owner-provided identities, checked in public HTML rather than source files.
// This file is discovered by test:smoke and therefore by npm run verify.
test.use({ javaScriptEnabled: false });

const ORGANIZATION = "https://iavarone-group.fr/#organization";
const compact = (value: string) => value.replace(/\s/g, "");
const SAS_NAME = /(?:IAvarone Conseil\s*,?\s*SAS\b|SAS\s+IAvarone Conseil)/;
const BRANDS = [
  "https://jeromeiavarone.fr", "https://iavarone-conseil.fr", "https://employe-ia.fr",
  "https://kaliio.fr", "https://kaliopi.io", "https://rgaa-ia.fr",
  "https://mecaindus.com", "https://crm-ia.fr",
];

interface SchemaNode {
  "@id"?: string;
  "@type"?: string | string[];
  "@graph"?: SchemaNode[];
  name?: string;
  legalName?: string;
  url?: string;
  vatID?: string;
  identifier?: { propertyID: string; value: string };
  address?: { streetAddress: string; postalCode: string; addressLocality: string };
  publisher?: { "@id": string };
  founder?: { "@id": string; name?: string };
  subOrganization?: SchemaNode[];
  parentOrganization?: { "@id": string };
  brand?: { name: string; url: string };
  sameAs?: string[];
}

async function schemas(page: Page): Promise<SchemaNode[]> {
  const raw = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(raw.length).toBeGreaterThan(0);
  return raw.flatMap((text) => {
    const node: SchemaNode = JSON.parse(text);
    return node["@graph"] ?? [node];
  });
}

test("legal notice identifies the SAS alone with the correct registered details", async ({ page }) => {
  await page.goto("/mentions-legales");
  const main = page.locator("main");
  const text = await main.innerText();
  expect.soft(text).toMatch(SAS_NAME);
  expect.soft(text).not.toMatch(/SASU|entreprise individuelle|co[ -]?édit/i);
  expect.soft(compact(text)).not.toContain("489521765");
  expect.soft(text).toMatch(/8\s+T\s+boulevard Léon Malfreyt/);
  expect.soft(text).toMatch(/63000\s+Clermont-Ferrand/);
  expect.soft(text).toMatch(/Capital social\s*:\s*150\s*€/);
  expect.soft(compact(text)).toContain("93221033900010");
  expect.soft(compact(text)).toContain("FR70932210339");
  expect.soft(text).toMatch(/RCS\s*:\s*Clermont-Ferrand\s+932\s*210\s*339/);
  await expect(main.locator('a[href="https://www.pappers.fr/entreprise/iac-iavarone-conseil-932210339"]')).toBeVisible();
  await expect(main.locator('a[href*="iavarone-jerome-489521765"]')).toHaveCount(0);
});

test("privacy policy explicitly names the SAS as data controller", async ({ page }) => {
  await page.goto("/confidentialite");
  // Read the responsible party's paragraph, not an unrelated footer attribution.
  const controller = page.locator("main p").filter({ hasText: /responsable.{0,50}traitement/i });
  await expect(controller).toHaveCount(1);
  await expect(controller).toContainText(SAS_NAME);
  await expect(controller).not.toContainText(/SASU|entreprise individuelle/i);
});

for (const path of ["/mentions-legales", "/confidentialite"]) {
  test(`${path}: corrected page carries the fixed update date`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator("main")).toContainText(/18\s+octobre\s+2026/);
  });
}

for (const width of [390, 1440]) {
  test(`footer attributes publication to SAS alone and keeps legal links (${width}px)`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const footer = page.locator("footer");
    const legalLine = footer.locator("p").filter({ hasText: /Tous droits réservés/ });
    await expect(legalLine).toContainText(SAS_NAME);
    await expect(legalLine).not.toContainText(/SASU|entreprise individuelle|Jérôme Iavarone/);
    await footer.getByRole("link", { name: "Mentions légales", exact: true }).click();
    await expect(page).toHaveURL(/\/mentions-legales$/);
    await expect(page.locator("main h1")).toHaveText("Mentions légales");
    await page.locator("footer").getByRole("link", { name: "Confidentialité", exact: true }).click();
    await expect(page).toHaveURL(/\/confidentialite$/);
    await expect(page.locator("main h1")).toHaveText("Politique de confidentialité");
  });
}

for (const path of ["/", "/mentions-legales", "/confidentialite", "/a-propos"]) {
  test(`${path}: emitted publisher JSON-LD separates group brand from SAS identity`, async ({ page }) => {
    await page.goto(path);
    const nodes = await schemas(page);
    const org = nodes.find((node) => node["@id"] === ORGANIZATION);
    expect(org).toBeDefined();
    expect.soft(org?.name).toBe("IAvarone Group");
    expect.soft(org?.legalName).toMatch(SAS_NAME);
    expect.soft(org?.legalName).not.toMatch(/SASU|individuelle|Jérôme|&/);
    expect.soft(org?.address?.streetAddress).toMatch(/^8\s+T\s+boulevard Léon Malfreyt$/);
    expect.soft(org?.address?.postalCode).toBe("63000");
    expect.soft(org?.address?.addressLocality).toBe("Clermont-Ferrand");
    expect.soft(org?.vatID).toBe("FR70932210339");
    expect.soft(org?.identifier?.propertyID).toBe("SIREN");
    expect.soft(compact(org?.identifier?.value ?? "")).toBe("932210339");
    expect.soft(org?.founder).toMatchObject({ "@id": "https://iavarone-group.fr/#person", name: "Jérôme Iavarone" });
    expect.soft(org?.subOrganization?.map((brand) => brand.url).sort()).toEqual([...BRANDS].sort());
    expect(nodes.find((node) => node["@type"] === "WebSite")?.publisher).toEqual({ "@id": ORGANIZATION });
  });
}

test("EI biography, portrait and historic training brand remain public", async ({ page }) => {
  await page.goto("/a-propos");
  const main = page.locator("main");
  await expect(main).toContainText(/entreprise individuelle de formation/i);
  await expect(main).toContainText("Jérôme Iavarone");
  expect(compact(await main.innerText())).toContain("48952176500052");
  await expect(main.getByRole("img", { name: /Jérôme Iavarone/ }).first()).toBeVisible();
  const person = (await schemas(page)).find((node) => node["@type"] === "Person");
  expect(person?.vatID).toBe("FR51489521765");
  expect(person?.sameAs).toContain("https://www.pappers.fr/entreprise/iavarone-jerome-489521765");
  await page.goto("/marques");
  await expect(page.locator("main")).toContainText(/\bEI\b/);
  await expect(page.locator('main a[href="/marques/jeromeiavarone"]').first()).toBeVisible();
  await page.goto("/marques/jeromeiavarone");
  await expect(page.locator("main")).toContainText(/entreprise individuelle dédiée à la formation/i);
  await expect(page.locator('main a[href="https://jeromeiavarone.fr"]').first()).toBeVisible();
  const trainingBrand = (await schemas(page)).find((node) => node.url === "https://jeromeiavarone.fr" && node.parentOrganization);
  expect(trainingBrand?.parentOrganization).toEqual({ "@id": ORGANIZATION });
  await page.goto("/formation-ia");
  await expect(page.locator("main")).toContainText("partenaires certifiés Qualiopi");
  const service = (await schemas(page)).find((node) => node["@type"] === "Service");
  expect(service?.brand).toMatchObject({ name: "Jérôme Iavarone", url: "https://jeromeiavarone.fr" });
});
