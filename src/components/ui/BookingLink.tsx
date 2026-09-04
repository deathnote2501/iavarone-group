"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export interface BookingLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  /** Emplacement du CTA dans la page (hero, header, contact, etc.) — envoyé à GA4. */
  location?: string;
}

/**
 * Lien vers la page de réservation rdv.jeromeiavarone.fr qui émet l'événement de conversion `booking_click`
 * vers GA4 (G-MPZM0EYFQE) au clic. Marquer `booking_click` comme « événement clé »
 * dans GA4 pour en faire l'objectif de conversion final du funnel.
 *
 * Compatible avec `<Button asChild>` (Radix Slot) : la ref et les props (className…)
 * sont transmises à l'ancre sous-jacente.
 */
export const BookingLink = React.forwardRef<HTMLAnchorElement, BookingLinkProps>(
  ({ location, onClick, children, ...props }, ref) => {
    const pathname = usePathname();
    // `page=<chemin courant>` : la page de réservation l'écrit dans l'ERP comme origine du RDV
    // (le referrer cross-origin ne porte que l'origine, jamais le chemin).
    const href = withPage(SITE.contact.booking, pathname);

    function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
      window.gtag?.("event", "booking_click", {
        cta_location: location ?? "unknown",
        // cta_page (et non page_path : gtag.js consomme ce nom, herite d Universal
        // Analytics, et ne le transmet jamais comme parametre custom : verifie en prod
        // le 2026-07-27, il etait absent du beacon). Sans lui on sait qu'il y a eu un clic, pas depuis quelle page.
        // C'est la page qui sert de cle de rapprochement avec le RDV reellement pris
        // (jointure GA4 x Google Calendar, cf. skill rdv-briefing).
        cta_page: pathname ?? "",
        link_url: href,
      });
      onClick?.(event);
    }

    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener"
        onClick={handleClick}
        {...props}
      >
        {children}
      </a>
    );
  },
);

BookingLink.displayName = "BookingLink";

function withPage(url: string, pathname: string | null): string {
  try {
    const u = new URL(url);
    if (!u.searchParams.has("page")) u.searchParams.set("page", pathname || "/");
    return u.toString();
  } catch {
    return url;
  }
}
