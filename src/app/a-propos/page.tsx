import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { SITE } from "@/lib/site";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "À propos d'IAvarone Group",
  description:
    "IAvarone Group est fondé et opéré par Jérôme Iavarone, formateur Qualiopi et consultant en IA générative basé en Auvergne.",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE.url}/#person`,
  name: SITE.founder.name,
  givenName: "Jérôme",
  familyName: "Iavarone",
  jobTitle: SITE.founder.role,
  description:
    "Formateur Qualiopi et consultant indépendant en IA générative depuis 2020. Fondateur d'IAvarone Group, qui rassemble sept activités complémentaires en intelligence artificielle générative pour les entreprises.",
  image: `${SITE.url}${SITE.founder.photo}`,
  url: `${SITE.url}/a-propos`,
  email: SITE.contact.email,
  telephone: SITE.contact.phoneHref.replace("tel:", ""),
  worksFor: { "@id": `${SITE.url}/#organization` },
  founder: { "@id": `${SITE.url}/#organization` },
  knowsAbout: [
    "Intelligence artificielle générative",
    "ChatGPT",
    "Claude",
    "Gemini",
    "Prompt engineering",
    "Agents IA autonomes",
    "Vibe Coding",
    "Formation professionnelle Qualiopi",
    "Conseil en transformation IA pour PME et ETI",
  ],
  knowsLanguage: ["French", "English"],
  hasOccupation: {
    "@type": "Occupation",
    name: "Formateur & Consultant en IA générative",
    occupationLocation: { "@type": "AdministrativeArea", name: "Auvergne-Rhône-Alpes" },
  },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "certification",
    name: "Qualiopi — Actions de formation",
    ...(SITE.legal.qualiopiBody
      ? { recognizedBy: { "@type": "Organization", name: SITE.legal.qualiopiBody } }
      : {}),
    ...(SITE.legal.qualiopiNumber ? { identifier: SITE.legal.qualiopiNumber } : {}),
  },
  homeLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Clermont-Ferrand",
      addressRegion: "Auvergne-Rhône-Alpes",
      addressCountry: "FR",
    },
  },
  ...(SITE.legal.eiVat ? { vatID: SITE.legal.eiVat } : {}),
  sameAs: [
    SITE.social.linkedin,
    SITE.social.github,
    ...(SITE.legal.eiPappersUrl ? [SITE.legal.eiPappersUrl] : []),
  ],
};

// Lignes d'identité légale affichées uniquement si renseignées dans site.ts
// (aucune donnée fausse n'est publiée tant que les champs restent vides).
const SAS_LEGAL: { label: string; value: string }[] = [
  { label: "SIREN", value: SITE.legal.sasSiren },
  { label: "SIRET (siège)", value: SITE.legal.sasSiret },
  { label: "RCS", value: SITE.legal.sasRcs },
  { label: "Capital social", value: SITE.legal.sasCapital },
  { label: "N° TVA intracommunautaire", value: SITE.legal.sasVat },
].filter((r) => r.value);

const EI_LEGAL: { label: string; value: string }[] = [
  { label: "SIREN", value: SITE.legal.eiSiren },
  { label: "SIRET (siège)", value: SITE.legal.eiSiret },
  { label: "Code APE", value: SITE.legal.eiApe },
  { label: "N° TVA intracommunautaire", value: SITE.legal.eiVat },
  { label: "N° déclaration d'activité (formation)", value: SITE.legal.ndaNumber },
  {
    label: "Certification Qualiopi",
    value: [SITE.legal.qualiopiNumber, SITE.legal.qualiopiBody].filter(Boolean).join(" — "),
  },
].filter((r) => r.value);

