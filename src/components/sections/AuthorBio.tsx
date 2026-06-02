import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Linkedin, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";

/**
 * Encart auteur E-E-A-T : rattache chaque page de contenu à une personne réelle,
 * identifiable et qualifiée (« qui livre la mission »). Renforce l'Experience et
 * l'Expertise pour Google et les LLM. Réutilisé en bas des pages service,
 * service×ville et marque.
 */
export function AuthorBio({ context }: { context?: string }) {
  return (
    <section aria-label="À propos de l'auteur" className="container-page py-12">
      <div className="flex flex-col gap-6 rounded-2xl border border-[var(--color-line)] bg-white p-6 sm:flex-row sm:items-start sm:p-8">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-[var(--color-line)]">
          <Image
            src={SITE.founder.photo}
            alt={`Portrait de ${SITE.founder.name}`}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-ink-muted)]">
            {context ?? "Rédigé et livré par"}
          </p>
          <h2 className="mt-1 text-lg font-semibold">
            <Link href="/a-propos" className="hover:text-[var(--color-brand-blue)]">
              {SITE.founder.name}
            </Link>
          </h2>
          <p className="text-sm text-[var(--color-brand-blue)]">{SITE.founder.role}</p>
          <p className="mt-3 max-w-2xl text-sm text-[var(--color-ink-muted)]">{SITE.founder.bio}</p>

          <ul className="mt-4 flex flex-wrap gap-2">
            {SITE.founder.credentials.map((c) => (
              <li
                key={c}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surface-alt)] px-3 py-1 text-xs text-[var(--color-ink)]"
              >
                <BadgeCheck className="h-3.5 w-3.5 text-[var(--color-brand-green)]" aria-hidden />
                {c}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
            <Link href="/a-propos" className="inline-flex items-center gap-1 font-medium text-[var(--color-brand-blue)] hover:underline">
              Parcours complet
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
            <a
              href={SITE.social.linkedin}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1 text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
            >
              <Linkedin className="h-3.5 w-3.5" aria-hidden />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
