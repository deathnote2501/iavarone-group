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

  // Deuxième combo index-priority du site (volume 140/mois, DataForSEO), déjà
  // 47 impressions et 1 clic sur 28 j (Search Console, 2026-06-22 → 2026-07-19)
  // mais la page plafonne en position 26,6. Les requêtes réelles qui la
  // touchent sont "consultant ia generative paris" (9 imp, pos 9,3, en lisière
  // du top 10) et "consultant ia paris" (9 imp, pos 19,9) : la page ne couvrait
  // pas explicitement le lexique "consultant IA générative" / "expert IA" que
  // Google lui associe. Sujet non cannibalisé : aucun autre site du groupe ne
  // ranke top 20 sur les SERP parisiennes (tracker iac_seo, 2026-07-19).
  "conseil-ia/paris": {
    metaTitle: "Consultant IA à Paris : audit, expert et conseil en IA générative",
    metaDescription:
      "Consultant IA générative indépendant à Paris : audit IA livré en 2 semaines (3 à 6 k€), cas d'usage chiffrés, mise en œuvre en 4 à 8 semaines. Facturé au livrable, pas en régie. Premier cadrage gratuit de 30 minutes.",
    answerFirst: {
      h2: "Consultant, expert ou conseil en IA générative à Paris : par où commencer ?",
      body: [
        "Pour une PME, une ETI ou une scale-up parisienne, la réponse courte : commencez par un audit court et chiffré, pas par un outil. Un audit IA est livré en 2 semaines pour 3 à 6 k€, et se conclut par 3 à 5 cas d'usage priorisés avec leur gain estimé. La mise en œuvre suit en 4 à 8 semaines, pour 5 à 20 k€. Le premier cadrage de 30 minutes est gratuit, et sert d'abord à vérifier qu'il existe un vrai retour sur investissement : s'il n'y en a pas, autant le savoir avant de dépenser.",
        "À Paris, les termes « consultant IA », « consultant IA générative », « expert IA » et « cabinet de conseil IA » recouvrent des réalités très différentes. Un grand cabinet facture des jours de conseil en régie et repart avec un rapport ; ici, l'intervention est cadrée, réalisée et livrée par une seule personne, Jérôme Iavarone, consultant en IA générative depuis 2020, facturée au livrable et non au temps passé. Vous parlez directement à celui qui exécute la mission, du cadrage jusqu'à la mise en production, sans strate intermédiaire.",
        "Concrètement pour une entreprise parisienne : le cadrage et la restitution se font sur site (Paris est à 3h30 de Clermont-Ferrand en train direct), le développement en distanciel pour contenir le coût. Les déplacements sont inclus dans le forfait. Cette organisation convient autant à un siège du CAC 40 qui teste un premier cas d'usage qu'à une scale-up SaaS qui veut industrialiser une automatisation.",
      ],
    },
    // Questions calquées sur les requêtes réelles qui rapportent des impressions
    // à cette page (Search Console, 28 j) : "consultant ia generative paris"
    // (9 imp, pos 9,3) et "consultant ia paris" (9 imp, pos 19,9). Aucune ne
    // duplique la FAQ générique du service conseil-ia.
    extraFaq: [
      {
        q: "Comment choisir un consultant IA générative à Paris ?",
        a: "Trois critères tranchent vite. D'abord, demandez qui exécutera réellement la mission : dans les grandes structures parisiennes, la personne qui vend en rendez-vous n'est presque jamais celle qui livre. Ensuite, regardez le mode de facturation : au livrable, le prestataire porte le risque ; en régie, c'est vous qui payez les dérapages. Enfin, exigez un chiffrage du gain attendu avant de démarrer. Un consultant qui ne sait pas estimer le retour sur investissement d'un cas d'usage ne l'a probablement jamais mis en production.",
      },
      {
        q: "Un consultant IA basé en région peut-il accompagner une entreprise parisienne ?",
        a: "Oui, et c'est même souvent un avantage de coût sans perte de proximité. Les phases qui exigent une présence physique (cadrage, ateliers d'équipe, restitution) se tiennent sur site à Paris ; le développement et le suivi se font à distance, ce qui évite de facturer des journées de régie sur place. Paris est à 3h30 de Clermont-Ferrand en train direct, et les déplacements sont inclus dans le forfait : le tarif ne varie pas selon votre arrondissement.",
      },
      {
        q: "Consultant IA indépendant ou grand cabinet parisien : lequel pour une PME ou une ETI ?",
        a: "Un grand cabinet apporte une marque et des effectifs, mais facture en jours-homme, mobilise souvent des profils juniors sur le terrain et cadre le besoin sans porter la mise en production. Un indépendant expérimenté engage un seul interlocuteur du diagnostic à la livraison, facture au résultat et reste joignable après la mission. Pour une PME ou une ETI qui veut un premier cas d'usage réellement déployé plutôt qu'un rapport, le second modèle limite le risque et le délai.",
      },
      {
        q: "Combien coûte un audit IA à Paris ?",
        a: "L'audit IA est facturé entre 3 et 6 k€ selon la taille de l'organisation et le nombre de processus à cartographier, quel que soit le lieu : le tarif parisien est le même qu'ailleurs. Il est livré en 2 semaines et contient la cartographie des processus, 3 à 5 cas d'usage priorisés, leur chiffrage et un calendrier de mise en œuvre. Il est autoportant : rien ne vous oblige à poursuivre ensuite. Le rendez-vous de cadrage préalable de 30 minutes, lui, est gratuit.",
      },
    ],
    relatedLinks: [
      {
        href: "/ressources/ia-generative-definition-exemples",
        label: "Comprendre l'IA générative et ses cas d'usage en entreprise",
        hint: "La définition, les exemples concrets et les limites, avant de lancer un projet.",
      },
      {
        href: "/ressources/roi-ia-generative-pme",
        label: "Estimer le retour sur investissement d'un projet IA",
        hint: "Combien de temps une PME gagne-t-elle réellement avec l'IA générative ?",
      },
      {
        href: "/ressources/charte-ia-entreprise-rgpd-ia-act",
        label: "Cadrer l'usage de l'IA : RGPD et IA Act",
        hint: "Ce qu'une charte IA doit couvrir avant d'ouvrir les outils aux équipes.",
      },
      {
        href: "/conseil-ia",
        label: "La méthode d'audit IA en quatre étapes",
        hint: "Du cadrage gratuit à la mesure d'impact, le déroulé complet d'une mission.",
      },
    ],
  },

  // Combo du territoire propre (conseil IA local) NON cannibalisé : aucun autre site
  // du groupe ne ranke sur les SERP roannaises (tracker iac_seo, 2026-07-22, "conseil
  // ia roanne" = position 1). Déjà en quasi-top mais 0 clic sur 28 j (Search Console,
  // 2026-06-29 → 2026-07-26) : "conseil ia roanne" (5 imp, pos 3,2), "accompagnement
  // ia roanne" (4 imp, pos 2,5), "veille ia roanne" (7 imp, pos 18,9), "solution ia
  // roanne" (2 imp, pos 12,0). La page templatisée ne couvrait pas explicitement le
  // lexique "accompagnement" / "veille" / "solution IA" : cet override le fait, sans
  // toucher aux autres villes.
  "conseil-ia/roanne": {
    metaTitle: "Conseil IA à Roanne : audit et accompagnement des PME",
    metaDescription:
      "Conseil IA à Roanne pour PME et ETI industrielles : audit livré en 2 semaines (3 à 6 k€), cas d'usage chiffrés, accompagnement et veille IA. Facturé au livrable, pas en régie. Premier cadrage gratuit de 30 minutes.",
    answerFirst: {
      h2: "Conseil, accompagnement ou veille IA à Roanne : par où commencer ?",
      body: [
        "Pour une PME industrielle du Roannais, la réponse courte : commencez par un audit court et chiffré, pas par un outil. Un audit IA est livré en 2 semaines pour 3 à 6 k€, et se conclut par 3 à 5 cas d'usage priorisés avec leur gain estimé. La mise en œuvre suit en 4 à 8 semaines, pour 5 à 20 k€. Le premier cadrage de 30 minutes est gratuit, et sert d'abord à vérifier qu'il existe un vrai retour sur investissement : s'il n'y en a pas, autant le savoir avant de dépenser.",
        "« Conseil IA », « accompagnement IA » et « veille IA » recouvrent à Roanne trois besoins différents. Le conseil cadre et priorise ; l'accompagnement met en œuvre et forme les équipes ; la veille garde l'entreprise au courant des outils qui comptent pour son métier, sans la noyer sous le bruit. Ici les trois sont assurés par une seule personne, Jérôme Iavarone, consultant en IA générative depuis 2020, facturée au livrable et non au temps passé. Vous parlez à celui qui réalise la mission, du cadrage jusqu'à la mise en production.",
        "Concrètement dans le Roannais : le tissu de PME textiles Made in France, de sous-traitants de l'armement (Nexter, programme Scorpion) et de l'agroalimentaire a surtout besoin d'automatiser la production documentaire, la relation client et le suivi des données de production. Les phases de cadrage et de restitution se font sur site (2h depuis Clermont-Ferrand), le développement en distanciel pour contenir le coût. Les déplacements sont inclus dans le forfait.",
        "Pour situer l'enjeu sans se raconter d'histoire : l'État a mis en place France Num, le service public d'accompagnement à la transformation numérique des TPE et PME, dont les guides rappellent qu'un projet réussit d'abord parce qu'il part d'un besoin métier précis, pas d'un effet de mode. C'est exactement l'ordre suivi ici : le besoin, puis le chiffrage, puis l'outil.",
      ],
    },
    // Questions calquées sur les requêtes réelles de la page (Search Console, 28 j),
    // distinctes de la FAQ générique du service conseil-ia pour ne pas dupliquer.
    extraFaq: [
      {
        q: "Quelle différence entre conseil IA et accompagnement IA à Roanne ?",
        a: "Le conseil s'arrête au cadrage : cartographie des processus, choix des 3 à 5 cas d'usage à plus fort ROI, chiffrage, et un plan de mise en œuvre. L'accompagnement va jusqu'au bout : développement, intégration dans vos outils existants (Gmail, Slack, CRM, ERP), formation des équipes et mesure de l'impact réel. À Roanne, les deux sont assurés par le même interlocuteur, ce qui évite de payer une étude d'un côté et une réalisation de l'autre sans que personne ne réponde du résultat.",
      },
      {
        q: "À quoi sert une veille IA pour une PME du Roannais ?",
        a: "La veille IA trie pour vous un flux d'outils et d'annonces qui change chaque semaine, et ne remonte que ce qui a un usage concret pour votre métier : un nouvel outil d'automatisation documentaire pour un sous-traitant industriel, une brique de contrôle qualité par la vision pour un textile, un assistant de réponse aux appels d'offres. L'objectif n'est pas de tout suivre, mais d'éviter à la fois le retard et l'achat impulsif d'un outil qui ne servira pas.",
      },
      {
        q: "Quelles solutions IA sont adaptées à une PME industrielle roannaise ?",
        a: "Les gains les plus rapides viennent de l'automatisation de la production documentaire (devis, comptes rendus, réponses aux appels d'offres du programme Scorpion ou de donneurs d'ordres), du suivi des données de production (qualité, stocks, cadences) et de la relation client de niveau 1. L'audit initial sert précisément à prioriser, parmi ces pistes, les deux ou trois qui font gagner des heures chaque semaine sans refondre votre système d'information.",
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
        href: "/conseil-ia/lyon",
        label: "Le conseil IA à Lyon, en détail",
        hint: "Audit, expert ou cabinet de conseil : la comparaison pour une PME lyonnaise.",
      },
      {
        href: "/conseil-ia",
        label: "Voir la méthode d'audit IA complète",
        hint: "Le détail des quatre étapes, du cadrage gratuit à la mesure d'impact.",
      },
    ],
  },
  // Grenoble : territoire propre (conseil IA local), NON cannibalisé (ni statique
  // dans CANNIBALIZED, ni dans le tracker iac_seo live du 2026-07-29 : seuls
  // "agent ia grenoble" et "formation ia grenoble" le sont, pas "conseil ia
  // grenoble"). Cible fraîche : Lyon (07-15), Paris (07-22) et Roanne (07-29)
  // déjà overridés, Grenoble est la métropole Rhône-Alpes suivante du cluster.
  // Signal SERP : "conseil ia grenoble" à la position 91 (tracker iac_seo,
  // Run #26, 2026-07-29), en top 100 mais sans contenu éditorial dédié. La page
  // templatisée ne servait pas le lexique "expert / cabinet de conseil / audit
  // IA" ni le contexte deeptech grenoblois : cet override le fait, sans toucher
  // aux autres villes.
  "conseil-ia/grenoble": {
    metaTitle: "Conseil IA à Grenoble : audit, expert et cabinet de conseil",
    metaDescription:
      "Conseil IA à Grenoble pour PME, ETI et startups deeptech : audit livré en 2 semaines (3 à 6 k€), cas d'usage chiffrés, mise en œuvre en 4 à 8 semaines. Facturé au livrable, pas en régie. Premier cadrage gratuit de 30 minutes.",
    answerFirst: {
      h2: "Consultant, expert ou cabinet de conseil IA à Grenoble : par où commencer ?",
      body: [
        "Pour une PME, une ETI ou une startup grenobloise, la réponse courte : commencez par un audit court et chiffré, pas par un outil. Un audit IA est livré en 2 semaines pour 3 à 6 k€, et se conclut par 3 à 5 cas d'usage priorisés avec leur gain estimé. La mise en œuvre suit en 4 à 8 semaines, pour 5 à 20 k€. Le premier cadrage de 30 minutes est gratuit, et sert d'abord à vérifier qu'il existe un vrai retour sur investissement : s'il n'y en a pas, autant le savoir avant de dépenser.",
        "Les termes « consultant IA », « expert IA », « cabinet de conseil IA » et « agence IA » désignent à Grenoble des réalités différentes. Une agence vend le plus souvent une prestation de production ; un cabinet facture des jours de conseil en régie et repart avec un rapport ; ici, l'intervention est faite et livrée par une seule personne, Jérôme Iavarone, consultant en IA générative depuis 2020, facturée au livrable et non au temps passé. Vous parlez à celui qui réalise la mission, du cadrage jusqu'à la mise en production.",
        "Concrètement à Grenoble : l'écosystème deeptech (microélectronique, CEA-Leti, hardware, startups R&D) a moins besoin d'un énième modèle que d'automatiser sa production documentaire de haute technicité, ses réponses à appels d'offres et son suivi de projets de recherche. Grenoble étant à 5 h de train de Clermont-Ferrand, le cadrage se tient en visio ou sur site selon l'enjeu, et le développement en distanciel : les déplacements éventuels sont inclus dans le forfait, le tarif ne varie pas selon la distance.",
        "Pour situer l'enjeu sans se raconter d'histoire : l'État a mis en place France Num, le service public d'accompagnement à la transformation numérique des TPE et PME, dont les guides rappellent qu'un projet réussit d'abord parce qu'il part d'un besoin métier précis, pas d'un effet de mode. C'est exactement l'ordre suivi ici : le besoin, puis le chiffrage, puis l'outil.",
      ],
    },
    // Questions distinctes de la FAQ générique du service conseil-ia (coût,
    // secteurs, intervention sur site, différence ESN) pour ne pas dupliquer :
    // elles couvrent le lexique "expert / cabinet / agence" et le contexte
    // deeptech grenoblois, rendues ET injectées en FAQPage.
    extraFaq: [
      {
        q: "Quelle différence entre un cabinet de conseil IA et une agence IA à Grenoble ?",
        a: "Un cabinet de conseil vend de l'analyse : il cadre, recommande et livre un rapport, généralement facturé en jours-homme. Une agence vend de la production : elle exécute un périmètre défini à l'avance, mais cadre rarement le besoin en amont. Le risque classique est de payer les deux : une étude d'un côté, une réalisation de l'autre, sans que personne ne réponde du résultat. Ici les deux sont assurés par le même interlocuteur : audit puis mise en œuvre, avec une mesure d'impact à la fin.",
      },
      {
        q: "Un consultant IA en région peut-il accompagner l'écosystème deeptech grenoblois ?",
        a: "Oui, à condition d'organiser la mission autour de la distance plutôt que de la nier. Grenoble est à 5 h de train de Clermont-Ferrand : les phases qui gagnent à être en présentiel (cadrage, ateliers d'équipe, restitution) se planifient sur site, groupées sur une journée ; le développement, le suivi et la veille se font à distance. L'avantage pour une startup ou une PME grenobloise est un coût de conseil inférieur à celui d'un cabinet local facturé en régie, sans perte de disponibilité : un seul interlocuteur du diagnostic à la livraison.",
      },
      {
        q: "Quelles solutions IA sont adaptées à une PME ou une startup grenobloise ?",
        a: "Dans un tissu à forte densité d'ingénieurs et de docteurs (microélectronique, CEA-Leti, hardware, outdoor), les gains les plus rapides viennent de l'automatisation de la production documentaire technique (spécifications, rapports de R&D, réponses aux appels d'offres et aux dossiers de financement), de la synthèse de veille scientifique et de la relation client de niveau 1. L'audit initial sert précisément à prioriser, parmi ces pistes, les deux ou trois qui font gagner des heures chaque semaine sans refondre le système d'information.",
      },
    ],
    relatedLinks: [
      {
        href: "/ressources/roi-ia-generative-pme",
        label: "Chiffrer le retour sur investissement avant de lancer un projet",
        hint: "Combien de temps une PME gagne-t-elle réellement avec l'IA générative ?",
      },
      {
        href: "/ressources/ia-generative-definition-exemples",
        label: "Comprendre l'IA générative et ses cas d'usage en entreprise",
        hint: "La définition, les exemples concrets et les limites, avant de lancer un projet.",
      },
      {
        href: "/conseil-ia/lyon",
        label: "Le conseil IA à Lyon, en détail",
        hint: "Audit, expert ou cabinet de conseil : la comparaison pour une PME lyonnaise.",
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
