// Décision d'indexation de la grille [service]/[city] : volume de recherche (auto-généré,
// src/lib/seo-volumes.ts) ET cannibalisation inter-sites (ci-dessous, tenue à la main).
//
// Importer `shouldIndexCity` DEPUIS CE FICHIER, jamais depuis `seo-volumes.ts` : celui-ci
// est régénéré par `scripts/dfs/keyword-audit.mjs` et toute règle écrite dedans serait
// perdue au prochain audit.

import {
  seoFor,
  shouldIndexCity as shouldIndexByVolume,
  sitemapPriorityCity as sitemapPriorityByVolume,
} from "@/lib/seo-volumes";

/**
 * Combos rendus à un autre site du groupe (relevé iac_seo + GSC du 2026-07-27).
 *
 * Le groupe exploite cinq vitrines qui vendent de l'IA générative aux PME sur les mêmes
 * villes : 18 SERP hébergeaient au moins deux de nos domaines. La règle de territoire est
 * « une SERP, un site » (cf. skill seo-boost) : formation/formateur/consultant à
 * jeromeiavarone.fr, agent/agence IA à employe-ia.fr, conseil IA local à iavarone-group.fr.
 *
 * Ne figurent ici que les combos qui remplissent LES DEUX conditions, vérifiées page par
 * page avant retrait — un noindex ne transfère aucune position, il retire seulement un
 * résultat, donc il ne doit jamais coûter une place que nous tenons :
 *   1. 0 clic sur 28 j en Search Console ;
 *   2. un site frère est déjà mieux placé, ou nous sommes absents du top 100.
 *
 * Volontairement CONSERVÉS malgré la cannibalisation, car nous y sommes le mieux placé
 * du groupe : conseil-ia/clermont-ferrand (7 vs jeromeiavarone 6, territoire conseil),
 * formation-ia/clermont-ferrand (7 vs 18 sur « formation ia generative clermont-ferrand »),
 * agent-ia/clermont-ferrand (11 vs employe-ia 17), agent-ia/roanne (5, aucun frère en lice).
 */
export const CANNIBALIZED: Record<string, string> = {
  "agent-ia/grenoble": "employe-ia.fr (32 vs 38, et 15 sur « agence ia grenoble »)",
  "agent-ia/saint-etienne": "employe-ia.fr (29, nous absents du top 100)",
  "agent-ia/lyon": "employe-ia.fr (territoire agent IA, nous absents du top 100)",
  "agent-ia/paris": "employe-ia.fr (territoire agent IA, nous absents du top 100)",
  "formation-ia/grenoble": "jeromeiavarone.fr (19, nous absents du top 100)",
  "formation-ia/saint-etienne": "jeromeiavarone.fr (24, nous absents du top 100)",
  "formation-ia/lyon": "jeromeiavarone.fr (territoire formation, nous absents du top 100)",
  "formation-ia/paris": "jeromeiavarone.fr (territoire formation, nous absents du top 100)",
};

/** Ce combo est-il rendu à un autre site du groupe ? */
export function isCannibalized(service: string, city: string): boolean {
  return `${service}/${city}` in CANNIBALIZED;
}

/** Faut-il indexer cette page ? Volume de recherche ET non cannibalisée. */
export function shouldIndexCity(service: string, city: string): boolean {
  return shouldIndexByVolume(service, city) && !isCannibalized(service, city);
}

/** Priorité sitemap. Une page cannibalisée n'entre pas au sitemap (priorité 0). */
export function sitemapPriorityCity(service: string, city: string): number {
  return isCannibalized(service, city) ? 0 : sitemapPriorityByVolume(service, city);
}

export { seoFor };
