import type { ServiceSlug } from "./services";

/**
 * Enrichissement éditorial ciblé d'un couple (service, ville).
 *
 * La grille [service]/[city] est templatisée : le contenu vient de SERVICES et de
 * CITIES, donc toucher un service réécrit ses 17 pages villes d'un coup. Cet
 * override permet d'approfondir UNE page à demande réelle mesurée (Search Console
 * + volumes DataForSEO) sans diluer ni dupliquer les autres. Tous les champs sont
 * optionnels et additifs : un combo sans override garde exactement le rendu actuel.
 */
export interface CityServiceOverride {
  /** Remplace service.longTitle(city) pour couvrir les variantes réellement recherchées. */
  metaTitle?: string;
  /** Remplace service.metaDescription(city). */
  metaDescription?: string;
  /**
   * Réponse directe à l'intention principale, rendue juste après le hero (~200
   * premiers mots) : format answer-first, lisible par les moteurs génératifs.
   */
  answerFirst?: { h2: string; body: string[] };
  /** Questions ajoutées à la FAQ de service : rendues ET injectées en FAQPage. */
  extraFaq?: { q: string; a: string }[];
  /** Liens internes contextuels, ancres variées (le template gère déjà villes et services). */
  relatedLinks?: { href: string; label: string; hint: string }[];
}

type ComboKey = `${ServiceSlug}/${string}`;

