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

  {
    slug: "prompts-chatgpt-guide",
    title: "Prompts ChatGPT : le guide pour écrire des prompts efficaces",
    description:
      "Comment écrire un bon prompt ChatGPT : l'anatomie d'un prompt efficace, des modèles prêts à l'emploi, les erreurs courantes et des exemples concrets pour obtenir de meilleures réponses.",
    category: "Formation IA",
    datePublished: "2026-06-03",
    dateModified: "2026-06-03",
    readingMinutes: 7,
    blocks: [
      {
        type: "p",
        text: "La qualité d'une réponse de ChatGPT dépend à 90 % de la qualité de la demande. Le même modèle peut produire un texte générique et creux, ou un livrable directement exploitable — toute la différence se joue dans le prompt. Voici une méthode simple pour écrire des prompts qui donnent des résultats fiables, avec des modèles réutilisables.",
      },
      { type: "h2", text: "Qu'est-ce qu'un prompt ?" },
      {
        type: "p",
        text: "Un prompt est l'instruction que vous donnez à ChatGPT (ou à Claude, Gemini, etc.). Ce n'est pas une simple question : c'est un brief. Plus le brief est précis sur le contexte, l'objectif et le format attendu, plus la réponse est utile. Un prompt vague produit une réponse vague.",
      },
      { type: "h2", text: "L'anatomie d'un bon prompt : rôle, contexte, tâche, format" },
      {
        type: "p",
        text: "Un prompt efficace tient en quatre ingrédients, qu'il suffit d'enchaîner :",
      },
      {
        type: "ul",
        items: [
          "Le rôle : « Tu es un expert-comptable spécialisé en TPE. » Donner un rôle oriente le ton et le niveau d'expertise.",
          "Le contexte : qui vous êtes, à qui s'adresse le résultat, les contraintes (longueur, public, secteur).",
          "La tâche : ce que vous voulez précisément, formulé par un verbe d'action (« rédige », « résume », « compare », « reformule »).",
          "Le format : liste à puces, tableau, e-mail, 200 mots maximum, ton formel ou direct. C'est ce que l'on oublie le plus souvent.",
        ],
      },
      {
        type: "quote",
        text: "Un bon prompt ressemble moins à une question qu'à une consigne que vous donneriez à un assistant compétent mais qui ne connaît rien de votre contexte.",
      },
      { type: "h2", text: "Trois modèles de prompts prêts à l'emploi" },
      {
        type: "ul",
        items: [
          "Rédaction d'e-mail : « Tu es mon assistant commercial. Rédige un e-mail de relance à un client qui n'a pas répondu à mon devis depuis 10 jours. Ton cordial mais direct, 120 mots maximum, une seule relance d'action à la fin. »",
          "Synthèse : « Résume le texte ci-dessous en 5 points clés, puis ajoute une recommandation. Public : un dirigeant pressé. [coller le texte] »",
          "Reformulation : « Reformule ce paragraphe pour qu'il soit clair pour un public non technique, sans jargon, en gardant les chiffres exacts. [coller le texte] »",
        ],
      },
      { type: "h2", text: "Les erreurs qui gâchent un prompt" },
      {
        type: "ul",
        items: [
          "Être trop vague (« écris-moi un texte sur l'IA ») : précisez l'angle, le public et la longueur.",
          "Tout demander en une fois : mieux vaut avancer par étapes et corriger au fil de l'eau.",
          "Ne pas donner d'exemple : montrer un modèle de ce que vous attendez améliore nettement le résultat.",
          "Coller des données confidentielles sans précaution : ne transmettez jamais de données personnelles ou sensibles dans un outil grand public sans cadre RGPD.",
        ],
      },
      { type: "h2", text: "Aller plus loin : se former aux prompts" },
      {
        type: "p",
        text: "Maîtriser les prompts (le « prompt engineering ») est la compétence la plus rentable à acquérir sur l'IA générative en entreprise : elle transforme un gadget en outil de productivité. C'est l'un des socles des formations IA d'IAvarone Group, construites sur vos propres cas d'usage et finançables par votre OPCO.",
      },
    ],
    faq: [
      {
        q: "Comment écrire un bon prompt ChatGPT ?",
        a: "Un bon prompt combine quatre éléments : un rôle (« tu es un expert en… »), un contexte (qui vous êtes, pour qui), une tâche précise (un verbe d'action) et un format attendu (longueur, ton, structure). Plus vous êtes explicite, meilleure est la réponse.",
      },
      {
        q: "Existe-t-il des prompts ChatGPT gratuits ?",
        a: "Oui, de nombreux modèles de prompts sont partagés gratuitement, et ChatGPT lui-même propose une version gratuite. L'essentiel n'est pas de collectionner des prompts tout faits mais de comprendre leur structure pour les adapter à vos besoins.",
      },
      {
        q: "Quel est le meilleur prompt pour ChatGPT ?",
        a: "Il n'existe pas de « meilleur prompt » universel : le meilleur prompt est celui qui précise clairement votre contexte, votre objectif et le format attendu. Un modèle structuré (rôle + contexte + tâche + format) bat presque toujours une question lancée à la volée.",
      },
    ],
  },

  {
    slug: "comment-utiliser-chatgpt",
    title: "Comment utiliser ChatGPT : le guide complet pour débuter",
    description:
      "Guide pratique pour utiliser ChatGPT : créer un compte, version gratuite ou payante, premiers usages utiles au travail, limites à connaître et bonnes pratiques de confidentialité.",
    category: "Formation IA",
    datePublished: "2026-06-03",
    dateModified: "2026-06-03",
    readingMinutes: 6,
    blocks: [
      {
        type: "p",
        text: "ChatGPT est devenu l'outil d'entrée dans l'IA générative pour des millions de professionnels. Mais entre l'effet de mode et les usages réellement utiles au travail, il y a un monde. Voici comment démarrer concrètement et en tirer une vraie valeur dès la première heure.",
      },
      { type: "h2", text: "Créer un compte et choisir sa version" },
      {
        type: "p",
        text: "ChatGPT s'utilise depuis un navigateur ou une application mobile, après création d'un compte gratuit. La version gratuite suffit pour découvrir et pour de nombreux usages quotidiens. Les versions payantes donnent accès aux modèles les plus récents, à des limites d'usage plus élevées et à des fonctions avancées (analyse de fichiers, navigation, etc.).",
      },
      { type: "h2", text: "Cinq usages immédiatement utiles au travail" },
      {
        type: "ul",
        items: [
          "Rédiger et reformuler : e-mails, comptes rendus, annonces, fiches de poste.",
          "Résumer : transformer un document long en quelques points clés.",
          "Traduire et adapter le ton : passer d'un brouillon à un texte clair et professionnel.",
          "Préparer : trames de réunion, listes de questions, plans de présentation.",
          "Expliquer : comprendre un concept, un texte juridique ou technique en langage simple.",
        ],
      },
      {
        type: "quote",
        text: "La bonne façon de débuter n'est pas de « tester » ChatGPT au hasard, mais de lui confier une tâche réelle de votre quotidien et de comparer le temps gagné.",
      },
      { type: "h2", text: "Bien formuler sa demande" },
      {
        type: "p",
        text: "La règle d'or : être précis. Indiquez le contexte, l'objectif et le format attendu plutôt que de poser une question vague. Avancez par étapes et corrigez la réponse au fil de l'eau plutôt que de tout demander d'un coup. Cette compétence — écrire de bons prompts — est ce qui sépare un usage anecdotique d'un vrai gain de productivité.",
      },
      { type: "h2", text: "Les limites à connaître" },
      {
        type: "ul",
        items: [
          "ChatGPT peut se tromper avec aplomb : vérifiez toujours les faits, chiffres et citations.",
          "Il ne connaît pas vos données internes sauf si vous les lui fournissez dans la conversation.",
          "Confidentialité : ne saisissez pas de données personnelles ou sensibles dans un outil grand public sans cadre RGPD. En entreprise, définissez une charte d'usage.",
        ],
      },
      { type: "h2", text: "Passer du test à l'usage maîtrisé" },
      {
        type: "p",
        text: "L'écart de productivité entre un utilisateur débutant et un utilisateur formé est considérable. Pour des équipes, une formation courte sur vos cas d'usage réels (ChatGPT, Claude, Gemini) rentabilise très vite l'investissement. Les formations d'IAvarone Group sont certifiées Qualiopi et finançables par votre OPCO.",
      },
    ],
    faq: [
      {
        q: "Comment utiliser ChatGPT gratuitement ?",
        a: "Il suffit de créer un compte gratuit sur le site ou l'application ChatGPT. La version gratuite permet déjà de rédiger, résumer, traduire et préparer de nombreux documents. Les versions payantes ajoutent l'accès aux modèles les plus récents et à des fonctions avancées.",
      },
      {
        q: "ChatGPT est-il fiable pour le travail ?",
        a: "ChatGPT est un excellent assistant pour rédiger, résumer et préparer, mais il peut commettre des erreurs factuelles. Il faut toujours relire et vérifier, surtout les chiffres, les citations et les éléments juridiques. La supervision humaine reste indispensable.",
      },
      {
        q: "Peut-on utiliser ChatGPT avec des données d'entreprise ?",
        a: "Oui, mais avec prudence : ne saisissez pas de données personnelles ou confidentielles dans un outil grand public sans cadre RGPD adapté. En entreprise, il est recommandé de définir une charte d'usage de l'IA et, si besoin, d'utiliser des solutions adaptées au traitement de données sensibles.",
      },
    ],
  },

  {
    slug: "prompt-engineering-guide",
    title: "Prompt engineering : le guide complet (techniques et exemples)",
    description:
      "Qu'est-ce que le prompt engineering et comment le maîtriser : techniques avancées (few-shot, chaîne de raisonnement, itération), exemples concrets et erreurs à éviter pour des résultats fiables.",
    category: "Formation IA",
    datePublished: "2026-06-03",
    dateModified: "2026-06-03",
    readingMinutes: 8,
    blocks: [
      {
        type: "p",
        text: "Le prompt engineering est l'art de formuler des instructions pour obtenir d'un modèle d'IA des réponses précises, fiables et reproductibles. Loin d'être un truc de spécialiste, c'est devenu une compétence professionnelle de base — celle qui distingue ceux qui « bidouillent » ChatGPT de ceux qui en font un vrai levier de productivité.",
      },
      { type: "h2", text: "Qu'est-ce que le prompt engineering ?" },
      {
        type: "p",
        text: "C'est la discipline qui consiste à concevoir et affiner les prompts (les instructions) données à un modèle de langage. Elle repose sur un principe : un modèle ne « devine » pas votre intention, il répond à ce que vous écrivez. Bien cadrer la demande, c'est obtenir un résultat exploitable du premier coup plutôt qu'après dix allers-retours.",
      },
      { type: "h2", text: "Les techniques de base" },
      {
        type: "ul",
        items: [
          "Donner un rôle et un objectif clairs : « Tu es analyste financier, produis une synthèse pour un comité de direction. »",
          "Préciser le format de sortie : tableau, liste, nombre de mots, ton attendu.",
          "Fournir le contexte utile : contraintes, public, données de référence à coller dans la conversation.",
          "Découper les tâches complexes en étapes successives plutôt qu'en une seule demande massive.",
        ],
      },
      { type: "h2", text: "Les techniques avancées" },
      {
        type: "ul",
        items: [
          "Few-shot prompting : donner 2 ou 3 exemples du résultat attendu pour que le modèle calque le style et la structure.",
          "Chaîne de raisonnement : demander au modèle de « réfléchir étape par étape » avant de conclure, utile pour les tâches d'analyse ou de calcul.",
          "Itération guidée : repartir de la réponse du modèle pour la corriger (« reprends le point 3 en le rendant plus concret »).",
          "Auto-évaluation : demander au modèle de vérifier ou de critiquer sa propre réponse avant de la livrer.",
        ],
      },
      {
        type: "quote",
        text: "Le prompt engineering n'est pas une collection de formules magiques : c'est une manière rigoureuse de spécifier une demande, comme on rédigerait un cahier des charges.",
      },
      { type: "h2", text: "Un exemple complet, avant / après" },
      {
        type: "p",
        text: "Prompt faible : « Écris un post LinkedIn sur l'IA. » Prompt travaillé : « Tu es un dirigeant de PME industrielle. Rédige un post LinkedIn de 150 mots qui raconte comment ton équipe a gagné du temps grâce à l'IA sur la rédaction des comptes rendus. Ton authentique, première personne, une phrase d'accroche forte, pas de hashtags génériques. » Le second produit un texte publiable ; le premier, un brouillon générique.",
      },
      { type: "h2", text: "Se former au prompt engineering" },
      {
        type: "p",
        text: "Le prompt engineering s'apprend vite et se perfectionne avec la pratique sur ses propres cas d'usage. Pour une équipe, une formation dédiée (prompts, automatisation, agents) accélère fortement la montée en compétence. Les parcours d'IAvarone Group couvrent ces techniques sur ChatGPT, Claude et Gemini, sont certifiés Qualiopi et finançables par votre OPCO.",
      },
    ],
    faq: [
      {
        q: "Qu'est-ce que le prompt engineering ?",
        a: "Le prompt engineering est l'art de concevoir et d'affiner les instructions (prompts) données à un modèle d'IA pour obtenir des réponses précises, fiables et reproductibles. C'est devenu une compétence professionnelle clé pour exploiter ChatGPT, Claude ou Gemini en entreprise.",
      },
      {
        q: "Le prompt engineering est-il difficile à apprendre ?",
        a: "Non : les bases s'acquièrent en quelques heures (rôle, contexte, tâche, format). Les techniques avancées (few-shot, chaîne de raisonnement, itération) se maîtrisent ensuite avec la pratique sur ses propres cas d'usage. C'est l'une des compétences IA les plus rentables à acquérir.",
      },
      {
        q: "Existe-t-il une formation au prompt engineering ?",
        a: "Oui. IAvarone Group propose des formations IA générative couvrant le prompt engineering sur ChatGPT, Claude et Gemini, construites sur vos cas d'usage réels, certifiées Qualiopi et finançables par votre OPCO.",
      },
    ],
  },

  {
    slug: "ia-generative-definition-exemples",
    title: "IA générative : définition, fonctionnement et exemples",
    description:
      "Qu'est-ce que l'IA générative ? Définition simple, différence avec l'IA classique, fonctionnement des modèles (texte, image, code) et exemples concrets d'usages en entreprise.",
    category: "Conseil IA",
    datePublished: "2026-06-03",
    dateModified: "2026-06-03",
    readingMinutes: 7,
    blocks: [
      {
        type: "p",
        text: "L'IA générative est la technologie derrière ChatGPT, Claude, Gemini ou Midjourney. En quelques années, elle est passée du laboratoire au quotidien des entreprises. Mais derrière le terme se cache une idée simple — et des usages très concrets. Voici une définition claire, sans jargon, et des exemples qui parlent.",
      },
      { type: "h2", text: "Définition : qu'est-ce que l'IA générative ?" },
      {
        type: "p",
        text: "L'IA générative est une famille d'intelligence artificielle capable de produire des contenus nouveaux — du texte, des images, du code, du son ou de la vidéo — à partir d'une simple consigne en langage naturel. Là où une IA classique se contente de classer ou de prédire (par exemple : « ce mail est-il un spam ? »), l'IA générative crée : elle rédige, dessine, résume, traduit ou programme.",
      },
      {
        type: "p",
        text: "Elle repose sur des « grands modèles de langage » (LLM) entraînés sur d'immenses quantités de textes, qui ont appris à prédire la suite la plus probable d'une demande. C'est ce qui leur permet de produire des réponses cohérentes et contextualisées.",
      },
      { type: "h2", text: "IA générative vs IA classique" },
      {
        type: "ul",
        items: [
          "IA classique (prédictive) : analyse des données existantes pour classer, prévoir ou recommander (détection de fraude, maintenance prédictive, scoring).",
          "IA générative : produit un contenu original à partir d'une instruction (rédiger un e-mail, résumer un rapport, générer une image ou du code).",
          "Les deux sont complémentaires : on peut prédire ET générer dans un même processus métier.",
        ],
      },
      { type: "h2", text: "Exemples concrets d'IA générative en entreprise" },
      {
        type: "ul",
        items: [
          "Texte : rédaction et reformulation d'e-mails, comptes rendus de réunion, réponses clients, offres commerciales.",
          "Synthèse : résumé de documents longs, analyse de contrats, veille.",
          "Image : visuels marketing, illustrations, déclinaisons de supports.",
          "Code : assistance au développement (le « Vibe Coding »), automatisation de scripts.",
          "Conversation : assistants internes et agents capables d'agir dans vos outils.",
        ],
      },
      {
        type: "quote",
        text: "L'IA générative ne remplace pas le jugement humain : elle produit un premier jet à grande vitesse, que l'humain vérifie, corrige et valide.",
      },
      { type: "h2", text: "Quels gains pour une PME ?" },
      {
        type: "p",
        text: "Les cas d'usage à plus fort retour sont presque toujours documentaires et répétitifs : tout ce qui se rédige, se résume ou se reformule en volume. Le bon réflexe n'est pas de « déployer l'IA partout », mais d'identifier une tâche chronophage précise et de l'automatiser à 70-80 %, puis de mesurer le temps gagné.",
      },
      { type: "h2", text: "Par où commencer" },
      {
        type: "p",
        text: "Un audit court permet d'identifier les 3 à 5 cas d'usage à plus fort impact dans votre organisation, de les chiffrer et de les prioriser. C'est précisément l'approche d'accompagnement d'IAvarone Group : cibler, chiffrer, livrer, mesurer — sans fascination technologique.",
      },
    ],
    faq: [
      {
        q: "Qu'est-ce que l'IA générative en quelques mots ?",
        a: "L'IA générative est une intelligence artificielle capable de créer des contenus nouveaux (texte, image, code, son) à partir d'une consigne en langage naturel. C'est la technologie derrière ChatGPT, Claude, Gemini ou Midjourney.",
      },
      {
        q: "Quelle est la différence entre IA générative et IA classique ?",
        a: "L'IA classique analyse des données pour classer ou prédire (détection de fraude, scoring). L'IA générative, elle, produit un contenu original à partir d'une instruction (rédiger, résumer, dessiner, coder). Les deux approches sont complémentaires.",
      },
      {
        q: "Quels sont des exemples d'IA générative en entreprise ?",
        a: "Rédaction d'e-mails et de comptes rendus, synthèse de documents, réponses clients, visuels marketing, assistance au développement (Vibe Coding), assistants et agents internes. Les usages documentaires répétitifs offrent le meilleur retour sur investissement.",
      },
    ],
  },

  {
    slug: "automatiser-taches-ia-n8n-make",
    title: "Automatiser ses tâches avec l'IA : guide n8n, Make et agents",
    description:
      "Comment automatiser ses tâches répétitives avec l'IA et le no-code (n8n, Make) : principes, exemples d'automatisations utiles, place de l'IA générative et limites à connaître.",
    category: "Agents IA",
    datePublished: "2026-06-03",
    dateModified: "2026-06-03",
    readingMinutes: 7,
    blocks: [
      {
        type: "p",
        text: "Une grande partie du temps de travail part dans des tâches répétitives : copier des données d'un outil à l'autre, relancer, trier, notifier, mettre en forme. L'automatisation no-code, dopée par l'IA générative, permet de confier ces tâches à des « robots logiciels ». Voici comment cela fonctionne, et par où commencer.",
      },
      { type: "h2", text: "Automatisation no-code : le principe" },
      {
        type: "p",
        text: "Des outils comme n8n ou Make permettent de relier vos applications (Gmail, Slack, Notion, CRM, tableur, WhatsApp…) sans écrire de code, sous forme de « scénarios » : quand un événement se produit (un nouveau mail, un formulaire rempli), une suite d'actions s'enchaîne automatiquement. n8n a l'avantage d'être open source et auto-hébergeable ; Make est réputé pour sa simplicité visuelle.",
      },
      { type: "h2", text: "Ce que l'IA générative apporte à l'automatisation" },
      {
        type: "p",
        text: "L'automatisation classique suit des règles fixes. En y ajoutant un modèle d'IA (ChatGPT, Claude…), le scénario devient capable de comprendre du langage et de décider : trier des messages par intention, rédiger une réponse, résumer un document, extraire des informations d'un texte libre. C'est le passage de l'automatisation « mécanique » à l'automatisation « intelligente ».",
      },
      { type: "h2", text: "Cinq automatisations utiles en PME" },
      {
        type: "ul",
        items: [
          "Tri et réponse de premier niveau aux e-mails ou demandes clients.",
          "Génération automatique de comptes rendus à partir de notes ou de transcriptions.",
          "Relances commerciales et de recouvrement (e-mail, WhatsApp).",
          "Veille : collecte, résumé et envoi quotidien d'une synthèse.",
          "Saisie : extraction de données de documents (factures, formulaires) vers un tableur ou un CRM.",
        ],
      },
      {
        type: "quote",
        text: "Le bon point de départ n'est pas l'outil, mais la tâche : choisissez une action répétitive et chronophage, puis automatisez-la de bout en bout.",
      },
      { type: "h2", text: "Automatisation, scénario ou agent IA ?" },
      {
        type: "p",
        text: "Un scénario n8n/Make suit un chemin prédéfini. Un agent IA va plus loin : il enchaîne des actions et prend des décisions pour atteindre un objectif (prospecter, gérer le support), sous supervision humaine. Pour une tâche simple et stable, un scénario suffit ; pour un « poste » à automatiser, on conçoit un agent.",
      },
      { type: "h2", text: "Limites et bonnes pratiques" },
      {
        type: "ul",
        items: [
          "Gardez une supervision humaine sur les actions sensibles (envois, paiements, décisions).",
          "Attention aux données : pas de données personnelles ou sensibles sans cadre RGPD.",
          "Commencez petit, mesurez le temps gagné, puis étendez.",
        ],
      },
      {
        type: "p",
        text: "Vous pouvez vous former à ces outils (formations n8n/Make d'IAvarone Group, finançables OPCO) ou faire concevoir et déployer des automatisations et agents sur mesure pour votre entreprise.",
      },
    ],
    faq: [
      {
        q: "Comment automatiser ses tâches avec l'IA ?",
        a: "On relie ses applications via un outil no-code (n8n, Make) sous forme de scénarios déclenchés par un événement, puis on y ajoute un modèle d'IA pour comprendre le langage et décider (trier, rédiger, résumer, extraire). Le point de départ est toujours une tâche répétitive précise.",
      },
      {
        q: "Quelle différence entre n8n et Make ?",
        a: "Make est un outil d'automatisation visuel très accessible en mode SaaS. n8n est open source et auto-hébergeable, ce qui offre plus de contrôle et un meilleur respect de la confidentialité des données. Les deux permettent d'intégrer de l'IA dans les scénarios.",
      },
      {
        q: "Faut-il savoir coder pour automatiser ses tâches ?",
        a: "Non. n8n et Make sont des outils no-code qui s'utilisent visuellement. Une formation courte ou un accompagnement suffisent pour mettre en place ses premières automatisations utiles, puis monter en autonomie.",
      },
    ],
  },

  {
    slug: "quest-ce-quun-agent-ia",
    title: "Qu'est-ce qu'un agent IA et comment en créer un ?",
    description:
      "Définition d'un agent IA, différence avec un chatbot, exemples d'usages en entreprise et méthode concrète pour créer et déployer un agent IA autonome supervisé.",
    category: "Agents IA",
    datePublished: "2026-06-03",
    dateModified: "2026-06-03",
    readingMinutes: 6,
    blocks: [
      {
        type: "p",
        text: "On parle de plus en plus d'« agents IA ». Derrière le terme, une évolution majeure : l'IA ne se contente plus de répondre, elle agit. Voici ce qu'est réellement un agent IA, en quoi il diffère d'un chatbot, et comment en créer un pour votre entreprise.",
      },
      { type: "h2", text: "Définition : qu'est-ce qu'un agent IA ?" },
      {
        type: "p",
        text: "Un agent IA est un programme autonome qui exécute des tâches de bout en bout pour atteindre un objectif donné. Il s'appuie sur un modèle d'IA (pour comprendre et décider) et sur des outils (e-mail, CRM, agenda, web) pour agir. Concrètement, on lui confie une mission — « prospecter », « gérer le support de niveau 1 », « relancer les impayés » — et il enchaîne les actions nécessaires, sous supervision humaine.",
      },
      { type: "h2", text: "Agent IA vs chatbot : la différence" },
      {
        type: "ul",
        items: [
          "Un chatbot répond à des questions dans une conversation. Il est passif et réactif.",
          "Un agent IA poursuit un objectif : il planifie, enchaîne des actions, utilise des outils et s'adapte. Il est actif.",
          "Exemple : un chatbot répond « voici nos horaires » ; un agent prend le rendez-vous, l'ajoute à l'agenda et envoie la confirmation.",
        ],
      },
      { type: "h2", text: "Exemples d'agents IA en entreprise" },
      {
        type: "ul",
        items: [
          "Prospection B2B : identification de prospects, prise de contact, qualification (5 à 20 rendez-vous/mois).",
          "Support client niveau 1 : 60 à 80 % des demandes traitées automatiquement.",
          "Relances : upsell et recouvrement par e-mail ou WhatsApp.",
          "Assistant polyvalent : gestion d'e-mails, d'agenda et de CRM.",
        ],
      },
      {
        type: "quote",
        text: "Un agent IA n'est jamais une boîte noire totalement autonome : au départ, chaque action sensible est validée par un humain, et l'autonomie augmente avec la confiance.",
      },
      { type: "h2", text: "Comment créer un agent IA : la méthode" },
      {
        type: "p",
        text: "1) Cibler un poste ou une tâche à automatiser (répétitive, à volume, à faible valeur ajoutée). 2) Concevoir l'agent sur mesure : son objectif, ses outils, son ton, ses garde-fous. 3) L'intégrer à vos outils existants (Gmail, Slack, CRM, WhatsApp Business). 4) Le déployer en supervision rapprochée, puis augmenter progressivement son autonomie. 5) Mesurer et ajuster.",
      },
      { type: "h2", text: "Le faire soi-même ou se faire accompagner" },
      {
        type: "p",
        text: "Des outils no-code (n8n, Make) permettent de prototyper. Pour un agent fiable en production, il faut soigner la conception, l'intégration et la supervision. IAvarone Group conçoit et déploie des agents IA autonomes supervisés sur mesure (setup à partir de 1 850 €, abonnement mensuel sans engagement).",
      },
    ],
    faq: [
      {
        q: "Qu'est-ce qu'un agent IA ?",
        a: "Un agent IA est un programme autonome qui exécute des tâches de bout en bout pour atteindre un objectif, en s'appuyant sur un modèle d'IA pour décider et sur des outils pour agir (e-mail, CRM, agenda). Contrairement à un chatbot, il agit au lieu de simplement répondre.",
      },
      {
        q: "Quelle est la différence entre un agent IA et un chatbot ?",
        a: "Un chatbot répond à des questions dans une conversation. Un agent IA poursuit un objectif : il planifie, enchaîne des actions et utilise des outils. Exemple : le chatbot donne les horaires ; l'agent prend le rendez-vous, l'inscrit à l'agenda et envoie la confirmation.",
      },
      {
        q: "Comment créer un agent IA pour son entreprise ?",
        a: "On cible une tâche à automatiser, on conçoit l'agent sur mesure (objectif, outils, garde-fous), on l'intègre aux outils existants, on le déploie en supervision rapprochée puis on augmente son autonomie. On peut prototyper en no-code (n8n, Make) ou se faire accompagner pour une mise en production fiable.",
      },
    ],
  },

  {
    slug: "charte-ia-entreprise-rgpd-ia-act",
    title: "Charte IA en entreprise : RGPD, IA Act et bonnes pratiques",
    description:
      "Pourquoi et comment rédiger une charte d'usage de l'IA en entreprise : enjeux RGPD, calendrier de l'IA Act, règles à poser et modèle de structure pour encadrer l'IA générative.",
    category: "Conseil IA",
    datePublished: "2026-06-03",
    dateModified: "2026-06-03",
    readingMinutes: 7,
    blocks: [
      {
        type: "p",
        text: "Vos équipes utilisent déjà ChatGPT, souvent sans cadre. C'est un risque — pour vos données comme pour votre conformité. Une charte d'usage de l'IA permet d'autoriser l'IA générative tout en posant des règles claires. Voici les enjeux (RGPD, IA Act) et comment structurer cette charte.",
      },
      { type: "h2", text: "Pourquoi une charte IA ?" },
      {
        type: "p",
        text: "Sans cadre, le « shadow AI » s'installe : des collaborateurs collent des données clients, des contrats ou des informations confidentielles dans des outils grand public. Une charte ne sert pas à interdire — elle sert à autoriser intelligemment : définir ce qui est permis, avec quels outils, sur quelles données, et avec quelle vigilance.",
      },
      { type: "h2", text: "L'enjeu RGPD" },
      {
        type: "p",
        text: "Dès qu'un usage de l'IA traite des données personnelles, le RGPD s'applique : base légale, minimisation des données, information des personnes, encadrement des transferts hors UE. La règle de prudence à inscrire dans toute charte : ne jamais saisir de données personnelles ou sensibles dans un outil d'IA grand public sans cadre adapté.",
      },
      { type: "h2", text: "L'IA Act : ce qu'il faut savoir" },
      {
        type: "p",
        text: "Le règlement européen sur l'intelligence artificielle (IA Act) encadre les systèmes d'IA selon leur niveau de risque, avec une entrée en application progressive. Les obligations dépendent du rôle (fournisseur ou déployeur) et du niveau de risque du système. Pour la plupart des PME utilisatrices d'IA générative, l'enjeu principal est la transparence et la maîtrise des usages — ce qu'une charte aide précisément à documenter.",
      },
      {
        type: "quote",
        text: "Une charte IA n'est pas un document juridique de plus : c'est l'outil qui permet de déployer l'IA sereinement, en transformant un risque diffus en règles partagées.",
      },
      { type: "h2", text: "Que doit contenir une charte IA ?" },
      {
        type: "ul",
        items: [
          "Le périmètre : quels usages sont encouragés, encadrés ou interdits.",
          "Les outils autorisés et les versions à privilégier (notamment celles qui n'entraînent pas les modèles sur vos données).",
          "Les règles sur les données : jamais de données personnelles/sensibles/confidentielles sans cadre.",
          "La vérification humaine : relecture obligatoire des contenus produits, surtout pour les faits, chiffres et éléments juridiques.",
          "La transparence : mention de l'usage de l'IA quand c'est pertinent.",
          "Les responsabilités et le point de contact en cas de doute.",
        ],
      },
      { type: "h2", text: "Comment la mettre en place" },
      {
        type: "p",
        text: "La charte se construit avec les équipes, à partir de leurs usages réels — pas en chambre. Une démarche efficace combine un cadrage des risques, la rédaction de la charte et une sensibilisation des équipes. IAvarone Group accompagne les PME sur ce volet (conseil et formation, finançable OPCO pour la partie formation).",
      },
    ],
    faq: [
      {
        q: "Qu'est-ce qu'une charte IA en entreprise ?",
        a: "C'est un document qui encadre l'usage de l'IA générative au sein de l'entreprise : usages autorisés ou interdits, outils permis, règles sur les données, obligation de vérification humaine et transparence. Elle permet d'autoriser l'IA tout en maîtrisant les risques.",
      },
      {
        q: "L'IA générative est-elle compatible avec le RGPD ?",
        a: "Oui, à condition d'encadrer les usages : ne pas saisir de données personnelles ou sensibles dans un outil grand public sans cadre adapté, respecter la base légale, la minimisation et l'information des personnes. Une charte d'usage aide à documenter cette conformité.",
      },
      {
        q: "Qu'est-ce que l'IA Act change pour les PME ?",
        a: "L'IA Act encadre les systèmes d'IA selon leur niveau de risque, avec une entrée en application progressive. Pour la plupart des PME utilisatrices d'IA générative, l'enjeu principal est la transparence et la maîtrise des usages — ce qu'une charte IA permet de documenter.",
      },
    ],
  },

  {
    slug: "vibe-coding-definition",
    title: "Vibe coding, c'est quoi ? Définition et limites",
    description:
      "Le vibe coding expliqué simplement : définition, comment ça marche (développer en langage naturel avec l'IA), ce que ça permet vraiment et les limites à connaître.",
    category: "Formation IA",
    datePublished: "2026-06-03",
    dateModified: "2026-06-03",
    readingMinutes: 5,
    blocks: [
      {
        type: "p",
        text: "Le « vibe coding » est l'une des expressions les plus en vogue de l'IA générative. Derrière le terme un peu flou, une réalité concrète : développer des logiciels en dialoguant avec une IA, en langage naturel. Voici une définition claire et ce que cela permet — ou non.",
      },
      { type: "h2", text: "Définition : le vibe coding, c'est quoi ?" },
      {
        type: "p",
        text: "Le vibe coding consiste à créer une application ou un script en décrivant ce que l'on veut en langage naturel à une IA spécialisée (comme Claude Code), qui génère et modifie le code. Le développeur pilote « à l'intention » : il décrit l'objectif, teste le résultat, corrige par le dialogue, plutôt que d'écrire chaque ligne à la main. Le terme a été popularisé en 2025.",
      },
      { type: "h2", text: "Comment ça marche" },
      {
        type: "ul",
        items: [
          "On décrit la fonctionnalité voulue à l'IA en langage courant.",
          "L'IA génère le code, l'exécute et propose des corrections.",
          "On teste, on observe le comportement, on demande des ajustements.",
          "On itère rapidement, du prototype à la fonctionnalité finie.",
        ],
      },
      {
        type: "quote",
        text: "Le vibe coding ne supprime pas le besoin de compétence : il déplace l'effort de l'écriture du code vers la spécification claire et la relecture critique.",
      },
      { type: "h2", text: "Ce que ça permet" },
      {
        type: "p",
        text: "Le vibe coding accélère énormément le prototypage et la production de petits outils métier, d'automatisations et d'applications internes. C'est un levier puissant pour les PME : on peut construire en quelques jours une application sur mesure qui aurait demandé des semaines, à condition de cadrer le besoin et de relire le résultat.",
      },
      { type: "h2", text: "Les limites à connaître" },
      {
        type: "ul",
        items: [
          "La qualité et la sécurité du code doivent être vérifiées : l'IA peut produire des erreurs ou des failles.",
          "Sur des systèmes complexes ou critiques, une relecture humaine experte reste indispensable.",
          "Le résultat dépend de la clarté de la demande : sans cadrage, on accumule de la dette technique.",
        ],
      },
      {
        type: "p",
        text: "Bien utilisé, avec relecture et tests, le vibe coding est une compétence très rentable. IAvarone Group forme à cette pratique (Claude Code) et développe lui-même ses applications selon cette méthode, avec relecture humaine systématique. Formations certifiées Qualiopi, finançables OPCO.",
      },
    ],
    faq: [
      {
        q: "Le vibe coding, c'est quoi exactement ?",
        a: "C'est le fait de développer un logiciel en décrivant ce que l'on veut en langage naturel à une IA (comme Claude Code), qui génère et modifie le code. Le développeur pilote par l'intention, teste et corrige par le dialogue plutôt que d'écrire chaque ligne.",
      },
      {
        q: "Faut-il savoir coder pour faire du vibe coding ?",
        a: "Des bases aident à cadrer la demande et à relire le résultat. Le vibe coding abaisse fortement la barrière d'entrée, mais la qualité, la sécurité et la maintenance du code nécessitent toujours une relecture critique — d'où l'intérêt d'une formation.",
      },
      {
        q: "Le vibe coding est-il fiable pour des applications professionnelles ?",
        a: "Pour le prototypage et les outils internes, oui, avec relecture et tests. Pour des systèmes complexes ou critiques, une expertise humaine reste indispensable pour vérifier la qualité et la sécurité du code généré.",
      },
    ],
  },
] as const;
