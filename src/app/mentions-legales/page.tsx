import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site iavarone-group.fr — IAvarone Group.",
  robots: { index: false, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <section className="container-page py-16">
      <h1 className="text-4xl font-semibold tracking-tight">Mentions légales</h1>
      <div className="prose prose-slate mt-8 max-w-3xl text-[var(--color-ink-muted)]">
        <h2 className="mt-8 text-xl font-semibold text-[var(--color-ink)]">Éditeur du site</h2>
        <p>
          Le site iavarone-group.fr est édité par&nbsp;:<br />
          <strong>{SITE.legal.sas}</strong> (activités SAS) et{" "}
          <strong>{SITE.legal.ei}</strong> (activité de formation).<br />
          Directeur de la publication&nbsp;: {SITE.founder.name}.<br />
          Contact&nbsp;: {SITE.contact.email} — {SITE.contact.phone}.
        </p>

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
