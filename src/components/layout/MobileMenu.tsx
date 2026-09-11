"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BookingLink } from "@/components/ui/BookingLink";

type NavItem = { href: string; label: string };

export function MobileMenu({ items }: { items: NavItem[] }) {
  return (
    <details
      className="group-mobile-menu relative xl:hidden"
      onClick={(event) => {
        if ((event.target as Element).closest("a"))
          event.currentTarget.open = false;
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.currentTarget.open = false;
          event.currentTarget.querySelector("summary")?.focus();
        }
      }}
    >
      <summary
        aria-label="Ouvrir le menu"
        className="grid size-11 cursor-pointer list-none place-items-center rounded-md border border-[var(--color-line)] [&::-webkit-details-marker]:hidden"
      >
        <Menu className="size-5" aria-hidden />
      </summary>
      <nav
        aria-label="Navigation mobile"
        className="absolute right-0 top-14 w-64 rounded-xl border border-[var(--color-line)] bg-white p-3 shadow-lg"
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-md px-3 py-2.5 text-sm hover:bg-[var(--color-surface-alt)]"
          >
            {item.label}
          </Link>
        ))}
        <Button asChild className="mt-3 w-full">
          <BookingLink location="header-mobile">Prendre RDV</BookingLink>
        </Button>
      </nav>
    </details>
  );
}
