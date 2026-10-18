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


## Variante locale pleine largeur

À la demande du propriétaire, travail local uniquement sur `design/hero-full-width`. Bandeau étendu aux deux bords du viewport, hauteur augmentée, masque dégradé et arrondis supprimés. Légendes alignées au contenu ; commande pause et règles d'accessibilité conservées. Serveur de développement : http://localhost:32571/.

Test indépendant rouge d33255e : marges de 16 px à 390 et 320 px à 1920, masque actif. Après changement CSS : huit tests dédiés verts (géométrie sans overflow, absence de filtre et masque, lecture/pause, chatbot, reduced-motion). Captures desktop/mobile contrôlées. Aucun déploiement de cette variante.
