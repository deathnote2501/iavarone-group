import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/mentions-legales" },
  title: "Mentions légales",
  description: "Mentions légales du site iavarone-group.fr — IAvarone Group.",
  robots: { index: false, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <section className="container-page py-16">
      <h1 className="text-4xl font-semibold tracking-tight">Mentions légales</h1>
      <p className="mt-4 text-sm text-[var(--color-ink-muted)]">Dernière mise à jour : 18 octobre 2026.</p>
      <div className="prose prose-slate mt-8 max-w-3xl text-[var(--color-ink-muted)]">
        <h2 className="mt-8 text-xl font-semibold text-[var(--color-ink)]">Éditeur du site</h2>
        <p>
          Le site iavarone-group.fr est édité par&nbsp;:<br />
          <strong>{SITE.legal.sas}</strong>.<br />
          Directeur de la publication&nbsp;: {SITE.founder.name}.<br />
          {SITE.legal.sasStreet && (
            <>Siège social&nbsp;: {SITE.legal.sasStreet}, {SITE.legal.sasPostalCode} {SITE.legal.sasCity}.<br /></>
          )}
          Contact&nbsp;: {SITE.contact.email} — {SITE.contact.phone}.
        </p>
        {(SITE.legal.sasSiren || SITE.legal.sasRcs || SITE.legal.sasCapital || SITE.legal.sasVat) && (
          <p>
            <strong>{SITE.legal.sas}</strong>&nbsp;:<br />
            {SITE.legal.sasSiren && <>SIREN&nbsp;: {SITE.legal.sasSiren}<br /></>}
            {SITE.legal.sasSiret && <>SIRET (siège)&nbsp;: {SITE.legal.sasSiret}<br /></>}
            {SITE.legal.sasRcs && <>RCS&nbsp;: {SITE.legal.sasRcs}<br /></>}
            {SITE.legal.sasNaf && <>Code NAF&nbsp;: {SITE.legal.sasNaf}<br /></>}
            {SITE.legal.sasCapital && <>Capital social&nbsp;: {SITE.legal.sasCapital}<br /></>}
            {SITE.legal.sasVat && <>N° TVA intracommunautaire&nbsp;: {SITE.legal.sasVat}<br /></>}
            {SITE.legal.sasInsurance && <>Assurance responsabilité civile professionnelle&nbsp;: {SITE.legal.sasInsurance}<br /></>}
            {SITE.legal.pappersUrl && (
              <>
                Informations légales&nbsp;:{" "}
                <a href={SITE.legal.pappersUrl} target="_blank" rel="noopener">fiche Pappers</a>
                <br />
              </>
            )}
          </p>
        )}

        <h2 className="mt-8 text-xl font-semibold text-[var(--color-ink)]">Hébergement</h2>
        <p>
          Le site est hébergé par <strong>Vercel Inc.</strong>, 440 N Barranca Avenue #4133, Covina,
          CA 91723, USA.<br />
          Nom de domaine enregistré chez <strong>OVH SAS</strong>, 2 rue Kellermann, 59100 Roubaix,
          France.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-[var(--color-ink)]">Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble des contenus du site (textes, images, logos, code source) est protégé par
          le droit d&apos;auteur. Toute reproduction, même partielle, est soumise à autorisation
          préalable écrite.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-[var(--color-ink)]">Crédits</h2>
        <p>
          Icônes&nbsp;: <a href="https://lucide.dev" target="_blank" rel="noopener">Lucide</a>.<br />
          Police de caractères&nbsp;:{" "}
          <a href="https://fonts.google.com/specimen/Inter" target="_blank" rel="noopener">Inter</a>.
        </p>
      </div>
    </section>
  );
}
