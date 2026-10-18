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


## Premier essai Kling 2.5 Turbo Pro — 18 octobre 2026

Essai demandé et autorisé sur « Fenêtre sur l’Auvergne », sans son. Vidéo générée : 10,04 s, H.264, 2276 × 908, 24 images/s, aucune piste audio. Original local de 36,3 Mo ; version de consultation `01-fenetre-kling25-preview.mp4` encodée en largeur 1600 px, sans audio et avec faststart. Aucun changement de production.

Coût attendu d'une génération de 10 s : 0,70 USD, hors taxes/change ; montant de facture non encore rapproché. Première requête rejetée avant génération : l'image de 1983 × 793 dépasse de 0,00063 la limite de ratio 2,5. Une ligne blanche a été ajoutée en bas par ffmpeg pour obtenir 1983 × 794, sans modifier la scène, puis une nouvelle requête a produit la vidéo. Les identifiants de requête et la réponse sont archivés ; le rejet est conservé sans la donnée image base64.

Contrôle : ffprobe confirme durée, codec, dimensions et absence d'audio. Inspection d'images à plusieurs instants : architecture et cadrage visuellement stables, animation discrète. Le raccord de boucle et l'effet immersif dans la page restent à évaluer avant intégration. Le fichier complet est conservé localement ; la version allégée est versionnée pour revue.

- Paramètres : `kling25-fenetre-input.json`.
- Réponse et URL du fichier fal : `kling25-fenetre-result.json`.
- Source adaptée au format Kling : `01-fenetre-kling-input.png`.


## Deuxième essai : mouvement visible — 18 octobre 2026

Relancé sur demande après retour utilisateur : le premier essai paraissait fixe. Même source et même modèle, durée 10 s, sans audio. Nouveau prompt : travelling avant et latéral vers la droite, parallaxe visible dès le début, feuillage et brume en mouvement ; retrait des interdictions de mouvement caméra et de la contrainte de retour au cadrage initial.

Fichiers : `kling25-fenetre-v2-input.json`, `kling25-fenetre-v2-job.json`, `kling25-fenetre-v2-result.json`, `01-fenetre-kling25-v2-preview.mp4`. Original local non versionné. ffprobe : 10,04 s, 2276 × 908, aucune piste audio. Coût attendu de ce nouvel essai : 0,70 USD, à rapprocher de la facture.

Contrôle de quatre images successives : avancée et déplacement latéral nettement visibles ; le montant gauche sort du cadre et le paysage occupe progressivement davantage l'image. Le mouvement est beaucoup plus marqué que dans la première version. Cette progression ne constitue pas une boucle raccordée ; une lecture répétée brute aura un saut au retour au début. Aucun changement du site.
