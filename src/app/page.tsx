import { Hero } from "@/components/sections/Hero";
import { ActivitiesGrid } from "@/components/sections/ActivitiesGrid";
import { ResultsPreview } from "@/components/sections/ResultsPreview";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { SITE, BRANDS } from "@/lib/site";

// Service schema for each of the seven activities shown in ActivitiesGrid,
// linked to the Organization declared in the root layout (#organization)
const servicesJsonLd = {
  "@context": "https://schema.org",
  "@graph": BRANDS.map((b) => ({
    "@type": "Service",
    "@id": `${SITE.url}/marques/${b.slug}#service`,
    name: b.name,
    serviceType: b.tagline,
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
      <ResultsPreview />
      <AboutPreview />
      <ContactCTA />
    </>
  );
}
