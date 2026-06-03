import type { MetadataRoute } from "next";
import { SITE, CITIES, BRANDS } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { ARTICLES } from "@/lib/articles";
import { shouldIndexCity, sitemapPriorityCity } from "@/lib/seo-volumes";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/references", "/ressources", "/marques", "/a-propos", "/contact", "/mentions-legales", "/confidentialite"];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path === "/marques" || path === "/references" ? 0.8 : 0.7,
  }));

  const serviceHubs: MetadataRoute.Sitemap = Object.keys(SERVICES).map((slug) => ({
    url: `${SITE.url}/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Grille programmatique pilotée par DataForSEO : on n'inclut que les combos
  // indexables (volume de recherche mesuré) et on dérive la priorité du volume.
  // Les pages noindex restent accessibles (maillage interne) mais hors sitemap.
  const serviceCities: MetadataRoute.Sitemap = Object.keys(SERVICES).flatMap((slug) =>
    CITIES.filter((c) => shouldIndexCity(slug, c.slug)).map((c) => ({
      url: `${SITE.url}/${slug}/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: sitemapPriorityCity(slug, c.slug),
    })),
  );

  const brandPages: MetadataRoute.Sitemap = BRANDS.map((b) => ({
    url: `${SITE.url}/marques/${b.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const articlePages: MetadataRoute.Sitemap = ARTICLES.map((a) => ({
    url: `${SITE.url}/ressources/${a.slug}`,
    lastModified: new Date(a.dateModified),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...serviceHubs, ...serviceCities, ...brandPages, ...articlePages];
}
