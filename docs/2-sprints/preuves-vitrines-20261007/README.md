# Preuves agence IA et ERP — iavarone-group.fr (7 octobre 2026)

Lot L1 du chantier `preuves-groupe-20261007`, branche `feat/preuves-agence-erp-20261007`. Plan approuvé par Jérôme le 7 octobre 2026 ; consignes dans `iac_routines/docs/2-sprints/preuves-vitrines-20261007/groupe/`.

## Livré

- **`/notre-organisation`** : vue institutionnelle de l'organisation augmentée par l'IA.
  - Organigramme interactif : Jérôme au sommet, quatre pôles (Prestations, Produits SaaS, Gestion, Système et qualité), 14 cartes d'agents en `details`/`summary` (mission, déclenchement, exemple de livrable, autonomie et validation), lisibles sans JavaScript et au clavier.
  - Décompte daté : 14 agents configurés au 7 octobre 2026, 12 planifiés, 2 en pause (Agent-Kaliio depuis le 7, Agent-Kaliopi depuis le 5). La pause concerne l'agent, pas l'application. Aucun statut en direct.
  - Socle Slack (échanger et valider), ERP (suivre l'activité), outils métier (travailler) ; services communs hors hiérarchie ; limites (quota hebdomadaire, une exécution à la fois, arrêt après deux échecs, décisions engageantes à Jérôme).
  - Marque, structure juridique, agent : trois notions distinguées (marques listées depuis `BRANDS`, deux structures juridiques).
  - Exemple ERP illustratif (devis en attente → recoupement emails et agenda → RDV déjà prévu → préparer le RDV), légendé « exemple illustratif, données de démonstration ».
  - Deux réalisations internes : études publiques sur iavarone-conseil.fr (`/realisations/agence-ia`, `/realisations/erp-iavarone-conseil`) et employe-ia.fr (`/cas/agence-ia-iavarone-conseil`). Aucun lien vers l'ERP privé.
  - CTA final « Étudier mon organisation avec Jérôme » → `https://jeromeiavarone.fr/rdv?src=iavarone-group-cas-agence`.
- **Accueil** : section « Comment fonctionne notre organisation augmentée par l'IA » entre les expertises et les produits (organigramme compact à 4 pôles, socle, CTA découverte).
- **Maillage** : navigation principale et mobile (« Organisation »), pied de page, À propos, fiches marques IAvarone Conseil et Employé IA, hub Agent IA ; sitemap et `llms.txt`.
- **Décomptes** : « sept marques / activités / entités » retiré partout (le répertoire affiche huit marques, portées par deux structures) ; CRM IA ajoutée à la liste de `llms.txt`.

## Sources

Lecture seule de `iac_routines` (`routines/orch-*/routine.env`, consignes des orchestrateurs, `README.md`, `ROUTINES.md`) et de `iac_erp` (écrans accueil, fiche client, devis, factures, automatisations). Rien n'a été lu dans les données de l'ERP. Faits non affichés faute de preuve : scoring de leads automatique (absent du code), agent de revue des devis/factures (inexistant).

## Contrôles

- `e2e/organisation.spec.ts` (16 tests, vus rouges avant implémentation) : métadonnées, canonical, sitemap, 4 pôles et 14 agents sans JS, ouverture au clavier, 2 pauses datées, démo légendée, liens d'études, absence de lien ERP, `src` du CTA, ordre des sections d'accueil, liens depuis À propos / IAvarone Conseil / Agent IA / navigation / pied de page, absence de « sept marques », aucun débordement à 390, 1280 et 1440 px cartes ouvertes.
- Suite complète Playwright : 46/46 ; lint, types, build verts. Le test existant du menu mobile passe de 9 à 10 liens (ajout voulu).
- Contrôle SEO (`scripts/design-seo-snapshot.py`) : aucun titre ni H1 modifié ; descriptions et schémas modifiés là où figurait « sept ».
- Revues : /code-review (9 constats appliqués), revue de sécurité explicite sur le diff (aucune vulnérabilité ni donnée sensible), /simplify (données des encarts centralisées dans `ORG_PROOFS`, `pausedSince` unique, CSS dédoublonné).
- Captures 390 / 1280 / 1440 px vérifiées (organigramme fermé et cartes ouvertes).

## Limites et points ouverts

- Les trois études liées dépendent des lots Conseil et Employé IA : 404 en production au moment du lot, à revérifier après leur fusion.
- La passerelle `jeromeiavarone.fr/rdv` réécrit `page=/rdv` : l'origine du CTA est portée par `src`.
- `public/llms.txt` attribue encore la certification Qualiopi à la personne (« formateur certifié Qualiopi »), contrairement au reste du site : hors périmètre, non modifié.
- Le relevé des agents est daté : à mettre à jour dans `src/lib/organisation.ts` quand un orchestrateur change.
- `npm audit --omit=dev --audit-level=high` signale `source-map-js` (high, transitif) et `baseline-browser-mapping` (moderate), déjà présents sur `main` (lockfile inchangé par ce lot) ; la CI ne lance pas d'audit. Correctif `npm audit fix` à faire dans une PR dédiée.
