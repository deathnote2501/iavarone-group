import type { Brand } from "@/lib/site";

/** Visual mapping only: editorial and structured data remain in lib/site. */
export function brandColor(brand: Brand): Brand["color"] {
  const serviceColors: Partial<Record<Brand["slug"], Brand["color"]>> = {
    jeromeiavarone: "blue",
    "iavarone-conseil": "blue",
    "employe-ia": "green",
    "crm-ia": "red",
  };
  return serviceColors[brand.slug] ?? brand.color;
}
