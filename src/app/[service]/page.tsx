import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BookingLink } from "@/components/ui/BookingLink";
import { SITE, CITIES } from "@/lib/site";
import { SERVICES, SERVICES_LIST, type ServiceSlug } from "@/lib/services";
import { shouldIndexCity } from "@/lib/seo-volumes";
import { TrustBar } from "@/components/sections/TrustBar";
import { AuthorBio } from "@/components/sections/AuthorBio";
import { ResultsPreview } from "@/components/sections/ResultsPreview";

interface PageProps {
  params: Promise<{ service: string }>;
}

export async function generateStaticParams() {
  return Object.keys(SERVICES).map((service) => ({ service }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: s } = await params;
  const service = SERVICES[s as ServiceSlug];
  if (!service) return {};
  const url = `${SITE.url}/${service.slug}`;
  const title = service.hubMetaTitle;
  const description = service.hubMetaDescription;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

const COLOR_TEXT = {
  blue: "text-[var(--color-brand-blue-ink)]",
  green: "text-[var(--color-brand-green-ink)]",
  yellow: "text-[var(--color-brand-yellow-ink)]",
  red: "text-[var(--color-brand-red-ink)]",
};
const COLOR_BG = {
  blue: "bg-[var(--color-brand-blue)]/8",
  green: "bg-[var(--color-brand-green)]/8",
  yellow: "bg-[var(--color-brand-yellow)]/10",
  red: "bg-[var(--color-brand-red)]/8",
};

export default async function ServicePage({ params }: PageProps) {
  const { service: s } = await params;
  const service = SERVICES[s as ServiceSlug];
  if (!service) notFound();
  const Icon = service.icon;

  // On ne liste/lie que les villes indexables pour ce service : les combos
  // noindex (0 volume mesuré) restent hors maillage pour concentrer le crawl
  // budget sur les pages à demande réelle.
  const hubs = CITIES.filter((c) => c.hub && shouldIndexCity(service.slug, c.slug));
  const others = CITIES.filter((c) => !c.hub && shouldIndexCity(service.slug, c.slug));
  const otherServices = SERVICES_LIST.filter((s) => s.slug !== service.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: SITE.url },
          { "@type": "ListItem", position: 2, name: service.title, item: `${SITE.url}/${service.slug}` },
        ],
      },
      {
        "@type": "Service",
        "@id": `${SITE.url}/${service.slug}/#service`,
        name: service.title,
        serviceType: service.title,
        description: service.short,
        provider: { "@id": `${SITE.url}/#organization` },
        brand: { "@type": "Brand", name: service.brand.name, url: service.brand.url },
        areaServed: CITIES.map((c) => ({
          "@type": "City",
          name: c.name,
          address: { "@type": "PostalAddress", addressLocality: c.name, addressRegion: c.region, addressCountry: "FR" },
        })),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${service.title} — Catalogue par ville`,
          itemListElement: CITIES.map((c) => ({
            "@type": "Offer",
            url: `${SITE.url}/${service.slug}/${c.slug}`,
            name: `${service.title} à ${c.name}`,
            areaServed: { "@type": "City", name: c.name },
          })),
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: service.hubFaq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="border-b border-[var(--color-line)]">
        <div className="container-page py-16">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${COLOR_BG[service.color]}`}>
              <Icon className={`h-5 w-5 ${COLOR_TEXT[service.color]}`} aria-hidden />
            </div>
            <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-ink-muted)]">
              {service.title}
            </p>
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
            {service.hubH1}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[var(--color-ink-muted)]">{service.hubLede}</p>
          <p className="mt-4 max-w-2xl text-[var(--color-ink-muted)]">
            Cette activité est portée par{" "}
            <a href={service.brand.url} target="_blank" rel="noopener" className={`font-medium ${COLOR_TEXT[service.color]}`}>
              {service.brand.name}
            </a>
            , entité d&apos;IAvarone Group dédiée à {service.brand.tagline.toLowerCase()}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <BookingLink location="service-hub">
                <Calendar className="h-4 w-4" aria-hidden />
                Prendre RDV avec Jérôme
                <ArrowRight className="h-4 w-4" aria-hidden />
              </BookingLink>
            </Button>
          </div>
        </div>
      </section>

      <TrustBar />

      <section className="container-page py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {service.hubSections.map((s) => (
            <div key={s.h2}>
              <h2 className="text-2xl font-semibold tracking-tight">{s.h2}</h2>
              <p className="mt-3 text-[var(--color-ink-muted)]">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-16">
        <h2 className="text-3xl font-semibold tracking-tight">Pôles principaux</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {hubs.map((city) => (
            <li key={city.slug}>
              <Link
                href={`/${service.slug}/${city.slug}`}
                className="group block rounded-2xl border border-[var(--color-line)] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/[0.04]"
              >
                <MapPin className={`h-5 w-5 ${COLOR_TEXT[service.color]}`} aria-hidden />
                <h3 className="mt-4 text-lg font-semibold">{city.name}</h3>
                <p className="mt-1 text-xs text-[var(--color-ink-muted)]">{city.region}</p>
                <p className="mt-3 text-sm text-[var(--color-ink-muted)]">
                  {service.title} à {city.name}
                </p>
                <p className={`mt-4 inline-flex items-center gap-1 text-sm font-medium ${COLOR_TEXT[service.color]}`}>
                  Voir <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <h2 className="mt-16 text-3xl font-semibold tracking-tight">Autres villes desservies</h2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((city) => (
            <li key={city.slug}>
              <Link
                href={`/${service.slug}/${city.slug}`}
                className="group flex items-center justify-between rounded-xl border border-[var(--color-line)] bg-white px-5 py-4 transition hover:border-[var(--color-brand-blue)]"
              >
                <span>
                  <span className="block font-medium">{city.name}</span>
                  <span className="block text-xs text-[var(--color-ink-muted)]">{city.region}</span>
                </span>
                <ArrowRight className="h-4 w-4 text-[var(--color-ink-muted)] transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-page pb-4">
        <h2 className="text-3xl font-semibold tracking-tight">Questions fréquentes</h2>
        <div className="mt-8 divide-y divide-[var(--color-line)] rounded-2xl border border-[var(--color-line)] bg-white">
          {service.hubFaq.map((item) => (
            <details key={item.q} className="group p-6">
              <summary className="cursor-pointer list-none text-base font-semibold marker:hidden">
                <span className="flex items-start justify-between gap-4">
                  {item.q}
                  <span className="text-[var(--color-brand-blue-ink)] transition-transform group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-3 text-sm text-[var(--color-ink-muted)]">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <ResultsPreview />

      <AuthorBio context="Votre interlocuteur unique" />

      <section className="container-page py-16">
        <h2 className="text-xl font-semibold">Les autres expertises d&apos;IAvarone Group</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {otherServices.map((os) => (
            <Link
              key={os.slug}
              href={`/${os.slug}`}
              className="group flex items-center justify-between rounded-xl border border-[var(--color-line)] bg-white px-5 py-4 transition hover:border-[var(--color-brand-blue)]"
            >
              <span>
                <span className="block font-medium">{os.title}</span>
                <span className="block text-xs text-[var(--color-ink-muted)]">{os.short}</span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-[var(--color-ink-muted)] transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
