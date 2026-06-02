import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CASE_STUDIES } from "@/lib/case-studies";

/**
 * Aperçu accueil des cas clients chiffrés (signal E-E-A-T « Experience »).
 * Met en avant la métrique phare de chaque mission et renvoie vers /references.
 */
export function ResultsPreview() {
  return (
    <section className="container-page py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-brand-green)]">
            Résultats clients
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Des gains de temps et de ROI réellement mesurés
          </h2>
          <p className="mt-4 text-[var(--color-ink-muted)]">
            Chaque mission de conseil cible un cas d&apos;usage à fort impact, puis mesure le résultat.
            Quelques exemples concrets obtenus chez nos clients.
          </p>
        </div>
        <Button asChild variant="secondary">
          <Link href="/references">
            Voir tous les cas <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </Button>
      </div>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {CASE_STUDIES.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/references#${c.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-[var(--color-line)] bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/[0.04]"
            >
              <TrendingUp className="h-5 w-5 text-[var(--color-brand-green)]" aria-hidden />
              <p className="mt-4 text-2xl font-semibold tracking-tight">{c.headline.value}</p>
              <p className="mt-1 text-xs leading-snug text-[var(--color-ink-muted)]">{c.headline.label}</p>
              <p className="mt-auto pt-5 text-sm font-medium text-[var(--color-ink)]">{c.client}</p>
              <p className="text-xs text-[var(--color-ink-muted)]">{c.sector}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
