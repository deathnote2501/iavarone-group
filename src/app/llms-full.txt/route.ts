import { SITE, BRANDS } from "@/lib/site";
import { SERVICES_LIST } from "@/lib/services";
import { ARTICLES, type Block } from "@/lib/articles";
import { CASE_STUDIES } from "@/lib/case-studies";

// Plain-text knowledge base of the whole site, served at /llms-full.txt so a
// chatbot can be grounded ONLY on this site's content. Generated from the same
// structured data modules the site renders from, so it never drifts.
export const dynamic = "force-static";

/** Serialize an article block to plain markdown (no HTML/JSX). */
function blockToText(block: Block): string {
  switch (block.type) {
    case "h2":
      return `#### ${block.text}`;
    case "p":
      return block.text;
    case "quote":
      return `> ${block.text}`;
    case "ul":
      return block.items.map((item) => `- ${item}`).join("\n");
  }
}

function buildContent(): string {
  const lines: string[] = [];

  // --- Header -------------------------------------------------------------
  lines.push("# Groupe IAvarone — toutes les activités IA générative");
  lines.push(`> Site officiel : ${SITE.url}`);
  lines.push(`> Prendre rendez-vous : ${SITE.contact.booking}`);
  lines.push("");
  lines.push(SITE.baseline);
  lines.push("");
  lines.push(SITE.description);
  lines.push("");

  // --- Brands -------------------------------------------------------------
  lines.push("## Le Groupe et ses marques");
  lines.push("");
  for (const brand of BRANDS) {
    lines.push(`### ${brand.name}`);
    lines.push(`${brand.tagline} : ${brand.description}`);
    lines.push(`Site : ${brand.url}`);
    lines.push(`Catégorie : ${brand.category}`);
    lines.push(`Cible : ${brand.targetAudience}`);
    lines.push(`Tarifs : ${brand.pricing}`);
    lines.push("");
    lines.push(brand.longDescription);
    lines.push("");
    lines.push("Points clés :");
    for (const point of brand.keyPoints) {
      lines.push(`- ${point}`);
    }
    lines.push("");
  }

  // --- Services -----------------------------------------------------------
  lines.push("## Services");
  lines.push("");
  for (const service of SERVICES_LIST) {
    lines.push(`### ${service.title}`);
    lines.push(service.short);
    lines.push("");
    lines.push(service.hubH1);
    lines.push(service.hubLede);
    lines.push("");
    for (const section of service.hubSections) {
      lines.push(`#### ${section.h2}`);
      lines.push(section.body);
      lines.push("");
    }
    lines.push("Piliers :");
    for (const pillar of service.pillars) {
      lines.push(`- ${pillar.title} : ${pillar.description}`);
    }
    lines.push("");
    lines.push("Cas d'usage :");
    for (const useCase of service.useCases) {
      lines.push(`- ${useCase.title} : ${useCase.description}`);
    }
    lines.push("");
    lines.push("Déroulé de la mission :");
    for (const step of service.process) {
      lines.push(`- ${step.step} : ${step.detail}`);
    }
    lines.push("");
    lines.push("Questions fréquentes :");
    for (const item of service.hubFaq) {
      lines.push(`- ${item.q}`);
      lines.push(`  ${item.a}`);
    }
    lines.push("");
  }

  // --- Case studies -------------------------------------------------------
  lines.push("## Références / Cas clients");
  lines.push("");
  for (const study of CASE_STUDIES) {
    lines.push(`### ${study.client} — ${study.sector}`);
    lines.push(`URL: ${SITE.url}/references`);
    lines.push(`Résultat clé : ${study.headline.value} — ${study.headline.label}`);
    lines.push("");
    lines.push(`Problème : ${study.challenge}`);
    lines.push(`Solution : ${study.solution}`);
    lines.push("");
    lines.push("Résultats mesurés :");
    for (const metric of study.metrics) {
      lines.push(`- ${metric.value} : ${metric.label}`);
    }
    if (study.qualityGains && study.qualityGains.length > 0) {
      lines.push("Gains de qualité :");
      for (const gain of study.qualityGains) {
        lines.push(`- ${gain}`);
      }
    }
    lines.push("");
  }

  // --- Articles -----------------------------------------------------------
  lines.push("## Ressources / Articles");
  lines.push("");
  for (const article of ARTICLES) {
    lines.push(`### ${article.title}`);
    lines.push(`URL: ${SITE.url}/ressources/${article.slug}`);
    lines.push(`Catégorie : ${article.category}`);
    lines.push("");
    lines.push(article.description);
    lines.push("");
    for (const block of article.blocks) {
      lines.push(blockToText(block));
      lines.push("");
    }
    if (article.faq && article.faq.length > 0) {
      lines.push("Questions fréquentes :");
      for (const item of article.faq) {
        lines.push(`- ${item.q}`);
        lines.push(`  ${item.a}`);
      }
      lines.push("");
    }
  }

  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trimEnd() + "\n";
}

export function GET() {
  const text = buildContent();
  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
