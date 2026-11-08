"use client";

import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

// The existing movie is 10 seconds forward, followed by the same movement in reverse.
const FORWARD_SECONDS = 10;
const FADE_SECONDS = 1;

export function ImmersivePanorama({ children }: { children?: ReactNode }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const mediaFailed = useRef(false);
  const syncPlayback = useRef<() => void>(() => {});
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let visible = false;
    let disposed = false;
    let animationFrame = 0;
    let resetting = false;
    const stopFade = () => cancelAnimationFrame(animationFrame);
    const paintFade = () => {
      if (video.paused || video.error || document.hidden || !visible || disposed) return;
      if (!video.seeking) {
        if (video.currentTime >= FORWARD_SECONDS) {
          video.style.opacity = "0";
          resetting = true;
          video.currentTime = 0;
        } else if (!resetting) {
          const opacity = Math.min(1, video.currentTime / FADE_SECONDS, (FORWARD_SECONDS - video.currentTime) / FADE_SECONDS);
          video.style.opacity = String(Math.max(0, opacity));
        }
      }
      animationFrame = requestAnimationFrame(paintFade);
    };
    const startFade = () => { stopFade(); paintFade(); };
    const finishSeek = () => { resetting = false; };
    const update = () => {
      if (visible && !document.hidden && !userPaused.current && !mediaFailed.current && !disposed) {
        void video.play().then(() => {
          if (disposed || !visible || document.hidden || userPaused.current || mediaFailed.current) video.pause();
        }).catch(() => setPlaying(false));
      } else video.pause();
    };
    syncPlayback.current = update;
    video.addEventListener("play", startFade);
    video.addEventListener("pause", stopFade);
    video.addEventListener("seeked", finishSeek);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      setReady(true);
      update();
    });
    observer.observe(video);
    document.addEventListener("visibilitychange", update);
    return () => {
      disposed = true;
      observer.disconnect();
      stopFade();
      video.removeEventListener("play", startFade);
      video.removeEventListener("pause", stopFade);
      video.removeEventListener("seeked", finishSeek);
      document.removeEventListener("visibilitychange", update);
      syncPlayback.current = () => {};
      video.pause();
    };
  }, []);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    userPaused.current = !video.paused;
    syncPlayback.current();
  }

  return (
    <figure className="video-hero-banner group-panorama" data-testid="immersive-banner">
      <div className="video-hero-window group-immersive-window">
        <Image className="video-hero-poster group-immersive-poster" src="/brand-v2/group-auvergne-immersive.webp"
          alt="Illustration imaginaire générée par IA, décor de la vidéo d’accueil"
          width={1600} height={638} unoptimized loading="eager" />
        <video ref={videoRef} className="video-hero-media group-immersive-video" data-testid="immersive-video"
          src="/brand-v2/group-auvergne-immersive.mp4" poster="/brand-v2/group-auvergne-immersive.webp" muted playsInline loop preload="none" aria-hidden="true"
          style={failed ? { visibility: "hidden", opacity: 0 } : undefined}
          onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
          onError={() => { mediaFailed.current = true; videoRef.current?.pause(); setFailed(true); setPlaying(false); }} />
        {children}
        <button type="button" className="video-hero-control group-immersive-control" hidden={!ready || failed}
          onClick={togglePlayback}
          aria-label={playing ? "Mettre en pause l’animation" : "Reprendre l’animation"}>
          {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
          {playing ? "Pause" : "Animer"}
        </button>
      </div>
      <figcaption>Illustration générée par IA</figcaption>
    </figure>
  );
}
