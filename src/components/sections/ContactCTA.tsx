import { Calendar, Mail, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BookingLink } from "@/components/ui/BookingLink";
import { SITE } from "@/lib/site";

export function ContactCTA() {
  return (
    <section className="container-page py-20">
      <div className="overflow-hidden rounded-3xl border border-[var(--color-line)] bg-white p-10 sm:p-14">
        <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Discutons de votre projet IA
            </h2>
            <p className="mt-4 max-w-xl text-[var(--color-ink-muted)]">
              Premier échange de cadrage gratuit de 30 minutes. Identifions ensemble laquelle des six
              activités du groupe correspond à votre besoin&nbsp;: formation, conseil, application
              métier, agent IA, conformité ou outil B2B.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <BookingLink location="contact-cta">
                  <Calendar className="h-4 w-4" aria-hidden />
                  Prendre RDV en ligne
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </BookingLink>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href={SITE.contact.phoneHref}>
                  <Phone className="h-4 w-4" aria-hidden />
                  {SITE.contact.phone}
                </a>
              </Button>
            </div>
          </div>

          <ul className="grid gap-4 rounded-2xl bg-[var(--color-surface-alt)] p-6">
            <li className="flex items-start gap-3">
              <Calendar className="mt-0.5 h-5 w-5 text-[var(--color-brand-blue)]" aria-hidden />
              <div>
                <p className="font-medium">Rendez-vous en ligne</p>
                <BookingLink location="contact-cta-list" className="text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]">
                  Réserver un créneau sur Koalendar
                </BookingLink>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 text-[var(--color-brand-green)]" aria-hidden />
              <div>
                <p className="font-medium">Téléphone</p>
                <a href={SITE.contact.phoneHref} className="text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]">
                  {SITE.contact.phone}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 text-[var(--color-brand-yellow)]" aria-hidden />
              <div>
                <p className="font-medium">E-mail</p>
                <a href={`mailto:${SITE.contact.email}`} className="text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]">
                  {SITE.contact.email}
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
