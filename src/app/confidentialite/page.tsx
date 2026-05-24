import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et traitement des données — Groupe IAvarone.",
  robots: { index: false, follow: true },
};

export default function ConfidentialitePage() {
  return (
    <section className="container-page py-16">
      <h1 className="text-4xl font-semibold tracking-tight">Politique de confidentialité</h1>
      <div className="prose prose-slate mt-8 max-w-3xl text-[var(--color-ink-muted)]">
        <p>
          Le présent site limite au strict nécessaire la collecte de données personnelles. Aucun cookie
          de traçage publicitaire n&apos;est déposé.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-[var(--color-ink)]">
          Données collectées via le formulaire de contact
        </h2>
        <p>
          Lorsque vous nous contactez par e-mail ou via un formulaire, les données transmises
          (nom, e-mail, message) sont utilisées uniquement pour répondre à votre demande. Elles ne sont
          ni revendues ni transmises à des tiers à des fins commerciales.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-[var(--color-ink)]">Mesure d&apos;audience</h2>
        <p>
          Le site utilise Vercel Analytics, un outil de mesure respectueux de la vie privée qui ne
          dépose pas de cookie et ne suit pas les utilisateurs individuellement. Google Search Console
          peut être utilisé pour mesurer le référencement.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-[var(--color-ink)]">Vos droits RGPD</h2>
        <p>
          Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification,
          d&apos;effacement et d&apos;opposition concernant vos données. Pour exercer ces droits, écrivez
          à <strong>{SITE.contact.email}</strong>.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-[var(--color-ink)]">Hébergement</h2>
        <p>
          Les données sont hébergées par Vercel Inc. Les e-mails sont traités via les services Google
          Workspace.
        </p>
      </div>
    </section>
  );
}
