"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

export function ImmersivePanorama() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let visible = false;
    const updatePlayback = () => {
      if (visible && !document.hidden && !userPaused.current) {
        void video.play().catch(() => setPlaying(false));
      } else {
        video.pause();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updatePlayback();
    });
    observer.observe(video);
    document.addEventListener("visibilitychange", updatePlayback);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updatePlayback);
      video.pause();
    };
  }, []);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused) {
      userPaused.current = true;
      video.pause();
    } else {
      userPaused.current = false;
      void video.play().catch(() => setPlaying(false));
    }
  }

  return (
    <figure className="group-panorama">
      <div className="group-immersive-window">
        <Image
          src="/brand-v2/group-auvergne-immersive.webp"
          alt="Une fenêtre architecturale imaginaire ouverte sur les reliefs volcaniques d’Auvergne"
          width={1600}
          height={638}
          sizes="(min-width: 1440px) 1280px, 100vw"
          loading="eager"
          fetchPriority="high"
          className="group-immersive-poster"
        />
        <video
          ref={videoRef}
          className="group-immersive-video"
          src="/brand-v2/group-auvergne-immersive.mp4"
          poster="/brand-v2/group-auvergne-immersive.webp"
          muted
          playsInline
          loop
          preload="none"
          aria-hidden="true"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        <button
          type="button"
          className="group-immersive-control"
          onClick={togglePlayback}
          aria-label={playing ? "Mettre en pause l’animation" : "Reprendre l’animation"}
        >
          {playing ? <Pause size={14} aria-hidden /> : <Play size={14} aria-hidden />}
          {playing ? "Pause" : "Animer"}
        </button>
      </div>
      <figcaption>
        <span>Ancré en Auvergne. Ouvert sur vos projets.</span>
        <span>Illustration générée par IA</span>
      </figcaption>
    </figure>
  );
}
