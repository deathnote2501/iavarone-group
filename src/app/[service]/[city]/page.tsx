import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Calendar, Phone, MapPin, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BookingLink } from "@/components/ui/BookingLink";
import { SITE, CITIES } from "@/lib/site";
import { SERVICES, SERVICES_LIST, type ServiceSlug } from "@/lib/services";
import { shouldIndexCity } from "@/lib/seo-volumes";
import { overrideFor } from "@/lib/city-service-overrides";
import { TrustBar } from "@/components/sections/TrustBar";
import { AuthorBio } from "@/components/sections/AuthorBio";

interface PageProps {
  params: Promise<{ service: string; city: string }>;
}

export async function generateStaticParams() {
  const services = Object.keys(SERVICES) as ServiceSlug[];
  return services.flatMap((service) => CITIES.map((c) => ({ service, city: c.slug })));
}

function getData(serviceSlug: string, citySlug: string) {
  const service = SERVICES[serviceSlug as ServiceSlug];
  const city = CITIES.find((c) => c.slug === citySlug);
  if (!service || !city) return null;
  return { service, city };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: s, city: c } = await params;
  const data = getData(s, c);
  if (!data) return {};
  const { service, city } = data;
  const url = `${SITE.url}/${service.slug}/${city.slug}`;
  // Pilotage DataForSEO : les combos à 0 volume de recherche mesuré passent en
  // noindex pour éviter le profil "doorway pages" et préserver le crawl budget
  // sur les pages à demande réelle. Voir src/lib/seo-volumes.ts.
  const index = shouldIndexCity(service.slug, city.slug);
  const override = overrideFor(service.slug, city.slug);
  const title = override?.metaTitle ?? service.longTitle(city.name);
  const description = override?.metaDescription ?? service.metaDescription(city.name);
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index, follow: true },
    openGraph: { type: "article", url, title, description },
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

