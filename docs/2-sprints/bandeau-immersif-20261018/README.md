# Bandeau immersif — 18 octobre 2026

Demande : intégrer le deuxième essai validé, visible dans la ligne de flottaison, et déployer en production. Le clip Kling de 10 s, sans son, est transformé en aller-retour de 20,08 s pour éviter la coupe brutale au retour. Aucune nouvelle génération facturée. L'animation reste une illustration architecturale imaginaire, explicitement légendée.

## Résultat

Le titre, le CTA et le bandeau sont dans le premier écran. Capture desktop 1440 × 900 : bandeau y=399,5, h=306. Capture mobile 390 × 844 : y=372, h=253. Captures : [ordinateur](desktop.png) et [mobile](mobile.png). Le texte de présentation complet et les liens restent présents ; la présentation vidéo d'origine reste accessible dans son volet.

Vidéo locale H.264 1600 × 638, 5 115 642 octets, sans audio, chargée lors de la mise en lecture. Poster WebP de 86 Ko. Raccord discret au blanc en haut et en bas ; le fichier n'est pas transparent. La boucle inverse aussi le mouvement de végétation : compromis accepté pour cet essai d'intégration, sans saut de cadrage.

Contrôles : bouton pause/reprise, pause volontaire conservée après scroll, arrêt hors écran et onglet masqué. Avec prefers-reduced-motion : poster et pause par défaut ; lancement volontaire possible. Sans JavaScript : image fixe. Aucun secret ni appel fal.ai navigateur.

## Preuves et revues

Testeur indépendant : commit e25db0b, cinq échecs rouges sur baseline (élément vidéo immersive absent), puis cinq scénarios verts après implémentation. Tests : affichage H1/CTA et ≥120 px de vidéo dans premier viewport, progression réelle de currentTime, lecture muette inline, pause persistante, arrêt/reprise viewport, réduction des mouvements. Le test de présentation originale conserve controls et src.

`PORT=3119 npm run verify` : vert, 57 E2E, lint sans erreur (un avertissement préexistant keyword-audit), types, audit production sans vulnérabilité, build. Inspection visuelle desktop/mobile et ffprobe : verts. Un premier run a utilisé un serveur d'un autre projet sur 3100 ; il a été arrêté et relancé sur le port dédié 3119 avec deux workers.

Revues indépendantes /code-review, /security-review, /simplify : aucun blocage. Le changement de préférence système pendant la lecture et le masquage d'onglet sont gérés, mais non couverts par les cinq scénarios dédiés. Le filtre documentaire pull_request est désormais au niveau du job changes ; la CI appelle la commande verify unique (suppression du double build).

## Livraison

PR #28 fusionnée après CI verte ; production Vercel READY sur a09852480a135c00d35f5f1f6f60e87ca0504358. CI de main verte également. Pas de migration. Les vitrines n'ont pas de /api/health ni d'intégration Sentry/Axiom ; contrôle via statut Vercel, page publique sur la révision attendue, média, pages clés et console navigateur (référence iac_routines/agents/OUTILS.md).


### Contrôle public et commande pause

Le contrôle réel a confirmé la lecture mais a révélé que le chatbot s'ouvre automatiquement sur ordinateur et recouvre la commande à droite (les tests initiaux neutralisaient ce service externe). Le panneau est un overlay fixe de 380 × 560 px en bas à droite. Sur téléphone, le widget ne s'ouvre pas automatiquement.

Correctif : placer la commande à gauche, sans modifier ni masquer le chatbot. Test indépendant rouge 08bf564 : clic intercepté par le panneau simulé aux dimensions réelles. Le test conserve un vrai clic utilisateur sans force et vérifie que la vidéo est ensuite en pause. Ce correctif porte le label defaut-echappe.

Vérification du correctif : `PORT=3119 npm run verify` vert, 58 E2E, audit production sans vulnérabilité. Revues indépendantes code, sécurité et simplify favorables. Capture du chevauchement initial : [diagnostic](chat-overlap-desktop.png).


## Chantier de publication autorisé

Nom `bandeau-groupe-20261018`, dépôt `iac_iavarone-group.fr`, média `GROUP`. Port local/E2E 32605. Une PR pour ce site, tests et revues indépendants, passe de fusion séparée et surveillance publique30min. Consignes : [commun](commun.md), [lot](L1.md), [plan](chantier.json). Demande : animation des quatre images choisies et publication des cinq vitrines. Aucun migration ni changement de prix/SEO prévu.

