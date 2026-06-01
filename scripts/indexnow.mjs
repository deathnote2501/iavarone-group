#!/usr/bin/env node
/**
 * IndexNow submission — pings Bing & Yandex to (re)crawl every URL of the site.
 *
 * The key is PUBLIC by design: it is hosted at
 *   https://iavarone-group.fr/<KEY>.txt
 * so there is no secret to manage. The same value lives in public/<KEY>.txt.
 *
 * URLs are read from the live sitemap.xml (single source of truth, no
 * duplication of the route list). Brand-new pages added in a deploy are picked
 * up on the following deploy, which is fine for this low-churn vitrine site.
 *
 * Runs automatically at the tail of `next build` (see package.json). It NEVER
 * fails the build: any error is logged and the process exits 0. It is skipped
 * on Vercel preview/development deployments. Run manually with `npm run indexnow`.
 */

const KEY = "2e0a81d35785c6d273c5dddbb5f40650";
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://iavarone-group.fr").replace(/\/$/, "");
const HOST = new URL(SITE_URL).host;
const KEY_LOCATION = `${SITE_URL}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/IndexNow";

async function main() {
  // On Vercel, only submit for production deployments (skip preview/dev builds).
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
    console.log(`[indexnow] skipped — VERCEL_ENV=${process.env.VERCEL_ENV}`);
    return;
  }

  // 1. Read the URL list from the live sitemap.
  const sitemapUrl = `${SITE_URL}/sitemap.xml`;
  const res = await fetch(sitemapUrl, { headers: { "User-Agent": "indexnow-bot" } });
  if (!res.ok) {
    console.error(`[indexnow] could not fetch ${sitemapUrl} — HTTP ${res.status}`);
    return;
  }
  const xml = await res.text();
  const urlList = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)]
    .map((m) => m[1].trim())
    .filter((u) => u.startsWith(SITE_URL));

  if (urlList.length === 0) {
    console.error("[indexnow] no <loc> URLs found in sitemap — nothing to submit");
    return;
  }

  // 2. Submit the batch (IndexNow accepts up to 10 000 URLs per request).
  const body = JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList });
  const submit = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body,
  });

  if (submit.ok) {
    console.log(`[indexnow] ✓ submitted ${urlList.length} URLs (HTTP ${submit.status})`);
  } else {
    console.error(`[indexnow] submission rejected — HTTP ${submit.status}: ${await submit.text()}`);
  }
}

main().catch((err) => {
  console.error("[indexnow] error:", err?.message || err);
  // Never fail the build because of IndexNow.
  process.exit(0);
});
