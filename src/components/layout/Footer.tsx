import Link from "next/link";
import { Building2 } from "lucide-react";
import { SITE, BRANDS, CITIES } from "@/lib/site";
import { SERVICES_LIST } from "@/lib/services";
import { shouldIndexCity } from "@/lib/seo-index";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--color-line)] bg-[var(--color-surface-alt)]">
      <div className="container-page py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-semibold">
              <Building2 className="h-5 w-5 text-[var(--color-brand-blue-ink)]" aria-hidden />
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
            <h2 className="text-sm font-semibold">Services</h2>
            <ul className="mt-3 space-y-2 text-sm text-[var(--color-ink-muted)]">
              {SERVICES_LIST.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`} className="hover:text-[var(--color-ink)]">
                    {s.title}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/marques" className="hover:text-[var(--color-ink)]">
                  Toutes nos marques →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold">Le groupe</h2>
            <ul className="mt-3 space-y-2 text-sm text-[var(--color-ink-muted)]">
              <li><Link href="/references" className="hover:text-[var(--color-ink)]">Résultats clients</Link></li>
              <li><Link href="/ressources" className="hover:text-[var(--color-ink)]">Ressources</Link></li>
              <li><Link href="/a-propos" className="hover:text-[var(--color-ink)]">À propos</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--color-ink)]">Contact</Link></li>
              <li><Link href="/mentions-legales" className="hover:text-[var(--color-ink)]">Mentions légales</Link></li>
              <li><Link href="/confidentialite" className="hover:text-[var(--color-ink)]">Confidentialité</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[var(--color-line)] pt-8">
          <h2 className="text-sm font-semibold">Nos services par ville</h2>
          {/* Maillage interne sitewide : on ne lie QUE les combos indexables
              (shouldIndexCity) avec une ancre descriptive par service, pour que
              chaque page du site fasse découvrir à Google toutes les pages
              [service]/[ville] à demande réelle. */}
          <div className="mt-4 grid gap-x-8 gap-y-6 sm:grid-cols-3">
            {SERVICES_LIST.map((svc) => {
              const cities = CITIES.filter((c) => shouldIndexCity(svc.slug, c.slug));
              if (cities.length === 0) return null;
              return (
                <div key={svc.slug}>
                  <h3 className="text-xs font-semibold">
                    <Link href={`/${svc.slug}`} className="hover:text-[var(--color-brand-blue-ink)]">
                      {svc.title}
                    </Link>
                  </h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {cities.map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/${svc.slug}/${c.slug}`}
                          title={`${svc.title} à ${c.name}`}
                          className="inline-block rounded-full border border-[var(--color-line)] bg-white px-3 py-1 text-xs text-[var(--color-ink-muted)] transition hover:border-[var(--color-brand-blue)] hover:text-[var(--color-ink)]"
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-xs text-[var(--color-ink-muted)]">
            Marques du groupe :{" "}
            {BRANDS.map((b, i) => (
              <span key={b.slug}>
                {i > 0 && " · "}
                <Link href={`/marques/${b.slug}`} className="hover:text-[var(--color-ink)]">
                  {b.name}
                </Link>
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
