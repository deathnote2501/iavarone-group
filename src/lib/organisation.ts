// Organisation augmentée par l'IA, telle que documentée au 7 octobre 2026.
// Sources (lecture seule) : configuration et consignes des orchestrateurs du dépôt iac_routines,
// écrans de l'ERP interne. Ce sont des preuves de conception et de périmètre, pas un état
// en temps réel : le statut « pause » est celui de la configuration à cette date.

export const ORG_PATH = "/notre-organisation";

export const ORG_AS_OF = "7 octobre 2026";

export const ORG_BOOKING_SOURCE = "iavarone-group-cas-agence";

export const ORG_STUDIES = {
  agence: "https://iavarone-conseil.fr/realisations/agence-ia",
  erp: "https://iavarone-conseil.fr/realisations/erp-iavarone-conseil",
  agents: "https://employe-ia.fr/cas/agence-ia-iavarone-conseil",
} as const;

export interface OrgAgent {
  name: string;
  /** Short role shown on the closed card. */
  role: string;
  mission: string;
  trigger: string;
  deliverable: string;
  autonomy: string;
  /** Date the agent's schedule was paused; absent for a scheduled agent. */
  pausedSince?: string;
}

export interface OrgPole {
  id: string;
  name: string;
  color: "blue" | "green" | "yellow" | "red";
  summary: string;
  note?: string;
  agents: OrgAgent[];
}

const SAAS_AUTONOMY =
  "Met en production seul les changements qui passent les tests automatiques ; Jérôme fixe le cap et relit chaque compte rendu.";

