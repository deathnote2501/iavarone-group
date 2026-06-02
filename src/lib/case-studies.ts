/**
 * Cas clients réels — signal E-E-A-T « Experience » (le plus fort).
 * Données issues de missions de conseil chiffrées par Jérôme Iavarone.
 * Chaque cas alimente la page /references, la section accueil et le JSON-LD.
 */
export interface CaseMetric {
  value: string;
  label: string;
}

export interface CaseStudy {
  slug: string;
  client: string;
  sector: string;
  service: "conseil-ia" | "formation-ia" | "agent-ia";
  /** Métrique phare mise en avant (carte accueil + en-tête de cas). */
  headline: CaseMetric;
  challenge: string;
  solution: string;
  metrics: CaseMetric[];
  qualityGains?: string[];
}

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    slug: "amefa-service-client",
    client: "Amefa",
    sector: "Industrie — service client",
    service: "conseil-ia",
    headline: { value: "ROI ×4", label: "10 000 € de gains/an pour 2 400 € investis" },
    challenge:
      "Le service client passait jusqu'à 3 heures à rédiger certains e-mails, avec des délais de réponse longs et une qualité inégale sur les dossiers sensibles (clients étrangers, courriers agressifs).",
    solution:
      "Mise en place d'un assistant de rédaction IA générative branché sur les cas réels du service client : génération de réponses personnalisées, empathiques et au ton neutre, relecture orthographique automatique, et gabarits par typologie de demande.",
    metrics: [
      { value: "47 jours/an", label: "économisés par opérateur (20 % du temps)" },
      { value: "1h30 ↘ 3h", label: "pour rédiger un e-mail service client" },
      { value: "2 mois", label: "seuil de rentabilité atteint" },
      { value: "10 000 €", label: "de gains annuels (investissement : 2 400 €)" },
    ],
    qualityGains: [
      "Délai de réponse réduit de 50 %",
      "E-mails sans fautes, personnalisés et au ton neutre même face à des messages agressifs",
      "Moins d'allers-retours pour résoudre les demandes des clients hors France",
    ],
  },
  {
    slug: "cabinet-recrutement",
    client: "Cabinet de recrutement & management de transition",
    sector: "Ressources humaines",
    service: "conseil-ia",
    headline: { value: "−50 %", label: "de temps sur le processus de recrutement" },
    challenge:
      "Avec ~300 recrutements et 30 000 CV traités par an, les tâches à faible valeur (tri des CV, rédaction d'offres, préparation des entretiens) saturaient les équipes.",
    solution:
      "Déploiement de l'IA générative sur les trois goulots d'étranglement du cycle de recrutement : rédaction des offres, tri et scoring des CV, génération des questions d'entretien et des scorecards.",
    metrics: [
      { value: "105 jours/an", label: "économisés au total (50 % du temps)" },
      { value: "10 min ↘ 45 min", label: "pour rédiger une offre de recrutement" },
      { value: "75h ↘ 375h", label: "pour trier 30 000 CV (−45 jours)" },
      { value: "20 j ↘ 85 j", label: "pour les questions d'entretien + scorecards" },
    ],
  },
  {
    slug: "gladel-administrateur-judiciaire",
    client: "Gladel",
    sector: "Administrateur judiciaire",
    service: "conseil-ia",
    headline: { value: "15 min ↘ 3h", label: "pour produire un compte rendu de réunion" },
    challenge:
      "La rédaction des comptes rendus de réunion (2 à 3 par semaine) mobilisait jusqu'à 3 heures chacune, avec des délais de livraison d'une à deux semaines.",
    solution:
      "Chaîne de transcription et de synthèse assistée par IA : génération automatique de comptes rendus structurés à partir des réunions, prêts à relire et à diffuser.",
    metrics: [
      { value: "55 jours/an", label: "économisés (l'équivalent d'un quart-temps)" },
      { value: "35h ↘ 425h", label: "de rédaction de comptes rendus sur l'année" },
      { value: "24h ↘ 1–2 semaines", label: "délai de livraison des comptes rendus" },
    ],
    qualityGains: [
      "Comptes rendus plus détaillés et plus précis qu'auparavant",
      "Délai de livraison passé de 1–2 semaines à 24 heures",
    ],
  },
  {
    slug: "agent-immobilier",
    client: "Agence immobilière",
    sector: "Immobilier",
    service: "conseil-ia",
    headline: { value: "40 jours/an", label: "de temps administratif libéré" },
    challenge:
      "Comptes rendus de visite, rédaction d'annonces, publications réseaux sociaux et recherche documentaire consommaient un temps considérable au détriment de la relation client.",
    solution:
      "Boîte à outils IA générative dédiée aux tâches récurrentes de l'agent : comptes rendus de visite, annonces immobilières, posts réseaux sociaux et recherche documentaire.",
    metrics: [
      { value: "40 jours/an", label: "économisés au total" },
      { value: "1 j ↘ 13 j", label: "de rédaction d'annonces immobilières (−12 j)" },
      { value: "1 j ↘ 12 j", label: "de comptes rendus de visite (−11 j)" },
      { value: "3 j ↘ 15 j", label: "de recherche documentaire (−12 j)" },
    ],
  },
] as const;
