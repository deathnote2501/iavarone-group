import type { Metadata } from "next";
import { Calendar, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contacter le Groupe IAvarone : RDV en ligne via Koalendar, téléphone, e-mail. Interventions Auvergne-Rhône-Alpes, Paris et distanciel France entière.",
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-[var(--color-line)]">
        <div className="container-page py-16">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Nous contacter</h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--color-ink-muted)]">
            Trois canaux pour échanger avec Jérôme Iavarone&nbsp;: un rendez-vous en ligne via
            Koalendar, le téléphone ou l&apos;e-mail. Premier échange de cadrage gratuit, 30 minutes.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          <a
            href={SITE.contact.booking}
            target="_blank"
            rel="noopener"
            className="group rounded-2xl border border-[var(--color-line)] bg-white p-8 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/[0.04]"
          >
            <Calendar className="h-6 w-6 text-[var(--color-brand-blue)]" aria-hidden />
            <h2 className="mt-4 text-xl font-semibold">Prendre RDV</h2>
            <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
              Réservez un créneau directement dans mon agenda Koalendar. Visio ou physique selon
              votre localisation.
            </p>
            <p className="mt-4 text-sm font-medium text-[var(--color-brand-blue)]">
              Koalendar →
            </p>
          </a>

          <a
            href={SITE.contact.phoneHref}
            className="group rounded-2xl border border-[var(--color-line)] bg-white p-8 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/[0.04]"
          >
            <Phone className="h-6 w-6 text-[var(--color-brand-green)]" aria-hidden />
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
            <Mail className="h-6 w-6 text-[var(--color-brand-yellow)]" aria-hidden />
            <h2 className="mt-4 text-xl font-semibold">E-mail</h2>
            <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
              Pour un brief détaillé, une demande de devis ou un partenariat. Réponse sous 24h ouvrées.
            </p>
            <p className="mt-4 text-sm font-medium">{SITE.contact.email}</p>
          </a>
        </div>

        <div className="mt-12 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-8">
          <h2 className="text-xl font-semibold">Zones d&apos;intervention</h2>
          <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
            Présentiel dans tout l&apos;Auvergne-Rhône-Alpes (Puy-de-Dôme, Allier, Cantal, Haute-Loire,
            Loire, Rhône, Ain, Savoie, Haute-Savoie, Isère, Drôme), à Paris, et distanciel partout en
            France.
          </p>
          <p className="mt-4 text-sm text-[var(--color-ink-muted)]">
            Bureaux à Clermont-Ferrand. Possibilité d&apos;hébergement sur Lyon et Paris pour
            interventions de plusieurs jours.
          </p>
          <div className="mt-6">
            <Button asChild>
              <a href={SITE.contact.booking} target="_blank" rel="noopener">
                Prendre RDV avec Jérôme
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
