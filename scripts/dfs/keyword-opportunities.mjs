#!/usr/bin/env node
/**
 * DataForSEO — Découverte d'opportunités SEO « ciblables pour un indépendant ».
 *
 * Objectif : trouver les mots-clés à VOLUME réel mais à DIFFICULTÉ basse (peu de
 * backlinks requis pour ranker) sur lesquels repositionner les pages du site
 * (meta title / H1 / H2 / contenu) ou créer de nouvelles pages /ressources.
 *
 * Méthode : pour chaque seed (regroupé par cluster = page cible), on appelle
 * DataForSEO Labs `keyword_suggestions` (renvoie les mots-clés CONTENANT le seed)
 * avec un filtre serveur volume ≥ MIN_VOLUME ET keyword_difficulty ≤ MAX_KD.
 * On agrège, on déduplique, on classe par intention et on mappe à une page.
 *
 * KD (keyword_difficulty, 0–100) = proxy de l'autorité des sites en page 1.
 * KD ≤ 30 ⇒ rankable pour un site neuf d'indépendant sans gros profil de liens.
 *
 * Lancement :
 *   doppler run -p jeffrey -c dev -- node scripts/dfs/keyword-opportunities.mjs
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const LOGIN = process.env.DATAFORSEO_LOGIN || "jerome.iavarone@gmail.com";
const PASSWORD = process.env.DATAFORSEO_API_KEY;
if (!PASSWORD) {
  console.error("[dfs] DATAFORSEO_API_KEY manquant. Lance via: doppler run -p jeffrey -c dev -- node scripts/dfs/keyword-opportunities.mjs");
  process.exit(1);
}
const AUTH = "Basic " + Buffer.from(`${LOGIN}:${PASSWORD}`).toString("base64");

const LOCATION_CODE = 2250; // France
const LANGUAGE_CODE = "fr";
const MAX_KD = 30; // difficulté max ciblable pour un site d'indépendant
const MIN_VOLUME = 50; // volume mensuel minimum pour valoir une optimisation
const PER_SEED_LIMIT = 40;
const ENDPOINT = "https://api.dataforseo.com/v3/dataforseo_labs/google/keyword_suggestions/live";

// Clusters = page cible du site. Chaque seed est élargi à ses variantes contenantes.
const CLUSTERS = [
  {
    page: "/formation-ia (hub)",
    intentBias: "commercial",
    seeds: ["formation ia", "formation intelligence artificielle", "formation chatgpt", "formation ia générative", "formation ia entreprise"],
  },
  {
    page: "/ressources — prompt engineering & usage",
    intentBias: "informational",
    seeds: ["prompt engineering", "prompt chatgpt", "apprendre chatgpt", "utiliser chatgpt"],
  },
  {
    page: "/conseil-ia (hub)",
    intentBias: "commercial",
    seeds: ["consultant ia", "conseil ia", "agence ia", "audit ia", "intégrer ia entreprise"],
  },
  {
    page: "/agent-ia (hub)",
    intentBias: "commercial",
    seeds: ["agent ia", "agent ia entreprise", "automatisation entreprise", "chatbot entreprise", "automatisation ia"],
  },
  {
    page: "/ressources — automatisation no-code",
    intentBias: "informational",
    seeds: ["n8n", "make automatisation", "zapier", "automatiser tâches"],
  },
  {
    page: "/ressources — IA & conformité (RGPD / IA Act)",
    intentBias: "informational",
    seeds: ["ia act", "rgpd ia", "ia générative entreprise", "charte ia"],
  },
  {
    page: "/marques & home — IA générative entreprise",
    intentBias: "mixed",
    seeds: ["intelligence artificielle entreprise", "ia entreprise", "ia générative", "vibe coding"],
  },
];

async function suggestions(seed) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { Authorization: AUTH, "Content-Type": "application/json" },
    body: JSON.stringify([
      {
        keyword: seed,
        location_code: LOCATION_CODE,
        language_code: LANGUAGE_CODE,
        include_seed_keyword: true,
        limit: PER_SEED_LIMIT,
        order_by: ["keyword_info.search_volume,desc"],
        filters: [
          ["keyword_info.search_volume", ">=", MIN_VOLUME],
          "and",
          ["keyword_properties.keyword_difficulty", "<=", MAX_KD],
        ],
      },
    ]),
  });
  const json = await res.json();
  if (json.status_code !== 20000) throw new Error(`API ${json.status_code}: ${json.status_message}`);
  const items = (json.tasks?.[0]?.result || [])[0]?.items || [];
  return { items, cost: json.cost || 0 };
}

async function main() {
  console.log(`[dfs] Filtre : volume ≥ ${MIN_VOLUME}/mois ET KD ≤ ${MAX_KD} · France/fr\n`);
  const byKeyword = new Map();
  let totalCost = 0;

  for (const cluster of CLUSTERS) {
    for (const seed of cluster.seeds) {
      const { items, cost } = await suggestions(seed);
      totalCost += cost;
      for (const it of items) {
        const ki = it.keyword_info || {};
        const kp = it.keyword_properties || {};
        const si = it.search_intent_info || {};
        const kw = it.keyword;
        // On garde la 1re occurrence (le cluster du seed le plus pertinent),
        // mais on conserve le volume/KD le plus complet.
        if (!byKeyword.has(kw)) {
          byKeyword.set(kw, {
            keyword: kw,
            volume: ki.search_volume ?? 0,
            kd: kp.keyword_difficulty ?? null,
            cpc: ki.cpc ?? 0,
            competition: ki.competition_level ?? null,
            intent: si.main_intent ?? null,
            cluster: cluster.page,
          });
        }
      }
    }
  }

  const all = [...byKeyword.values()].filter((k) => k.volume >= MIN_VOLUME && (k.kd ?? 99) <= MAX_KD);

  // Affichage groupé par cluster.
  for (const cluster of CLUSTERS) {
    const rows = all.filter((k) => k.cluster === cluster.page).sort((a, b) => b.volume - a.volume);
    if (!rows.length) continue;
    console.log(`\n=== ${cluster.page} ===`);
    console.log(`${"MOT-CLÉ".padEnd(42)}${"VOL".padStart(6)}${"KD".padStart(4)}${"CPC€".padStart(7)}  INTENT`);
    for (const r of rows.slice(0, 15)) {
      console.log(
        `${r.keyword.slice(0, 42).padEnd(42)}${String(r.volume).padStart(6)}${String(r.kd).padStart(4)}${String(Math.round((r.cpc || 0) * 100) / 100).padStart(7)}  ${r.intent || ""}`,
      );
    }
  }

  // Top 25 toutes catégories (meilleur ratio volume × faible KD).
  const top = all
    .map((k) => ({ ...k, score: k.volume / Math.max(k.kd || 1, 1) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 25);
  console.log(`\n=== TOP 25 OPPORTUNITÉS (score = volume / KD) ===`);
  console.log(`${"MOT-CLÉ".padEnd(42)}${"VOL".padStart(6)}${"KD".padStart(4)}  INTENT  → CLUSTER`);
  for (const r of top) {
    console.log(`${r.keyword.slice(0, 42).padEnd(42)}${String(r.volume).padStart(6)}${String(r.kd).padStart(4)}  ${(r.intent || "").padEnd(13)} ${r.cluster}`);
  }

  console.log(`\n[dfs] ${all.length} mots-clés ciblables · coût total ${totalCost.toFixed(4)} $`);

  const outDir = join(__dirname, "data");
  mkdirSync(outDir, { recursive: true });
  const outFile = join(outDir, "keyword-opportunities.json");
  writeFileSync(
    outFile,
    JSON.stringify(
      { generatedAt: new Date().toISOString(), filters: { minVolume: MIN_VOLUME, maxKd: MAX_KD }, count: all.length, cost: totalCost, keywords: all.sort((a, b) => b.volume - a.volume) },
      null,
      2,
    ),
  );
  console.log(`[dfs] ✓ rapport écrit : ${outFile}`);
}

main().catch((err) => {
  console.error("[dfs] erreur:", err?.message || err);
  process.exit(1);
});
