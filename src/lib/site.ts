export const SITE = {
  name: "IAvarone Group",
  shortName: "IAvarone Group",
  url: "https://iavarone-group.fr",
  baseline: "L'IA générative au service des entreprises, en Auvergne-Rhône-Alpes et au-delà.",
  description:
    "IAvarone Group rassemble six activités complémentaires en intelligence artificielle générative : conseil, formation, développement, agents IA autonomes et SaaS B2B.",
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
  // Signaux de confiance E-E-A-T (expérience, expertise, autorité, fiabilité)
  proof: [
    { value: "Qualiopi", label: "Organisme certifié (Actions de formation)" },
    { value: "1 000+", label: "professionnels formés depuis 2020" },
    { value: "4,9/5", label: "satisfaction moyenne" },
    { value: "2020", label: "année de création du groupe" },
  ],
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
    category: "Formation professionnelle",
    targetAudience: "Salariés, dirigeants de PME/ETI, OPCO, organismes de formation",
    pricing: "1 500–2 500 € HT/jour (intra) · finançable OPCO, CPF, FNE",
    longDescription:
      "Marque historique du groupe et entreprise individuelle dédiée à la formation professionnelle continue, Jérôme Iavarone est certifiée Qualiopi (Actions de formation). Plus de 1 000 professionnels formés depuis 2020 dans la prise en main de ChatGPT, Claude, Gemini, l'automatisation no-code (n8n, Make, Zapier) et le Vibe Coding (développement assisté par IA avec Claude Code). Sessions inter ou intra-entreprise, en présentiel sur toute la région Auvergne-Rhône-Alpes ou en distanciel partout en France.",
    keyPoints: [
      "Certification Qualiopi (Actions de formation)",
      "Financements OPCO, CPF, FNE, plan de formation",
      "Programmes sur mesure à partir de vos cas d'usage réels",
      "1 000+ professionnels formés depuis 2020",
      "Satisfaction moyenne 4,9/5",
    ],
    cta: "Demander un programme de formation",
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
    category: "Conseil & développement",
    targetAudience: "PME et ETI tous secteurs, dirigeants et DSI",
    pricing: "Audit 3–6 k€ · projet complet 5–20 k€ (4–8 semaines)",
    longDescription:
      "SAS IAvarone Conseil porte les activités de conseil stratégique IA et de développement d'applications métier sur mesure. Méthode produit : on cible un cas d'usage à fort ROI, on chiffre, on livre, on mesure. Pas d'équipe pléthorique facturée en régie, pas de chatbot plaqué : des apps web métier, des dashboards, des CRM/ERP légers et de l'intégration IA dans vos outils existants (Slack, Notion, Gmail, CRM). Livraison en 4 à 8 semaines pour 5 à 20 k€.",
    keyPoints: [
      "Audit & cadrage en 2 semaines",
      "Développement en Vibe Coding (Claude Code) avec relecture humaine",
      "Intégration dans vos outils existants (pas de SaaS de plus)",
      "Premier RDV de cadrage gratuit de 30 minutes",
      "Facturation au livrable, pas au TJM",
    ],
    cta: "Demander un cadrage gratuit",
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
    category: "Agents IA autonomes",
    targetAudience: "PME et ETI cherchant à automatiser sans recruter (commerce, RH, support, marketing)",
    pricing: "Setup 1 850–3 850 € one-shot · abonnement 450–950 €/mois sans engagement",
    longDescription:
      "Employé IA conçoit et déploie des agents IA autonomes supervisés sur mesure : prospection B2B (5–20 RDV/mois), support client niveau 1 (60–80 % de traitement automatisé), relances WhatsApp d'upsell et de recouvrement, backlinks SEO (200–500 sites/mois), assistant polyvalent (CRM + emails + agenda). Coût 6× inférieur à un junior, sans engagement, résiliable à tout moment. Chaque agent est conçu pour votre métier, vos outils, votre ton — pas un chatbot standardisé.",
    keyPoints: [
      "Agents sur mesure (prospection, support, SEO, WhatsApp, assistant)",
      "Coût ≈ 6× inférieur à un recrutement junior",
      "Aucun engagement, résiliable à tout moment",
      "Supervision quotidienne — niveau d'autonomie progressif",
      "Intégration Gmail, Slack, Notion, CRM, WhatsApp Business",
    ],
    cta: "Estimer mon agent IA",
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
    category: "SaaS B2B — Organismes de formation",
    targetAudience: "Organismes de formation, indépendants formateurs, OF en démarche Qualiopi",
    pricing: "Gratuit (modèle freemium)",
    longDescription:
      "Kaliio est un SaaS conçu en collaboration avec une évaluatrice COFRAC pour répondre aux exigences réelles d'un audit Qualiopi. Émargement numérique conforme, génération automatique des documents administratifs (conventions, attestations, programmes), suivi des indicateurs Qualiopi, gestion des financements OPCO et CPF. Modèle freemium accessible à 100+ organismes de formation utilisateurs en France.",
    keyPoints: [
      "Conçu avec une évaluatrice COFRAC",
      "Émargement numérique légalement conforme",
      "Génération automatique des documents administratifs",
      "Gratuit en version freemium",
      "100+ organismes de formation utilisateurs",
    ],
    cta: "Créer un compte Kaliio gratuit",
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
    category: "Conformité accessibilité numérique",
    targetAudience: "PME, e-commerçants, agences web, collectivités soumises à l'EAA 2025",
    pricing: "Pack 3 ans à 290 € HT",
    longDescription:
      "Conform-RGAA produit les 4 documents légaux obligatoires de la conformité RGAA (Référentiel Général d'Amélioration de l'Accessibilité) : déclaration d'accessibilité, schéma pluriannuel, plan annuel, bilan annuel. Audit assisté par IA pour identifier les non-conformités prioritaires, documents prêts à publier, conformité avec l'European Accessibility Act 2025. Pack 3 ans à 290 € HT — alternative low-cost aux audits manuels à 5–15 k€.",
    keyPoints: [
      "4 documents légaux RGAA prêts à publier",
      "Conforme European Accessibility Act 2025",
      "Audit assisté par IA",
      "Pack 3 ans à 290 € HT",
      "Alternative aux audits manuels à 5-15 k€",
    ],
    cta: "Commander un pack Conform-RGAA",
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
    category: "E-commerce B2B industriel",
    targetAudience: "Acheteurs industriels, ateliers de production, sous-traitants mécaniques",
    pricing: "Vente directe par colis (B2B)",
    longDescription:
      "FIT est un e-commerce B2B de fournitures industrielles (visserie, boulonnerie, fixations) en distribution directe par colis. Particularité : la plateforme est entièrement pilotée par Claude (Anthropic) via une API REST — gestion produit, prix, recommandations, support. Démonstrateur opérationnel de la stack agent-IA-en-production d'IAvarone Group.",
    keyPoints: [
      "Distribution directe sans intermédiaire",
      "Plateforme pilotée par Claude (API REST)",
      "Démonstrateur de la stack agents-IA-en-production",
      "Visserie, boulonnerie, fixations",
    ],
    cta: "Voir le catalogue FIT",
  },
] as const;

