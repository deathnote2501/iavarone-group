import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Calendar, Brain, Share2, ClipboardList, Target } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BookingLink } from "@/components/ui/BookingLink";
import { OrgChart, OrgFoundation, ORG_PATH } from "@/components/sections/OrgChart";
import { SITE, BRANDS } from "@/lib/site";
import { ORG_BOOKING_SOURCE, ORG_SHARED_SERVICES, ORG_STUDIES } from "@/lib/organisation";

export const metadata: Metadata = {
  alternates: { canonical: ORG_PATH },
  title: "Notre organisation augmentée par l'IA",
  description:
    "Comment Jérôme Iavarone pilote IAvarone Group avec des agents IA spécialisés : quatre pôles, des rôles et des validations explicites, un ERP pour tout suivre. Et ce que nous pouvons adapter à votre entreprise.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "À propos", item: `${SITE.url}/a-propos` },
    { "@type": "ListItem", position: 3, name: "Notre organisation", item: `${SITE.url}${ORG_PATH}` },
  ],
};

const HOW_AGENTS_WORK = [
  {
    icon: Target,
    title: "Des objectifs écrits",
    text: "Chaque agent a ses consignes : objectifs, périmètre, ce qu'il peut faire seul et ce qui exige une validation.",
  },
  {
    icon: Brain,
    title: "Une mémoire relue",
    text: "Un agent ne se souvient de rien d'un passage à l'autre : il relit sa mémoire (journal, pistes testées, verdicts) avant d'agir et la complète ensuite.",
  },
  {
    icon: Share2,
    title: "La délégation",
    text: "Pour une tâche précise dans un projet, un agent peut la confier à un agent de développement, puis vérifier le résultat.",
  },
  {
    icon: ClipboardList,
    title: "Un compte rendu et une trace",
    text: "Chaque passage se termine par un compte rendu court dans Slack ; l'ERP enregistre son statut, sa durée et son résumé.",
  },
];

const LIMITS = [
  "Un quota hebdomadaire d'usage : ajouter un agent coûte le passage d'un autre.",
  "Une seule exécution à la fois par agent, avec une durée maximale.",
  "Après deux échecs sur la même étape, l'agent s'arrête et rend compte.",
  "Les dépenses et la mise en production d'un projet client restent décidées par Jérôme.",
];

const DEMO_STEPS = [
  {
    label: "Signal",
    text: "Un devis de l'Atelier Verdier est au statut « envoyé » depuis 12 jours : l'ERP le classe « à relancer ».",
  },
  {
    label: "Recoupement",
    text: "Avant de recommander une relance, l'agent consulte les échanges d'emails et l'agenda.",
  },
  {
    label: "Constat",
    text: "Un rendez-vous avec la dirigeante est déjà prévu jeudi : le client attend ce rendez-vous pour décider.",
  },
  {
    label: "Recommandation",
    text: "Préparer le rendez-vous (questions ouvertes, options du devis) plutôt qu'envoyer une relance. Jérôme décide.",
  },
];

