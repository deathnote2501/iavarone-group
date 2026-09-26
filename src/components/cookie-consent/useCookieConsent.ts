"use client";

import { useSyncExternalStore } from "react";
import {
  readCookieConsent,
  subscribeCookieConsent,
  type CookieConsentValue,
} from "@/lib/cookie-consent";

function getServerSnapshot(): undefined {
  return undefined;
}

/**
 * Choix de l'internaute sur les cookies de mesure d'audience.
 * `undefined` tant que la page n'est pas hydratée, `null` si aucun choix valide n'est mémorisé.
 */
export function useCookieConsent(): CookieConsentValue | null | undefined {
  return useSyncExternalStore(subscribeCookieConsent, readCookieConsent, getServerSnapshot);
}
