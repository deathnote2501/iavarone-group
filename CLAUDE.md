# Projet iavarone-group.fr
Vitrine du Groupe IAvarone, qui présente les activités des sites ci-dessous :
- https://jeromeiavarone.fr/
- https://iavarone-conseil.fr/
- https://employe-ia.fr/
- https://kaliio.fr/
- https://rgaa-ia.fr/
- https://crm-ia.fr/

# Objectif de iavarone-group.fr
- Acquérir du trafic organique sur la région et en dehors sur des thématiques non couvertes par les sites web listés plus haut dans le but d'être contacté via https://jeromeiavarone.fr/rdv, email ou telephone par des prospects qui souhaiteraint bénéficier de mes services.

# Référentiel de marque
- Logo : building-2
- La charte V2 reprend la direction jaune de `../iac_brand-studio/v2/group.html` et le parcours de `ecosysteme.html`.

# Pièges
- 38 pages locales volontairement `noindex` (décompte à jour : `README.md`) : elles évitent la cannibalisation entre les sites, ne pas lever ces exclusions globalement.
- Pas de workflow IndexNow : après une mise en production, lancer `npm run indexnow` ; le script ne notifie rien si `VERCEL_ENV` n'est pas `production` (`verify` construit en `preview`).

Commandes, repères du code, contrôle SEO de non-régression, cookies : `README.md`.
