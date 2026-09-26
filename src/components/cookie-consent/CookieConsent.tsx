"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/Button";
import {
  applyCookieConsent,
  CONSENT_OPEN_EVENT,
  saveCookieConsent,
  type CookieConsentValue,
} from "@/lib/cookie-consent";
import { useCookieConsent } from "./useCookieConsent";

const MESSAGE =
  "Ce site utilise des cookies de mesure d'audience (Google Analytics) pour comprendre comment il est utilisé. Vous pouvez les accepter ou les refuser, et changer d'avis à tout moment via «\u00a0Gérer les cookies\u00a0» en bas de page.";

type Props = {
  /** Identifiant GA4, pour couper GA immédiatement si le consentement est retiré. */
  gaId?: string | undefined;
  /** Page de confidentialité existante (lien « En savoir plus »). */
  privacyHref: string;
};

/**
 * Bandeau de consentement aux cookies de mesure d'audience, en bas d'écran.
 * Visible dès le premier rendu tant qu'aucun choix n'est mémorisé (attribut posé par le script
 * du <head>), puis piloté par React. Placé au-dessus de la bulle du chatbot sur mobile et à sa
 * gauche sur ordinateur ; la modale de RDV, rendue plus loin dans le DOM, passe au-dessus.
 */
export function CookieConsent({ gaId, privacyHref }: Props) {
  const consent = useCookieConsent();
  const [reopened, setReopened] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function onOpen(event: Event) {
      triggerRef.current = (event as CustomEvent<HTMLElement | null>).detail;
      setReopened(true);
    }
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
  }, []);

  // Rouvert depuis « Gérer les cookies » : le focus entre dans le bandeau.
  useEffect(() => {
    if (reopened) regionRef.current?.focus();
  }, [reopened]);

  function close() {
    setReopened(false);
    triggerRef.current?.focus();
    triggerRef.current = null;
  }

  function choose(value: CookieConsentValue) {
    saveCookieConsent(value);
    applyCookieConsent(value, gaId);
    close();
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    // Échap referme seulement le bandeau rouvert : le choix déjà mémorisé est conservé.
    if (event.key === "Escape" && reopened && consent) close();
  }

  const open = consent === null || reopened;

  return (
    <div
      ref={regionRef}
      id="cookie-consent"
      role="region"
      aria-label="Consentement aux cookies"
      tabIndex={-1}
      data-nosnippet=""
      data-open={consent === undefined ? undefined : String(open)}
      onKeyDown={onKeyDown}
      className="cookie-consent fixed inset-x-3 bottom-[5.5rem] z-[2147483001] rounded-xl border border-[var(--color-line)] bg-white p-4 text-left shadow-xl sm:bottom-4 sm:left-4 sm:right-24 sm:max-w-3xl sm:p-5"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
        <p className="text-sm leading-relaxed text-[var(--color-ink-muted)]">
          {MESSAGE}{" "}
          <Link
            href={privacyHref}
            className="font-medium text-[var(--color-brand-blue-ink)] underline underline-offset-2 hover:text-[var(--color-ink)]"
          >
            En savoir plus
          </Link>
        </p>
        {/* Refuser et Accepter : exactement le même bouton, pour un poids visuel identique. */}
        <div className="grid shrink-0 grid-cols-2 gap-3">
          <Button type="button" onClick={() => choose("denied")} className="w-full cursor-pointer">
            Refuser
          </Button>
          <Button type="button" onClick={() => choose("granted")} className="w-full cursor-pointer">
            Accepter
          </Button>
        </div>
      </div>
    </div>
  );
}
