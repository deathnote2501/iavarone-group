#!/usr/bin/env node
/**
 * DataForSEO — Audit de la grille programmatique [service]/[city].
 *
 * Pour chaque combo service × ville (3 × 17 = 51 pages), on interroge plusieurs
 * formulations RÉELLES de la requête (pas le slug technique) via l'endpoint
 * Google Ads `search_volume` (live). On retient le volume MAX sur les variantes
 * comme signal d'intention de recherche locale, puis on attribue un verdict :
 *
 *   volume max / mois        verdict          action SEO recommandée
 *   ─────────────────        ───────          ───────────────────────
 *   >= 50                    index-priority   page riche, sitemap priorité 0.9
 *   20–49                    index            page riche, priorité 0.7
 *   1–19                     index-low        garder, priorité 0.4
 *   0 / null (petite ville)  noindex          robots:noindex + hors sitemap
 *   0 / null (grande ville)  review           data Ads manquante → arbitrage humain
 *
 * Sortie : table console groupée par service + JSON dans data/keyword-audit.json
 * (consommé ensuite par src/lib/seo-volumes.ts pour piloter robots + sitemap).
 *
 * Auth DataForSEO = Basic base64("<login>:<password>").
 *   - password : env DATAFORSEO_API_KEY (Doppler projet `jeffrey`, config `dev`)
 *   - login    : env DATAFORSEO_LOGIN (défaut : jerome.iavarone@gmail.com)
 *
 * Lancement :
 *   doppler run -p jeffrey -c dev -- node scripts/dfs/keyword-audit.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");

// --- Auth ------------------------------------------------------------------
const LOGIN = process.env.DATAFORSEO_LOGIN || "jerome.iavarone@gmail.com";
const PASSWORD = process.env.DATAFORSEO_API_KEY;
if (!PASSWORD) {
  console.error("[dfs] DATAFORSEO_API_KEY manquant. Lance via: doppler run -p jeffrey -c dev -- node scripts/dfs/keyword-audit.mjs");
  process.exit(1);
}
const AUTH = "Basic " + Buffer.from(`${LOGIN}:${PASSWORD}`).toString("base64");

// France + français (codes DataForSEO).
const LOCATION_CODE = 2250; // France
const LANGUAGE_CODE = "fr";
const ENDPOINT = "https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live";

// --- Source de vérité : on lit les villes depuis src/lib/site.ts -----------
// (extraction par regex pour ne jamais désynchroniser la liste de villes).
function loadCities() {
  const src = readFileSync(join(ROOT, "src/lib/site.ts"), "utf8");
  // On démarre après `export const CITIES` pour ignorer les slugs de BRANDS.
  const block = src.slice(src.indexOf("export const CITIES"));
  const cities = [];
  const re = /slug:\s*"([^"]+)",\s*\n\s*name:\s*"([^"]+)",/g;
  let m;
  while ((m = re.exec(block)) !== null) cities.push({ slug: m[1], name: m[2] });
  return cities;
}

// Gabarits de requêtes par service. {city} = nom affiché de la ville.
// L'ordre n'importe pas : on prend le max de volume sur l'ensemble.
const SERVICES = {
  "formation-ia": {
    label: "Formation IA",
    templates: [
      "formation IA {city}",
      "formation intelligence artificielle {city}",
      "formation ChatGPT {city}",
      "formation IA entreprise {city}",
    ],
  },
  "conseil-ia": {
    label: "Conseil IA",
    templates: [
      "consultant IA {city}",
      "consultant intelligence artificielle {city}",
      "conseil IA {city}",
      "agence IA {city}",
    ],
  },
  "agent-ia": {
    label: "Agent IA",
    templates: [
      "agent IA {city}",
      "automatisation IA {city}",
      "chatbot entreprise {city}",
      "agent IA entreprise {city}",
    ],
  },
};

// Grandes villes : si volume Ads nul, on n'oriente PAS vers noindex automatique
// (Google Ads masque souvent le longue-traîne local) → verdict "review".
const BIG_CITIES = new Set(["lyon", "paris", "grenoble", "saint-etienne", "annecy", "clermont-ferrand"]);

function classify(volume, citySlug) {
  if (volume >= 50) return "index-priority";
  if (volume >= 20) return "index";
  if (volume >= 1) return "index-low";
  return BIG_CITIES.has(citySlug) ? "review" : "noindex";
}

async function searchVolume(keywords) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { Authorization: AUTH, "Content-Type": "application/json" },
    body: JSON.stringify([{ location_code: LOCATION_CODE, language_code: LANGUAGE_CODE, keywords }]),
  });
  const json = await res.json();
  if (json.status_code !== 20000) {
    throw new Error(`API ${json.status_code}: ${json.status_message}`);
  }
  const task = json.tasks?.[0];
  if (task?.status_code !== 20000) {
    throw new Error(`Task ${task?.status_code}: ${task?.status_message}`);
  }
  return { result: task.result || [], cost: json.cost };
}

async function main() {
  const cities = loadCities();
  console.log(`[dfs] ${cities.length} villes × ${Object.keys(SERVICES).length} services = ${cities.length * Object.keys(SERVICES).length} combos`);

  // 1. Construire la liste de mots-clés (uniques) + index combo → variantes.
  const keywordSet = new Set();
  const combos = [];
  for (const [serviceSlug, svc] of Object.entries(SERVICES)) {
    for (const city of cities) {
      const variants = svc.templates.map((t) => t.replace("{city}", city.name));
      variants.forEach((v) => keywordSet.add(v));
      combos.push({ serviceSlug, serviceLabel: svc.label, citySlug: city.slug, cityName: city.name, variants });
    }
  }
  const keywords = [...keywordSet];
  console.log(`[dfs] ${keywords.length} mots-clés uniques à interroger (1 appel)…`);

  // 2. Appel API (Google Ads search_volume accepte jusqu'à ~700 kw/appel).
  const volumes = new Map();
  let totalCost = 0;
  for (let i = 0; i < keywords.length; i += 700) {
    const batch = keywords.slice(i, i + 700);
    const { result, cost } = await searchVolume(batch);
    totalCost += cost || 0;
    for (const r of result) volumes.set(r.keyword.toLowerCase(), r.search_volume ?? 0);
  }

  // 3. Agréger par combo : volume max + meilleure variante.
  for (const combo of combos) {
    let best = { volume: 0, keyword: combo.variants[0] };
    for (const v of combo.variants) {
      const vol = volumes.get(v.toLowerCase()) ?? 0;
      if (vol > best.volume) best = { volume: vol, keyword: v };
    }
    combo.volume = best.volume;
    combo.topKeyword = best.keyword;
    combo.verdict = classify(best.volume, combo.citySlug);
  }

  // 4. Affichage groupé par service.
  for (const [serviceSlug, svc] of Object.entries(SERVICES)) {
    const rows = combos.filter((c) => c.serviceSlug === serviceSlug).sort((a, b) => b.volume - a.volume);
    console.log(`\n=== ${svc.label} (${serviceSlug}) ===`);
    console.log(`${"VILLE".padEnd(20)}${"VOL".padStart(5)}  ${"VERDICT".padEnd(15)} TOP KEYWORD`);
    for (const r of rows) {
      console.log(`${r.cityName.padEnd(20)}${String(r.volume).padStart(5)}  ${r.verdict.padEnd(15)} ${r.topKeyword}`);
    }
  }

  // 5. Synthèse + écriture JSON.
  const tally = combos.reduce((acc, c) => ((acc[c.verdict] = (acc[c.verdict] || 0) + 1), acc), {});
  console.log("\n=== SYNTHÈSE ===");
  console.log(tally);
  console.log(`Coût total: ${totalCost.toFixed(4)} $`);

  const outDir = join(__dirname, "data");
  mkdirSync(outDir, { recursive: true });
  const outFile = join(outDir, "keyword-audit.json");
  writeFileSync(
    outFile,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        location: "France",
        language: "fr",
        cost: totalCost,
        combos: combos.map(({ variants, ...rest }) => rest),
      },
      null,
      2,
    ),
  );
  console.log(`\n[dfs] ✓ rapport écrit : ${outFile}`);

  // 6. Générer src/lib/seo-volumes.ts (consommé par robots + sitemap).
  writeSeoVolumesTs(combos);
}

// Émet le fichier TS de pilotage SEO depuis les combos en mémoire (pas d'appel API).
function writeSeoVolumesTs(combos) {
  const entries = combos
    .slice()
    .sort((a, b) => a.serviceSlug.localeCompare(b.serviceSlug) || b.volume - a.volume)
    .map((c) => `  "${c.serviceSlug}/${c.citySlug}": { volume: ${c.volume}, verdict: "${c.verdict}" },`)
    .join("\n");

  const ts = `// AUTO-GÉNÉRÉ par scripts/dfs/keyword-audit.mjs — NE PAS éditer à la main.
// Source : DataForSEO Google Ads search_volume (France, fr). Régénérer avec :
//   doppler run -p jeffrey -c dev -- node scripts/dfs/keyword-audit.mjs
//
// Pilote l'indexation de la grille programmatique [service]/[city] :
// verdict "noindex" → robots noindex + exclusion du sitemap. Les combos
// inconnus (nouvelle ville/service) retombent sur "review" = indexé par défaut.

export type SeoVerdict = "index-priority" | "index" | "index-low" | "review" | "noindex";

export interface SeoVolume {
  volume: number;
  verdict: SeoVerdict;
}

export const SEO_VOLUMES: Record<string, SeoVolume> = {
${entries}
};

const PRIORITY: Record<SeoVerdict, number> = {
  "index-priority": 0.9,
  index: 0.7,
  review: 0.5,
  "index-low": 0.4,
  noindex: 0,
};

export function seoFor(service: string, city: string): SeoVolume {
  return SEO_VOLUMES[\`\${service}/\${city}\`] ?? { volume: 0, verdict: "review" };
}

/** Faut-il indexer cette page ? (false uniquement pour les combos à 0 volume mesuré). */
export function shouldIndexCity(service: string, city: string): boolean {
  return seoFor(service, city).verdict !== "noindex";
}

/** Priorité sitemap dérivée du volume de recherche. */
export function sitemapPriorityCity(service: string, city: string): number {
  return PRIORITY[seoFor(service, city).verdict] || 0.5;
}
`;

  const tsFile = join(ROOT, "src/lib/seo-volumes.ts");
  writeFileSync(tsFile, ts);
  console.log(`[dfs] ✓ pilotage SEO écrit : ${tsFile}`);
}

main().catch((err) => {
  console.error("[dfs] erreur:", err?.message || err);
  process.exit(1);
});
