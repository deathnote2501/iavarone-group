import Link from "next/link";
import { Building2 } from "lucide-react";
import { SITE, BRANDS } from "@/lib/site";

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
            <h4 className="text-sm font-semibold">Activités</h4>
            <ul className="mt-3 space-y-2 text-sm text-[var(--color-ink-muted)]">
              {BRANDS.map((b) => (
                <li key={b.slug}>
                  <a href={b.url} target="_blank" rel="noopener" className="hover:text-[var(--color-ink)]">
                    {b.name}
                  </a>
                </li>
              ))}
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

        <p className="mt-10 border-t border-[var(--color-line)] pt-6 text-xs text-[var(--color-ink-muted)]">
          © {new Date().getFullYear()} Groupe IAvarone — {SITE.legal.sas} & {SITE.legal.ei}. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
