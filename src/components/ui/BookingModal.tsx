"use client";

import { useEffect, useState } from "react";

const BOOKING_HOST = "rdv.jeromeiavarone.fr";

/**
 * Ouvre la page de réservation rdv.jeromeiavarone.fr dans une modale au lieu de quitter le site :
 * tout lien vers ce domaine (clic gauche simple) est intercepté en phase de bouillonnement, donc
 * après les trackers GA4 qui écoutent en capture. Sans JavaScript, le lien reste un lien.
 * `data-booking-modal="off"` sur une ancre la laisse naviguer normalement.
 */
export default function BookingModal() {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const target = e.target as Element | null;
      const a = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!a || !a.href.includes(BOOKING_HOST) || a.dataset.bookingModal === "off") return;
      e.preventDefault();
      setUrl(a.href);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!url) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setUrl(null); };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", onKey); };
  }, [url]);

  if (!url) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Prendre rendez-vous avec Jérôme Iavarone"
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-0 sm:p-6"
      onClick={() => setUrl(null)}
    >
      <div
        className="relative h-full w-full overflow-hidden bg-white sm:h-[min(92vh,900px)] sm:max-w-5xl sm:rounded-2xl sm:shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setUrl(null)}
          aria-label="Fermer"
          className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 text-neutral-600 shadow hover:bg-neutral-100"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
        <iframe src={url} title="Prendre rendez-vous avec Jérôme Iavarone" className="h-full w-full border-0" />
      </div>
    </div>
  );
}
