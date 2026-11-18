/**
 * Copie de iac_usine/ci-kit/preuves/zones-critiques-lib.mjs : ne pas
 * modifier dans le projet, corriger dans ci-kit puis `bin/ci-kit.sh copier`.
 *
 * scripts/ci/zones-critiques.json est la source unique, PROPRE AU PROJET, des
 * chemins où un défaut coûte cher (cloisonnement entre comptes, preuves et
 * données légales, documents, envois, argent, authentification). Tous les
 * contrôles du code modifié le lisent ici : couverture ≥ 90 %,
 * mock des gardes refusé dans les tests. Il porte aussi les rares réglages qui
 * distinguent un projet d'un autre, pour que les outils restent identiques :
 *
 *   zones          motifs des zones critiques (obligatoire, non vide)
 *   exclusions     [{ chemin, raison }] retirés des zones, raison écrite
 *   sans_mutation  clé obsolète, ignorée depuis la décision du 30/10/2026
 *   code           motifs du code de l'app mesuré (défaut : src/**\/*.ts, src/**\/*.tsx)
 *   code_exclu     motifs retirés de la mesure, comme dans vitest.config
 *                  (défaut : src/types/**, src/test-utils/**, **\/__fixtures__/**)
 *   tests          motifs de fichiers de test propres au projet, en plus des
 *                  motifs communs (src/**.test.ts, tests/**.test|spec.*, e2e/**.spec.ts… :
 *                  garde-tests-lib.mjs)
 *   gardes         modules dont un vi.mock est refusé dans tout fichier de test
 *                  (ex. "@/lib/auth/organization") ; exigé par la garde des tests
 *   donnees_garde  fichiers où les motifs interdits sont des DONNÉES de test
 *   couverture     { rapports: [coverage-final.json…] } (défaut :
 *                  coverage/unitaires/…, coverage/integration/…)
 *   audit          { repertoires: ["", "worker/"], prod_seulement: false }
 */
import fs from "node:fs"
import path from "node:path"

export const FICHIER_ZONES = "scripts/ci/zones-critiques.json"

const CODE_DEFAUT = ["src/**/*.ts", "src/**/*.tsx"]
const CODE_EXCLU_DEFAUT = ["src/types/**", "src/test-utils/**", "**/__fixtures__/**"]
const RAPPORTS_DEFAUT = [
  "coverage/unitaires/coverage-final.json",
  "coverage/integration/coverage-final.json",
]

/**
 * Motif glob → RegExp ancrée. `**` traverse les `/` (`a/**` couvre tout ce qui
 * est sous `a/`), `*` s'arrête au `/`, tout le reste est littéral.
 * @param {string} motif
 */
export function globVersRegex(motif) {
  let regex = ""
  for (let i = 0; i < motif.length;) {
    if (motif.startsWith("/**", i) && i + 3 === motif.length) {
      regex += "/.*"
      i += 3
    } else if (motif.startsWith("**/", i)) {
      regex += "(?:.*/)?"
      i += 3
    } else if (motif.startsWith("**", i)) {
      regex += ".*"
      i += 2
    } else if (motif[i] === "*") {
      regex += "[^/]*"
      i += 1
    } else {
      regex += motif[i].replace(/[.+?^${}()|[\]\\]/g, "\\$&")
      i += 1
    }
  }
  return new RegExp(`^${regex}$`)
}

const listeDeTextes = (v) => Array.isArray(v) && v.every((x) => typeof x === "string")

/**
 * @typedef {{
 *   zones: string[],
 *   exclusions: { chemin: string, raison: string }[],
 *   code: string[],
 *   codeExclu: string[],
 *   tests: string[],
 *   gardes: string[] | null,
 *   donneesGarde: string[],
 *   rapportsCouverture: string[],
 *   audit: { repertoires: string[], prodSeulement: boolean },
 * }} Zones
 */

/**
 * Valide et normalise le contenu de zones-critiques.json.
 * @param {any} brut
 * @returns {Zones}
 */
