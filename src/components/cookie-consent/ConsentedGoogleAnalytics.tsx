"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useCookieConsent } from "./useCookieConsent";

/**
 * GA4 ne se charge qu'après « Accepter » sur le bandeau cookies : `dataLayer`, `gtag` et le refus
 * par défaut (Consent Mode v2) sont posés par le script de consentement du <head>.
 */
export function ConsentedGoogleAnalytics({ gaId }: { gaId: string }) {
  const consent = useCookieConsent();
  if (consent !== "granted") return null;
  return <GoogleAnalytics gaId={gaId} />;
}
