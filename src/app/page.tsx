import { Hero } from "@/components/sections/Hero";
import { ActivitiesGrid } from "@/components/sections/ActivitiesGrid";
import { ResultsPreview } from "@/components/sections/ResultsPreview";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ActivitiesGrid />
      <ResultsPreview />
      <AboutPreview />
      <ContactCTA />
    </>
  );
}
