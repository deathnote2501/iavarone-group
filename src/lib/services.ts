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
  faq: (city: string) => { q: string; a: string }[];
  cta: string;
}

export const SERVICES: Record<ServiceSlug, Service> = {
  "formation-ia": {
    slug: "formation-ia",
    title: "Formation IA",
    short: "Formations Qualiopi en IA générative pour vos équipes",
    longTitle: (city) => `Formation IA générative à ${city} — Qualiopi`,
    metaDescription: (city) =>
      `Formation IA générative à ${city} : ChatGPT, Claude, Gemini, automatisation n8n/Make, Vibe Coding. Sessions inter ou intra-entreprise, finançables Qualiopi OPCO / CPF. 4.9/5, 1000+ professionnels formés.`,
    icon: GraduationCap,
    color: "blue",
    brand: {
      name: "Jérôme Iavarone",
      url: "https://jeromeiavarone.fr",
      tagline: "Formation IA générative — Qualiopi",
    },
    intro: (city) =>
      `Vos équipes à ${city} ont besoin de monter en compétence sur l'IA générative ? Je conçois et anime des formations sur mesure, finançables par votre OPCO ou via le CPF, en présentiel à ${city} ou en distanciel. Mes parcours couvrent ChatGPT, Claude, Gemini, l'automatisation n8n/Make/Zapier et le Vibe Coding (développement assisté par IA).`,
    pillars: [
      {
        title: "Programmes adaptés à votre métier",
        description:
          "Chaque formation est construite à partir de vos cas d'usage réels. Pas de slides génériques : on travaille sur vos données, vos process et vos outils existants.",
      },
      {
        title: "Certification Qualiopi",
        description:
          "Toutes les formations sont éligibles aux dispositifs de financement : OPCO, plan de formation entreprise, CPF, FNE. Documentation administrative complète fournie.",
      },
      {
        title: "Formats flexibles",
        description:
          "Sessions d'1/2 journée à 5 jours, en inter ou intra-entreprise, sur site à votre adresse ou en visio. Adaptation possible aux contraintes opérationnelles.",
      },
    ],
    faq: (city) => [
      {
        q: `Quel est le tarif d'une formation IA à ${city} ?`,
        a: `Le tarif varie selon le format (intra/inter), la durée et le nombre de participants. Comptez 1 500–2 500 € HT/jour pour une formation intra-entreprise à ${city}. Devis personnalisé sous 48h. Toutes les formations sont finançables par votre OPCO ou via le CPF.`,
      },
      {
        q: "La formation est-elle finançable par mon OPCO ?",
        a: "Oui. L'organisme de formation est certifié Qualiopi, ce qui rend les formations éligibles aux financements OPCO, plan de formation entreprise, FNE et CPF. La documentation administrative (convention, programme, attestations) est fournie pour faciliter votre demande.",
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
    cta: "Demander un programme de formation",
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
    cta: "Demander un cadrage gratuit",
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
    cta: "Estimer mon agent IA",
  },
};

export const SERVICES_LIST: Service[] = Object.values(SERVICES);
