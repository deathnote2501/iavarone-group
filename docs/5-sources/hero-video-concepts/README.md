# Propositions de bandeau immersif — 18 octobre 2026

Demande : proposer des images originales à choisir avant animation via fal.ai. Aucun changement du site ni génération vidéo à cette étape.

## Direction proposée

Une fenêtre architecturale en trompe-l'œil prolonge le fond blanc du site. Trois plans (embrasure/plantes, terrasse, reliefs) donnent la profondeur. Animation très lente, végétation et nuages discrets, sans son. Un raccord de boucle devra être vérifié après génération ; le modèle ne garantit pas une boucle parfaite.

- `01-fenetre-auvergne.png` : ouverture blanche sur les reliefs, recommandée pour son intégration.
- `02-pavillon.png` : architecture plus sculpturale, basalte et lumière jaune.
- `03-ecosysteme.png` : sculpture blanche/verre avec un ruban jaune, interprétation de l'écosystème IA.

Images générées avec le CLI Codex 0.160.1, modèle gpt-6.1-sol, effort medium. Illustrations imaginaires : elles ne représentent pas les bureaux réels du groupe. Composition prévue pour le bandeau actuel d'environ 1280 × 395 px (3,24:1) ; les sources doivent être contrôlées et recadrées avant animation. Les originaux sont conservés dans ce dossier.

## Coût de la vidéo

Clé FAL_KEY trouvée dans Doppler jeffrey/dev et authentification validée par une requête de tarification en lecture seule. Aucun secret enregistré dans ce dossier.

`fal-pricing.json` contient les tarifs retournés par GET https://api.fal.ai/v1/models/pricing le 18 octobre 2026 :

| Modèle | Tarif API par seconde | 5 secondes | 10 secondes |
|---|---:|---:|---:|
| Kling 2.5 Turbo Pro | 0,07 USD | 0,35 USD | 0,70 USD |
| Kling 3 Pro | 0,14 USD | 0,70 USD | 1,40 USD |
| Kling 3 Turbo Pro | 0,14 USD | 0,70 USD | 1,40 USD |

La page du modèle Kling 3 Pro annonce aussi 0,112 USD/s sans audio (0,56 USD/5 s). Écart avec le tarif générique authentifié : retenir prudemment 0,70 USD/5 s ou 1,40 USD/10 s et revérifier les paramètres au lancement. Taxes/change éventuels en supplément. Chaque nouvel essai est une génération payante. Proposition : une séquence de 10 s, puis jusqu'à trois essais au total si nécessaire, budget prudent 4,20 USD. Pas de coût de génération fal à chaque visite : le fichier sera généré une fois et hébergé sur le site ; transfert selon le forfait d'hébergement.

Sources :
- https://fal.ai/models/fal-ai/kling-video/v2.5-turbo/pro/image-to-video
- https://fal.ai/models/fal-ai/kling-video/v3/pro/image-to-video
- https://fal.ai/models/fal-ai/kling-video/v3/pro/image-to-video/api
- https://fal.ai/docs/platform-apis/v1/models/pricing

## Intégration envisagée après choix

Bandeau sur toute la largeur utile, bords blancs raccordés au fond, ombres internes discrètes. Vidéo muette, lecture automatique inline, bouton pause, image fixe si réduction des animations demandée, pause hors écran. Une légère parallaxe du conteneur peut renforcer le relief ; elle relève du site, pas de fal.ai. Prévoir un recadrage mobile et une compression MP4/WebM avec poster immédiat. Le poids final dépendra du rendu et sera mesuré. Le texte et les CTA restent hors vidéo et lisibles.

Les images sont à choisir avant toute génération vidéo ou livraison en production.
