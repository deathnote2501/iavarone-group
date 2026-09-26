/**
 * Consentement aux cookies de mesure d'audience (CNIL), même logique sur les cinq vitrines.
 *
 * Mode « basique » du Consent Mode v2 : aucun script Google ne se charge avant « Accepter ».
 * - `CONSENT_BOOTSTRAP_SCRIPT` s'exécute en tête du <head>, avant tout autre script : il définit
 *   `window.dataLayer` et un `gtag` qui ne fait que mettre en file (les appels existants ne lèvent
 *   jamais d'erreur, même après un refus), pose le refus par défaut et lit le choix mémorisé.
 * - Le choix est mémorisé 6 mois : cookie first-party `cookie_consent=granted|denied` et
 *   localStorage (même clé, avec l'échéance). À l'échéance, le bandeau est reproposé.
 * - GA4 n'est chargé par le composant analytics du site que lorsque le choix vaut `granted`.
 *
 * Aucune dépendance React ici : le layout (Server Component) importe le script du <head>.
 */

export type CookieConsentValue = "granted" | "denied";

export const CONSENT_COOKIE = "cookie_consent";
const CONSENT_MONTHS = 6;
/** Émis sur `window` à chaque choix, `detail` = la valeur retenue. */
export const CONSENT_CHANGE_EVENT = "cookie-consent:change";
/** Émis par « Gérer les cookies » pour rouvrir le bandeau, `detail` = l'élément déclencheur. */
export const CONSENT_OPEN_EVENT = "cookie-consent:open";

/**
 * Script inline du <head>, autonome et en ES5. Sa lecture du choix doit rester alignée sur
 * `readCookieConsent()`. L'attribut `data-cookie-consent` (unset | granted | denied) posé sur
 * <html> affiche le bandeau dès le premier rendu, sans attendre l'hydratation.
 */
export const CONSENT_BOOTSTRAP_SCRIPT = String.raw`(function () {
  var w = window, d = document, v = null;
  w.dataLayer = w.dataLayer || [];
  if (typeof w.gtag !== 'function') {
    w.gtag = function () { w.dataLayer.push(arguments); };
  }
  w.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied'
  });
  try {
    var m = d.cookie.match(/(?:^|;\s*)${CONSENT_COOKIE}=(granted|denied)(?:;|$)/);
    if (m) v = m[1];
  } catch (e) {}
  if (!v) {
    try {
      var s = JSON.parse(localStorage.getItem('${CONSENT_COOKIE}') || 'null');
      if (s && (s.value === 'granted' || s.value === 'denied') && s.expires > Date.now()) v = s.value;
    } catch (e) {}
  }
  d.documentElement.setAttribute('data-cookie-consent', v || 'unset');
  if (v === 'granted') w.gtag('consent', 'update', { analytics_storage: 'granted' });
})();`;

type Gtag = (...args: unknown[]) => void;
type ConsentWindow = { dataLayer?: unknown[]; gtag?: Gtag };

function getGtag(): Gtag {
  const w = window as unknown as ConsentWindow;
  const dataLayer = (w.dataLayer = w.dataLayer || []);
  if (typeof w.gtag !== "function") {
    // Filet de sécurité : même file d'attente que le script du <head>. gtag.js exige
    // l'objet `arguments` (et non un tableau) dans le dataLayer.
    w.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      dataLayer.push(arguments);
    };
  }
  return w.gtag;
}

function isValue(value: unknown): value is CookieConsentValue {
  return value === "granted" || value === "denied";
}

