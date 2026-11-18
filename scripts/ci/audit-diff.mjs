#!/usr/bin/env node
/**
 * Copie de iac_usine/ci-kit/preuves/audit-diff.mjs : ne pas modifier dans
 * le projet, corriger dans ci-kit puis `bin/ci-kit.sh copier`.
 *
 * Audit différentiel des dépendances (méthode de 0_dev/CLAUDE.md, point 10) :
 * une PR ne bloque que sur les failles high/critical qu'elle AJOUTE ; une
 * faille déjà présente sur la base est un avertissement. Pas d'allowlist.
 *
 * Les deux audits sont frais et faits avec le même outil : la tête sur le
 * dépôt, la base sur ses seuls fichiers de dépendances recopiés dans un dossier
 * temporaire (aucune installation, aucun script de la base exécuté).
 * Gestionnaire : pnpm si pnpm-lock.yaml, sinon npm (package-lock.json).
 * Identité d'une faille : paquet + avis (GHSA, sinon URL ou id) + sévérité ;
 * une seconde faille sur un paquet déjà vulnérable fait donc échouer la PR. Une
 * nouvelle version ou un nouveau chemin d'installation d'un paquet pour un avis
 * déjà présent sur la base reste un avertissement (choix du 27/10 : la PR
 * n'ajoute pas de faille ; ARIA bloquait aussi ce cas).
 *
 * Réglages (scripts/ci/zones-critiques.json, clé `audit`) :
 *   repertoires     dossiers à auditer, chacun avec son lockfile ([""] par défaut)
 *   prod_seulement  dépendances de production seulement (false par défaut)
 * Base : CI_AUDIT_BASE_SHA (SHA complet) sinon diff-lib.mjs.
 *
 * Usage : node scripts/ci/audit-diff.mjs
 * Sorties : 0 aucune nouvelle faille, 1 nouvelle faille, 2 audit sans verdict.
 */
import { spawnSync } from "node:child_process"
import fs from "node:fs"
import { homedir } from "node:os"
import path from "node:path"
import { pathToFileURL } from "node:url"
import { baseDeComparaison, git } from "./diff-lib.mjs"
import { chargerZones } from "./zones-critiques-lib.mjs"

const SEVERITES = ["info", "low", "moderate", "high", "critical"]
const BLOQUANTES = new Set(["high", "critical"])
const estObjet = (v) => v !== null && typeof v === "object" && !Array.isArray(v)
const estTexte = (v) => typeof v === "string" && v.trim().length > 0

/**
 * Rapport `pnpm audit --json` (format `advisories`) → failles high/critical.
 * @returns {Map<string, string>} identité → libellé
 */
export function faillesPnpm(rapport) {
  const compte = rapport?.metadata?.vulnerabilities
  if (
    !estObjet(rapport) ||
    rapport.error ||
    !estObjet(rapport.advisories) ||
    !estObjet(compte) ||
    SEVERITES.some((s) => !Number.isSafeInteger(compte[s]) || compte[s] < 0)
  ) {
    throw new Error("rapport pnpm audit absent, incomplet ou en erreur")
  }
  const vues = new Set()
  const failles = new Map()
  for (const avis of Object.values(rapport.advisories)) {
    const id = avis?.github_advisory_id || (avis?.id != null ? String(avis.id) : "")
    if (!estObjet(avis) || !estTexte(id) || !estTexte(avis.module_name)) {
      throw new Error("avis pnpm audit incomplet")
    }
    if (!SEVERITES.includes(avis.severity)) throw new Error(`sévérité inconnue : ${avis.severity}`)
    vues.add(avis.severity)
    if (!BLOQUANTES.has(avis.severity)) continue
    failles.set(
      `${avis.module_name}|${id}|${avis.severity}`,
      `${avis.module_name} : ${id} (${avis.severity})`
    )
  }
  // Le résumé et la liste doivent dire la même chose : sinon le rapport est tronqué.
  if (SEVERITES.some((s) => compte[s] > 0 !== vues.has(s))) {
    throw new Error("résumé pnpm audit incohérent avec les avis")
  }
  return failles
}

/**
 * Rapport `npm audit --json` (npm ≥ 7, format `vulnerabilities`) → failles
 * high/critical, une par avis réel (les `via` textuels renvoient à un autre
 * paquet du rapport, qui porte lui-même l'avis).
 * @returns {Map<string, string>}
 */
