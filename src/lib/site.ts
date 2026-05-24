export const SITE = {
  name: "Groupe IAvarone",
  shortName: "IAvarone Group",
  url: "https://iavarone-group.fr",
  baseline: "L'IA générative au service des entreprises, en Auvergne-Rhône-Alpes et au-delà.",
  description:
    "Le Groupe IAvarone rassemble six activités complémentaires en intelligence artificielle générative : conseil, formation, développement, agents IA autonomes et SaaS B2B.",
  founder: {
    name: "Jérôme Iavarone",
    role: "Fondateur — Formateur & Consultant IA générative",
    photo: "/photo-jerome.jpg",
  },
  contact: {
    email: "jerome.iavarone@gmail.com",
    phone: "06 28 07 09 88",
    phoneHref: "tel:+33628070988",
    booking: "https://koalendar.com/e/rdv-avec-jerome-iavarone",
  },
  social: {
    linkedin: "https://www.linkedin.com/in/jeromeiavarone/",
    github: "https://github.com/deathnote2501",
  },
  legal: {
    sas: "IAvarone Conseil — SAS",
    ei: "Jérôme Iavarone — Entreprise Individuelle",
  },
} as const;

export const BRANDS = [
  {
    slug: "jeromeiavarone",
    name: "Jérôme Iavarone",
    tagline: "Formation IA générative — Qualiopi",
    description:
      "Formations Claude, ChatGPT, Gemini, Vibe Coding, automatisation n8n/Make. 1 000+ professionnels formés depuis 2020.",
    url: "https://jeromeiavarone.fr",
    color: "blue",
    structure: "EI",
  },
  {
    slug: "iavarone-conseil",
    name: "IAvarone Conseil",
    tagline: "Applications métier sur mesure pour PME",
    description:
      "Apps web, dashboards, CRM/ERP légers, intégration IA dans vos outils existants. Livré en 4–8 semaines, 5–20 k€.",
    url: "https://iavarone-conseil.fr",
    color: "green",
    structure: "SAS",
  },
  {
    slug: "employe-ia",
    name: "Employé IA",
    tagline: "Agents IA autonomes pour PME/ETI",
    description:
      "Prospection B2B, support N1, relances WhatsApp, SEO. Setup à partir de 1 850€ + abonnement mensuel sans engagement.",
    url: "https://employe-ia.fr",
    color: "yellow",
    structure: "SAS",
  },
  {
    slug: "kaliio",
    name: "Kaliio",
    tagline: "SaaS Qualiopi pour organismes de formation",
    description:
      "Émargement numérique, génération de docs, conformité Qualiopi. Gratuit, conçu avec une évaluatrice COFRAC. 100+ OF utilisateurs.",
    url: "https://kaliio.fr",
    color: "blue",
    structure: "SAS",
  },
  {
    slug: "rgaa-ia",
    name: "Conform-RGAA",
    tagline: "Audit accessibilité RGAA assisté par IA",
    description:
      "4 documents légaux RGAA prêts à publier (déclaration, schéma, plan, bilan). Pack 3 ans à 290€, conforme EAA 2025.",
    url: "https://rgaa-ia.fr",
    color: "red",
    structure: "SAS",
  },
  {
    slug: "fit",
    name: "FIT",
    tagline: "E-commerce B2B fournitures industrielles",
    description:
      "Distribution directe par colis de visserie, boulonnerie, fixations. Piloté par Claude via API REST.",
    url: "https://fit-opal-pi.vercel.app",
    color: "green",
    structure: "SAS",
  },
] as const;

export type Brand = (typeof BRANDS)[number];

export const CITIES = [
  { slug: "clermont-ferrand", name: "Clermont-Ferrand", region: "Puy-de-Dôme", lat: 45.7797, lng: 3.0863, hub: true },
  { slug: "riom", name: "Riom", region: "Puy-de-Dôme", lat: 45.8946, lng: 3.1129 },
  { slug: "vichy", name: "Vichy", region: "Allier", lat: 46.1278, lng: 3.4253 },
  { slug: "issoire", name: "Issoire", region: "Puy-de-Dôme", lat: 45.5446, lng: 3.2497 },
  { slug: "thiers", name: "Thiers", region: "Puy-de-Dôme", lat: 45.8569, lng: 3.5478 },
  { slug: "aurillac", name: "Aurillac", region: "Cantal", lat: 44.9272, lng: 2.4444 },
  { slug: "le-puy-en-velay", name: "Le Puy-en-Velay", region: "Haute-Loire", lat: 45.0428, lng: 3.8853 },
  { slug: "moulins", name: "Moulins", region: "Allier", lat: 46.5667, lng: 3.3333 },
  { slug: "roanne", name: "Roanne", region: "Loire", lat: 46.0367, lng: 4.0683 },
  { slug: "saint-etienne", name: "Saint-Étienne", region: "Loire", lat: 45.4397, lng: 4.3872, hub: true },
  { slug: "bourg-en-bresse", name: "Bourg-en-Bresse", region: "Ain", lat: 46.2044, lng: 5.2256 },
  { slug: "annecy", name: "Annecy", region: "Haute-Savoie", lat: 45.8992, lng: 6.1294 },
  { slug: "chambery", name: "Chambéry", region: "Savoie", lat: 45.5646, lng: 5.9178 },
  { slug: "valence", name: "Valence", region: "Drôme", lat: 44.9333, lng: 4.8917 },
  { slug: "grenoble", name: "Grenoble", region: "Isère", lat: 45.1885, lng: 5.7245 },
  { slug: "lyon", name: "Lyon", region: "Rhône", lat: 45.7640, lng: 4.8357, hub: true },
  { slug: "paris", name: "Paris", region: "Île-de-France", lat: 48.8566, lng: 2.3522, hub: true },
] as const;
