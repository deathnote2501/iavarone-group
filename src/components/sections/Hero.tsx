import Link from "next/link";
import { Calendar, Phone, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BookingLink } from "@/components/ui/BookingLink";
import { SITE, HOME_VIDEO_HERO } from "@/lib/site";
import { ImmersivePanorama } from "./ImmersivePanorama";
export function Hero() { return (<>
<section className="video-home-hero" aria-labelledby="video-home-title"><ImmersivePanorama><div className="video-hero-overlay"><div className="video-hero-inner"><div className="video-hero-copy">
 <h1 id="video-home-title">{HOME_VIDEO_HERO.title[0]}{" "}<br />{HOME_VIDEO_HERO.title[1]}</h1>
 <p className="video-hero-summary">{HOME_VIDEO_HERO.summary}</p>
 <BookingLink location="hero" className="video-hero-cta" data-cta="hero">{HOME_VIDEO_HERO.cta}</BookingLink>
 <p className="video-hero-proof">{HOME_VIDEO_HERO.proof}</p>
 </div></div></div></ImmersivePanorama></section>
<section className="container-page group-hero-context"><div className="group-hero-copy">
            <p>
              <strong>{SITE.name}</strong>{" "}est un groupe français
              d&apos;intelligence artificielle générative fondé en 2020 par
              Jérôme Iavarone, formateur et consultant IA. Le
              groupe rassemble des marques B2B complémentaires&nbsp;:
              formation, conseil, développement d&apos;applications métier,
              agents IA autonomes, SaaS et e-commerce industriel.
            </p>
<div className="group-hero-actions"><Button asChild size="lg"><Link href="/marques#choisir">Trouver le bon point de départ <ArrowRight className="size-4" aria-hidden /></Link></Button></div>
<div className="group-hero-contact"><BookingLink location="introduction"><Calendar className="size-4" aria-hidden />Prendre RDV avec Jérôme</BookingLink><a href={SITE.contact.phoneHref}><Phone className="size-4" aria-hidden />{SITE.contact.phone}</a></div>
</div>        <details className="group-video" open>
          <summary>
            <Play className="size-4" aria-hidden />
            Voir la présentation animée du groupe
          </summary>
          <video
            className="aspect-video w-full rounded-xl"
            src="/hero-video.mp4"
            poster="/hero-poster.jpg"
            controls
            autoPlay
            muted
            loop
            playsInline
            aria-label="Présentation animée du Groupe IAvarone et de ses marques"
          />
        </details></section>
</>); }
