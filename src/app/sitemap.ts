import type { MetadataRoute } from "next";
import { SITE, CITIES, BRANDS } from "@/lib/site";
import { SERVICES } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/marques", "/a-propos", "/contact", "/mentions-legales", "/confidentialite"];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "monthly" : "monthly",
    priority: path === "" ? 1 : path === "/marques" ? 0.8 : 0.7,
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

  const brandPages: MetadataRoute.Sitemap = BRANDS.map((b) => ({
    url: `${SITE.url}/marques/${b.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...serviceHubs, ...serviceCities, ...brandPages];
}
