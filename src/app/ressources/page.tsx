import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { SITE } from "@/lib/site";
import { ARTICLES } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Ressources & guides sur l'IA générative en entreprise",
  description:
    "Guides et analyses d'IAvarone Group sur l'IA générative en entreprise : ROI en PME, financement des formations (OPCO), agents IA vs recrutement. Par Jérôme Iavarone.",
  alternates: { canonical: `${SITE.url}/ressources` },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Ressources", item: `${SITE.url}/ressources` },
      ],
    },
    {
      "@type": "Blog",
      "@id": `${SITE.url}/ressources/#blog`,
      name: "Ressources IAvarone Group",
      url: `${SITE.url}/ressources`,
      publisher: { "@id": `${SITE.url}/#organization` },
      blogPost: ARTICLES.map((a) => ({
        "@type": "BlogPosting",
        headline: a.title,
        url: `${SITE.url}/ressources/${a.slug}`,
        datePublished: a.datePublished,
        dateModified: a.dateModified,
        author: { "@id": `${SITE.url}/#person` },
      })),
    },
  ],
};

export default function RessourcesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="border-b border-[var(--color-line)]">
        <div className="container-page py-16">
          <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-brand-blue)]">
            Ressources
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
            Guides &amp; analyses sur l&apos;IA générative en entreprise
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[var(--color-ink-muted)]">
            Des repères concrets, issus de missions réelles, pour décider et agir : retour sur
            investissement, financement des formations, choix entre agent IA et recrutement.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/ressources/${a.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-[var(--color-line)] bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/[0.04]"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-brand-blue)]">
                  {a.category}
                </p>
                <h2 className="mt-3 text-lg font-semibold leading-snug">{a.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-muted)]">{a.description}</p>
                <div className="mt-auto flex items-center gap-3 pt-5 text-xs text-[var(--color-ink-muted)]">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" aria-hidden />
                    {a.readingMinutes} min
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium text-[var(--color-ink)]">
                    Lire <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
