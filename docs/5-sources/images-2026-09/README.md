# Audit images — 26 septembre 2026

## Choix

Le site contient peu de visuels raster : panorama architectural de la refonte, portrait original et poster de la vidéo. Aucun remplacement massif n’est pertinent.

- Accueil : panorama d’Auvergne conservé, conversion PNG → WebP qualité 85 (2 423 738 → 167 948 octets), dimensions identiques 1536 × 1024.
- Marques : la répétition du panorama est remplacée par une scène de cadrage de projet. Trois professionnels fictifs réfléchissent aux étapes d’un projet, lumière naturelle et couleurs cohérentes avec la charte jaune. La légende et le texte alternatif signalent le caractère illustratif. Fichier `public/photos/openai-v3/cadrage-projet.webp`, 1260 × 840, 120 868 octets.
- Portrait original conservé. Vidéo et poster conservés, hors périmètre de cette passe photographique. Le poster historique mentionne encore six marques et FIT ; une mise à jour cohérente devra couvrir la vidéo avec son poster.
- Les anciens fichiers sont conservés pour réversibilité. Prompt archivé dans `prompts.json`.

## Vérifications

Lint réussi (un avertissement préexistant dans scripts/dfs/keyword-audit.mjs), TypeScript et compilation réussis (`VERCEL_ENV=preview` pour éviter une notification IndexNow locale).

24 tests existants réussis : 81 pages à 360, 768 et 1440 px, règles d’indexation, image d’accueil, navigation, parcours sans JavaScript, contact et réservation simulée, redirections et images de partage. Contrôle visuel complémentaire du nouveau bloc Marques sur ordinateur et mobile à 390 px, sans débordement.
