import type { Metadata } from "next";
import Image from "next/image";
import { SITE } from "@/lib/site";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "À propos du Groupe IAvarone",
  description:
    "Le Groupe IAvarone est fondé et opéré par Jérôme Iavarone, formateur Qualiopi et consultant en IA générative basé en Auvergne.",
};

export default function AProposPage() {
  return (
    <>
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
            <p className="mt-2 text-lg text-[var(--color-brand-blue)]">{SITE.founder.role}</p>
            <p className="mt-6 text-[var(--color-ink-muted)]">
              Formateur certifié Qualiopi et consultant en IA générative depuis 2020, j&apos;ai
              progressivement structuré mon activité en un groupe de six entités complémentaires&nbsp;:
              une SAS de conseil et de développement, une entreprise individuelle de formation, et
              quatre produits B2B en production.
            </p>
            <p className="mt-3 text-[var(--color-ink-muted)]">
              Ma conviction&nbsp;: l&apos;IA générative n&apos;est plus un sujet d&apos;expérimentation
              mais un levier opérationnel à mettre entre les mains des équipes — avec méthode, garde-fous
              et conformité.
            </p>
            <p className="mt-3 text-[var(--color-ink-muted)]">
              Basé en Auvergne, j&apos;interviens en présentiel dans le Puy-de-Dôme, à Lyon,
              Saint-Étienne et Paris, et en distanciel partout en France.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <h2 className="text-3xl font-semibold tracking-tight">Structure juridique</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-[var(--color-line)] bg-white p-6">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-brand-blue)]">
              SAS
            </p>
            <h3 className="mt-2 text-xl font-semibold">{SITE.legal.sas}</h3>
            <p className="mt-3 text-sm text-[var(--color-ink-muted)]">
              Société par actions simplifiée portant les activités de conseil, de développement
              d&apos;applications métier, les agents IA autonomes et les SaaS B2B.
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--color-line)] bg-white p-6">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-brand-green)]">
              EI
            </p>
            <h3 className="mt-2 text-xl font-semibold">{SITE.legal.ei}</h3>
            <p className="mt-3 text-sm text-[var(--color-ink-muted)]">
              Entreprise individuelle dédiée à l&apos;activité de formation Qualiopi, finançable
              OPCO, CPF et plan de formation entreprise.
            </p>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