export function lireZones(brut) {
  const f = FICHIER_ZONES
  const zones = brut?.zones
  if (!listeDeTextes(zones) || zones.length === 0) {
    throw new Error(`${f} : « zones » doit être une liste de motifs non vide.`)
  }
  const cheminsRaisonnes = (cle) => {
    const v = brut[cle] ?? []
    if (!Array.isArray(v)) throw new Error(`${f} : « ${cle} » doit être une liste.`)
    for (const e of v) {
      if (typeof e?.chemin !== "string" || typeof e?.raison !== "string" || !e.raison.trim()) {
        throw new Error(
          `${f} : « ${cle} » ${JSON.stringify(e)} doit avoir un chemin et une raison écrite.`
        )
      }
    }
    return v.map(({ chemin, raison }) => ({ chemin, raison }))
  }
  const exclusions = cheminsRaisonnes("exclusions")
  const liste = (cle, defaut, vide = true) => {
    const v = brut[cle] ?? defaut
    if (!listeDeTextes(v) || (!vide && v.length === 0)) {
      throw new Error(`${f} : « ${cle} » doit être une liste de textes${vide ? "" : " non vide"}.`)
    }
    return v
  }
  const couverture = brut.couverture ?? {}
  const audit = brut.audit ?? {}
  const rapports = couverture.rapports ?? RAPPORTS_DEFAUT
  if (!listeDeTextes(rapports) || rapports.length === 0) {
    throw new Error(`${f} : « couverture.rapports » doit être une liste non vide.`)
  }
  const repertoires = audit.repertoires ?? [""]
  if (!listeDeTextes(repertoires) || repertoires.length === 0) {
    throw new Error(`${f} : « audit.repertoires » doit être une liste non vide.`)
  }
  if (audit.prod_seulement !== undefined && typeof audit.prod_seulement !== "boolean") {
    throw new Error(`${f} : « audit.prod_seulement » doit être un booléen.`)
  }
  return {
    zones,
    exclusions,
    code: liste("code", CODE_DEFAUT, false),
    codeExclu: liste("code_exclu", CODE_EXCLU_DEFAUT),
    tests: liste("tests", []),
    gardes: brut.gardes === undefined ? null : liste("gardes", []),
    donneesGarde: liste("donnees_garde", []),
    rapportsCouverture: rapports,
    audit: { repertoires, prodSeulement: audit.prod_seulement === true },
  }
}

/**
 * @param {string} [racine]
 * @returns {Zones}
 */
export function chargerZones(racine = process.cwd()) {
  return lireZones(JSON.parse(fs.readFileSync(path.join(racine, FICHIER_ZONES), "utf8")))
}

const cache = new WeakMap()

/** @param {Zones} config */
function compiler(config) {
  let c = cache.get(config)
  if (!c) {
    const re = (motifs) => (motifs ?? []).map(globVersRegex)
    c = {
      zones: re(config.zones),
      exclusions: re(config.exclusions.map((e) => e.chemin)),
      code: re(config.code ?? CODE_DEFAUT),
      codeExclu: re(config.codeExclu ?? CODE_EXCLU_DEFAUT),
      tests: re(config.tests),
    }
    cache.set(config, c)
  }
  return c
}

/**
 * @param {string} chemin chemin relatif à la racine du dépôt, séparateur `/`
 * @param {Zones} config
 */
export function estZoneCritique(chemin, config) {
  const { zones, exclusions } = compiler(config)
  return zones.some((re) => re.test(chemin)) && !exclusions.some((re) => re.test(chemin))
}

/**
 * Code de l'app dont la couverture est mesurée : les motifs
 * `code`, hors tests, déclarations et `code_exclu`. Un fichier exclu de la
 * mesure par vitest compterait toutes ses lignes « non couvertes ».
 * @param {string} chemin
 * @param {Zones} config
 */
export function estCode(chemin, config) {
  const { code, codeExclu } = compiler(config)
  return (
    code.some((re) => re.test(chemin)) &&
    !/\.(test|spec)\.[cm]?[jt]sx?$/.test(chemin) &&
    !chemin.endsWith(".d.ts") &&
    !codeExclu.some((re) => re.test(chemin))
  )
}

/** Motifs de tests propres au projet (`tests` de zones-critiques.json). */
export function estTestDuProjet(chemin, config) {
  return compiler(config).tests.some((re) => re.test(chemin))
}
