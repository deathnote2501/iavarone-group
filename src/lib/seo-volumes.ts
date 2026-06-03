// AUTO-GÉNÉRÉ par scripts/dfs/keyword-audit.mjs — NE PAS éditer à la main.
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
  "agent-ia/clermont-ferrand": { volume: 0, verdict: "review" },
  "agent-ia/riom": { volume: 0, verdict: "noindex" },
  "agent-ia/vichy": { volume: 0, verdict: "noindex" },
  "agent-ia/issoire": { volume: 0, verdict: "noindex" },
  "agent-ia/thiers": { volume: 0, verdict: "noindex" },
  "agent-ia/aurillac": { volume: 0, verdict: "noindex" },
  "agent-ia/le-puy-en-velay": { volume: 0, verdict: "noindex" },
  "agent-ia/moulins": { volume: 0, verdict: "noindex" },
  "agent-ia/roanne": { volume: 0, verdict: "noindex" },
  "agent-ia/saint-etienne": { volume: 0, verdict: "review" },
  "agent-ia/bourg-en-bresse": { volume: 0, verdict: "noindex" },
  "agent-ia/annecy": { volume: 0, verdict: "review" },
  "agent-ia/chambery": { volume: 0, verdict: "noindex" },
  "agent-ia/valence": { volume: 0, verdict: "noindex" },
  "agent-ia/grenoble": { volume: 0, verdict: "review" },
  "agent-ia/lyon": { volume: 0, verdict: "review" },
  "agent-ia/paris": { volume: 0, verdict: "review" },
  "conseil-ia/lyon": { volume: 210, verdict: "index-priority" },
  "conseil-ia/paris": { volume: 140, verdict: "index-priority" },
  "conseil-ia/clermont-ferrand": { volume: 0, verdict: "review" },
  "conseil-ia/riom": { volume: 0, verdict: "noindex" },
  "conseil-ia/vichy": { volume: 0, verdict: "noindex" },
  "conseil-ia/issoire": { volume: 0, verdict: "noindex" },
  "conseil-ia/thiers": { volume: 0, verdict: "noindex" },
  "conseil-ia/aurillac": { volume: 0, verdict: "noindex" },
  "conseil-ia/le-puy-en-velay": { volume: 0, verdict: "noindex" },
  "conseil-ia/moulins": { volume: 0, verdict: "noindex" },
  "conseil-ia/roanne": { volume: 0, verdict: "noindex" },
  "conseil-ia/saint-etienne": { volume: 0, verdict: "review" },
  "conseil-ia/bourg-en-bresse": { volume: 0, verdict: "noindex" },
  "conseil-ia/annecy": { volume: 0, verdict: "review" },
  "conseil-ia/chambery": { volume: 0, verdict: "noindex" },
  "conseil-ia/valence": { volume: 0, verdict: "noindex" },
  "conseil-ia/grenoble": { volume: 0, verdict: "review" },
  "formation-ia/lyon": { volume: 260, verdict: "index-priority" },
  "formation-ia/paris": { volume: 260, verdict: "index-priority" },
  "formation-ia/grenoble": { volume: 40, verdict: "index" },
  "formation-ia/clermont-ferrand": { volume: 20, verdict: "index" },
  "formation-ia/saint-etienne": { volume: 10, verdict: "index-low" },
  "formation-ia/riom": { volume: 0, verdict: "noindex" },
  "formation-ia/vichy": { volume: 0, verdict: "noindex" },
  "formation-ia/issoire": { volume: 0, verdict: "noindex" },
  "formation-ia/thiers": { volume: 0, verdict: "noindex" },
  "formation-ia/aurillac": { volume: 0, verdict: "noindex" },
  "formation-ia/le-puy-en-velay": { volume: 0, verdict: "noindex" },
  "formation-ia/moulins": { volume: 0, verdict: "noindex" },
  "formation-ia/roanne": { volume: 0, verdict: "noindex" },
  "formation-ia/bourg-en-bresse": { volume: 0, verdict: "noindex" },
  "formation-ia/annecy": { volume: 0, verdict: "review" },
  "formation-ia/chambery": { volume: 0, verdict: "noindex" },
  "formation-ia/valence": { volume: 0, verdict: "noindex" },
};

const PRIORITY: Record<SeoVerdict, number> = {
  "index-priority": 0.9,
  index: 0.7,
  review: 0.5,
  "index-low": 0.4,
  noindex: 0,
};

export function seoFor(service: string, city: string): SeoVolume {
  return SEO_VOLUMES[`${service}/${city}`] ?? { volume: 0, verdict: "review" };
}

/** Faut-il indexer cette page ? (false uniquement pour les combos à 0 volume mesuré). */
export function shouldIndexCity(service: string, city: string): boolean {
  return seoFor(service, city).verdict !== "noindex";
}

/** Priorité sitemap dérivée du volume de recherche. */
export function sitemapPriorityCity(service: string, city: string): number {
  return PRIORITY[seoFor(service, city).verdict] || 0.5;
}
