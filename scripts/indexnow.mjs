#!/usr/bin/env node
/**
 * IndexNow submission — pings IndexNow & Yandex to (re)crawl every URL of the site.
 *
 * The key is PUBLIC by design: it is hosted at
 *   https://iavarone-group.fr/<KEY>.txt
 * so there is no secret to manage. The same value lives in public/<KEY>.txt.
 *
 * URLs are read from the live sitemap.xml (single source of truth, no
 * duplication of the route list).
 *
 * Run `npm run indexnow` after verifying the live production deployment.
 * Never run during build: the public sitemap still describes the previous deployment.
 * It is skipped on Vercel preview/development deployments.
 */

const KEY = "c6de8b183ec207707ab4df961b885cf9";
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://iavarone-group.fr").replace(/\/$/, "");
const HOST = new URL(SITE_URL).host;
const KEY_LOCATION = `${SITE_URL}/${KEY}.txt`;
const ENDPOINTS = ["https://api.indexnow.org/IndexNow", "https://yandex.com/indexnow"];
const REQUEST_TIMEOUT_MS = 15_000;

async function main() {
  // On Vercel, only submit for production deployments (skip preview/dev builds).
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
    console.log(`[indexnow] skipped — VERCEL_ENV=${process.env.VERCEL_ENV}`);
    return;
  }

  // 1. Verify the production deployment serves the exact key before submitting.
  try {
    const keyResponse = await fetch(KEY_LOCATION, {
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (!keyResponse.ok) {
      throw new Error(`HTTP ${keyResponse.status}`);
    }
    if (await keyResponse.text() !== KEY) {
      throw new Error("response body does not exactly match the key");
    }
  } catch (err) {
    throw new Error(`key verification failed at ${KEY_LOCATION}: ${err?.message || err}; wait for the production deployment to finish before retrying`);
  }

  // 2. Read the URL list from the live sitemap.
  const sitemapUrl = `${SITE_URL}/sitemap.xml`;
  const res = await fetch(sitemapUrl, {
    headers: { "User-Agent": "indexnow-bot" },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  if (!res.ok) {
    throw new Error(`could not fetch ${sitemapUrl} — HTTP ${res.status}`);
  }
  const xml = await res.text();
  const urlList = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)]
    .map((m) => m[1].trim())
    .filter((u) => u.startsWith(SITE_URL));

  if (urlList.length === 0) {
    throw new Error("no <loc> URLs found in sitemap — nothing to submit");
  }

  // 3. Submit the same batch independently to both endpoints.
  const body = JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList });
  let accepted = false;
  for (const endpoint of ENDPOINTS) {
    try {
      const submit = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body,
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });

      if (submit.status === 200 || submit.status === 202) {
        accepted = true;
        console.log(`[indexnow] ${endpoint} — HTTP ${submit.status}: submitted ${urlList.length} URLs`);
      } else {
        console.error(`[indexnow] ${endpoint} — HTTP ${submit.status}: rejected ${JSON.stringify(await submit.text())}`);
      }
    } catch (err) {
      console.error(`[indexnow] ${endpoint} — network error: ${JSON.stringify(err?.message || String(err))}`);
    }
  }
  process.exitCode = accepted ? 0 : 1;
}

main().catch((err) => {
  console.error("[indexnow] error:", err?.message || err);
  process.exitCode = 1;
});