export function faillesNpm(rapport) {
  if (!estObjet(rapport) || rapport.error || !estObjet(rapport.vulnerabilities)) {
    throw new Error(
      `rapport npm audit invalide : ${rapport?.error?.code || rapport?.error?.summary || "vulnerabilities absent"}`
    )
  }
  const failles = new Map()
  for (const [paquet, v] of Object.entries(rapport.vulnerabilities)) {
    if (!estObjet(v) || !Array.isArray(v.via) || !SEVERITES.includes(v.severity)) {
      throw new Error(`rapport npm audit incomplet pour ${paquet}`)
    }
    for (const via of v.via) {
      if (typeof via === "string") continue
      if (!estObjet(via) || !SEVERITES.includes(via.severity)) {
        throw new Error(`avis npm audit incomplet pour ${paquet}`)
      }
      if (!BLOQUANTES.has(via.severity)) continue
      const id = via.url || (via.source != null ? String(via.source) : "")
      if (!estTexte(id)) throw new Error(`avis sans identifiant sur ${paquet}`)
      const nom = via.name || v.name || paquet
      failles.set(`${nom}|${id}|${via.severity}`, `${nom} : ${id} (${via.severity})`)
    }
  }
  return failles
}

/**
 * @param {Map<string, string>} tete
 * @param {Map<string, string>} base
 */
export function comparerFailles(tete, base) {
  const nouvelles = []
  const preexistantes = []
  for (const [cle, libelle] of tete) (base.has(cle) ? preexistantes : nouvelles).push(libelle)
  return { nouvelles, preexistantes }
}

/** Gestionnaire du dossier : ses fichiers de dépendances et sa commande d'audit. */
export function gestionnaire(dossier, prodSeulement) {
  if (fs.existsSync(path.join(dossier, "pnpm-lock.yaml"))) {
    return {
      nom: "pnpm",
      fichiers: ["package.json", "pnpm-lock.yaml"],
      facultatifs: ["pnpm-workspace.yaml"],
      cmd: ["pnpm", "audit", "--json", ...(prodSeulement ? ["--prod"] : [])],
      lire: faillesPnpm,
    }
  }
  if (fs.existsSync(path.join(dossier, "package-lock.json"))) {
    return {
      nom: "npm",
      fichiers: ["package.json", "package-lock.json"],
      facultatifs: [],
      cmd: [
        "npm",
        "audit",
        "--package-lock-only",
        "--ignore-scripts",
        "--registry=https://registry.npmjs.org/",
        "--json",
        ...(prodSeulement ? ["--omit=dev"] : ["--include=dev", "--include=optional", "--include=peer"]),
      ],
      lire: faillesNpm,
    }
  }
  throw new Error(`${dossier} : ni pnpm-lock.yaml ni package-lock.json`)
}

function auditer(g, cwd) {
  const [cmd, ...args] = g.cmd
  const r = spawnSync(cmd, args, {
    cwd,
    encoding: "utf8",
    timeout: 120_000,
    maxBuffer: 32 * 1024 * 1024,
  })
  // Code 1 : des failles ont été trouvées, le rapport est lisible.
  if (r.error || r.signal || ![0, 1].includes(r.status)) {
    throw new Error(`${g.nom} audit impossible : ${r.error?.message || r.signal || r.status}`)
  }
  return g.lire(JSON.parse(r.stdout))
}

function main() {
  const config = chargerZones()
  const baseSha = process.env.CI_AUDIT_BASE_SHA || ""
  if (baseSha && !/^[0-9a-f]{40}$/.test(baseSha)) {
    throw new Error("CI_AUDIT_BASE_SHA doit être un SHA Git complet")
  }
  const base = baseSha || baseDeComparaison(process.env, git)
  const etat =
    process.env.RUNNER_TEMP ||
    process.env.IAC_STATE_DIR ||
    path.join(homedir(), ".local/state/iac-routines")
  fs.mkdirSync(etat, { recursive: true })
  let nouvelles = 0
  for (const rep of config.audit.repertoires) {
    const dossier = path.resolve(rep || ".")
    const g = gestionnaire(dossier, config.audit.prodSeulement)
    const copie = fs.mkdtempSync(path.join(etat, "audit-base-"))
    let comparaison
    try {
      for (const f of [...g.fichiers, ...g.facultatifs]) {
        let contenu
        try {
          contenu = git("show", `${base}:${rep}${f}`)
        } catch (e) {
          if (g.facultatifs.includes(f)) continue
          throw new Error(`${rep}${f} illisible sur la base ${base} : ${e.message}`)
        }
        fs.writeFileSync(path.join(copie, f), contenu)
      }
      comparaison = comparerFailles(auditer(g, dossier), auditer(g, copie))
    } finally {
      fs.rmSync(copie, { recursive: true, force: true })
    }
    const ou = rep || "racine/"
    for (const l of comparaison.preexistantes) console.log(`::warning::${ou} faille préexistante : ${l}`)
    for (const l of comparaison.nouvelles) console.error(`::error::${ou} nouvelle faille : ${l}`)
    nouvelles += comparaison.nouvelles.length
  }
  console.log(
    `Audit différentiel contre ${base} : ${nouvelles} nouvelle(s) faille(s) high/critical` +
      `${config.audit.prodSeulement ? " (production)" : " (développement inclus)"}.`
  )
  return nouvelles ? 1 : 0
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    process.exitCode = main()
  } catch (erreur) {
    console.error(`::error::Audit différentiel sans verdict : ${erreur.message}`)
    process.exitCode = 2
  }
}
