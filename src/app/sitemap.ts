import type { MetadataRoute } from "next";
import { SITE, CITIES } from "@/lib/site";
import { SERVICES } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/activites", "/a-propos", "/contact", "/mentions-legales", "/confidentialite"];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const serviceHubs: MetadataRoute.Sitemap = Object.keys(SERVICES).map((slug) => ({
    url: `${SITE.url}/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const serviceCities: MetadataRoute.Sitemap = Object.keys(SERVICES).flatMap((slug) =>
    CITIES.map((c) => ({
      url: `${SITE.url}/${slug}/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: c.hub ? 0.9 : 0.6,
    })),
  );

  return [...staticEntries, ...serviceHubs, ...serviceCities];
}
