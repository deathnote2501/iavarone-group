import type { Metadata } from "next";
import { ActivitiesGrid } from "@/components/sections/ActivitiesGrid";

export const metadata: Metadata = {
  title: "Nos activités",
  description:
    "Les six activités du Groupe IAvarone : formation, conseil, applications métier, agents IA, SaaS Qualiopi et RGAA, e-commerce B2B.",
};

export default function ActivitesPage() {
  return (
    <>
      <section className="border-b border-[var(--color-line)]">
        <div className="container-page py-16">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Nos activités</h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--color-ink-muted)]">
            Six entités complémentaires couvrant l&apos;ensemble du cycle de vie de l&apos;IA générative
            en entreprise.
          </p>
        </div>
      </section>
      <ActivitiesGrid />
    </>
  );
}