export const CITY_SERVICE_OVERRIDES: Partial<Record<ComboKey, CityServiceOverride>> = {
  // Seul combo classé index-priority avec le volume le plus disputé (210/mois,
  // DataForSEO) et déjà 158 impressions/28 j en position 15.7 (Search Console,
  // 2026-06-15 → 2026-07-12) : la page plafonne en page 2 faute de couvrir les
  // variantes "expert IA" et "cabinet de conseil IA" que Google lui associe déjà.
  "conseil-ia/lyon": {
    metaTitle: "Consultant IA à Lyon : audit, expert et cabinet de conseil",
    metaDescription:
      "Consultant IA indépendant à Lyon : audit IA livré en 2 semaines (3 à 6 k€), cas d'usage chiffrés, mise en œuvre en 4 à 8 semaines. Facturé au livrable, pas en régie. Premier cadrage gratuit de 30 minutes.",
    answerFirst: {
      h2: "Consultant, expert ou cabinet de conseil IA à Lyon : lequel choisir ?",
      body: [
        "Pour une PME ou une ETI lyonnaise, la réponse courte : commencez par un audit court et chiffré, pas par un outil. Un audit IA est livré en 2 semaines pour 3 à 6 k€, et se conclut par 3 à 5 cas d'usage priorisés avec leur gain estimé. La mise en œuvre suit en 4 à 8 semaines, pour 5 à 20 k€. Le premier cadrage de 30 minutes est gratuit, et sert d'abord à vérifier qu'il existe un vrai retour sur investissement : s'il n'y en a pas, autant le savoir avant de dépenser.",
        "Les termes « consultant IA », « expert IA », « cabinet de conseil IA » et « agence IA » désignent à Lyon des réalités très différentes. Une agence vend le plus souvent une prestation de production ; un cabinet facture des jours de conseil en régie et repart avec un rapport ; ici, l'intervention est faite et livrée par une seule personne, Jérôme Iavarone, consultant en IA générative depuis 2020, facturée au livrable et non au temps passé. Vous parlez à celui qui réalise la mission, du cadrage jusqu'à la mise en production.",
        "Concrètement à Lyon : les phases de cadrage et de restitution se font sur site (1h30 depuis Clermont-Ferrand), le développement en distanciel pour contenir le coût. Les déplacements sont inclus dans le forfait.",
      ],
    },
    // Questions calquées sur les requêtes qui rapportent déjà des impressions à
    // cette page (Search Console, 28 j) : "expert ia lyon" (25 imp, pos 13,2),
    // "cabinet conseil ia lyon" (17 imp, pos 13,3), "diagnostic ia lyon" (7 imp,
    // pos 21,9), "agent autonome lyon" (21 imp, pos 23,5).
    extraFaq: [
      {
        q: "Comment choisir un expert IA à Lyon ?",
        a: "Trois critères tranchent vite. D'abord, demandez qui exécutera réellement la mission : dans beaucoup de structures, la personne qui vend n'est pas celle qui livre. Ensuite, regardez le mode de facturation : au livrable, le prestataire porte le risque ; en régie, c'est vous. Enfin, exigez un chiffrage du gain attendu avant de démarrer. Un expert qui ne sait pas estimer le retour sur investissement d'un cas d'usage ne l'a probablement jamais mis en production.",
      },
      {
        q: "Quelle différence entre un cabinet de conseil IA et une agence IA à Lyon ?",
        a: "Un cabinet de conseil vend de l'analyse : il cadre, recommande et livre un rapport, généralement facturé en jours-homme. Une agence vend de la production : elle exécute un périmètre défini à l'avance, mais cadre rarement le besoin en amont. Le risque classique est de payer les deux : une étude d'un côté, une réalisation de l'autre, sans que personne ne soit responsable du résultat. Ici les deux sont assurés par le même interlocuteur : audit puis mise en œuvre, avec une mesure d'impact à la fin.",
      },
      {
        q: "Combien coûte un diagnostic IA à Lyon ?",
        a: "Le diagnostic (ou audit) IA est facturé entre 3 et 6 k€ selon la taille de l'organisation et le nombre de processus à cartographier. Il est livré en 2 semaines et contient la cartographie des processus, 3 à 5 cas d'usage priorisés, leur chiffrage et un calendrier de mise en œuvre. Il est autoportant : rien ne vous oblige à poursuivre avec moi ensuite. Le rendez-vous de cadrage préalable de 30 minutes, lui, est gratuit.",
      },
      {
        q: "Peut-on déployer un agent IA autonome dans une entreprise lyonnaise ?",
        a: "Oui, et c'est souvent la suite logique d'un audit quand la tâche identifiée est répétitive et à fort volume : prospection B2B, support client de niveau 1, relances. Le déploiement se fait à distance depuis vos outils existants (Gmail, Slack, CRM, WhatsApp Business), avec un setup de 1 850 à 3 850 € puis un abonnement mensuel de 450 à 950 €, sans engagement. Un point important : l'agent n'est jamais autonome dès le premier jour, vous validez les actions sensibles tant que la confiance n'est pas établie.",
      },
    ],
    relatedLinks: [
      {
        href: "/ressources/roi-ia-generative-pme",
        label: "Chiffrer le retour sur investissement avant de lancer un projet",
        hint: "Combien de temps une PME gagne-t-elle réellement avec l'IA générative ?",
      },
      {
        href: "/ressources/automatiser-taches-ia-n8n-make",
        label: "Automatiser vos tâches répétitives (n8n, Make)",
        hint: "Le guide des automatisations qui se déploient sans refondre votre stack.",
      },
      {
        href: "/ressources/charte-ia-entreprise-rgpd-ia-act",
        label: "Encadrer l'usage de l'IA : RGPD et IA Act",
        hint: "Ce qu'une charte IA doit couvrir avant d'ouvrir les outils aux équipes.",
      },
      {
        href: "/conseil-ia",
        label: "Voir la méthode d'audit IA complète",
        hint: "Le détail des quatre étapes, du cadrage gratuit à la mesure d'impact.",
      },
    ],
  },
};

/** Override éditorial d'un couple (service, ville), ou undefined si le combo n'en a pas. */
export function overrideFor(service: string, city: string): CityServiceOverride | undefined {
  return CITY_SERVICE_OVERRIDES[`${service}/${city}` as ComboKey];
}
