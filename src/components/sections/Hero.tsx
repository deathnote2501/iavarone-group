import { Calendar, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-line)]">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, var(--color-brand-blue) 0, transparent 40%), radial-gradient(circle at 80% 30%, var(--color-brand-green) 0, transparent 40%), radial-gradient(circle at 50% 90%, var(--color-brand-yellow) 0, transparent 40%)",
        }}
        aria-hidden
      />
      <div className="container-page py-20 sm:py-28">
        <p className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-white px-3 py-1 text-xs font-medium text-[var(--color-ink-muted)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand-green)]" />
          Auvergne-Rhône-Alpes · Paris · Distanciel France entière
        </p>

        <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
          L&apos;IA générative au service des{" "}
          <span className="text-[var(--color-brand-blue)]">entreprises</span>,{" "}
          <span className="text-[var(--color-brand-green)]">organisations</span> et{" "}
          <span className="text-[var(--color-brand-yellow)]">indépendants</span>.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-[var(--color-ink-muted)]">
          <strong className="text-[var(--color-ink)]">{SITE.name}</strong> est un groupe français
          d&apos;intelligence artificielle générative fondé en 2020 par Jérôme Iavarone, formateur
          Qualiopi et consultant indépendant. Le groupe rassemble six marques B2B complémentaires&nbsp;:
          formation, conseil, développement d&apos;applications métier, agents IA autonomes et SaaS.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a href={SITE.contact.booking} target="_blank" rel="noopener">
              <Calendar className="h-4 w-4" aria-hidden />
              Prendre RDV avec Jérôme
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <a href={SITE.contact.phoneHref}>
              <Phone className="h-4 w-4" aria-hidden />
              {SITE.contact.phone}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
