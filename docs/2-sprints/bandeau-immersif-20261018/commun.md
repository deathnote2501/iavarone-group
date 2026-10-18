# Bandeaux immersifs : livraison autorisée le 18 octobre 2026

Le propriétaire a choisi J1 (formation), C2 (conseil), E3 (employe), R1 (CRM), puis demandé explicitement : « fais les animations et integre les et pousse tout en prod tous les sites meme iavarone-group.fr ». Autorisation de publier en production, sans nouvelle demande de validation. Images et vidéos choisies/générées par la session de préparation ; aucun appel fal.ai supplémentaire n'est autorisé sans nécessité documentée (aucune génération prévue dans le lot).

## Rendu validé et limites

Reprendre la direction du bandeau local d'IAvarone Group : vidéo SOUS le hero, sur toute la largeur réelle du viewport, bords nets, aucun masque dégradé/flou ni fondus CSS, pas d'arrondis, premiers plans et profondeur visibles. Jamais au-dessus du titre. Le titre et le CTA doivent rester lisibles et la vidéo être visible dès le premier écran aux dimensions 1440×900 et390×844 (au moins120px visibles) ; adapter l'espacement/le cadrage sans supprimer de contenu indexable. La vidéo en boucle aller-retour contient20s, issue d'une génération muette10s ; pas de coût fal par visite. Préserver les couleurs propres au site.

Les sources sont des illustrations imaginaires, pas des bureaux, clients ou interfaces réels. Légende discrète « Illustration générée par IA ». Conserver le portrait réel de Jérôme, les preuves et les captures métier existantes ; ne pas présenter une scène fictive comme preuve. Aucun changement tarifaire, promesse commerciale, métadonnée SEO, H1, canonical, robots, URL ou attribution RDV. Ne pas réintroduire les événements Calendly/Koalendar. Le périmètre est l'accueil, le composant et les styles nécessaires.

## Comportement requis

Vidéo silencieuse sans piste audio, muted, playsInline, lecture automatique quand visible et autorisée ; pause explicite accessible, persistante après scroll. Pause hors écran et onglet masqué ; retour reprend seulement si pas de pause volontaire. Prefers-reduced-motion : poster, aucune lecture avant démarrage volontaire. Fallback image sans JS ou si média échoue. Contrôle à GAUCHE pour ne pas être recouvert par le chatbot desktop auto-open (panneau right20 bottom88 width380 height560 z2147483000). Pas de changement du chatbot. Pas d'appel fal côté navigateur, aucun secret client, média hébergé localement.

## Méthode obligatoire

Lire les consignes projet/0_dev ; branche+worktree, dépôt principal main propre. Le testeur est un sous-agent indépendant à partir de ces critères, sans recevoir l'implémentation : reproduire rouge réel (élément absent ou géométrie incorrecte), commit test seul, puis implémenter. Les tests doivent prouver la progression de currentTime, pas seulement un attribut autoplay. Test anti-chevauchement par overlay aux dimensions réelles et clic SANS force. Ne jamais affaiblir un test existant ; une assertion fausse doit être réparée par un AUTRE testeur et expliquée.

Trois revues indépendantes en sous-agents avant PR : /code-review (critères réellement testés), /security-review bloquant, /simplify. `npm run verify` ou `pnpm verify` local vert, puis CI tierce verte sur DERNIER commit. Tous les contrôles du projet doivent être intégrés à verify, pas uniquement workflow. Label `ci-dk` à la création PR (agents sur desktop). Conserver/checker verif-github si le projet le demande. Aucun `--auto`, `--admin`, stash ou force main. Pas de migration. Aucun e-mail ni envoi à des tiers.

Projets/ports isolés ; ne jamais réutiliser un serveur d'un autre dépôt sur3100. Ports fournis par lot, workers2 pour les E2E. Pas de npm/pnpm install de plusieurs dépôts depuis une même session. `next dev` peut ajouter un bloc dans CLAUDE.md : ne pas le modifier/annuler (hook protégé), ne pas le commiter ; le nettoyage superviseur le gère. Les fichiers protégés restent en lecture seule. Ne pas lire d'env d'un autre projet.

## Fin de lot et passe

Le lot se termine avec PR ouverte, tout poussé et CI entièrement verte, un digest critères/tests rouge→vert/revues/sécurité dans la PR et README du chantier. Ne pas fusionner dans le lot : la passe séparée s'en charge. Après merge, la passe attend Vercel READY sur la révision attendue, contrôle visuel desktop/mobile et vrai clic pause avec le CHATBOT RÉEL chargé (fermer le panneau pour inspection visuelle seulement), pages clés, console navigateur et média. Surveiller30min via prod du chantier ; Sentry/Axiom seulement s'ils existent pour le site (ne rien inventer). Revert par PR si livraison cassée. Consigner PR, SHA, URL Vercel, captures, absence de migration et limites dans le README du chantier, et garder les dépôts principaux propres/prune après merge.

Les limites d'outillage ne sont pas un choix produit : traiter dans le cadre des consignes. En cas de blocage réel, expliquer cause exacte et preuve, pas une réponse finale de revue seule.

## Exécution de ce chantier

Les superviseurs utilisent le délégateur existant avec IAC_ENGINE=codex (moteur supporté, modèle/effort par défaut d'iac_routines), sur un serveur tmux dédié `bandeaux-codex`. Le moteur Claude est temporairement au quota d'un chantier voisin ; aucun changement d'iac_routines ou de ses secrets n'est nécessaire. Les sous-agents tests/revues doivent être des sessions indépendantes ; si l'outil multi-agent n'est pas exposé, utiliser des sessions CLI/delegate distinctes à partir des seuls critères. Ne jamais écrire soi-même les tests de son implémentation.
