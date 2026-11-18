/**
 * Copie de iac_usine/ci-kit/preuves/diff-lib.mjs : ne pas modifier dans le
 * projet, corriger dans ci-kit puis `bin/ci-kit.sh copier <projet>`.
 *
 * Lecture du diff d'une PR, partagée par la couverture du code
 * modifié, la garde des tests et l'audit des dépendances.
 */
import { execFileSync } from "node:child_process"

/**
 * Sortie de `git diff -U0` → chemin du nouveau fichier → lignes ajoutées ou
 * modifiées (numérotation du nouveau fichier), triées. Un fichier supprimé
 * n'apparaît pas.
 * @param {string} texte
 * @returns {Map<string, number[]>}
 */
export function parserDiffU0(texte) {
  /** @type {Map<string, number[]>} */
  const resultat = new Map()
  let courant = null
  for (const ligne of texte.split("\n")) {
    if (ligne.startsWith("+++ ")) {
      const cible = ligne.slice(4).replace(/\t.*$/, "")
      courant = cible === "/dev/null" ? null : cible.replace(/^b\//, "")
      if (courant && !resultat.has(courant)) resultat.set(courant, [])
      continue
    }
    if (!courant) continue
    const hunk = /^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/.exec(ligne)
    if (!hunk) continue
    const debut = Number(hunk[1])
    const longueur = hunk[2] === undefined ? 1 : Number(hunk[2])
    const lignes = /** @type {number[]} */ (resultat.get(courant))
    for (let n = debut; n < debut + longueur; n++) lignes.push(n)
  }
  for (const [chemin, lignes] of resultat) {
    if (lignes.length === 0) resultat.delete(chemin)
    else lignes.sort((a, b) => a - b)
  }
  return resultat
}

/**
 * [1,2,3,7,9,10] → [[1,3],[7,7],[9,10]]
 * @param {number[]} lignes triées
 * @returns {[number, number][]}
 */
export function plages(lignes) {
  /** @type {[number, number][]} */
  const out = []
  for (const n of lignes) {
    const derniere = out[out.length - 1]
    if (derniere && n === derniere[1] + 1) derniere[1] = n
    else if (!derniere || n > derniere[1]) out.push([n, n])
  }
  return out
}

/** @param {[number, number][]} p */
export const plagesEnTexte = (p) => p.map(([a, b]) => (a === b ? `${a}` : `${a}-${b}`)).join(", ")

/**
 * Révision contre laquelle comparer la branche.
 *   - VERIFY_BASE s'il est posé ;
 *   - CI_BASE_REF (branche cible posée par le workflow, gabarit 80/20) : base
 *     de fusion avec origin/<cible>, qui doit exister (checkout avec
 *     `fetch-depth: 0`) ; une PR vers `chantier/x` se compare à `chantier/x` ;
 *   - GITHUB_BASE_REF (posé par GitHub sur une PR) : même calcul si
 *     origin/<cible> a été récupérée et a une base de fusion visible, sinon
 *     les cas suivants ;
 *   - sur une PR, GitHub construit un commit de merge : HEAD^1 est la pointe de
 *     la base, et le diff HEAD^1..HEAD est exactement la PR ;
 *   - sur un push : HEAD^1, le commit précédent ;
 *   - en local : la base de fusion avec origin/main (HEAD^1 n'y serait que le
 *     commit précédent de la branche).
 * @param {Record<string, string | undefined>} env
 * @param {(...args: string[]) => string} git
 */
export function baseDeComparaison(env, git) {
  if (env.VERIFY_BASE) return env.VERIFY_BASE
  const cible = env.CI_BASE_REF || env.GITHUB_BASE_REF
  if (cible) {
    const ref = `refs/remotes/origin/${cible}`
    let present = true
    try {
      git("rev-parse", "--verify", "-q", ref)
    } catch {
      present = false
    }
    // CI_BASE_REF est une demande explicite : sans la référence, pas de repli
    // silencieux vers un autre périmètre.
    if (!present && env.CI_BASE_REF) {
      throw new Error(`CI_BASE_REF=${cible} : ${ref} absente (checkout avec fetch-depth: 0 ?).`)
    }
    if (present) {
      try {
        return git("merge-base", ref, "HEAD").trim()
      } catch (e) {
        // GITHUB_BASE_REF seule : une ancienne origin/<cible> laissée dans un
        // workspace réutilisé peut n'avoir aucun ancêtre commun visible dans un
        // checkout superficiel ; on passe aux cas suivants.
        if (env.CI_BASE_REF) throw e
      }
    }
  }
  if (env.GITHUB_EVENT_NAME === "pull_request") {
    try {
      git("rev-parse", "--verify", "-q", "HEAD^2")
      return "HEAD^1"
    } catch {
      // Checkout de la pointe de la branche (garde des tests) : base de fusion.
    }
  }
  if (env.GITHUB_EVENT_NAME === "push") return "HEAD^1"
  return git("merge-base", "origin/main", "HEAD").trim()
}

/** `git` réel, sortie texte ; lève si la commande échoue. */
export function git(...args) {
  return execFileSync("git", args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    maxBuffer: 256 * 1024 * 1024,
  })
}

/**
 * Lignes ajoutées ou modifiées contre la base, arbre de travail compris (la
 * couverture et la garde des tests lisent les fichiers tels qu'ils sont sur disque).
 */
export function lignesModifiees(base = baseDeComparaison(process.env, git)) {
  return parserDiffU0(
    git("-c", "core.quotePath=false", "diff", "-U0", "--no-color", "--no-ext-diff", "-M", base)
  )
}

/**
 * Valeur d'une option `--nom <valeur>` de la ligne de commande ; null si absente.
 * Lève si l'option est donnée sans valeur.
 * @param {string[]} argv
 * @param {string} nom
 */
export function option(argv, nom) {
  const i = argv.indexOf(nom)
  if (i === -1) return null
  const valeur = argv[i + 1]
  if (!valeur || valeur.startsWith("--")) throw new Error(`${nom} exige une valeur.`)
  return valeur
}