export default function AProposPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <section className="border-b border-[var(--color-line)]">
        <div className="container-page grid items-center gap-12 py-16 lg:grid-cols-[1fr_1.4fr]">
          <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white">
            <Image
              src={SITE.founder.photo}
              alt={`Portrait de ${SITE.founder.name}`}
              fill
              sizes="(min-width: 1024px) 384px, 100vw"
              className="object-cover"
              priority
            />
          </div>
          <div>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              {SITE.founder.name}
            </h1>
            <p className="mt-2 text-lg text-[var(--color-brand-blue-ink)]">{SITE.founder.role}</p>
            <p className="mt-6 text-[var(--color-ink-muted)]">
              Formateur certifié Qualiopi et consultant en IA générative depuis 2020, j&apos;ai
              progressivement structuré mon activité en un groupe de sept entités complémentaires&nbsp;:
              une SAS de conseil et de développement, une entreprise individuelle de formation, et
              cinq produits B2B en production.
            </p>
            <p className="mt-3 text-[var(--color-ink-muted)]">
              Je ne suis ni une ESN ni un revendeur&nbsp;: je conçois et je livre moi-même chaque
              mission — de l&apos;animation d&apos;une formation à l&apos;écriture du code d&apos;une
              application métier ou d&apos;un agent IA en production. Cette implication directe est ce
              qui me permet d&apos;obtenir des résultats mesurables chez mes clients (jusqu&apos;à 50&nbsp;%
              de temps gagné sur certaines tâches).
            </p>
            <p className="mt-3 text-[var(--color-ink-muted)]">
              Ma conviction&nbsp;: l&apos;IA générative n&apos;est plus un sujet d&apos;expérimentation
              mais un levier opérationnel à mettre entre les mains des équipes — avec méthode, garde-fous
              et conformité.
            </p>
            <p className="mt-3 text-[var(--color-ink-muted)]">
              Basé à {SITE.founder.location}, j&apos;interviens en présentiel dans le Puy-de-Dôme, à Lyon,
              Saint-Étienne et Paris, et en distanciel partout en France.
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {SITE.founder.credentials.map((c) => (
                <li
                  key={c}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surface-alt)] px-3 py-1 text-xs text-[var(--color-ink)]"
                >
                  <BadgeCheck className="h-3.5 w-3.5 text-[var(--color-brand-green-ink)]" aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="text-3xl font-semibold tracking-tight">Méthode &amp; expertise</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {[
            {
              title: "Cibler un cas d'usage à fort ROI",
              body: "Pas de chantier tentaculaire. On identifie le process qui coûte le plus de temps ou d'argent, on le chiffre, on le traite en premier.",
            },
            {
              title: "Livrer vite, mesurer",
              body: "Audit en 2 semaines, application ou agent en 4 à 8 semaines. Chaque mission est suivie d'indicateurs concrets (temps gagné, ROI).",
            },
            {
              title: "Garder l'humain aux commandes",
              body: "Conformité (RGPD, IA Act, Qualiopi, RGAA), supervision des agents, relecture systématique du code. L'IA augmente les équipes, elle ne les remplace pas.",
            },
          ].map((p) => (
            <div key={p.title} className="rounded-2xl border border-[var(--color-line)] bg-white p-6">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-ink-muted)]">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-20">
        <h2 className="text-3xl font-semibold tracking-tight">Structure juridique</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-[var(--color-line)] bg-white p-6">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-brand-blue-ink)]">
              SAS
            </p>
            <h3 className="mt-2 text-xl font-semibold">{SITE.legal.sas}</h3>
            <p className="mt-3 text-sm text-[var(--color-ink-muted)]">
              Société par actions simplifiée portant les activités de conseil, de développement
              d&apos;applications métier, les agents IA autonomes, les SaaS B2B et l&apos;e-commerce industriel.
            </p>
            {SAS_LEGAL.length > 0 && (
              <dl className="mt-4 space-y-1.5 border-t border-[var(--color-line)] pt-4 text-xs">
                {SAS_LEGAL.map((r) => (
                  <div key={r.label} className="flex justify-between gap-3">
                    <dt className="text-[var(--color-ink-muted)]">{r.label}</dt>
                    <dd className="text-right font-medium">{r.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
          <div className="rounded-2xl border border-[var(--color-line)] bg-white p-6">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-brand-green-ink)]">
              EI
            </p>
            <h3 className="mt-2 text-xl font-semibold">{SITE.legal.ei}</h3>
            <p className="mt-3 text-sm text-[var(--color-ink-muted)]">
              Entreprise individuelle dédiée à l&apos;activité de formation Qualiopi, finançable
              OPCO et plan de développement des compétences de l&apos;entreprise.
            </p>
            {EI_LEGAL.length > 0 && (
              <dl className="mt-4 space-y-1.5 border-t border-[var(--color-line)] pt-4 text-xs">
                {EI_LEGAL.map((r) => (
                  <div key={r.label} className="flex justify-between gap-3">
                    <dt className="text-[var(--color-ink-muted)]">{r.label}</dt>
                    <dd className="text-right font-medium">{r.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
