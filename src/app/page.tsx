import { Hero } from "@/components/sections/Hero";
import { ActivitiesGrid, ProductsGrid } from "@/components/sections/ActivitiesGrid";
import { OrganisationPreview } from "@/components/sections/OrgChart";
import { ResultsPreview } from "@/components/sections/ResultsPreview";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { SITE, BRANDS, type Brand } from "@/lib/site";

// Service schema for each brand shown in ActivitiesGrid and ProductsGrid,
// linked to the Organization declared in the root layout (#organization)
const servicesJsonLd = {
  "@context": "https://schema.org",
  "@graph": (BRANDS as readonly Brand[]).map((b) => ({
    "@type": "Service",
    "@id": `${SITE.url}/marques/${b.slug}#service`,
    name: b.name,
    serviceType: b.schemaTagline ?? b.tagline,
    description: b.description,
    url: `${SITE.url}/marques/${b.slug}`,
    provider: { "@id": `${SITE.url}/#organization` },
    areaServed: { "@type": "Country", name: "France" },
    availableLanguage: "French",
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <Hero />
      <ActivitiesGrid />
      <OrganisationPreview />
      <ProductsGrid />
      <ResultsPreview />
      <AboutPreview />
      <ContactCTA />
    </>
  );
}
