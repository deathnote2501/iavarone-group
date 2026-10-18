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

PR et révision déployée à compléter après verdict GitHub et contrôle public. Pas de migration. Les vitrines n'ont pas de /api/health ni d'intégration Sentry/Axiom ; contrôle via statut Vercel, page publique sur la révision attendue, média, pages clés et console navigateur (référence iac_routines/agents/OUTILS.md).
