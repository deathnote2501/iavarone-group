/**
 * Hub de contenu éditorial — signal E-E-A-T « Expertise » : démontre le savoir
 * (et non plus seulement l'affirme) via des articles de fond signés et datés.
 * Chaque article alimente /ressources, /ressources/[slug] et le JSON-LD Article.
 */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export interface Article {
  slug: string;
  title: string;
  description: string;
  category: "Conseil IA" | "Formation IA" | "Agents IA";
  datePublished: string; // ISO
  dateModified: string; // ISO
  readingMinutes: number;
  blocks: Block[];
  faq?: { q: string; a: string }[];
}

export const ARTICLES: readonly Article[] = [
  {
    slug: "roi-ia-generative-pme",
    title: "ROI de l'IA générative en PME : combien de temps peut-on vraiment gagner ?",
    description:
      "Méthode de calcul du retour sur investissement de l'IA générative en PME, illustrée par des cas réels : service client, recrutement, comptes rendus. Chiffres, seuils de rentabilité et erreurs à éviter.",
    category: "Conseil IA",
    datePublished: "2026-03-10",
    dateModified: "2026-05-24",
    readingMinutes: 7,
    blocks: [
      {
        type: "p",
        text: "La question que pose tout dirigeant de PME avant d'investir dans l'IA générative n'est pas « est-ce que ça marche ? » mais « combien ça me rapporte, et en combien de temps ? ». La bonne nouvelle : sur les cas d'usage bien choisis, le ROI se mesure en semaines, pas en années. La mauvaise : la majorité des projets échouent parce qu'ils visent la mauvaise tâche.",
      },
      { type: "h2", text: "Le ROI de l'IA ne vient pas de la technologie, mais du choix de la tâche" },
      {
        type: "p",
        text: "L'erreur la plus fréquente consiste à déployer un « assistant IA » générique sur toute l'entreprise et à espérer un gain diffus. Le ROI réel vient de l'inverse : identifier une tâche répétitive, chronophage et à faible valeur ajoutée, puis l'automatiser à 80 %. Plus la tâche est fréquente et standardisée, plus le gain est élevé et mesurable.",
      },
      {
        type: "p",
        text: "Concrètement, les tâches à plus fort ROI dans une PME sont presque toujours documentaires : rédaction d'e-mails et de réponses clients, comptes rendus de réunion, rédaction d'offres ou d'annonces, tri et synthèse de documents, préparation de dossiers.",
      },
      { type: "h2", text: "Trois cas réels, trois ROI mesurés" },
      {
        type: "p",
        text: "Sur des missions de conseil menées par IAvarone, voici des gains documentés après mise en place de l'IA générative :",
      },
      {
        type: "ul",
        items: [
          "Service client (industrie) : rédaction d'un e-mail en 1h30 au lieu de 3h, 47 jours/an économisés par opérateur, ROI de 10 000 €/an pour 2 400 € investis — seuil de rentabilité atteint en 2 mois.",
          "Recrutement (cabinet RH) : tri de 30 000 CV, rédaction d'offres et préparation d'entretiens automatisés — 105 jours/an économisés, soit 50 % du temps du processus.",
          "Administration judiciaire : comptes rendus de réunion produits en 15 minutes au lieu de 3 heures, délai de livraison ramené de 1–2 semaines à 24h.",
        ],
      },
      {
        type: "quote",
        text: "Un investissement de 2 400 € qui génère 10 000 € de gains la première année n'est pas un pari technologique : c'est une décision de gestion.",
      },
      { type: "h2", text: "Comment calculer votre propre ROI" },
      {
        type: "p",
        text: "La méthode tient en quatre étapes. 1) Mesurez le temps réellement passé sur la tâche cible (en heures/semaine, sur l'ensemble des personnes concernées). 2) Estimez le gain de temps réaliste : 60 à 80 % sur les tâches documentaires bien cadrées. 3) Valorisez ce temps au coût chargé. 4) Comparez au coût de mise en place (conception, intégration, formation) plus l'éventuel abonnement aux modèles.",
      },
      {
        type: "p",
        text: "Le ratio à viser : un seuil de rentabilité inférieur à 6 mois. En dessous, l'investissement est presque toujours justifié. Au-delà, c'est souvent le signe que la tâche choisie n'était pas la bonne.",
      },
      { type: "h2", text: "Les erreurs qui détruisent le ROI" },
      {
        type: "ul",
        items: [
          "Viser une tâche rare ou non standardisée : le gain ne se cumule jamais.",
          "Négliger la qualité : un gain de temps qui dégrade la production crée un coût caché. Dans les cas ci-dessus, la qualité a au contraire progressé (moins de fautes, réponses plus précises).",
          "Acheter un SaaS de plus au lieu d'intégrer l'IA dans les outils existants (e-mail, CRM, traitement de texte).",
          "Oublier la supervision humaine, indispensable sur les sujets sensibles.",
        ],
      },
    ],
    faq: [
      {
        q: "Quel est le ROI moyen d'un projet d'IA générative en PME ?",
        a: "Sur un cas d'usage documentaire bien choisi, le seuil de rentabilité est généralement atteint en 2 à 6 mois. Exemple réel : 10 000 € de gains annuels pour 2 400 € investis sur un assistant de rédaction du service client, rentabilisé en 2 mois.",
      },
      {
        q: "Combien de temps peut-on gagner avec l'IA sur les tâches administratives ?",
        a: "Sur les tâches documentaires (e-mails, comptes rendus, offres, annonces), le gain réaliste se situe entre 60 et 80 % du temps passé. Des missions réelles ont atteint 50 % de temps économisé sur un processus de recrutement complet et l'équivalent d'un quart-temps sur la rédaction de comptes rendus.",
      },
    ],
  },
  {
    slug: "financer-formation-ia-opco",
    title: "Financer une formation IA avec son OPCO : le guide",
    description:
      "Comment faire financer une formation à l'IA générative (ChatGPT, Claude, automatisation) par son OPCO : rôle de la certification Qualiopi, plan de développement des compétences, démarche et documents.",
    category: "Formation IA",
    datePublished: "2026-02-18",
    dateModified: "2026-05-10",
    readingMinutes: 6,
    blocks: [
      {
        type: "p",
        text: "Une formation à l'IA générative pour vos équipes peut être presque entièrement financée — à condition de connaître les bons dispositifs et de passer par un organisme certifié. Voici comment cela fonctionne en pratique.",
      },
      { type: "h2", text: "La condition préalable : la certification Qualiopi" },
      {
        type: "p",
        text: "Le financement OPCO n'est mobilisable que si l'organisme de formation est certifié Qualiopi au titre des « Actions de formation ». C'est le filtre d'entrée : vérifiez toujours ce point avant de vous engager. Un organisme certifié fournit la documentation administrative (convention, programme, attestations) qui conditionne la prise en charge.",
      },
      { type: "h2", text: "Les voies de financement employeur" },
      {
        type: "ul",
        items: [
          "OPCO : votre opérateur de compétences prend en charge tout ou partie du coût de la formation de vos salariés, selon votre branche et votre enveloppe. C'est la voie la plus courante pour une PME.",
          "Plan de développement des compétences : l'employeur finance directement la montée en compétence de ses équipes, avec un avantage fiscal et social.",
        ],
      },
      { type: "h2", text: "La démarche en pratique" },
      {
        type: "p",
        text: "1) Définissez le besoin réel (sujets, niveau, format intra ou inter). 2) Demandez un programme et un devis à un organisme Qualiopi. 3) Transmettez la convention et le programme à votre OPCO pour accord de prise en charge, idéalement avant le démarrage. 4) Réalisez la formation. 5) L'organisme fournit les attestations et émargements nécessaires au remboursement.",
      },
      {
        type: "quote",
        text: "Le réflexe gagnant : demander l'accord de prise en charge à l'OPCO avant le démarrage de la session, pas après.",
      },
      { type: "h2", text: "Combien coûte réellement une formation IA ?" },
      {
        type: "p",
        text: "Pour une formation intra-entreprise sur mesure, comptez 1 500 à 2 500 € HT par jour pour le groupe complet (et non par participant). Les sessions inter-entreprises standardisées se situent plutôt entre 600 et 1 200 € HT par personne et par jour. Après financement OPCO, le reste à charge est souvent réduit à une fraction de ce montant.",
      },
    ],
    faq: [
      {
        q: "Une formation IA est-elle finançable par l'OPCO ?",
        a: "Oui, à condition que l'organisme soit certifié Qualiopi (Actions de formation). Cette certification ouvre droit au financement OPCO et au plan de développement des compétences de l'entreprise. La documentation administrative complète est fournie pour faciliter la prise en charge.",
      },
      {
        q: "Faut-il demander l'accord de l'OPCO avant ou après la formation ?",
        a: "Avant. L'accord de prise en charge doit idéalement être obtenu avant le démarrage de la session, sur la base de la convention et du programme fournis par l'organisme certifié Qualiopi.",
      },
    ],
  },
  {
    slug: "agent-ia-vs-recrutement-cout",
    title: "Agent IA ou recrutement : comment comparer vraiment les coûts",
    description:
      "Comparatif honnête entre déployer un agent IA autonome et recruter un junior : coût complet, délai de mise en route, supervision, risques. Avec les fourchettes de prix réelles d'un agent IA en PME.",
    category: "Agents IA",
    datePublished: "2026-04-02",
    dateModified: "2026-05-20",
    readingMinutes: 6,
    blocks: [
      {
        type: "p",
        text: "« Faut-il recruter ou automatiser ? » Derrière cette question se cache souvent un mauvais calcul, qui compare un salaire brut à un abonnement logiciel. La vraie comparaison porte sur le coût complet, le délai et le risque.",
      },
      { type: "h2", text: "Le coût complet d'un recrutement junior" },
      {
        type: "p",
        text: "Un salaire n'est qu'une partie de l'équation. Au coût chargé s'ajoutent le recrutement lui-même, la formation, l'équipement, l'encadrement, les congés, le risque de turnover et le délai avant pleine productivité (souvent plusieurs mois). Pour un poste junior, le coût annuel complet dépasse largement la rémunération affichée.",
      },
      { type: "h2", text: "Le coût d'un agent IA autonome supervisé" },
      {
        type: "p",
        text: "Un agent IA se compose d'un setup unique (conception, intégration aux outils, mise en production) puis d'un abonnement mensuel. En PME, les fourchettes observées sont de 1 850 à 3 850 € pour le setup et de 450 à 950 € par mois et par agent, sans engagement. Soit un coût annuel environ 6 fois inférieur à un recrutement junior, pour les tâches automatisables.",
      },
      {
        type: "ul",
        items: [
          "Prospection B2B : 5 à 20 rendez-vous qualifiés par mois.",
          "Support client niveau 1 : 60 à 80 % des demandes traitées automatiquement.",
          "Relances WhatsApp : upsell et recouvrement.",
          "SEO / backlinks : 200 à 500 sites par mois.",
        ],
      },
      { type: "h2", text: "Ce qu'un agent IA ne remplace pas" },
      {
        type: "p",
        text: "Un agent IA n'est pas un employé. Il excelle sur les tâches répétitives et cadrées, mais il a besoin d'une supervision humaine — surtout au démarrage, où chaque action sensible (envoi, rendez-vous, décision) est validée. Le niveau d'autonomie augmente ensuite progressivement, selon votre niveau de confiance. C'est une supervision décroissante, pas une boîte noire.",
      },
      {
        type: "quote",
        text: "La bonne question n'est pas « agent ou humain ? » mais « quelles tâches confier à l'agent pour libérer le temps humain sur ce qui compte vraiment ? »",
      },
      { type: "h2", text: "La règle de décision" },
      {
        type: "p",
        text: "Automatisez la tâche répétitive et à faible valeur ; gardez l'humain sur la relation, le jugement et l'exception. Dans la pratique, les deux se combinent : l'agent absorbe le volume, l'équipe gagne du temps pour la valeur ajoutée.",
      },
    ],
    faq: [
      {
        q: "Un agent IA coûte-t-il moins cher qu'un recrutement ?",
        a: "Sur les tâches automatisables, oui : setup de 1 850 à 3 850 € puis abonnement de 450 à 950 €/mois, sans engagement — soit un coût annuel environ 6 fois inférieur à un recrutement junior à coût complet. L'agent ne remplace toutefois pas l'humain sur le jugement et la relation.",
      },
      {
        q: "Un agent IA est-il vraiment autonome ?",
        a: "Pas totalement, surtout au départ : chaque action sensible est validée par un humain. Le niveau d'autonomie augmente progressivement selon la confiance — c'est une supervision décroissante, pas une délégation aveugle.",
      },
    ],
  },
] as const;
