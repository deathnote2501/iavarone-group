# SEO — chantier piloté par DataForSEO

Document de passation pour reprendre le travail SEO de iavarone-group.fr.
Objectif du site (cf. `CLAUDE.md`) : capter du trafic organique régional **et**
national sur des thématiques non couvertes par les autres sites du groupe, pour
être contacté (Koalendar / email / téléphone).

## ⚠️ Contraintes business à NE JAMAIS oublier

- **Financement des formations = OPCO uniquement. JAMAIS de CPF.** Le « plan de
  développement des compétences de l'entreprise » est acceptable (même logique
  employeur B2B). Ne pas réintroduire CPF ni FNE dans les contenus formation.
  Seule exception tolérée : la description du SaaS **Kaliio** (`src/lib/site.ts`)
  peut citer le CPF car c'est une fonctionnalité produit destinée à d'autres
  organismes, pas l'offre de Jérôme.
- **Stratégie de ciblage** : site d'indépendant, jeune, peu de backlinks. On ne
  cible que des mots-clés à **difficulté faible (KD ≤ 30)** avec un volume réel
  (≥ 50/mois). KD bas = rankable sans gros profil de liens.
- Langue du contenu : français. Pas d'affirmation fausse, prudence RGPD.

## Outil : DataForSEO (API REST)

- Dashboard : https://app.dataforseo.com/api-dashboard (compte pay-as-you-go).
- **Auth** = HTTP Basic `base64("<login>:<password>")` où :
  - login = `jerome.iavarone@gmail.com` (override possible via env `DATAFORSEO_LOGIN`)
  - password = secret Doppler **`DATAFORSEO_API_KEY`** (projet `jeffrey`, config `dev`)
- Lancer un appel ponctuel :
  ```bash
  doppler run -p jeffrey -c dev -- node scripts/dfs/<script>.mjs
  ```
- Endpoints utilisés : `keywords_data/google_ads/search_volume/live` (volume) et
  `dataforseo_labs/google/keyword_suggestions/live` (volume + `keyword_difficulty`
  + `search_intent`). Location France = `2250`, langue `fr`.

## Scripts (réutilisables, dans `scripts/dfs/`)

| Script | Rôle | Sortie |
|---|---|---|
| `keyword-audit.mjs` | Audite la grille `[service]/[city]` : volume réel par combo → verdict index/noindex | `scripts/dfs/data/keyword-audit.json` + **génère `src/lib/seo-volumes.ts`** |
| `keyword-opportunities.mjs` | Découvre les mots-clés ciblables (volume ≥ 50, KD ≤ 30) par cluster/page | `scripts/dfs/data/keyword-opportunities.json` |

Raccourci : `npm run seo:audit` (= `keyword-audit.mjs` via Doppler).
Régénérer après toute modif des villes/services. Coût observé : ~0,08 $ (audit),
~0,35 $ (opportunités).

## Pilotage de l'indexation (déjà en place)

`src/lib/seo-volumes.ts` (auto-généré) expose `shouldIndexCity()` et
`sitemapPriorityCity()`, consommés par :
- `src/app/[service]/[city]/page.tsx` → `robots: { index }` (noindex si volume 0)
- `src/app/sitemap.ts` → exclusion des noindex + priorité dérivée du volume

Stratégie retenue : **conservatrice** → 18 pages ville indexées (demande réelle +
grandes villes « à arbitrer »), 33 petites villes à 0 volume en `noindex`.
Verdict par défaut pour un combo inconnu = `review` (= indexé).

## Ce qui est FAIT (commits sur `main`)

1. **Audit grille + noindex/sitemap piloté par data** (`seo-volumes.ts`).
2. **Re-titrage des 3 hubs** (`src/lib/services.ts` champs `hubMetaTitle`,
   `hubMetaDescription`, `hubH1`, `hubLede`, `hubSections` ; rendu dans
   `src/app/[service]/page.tsx`) :
   - `/formation-ia` → cible *formation ia* (9900, KD22)
   - `/conseil-ia` → cible *agence ia* (1900, KD8) — la demande est sur « agence IA », pas « consultant »
   - `/agent-ia` → cible *automatisation ia* (880) + bloc « Qu'est-ce qu'un agent IA ? »
3. **Re-titrage home + marques** (`src/app/layout.tsx`, `src/app/marques/page.tsx`).
4. **Purge totale du CPF** (services, article financement, a-propos, llms.txt,
   site.ts). Article renommé `financer-formation-ia-opco-cpf` →
   `financer-formation-ia-opco` avec **redirect 301** dans `next.config.ts`.
5. **8 articles `/ressources`** ciblant des mots-clés à fort volume / KD bas :
   - Cluster ChatGPT/prompts (~17k rech./mois) : `prompts-chatgpt-guide`,
     `comment-utiliser-chatgpt`, `prompt-engineering-guide`.
   - `ia-generative-definition-exemples` (ia générative, 8100/KD23)
   - `automatiser-taches-ia-n8n-make` (make automatisation, automatisation ia)
   - `quest-ce-quun-agent-ia` (qu'est-ce qu'un agent ia, comment créer)
   - `charte-ia-entreprise-rgpd-ia-act` (charte ia, ia act, ia et rgpd)
   - `vibe-coding-definition` (vibe coding c'est quoi)

   Total /ressources : 11 articles (3 préexistants + 8 ci-dessus).

## Ce qui RESTE à faire

### Nouveaux articles (optionnel)

Format à respecter (voir articles dans `src/lib/articles.ts`) : blocs typés
`p` / `h2` / `ul` / `quote`, intro accrocheuse → H2 structurés → listes concrètes
→ citation → **lien naturel vers l'offre (OPCO only)** → `faq[]` ciblant les
« People Also Ask ». `category` ∈ `"Conseil IA" | "Formation IA" | "Agents IA"`.
Ajouter dans le tableau `ARTICLES` (indexation, sitemap et listing automatiques).
Les 361 mots-clés ciblables sont dans
`scripts/dfs/data/keyword-opportunities.json` (trié par volume) — il reste de la
matière (ex. *agent vocal ia* 320, *charte ia entreprise* 70, clusters image/vidéo).

### Usages DataForSEO non encore exploités (idées)

- **Audit technique on-page** : endpoint `on_page` (balises dupliquées, titles/meta
  manquants, liens cassés, Lighthouse). ~0,10 $/crawl.
- **Suivi de positions** : `serp` en cron hebdo sur ~50 mots-clés cibles, stocker
  l'historique, mesurer l'effet des optimisations. ~0,01 $/mot-clé.
- **Analyse concurrentielle** : `dataforseo_labs/.../ranked_keywords` sur les sites
  qui rankent sur « formation IA Lyon/Grenoble » → trouver les pages à créer.
- **Backlinks** : profil de liens propre vs concurrents.

## Méthode pour reprendre

1. `doppler run -p jeffrey -c dev -- node scripts/dfs/keyword-opportunities.mjs`
   pour rafraîchir la liste (ou lire le JSON existant).
2. Écrire les articles restants dans `src/lib/articles.ts`.
3. `npx tsc --noEmit && npm run build` (ne jamais casser le type-check).
4. Vérifier en local : `PORT=3210 npm run start` puis `curl` (titres, sitemap,
   absence de CPF). **Penser à `rm -rf .next` avant un build si des slugs ont
   changé** (sinon artefacts périmés → 404).
5. Commit (convention `feat(...)` / `fix(...)` en français) puis push.