export const ORG_POLES: OrgPole[] = [
  {
    id: "prestations",
    name: "Prestations",
    color: "blue",
    summary: "Faire connaître la formation, le conseil et le développement, et préparer les offres de demain.",
    note: "Les formations, les supports pédagogiques et les développements clients restent conduits par Jérôme : il en délègue des tâches précises à des agents de développement et relit le résultat.",
    agents: [
      {
        name: "Agent-Formation-IA",
        role: "Acquisition formation et conseil",
        mission: "Développer la visibilité et la prise de rendez-vous pour la formation, le coaching et le conseil en IA.",
        trigger: "Chaque nuit, et à la demande de Jérôme.",
        deliverable: "Actions de référencement et contenus sur les sites vitrines, suivi de la prospection.",
        autonomy: "Agit seul sur les sites de son périmètre ; tout message à un prospect ou à un client attend la validation de Jérôme.",
      },
      {
        name: "Agent-Dev-IA",
        role: "Acquisition développement et agents",
        mission: "Développer la visibilité et la prise de rendez-vous pour le développement d'applications et d'agents IA.",
        trigger: "Chaque nuit, et à la demande de Jérôme.",
        deliverable: "Une action de référencement par passage sur un site vitrine, des prises de contact ciblées proposées.",
        autonomy: "Agit seul sur les sites de son périmètre ; tout message à un prospect ou à un client attend la validation de Jérôme.",
      },
      {
        name: "Agent-Prospective",
        role: "Évolution des offres",
        mission: "Repérer de nouvelles prestations et de nouveaux canaux d'acquisition.",
        trigger: "Une fois par mois.",
        deliverable: "Rapport mensuel : au plus deux pistes de prestations et trois pistes d'acquisition, chacune avec un test de 2 à 4 semaines.",
        autonomy: "Cherche et évalue, n'exécute rien. Une piste retenue par Jérôme est confiée à Agent-Formation-IA ou à Agent-Dev-IA.",
      },
    ],
  },
  {
    id: "produits-saas",
    name: "Produits SaaS",
    color: "green",
    summary: "Faire grandir les logiciels en ligne et tester de nouveaux produits de niche.",
    note: "Une pause concerne l'agent, pas l'application : le logiciel reste en service.",
    agents: [
      {
        name: "Agent-RGAA",
        role: "Croissance de Conform-RGAA",
        mission: "Faire progresser le logiciel d'accessibilité rgaa-ia.fr : qualité, correctifs et référencement.",
        trigger: "Chaque nuit.",
        deliverable: "Correctifs et améliorations publiés sous forme de demandes de fusion testées.",
        autonomy: SAAS_AUTONOMY,
      },
      {
        name: "Agent-Ficheck",
        role: "Croissance de Ficheck",
        mission: "Faire progresser le logiciel ficheck.fr : qualité, correctifs et référencement.",
        trigger: "Chaque nuit.",
        deliverable: "Correctifs et améliorations publiés sous forme de demandes de fusion testées.",
        autonomy: SAAS_AUTONOMY,
      },
      {
        name: "Agent-Radar",
        role: "Nouveaux produits de niche",
        mission: "Repérer un besoin de niche, le tester avec une page vitrine, puis construire le logiciel si le test est concluant.",
        trigger: "Plusieurs passages chaque nuit.",
        deliverable: "Une vitrine de test sur un domaine, puis l'application après spécification.",
        autonomy: "Construit et publie seul ; l'achat d'un domaine, un service payant ou un remboursement attendent la validation de Jérôme.",
      },
      {
        name: "Agent-Radar (second moteur)",
        role: "Jumeau d'Agent-Radar",
        mission: "Le même travail, avec un autre moteur d'IA, sur les niches qu'Agent-Radar n'a pas réservées.",
        trigger: "Trois passages l'après-midi.",
        deliverable: "Une vitrine de test sur un domaine, puis l'application après spécification.",
        autonomy: "Mêmes règles qu'Agent-Radar : les dépenses attendent la validation de Jérôme.",
      },
      {
        name: "Agent-Kaliio",
        role: "Croissance de Kaliio",
        mission: "Faire progresser kaliio.fr, le logiciel des organismes de formation.",
        trigger: "Planification arrêtée ; Jérôme peut encore le solliciter.",
        deliverable: "Correctifs de bugs, propositions d'évolutions issues des retours utilisateurs.",
        autonomy: "Corrige seul les bugs ; les évolutions sont soumises à Jérôme.",
        pausedSince: "7 octobre 2026",
      },
      {
        name: "Agent-Kaliopi",
        role: "Croissance de Kaliopi",
        mission: "Faire progresser kaliopi.io, le logiciel de conformité Qualiopi.",
        trigger: "Planification arrêtée ; Jérôme peut encore le solliciter.",
        deliverable: "Correctifs et améliorations publiés sous forme de demandes de fusion testées.",
        autonomy: SAAS_AUTONOMY,
        pausedSince: "5 octobre 2026",
      },
    ],
  },
  {
    id: "gestion",
    name: "Gestion",
    color: "yellow",
    summary: "Préparer les décisions de la semaine et du mois à partir de données recoupées.",
    agents: [
      {
        name: "Agent-ERP",
        role: "Revue hebdomadaire",
        mission: "Dresser l'état des lieux de la semaine : devis, factures, Qualiopi, rendez-vous. Il recoupe l'ERP, les emails, l'agenda et les dossiers avant de recommander.",
        trigger: "Chaque lundi, avant le point de la semaine.",
        deliverable: "Au plus douze actions de la semaine, chacune avec sa preuve.",
        autonomy: "Lecture seule : il ne modifie rien dans l'ERP et n'envoie rien sans validation.",
      },
      {
        name: "Agent-Finances",
        role: "Revue financière",
        mission: "Analyser la situation financière et fiscale des deux structures et repérer les optimisations possibles.",
        trigger: "Une fois par mois.",
        deliverable: "Rapport mensuel et au plus trois recommandations, chacune avec son gain, son effort et son risque.",
        autonomy: "Ne touche jamais à l'argent ; signale quand l'avis d'un expert-comptable est nécessaire.",
      },
    ],
  },
  {
    id: "systeme-qualite",
    name: "Système et qualité",
    color: "red",
    summary: "Garder les outils simples, le code relu et les automatisations en état de marche.",
    note: "Un contrôle indépendant, sans IA, vérifie matin et soir que chaque automatisation a laissé sa trace et alerte sinon.",
    agents: [
      {
        name: "Agent-SI",
        role: "Système d'information",
        mission: "Garder le système d'information simple, cohérent et sûr.",
        trigger: "Chaque dimanche.",
        deliverable: "Trois à cinq constats classés par impact.",
        autonomy: "Seul pour la documentation et le nettoyage ; le reste sur validation.",
      },
      {
        name: "Agent-0_dev",
        role: "Qualité des projets de développement",
        mission: "Revue de code tournante des projets qui n'ont pas d'agent attitré.",
        trigger: "Deux fois par semaine.",
        deliverable: "Un projet revu par passage : trois à cinq constats et leurs correctifs.",
        autonomy: "Projets internes : correctif fusionné si tous les contrôles automatiques passent. Projets clients : correctif proposé, jamais fusionné sans la recette de Jérôme.",
      },
      {
        name: "Agent-Routines",
        role: "Réparation des automatisations",
        mission: "Diagnostiquer et réparer les automatisations signalées par le contrôle indépendant.",
        trigger: "Matin et soir, seulement si une anomalie nouvelle est signalée.",
        deliverable: "Pour chaque anomalie : la cause, la correction et ce qui reste à décider.",
        autonomy: "Répare seul l'infrastructure des automatisations ; code d'application, données, secrets et dépenses sur validation. Il ne peut pas couper le contrôle indépendant.",
      },
    ],
  },
];

