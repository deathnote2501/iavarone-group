# Conformité iavarone-group.fr, 2026-10-09 (routine conformite-vitrines)

Statut : success. Rapport du portefeuille : `iac_seo/pilotage/conformite-2026-10-09.md`.

- PR deathnote2501/iavarone-group#24, merge `45551cd`, déploiement `dpl_F3oYF2XKwTesEQ4BjEPav8XHRnD9` (READY), précédent `dpl_3hACns9muBzNhJLmU3ki9hTp1sFi` (rollback).
- Corrigé (charte) : constantes partagées de `src/lib/site.ts` sans tiret cadratin (raison sociale « IAvarone Conseil, SASU & Jérôme Iavarone, entreprise individuelle », rôle, NAF, APE, assurances), serviceType JSON-LD « Formation IA générative (organismes partenaires certifiés Qualiopi) », noms JSON-LD générés (villes, catalogue, références), pied de page partagé « IAvarone Group · ». Titles inchangés.
- Tests : assertions `e2e/seo-audit.spec.ts` (JSON-LD parsable sans « — » sur 3 pages, pied de page), CI quality + smoke verts, sitemap 42 URL inchangé.
- Vérification publique : JSON-LD sans « — » sur /, /a-propos, /ressources/quest-ce-quun-agent-ia, /formation-ia/clermont-ferrand ; crawl-check : 0 incident.
- Registre : `2026-10-09-6fb0ac` (technical), mesure le 2026-11-06.
- IndexNow (I-02) : Yandex 202 ; Bing 403 `UserForbiddedToAccessSite` malgré clé valide : vérifier le site dans Bing Webmaster Tools.
- Reste : 58 titles avec « — » (arbitrage) ; hero « formateur Qualiopi » (I-04).
