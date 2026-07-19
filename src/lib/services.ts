import type { LucideIcon } from "lucide-react";
import { GraduationCap, Briefcase, Bot } from "lucide-react";

export type ServiceSlug = "formation-ia" | "conseil-ia" | "agent-ia";

export interface Service {
  slug: ServiceSlug;
  title: string;
  short: string;
  longTitle: (city: string) => string;
  metaDescription: (city: string) => string;
  icon: LucideIcon;
  color: "blue" | "green" | "yellow";
  brand: { name: string; url: string; tagline: string };
  intro: (city: string) => string;
  pillars: { title: string; description: string }[];
  /** Cas d'usage concrets du service (titre + bénéfice). Affichés sur la page
   * ville pour densifier le contenu et cibler les requêtes longue traîne. */
  useCases: { title: string; description: string }[];
  /** Étapes de la mission, pour rassurer et structurer (process visible). */
  process: { step: string; detail: string }[];
  /** Accroche locale data-driven : combine le service avec les filières et le
   * contexte économique propres à CHAQUE ville (évite le contenu dupliqué). */
  localAngle: (city: { name: string; region: string; industries: string[] }) => string;
  faq: (city: string) => { q: string; a: string }[];
  /** FAQ niveau région pour la page hub (ciblant les "People Also Ask" Google). */
  hubFaq: { q: string; a: string }[];
  cta: string;
  // --- Champs spécifiques à la page hub /[service], optimisés SEO sur les
  // mots-clés à volume et faible difficulté (source : DataForSEO, voir
  // scripts/dfs/data/keyword-opportunities.json). Distincts de `title`/`short`
  // qui restent courts pour les fils d'Ariane et les cartes.
  hubMetaTitle: string;
  hubMetaDescription: string;
  hubH1: string;
  hubLede: string;
  /** `link` ajoute une phrase complémentaire terminant la section, avec un lien
   * contextuel vers la marque du groupe qui porte le sujet (maillage inter-domaines). */
  hubSections: {
    h2: string;
    body: string;
    link?: { before: string; anchor: string; href: string; after: string };
  }[];
}

