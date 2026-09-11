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
- `e2e/design-v2.spec.ts` : affichage des 81 pages à 360, 768 et 1440 px, navigation mobile, liens de contact, modale de RDV simulée, redirections et images de partage.

## SEO / GEO

43 URL dans le sitemap et 81 pages publiques, dont 38 pages locales volontairement `noindex`. Ces exclusions évitent la cannibalisation entre les sites et ne doivent pas être levées globalement.

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
