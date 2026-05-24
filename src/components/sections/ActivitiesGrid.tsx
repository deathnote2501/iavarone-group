import { ArrowUpRight, GraduationCap, Briefcase, Bot, ClipboardCheck, Accessibility, ShoppingCart } from "lucide-react";
import { BRANDS, type Brand } from "@/lib/site";

const ICONS: Record<Brand["slug"], typeof GraduationCap> = {
  jeromeiavarone: GraduationCap,
  "iavarone-conseil": Briefcase,
  "employe-ia": Bot,
  kaliio: ClipboardCheck,
  "rgaa-ia": Accessibility,
  fit: ShoppingCart,
};

const COLOR_CLASSES: Record<Brand["color"], { bg: string; border: string; ring: string }> = {
  blue: { bg: "bg-[var(--color-brand-blue)]/8", border: "border-[var(--color-brand-blue)]/20", ring: "ring-[var(--color-brand-blue)]" },
  green: { bg: "bg-[var(--color-brand-green)]/8", border: "border-[var(--color-brand-green)]/20", ring: "ring-[var(--color-brand-green)]" },
  yellow: { bg: "bg-[var(--color-brand-yellow)]/10", border: "border-[var(--color-brand-yellow)]/30", ring: "ring-[var(--color-brand-yellow)]" },
  red: { bg: "bg-[var(--color-brand-red)]/8", border: "border-[var(--color-brand-red)]/20", ring: "ring-[var(--color-brand-red)]" },
};

const COLOR_TEXT: Record<Brand["color"], string> = {
  blue: "text-[var(--color-brand-blue)]",
  green: "text-[var(--color-brand-green)]",
  yellow: "text-[#B8860B]",
  red: "text-[var(--color-brand-red)]",
};

export function ActivitiesGrid() {
  return (
    <section className="container-page py-20">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Six activités complémentaires
        </h2>
        <p className="mt-4 text-[var(--color-ink-muted)]">
          De la formation initiale au déploiement d&apos;agents IA en production, le Groupe IAvarone couvre
          l&apos;ensemble de la chaîne de valeur de l&apos;IA générative pour PME, ETI et organisations.
        </p>
      </div>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {BRANDS.map((brand) => {
          const Icon = ICONS[brand.slug];
          const c = COLOR_CLASSES[brand.color];
          return (
            <li key={brand.slug}>
              <a
                href={brand.url}
                target="_blank"
                rel="noopener"
                className={`group block h-full rounded-2xl border ${c.border} bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/[0.04] focus-visible:outline-none focus-visible:ring-2 ${c.ring} focus-visible:ring-offset-2`}
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${c.bg}`}>
                  <Icon className={`h-5 w-5 ${COLOR_TEXT[brand.color]}`} aria-hidden />
                </div>
                <div className="mt-5 flex items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold">{brand.name}</h3>
                  <ArrowUpRight className="h-4 w-4 text-[var(--color-ink-muted)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </div>
                <p className={`mt-1 text-sm font-medium ${COLOR_TEXT[brand.color]}`}>{brand.tagline}</p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-muted)]">
                  {brand.description}
                </p>
                <p className="mt-5 text-xs uppercase tracking-wide text-[var(--color-ink-muted)]">
                  {brand.structure} · {new URL(brand.url).hostname.replace("www.", "")}
                </p>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
