# Identités légales — iavarone-group.fr

Lot L1 du 18 octobre 2026, branche `fix/identites-legales-20261018`. Base `origin/main` `be21a16`, contenant le bandeau immersif de la PR #30 ; commit de cadrage `ea722ba` conservé. Principal sur `main`, propre au contrôle initial.

## Correction et critères

- Mentions légales : SAS IAvarone Conseil seule éditrice ; bloc EI retiré de cette page seulement.
- Footer : SAS seule éditrice. Confidentialité : responsable du traitement SAS explicite et adresse du siège.
- `src/lib/site.ts` reste la source : forme affichée SAS, siège 8 T boulevard Léon Malfreyt, 63000 Clermont-Ferrand. Capital 150 €, SIRET 932 210 339 00010, TVA et RCS déjà corrects conservés.
- Dates des deux pages corrigées : 18 octobre 2026.
- JSON-LD réellement émis : `name` IAvarone Group (marque), `legalName` SAS ; identifiant publisher, huit relations de marques, Person EI et TVA EI préservés.
- EI, portrait, marque historique et formation conservés sur à-propos/marques/formation. Aucun changement vidéo, offres, clauses, prix, tracking, RDV, URL, canonical ou robots.

## Preuve rouge → vert

Testeur indépendant natif `tests_identites`, commit tests seuls `d65caec`, avant le code. Tests de DOM public sans JavaScript, liens footer cliqués à 390/1440 px, identifiants avec espaces tolérés, dates et JSON-LD parsé sur quatre pages. Intégration automatique à `verify` via `test:smoke` (découverte Playwright). Ancien test SASU actualisé vers SAS avec rejet explicite de SASU ; aucune assertion affaiblie.

- Rouge : `PORT=32703 npx playwright test e2e/legal-identities.spec.ts e2e/seo-audit.spec.ts --reporter=line` : **11 échecs, 8 succès (46,8 s)**. Causes attendues : coédition EI, SASU, siège 8 ter, responsable absent, dates absentes. Capital, SIRET, TVA/RCS étaient déjà corrects. Préservation EI vérifiée aussi séparément : 1 succès.
- Vert : `PORT=32703 npm run verify` : lint, types, audit production (0 vulnérabilité), build preview puis **76 tests réussis (33,8 s)**, incluant les nouvelles preuves et les tests existants vidéo/CTA/cookies/indexation/affichage de 81 pages aux trois largeurs.
- Captures locales des deux pages à 390 et 1440 px inspectées : texte lisible, absence de débordement, footer cohérent.
- Logs et quatre captures dans l’état du chantier : `$IAC_STATE_DIR/L1-identites-tests-rouge.log`, `L1-identites-tests-preservation.log`, `L1-verify-vert.log`, `L1-{mentions-legales,confidentialite}-{390,1440}.png`.

## Trois revues indépendantes

Sessions natives distinctes, sur le diff du worktree contre `origin/main` (produit + tests), équivalentes aux rôles demandés ; les commandes skills ne sont pas exposées dans cette session.

- `code_review` : aucun bloquant ; tests du comportement public, liens et schémas pertinents, conservation de l’EI et absence de régression de périmètre confirmées.
- `security_review` : **PASS**, aucun correctif requis. Diff statique et contrôle HTTP local port 32703 ; aucune logique contractuelle/auth/persistance, dépendance ou secret nouvelle. Consentement, tracking et vidéo inchangés. Schémas SAS et Person EI vérifiés.
- `simplify_review` : favorable, aucune simplification utile demandée ; portée minimale et réutilisation de `SITE.legal`.

## Livraison et passe

PR ouverte : [#31](https://github.com/deathnote2501/iavarone-group/pull/31), sans fusion. Correctif produit `03624ec`, précédé des tests `d65caec`. Labels `ci-dk` et `defaut-echappe` posés à la création. CI tiers : workflow [CI de la PR](https://github.com/deathnote2501/iavarone-group/actions?query=branch%3Afix%2Fidentites-legales-20261018), à contrôler entièrement vert sur le dernier commit avant clôture du lot ; ce dépôt utilise déjà des runners GitHub, sans étape conditionnelle `verif-github`. Compatibilité avec main vérifiée à l’ouverture : MERGEABLE.

Pas de fusion dans L1. La passe séparée effectuera la fusion après CI verte, le contrôle Vercel READY au SHA attendu, le contrôle public production (pages/liens/accueil/vidéo/CTA desktop/mobile) et la surveillance de 30 minutes. Aucun `/api/health` configuré dans ce projet. Aucun Sentry/Axiom configuré dans le code.

Le smoke local utilise build + start, sans secret de contournement Vercel. Aucune lecture d’environnement ou de fiche privée d’un autre projet. Aucune CGV créée ni clause réécrite. Point transversal hors L1 transmis au bilan : anciennes CGU du site personnel décrivant la plateforme apprenants obsolète, à traiter séparément.
