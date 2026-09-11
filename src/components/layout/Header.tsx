import Link from "next/link";
import { Building2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BookingLink } from "@/components/ui/BookingLink";
import { MobileMenu } from "./MobileMenu";
import { SITE } from "@/lib/site";

const NAV = [
  { href: "/formation-ia", label: "Formation IA" },
  { href: "/conseil-ia", label: "Conseil IA" },
  { href: "/agent-ia", label: "Agent IA" },
  { href: "/references", label: "Résultats" },
  { href: "/ressources", label: "Ressources" },
  { href: "/marques", label: "Marques" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="group-site-header sticky top-0 z-50 w-full border-b border-[var(--color-line)] bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75">
      <div className="container-page group-header-row">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <span className="group-brand-symbol">
            <Building2 className="h-6 w-6" aria-hidden />
          </span>
          <span className="group-brand-name">
            {SITE.name}
            <small>Un écosystème indépendant</small>
          </span>
        </Link>

        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-5 xl:flex"
        >
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
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden 2xl:inline-flex"
          >
            <a href={SITE.contact.phoneHref}>{SITE.contact.phone}</a>
          </Button>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <BookingLink location="header">Prendre RDV</BookingLink>
          </Button>
          <MobileMenu items={NAV} />
        </div>
      </div>
    </header>
  );
}
