import type { Metadata } from "next";
import { Calendar, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BookingLink } from "@/components/ui/BookingLink";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contacter IAvarone Group : RDV en ligne, téléphone, e-mail. Interventions Auvergne-Rhône-Alpes, Paris et distanciel France entière.",
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-[var(--color-line)]">
        <div className="container-page py-16">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Nous contacter</h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--color-ink-muted)]">
            Trois canaux pour échanger avec Jérôme Iavarone&nbsp;: un rendez-vous en ligne via
            la réservation en ligne, le téléphone ou l&apos;e-mail. Premier échange de cadrage gratuit, 30 minutes.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          <BookingLink
            location="contact-card"
            className="group rounded-2xl border border-[var(--color-line)] bg-white p-8 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/[0.04]"
          >
            <Calendar className="h-6 w-6 text-[var(--color-brand-blue-ink)]" aria-hidden />
            <h2 className="mt-4 text-xl font-semibold">Prendre RDV</h2>
            <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
              Réservez un créneau de 30 minutes en visio directement dans mon agenda.
            </p>
            <p className="mt-4 text-sm font-medium text-[var(--color-brand-blue-ink)]">Réserver →</p>
          </BookingLink>

          <a
            href={SITE.contact.phoneHref}
            className="group rounded-2xl border border-[var(--color-line)] bg-white p-8 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/[0.04]"
          >
            <Phone className="h-6 w-6 text-[var(--color-brand-green-ink)]" aria-hidden />
            <h2 className="mt-4 text-xl font-semibold">Téléphone</h2>
            <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
              Du lundi au vendredi, 9h–18h. Réponse rapide pour les questions urgentes.
            </p>
            <p className="mt-4 text-lg font-semibold tracking-tight">{SITE.contact.phone}</p>
          </a>

          <a
            href={`mailto:${SITE.contact.email}`}
            className="group rounded-2xl border border-[var(--color-line)] bg-white p-8 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/[0.04]"
          >
            <Mail className="h-6 w-6 text-[var(--color-brand-yellow-ink)]" aria-hidden />
            <h2 className="mt-4 text-xl font-semibold">E-mail</h2>
            <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
              Pour un brief détaillé, une demande de devis ou un partenariat. Réponse sous 24h ouvrées.
            </p>
            <p className="mt-4 text-sm font-medium">{SITE.contact.email}</p>
          </a>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="rounded-2xl border border-[var(--color-line)] bg-white p-8">
          <h2 className="text-xl font-semibold">Bureaux &amp; logistique</h2>
          <p className="mt-3 text-sm text-[var(--color-ink-muted)]">
            Bureaux à Clermont-Ferrand. Possibilité d&apos;hébergement sur Lyon et Paris pour
            interventions de plusieurs jours. Déplacements inclus dans les forfaits sur toute la
            région Auvergne-Rhône-Alpes.
          </p>
          <div className="mt-6">
            <Button asChild>
              <BookingLink location="contact-bottom">
                Prendre RDV avec Jérôme
              </BookingLink>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
