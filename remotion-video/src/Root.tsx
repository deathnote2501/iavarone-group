import "./index.css";
import { Composition } from "remotion";
import { HeroVideo, HERO_FPS, HERO_DURATION_FRAMES } from "./HeroVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HeroVideo"
        component={HeroVideo}
        durationInFrames={HERO_DURATION_FRAMES}
        fps={HERO_FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