export type Brand = (typeof BRANDS)[number];

export interface City {
  slug: string;
  name: string;
  region: string;
  lat: number;
  lng: number;
  hub?: boolean;
  population: string;
  industries: string[];
  economicContext: string;
  transportFromClermont: string;
  localExamples: string;
}

export const CITIES: readonly City[] = [
  {
    slug: "clermont-ferrand",
    name: "Clermont-Ferrand",
    region: "Puy-de-Dôme",
    lat: 45.7797,
    lng: 3.0863,
    hub: true,
    population: "147 000 habitants (300 000 en agglomération)",
    industries: ["Michelin", "Limagrain", "santé (CHU)", "pharma (Sanofi)", "université Clermont Auvergne"],
    economicContext:
      "Capitale de l'Auvergne et siège historique de Michelin, Clermont-Ferrand combine un tissu industriel dense (pneumatique, agroalimentaire, pharma) et un écosystème de recherche universitaire actif. Le Bivouac et la French Tech Clermont Auvergne fédèrent l'écosystème startup.",
    transportFromClermont: "Bureaux sur place",
    localExamples:
      "PME industrielles fournisseurs Michelin, ETI agroalimentaires (Limagrain, Volvic), cabinets de conseil régionaux, professions réglementées (experts-comptables, avocats), industries de la santé.",
  },
  {
    slug: "riom",
    name: "Riom",
    region: "Puy-de-Dôme",
    lat: 45.8946,
    lng: 3.1129,
    population: "18 500 habitants",
    industries: ["MSD Animal Health", "logistique (Riom-Sud)", "agroalimentaire", "patrimoine (cour d'appel)"],
    economicContext:
      "Riom, sous-préfecture historique du Puy-de-Dôme, abrite un pôle pharma (MSD Animal Health) et une zone logistique majeure (Riom-Sud) qui sert tout le centre de la France. La proximité avec Clermont-Ferrand en fait un hub PME naturel.",
    transportFromClermont: "15 min en voiture / 12 min en TER",
    localExamples:
      "PME logistiques, sous-traitants pharma, artisanat haut de gamme, cabinets juridiques (proximité cour d'appel).",
  },
  {
    slug: "vichy",
    name: "Vichy",
    region: "Allier",
    lat: 46.1278,
    lng: 3.4253,
    population: "25 000 habitants (80 000 agglomération)",
    industries: ["thermalisme", "cosmétique (Vichy/L'Oréal)", "tourisme MICE", "agro (Volvic à proximité)"],
    economicContext:
      "Reine des villes d'eaux et patrimoine UNESCO depuis 2021, Vichy concentre l'industrie cosmétique, le tourisme d'affaires et un secteur médico-social structuré autour du thermalisme. Forte saisonnalité touristique.",
    transportFromClermont: "55 min en voiture / 35 min en TER",
    localExamples:
      "PME cosmétique et bien-être, hôtellerie et tourisme MICE, centres de formation médicale, professions de santé libérales.",
  },
  {
    slug: "issoire",
    name: "Issoire",
    region: "Puy-de-Dôme",
    lat: 45.5446,
    lng: 3.2497,
    population: "14 000 habitants",
    industries: ["aéronautique (Constellium, Aubert & Duval)", "métallurgie", "agroalimentaire"],
    economicContext:
      "Pôle aéronautique majeur du Massif central avec Constellium (laminage aluminium aéro) et Aubert & Duval (aciers spéciaux pour Airbus, Safran, Dassault). Filière industrielle exigeante en qualité et conformité.",
    transportFromClermont: "35 min en voiture / 25 min en TER",
    localExamples:
      "Sous-traitants aéro, PME mécaniques de précision, services qualité industrielle, contrôle non-destructif.",
  },
  {
    slug: "thiers",
    name: "Thiers",
    region: "Puy-de-Dôme",
    lat: 45.8569,
    lng: 3.5478,
    population: "11 000 habitants",
    industries: ["coutellerie", "mécanique", "plasturgie", "ESS"],
    economicContext:
      "Capitale française de la coutellerie (70% de la production nationale), Thiers concentre des PME artisanales et industrielles à forte composante export. Tissu d'entreprises familiales en cours de digitalisation.",
    transportFromClermont: "45 min en voiture / 35 min en TER",
    localExamples:
      "Couteliers (Laguiole-en-Auvergne, Forge de Laguiole, Sabatier), PME mécaniques, ateliers de plasturgie, e-commerçants artisans.",
  },
  {
    slug: "aurillac",
    name: "Aurillac",
    region: "Cantal",
    lat: 44.9272,
    lng: 2.4444,
    population: "26 000 habitants",
    industries: ["agroalimentaire (laitier, viande)", "santé", "tourisme", "industrie du parapluie"],
    economicContext:
      "Préfecture du Cantal au cœur d'un département rural et agricole, Aurillac est portée par les filières lait/viande (AOP cantal, salers) et un tissu de PME locales orientées circuits courts et numérique tardif — opportunités fortes d'accompagnement IA.",
    transportFromClermont: "2h en voiture / 2h30 en train",
    localExamples:
      "Coopératives laitières et fromagères AOP, PME agroalimentaires, organismes de tourisme, professions médicales (désert médical).",
  },
  {
    slug: "le-puy-en-velay",
    name: "Le Puy-en-Velay",
    region: "Haute-Loire",
    lat: 45.0428,
    lng: 3.8853,
    population: "18 000 habitants (60 000 agglomération)",
    industries: ["dentelle", "agroalimentaire (lentille verte AOP)", "tourisme (Compostelle)", "papeterie"],
    economicContext:
      "Point de départ historique du chemin de Saint-Jacques-de-Compostelle, Le Puy combine artisanat (dentelle), agroalimentaire d'excellence (lentille verte AOP, Verveine du Velay) et tourisme religieux/culturel. PME familiales typiques.",
    transportFromClermont: "1h45 en voiture / 2h en TER",
    localExamples:
      "Coopératives lentilles, distilleries, hôtellerie sur le chemin de Compostelle, artisanat de la dentelle, presse régionale.",
  },
  {
    slug: "moulins",
    name: "Moulins",
    region: "Allier",
    lat: 46.5667,
    lng: 3.3333,
    population: "20 000 habitants",
    industries: ["mode (CNCS)", "agroalimentaire", "administration (préfecture)", "tourisme"],
    economicContext:
      "Préfecture de l'Allier et siège du Centre National du Costume de Scène, Moulins mixe administration, secteur culturel et un tissu de PME agroalimentaires. Proche de l'autoroute A71 (axe Paris-Clermont).",
    transportFromClermont: "1h30 en voiture / 1h en TER",
    localExamples:
      "Administrations et collectivités, PME agroalimentaires, secteur culturel (CNCS), professions juridiques.",
  },
  {
    slug: "roanne",
    name: "Roanne",
    region: "Loire",
    lat: 46.0367,
    lng: 4.0683,
    population: "35 000 habitants",
    industries: ["textile (Marque France)", "armement (Nexter)", "agroalimentaire", "gastronomie (Troisgros)"],
    economicContext:
      "Bassin industriel historique reconverti dans le textile haut de gamme (Made in France) et l'armement (Nexter pour le programme Scorpion), Roanne accueille aussi la maison Troisgros (3* Michelin). Tissu de PME industrielles en modernisation.",
    transportFromClermont: "2h en voiture / 2h en train (via Saint-Étienne)",
    localExamples:
      "PME textiles Made in France, sous-traitants armement, restauration gastronomique, formation continue industrielle.",
  },
  {
    slug: "saint-etienne",
    name: "Saint-Étienne",
    region: "Loire",
    lat: 45.4397,
    lng: 4.3872,
    hub: true,
    population: "172 000 habitants (400 000 agglomération)",
    industries: ["design (Cité du Design, UNESCO)", "optique-mécanique", "santé", "numérique", "manufacture armes"],
    economicContext:
      "Ville UNESCO du design, Saint-Étienne mute d'une économie minière vers le numérique, le design industriel et la santé. Mines Saint-Étienne et l'École Supérieure d'Art structurent un écosystème innovation actif (Cité du Design, Manufacture).",
    transportFromClermont: "2h15 en voiture / 3h en train (via Lyon)",
    localExamples:
      "Studios design industriel, ETI mécaniques (Hutchinson, Casino siège), startups numériques, secteur santé (CHU).",
  },
  {
    slug: "bourg-en-bresse",
    name: "Bourg-en-Bresse",
    region: "Ain",
    lat: 46.2044,
    lng: 5.2256,
    population: "42 000 habitants",
    industries: ["plasturgie (Plastics Vallée à proximité)", "agroalimentaire (AOP Bresse)", "Renault Trucks", "logistique"],
    economicContext:
      "Préfecture de l'Ain à mi-chemin entre Lyon et Genève, Bourg-en-Bresse est portée par Renault Trucks (1 800 salariés), la plasturgie de la Plastics Vallée voisine et l'agroalimentaire d'excellence (volaille de Bresse AOP).",
    transportFromClermont: "3h30 en voiture / 4h en train",
    localExamples:
      "Sous-traitants automobile poids lourds, PME plasturgie, agroalimentaire premium, logistique transalpine.",
  },
  {
    slug: "annecy",
    name: "Annecy",
    region: "Haute-Savoie",
    lat: 45.8992,
    lng: 6.1294,
    population: "131 000 habitants",
    industries: ["décolletage (Vallée de l'Arve)", "outdoor (Salomon, Mavic)", "tourisme premium", "tech (Out of Reach)"],
    economicContext:
      "Capitale des Alpes du Nord et bassin économique très dynamique (frontière suisse), Annecy concentre le décolletage (95% de la production française dans la Vallée de l'Arve voisine), le sport outdoor mondial (Salomon) et un secteur tech en croissance.",
    transportFromClermont: "4h en voiture / 5h en train",
    localExamples:
      "PME décolletage (sous-traitance horlogère suisse), startups outdoor, agences de voyage premium, scale-ups tech.",
  },
  {
    slug: "chambery",
    name: "Chambéry",
    region: "Savoie",
    lat: 45.5646,
    lng: 5.9178,
    population: "60 000 habitants",
    industries: ["aluminium (Trimet)", "tourisme montagne", "logistique alpine", "université de Savoie"],
    economicContext:
      "Porte des Alpes et carrefour logistique vers l'Italie (Mont-Cenis), Chambéry combine industrie lourde (aluminium Trimet), tourisme de montagne et un pôle universitaire technologique structuré autour de l'Université Savoie Mont-Blanc.",
    transportFromClermont: "4h en voiture / 5h en train",
    localExamples:
      "Sous-traitants industriels alpins, organismes de tourisme, écoles de ski, agences de voyages, logistique transalpine.",
  },
  {
    slug: "valence",
    name: "Valence",
    region: "Drôme",
    lat: 44.9333,
    lng: 4.8917,
    population: "65 000 habitants",
    industries: ["agroalimentaire (Pasta Lensi, Crozes-Hermitage)", "nucléaire (CEA Cadarache à proximité)", "logistique vallée du Rhône"],
    economicContext:
      "Carrefour de la vallée du Rhône et porte de la Provence, Valence est portée par l'agroalimentaire (vins AOC, conserveries) et un tissu de PME industrielles autour de l'axe A7. Maison Pic (3* Michelin) et Anne-Sophie Pic incarnent la gastronomie.",
    transportFromClermont: "3h en voiture / 4h en train (via Lyon)",
    localExamples:
      "Vignerons AOC (Crozes-Hermitage, Saint-Joseph), PME agroalimentaires, restauration gastronomique, logistique nationale.",
  },
  {
    slug: "grenoble",
    name: "Grenoble",
    region: "Isère",
    lat: 45.1885,
    lng: 5.7245,
    population: "158 000 habitants (450 000 agglomération)",
    industries: ["microélectronique (STMicroelectronics, Soitec)", "CEA-Leti", "deeptech", "outdoor"],
    economicContext:
      "Capitale française des micro/nanotechnologies (CEA-Leti, ST Micro, Soitec), Grenoble est l'un des écosystèmes deeptech les plus denses d'Europe. Forte concentration de PhD, ingénieurs et startups en hardware/AI.",
    transportFromClermont: "4h en voiture / 5h en train",
    localExamples:
      "Startups deeptech/IA, sous-traitants microélectronique, scale-ups outdoor, laboratoires de recherche, ETI tech (Schneider Electric).",
  },
  {
    slug: "lyon",
    name: "Lyon",
    region: "Rhône",
    lat: 45.764,
    lng: 4.8357,
    hub: true,
    population: "522 000 habitants (1,4 M métropole)",
    industries: ["banque-finance (Confluence)", "pharma (Sanofi, BioMérieux)", "logiciel (EM Lyon, Lyon French Tech)", "biotech", "luxe"],
    economicContext:
      "2e métropole française, Lyon est un hub économique majeur (banque, pharma, biotech, IT). Le quartier Confluence concentre les sièges sociaux ; Part-Dieu polarise le tertiaire ; Gerland abrite l'écosystème biotech (BioMérieux, Sanofi Pasteur).",
    transportFromClermont: "1h30 en voiture / 2h30 en train",
    localExamples:
      "ETI pharma et biotech, scale-ups SaaS, banques régionales, cabinets de conseil, e-commerce, agences communication.",
  },
  {
    slug: "paris",
    name: "Paris",
    region: "Île-de-France",
    lat: 48.8566,
    lng: 2.3522,
    hub: true,
    population: "2,1 M habitants (12 M Île-de-France)",
    industries: ["sièges sociaux CAC 40", "finance (La Défense)", "tech (Station F)", "luxe", "média"],
    economicContext:
      "Capitale économique française et 1er hub tech européen (Station F, écosystème IA Mistral/H/Hugging Face), Paris concentre les sièges sociaux du CAC 40, les ministères et les grandes agences. Marché des formations IA inter-entreprises très actif.",
    transportFromClermont: "3h30 en voiture / 3h30 en train direct",
    localExamples:
      "Sièges sociaux CAC 40, ETI tertiaires, scale-ups SaaS et IA, agences communication, cabinets de conseil, secteur média et culture.",
  },
];
