import Image from "next/image";
import Link from "next/link";
import { Calendar, Phone, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BookingLink } from "@/components/ui/BookingLink";
import { SITE } from "@/lib/site";

export function Hero() {
  return (
    <section className="group-home-hero border-b border-[var(--color-line)]">
      <div className="container-page">
        <div className="group-hero-intro">
          <div>
            <p className="group-eyebrow">
              Auvergne-Rhône-Alpes · Paris · Distanciel France entière
            </p>
            <h1 className="group-home-title">
              L&apos;IA générative au service des <span>entreprises</span>,{" "}
              <span>organisations</span> et <span>indépendants</span>.
            </h1>
          </div>
          <div className="group-hero-copy">
            <p>
              <strong>{SITE.name}</strong>{" "}est un groupe français
              d&apos;intelligence artificielle générative fondé en 2020 par
              Jérôme Iavarone, formateur Qualiopi et consultant indépendant. Le
              groupe rassemble sept marques B2B complémentaires&nbsp;:
              formation, conseil, développement d&apos;applications métier,
              agents IA autonomes, SaaS et e-commerce industriel.
            </p>
            <div className="group-hero-actions">
              <Button asChild size="lg">
                <Link href="/marques#choisir">
                  Trouver le bon point de départ
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            </div>
            <div className="group-hero-contact">
              <BookingLink location="hero">
                <Calendar className="size-4" aria-hidden />
                Prendre RDV avec Jérôme
              </BookingLink>
              <a href={SITE.contact.phoneHref}>
                <Phone className="size-4" aria-hidden />
                {SITE.contact.phone}
              </a>
            </div>
          </div>
        </div>
        <figure className="group-panorama">
          <Image
            src="/brand-v2/group-auvergne.png"
            alt="Architecture contemporaine imaginaire ouverte sur des reliefs volcaniques"
            width={1536}
            height={1024}
            sizes="(min-width: 1440px) 1280px, 100vw"
            loading="eager"
            fetchPriority="high"
          />
          <figcaption>
            <span>Ancré en Auvergne. Ouvert sur vos projets.</span>
            <span>Illustration architecturale générée par IA</span>
          </figcaption>
        </figure>
        <details className="group-video">
          <summary>
            <Play className="size-4" aria-hidden />
            Voir la présentation animée du groupe
          </summary>
          <video
            className="aspect-video w-full rounded-xl"
            src="/hero-video.mp4"
            poster="/hero-poster.jpg"
            controls
            playsInline
            preload="none"
            aria-label="Présentation animée du Groupe IAvarone et de ses sept marques"
          />
        </details>
      </div>
    </section>
  );
}