export default function NotreOrganisationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="border-b border-[var(--color-line)]">
        <div className="container-page py-16">
          <p className="group-eyebrow">Notre organisation · Réalisation interne</p>
          <h1 className="mt-4 max-w-4xl">Notre organisation augmentée par l&apos;IA</h1>
          <p className="mt-6 max-w-3xl text-lg text-[var(--color-ink-muted)]">
            Voici comment j&apos;utilise l&apos;IA pour organiser et piloter mon entreprise, et ce que
            nous pouvons adapter à la vôtre. Des agents spécialisés travaillent autour de nos
            activités ; je fixe les priorités, je supervise leurs travaux et je garde la main sur
            les décisions engageantes.
          </p>
          <p className="mt-3 max-w-3xl text-sm text-[var(--color-ink-muted)]">
            — {SITE.founder.name}, fondateur d&apos;{SITE.name}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#organigramme">
                Voir l&apos;organigramme
                <ArrowRight className="size-4" aria-hidden />
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href="#realisations">Les deux réalisations</a>
            </Button>
          </div>
        </div>
      </section>

      <section id="organigramme" className="container-page py-20" aria-labelledby="organigramme-title">
        <div className="group-section-heading">
          <div>
            <p className="group-eyebrow">Organigramme</p>
            <h2 id="organigramme-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Un dirigeant, quatre pôles, des agents aux rôles précis
            </h2>
          </div>
          <p>
            Les pôles sont de simples regroupements : il n&apos;y a pas d&apos;agent chef entre
            Jérôme et les agents. Ouvrez une carte pour lire la mission, le déclenchement, un
            exemple de livrable et ce qui reste soumis à validation.
          </p>
        </div>
        <OrgChart />
        <OrgFoundation />
      </section>

      <section className="bg-[var(--color-surface-alt)] py-20" aria-labelledby="fonctionnement-title">
        <div className="container-page">
          <p className="group-eyebrow">Fonctionnement</p>
          <h2 id="fonctionnement-title" className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Ce que chaque agent a en commun
          </h2>
          <ul className="org-how">
            {HOW_AGENTS_WORK.map((item) => (
              <li key={item.title}>
                <item.icon className="size-5" aria-hidden />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
          <div className="org-columns">
            <div>
              <h3>Des services communs, hors hiérarchie</h3>
              <p>
                Certaines tâches tournent à heure fixe pour toute l&apos;entreprise ; les agents en
                lisent les résultats sans les piloter.
              </p>
              <ul className="org-chips">
                {ORG_SHARED_SERVICES.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Les limites, assumées</h3>
              <ul className="org-limits">
                {LIMITS.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-20" aria-labelledby="distinctions-title">
        <p className="group-eyebrow">Repères</p>
        <h2 id="distinctions-title" className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Marque, structure juridique, agent : trois choses différentes
        </h2>
        <div className="org-distinctions">
          <div>
            <h3>Les marques</h3>
            <p>Les noms sous lesquels nos offres sont présentées à nos clients.</p>
            <p className="org-distinction-list">{BRANDS.map((b) => b.name).join(" · ")}</p>
            <Link href="/marques">Voir les marques</Link>
          </div>
          <div>
            <h3>Les structures juridiques</h3>
            <p>Deux entreprises qui contractent et facturent.</p>
            <p className="org-distinction-list">
              {SITE.legal.ei} (formation) · {SITE.legal.sas} (conseil, développement, produits)
            </p>
            <Link href="/a-propos">Voir la structure juridique</Link>
          </div>
          <div>
            <h3>Les agents</h3>
            <p>
              Des orchestrateurs IA rangés par pôle d&apos;activité. Ce ne sont ni des salariés ni
              des entités juridiques, et un pôle ne correspond pas à une marque.
            </p>
            <a href="#organigramme">Voir l&apos;organigramme</a>
          </div>
        </div>
      </section>

      <section className="container-page pb-20" aria-labelledby="exemple-title">
        <p className="group-eyebrow">Un exemple</p>
        <h2 id="exemple-title" className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Recouper avant de recommander
        </h2>
        <p className="mt-4 max-w-3xl text-[var(--color-ink-muted)]">
          L&apos;ERP réunit clients, devis, factures et le suivi des automatisations. L&apos;agent de
          revue hebdomadaire le lit sans le modifier et croise ce qu&apos;il y trouve avec les autres
          sources avant de proposer une action.
        </p>
        <figure className="org-demo" data-demo>
          <ol>
            {DEMO_STEPS.map((step, index) => (
              <li key={step.label}>
                <span className="org-demo-step">{index + 1}</span>
                <div>
                  <p className="group-eyebrow">{step.label}</p>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <figcaption>
            Exemple illustratif, données de démonstration : l&apos;entreprise et les dates sont
            inventées. Ce scénario montre la logique de l&apos;agent, ce n&apos;est pas un extrait de
            journal réel.
          </figcaption>
        </figure>
      </section>

      <section id="realisations" className="bg-[var(--color-surface-alt)] py-20" aria-labelledby="realisations-title">
        <div className="container-page">
          <p className="group-eyebrow">Réalisations internes</p>
          <h2 id="realisations-title" className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Deux études de cas, en détail
          </h2>
          <ul className="org-studies">
            <li className="group-color-blue">
              <h3>L&apos;agence IA</h3>
              <p>
                Missions, délégations et supervision : comment l&apos;organisation est construite et
                ce qu&apos;elle change dans le pilotage d&apos;une entreprise.
              </p>
              <a href={ORG_STUDIES.agence} target="_blank" rel="noopener">
                L&apos;étude côté organisation, sur IAvarone Conseil
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
              <a href={ORG_STUDIES.agents} target="_blank" rel="noopener">
                Les agents au travail, sur Employé IA
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
            </li>
            <li className="group-color-yellow">
              <h3>L&apos;ERP interne</h3>
              <p>
                Clients, devis et factures produits nativement, activités et suivi des
                automatisations : quatre écrans reconstitués et commentés.
              </p>
              <a href={ORG_STUDIES.erp} target="_blank" rel="noopener">
                L&apos;étude de l&apos;ERP, sur IAvarone Conseil
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
            </li>
          </ul>
          <p className="mt-6 text-sm text-[var(--color-ink-muted)]">
            Les études publiques utilisent des données de démonstration ; l&apos;ERP lui-même reste
            un outil privé.
          </p>
        </div>
      </section>

      <section className="container-page py-20" data-org-cta aria-labelledby="cta-title">
        <div className="group-closing overflow-hidden rounded-3xl border border-[var(--color-line)] bg-white p-10 sm:p-14">
          <h2 id="cta-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Et dans votre entreprise&nbsp;?
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--color-ink-muted)]">
            On ne transpose pas une organisation entière d&apos;un coup. On part de votre activité
            pour choisir une première mission : un pôle à outiller, un agent à confier, ou un outil
            de suivi à construire.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <BookingLink location="organisation-cta" source={ORG_BOOKING_SOURCE}>
                <Calendar className="size-4" aria-hidden />
                Étudier mon organisation avec Jérôme
              </BookingLink>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/conseil-ia">Le conseil IA</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
