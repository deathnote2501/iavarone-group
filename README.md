# IAvarone Group

Site public : https://iavarone-group.fr · Dépôt : https://github.com/deathnote2501/iavarone-group

Vitrine du groupe IAvarone : formation, conseil, agents IA, marques et produits, références clients et ressources. La charte V2 reprend la direction jaune de `../iac_brand-studio/v2/group.html` et le parcours de `ecosysteme.html`.

## Développer et vérifier

```sh
npm ci
npm run dev
npm run lint
npm run type-check
VERCEL_ENV=preview npm run build
PORT=3102 npm run test:smoke -- --workers=2
```

`VERCEL_ENV=preview` empêche la notification IndexNow pendant une construction locale. Le script de production conserve son fonctionnement existant. Le déploiement de la branche `main` sur GitHub est géré par Vercel.

## Repères

- Next.js 16, React 19, TypeScript, Tailwind CSS 4, Inter et Lucide.
- `src/app/group-v2.css` : thème clair, jaune `#FBBC05`, noir et les trois autres couleurs Google en soutien.
- `src/components/sections/Hero.tsx`, `ActivitiesGrid.tsx`, `ProjectPath.tsx` : accueil, répertoire de marques et parcours d’orientation en HTML rendu par le serveur.
- `src/components/ui/brand-color.ts` : couleurs de présentation des marques, indépendantes de leurs données éditoriales.
- `src/lib/site.ts`, `services.ts`, `seo-index.ts` : contenus et règles de référencement existantes.
- `public/brand-v2/group-auvergne.png` : illustration architecturale approuvée, reprise du Brand Studio ; elle ne représente pas les bureaux du groupe. Portrait et vidéo d’origine conservés.
- `src/lib/organisation.ts`, `src/components/sections/OrgChart.tsx`, `src/app/notre-organisation/` : organisation augmentée par l'IA (voir plus bas).
- `e2e/design-v2.spec.ts` : affichage des 81 pages de référence à 360, 768 et 1440 px, navigation mobile, liens de contact, modale de RDV simulée, redirections et images de partage.

## SEO / GEO

42 URL dans le sitemap (relevé du 7 octobre 2026, `/notre-organisation` comprise ; le README en annonçait 43 avant cet ajout) et 82 pages publiques, dont 38 pages locales volontairement `noindex`. Ces exclusions évitent la cannibalisation entre les sites et ne doivent pas être levées globalement.

La refonte conserve les textes indexables, H1, titres, descriptions, canoniques, JSON-LD et anciens liens internes. Contrôle reproductible :

```sh
python3 scripts/design-seo-snapshot.py \
  --base http://localhost:3102 \
  --extra-paths docs/5-sources/local-page-paths.json \
  --compare docs/5-sources/design-v2-before-all.json \
  --output docs/5-sources/design-v2-local.json
```

Le script compare aussi `robots.txt`, `llms.txt`, `llms-full.txt` et `pricing.md`. Il mesure la conservation technique, pas les positions dans les moteurs de recherche.

[Compte rendu de refonte](docs/2-sprints/refonte-v2.md). Les maquettes V1 et V2 restent conservées dans le dépôt Brand Studio.

## Audit SEO et GEO du 12 septembre 2026

Canonical contact/à propos/légal, sitemap nettoyé, attribution Qualiopi corrigée vers les partenaires dans le contenu et le JSON-LD.

Contrôles : lint, types, build, smoke et tests SEO ciblés. Rapport : [.seo-boost-logs/rapport-2026-09-12-audit.md](.seo-boost-logs/rapport-2026-09-12-audit.md). Audit transversal et refonte proposée des routines dans le dépôt frère `iac_seo`.

## Images — septembre 2026

La page Marques possède une nouvelle illustration de cadrage de projet, à la place du panorama répété. Le panorama d’accueil est conservé en WebP (168 Ko contre 2,4 Mo). Portrait et vidéo conservés. [Audit et provenance](docs/5-sources/images-2026-09/README.md).

## Bandeau cookies (CNIL) — septembre 2026

GA4 (`G-MPZM0EYFQE`) ne se charge qu'après « Accepter ». Le script de `src/lib/cookie-consent.ts`, en tête du `<head>`, pose `dataLayer`, un `gtag` en file d'attente et le Consent Mode v2 refusé par défaut ; `ad_*` restent refusés même après acceptation. Vercel Analytics, sans cookie, reste hors consentement. Bandeau `src/components/cookie-consent/`, bouton « Gérer les cookies » dans le pied de page, choix mémorisé 6 mois (cookie `cookie_consent` + localStorage). Contrôle : `e2e/cookie-consent.spec.ts`.

## Notre organisation (preuves agence IA et ERP) — octobre 2026

`/notre-organisation` présente l'organisation augmentée par l'IA : Jérôme au sommet, quatre pôles (Prestations, Produits SaaS, Gestion, Système et qualité), 14 orchestrateurs documentés au 7 octobre 2026, sans statut de fonctionnement, le socle Slack / ERP / outils, la différence entre marque, structure juridique et agent, un exemple ERP illustratif et les deux études publiques (agence et ERP) hébergées sur iavarone-conseil.fr et employe-ia.fr. L'accueil reprend le même organigramme détaillé (`OrgChart`, 14 cartes) entre les expertises et les produits (`OrganisationPreview`).

- Données : `src/lib/organisation.ts`, tirées en lecture seule des consignes des orchestrateurs (`iac_routines`) et des écrans de l'ERP. Un relevé daté, pas un statut en direct : à remettre à jour quand un agent est ajouté ou retiré. Aucun statut d'agent (pause, actif) n'est publié.
- Organigramme : `details`/`summary` natifs, lisible et utilisable sans JavaScript ; connecteurs dessinés en CSS à partir de 1280 px seulement.
- CTA : `BookingLink source="iavarone-group-cas-agence"` passe par la passerelle `jeromeiavarone.fr/rdv` (qui réécrit `page`) ; aucun lien vers l'ERP privé.
- Les décomptes de marques n'affichent plus « sept » : le répertoire en montre huit, portées par deux structures juridiques.
- Contrôle : `e2e/organisation.spec.ts`. Bilan : [docs/2-sprints/preuves-vitrines-20261007/README.md](docs/2-sprints/preuves-vitrines-20261007/README.md).
