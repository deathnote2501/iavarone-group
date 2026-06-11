import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GraduationCap, Briefcase, Bot, ClipboardCheck, Accessibility, ShoppingCart } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SITE, BRANDS, type Brand } from "@/lib/site";

const ICONS: Record<Brand["slug"], LucideIcon> = {
  jeromeiavarone: GraduationCap,
  "iavarone-conseil": Briefcase,
  "employe-ia": Bot,
  kaliio: ClipboardCheck,
  "rgaa-ia": Accessibility,
  fit: ShoppingCart,
};

const COLOR_TEXT: Record<Brand["color"], string> = {
  blue: "text-[var(--color-brand-blue-ink)]",
  green: "text-[var(--color-brand-green-ink)]",
  yellow: "text-[var(--color-brand-yellow-ink)]",
  red: "text-[var(--color-brand-red-ink)]",
};
const COLOR_BG: Record<Brand["color"], string> = {
  blue: "bg-[var(--color-brand-blue)]/8",
  green: "bg-[var(--color-brand-green)]/8",
  yellow: "bg-[var(--color-brand-yellow)]/10",
  red: "bg-[var(--color-brand-red)]/8",
};

export const metadata: Metadata = {
  title: { absolute: "Marques d'IAvarone Group — formation, conseil & agents IA" },
  description:
    "Les six marques d'IAvarone Group : Jérôme Iavarone (formation Qualiopi), IAvarone Conseil (apps métier), Employé IA (agents autonomes), Kaliio (SaaS Qualiopi), Conform-RGAA (accessibilité), FIT (e-commerce B2B).",
  alternates: { canonical: `${SITE.url}/marques` },
};

export default function MarquesPage() {
  return (
    <>
      <section className="border-b border-[var(--color-line)]">
        <div className="container-page py-16">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Les marques d&apos;IAvarone Group</h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--color-ink-muted)]">
            Six marques opérationnelles couvrant l&apos;ensemble du cycle de vie de l&apos;IA générative
            en entreprise : formation, conseil, agents autonomes, SaaS B2B et e-commerce.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BRANDS.map((brand) => {
            const Icon = ICONS[brand.slug];
            return (
              <li key={brand.slug}>
                <Link
                  href={`/marques/${brand.slug}`}
                  className="group block h-full rounded-2xl border border-[var(--color-line)] bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/[0.04]"
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${COLOR_BG[brand.color]}`}>
                    <Icon className={`h-5 w-5 ${COLOR_TEXT[brand.color]}`} aria-hidden />
                  </div>
                  <h2 className="mt-5 text-lg font-semibold">{brand.name}</h2>
                  <p className={`mt-1 text-sm font-medium ${COLOR_TEXT[brand.color]}`}>{brand.tagline}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-muted)]">
                    {brand.description}
                  </p>
                  <p className="mt-5 inline-flex items-center gap-1 text-sm font-medium">
                    En savoir plus
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-wide text-[var(--color-ink-muted)]">
                    {brand.structure} · {new URL(brand.url).hostname.replace("www.", "")}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