export const ORG_COUNTS = {
  configured: ORG_POLES.reduce((n, p) => n + p.agents.length, 0),
  active: ORG_POLES.reduce((n, p) => n + p.agents.filter((a) => !a.pausedSince).length, 0),
};

/** Shared foundation: where work is exchanged, tracked and done. */
export const ORG_FOUNDATION = [
  {
    name: "Slack",
    verb: "Échanger et valider",
    text: "Chaque agent a son canal : il y rend compte en dix lignes au plus et y demande une validation par bouton.",
  },
  {
    name: "ERP",
    verb: "Suivre l'activité",
    text: "Clients, devis, factures, et la trace de chaque exécution : statut, durée, résumé.",
  },
  {
    name: "Outils métier",
    verb: "Travailler",
    text: "Dépôts de code, messagerie, agenda, documents et la documentation de chaque projet.",
  },
] as const;

/** Shared services: scheduled routines that agents read but do not manage. */
export const ORG_SHARED_SERVICES = [
  "Tri et relances des emails",
  "Rappels de rendez-vous",
  "Suivi du référencement",
  "Veille Qualiopi",
] as const;

/** Contextual proof block on related brand and service pages, keyed by their slug. */
export const ORG_PROOFS: Record<string, { text: string; study?: { href: string; label: string } }> = {
  "iavarone-conseil": {
    text: "IAvarone Conseil applique d'abord sa méthode à sa propre entreprise : des agents spécialisés organisés en pôles et un ERP développé en interne pour suivre clients, devis, factures et automatisations.",
    study: { href: ORG_STUDIES.erp, label: "L'étude de cas de l'ERP, sur iavarone-conseil.fr" },
  },
  "employe-ia": {
    text: "Les agents d'Employé IA s'appuient sur l'organisation qui fait tourner le groupe : des agents aux rôles écrits, qui rendent compte et demandent une validation pour les décisions engageantes.",
    study: { href: ORG_STUDIES.agents, label: "Les agents au travail, sur employe-ia.fr" },
  },
  "agent-ia": {
    text: "Avant de déployer des agents chez nos clients, nous les faisons travailler chez nous : quatre pôles d'agents aux missions écrites, qui rendent compte dans Slack et laissent les décisions engageantes au dirigeant.",
    study: { href: ORG_STUDIES.agents, label: "Les agents au travail, sur employe-ia.fr" },
  },
};