## Lot L1 — reprise du rendu final validé (18 octobre 2026)

Branche `feat/bandeau-immersif-20261018`. Source approuvée : `origin/design/hero-full-width` à `231e403`. Seuls les styles et le texte finaux sont repris, sans l'essai vidéo avant titre ni écrasement du plan du chantier. Légende harmonisée : « Illustration générée par IA ». Le média et la logique de lecture/pause existants sont conservés. Pas de migration, génération fal, dépendance ou changement de chatbot, SEO, H1, URL, prix ou attribution RDV.

### Critères et preuves rouge → vert

- Testeur indépendant, commit tests seuls `a186c52` : reprise inchangée des assertions de `d33255e`, puis compléments. Rouge réel : marges 16 px à 390, 320 px à 1920, masque dégradé ; texte contenant encore « formateur Qualiopi et consultant indépendant ». Résultat ciblé initial : 5 rouges, 2 verts, dont deux faux rouges de sélection d'image.
- Autre testeur indépendant, commit `16bf389` : correction des deux faux rouges qui imposaient un élément IMG avec src brut. Le critère porte sur une image de repli, donc accepte aussi le poster VIDEO visible, décodé et arrêté à currentTime=0. Autres assertions conservées. Les deux scénarios corrigés sont verts : MP4 en échec et JavaScript désactivé.
- `e2e/immersive-full-width.spec.ts` : x=0 et right=innerWidth à 390/1920, aucun masque/filtre/débordement, paragraphe exact avec strong, vidéo sous le hero, légende IA.
- `e2e/immersive-hero.spec.ts` inchangé : H1/CTA et au moins 120 px visibles à 1440×900 et 390×844, progression réelle de currentTime, muted/playsInline, pause persistante, sortie/retour viewport, reduced-motion et clic sans force avec overlay chatbot 380×560, right20/bottom88/z2147483000.
- `e2e/immersive-resilience.spec.ts` : fallback, événement visibilitychange et pause volontaire au retour, boucle/durée/audio. Le masquage est simulé par document.hidden/visibilityState + événement, car les onglets headless ne reflètent pas toujours le masquage réel ; il ne s'agit pas d'une preuve de changement d'onglet physique.
- ffprobe : H264 1600×638, 20,083333 s, 5 115 642 octets, aucune piste audio. Le montage aller-retour provient du média déjà approuvé ; le test de durée ne démontre pas à lui seul ce montage.

### Vérification et revues

`PORT=32605 VERCEL_ENV=preview npm run verify` : vert, 65 E2E (2 workers), lint sans erreur, types, audit production 0 vulnérabilité, build preview sans notification IndexNow. Un avertissement ESLint préexistant dans keyword-audit et avertissements Next Edge Runtime restent sans rapport avec ce lot. Port 32605 par défaut dans verify et Playwright ; reuseExistingServer=false pour éviter de tester un autre serveur. Le workflow existant appelle déjà verify et conserve tous ses contrôles ; aucun label verif-github requis par ce dépôt.

Trois sous-agents indépendants : code-review favorable (critères et valeur des tests vérifiés), security-review favorable sans blocage (pas de secret ni appel fal, média sans audio, périmètre préservé), simplify favorable (pas de simplification utile). Leur remarque commune sur le port de verify a été corrigée dans `cb25cba`.

Inspection locale du build à 1440×900 : vidéo x=0, y=399,5, largeur1440, hauteur396. À 390×844 : x=0, y=372, largeur390, hauteur286,95. Captures après refus des cookies : [desktop L1](l1-desktop.png), [mobile L1](l1-mobile.png). Chatbot neutralisé pour ces captures seulement ; preuve anti-chevauchement par overlay dans les tests. Le vrai chatbot et la surveillance30min en production restent à la passe après fusion. Aucun secret Vercel bypass disponible : si preview protégée401, smoke réalisé localement ; ne pas chercher ailleurs.

### Livraison L1 et passe

La PR reste ouverte : aucune fusion dans L1. La passe renseignera la révision de production attendue, l'URL Vercel READY, le vrai clic pause avec chatbot chargé et le contrôle public30min. Les captures locales ne remplacent pas cette recette de production. Le dépôt principal est resté sur main et propre.
