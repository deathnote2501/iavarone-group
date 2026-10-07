import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, MessagesSquare, LayoutDashboard, Wrench, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/site";
import {
  ORG_AGENT_COUNT,
  ORG_AS_OF,
  ORG_FOUNDATION,
  ORG_PATH,
  ORG_POLES,
  ORG_PROOFS,
  type OrgAgent,
} from "@/lib/organisation";

const FOUNDATION_ICONS: Record<(typeof ORG_FOUNDATION)[number]["name"], LucideIcon> = {
  Slack: MessagesSquare,
  ERP: LayoutDashboard,
  "Outils métier": Wrench,
};

function Founder() {
  return (
    <div className="org-founder">
      <Image
        src={SITE.founder.photo}
        alt={`Portrait de ${SITE.founder.name}`}
        width={88}
        height={88}
        sizes="88px"
      />
      <div>
        <p className="group-eyebrow">Direction</p>
        <p className="org-founder-name">{SITE.founder.name}</p>
        <p className="org-founder-role">
          Fixe les priorités, tient la relation client et prend les décisions engageantes.
        </p>
      </div>
    </div>
  );
}

function AgentCard({ agent }: { agent: OrgAgent }) {
  return (
    <details className="org-agent" data-agent>
      <summary>
        <span className="org-agent-title">
          <span className="org-agent-name">{agent.name}</span>
          <span className="org-agent-role">{agent.role}</span>
        </span>
        <ChevronDown className="org-agent-chevron" aria-hidden />
      </summary>
      <dl data-agent-detail>
        <div>
          <dt>Mission</dt>
          <dd>{agent.mission}</dd>
        </div>
        {agent.trigger && (
          <div>
            <dt>Déclenchement</dt>
            <dd>{agent.trigger}</dd>
          </div>
        )}
        <div>
          <dt>Exemple de livrable</dt>
          <dd>{agent.deliverable}</dd>
        </div>
        <div>
          <dt>Autonomie et validation</dt>
          <dd>{agent.autonomy}</dd>
        </div>
      </dl>
    </details>
  );
}

/** Detailed org chart: native disclosure cards, readable and usable without JavaScript. */
export function OrgChart() {
  return (
    <div className="org-chart" data-org-chart>
      <div className="org-top">
        <Founder />
      </div>
      <ol className="org-poles" aria-label="Les quatre pôles">
        {ORG_POLES.map((pole) => (
          <li
            key={pole.id}
            id={`pole-${pole.id}`}
            className={`org-pole group-color-${pole.color}`}
            aria-labelledby={`pole-${pole.id}-title`}
          >
            <div className="org-pole-head">
              <h3 id={`pole-${pole.id}-title`}>{pole.name}</h3>
              <span className="org-pole-count">{pole.agents.length} agents</span>
            </div>
            <p className="org-pole-summary">{pole.summary}</p>
            <ul className="org-agents">
              {pole.agents.map((agent) => (
                <li key={agent.name}>
                  <AgentCard agent={agent} />
                </li>
              ))}
            </ul>
            {pole.note && <p className="org-pole-note">{pole.note}</p>}
          </li>
        ))}
      </ol>
      <p className="org-asof">
        Organisation documentée au {ORG_AS_OF}&nbsp;: {ORG_AGENT_COUNT} orchestrateurs
        organisés en quatre pôles. Elle évolue avec les activités.
      </p>
    </div>
  );
}

export function OrgFoundation() {
  return (
    <div className="org-foundation">
      <p className="group-eyebrow">Le socle commun</p>
      <ul>
        {ORG_FOUNDATION.map((item) => {
          const Icon = FOUNDATION_ICONS[item.name];
          return (
            <li key={item.name}>
              <Icon className="size-5" aria-hidden />
              <div>
                <p>
                  <strong>{item.name}</strong> · {item.verb}
                </p>
                <p>{item.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Home section, between the service expertises and the products. */
export function OrganisationPreview() {
  return (
    <section id="organisation" className="org-preview" aria-labelledby="organisation-title">
      <div className="container-page">
        <div className="group-section-heading">
          <div>
            <p className="group-eyebrow">Notre organisation</p>
            <h2 id="organisation-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Comment fonctionne notre organisation augmentée par l&apos;IA
            </h2>
          </div>
          <p>
            Jérôme fixe les priorités et garde la main sur les décisions engageantes. Des agents
            spécialisés, regroupés en quatre pôles, préparent, exécutent et rendent compte. Voici
            comment nous travaillons, et ce que nous pouvons adapter à votre entreprise.
          </p>
        </div>
        <OrgChart />
        <OrgFoundation />
        <div className="org-preview-actions">
          <Button asChild size="lg">
            <Link href={ORG_PATH}>
              Découvrir notre organisation
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/** Contextual link to the organisation page, for related pages (about, brand, service). */
export function OrgProofLink({ text, study }: (typeof ORG_PROOFS)[string]) {
  return (
    <section className="container-page pb-16">
      <div className="org-proof group-color-yellow">
        <div>
          <p className="group-eyebrow">Réalisation interne</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            Notre organisation augmentée par l&apos;IA
          </h2>
          <p className="mt-3 text-[var(--color-ink-muted)]">{text}</p>
        </div>
        <div className="org-proof-links">
          <Link href={ORG_PATH}>
            Découvrir notre organisation
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          {study && (
            <a href={study.href} target="_blank" rel="noopener">
              {study.label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