export default async function ServiceCityPage({ params }: PageProps) {
  const { service: s, city: c } = await params;
  const data = getData(s, c);
  if (!data) notFound();
  const { service, city } = data;
  const Icon = service.icon;

  // Enrichissement éditorial du combo (cf. src/lib/city-service-overrides.ts).
  // La FAQ fusionnée sert à la fois au rendu et au JSON-LD : le schema ne doit
  // jamais annoncer une question absente de la page.
  const override = overrideFor(service.slug, city.slug);
  const faq = [...service.faq(city.name), ...(override?.extraFaq ?? [])];

  // Maillage interne : on relie chaque page ville aux autres villes INDEXABLES
  // du même service (graphe complet entre pages utiles → un crawl atteignant une
  // page indexée rebondit vers les autres) et aux autres services indexables de
  // la même ville. On exclut les combos noindex pour ne pas diluer le crawl
  // budget ni le link equity vers des pages volontairement non indexées.
  const related = CITIES.filter(
    (other) => other.slug !== city.slug && shouldIndexCity(service.slug, other.slug),
  );
  const otherServices = SERVICES_LIST.filter(
    (s) => s.slug !== service.slug && shouldIndexCity(s.slug, city.slug),
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: SITE.url },
          { "@type": "ListItem", position: 2, name: service.title, item: `${SITE.url}/${service.slug}` },
          { "@type": "ListItem", position: 3, name: city.name, item: `${SITE.url}/${service.slug}/${city.slug}` },
        ],
      },
      {
        "@type": "LocalBusiness",
        name: `${service.title} — ${city.name} (IAvarone Group)`,
        url: `${SITE.url}/${service.slug}/${city.slug}`,
        description: override?.metaDescription ?? service.metaDescription(city.name),
        telephone: SITE.contact.phoneHref,
        email: SITE.contact.email,
        areaServed: { "@type": "City", name: city.name },
        address: { "@type": "PostalAddress", addressLocality: city.name, addressRegion: city.region, addressCountry: "FR" },
        geo: { "@type": "GeoCoordinates", latitude: city.lat, longitude: city.lng },
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
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

      <nav aria-label="Fil d'Ariane" className="border-b border-[var(--color-line)] bg-[var(--color-surface-alt)]">
        <div className="container-page py-3 text-xs text-[var(--color-ink-muted)]">
          <Link href="/" className="hover:text-[var(--color-ink)]">Accueil</Link>
          <span className="mx-2">/</span>
          <Link href={`/${service.slug}`} className="hover:text-[var(--color-ink)]">{service.title}</Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--color-ink)]">{city.name}</span>
        </div>
      </nav>

      <section className="border-b border-[var(--color-line)]">
        <div className="container-page py-16">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${COLOR_BG[service.color]}`}>
              <Icon className={`h-5 w-5 ${COLOR_TEXT[service.color]}`} aria-hidden />
            </div>
            <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-ink-muted)]">
              {service.title} · {city.region}
            </p>
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
            {service.longTitle(city.name)}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[var(--color-ink-muted)]">{service.intro(city.name)}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <BookingLink location="service-city-hero">
                <Calendar className="h-4 w-4" aria-hidden />
                Prendre RDV
                <ArrowRight className="h-4 w-4" aria-hidden />
              </BookingLink>
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

      {override?.answerFirst && (
        <section className="container-page py-16">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight">{override.answerFirst.h2}</h2>
            <div className="mt-6 space-y-4 text-[var(--color-ink-muted)]">
              {override.answerFirst.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="container-page py-16">
        <h2 className="text-3xl font-semibold tracking-tight">Trois engagements concrets</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {service.pillars.map((p) => (
            <div key={p.title} className="rounded-2xl border border-[var(--color-line)] bg-white p-6">
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${COLOR_BG[service.color]}`}>
                <Check className={`h-5 w-5 ${COLOR_TEXT[service.color]}`} aria-hidden />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-ink-muted)]">{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--color-surface-alt)] py-16">
        <div className="container-page">
          <h2 className="text-3xl font-semibold tracking-tight">
            Cas d&apos;usage {service.title.toLowerCase()} pour les entreprises de {city.name}
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--color-ink-muted)]">{service.localAngle(city)}</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {service.useCases.map((uc) => (
              <div key={uc.title} className="flex gap-4 rounded-2xl border border-[var(--color-line)] bg-white p-6">
                <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${COLOR_BG[service.color]}`}>
                  <Sparkles className={`h-5 w-5 ${COLOR_TEXT[service.color]}`} aria-hidden />
                </div>
                <div>
                  <h3 className="text-base font-semibold">{uc.title}</h3>
                  <p className="mt-1.5 text-sm text-[var(--color-ink-muted)]">{uc.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="text-3xl font-semibold tracking-tight">Comment se déroule une mission à {city.name}</h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-4">
          {service.process.map((p, i) => (
            <li key={p.step} className="rounded-2xl border border-[var(--color-line)] bg-white p-6">
              <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${COLOR_BG[service.color]} ${COLOR_TEXT[service.color]}`}>
                {i + 1}
              </span>
              <h3 className="mt-4 text-base font-semibold">{p.step}</h3>
              <p className="mt-1.5 text-sm text-[var(--color-ink-muted)]">{p.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-[var(--color-surface-alt)] py-16">
        <div className="container-page">
          <h2 className="text-3xl font-semibold tracking-tight">Pourquoi {service.title.toLowerCase()} à {city.name} ?</h2>
          <div className="mt-6 grid items-start gap-10 md:grid-cols-[1.4fr_1fr]">
            <div className="prose prose-slate max-w-none text-[var(--color-ink-muted)]">
              <p>{city.economicContext}</p>
              <p>
                <strong className="text-[var(--color-ink)]">Secteurs clés à {city.name} :</strong>{" "}
                {city.industries.join(", ")}. {city.localExamples}
              </p>
              <p>
                Concrètement, les missions {service.title.toLowerCase()} à {city.name} prennent souvent
                la forme d&apos;ateliers en présentiel (cadrage, formation des équipes, restitution) sur
                site, complétés par du travail à distance pour optimiser le rapport coût/impact. Les
                déplacements sont inclus dans les forfaits pour toute la zone {city.region}.
              </p>
              <p>
                Cette page est rattachée à la marque{" "}
                <a href={service.brand.url} target="_blank" rel="noopener">{service.brand.name}</a>,
                l&apos;une des sept entités d&apos;IAvarone Group dédiée à {service.brand.tagline.toLowerCase()}.
              </p>
            </div>

            <aside className="rounded-2xl border border-[var(--color-line)] bg-white p-6">
              <h3 className="flex items-center gap-2 text-sm font-semibold">
                <MapPin className="h-4 w-4 text-[var(--color-brand-blue-ink)]" aria-hidden />
                {city.name} en chiffres
              </h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-[var(--color-ink-muted)]">Région</dt>
                  <dd className="font-medium">{city.region}</dd>
                </div>
                <div>
                  <dt className="text-[var(--color-ink-muted)]">Population</dt>
                  <dd className="font-medium">{city.population}</dd>
                </div>
                <div>
                  <dt className="text-[var(--color-ink-muted)]">Filières dominantes</dt>
                  <dd className="font-medium">{city.industries.slice(0, 3).join(", ")}</dd>
                </div>
                <div>
                  <dt className="text-[var(--color-ink-muted)]">Trajet depuis Clermont-Ferrand</dt>
                  <dd className="font-medium">{city.transportFromClermont}</dd>
                </div>
                <div>
                  <dt className="text-[var(--color-ink-muted)]">Format d&apos;intervention</dt>
                  <dd className="font-medium">Présentiel + distanciel</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="text-3xl font-semibold tracking-tight">Questions fréquentes</h2>
        <div className="mt-8 divide-y divide-[var(--color-line)] rounded-2xl border border-[var(--color-line)] bg-white">
          {faq.map((item) => (
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

      <section className="container-page py-16">
        <div className="rounded-3xl border border-[var(--color-line)] bg-white p-10 sm:p-14">
          <h2 className="text-3xl font-semibold tracking-tight">{service.cta} à {city.name}</h2>
          <p className="mt-4 max-w-xl text-[var(--color-ink-muted)]">
            Premier échange gratuit de 30 minutes pour cadrer votre besoin et estimer la mission.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <BookingLink location="service-city-bottom">
                <Calendar className="h-4 w-4" aria-hidden />
                Prendre RDV avec Jérôme
              </BookingLink>
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

      <AuthorBio context={`${service.title} à ${city.name} — assuré par`} />

      {override?.relatedLinks && override.relatedLinks.length > 0 && (
        <section className="container-page py-12">
          <h2 className="text-xl font-semibold">Pour aller plus loin</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {override.relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center justify-between gap-4 rounded-xl border border-[var(--color-line)] bg-white px-5 py-4 transition hover:border-[var(--color-brand-blue)]"
              >
                <span>
                  <span className="block font-medium">{link.label}</span>
                  <span className="block text-xs text-[var(--color-ink-muted)]">{link.hint}</span>
                </span>
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-[var(--color-ink-muted)] transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            ))}
          </div>
        </section>
      )}

      {otherServices.length > 0 && (
      <section className="container-page py-12">
        <h2 className="text-xl font-semibold">Autres services à {city.name}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {otherServices.map((os) => (
            <Link
              key={os.slug}
              href={`/${os.slug}/${city.slug}`}
              className="group flex items-center justify-between rounded-xl border border-[var(--color-line)] bg-white px-5 py-4 transition hover:border-[var(--color-brand-blue)]"
            >
              <span>
                <span className="block font-medium">{os.title} à {city.name}</span>
                <span className="block text-xs text-[var(--color-ink-muted)]">{os.short}</span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-[var(--color-ink-muted)] transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          ))}
        </div>
      </section>
      )}

      {related.length > 0 && (
      <section className="container-page pb-20">
        <h2 className="text-xl font-semibold">{service.title} dans les autres villes</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {related.map((rc) => (
            <li key={rc.slug}>
              <Link
                href={`/${service.slug}/${rc.slug}`}
                className="inline-flex items-center gap-1 rounded-full border border-[var(--color-line)] bg-white px-3 py-1.5 text-sm text-[var(--color-ink-muted)] transition hover:border-[var(--color-brand-blue)] hover:text-[var(--color-ink)]"
              >
                {rc.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      )}
    </>
  );
}
