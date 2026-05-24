import Link from "next/link";
import { Building2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/site";

const NAV = [
  { href: "/activites", label: "Activités" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-line)] bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <Building2 className="h-5 w-5 text-[var(--color-brand-blue)]" aria-hidden />
          <span>{SITE.name}</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-ink)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <a href={SITE.contact.phoneHref}>{SITE.contact.phone}</a>
          </Button>
          <Button asChild size="sm">
            <a href={SITE.contact.booking} target="_blank" rel="noopener">
              Prendre RDV
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