/** Choix mémorisé et non expiré, ou `null` si le bandeau doit être (re)proposé. */
export function readCookieConsent(): CookieConsentValue | null {
  try {
    const match = document.cookie.match(
      new RegExp(`(?:^|;\\s*)${CONSENT_COOKIE}=(granted|denied)(?:;|$)`),
    );
    if (match && isValue(match[1])) return match[1];
  } catch {
    // cookies inaccessibles : on se rabat sur le localStorage
  }
  try {
    const stored = JSON.parse(localStorage.getItem(CONSENT_COOKIE) || "null") as {
      value?: unknown;
      expires?: unknown;
    } | null;
    if (
      stored &&
      isValue(stored.value) &&
      typeof stored.expires === "number" &&
      stored.expires > Date.now()
    ) {
      return stored.value;
    }
  } catch {
    // localStorage indisponible (navigation privée stricte…)
  }
  return null;
}

/** Mémorise le choix 6 mois : cookie first-party + localStorage. */
export function saveCookieConsent(value: CookieConsentValue): void {
  const expires = new Date();
  expires.setMonth(expires.getMonth() + CONSENT_MONTHS);
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${value}; Expires=${expires.toUTCString()}; Path=/; SameSite=Lax${secure}`;
  try {
    localStorage.setItem(
      CONSENT_COOKIE,
      JSON.stringify({ value, date: Date.now(), expires: expires.getTime() }),
    );
  } catch {
    // le cookie suffit
  }
}

function isEventCommand(entry: unknown): boolean {
  return (
    typeof entry === "object" && entry !== null && (entry as ArrayLike<unknown>)[0] === "event"
  );
}

/** Supprime les cookies Google Analytics (_ga, _ga_<ID>…) sur l'hôte et ses domaines parents. */
function deleteAnalyticsCookies(): void {
  const names = document.cookie
    .split(";")
    .map((part) => (part.split("=")[0] ?? "").trim())
    .filter((name) => /^(_ga(_.+)?|_gid|_gat.*)$/.test(name));
  if (names.length === 0) return;
  const labels = window.location.hostname.split(".");
  const domains = [""];
  for (let i = 0; i < labels.length - 1; i++)
    domains.push(`; Domain=.${labels.slice(i).join(".")}`);
  for (const name of names) {
    for (const domain of domains) document.cookie = `${name}=; Max-Age=0; Path=/${domain}`;
  }
}

/**
 * Applique le choix à la page en cours et prévient les composants abonnés.
 * - `granted` : les événements mis en file avant le choix (émis sans consentement) sont retirés
 *   tant que gtag.js ne les a pas traités, puis `analytics_storage` passe à `granted`
 *   (`ad_storage`, `ad_user_data` et `ad_personalization` restent `denied`). Le composant
 *   analytics du site charge alors GA4, qui envoie le page_view.
 * - `denied` : rien ne se charge ; si GA4 tournait déjà (retrait du consentement), il est
 *   désactivé pour la page et ses cookies sont supprimés.
 */
export function applyCookieConsent(value: CookieConsentValue, gaId?: string): void {
  const gtag = getGtag();
  const w = window as unknown as ConsentWindow & Record<string, unknown>;
  const dataLayer = w.dataLayer as unknown[];
  if (value === "granted") {
    // Tant que gtag.js n'est pas chargé, `push` est la méthode native du tableau.
    if (dataLayer.push === Array.prototype.push) {
      for (let i = dataLayer.length - 1; i >= 0; i--) {
        if (isEventCommand(dataLayer[i])) dataLayer.splice(i, 1);
      }
    }
    if (gaId) w[`ga-disable-${gaId}`] = false;
    gtag("consent", "update", { analytics_storage: "granted" });
  } else {
    if (gaId) w[`ga-disable-${gaId}`] = true;
    gtag("consent", "update", { analytics_storage: "denied" });
    deleteAnalyticsCookies();
  }
  document.documentElement.setAttribute("data-cookie-consent", value);
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: value }));
}

export function subscribeCookieConsent(onChange: () => void): () => void {
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
}

/** Rouvre le bandeau (lien « Gérer les cookies » du pied de page). */
export function openCookieConsent(trigger?: HTMLElement | null): void {
  window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT, { detail: trigger ?? null }));
}
