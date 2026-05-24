import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE, CITIES } from "@/lib/site";
import { SERVICES, type ServiceSlug } from "@/lib/services";

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
  const title = `${service.title} en Auvergne-Rhône-Alpes & Paris`;
  const description = `${service.short}. Présence dans 17 villes : Clermont-Ferrand, Lyon, Saint-Étienne, Paris, Vichy, Riom, Annecy, Grenoble et plus.`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

const COLOR_TEXT = {
  blue: "text-[var(--color-brand-blue)]",
  green: "text-[var(--color-brand-green)]",
  yellow: "text-[#B8860B]",
  red: "text-[var(--color-brand-red)]",
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

  const hubs = CITIES.filter((c) => c.hub);
  const others = CITIES.filter((c) => !c.hub);

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
            {service.title} en Auvergne-Rhône-Alpes &amp; Paris
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[var(--color-ink-muted)]">{service.short}.</p>
          <p className="mt-4 max-w-2xl text-[var(--color-ink-muted)]">
            Cette activité est portée par{" "}
            <a href={service.brand.url} target="_blank" rel="noopener" className={`font-medium ${COLOR_TEXT[service.color]}`}>
              {service.brand.name}
            </a>
            , entité d&apos;IAvarone Group dédiée à {service.brand.tagline.toLowerCase()}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={SITE.contact.booking} target="_blank" rel="noopener">
                <Calendar className="h-4 w-4" aria-hidden />
                Prendre RDV avec Jérôme
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
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
    </>
  );
}
