# Organigrammes publics sans statut de pause (7 octobre 2026)

Lot L1 du chantier `org-public-groupe-20261007`, branche `fix/organigramme-public-20261007`.

## Livré

- **Statut de pause retiré partout** : champ `pausedSince`, badge « En pause depuis le… », attribut `data-status`, décompte « 12 planifiés, 2 en pause », note du pôle Produits SaaS (« une pause concerne l'agent, pas l'application ») et style `.org-agent-pause`.
- **Agent-Kaliio et Agent-Kaliopi** : leur déclenchement ne décrivait que l'arrêt de la planification ; le champ `trigger` devient optionnel et la ligne « Déclenchement » est omise pour ces deux fiches. Mission, livrable et autonomie inchangés.
- **Mention simple** : « 14 agents répartis en quatre pôles. » La note « documentée au… » et `ORG_AS_OF` sont retirés (passe de fusion, précision « présentation simple »). Aucune affirmation d'activité, de temps réel ou de 24/7.
- **Accueil** : `OrganisationPreview` affiche le même `OrgChart` détaillé que `/notre-organisation` (portrait de direction en haut, 4 pôles, 14 cartes `details[data-agent]`) ; contexte, socle et CTA « Découvrir notre organisation » conservés. `OrgChartCompact` et son CSS (`.is-compact`, `.org-pole-link`, `.org-pole-roles`, `.org-pole-name`) supprimés.
- Inchangés : routes, canonical, sitemap, tracking, `llms.txt` (ne mentionnait aucun statut). Aucune vue ERP fictive de ce site ne mentionnait d'agent inactif.

## Vérifications

- Lint (0 erreur), types, `VERCEL_ENV=preview npm run build` : verts. Aucune occurrence de « en pause », « planification arrêtée » ou `pausedSince` dans le HTML statique généré.
- `e2e/organisation.spec.ts` : 18/18. Test « 2 pauses datées » remplacé par une vérification sans statut sur `/` et `/notre-organisation` (aucun `data-status`, ni « en pause », ni « en direct »/24/7) ; accueil : 4 pôles, portrait, 14 cartes ; clavier et absence de débordement (390, 1280, 1440 px, cartes ouvertes) sur les deux pages.
- QA visuelle de l'accueil à 390 et 1440 px, toutes les cartes ouvertes : lisible, pas de débordement, pas d'identifiant dupliqué.
- Revue du diff : aucun bug relevé ; sécurité : aucune entrée utilisateur, aucun HTML injecté ni secret ajouté ; simplification : composant compact et CSS mort retirés.

Le bilan historique `../preuves-vitrines-20261007/README.md` décrit l'état antérieur (pauses) et n'est pas publié.
