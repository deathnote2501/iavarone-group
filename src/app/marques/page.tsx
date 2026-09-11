import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import Image from "next/image";
import { BrandDirectory } from "@/components/sections/ActivitiesGrid";
import { ProjectPath } from "@/components/sections/ProjectPath";

export const metadata: Metadata = {
  title: {
    absolute: "Marques d'IAvarone Group — formation, conseil & agents IA",
  },
  description:
    "Les sept marques d'IAvarone Group : Jérôme Iavarone (formation Qualiopi), IAvarone Conseil (apps métier), Employé IA (agents autonomes), Kaliio et Kaliopi (SaaS Qualiopi), Conform-RGAA (accessibilité), MecaIndus (e-commerce B2B industriel).",
  alternates: { canonical: `${SITE.url}/marques` },
};

export default function MarquesPage() {
  return (
    <>
      <section className="border-b border-[var(--color-line)]">
        <div className="container-page py-16">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Les marques d&apos;IAvarone Group
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--color-ink-muted)]">
            Sept marques opérationnelles couvrant l&apos;ensemble du cycle de
            vie de l&apos;IA générative en entreprise : formation, conseil,
            agents autonomes, SaaS B2B et e-commerce.
          </p>
        </div>
      </section>

      <ProjectPath />
      <section className="group-complementarity">
        <div className="container-page group-complementarity-grid">
          <figure>
            <Image
              src="/brand-v2/group-auvergne.png"
              alt="Illustration architecturale imaginaire ouverte sur un paysage volcanique"
              width={1536}
              height={1024}
              sizes="(min-width: 1024px) 600px, 100vw"
            />
            <figcaption>Illustration architecturale générée par IA.</figcaption>
          </figure>
          <div>
            <p className="group-eyebrow">Des expertises complémentaires</p>
            <h2>
              Votre parcours
              <br />
              peut évoluer.
            </h2>
            <p>
              Une formation peut faire émerger le besoin d’un outil métier. Un
              logiciel peut accueillir des tâches automatisées. Un premier
              échange permet de choisir l’étape la plus utile maintenant.
            </p>
            <p>
              Les propositions sont cadrées selon leur nature. La formation et
              le conseil sont portés par l’EI ; le développement par la SAS
              IAvarone Conseil.
            </p>
          </div>
        </div>
      </section>
      <section
        className="container-page py-16"
        aria-label="Toutes les marques du groupe"
      >
        <BrandDirectory />
      </section>
    </>
  );
}
