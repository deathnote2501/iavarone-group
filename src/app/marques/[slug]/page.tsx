import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Calendar, Phone, Check, GraduationCap, Briefcase, Bot, ClipboardCheck, Accessibility, ShoppingCart } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BookingLink } from "@/components/ui/BookingLink";
import { AuthorBio } from "@/components/sections/AuthorBio";
import { SITE, BRANDS, type Brand } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const ICONS: Record<Brand["slug"], LucideIcon> = {
  jeromeiavarone: GraduationCap,
  "iavarone-conseil": Briefcase,
  "employe-ia": Bot,
  kaliio: ClipboardCheck,
  "rgaa-ia": Accessibility,
  fit: ShoppingCart,
};

const COLOR_TEXT: Record<Brand["color"], string> = {
  blue: "text-[var(--color-brand-blue)]",
  green: "text-[var(--color-brand-green)]",
  yellow: "text-[#B8860B]",
  red: "text-[var(--color-brand-red)]",
};
const COLOR_BG: Record<Brand["color"], string> = {
  blue: "bg-[var(--color-brand-blue)]/8",
  green: "bg-[var(--color-brand-green)]/8",
  yellow: "bg-[var(--color-brand-yellow)]/10",
  red: "bg-[var(--color-brand-red)]/8",
};

export async function generateStaticParams() {
  return BRANDS.map((b) => ({ slug: b.slug }));
}

function getBrand(slug: string): Brand | null {
  return BRANDS.find((b) => b.slug === slug) ?? null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) return {};
  const url = `${SITE.url}/marques/${brand.slug}`;
  const title = brand.metaTitle ?? `${brand.name} — ${brand.tagline}`;
  const description = brand.longDescription.slice(0, 160);
  return {
    // metaTitle is a deliberate standalone title — bypass the layout title template
    title: brand.metaTitle ? { absolute: brand.metaTitle } : title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function BrandPage({ params }: PageProps) {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) notFound();
  const Icon = ICONS[brand.slug];
  const others = BRANDS.filter((b) => b.slug !== brand.slug);
  const officialHostname = new URL(brand.url).hostname.replace("www.", "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Marques", item: `${SITE.url}/marques` },
          { "@type": "ListItem", position: 3, name: brand.name, item: `${SITE.url}/marques/${brand.slug}` },
        ],
      },
      {
        "@type": "Brand",
        name: brand.name,
        description: brand.tagline,
        url: brand.url,
        parentOrganization: { "@id": `${SITE.url}/#organization` },
      },
      {
        "@type": "Product",
        name: brand.name,
        description: brand.longDescription,
        category: brand.category,
        brand: { "@type": "Brand", name: brand.name },
        offers: {
          "@type": "Offer",
          url: brand.url,
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          description: brand.pricing,
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav aria-label="Fil d'Ariane" className="border-b border-[var(--color-line)] bg-[var(--color-surface-alt)]">
        <div className="container-page py-3 text-xs text-[var(--color-ink-muted)]">
          <Link href="/" className="hover:text-[var(--color-ink)]">Accueil</Link>
          <span className="mx-2">/</span>
          <Link href="/marques" className="hover:text-[var(--color-ink)]">Marques</Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--color-ink)]">{brand.name}</span>
        </div>
      </nav>

      <section className="border-b border-[var(--color-line)]">
        <div className="container-page py-16">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${COLOR_BG[brand.color]}`}>
              <Icon className={`h-5 w-5 ${COLOR_TEXT[brand.color]}`} aria-hidden />
            </div>
            <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-ink-muted)]">
              {brand.category}
            </p>
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
            {brand.name}
          </h1>
          <p className={`mt-3 text-xl font-medium ${COLOR_TEXT[brand.color]}`}>{brand.tagline}</p>
          <p className="mt-6 max-w-2xl text-lg text-[var(--color-ink-muted)]">{brand.longDescription}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={brand.url} target="_blank" rel="noopener">
                Site officiel : {officialHostname}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <BookingLink location="marque-hero">
                <Calendar className="h-4 w-4" aria-hidden />
                Prendre RDV
              </BookingLink>
            </Button>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Points clés</h2>
            <ul className="mt-8 space-y-4">
              {brand.keyPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${COLOR_BG[brand.color]}`}>
                    <Check className={`h-3.5 w-3.5 ${COLOR_TEXT[brand.color]}`} aria-hidden />
                  </div>
                  <span className="text-[var(--color-ink)]">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="rounded-2xl border border-[var(--color-line)] bg-white p-6">
            <h3 className="text-sm font-semibold">Carte d&apos;identité</h3>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="text-[var(--color-ink-muted)]">Structure juridique</dt>
                <dd className="font-medium">{brand.structure}</dd>
              </div>
              <div>
                <dt className="text-[var(--color-ink-muted)]">Catégorie</dt>
                <dd className="font-medium">{brand.category}</dd>
              </div>
              <div>
                <dt className="text-[var(--color-ink-muted)]">Cible</dt>
                <dd className="font-medium">{brand.targetAudience}</dd>
              </div>
              <div>
                <dt className="text-[var(--color-ink-muted)]">Tarification</dt>
                <dd className="font-medium">{brand.pricing}</dd>
              </div>
              <div>
                <dt className="text-[var(--color-ink-muted)]">Site officiel</dt>
                <dd>
                  <a href={brand.url} target="_blank" rel="noopener" className={`font-medium ${COLOR_TEXT[brand.color]} hover:underline`}>
                    {officialHostname}
                  </a>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="rounded-3xl border border-[var(--color-line)] bg-white p-10 sm:p-14">
          <h2 className="text-3xl font-semibold tracking-tight">{brand.cta}</h2>
          <p className="mt-4 max-w-xl text-[var(--color-ink-muted)]">
            Premier échange de cadrage gratuit, 30 minutes, pour estimer si {brand.name} correspond à votre besoin.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={brand.url} target="_blank" rel="noopener">
                Visiter {brand.name}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <BookingLink location="marque-bottom">
                <Calendar className="h-4 w-4" aria-hidden />
                Prendre RDV avec Jérôme
              </BookingLink>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <a href={SITE.contact.phoneHref}>
                <Phone className="h-4 w-4" aria-hidden />
                {SITE.contact.phone}
              </a>
            </Button>
          </div>
        </div>
      </section>

      <AuthorBio context="Marque opérée par" />

      <section className="container-page pb-20">
        <h2 className="text-xl font-semibold">Les autres marques du groupe</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((b) => (
            <li key={b.slug}>
              <Link
                href={`/marques/${b.slug}`}
                className="group flex items-center justify-between rounded-xl border border-[var(--color-line)] bg-white px-5 py-4 transition hover:border-[var(--color-brand-blue)]"
              >
                <span>
                  <span className="block font-medium">{b.name}</span>
                  <span className="block text-xs text-[var(--color-ink-muted)]">{b.tagline}</span>
                </span>
                <ArrowRight className="h-4 w-4 text-[var(--color-ink-muted)] transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
