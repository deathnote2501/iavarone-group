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
    "Les marques d'IAvarone Group : Jérôme Iavarone (formation Qualiopi), IAvarone Conseil (apps métier), Employé IA (agents autonomes), CRM IA (CRM sur mesure), Kaliio et Kaliopi (SaaS Qualiopi), Conform-RGAA (accessibilité), MecaIndus (e-commerce B2B industriel).",
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
            Des marques opérationnelles couvrant l&apos;ensemble du cycle de
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
              src="/photos/openai-v3/cadrage-projet.webp"
              alt="Illustration : trois professionnels définissent les étapes d’un projet autour d’une table"
              width={1260}
              height={840}
              sizes="(min-width: 1024px) 600px, 100vw"
            />
            <figcaption>Scène de cadrage illustrative, générée par IA.</figcaption>
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
