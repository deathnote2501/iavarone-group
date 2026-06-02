import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/site";
import { ARTICLES, type Block } from "@/lib/articles";
import { AuthorBio } from "@/components/sections/AuthorBio";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

function getArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug) ?? null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const url = `${SITE.url}/ressources/${article.slug}`;
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: article.title,
      description: article.description,
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
      authors: [SITE.founder.name],
    },
    twitter: { card: "summary_large_image", title: article.title, description: article.description },
  };
}

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2 key={i} className="mt-10 text-2xl font-semibold tracking-tight">
          {block.text}
        </h2>
      );
    case "p":
      return (
        <p key={i} className="mt-4 leading-relaxed text-[var(--color-ink-muted)]">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul key={i} className="mt-4 space-y-2">
          {block.items.map((it) => (
            <li key={it} className="flex gap-2 text-[var(--color-ink-muted)]">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand-blue)]" aria-hidden />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote
          key={i}
          className="mt-6 border-l-2 border-[var(--color-brand-blue)] bg-[var(--color-surface-alt)] px-5 py-4 text-lg font-medium text-[var(--color-ink)]"
        >
          {block.text}
        </blockquote>
      );
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const others = ARTICLES.filter((a) => a.slug !== article.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Ressources", item: `${SITE.url}/ressources` },
          { "@type": "ListItem", position: 3, name: article.title, item: `${SITE.url}/ressources/${article.slug}` },
        ],
      },
      {
        "@type": "BlogPosting",
        "@id": `${SITE.url}/ressources/${article.slug}/#article`,
        headline: article.title,
        description: article.description,
        url: `${SITE.url}/ressources/${article.slug}`,
        datePublished: article.datePublished,
        dateModified: article.dateModified,
        inLanguage: "fr-FR",
        articleSection: article.category,
        author: { "@id": `${SITE.url}/#person` },
        publisher: { "@id": `${SITE.url}/#organization` },
        mainEntityOfPage: `${SITE.url}/ressources/${article.slug}`,
      },
      ...(article.faq
        ? [
            {
              "@type": "FAQPage",
              mainEntity: article.faq.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav aria-label="Fil d'Ariane" className="border-b border-[var(--color-line)] bg-[var(--color-surface-alt)]">
        <div className="container-page py-3 text-xs text-[var(--color-ink-muted)]">
          <Link href="/" className="hover:text-[var(--color-ink)]">Accueil</Link>
          <span className="mx-2">/</span>
          <Link href="/ressources" className="hover:text-[var(--color-ink)]">Ressources</Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--color-ink)]">{article.category}</span>
        </div>
      </nav>

      <article className="container-page py-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-brand-blue)]">
            {article.category}
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-[1.15] tracking-tight sm:text-5xl">
            {article.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-[var(--color-ink-muted)]">
            <span>
              Par <Link href="/a-propos" className="font-medium text-[var(--color-ink)] hover:underline">{SITE.founder.name}</Link>
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" aria-hidden />
              Mis à jour le {new Date(article.dateModified).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              {article.readingMinutes} min de lecture
            </span>
          </div>

          <div className="mt-8">{article.blocks.map(renderBlock)}</div>

          {article.faq && (
            <section className="mt-12">
              <h2 className="text-2xl font-semibold tracking-tight">Questions fréquentes</h2>
              <div className="mt-6 divide-y divide-[var(--color-line)] rounded-2xl border border-[var(--color-line)] bg-white">
                {article.faq.map((item) => (
                  <details key={item.q} className="group p-6">
                    <summary className="cursor-pointer list-none text-base font-semibold marker:hidden">
                      <span className="flex items-start justify-between gap-4">
                        {item.q}
                        <span className="text-[var(--color-brand-blue)] transition-transform group-open:rotate-45">+</span>
                      </span>
                    </summary>
                    <p className="mt-3 text-sm text-[var(--color-ink-muted)]">{item.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          <div className="mt-12 rounded-3xl border border-[var(--color-line)] bg-white p-8 sm:p-10">
            <h2 className="text-2xl font-semibold tracking-tight">Un projet en tête ?</h2>
            <p className="mt-3 text-[var(--color-ink-muted)]">
              Premier échange de cadrage gratuit de 30 minutes pour estimer le gain potentiel dans votre organisation.
            </p>
            <div className="mt-6">
              <Button asChild size="lg">
                <a href={SITE.contact.booking} target="_blank" rel="noopener">
                  <Calendar className="h-4 w-4" aria-hidden />
                  Prendre RDV avec Jérôme
                </a>
              </Button>
            </div>
          </div>
        </div>
      </article>

      <AuthorBio context="Article rédigé par" />

      <section className="container-page pb-20">
        <h2 className="text-xl font-semibold">À lire ensuite</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {others.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/ressources/${a.slug}`}
                className="group flex items-center justify-between rounded-xl border border-[var(--color-line)] bg-white px-5 py-4 transition hover:border-[var(--color-brand-blue)]"
              >
                <span>
                  <span className="block text-xs text-[var(--color-ink-muted)]">{a.category}</span>
                  <span className="block font-medium">{a.title}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
