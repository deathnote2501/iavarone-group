import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/site";

const STATS = [
  { value: "1 000+", label: "Professionnels formés" },
  { value: "4,9 / 5", label: "Satisfaction moyenne" },
  { value: "6", label: "Activités opérationnelles" },
  { value: "2020", label: "Depuis" },
];

export function AboutPreview() {
  return (
    <section className="bg-[var(--color-surface-alt)] py-20">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white">
          <Image
            src={SITE.founder.photo}
            alt={`Portrait de ${SITE.founder.name}`}
            fill
            sizes="(min-width: 1024px) 384px, 100vw"
            className="object-cover"
            priority
          />
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-brand-blue-ink)]">
            À propos
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Un groupe fondé et opéré par {SITE.founder.name}
          </h2>
          <p className="mt-5 text-[var(--color-ink-muted)]">
            Formateur certifié Qualiopi et consultant en IA générative depuis 2020, Jérôme Iavarone
            a structuré son activité en un groupe de six entités complémentaires&nbsp;: une SAS de
            conseil et de développement, une entreprise individuelle de formation, et quatre produits
            B2B en production.
          </p>
          <p className="mt-3 text-[var(--color-ink-muted)]">
            Basé en Auvergne, intervient en présentiel dans le Puy-de-Dôme, à Lyon, Saint-Étienne et
            Paris, et en distanciel partout en France.
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="text-2xl font-semibold tracking-tight">{s.value}</dt>
                <dd className="mt-1 text-xs text-[var(--color-ink-muted)]">{s.label}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <Button asChild variant="secondary">
              <Link href="/a-propos">
                En savoir plus sur le groupe <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
