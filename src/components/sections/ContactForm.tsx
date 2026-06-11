"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Envoi impossible.");
      // `contact_form_submit` est marqué « événement clé » dans GA4 (G-MPZM0EYFQE).
      window.gtag?.("event", "contact_form_submit", { form_location: "contact" });
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Erreur inconnue");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-[var(--color-brand-green)]/30 bg-[var(--color-brand-green)]/5 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-[var(--color-brand-green-ink)]" aria-hidden />
        <h3 className="mt-4 text-lg font-semibold">Message envoyé</h3>
        <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
          Merci, je vous réponds sous 24h ouvrées. Pour un échange plus rapide, n&apos;hésitez pas à
          réserver directement un créneau via Koalendar ou à m&apos;appeler.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <input type="text" name="honeypot" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium">Nom *</span>
          <input
            type="text"
            name="name"
            required
            minLength={2}
            autoComplete="name"
            className="mt-1.5 block w-full rounded-lg border border-[var(--color-line)] bg-white px-3 py-2.5 text-sm shadow-sm transition focus:border-[var(--color-brand-blue)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-blue)]"
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium">E-mail *</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            className="mt-1.5 block w-full rounded-lg border border-[var(--color-line)] bg-white px-3 py-2.5 text-sm shadow-sm transition focus:border-[var(--color-brand-blue)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-blue)]"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium">Société</span>
          <input
            type="text"
            name="company"
            autoComplete="organization"
            className="mt-1.5 block w-full rounded-lg border border-[var(--color-line)] bg-white px-3 py-2.5 text-sm shadow-sm transition focus:border-[var(--color-brand-blue)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-blue)]"
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium">Téléphone</span>
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            className="mt-1.5 block w-full rounded-lg border border-[var(--color-line)] bg-white px-3 py-2.5 text-sm shadow-sm transition focus:border-[var(--color-brand-blue)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-blue)]"
          />
        </label>
      </div>

      <label className="block text-sm">
        <span className="font-medium">Message *</span>
        <textarea
          name="message"
          required
          minLength={10}
          rows={5}
          className="mt-1.5 block w-full rounded-lg border border-[var(--color-line)] bg-white px-3 py-2.5 text-sm shadow-sm transition focus:border-[var(--color-brand-blue)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-blue)]"
        />
      </label>

      {status === "error" && (
        <p className="flex items-start gap-2 rounded-lg border border-[var(--color-brand-red)]/30 bg-[var(--color-brand-red)]/5 p-3 text-sm text-[var(--color-brand-red-ink)]">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          {errorMsg || "Impossible d'envoyer le message. Essayez l'e-mail ou le téléphone."}
        </p>
      )}

      <div className="flex items-center justify-between">
        <p className="text-xs text-[var(--color-ink-muted)]">
          En soumettant, vous acceptez d&apos;être recontacté. Aucune autre utilisation.
        </p>
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Envoi…" : "Envoyer"}
          <Send className="h-4 w-4" aria-hidden />
        </Button>
      </div>
    </form>
  );
}
