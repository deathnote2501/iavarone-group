# Vidéo du groupe IAvarone

Projet source de la composition `HeroVideo` : 1920×1080, 14 secondes à 30 images/seconde, charte du groupe. Le site sert ses médias déjà exportés ; cet outil ne se lance pas dans l’application publique. Les paquets Remotion sont alignés en 4.0.544.

```bash
npm ci
npm run lint       # ESLint et TypeScript
npm run build      # bundle de la composition
npm run dev        # studio local
npx remotion render src/index.ts HeroVideo <sortie.mp4>
```

La commande `npm run verify:video-tools` depuis la racine réinstalle ce lockfile et vérifie lint/types/bundle en CI. Un rendu local de cinq images (frames 0 à 4, échelle 0,25, sans audio) valide aussi le moteur après une mise à jour. Les deux lockfiles sont audités par la commande racine `npm run audit` ; les failles préexistantes restent affichées.

Ne pas mettre à jour un paquet Remotion isolément : aligner tous les paquets `remotion` et `@remotion/*`, comme décrit dans la [documentation officielle](https://www.remotion.dev/docs/upgrading). La mise à jour du 18 novembre 2026 reste dans les majeures existantes (Remotion 4, ESLint 9). Les restants sans patch compatible sont explicités dans le README racine.
