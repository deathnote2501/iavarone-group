import Link from "next/link";
import {
  ArrowUpRight,
  GraduationCap,
  Briefcase,
  Bot,
  ClipboardCheck,
  ShieldCheck,
  Accessibility,
  ShoppingCart,
  ContactRound,
} from "lucide-react";
import { BRANDS, type Brand } from "@/lib/site";
import { brandColor } from "@/components/ui/brand-color";

const ICONS: Record<Brand["slug"], typeof GraduationCap> = {
  jeromeiavarone: GraduationCap,
  "iavarone-conseil": Briefcase,
  "employe-ia": Bot,
  kaliio: ClipboardCheck,
  kaliopi: ShieldCheck,
  "rgaa-ia": Accessibility,
  mecaindus: ShoppingCart,
  "crm-ia": ContactRound,
};
const SERVICE_SLUGS = [
  "jeromeiavarone",
  "iavarone-conseil",
  "employe-ia",
  "crm-ia",
];
const DIRECTIONS: Record<string, string> = {
  jeromeiavarone: "Apprendre & adopter",
  "iavarone-conseil": "Construire & connecter",
  "employe-ia": "Déléguer & superviser",
  "crm-ia": "Organiser & vendre",
};

export function BrandDirectory() {
  const services = SERVICE_SLUGS.map(
    (slug) => BRANDS.find((brand) => brand.slug === slug)!,
  );
  const products = BRANDS.filter(
    (brand) => !SERVICE_SLUGS.includes(brand.slug),
  );
  return (
    <>
      <ul className="group-directory" aria-label="Les expertises de service">
        {services.map((brand, index) => {
          const Icon = ICONS[brand.slug];
          return (
            <li key={brand.slug}>
              <Link
                href={`/marques/${brand.slug}`}
                className={`group-directory-row group-color-${brandColor(brand)}`}
              >
                <span className="group-directory-number">0{index + 1}</span>
                <div className="group-directory-name">
                  <span className="group-direction">
                    {DIRECTIONS[brand.slug]}
                  </span>
                  <h3>{brand.name}</h3>
                  <span className="group-brand-tagline">{brand.tagline}</span>
                </div>
                <div className="group-directory-copy">
                  <p>{brand.description}</p>
                  <span>
                    {brand.structure} ·{" "}
                    {new URL(brand.url).hostname.replace("www.", "")}
                  </span>
                </div>
                <span className="group-directory-icon">
                  <Icon aria-hidden />
                </span>
                <ArrowUpRight className="group-directory-arrow" aria-hidden />
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="group-products-heading">
        <p className="group-eyebrow">Les produits de l’écosystème</p>
        <h2>
          Des solutions pour
          <br />
          des besoins concrets.
        </h2>
      </div>
      <ul className="group-products" aria-label="Les produits du groupe">
        {products.map((brand) => {
          const Icon = ICONS[brand.slug];
          return (
            <li key={brand.slug}>
              <Link
                href={`/marques/${brand.slug}`}
                className={`group-product group-color-${brandColor(brand)}`}
              >
                <div className="group-product-top">
                  <span className="group-directory-icon">
                    <Icon aria-hidden />
                  </span>
                  <ArrowUpRight className="size-5" aria-hidden />
                </div>
                <h3>{brand.name}</h3>
                <p className="group-brand-tagline">{brand.tagline}</p>
                <p>{brand.description}</p>
                <span className="group-product-meta">
                  {brand.structure} ·{" "}
                  {new URL(brand.url).hostname.replace("www.", "")}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export function ActivitiesGrid() {
  return (
    <section className="container-page py-20" id="activites">
      <div className="group-section-heading">
        <div>
          <p className="group-eyebrow">Les expertises</p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Sept activités complémentaires
          </h2>
        </div>
        <p>
          De la formation initiale au déploiement d&apos;agents IA en
          production, IAvarone Group couvre l&apos;ensemble de la chaîne de
          valeur de l&apos;IA générative pour PME, ETI et organisations.
        </p>
      </div>
      <BrandDirectory />
    </section>
  );
}
