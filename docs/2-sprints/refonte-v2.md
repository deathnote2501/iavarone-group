# Refonte V2 — IAvarone Group

11 septembre 2026. Demande de Jérôme : poursuivre sur iavarone-group.fr après CRM IA et Employé IA, avec publication directe GitHub → Vercel.

## Réalisation

Thème clair, Inter effectivement raccordée à la police chargée par Next, Lucide Building2, jaune Google `#FBBC05` dominant et bandeau aux quatre couleurs. En-tête, menu mobile au clavier, pied de page, typographie, boutons, CTA et pages intérieures reçoivent le thème.

L’accueil reprend la composition éditoriale et le panorama architectural validés dans le Brand Studio. Le texte SEO d’origine est conservé. Le nouveau lien principal oriente vers `/marques#choisir`. La vidéo d’origine reste disponible à la demande, sans lecture automatique. Les portraits existants sont conservés. L’image architecturale est explicitement présentée comme une illustration générée par IA, pas comme des locaux réels.

La page Marques accueille un parcours d’orientation en quatre branches, lisible sans JavaScript, un visuel de complémentarité et le répertoire complet. Les marques de service utilisent le bleu pour Jérôme/Conseil, le vert pour Employé IA et le rouge pour CRM IA, y compris sur leurs fiches détaillées. Le groupe garde son jaune.

Les images Open Graph sont harmonisées. Leur génération utilise les paramètres asynchrones requis par Next 16 ; les titres sont transmis en un seul nœud de texte pour éviter une erreur de rendu Satori.

La page Contact existante expose l’agenda, le téléphone et l’e-mail, sans formulaire visible. Les cartes s’empilent aussi sur tablette pour garder les coordonnées lisibles. Aucun message ni rendez-vous de test envoyé ; l’agenda est simulé dans les tests.

## Préservation éditoriale et SEO

- 81 pages publiques vérifiées, dont les 43 URL du sitemap et les 38 pages locales volontairement non indexées.
- Aucune modification des données `src/lib`, métadonnées éditoriales, H1, canoniques ou JSON-LD ; aucun ancien lien interne retiré.
- `robots.txt`, `llms.txt`, `llms-full.txt`, `pricing.md` inchangés.
- Redirections `/activites` → `/marques` et de l’ancienne ressource OPCO conservées.
- Le nombre historique « sept » reste dans les textes et métadonnées bien que le répertoire comporte désormais huit marques ; aucune réécriture éditoriale ou correction de positionnement n’est incluse dans cette publication graphique.
- Aucune modification des maquettes V1/V2 du studio ; seul le visuel approuvé est copié dans le projet de production.

## Recette

Captures et relevés avant/après dans `../5-sources/`. La suite Playwright contrôle toutes les pages à 360, 768 et 1440 px, un H1 unique et les directives robots d’origine. Elle couvre le panorama, la vidéo, les quatre orientations sans JS, le menu au clavier, les trois canaux de contact, l’ouverture/fermeture de l’agenda simulé, les redirections et les images sociales.

Les preuves de publication (révision, Vercel, contrôle public) sont consignées après déploiement dans `../iac_brand-studio/docs/2-sprints/group-production-v2.md`, depuis la racine du projet.

Résultat local final : build Next et contrôle TypeScript réussis ; lint sans erreur (un avertissement antérieur dans `scripts/dfs/keyword-audit.mjs`) ; **16 tests Playwright réussis** ; **81 pages et 4 ressources SEO/GEO comparées sans écart**. Les captures ont été revues sur ordinateur et mobile. Le chargement du portrait en bas de page reste différé, ce qui peut le laisser vide dans une capture intégrale prise sans défilement.