export const SERVICES: Record<ServiceSlug, Service> = {
  "formation-ia": {
    slug: "formation-ia",
    title: "Formation IA",
    short: "Formations Qualiopi en IA générative pour vos équipes",
    longTitle: (city) => `Formation IA générative à ${city} — Qualiopi`,
    metaDescription: (city) =>
      `Formation IA générative à ${city} : ChatGPT, Claude, Gemini, automatisation n8n/Make, Vibe Coding. Sessions inter ou intra-entreprise, certifiées Qualiopi et finançables OPCO. 4.9/5, 1000+ professionnels formés.`,
    icon: GraduationCap,
    color: "blue",
    brand: {
      name: "Jérôme Iavarone",
      url: "https://jeromeiavarone.fr",
      tagline: "Formation IA générative — Qualiopi",
    },
    intro: (city) =>
      `Vos équipes à ${city} ont besoin de monter en compétence sur l'IA générative ? Je conçois et anime des formations sur mesure, finançables par votre OPCO, en présentiel à ${city} ou en distanciel. Mes parcours couvrent ChatGPT, Claude, Gemini, l'automatisation n8n/Make/Zapier et le Vibe Coding (développement assisté par IA).`,
    pillars: [
      {
        title: "Programmes adaptés à votre métier",
        description:
          "Chaque formation est construite à partir de vos cas d'usage réels. Pas de slides génériques : on travaille sur vos données, vos process et vos outils existants.",
      },
      {
        title: "Certification Qualiopi",
        description:
          "Toutes les formations sont éligibles au financement OPCO et au plan de développement des compétences de l'entreprise. Documentation administrative complète fournie.",
      },
      {
        title: "Formats flexibles",
        description:
          "Sessions d'1/2 journée à 5 jours, en inter ou intra-entreprise, sur site à votre adresse ou en visio. Adaptation possible aux contraintes opérationnelles.",
      },
    ],
    useCases: [
      {
        title: "Maîtriser ChatGPT, Claude & Gemini au quotidien",
        description:
          "Vos équipes apprennent à rédiger des prompts efficaces, exploiter les contextes longs et fiabiliser les réponses sur leurs propres documents métier.",
      },
      {
        title: "Automatiser sans coder (n8n, Make, Zapier)",
        description:
          "Construire des workflows qui relient vos outils (Gmail, CRM, Notion) et suppriment les tâches répétitives, sur des scénarios issus de votre activité.",
      },
      {
        title: "Vibe Coding : prototyper une app interne",
        description:
          "Développement assisté par IA (Claude Code) pour créer dashboards et petits outils internes sans équipe technique dédiée.",
      },
      {
        title: "Encadrer l'usage : RGPD, IA Act & charte IA",
        description:
          "Cadrer un usage conforme et sécurisé de l'IA dans l'entreprise (données personnelles, IA Act, charte interne) pour éviter les dérives.",
      },
    ],
    process: [
      { step: "Cadrage", detail: "Audit des besoins, du niveau des équipes et des cas d'usage prioritaires (visio, gratuit)." },
      { step: "Programme sur mesure", detail: "Construction d'un parcours sur vos données et vos outils, validé avant la session." },
      { step: "Animation", detail: "Atelier en présentiel sur site ou en distanciel, 100 % pratique, supports fournis." },
      { step: "Suivi", detail: "Attestation Qualiopi, ressources post-formation et point à 30 jours pour ancrer les acquis." },
    ],
    localAngle: (city) =>
      `Les entreprises de ${city} (${city.industries.slice(0, 3).join(", ")}) font face aux mêmes enjeux : monter en compétence vite sur l'IA générative sans mobiliser des semaines de R&D. Une formation ancrée dans le tissu économique de ${city.region} — vos métiers, vos contraintes réglementaires, vos outils — produit des résultats que des slides génériques n'atteindront jamais.`,
    faq: (city) => [
      {
        q: `Quel est le tarif d'une formation IA à ${city} ?`,
        a: `Le tarif varie selon le format (intra/inter), la durée et le nombre de participants. Comptez 1 500–2 500 € HT/jour pour une formation intra-entreprise à ${city}. Devis personnalisé sous 48h. Toutes les formations sont finançables par votre OPCO.`,
      },
      {
        q: "La formation est-elle finançable par mon OPCO ?",
        a: "Oui. L'organisme de formation est certifié Qualiopi, ce qui rend les formations éligibles au financement OPCO et au plan de développement des compétences de l'entreprise. La documentation administrative (convention, programme, attestations) est fournie pour faciliter votre demande.",
      },
      {
        q: `Faites-vous des formations en présentiel à ${city} ?`,
        a: `Oui, intervention en présentiel à ${city} et dans toute la région Auvergne-Rhône-Alpes. Le distanciel via visio est également disponible pour les équipes multi-sites.`,
      },
      {
        q: "Quels sujets sont couverts ?",
        a: "ChatGPT / Claude / Gemini : prompt engineering, contextes longs, agents. Automatisation : n8n, Make, Zapier. Développement : Vibe Coding avec Claude Code. Conformité : RGPD, IA Act, charte IA. Cas d'usage métier sur demande.",
      },
    ],
    hubFaq: [
      {
        q: "Quel est le prix moyen d'une formation en IA générative ?",
        a: "Pour une formation intra-entreprise sur mesure, comptez 1 500 à 2 500 € HT par jour (groupe complet, pas par participant). Les catalogues inter-entreprises standardisés se situent plutôt entre 800 et 2 000 € HT par personne et par jour. Toutes mes formations sont certifiées Qualiopi et donc finançables par votre OPCO ou le plan de développement des compétences de l'entreprise.",
      },
      {
        q: "Quelle est la meilleure formation à l'IA pour une entreprise ?",
        a: "La meilleure formation IA pour une entreprise n'est pas un catalogue générique mais un programme construit sur vos cas d'usage réels : vos données, vos process, vos outils. C'est l'approche que j'applique — ChatGPT, Claude, Gemini, prompt engineering, automatisation n8n/Make et Vibe Coding — adaptée au niveau et au métier de vos équipes.",
      },
      {
        q: "La formation IA est-elle finançable par mon OPCO ?",
        a: "Oui. L'organisme de formation est certifié Qualiopi (Actions de formation), ce qui rend les formations éligibles au financement OPCO et au plan de développement des compétences de l'entreprise. La documentation administrative complète (convention, programme, attestations) est fournie pour faciliter votre demande.",
      },
      {
        q: "Où se former à ChatGPT et à l'IA en Auvergne-Rhône-Alpes ?",
        a: "J'interviens en présentiel dans 17 villes (Clermont-Ferrand, Lyon, Saint-Étienne, Grenoble, Annecy, Chambéry, Valence, Vichy, Roanne, Paris…) et en distanciel partout en France. Chaque ville dispose d'une page dédiée avec le contexte local et les modalités d'intervention.",
      },
    ],
    cta: "Demander un programme de formation",
    hubMetaTitle: "Formation IA & IA générative — Qualiopi, OPCO",
    hubMetaDescription:
      "Formation IA et IA générative en entreprise : ChatGPT, Claude, Gemini, automatisation n8n/Make. Certifiée Qualiopi, finançable OPCO. 1 000+ pros formés, 4,9/5.",
    hubH1: "Formation IA générative pour les entreprises et les pros",
    hubLede:
      "Montez en compétence sur l'IA générative : ChatGPT, Claude, Gemini, prompt engineering, automatisation n8n/Make et Vibe Coding. Formations sur mesure certifiées Qualiopi, finançables par votre OPCO, en présentiel en Auvergne-Rhône-Alpes ou en ligne partout en France.",
    hubSections: [
      {
        h2: "Formation IA finançable OPCO",
        body: "Organisme certifié Qualiopi (Actions de formation) : vos formations IA sont finançables par votre OPCO et le plan de développement des compétences de l'entreprise. Documentation administrative complète fournie (convention, programme, attestations).",
      },
      {
        h2: "Formation ChatGPT, Claude & Gemini",
        body: "Prise en main des principaux assistants IA (ChatGPT, Claude, Gemini), prompt engineering, exploitation des contextes longs et premiers agents. Des ateliers pratiques sur vos propres cas d'usage, pas des slides génériques.",
        link: {
          before: "Les équipes déjà à l'aise avec Claude peuvent aller plus loin avec la",
          anchor: "formation Claude Cowork",
          href: "https://jeromeiavarone.fr/formation-claude-cowork",
          after: ", consacrée à l'agent IA de bureau d'Anthropic qui travaille directement dans vos fichiers.",
        },
      },
      {
        h2: "Formation IA certifiante (Qualiopi)",
        body: "Toutes les sessions sont dispensées par un organisme certifié Qualiopi et donnent lieu à une attestation. Formats d'une demi-journée à 5 jours, en inter ou intra-entreprise.",
      },
      {
        h2: "En présentiel (Auvergne-Rhône-Alpes) ou en ligne",
        body: "Intervention en présentiel à Clermont-Ferrand, Lyon, Saint-Étienne, Grenoble, Annecy, Paris… et en distanciel partout en France pour les équipes multi-sites.",
      },
    ],
  },

  "conseil-ia": {
    slug: "conseil-ia",
    title: "Conseil IA",
    short: "Audit, stratégie et accompagnement IA pour PME",
    longTitle: (city) => `Consultant IA à ${city} — Audit & accompagnement PME`,
    metaDescription: (city) =>
      `Consultant IA à ${city} : audit IA, stratégie, accompagnement de PME et ETI. Identification des cas d'usage à fort impact, chiffrage, mise en œuvre. Pas une ESN, pas un chatbot plaqué.`,
    icon: Briefcase,
    color: "green",
    brand: {
      name: "IAvarone Conseil",
      url: "https://iavarone-conseil.fr",
      tagline: "Applications métier sur mesure pour PME",
    },
    intro: (city) =>
      `Vous dirigez une PME ou une ETI à ${city} et vous voulez tirer parti de l'IA générative sans tomber dans la fascination technologique ? Je vous accompagne pour identifier les vrais cas d'usage à fort impact dans votre organisation, les chiffrer, et les mettre en œuvre — souvent en 4 à 8 semaines, pour 5 à 20 k€.`,
    pillars: [
      {
        title: "Audit & cadrage",
        description:
          "Cartographie des processus métier, identification des 3-5 cas d'usage à fort ROI, chiffrage. Livrable sous 2 semaines.",
      },
      {
        title: "Développement d'applications",
        description:
          "Apps web métier, dashboards, CRM/ERP légers, intégration IA dans vos outils existants (Slack, Notion, Gmail, CRM). Livré en 4-8 semaines.",
      },
      {
        title: "Vibe Coding",
        description:
          "Méthode de développement utilisant Claude Code et GPT pour accélérer les tâches répétitives, avec relecture humaine et tests systématiques.",
      },
    ],
    useCases: [
      {
        title: "Automatiser la production documentaire",
        description:
          "Devis, comptes rendus, réponses aux appels d'offres, courriers : l'IA génère les premiers jets à partir de vos modèles, vous validez.",
      },
      {
        title: "Outiller la relation client",
        description:
          "Tri et réponse de niveau 1 aux demandes, qualification des leads, suivi commercial — intégrés à votre messagerie et votre CRM.",
      },
      {
        title: "Exploiter vos données métier",
        description:
          "Tableaux de bord et analyses automatisées (ventes, stocks, production) pour décider sur des chiffres à jour plutôt que sur des exports manuels.",
      },
      {
        title: "Développer une application métier sur mesure",
        description:
          "App web légère, CRM/ERP simplifié ou intégration IA dans vos outils existants, livrés en 4 à 8 semaines.",
      },
    ],
    process: [
      { step: "Cadrage gratuit", detail: "30 min pour comprendre votre contexte et vérifier qu'il y a un vrai ROI." },
      { step: "Audit", detail: "Cartographie des process, identification de 3 à 5 cas d'usage à fort impact, chiffrage. Livré en 2 semaines." },
      { step: "Mise en œuvre", detail: "Développement et intégration au livrable (pas au TJM), points hebdomadaires." },
      { step: "Mesure & extension", detail: "On mesure l'impact réel. Si ça marche, on étend ; sinon, on arrête." },
    ],
    localAngle: (city) =>
      `Les PME et ETI de ${city} — ${city.industries.slice(0, 3).join(", ")} — n'ont ni le temps ni l'envie d'une transformation IA théorique. L'enjeu en ${city.region} est concret : identifier 2 ou 3 automatisations qui font gagner des heures chaque semaine, les chiffrer honnêtement, et les déployer sans usine à gaz ni dépendance à une ESN.`,
    faq: (city) => [
      {
        q: `Combien coûte un consultant IA à ${city} ?`,
        a: `Mes interventions vont du forfait audit (3-6 k€) au projet complet (5-20 k€ pour 4-8 semaines). Pas de TJM à 1500€/j : je facture au livrable. Premier RDV de cadrage gratuit de 30 minutes pour estimer votre besoin.`,
      },
      {
        q: "Quels secteurs accompagnez-vous ?",
        a: "PME et ETI tous secteurs : commerce, industrie, services, artisanat, professions réglementées (experts-comptables, avocats, immobilier). Pas de spécialisation sectorielle : la méthode s'adapte.",
      },
      {
        q: `Intervenez-vous sur site à ${city} ?`,
        a: `Oui, déplacement à ${city} pour les phases de cadrage et de restitution. Le reste du travail se fait en distanciel pour optimiser le coût.`,
      },
      {
        q: "En quoi êtes-vous différent d'une ESN ?",
        a: "Pas d'équipe pléthorique facturée en régie. Pas de proposition de chatbot ChatGPT plaqué. Méthode produit : on cible un cas d'usage, on livre, on mesure. Si ça ne marche pas, on arrête. Si ça marche, on étend.",
      },
    ],
    hubFaq: [
      {
        q: "Combien coûte un consultant IA pour une PME ?",
        a: "Mes interventions vont du forfait audit (3-6 k€) au projet complet (5-20 k€ pour 4 à 8 semaines). Pas de TJM à rallonge : je facture au livrable, pas au temps passé. Le premier rendez-vous de cadrage de 30 minutes est gratuit pour estimer votre besoin et le ROI attendu.",
      },
      {
        q: "En quoi un consultant IA indépendant diffère-t-il d'une ESN ?",
        a: "Pas d'équipe pléthorique facturée en régie, pas de chatbot ChatGPT plaqué sur un besoin mal cadré. Méthode produit : on cible un cas d'usage à fort ROI, on chiffre, on livre, on mesure. Si ça ne marche pas, on arrête ; si ça marche, on étend. Un seul interlocuteur, du cadrage à la mise en production.",
      },
      {
        q: "Quels cas d'usage de l'IA générative ont le meilleur ROI en PME ?",
        a: "Les gains les plus rapides viennent souvent de l'automatisation documentaire (devis, comptes rendus, réponses aux appels d'offres), du support client de niveau 1, de la prospection commerciale et de l'analyse de données métier. L'audit initial sert précisément à prioriser les 3 à 5 cas d'usage à plus fort impact dans votre organisation.",
      },
      {
        q: "Combien de temps dure un projet d'intégration IA ?",
        a: "Un audit/cadrage est livré en 2 semaines. Un projet complet (développement d'une application métier, intégration dans vos outils existants) se livre généralement en 4 à 8 semaines, avec des points hebdomadaires et une mise en production progressive.",
      },
    ],
    cta: "Demander un cadrage gratuit",
    hubMetaTitle: "Agence IA & consultant IA — Audit IA pour PME",
    hubMetaDescription:
      "Agence IA & consultant IA pour PME et ETI : audit IA, stratégie, automatisation et intégration dans vos outils. Cas d'usage à fort ROI livrés en 4 à 8 semaines.",
    hubH1: "Agence IA & consultant IA pour PME et ETI",
    hubLede:
      "Vous voulez tirer parti de l'IA générative sans fascination technologique ? J'identifie les cas d'usage à fort ROI dans votre organisation, je les chiffre et je les mets en œuvre — souvent en 4 à 8 semaines, pour 5 à 20 k€.",
    hubSections: [
      {
        h2: "Audit IA",
        body: "Cartographie de vos processus métier et identification des 3 à 5 cas d'usage IA à plus fort impact, avec chiffrage. Livrable sous 2 semaines, prêt à décider.",
      },
      {
        h2: "Agence d'automatisation IA",
        body: "Au-delà du conseil, je développe et déploie : applications métier, dashboards, intégration de l'IA et automatisations (n8n, Make) dans vos outils existants (Slack, Notion, Gmail, CRM).",
      },
      {
        h2: "Consultant IA indépendant, pas une ESN",
        body: "Pas d'équipe pléthorique facturée en régie, pas de chatbot plaqué. Un seul interlocuteur du cadrage à la mise en production, facturé au livrable et non au TJM.",
      },
    ],
  },

  "agent-ia": {
    slug: "agent-ia",
    title: "Agent IA",
    short: "Agents IA autonomes : prospection, support, SEO, assistant",
    longTitle: (city) => `Agent IA à ${city} — Prospection, support, SEO autonomes`,
    metaDescription: (city) =>
      `Agent IA à ${city} : prospection B2B, support client niveau 1, relances WhatsApp, backlinks SEO. Setup à partir de 1 850€, abonnement mensuel sans engagement. Alternative au recrutement junior.`,
    icon: Bot,
    color: "yellow",
    brand: {
      name: "Employé IA",
      url: "https://employe-ia.fr",
      tagline: "Agents IA autonomes pour PME/ETI",
    },
    intro: (city) =>
      `Vous cherchez à automatiser des tâches répétitives sans recruter à ${city} ? Je conçois et déploie des agents IA autonomes supervisés sur mesure : prospection B2B (5-20 RDV/mois), support client niveau 1 (60-80% de traitement auto), relances WhatsApp d'upsell, backlinks SEO. Setup one-shot à partir de 1 850 €, puis abonnement mensuel sans engagement.`,
    pillars: [
      {
        title: "Agents sur mesure, pas de SaaS générique",
        description:
          "Chaque agent est conçu pour votre métier, vos outils, votre ton. Pas un chatbot standardisé : un vrai collaborateur numérique supervisé.",
      },
      {
        title: "Coût 6× inférieur à un junior",
        description:
          "Setup 1 850–3 850 € + abonnement 450–950 €/mois selon la complexité. Aucun engagement, on arrête si ça ne marche pas.",
      },
      {
        title: "Intégration à vos outils existants",
        description:
          "Gmail, Slack, Notion, CRM, ERP, WhatsApp Business, Calendly. L'agent s'intègre dans votre stack actuelle sans bouleverser vos process.",
      },
    ],
    useCases: [
      {
        title: "Agent de prospection B2B",
        description:
          "Recherche de prospects, cold email et séquences LinkedIn personnalisées : 5 à 20 rendez-vous qualifiés par mois sans recruter de SDR.",
      },
      {
        title: "Agent de support client niveau 1",
        description:
          "Tri des tickets et réponse automatique aux questions fréquentes, 60 à 80 % du volume traité, escalade humaine sur le reste.",
      },
      {
        title: "Agent de relance WhatsApp",
        description:
          "Relances d'upsell, prise de rendez-vous et recouvrement par messages personnalisés, 24/7, depuis WhatsApp Business.",
      },
      {
        title: "Agent SEO / backlinks",
        description:
          "Génération et publication de contenus et de backlinks (200 à 500 sites/mois) pour faire monter votre site dans Google.",
      },
    ],
    process: [
      { step: "Cadrage", detail: "On identifie le poste ou la tâche à automatiser et l'objectif chiffré (RDV, tickets, ventes)." },
      { step: "Conception", detail: "Agent sur mesure : métier, ton, outils, garde-fous. Connexion à votre stack existante." },
      { step: "Déploiement supervisé", detail: "Mise en route avec validation humaine des actions sensibles au démarrage." },
      { step: "Montée en autonomie", detail: "Le niveau d'autonomie augmente selon votre confiance ; abonnement sans engagement." },
    ],
    localAngle: (city) =>
      `Recruter à ${city} coûte cher et prend du temps, surtout pour des PME des filières ${city.industries.slice(0, 3).join(", ")}. Un agent IA autonome supervisé absorbe les tâches répétitives (prospection, support, relances) pour un coût environ 6× inférieur à un junior — un levier de productivité particulièrement adapté au tissu d'entreprises de ${city.region}.`,
    faq: (city) => [
      {
        q: `Quel est le tarif d'un agent IA à ${city} ?`,
        a: `Setup initial entre 1 850 € et 3 850 € one-shot, selon la complexité du poste à automatiser. Puis abonnement mensuel entre 450 € et 950 € (supervision, ajustements, montée en charge). Sans engagement, résiliable à tout moment.`,
      },
      {
        q: "Quels types d'agents proposez-vous ?",
        a: "Prospection B2B (cold email + LinkedIn), support client niveau 1 (FAQ + tri tickets), relances WhatsApp (upsell + recouvrement), backlinks/SEO (200-500 sites/mois), assistant polyvalent (CRM + emails + agenda).",
      },
      {
        q: `L'agent peut-il être déployé à ${city} ?`,
        a: `Oui, les agents sont déployés à distance et fonctionnent depuis vos outils existants. Le setup et la formation se font en visio ou en présentiel à ${city} selon votre préférence.`,
      },
      {
        q: "Comment se passe la supervision ?",
        a: "L'agent n'est jamais 100% autonome. Chaque jour, vous validez les actions sensibles (envois, rendez-vous, décisions). Au fil du temps, le niveau d'autonomie augmente selon votre confort.",
      },
    ],
    hubFaq: [
      {
        q: "Quel est le tarif d'un agent IA pour une entreprise ?",
        a: "Le déploiement d'un agent IA autonome supervisé se compose d'un setup one-shot entre 1 850 € et 3 850 € (selon la complexité du poste automatisé), puis d'un abonnement mensuel entre 450 € et 950 € (supervision, ajustements, montée en charge). Sans engagement, résiliable à tout moment — soit un coût environ 6× inférieur à un recrutement junior.",
      },
      {
        q: "Un agent IA est-il vraiment autonome ?",
        a: "Un agent IA bien conçu n'est jamais 100 % autonome au départ : chaque jour, vous validez les actions sensibles (envois, rendez-vous, décisions). Au fil du temps, le niveau d'autonomie augmente selon votre niveau de confiance. C'est une supervision décroissante, pas une boîte noire.",
      },
      {
        q: "Quels sont les avantages d'un agent IA pour une PME ?",
        a: "Automatiser des tâches répétitives sans recruter ni alourdir la masse salariale : prospection B2B (5-20 RDV/mois), support client niveau 1 (60-80 % de traitement automatisé), relances WhatsApp, génération de backlinks SEO. L'agent travaille 24/7 depuis vos outils existants (Gmail, Slack, CRM, WhatsApp Business).",
      },
      {
        q: "Quels types d'agents IA proposez-vous ?",
        a: "Prospection B2B (cold email + LinkedIn), support client niveau 1 (FAQ + tri des tickets), relances WhatsApp (upsell et recouvrement), agent SEO/backlinks (200-500 sites/mois) et assistant polyvalent (CRM + emails + agenda). Chaque agent est conçu sur mesure pour votre métier, vos outils et votre ton.",
      },
    ],
    cta: "Estimer mon agent IA",
    hubMetaTitle: "Agent IA & automatisation IA pour entreprises",
    hubMetaDescription:
      "Agents IA autonomes & automatisation IA pour PME : prospection B2B, support client, relances WhatsApp, SEO. Setup dès 1 850 €, sans engagement.",
    hubH1: "Agents IA autonomes & automatisation IA pour PME",
    hubLede:
      "Automatisez les tâches répétitives sans recruter : je conçois et déploie des agents IA autonomes supervisés sur mesure — prospection B2B, support client niveau 1, relances WhatsApp, SEO. Setup dès 1 850 €, puis abonnement mensuel sans engagement.",
    hubSections: [
      {
        h2: "Qu'est-ce qu'un agent IA ?",
        body: "Un agent IA est un programme autonome qui exécute des tâches de bout en bout (prospecter, répondre, relancer, publier) en s'appuyant sur un modèle d'IA et sur vos outils. Contrairement à un simple chatbot, il enchaîne des actions et prend des décisions — sous supervision humaine décroissante.",
      },
      {
        h2: "Automatisation IA (n8n, Make)",
        body: "Les agents s'appuient sur des automatisations no-code/low-code (n8n, Make) connectées à Gmail, Slack, Notion, votre CRM ou WhatsApp Business, pour travailler 24/7 dans votre stack existante.",
      },
      {
        h2: "Comment créer un agent IA pour votre entreprise",
        body: "On cible un poste à automatiser, on conçoit l'agent sur mesure (métier, outils, ton), on le déploie et on supervise. Setup 1 850–3 850 € puis abonnement 450–950 €/mois, résiliable à tout moment.",
      },
    ],
  },
};

export const SERVICES_LIST: Service[] = Object.values(SERVICES);
