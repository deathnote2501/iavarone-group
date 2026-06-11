import { BadgeCheck } from "lucide-react";
import { SITE } from "@/lib/site";

/**
 * Bandeau de preuve E-E-A-T (Qualiopi, 1000+ formés, 4,9/5, depuis 2020).
 * Affiché sur les pages service et service×ville pour renforcer l'autorité
 * face aux concurrents pSEO et alimenter les signaux de confiance Google/LLM.
 */
export function TrustBar() {
  return (
    <section aria-label="Repères de confiance" className="border-b border-[var(--color-line)] bg-white">
      <div className="container-page py-8">
        <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {SITE.proof.map((item) => (
            <div key={item.label} className="flex flex-col">
              <dt className="flex items-center gap-1.5 text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
                <BadgeCheck className="h-5 w-5 text-[var(--color-brand-green-ink)]" aria-hidden />
                {item.value}
              </dt>
              <dd className="mt-1 text-xs leading-snug text-[var(--color-ink-muted)]">{item.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
