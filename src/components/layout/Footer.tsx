import Link from "next/link";
import { Building2 } from "lucide-react";
import { SITE, BRANDS, CITIES } from "@/lib/site";
import { SERVICES_LIST } from "@/lib/services";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
      <div className="container-page py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-semibold">
              <Building2 className="h-5 w-5 text-[var(--color-brand-blue)]" aria-hidden />
              <span>{SITE.name}</span>
            </div>
            <p className="mt-3 max-w-md text-sm text-[var(--color-ink-muted)]">{SITE.baseline}</p>
            <div className="mt-4 flex flex-col gap-1 text-sm text-[var(--color-ink-muted)]">
              <a href={`mailto:${SITE.contact.email}`} className="hover:text-[var(--color-ink)]">
                {SITE.contact.email}
              </a>
              <a href={SITE.contact.phoneHref} className="hover:text-[var(--color-ink)]">
                {SITE.contact.phone}
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Services</h4>
            <ul className="mt-3 space-y-2 text-sm text-[var(--color-ink-muted)]">
              {SERVICES_LIST.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`} className="hover:text-[var(--color-ink)]">
                    {s.title}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/activites" className="hover:text-[var(--color-ink)]">
                  Toutes nos marques →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Le groupe</h4>
            <ul className="mt-3 space-y-2 text-sm text-[var(--color-ink-muted)]">
              <li><Link href="/a-propos" className="hover:text-[var(--color-ink)]">À propos</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--color-ink)]">Contact</Link></li>
              <li><Link href="/mentions-legales" className="hover:text-[var(--color-ink)]">Mentions légales</Link></li>
              <li><Link href="/confidentialite" className="hover:text-[var(--color-ink)]">Confidentialité</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[var(--color-line)] pt-8">
          <h4 className="text-sm font-semibold">Présence dans 17 villes</h4>
          <ul className="mt-4 flex flex-wrap gap-2">
            {CITIES.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/conseil-ia/${c.slug}`}
                  className="inline-block rounded-full border border-[var(--color-line)] bg-white px-3 py-1 text-xs text-[var(--color-ink-muted)] transition hover:border-[var(--color-brand-blue)] hover:text-[var(--color-ink)]"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-[var(--color-ink-muted)]">
            Marques partenaires :{" "}
            {BRANDS.map((b, i) => (
              <span key={b.slug}>
                {i > 0 && " · "}
                <a href={b.url} target="_blank" rel="noopener" className="hover:text-[var(--color-ink)]">
                  {b.name}
                </a>
              </span>
            ))}
          </p>
        </div>

        <p className="mt-10 border-t border-[var(--color-line)] pt-6 text-xs text-[var(--color-ink-muted)]">
          © {new Date().getFullYear()} IAvarone Group — {SITE.legal.sas} & {SITE.legal.ei}. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
