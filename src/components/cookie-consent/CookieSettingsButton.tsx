"use client";

import { openCookieConsent } from "@/lib/cookie-consent";

/** « Gérer les cookies » : rouvre le bandeau pour changer d'avis (pied de page). */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      aria-controls="cookie-consent"
      onClick={(event) => openCookieConsent(event.currentTarget)}
      className={className}
    >
      Gérer les cookies
    </button>
  );
}
