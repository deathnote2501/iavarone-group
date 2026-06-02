import type { Metadata } from "next";
import { Calendar, Phone, TrendingUp, Quote } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/site";
import { CASE_STUDIES } from "@/lib/case-studies";
import { TrustBar } from "@/components/sections/TrustBar";
import { AuthorBio } from "@/components/sections/AuthorBio";

export const metadata: Metadata = {
  title: "Résultats clients & cas concrets",
  description:
    "Cas clients chiffrés d'IAvarone Group : ROI, temps gagné et gains de qualité obtenus grâce à l'IA générative dans le service client, le recrutement, l'administration judiciaire et l'immobilier.",
  alternates: { canonical: `${SITE.url}/references` },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Références", item: `${SITE.url}/references` },
      ],
    },
    {
      "@type": "ItemList",
      name: "Cas clients IAvarone Group",
      itemListElement: CASE_STUDIES.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "CreativeWork",
          name: `${c.client} — ${c.headline.value}`,
          about: c.sector,
          abstract: c.challenge,
          creator: { "@id": `${SITE.url}/#person` },
          publisher: { "@id": `${SITE.url}/#organization` },
        },
      })),
    },
  ],
};

export default function ReferencesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="border-b border-[var(--color-line)]">
        <div className="container-page py-16">
          <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-brand-blue)]">
            Résultats clients
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
            Des gains de temps et de ROI mesurés, pas des promesses
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[var(--color-ink-muted)]">
            Chaque mission de conseil IAvarone vise un cas d&apos;usage à fort impact, puis mesure le
            résultat. Voici des exemples réels de gains obtenus chez nos clients grâce à l&apos;IA
            générative — du service client au recrutement, de l&apos;administration judiciaire à
            l&apos;immobilier.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={SITE.contact.booking} target="_blank" rel="noopener">
                <Calendar className="h-4 w-4" aria-hidden />
                Estimer mon gain potentiel
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href={SITE.contact.phoneHref}>
                <Phone className="h-4 w-4" aria-hidden />
                {SITE.contact.phone}
              </a>
            </Button>
          </div>
        </div>
      </section>

      <TrustBar />

      <div className="container-page space-y-10 py-16">
        {CASE_STUDIES.map((c) => (
          <article
            key={c.slug}
            id={c.slug}
            className="scroll-mt-24 rounded-3xl border border-[var(--color-line)] bg-white p-8 sm:p-10"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-ink-muted)]">
                  {c.sector}
                </p>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight">{c.client}</h2>
              </div>
              <p className="flex items-center gap-2 text-[var(--color-brand-green)]">
                <TrendingUp className="h-5 w-5" aria-hidden />
                <span className="text-2xl font-semibold tracking-tight">{c.headline.value}</span>
              </p>
            </div>
            <p className="mt-1 text-sm text-[var(--color-ink-muted)]">{c.headline.label}</p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-ink-muted)]">
                  Le défi
                </h3>
                <p className="mt-2 text-[var(--color-ink-muted)]">{c.challenge}</p>
                <h3 className="mt-5 text-sm font-semibold uppercase tracking-wide text-[var(--color-ink-muted)]">
                  La solution
                </h3>
                <p className="mt-2 text-[var(--color-ink-muted)]">{c.solution}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-ink-muted)]">
                  Résultats mesurés
                </h3>
                <dl className="mt-3 grid grid-cols-2 gap-4">
                  {c.metrics.map((m) => (
                    <div key={m.label} className="rounded-xl bg-[var(--color-surface-alt)] p-4">
                      <dt className="text-lg font-semibold tracking-tight">{m.value}</dt>
                      <dd className="mt-1 text-xs leading-snug text-[var(--color-ink-muted)]">{m.label}</dd>
                    </div>
                  ))}
                </dl>
                {c.qualityGains && (
                  <ul className="mt-4 space-y-2">
                    {c.qualityGains.map((g) => (
                      <li key={g} className="flex items-start gap-2 text-sm text-[var(--color-ink-muted)]">
                        <Quote className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-brand-blue)]" aria-hidden />
                        {g}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="container-page pb-4">
        <div className="rounded-3xl border border-[var(--color-line)] bg-white p-10 sm:p-14">
          <h2 className="text-3xl font-semibold tracking-tight">Quel serait votre gain ?</h2>
          <p className="mt-4 max-w-xl text-[var(--color-ink-muted)]">
            Premier échange de cadrage gratuit de 30 minutes pour identifier le cas d&apos;usage à plus
            fort ROI dans votre organisation et estimer le temps que vous pourriez gagner.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={SITE.contact.booking} target="_blank" rel="noopener">
                <Calendar className="h-4 w-4" aria-hidden />
                Prendre RDV avec Jérôme
              </a>
            </Button>
          </div>
        </div>
      </section>

      <AuthorBio context="Missions menées par" />
    </>
  );
}
