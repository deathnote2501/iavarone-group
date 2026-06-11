import React from "react";
import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const HERO_FPS = 30;
export const HERO_DURATION_FRAMES = 14 * HERO_FPS;

const BRAND = {
  blue: "#4285F4",
  yellow: "#FBBC05",
  green: "#34A853",
  red: "#EA4335",
  ink: "#0B0F19",
  muted: "#5B6478",
  line: "#E5E7EB",
  bg: "#FFFFFF",
};

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
const easeInOut = Easing.bezier(0.45, 0, 0.55, 1);

export const HeroVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: BRAND.bg, fontFamily, color: BRAND.ink }}>
      <BackgroundBlobs />

      <Sequence from={0} durationInFrames={2.4 * HERO_FPS} premountFor={HERO_FPS}>
        <SceneLogo />
      </Sequence>

      <Sequence
        from={2.4 * HERO_FPS}
        durationInFrames={3.4 * HERO_FPS}
        premountFor={HERO_FPS}
      >
        <SceneBaseline />
      </Sequence>

      <Sequence
        from={5.8 * HERO_FPS}
        durationInFrames={5.4 * HERO_FPS}
        premountFor={HERO_FPS}
      >
        <SceneBrands />
      </Sequence>

      <Sequence
        from={11.2 * HERO_FPS}
        durationInFrames={2.8 * HERO_FPS}
        premountFor={HERO_FPS}
      >
        <SceneOutro />
      </Sequence>

      <FooterBar />
    </AbsoluteFill>
  );
};

const BackgroundBlobs: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const drift = (phase: number, amp: number) =>
    Math.sin((t + phase) * 0.35) * amp;

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <Blob
        color={BRAND.blue}
        x={`${20 + drift(0, 3)}%`}
        y={`${22 + drift(1.1, 2)}%`}
        size={620}
        opacity={0.12}
      />
      <Blob
        color={BRAND.green}
        x={`${78 + drift(2.2, 2)}%`}
        y={`${28 + drift(3.3, 3)}%`}
        size={560}
        opacity={0.1}
      />
      <Blob
        color={BRAND.yellow}
        x={`${30 + drift(4.4, 2.5)}%`}
        y={`${82 + drift(5.5, 2)}%`}
        size={580}
        opacity={0.1}
      />
      <Blob
        color={BRAND.red}
        x={`${82 + drift(6.6, 2)}%`}
        y={`${78 + drift(7.7, 3)}%`}
        size={500}
        opacity={0.08}
      />
    </AbsoluteFill>
  );
};

const Blob: React.FC<{
  color: string;
  x: string;
  y: string;
  size: number;
  opacity: number;
}> = ({ color, x, y, size, opacity }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: size,
      height: size,
      transform: "translate(-50%, -50%)",
      background: color,
      borderRadius: "50%",
      filter: "blur(120px)",
      opacity,
    }}
  />
);

const FooterBar: React.FC = () => (
  <div
    style={{
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height: 6,
      display: "flex",
    }}
  >
    <div style={{ flex: 1, background: BRAND.blue }} />
    <div style={{ flex: 1, background: BRAND.green }} />
    <div style={{ flex: 1, background: BRAND.yellow }} />
    <div style={{ flex: 1, background: BRAND.red }} />
  </div>
);

const SceneLogo: React.FC = () => {
  const frame = useCurrentFrame();

  const iconScale = interpolate(frame, [0, 20], [0.6, 1], {
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const iconOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleProgress = interpolate(frame, [10, 32], [0, 1], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(titleProgress, [0, 1], [24, 0]);
  const titleOpacity = titleProgress;

  const subProgress = interpolate(frame, [22, 44], [0, 1], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitOpacity = interpolate(frame, [60, 72], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        opacity: exitOpacity,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          padding: "28px 40px",
          borderRadius: 28,
          background: "white",
          border: `1px solid ${BRAND.line}`,
          boxShadow: "0 30px 80px -20px rgba(15, 23, 42, 0.18)",
          transform: `scale(${iconScale})`,
          opacity: iconOpacity,
        }}
      >
        <BuildingIcon size={88} color={BRAND.ink} />
        <div
          style={{
            transform: `translateY(${titleY}px)`,
            opacity: titleOpacity,
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <div
            style={{
              fontSize: 84,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1,
            }}
          >
            IAvarone{" "}
            <span style={{ color: BRAND.blue }}>Group</span>
          </div>
          <div
            style={{
              fontSize: 24,
              color: BRAND.muted,
              fontWeight: 500,
              opacity: subProgress,
              transform: `translateY(${interpolate(subProgress, [0, 1], [10, 0])}px)`,
            }}
          >
            Groupe français d&apos;intelligence artificielle générative
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const BASELINE_WORDS: { label: string; color: string }[] = [
  { label: "entreprises", color: BRAND.blue },
  { label: "organisations", color: BRAND.green },
  { label: "indépendants", color: BRAND.yellow },
];

const SceneBaseline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterProgress = interpolate(frame, [0, 18], [0, 1], {
    easing: easeOut,
    extrapolateRight: "clamp",
  });
  const enterY = interpolate(enterProgress, [0, 1], [40, 0]);

  const exitOpacity = interpolate(
    frame,
    [3.1 * fps, 3.4 * fps],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const wordCycle = 0.9 * fps;
  const wordIndex = Math.min(
    Math.floor(Math.max(frame - 12, 0) / wordCycle),
    BASELINE_WORDS.length - 1,
  );
  const localFrame = Math.max(frame - 12, 0) - wordIndex * wordCycle;
  const wordIn = interpolate(localFrame, [0, 10], [0, 1], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const wordY = interpolate(wordIn, [0, 1], [30, 0]);

  const currentWord = BASELINE_WORDS[wordIndex];

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        opacity: enterProgress * exitOpacity,
        padding: 80,
      }}
    >
      <div
        style={{
          transform: `translateY(${enterY}px)`,
          textAlign: "center",
          maxWidth: 1500,
        }}
      >
        <div
          style={{
            fontSize: 38,
            color: BRAND.muted,
            fontWeight: 500,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 32,
          }}
        >
          Notre mission
        </div>
        <div
          style={{
            fontSize: 92,
            fontWeight: 700,
            letterSpacing: -2,
            lineHeight: 1.1,
          }}
        >
          L&apos;IA générative au service
          <br />
          des{" "}
          <span
            style={{
              display: "inline-block",
              color: currentWord.color,
              transform: `translateY(${wordY}px)`,
              opacity: wordIn,
              minWidth: 600,
              textAlign: "left",
            }}
          >
            {currentWord.label}.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

type BrandCard = {
  name: string;
  tagline: string;
  color: string;
  category: string;
};

const BRANDS: BrandCard[] = [
  {
    name: "Jérôme Iavarone",
    tagline: "Formation IA générative · Qualiopi",
    category: "Formation",
    color: BRAND.blue,
  },
  {
    name: "IAvarone Conseil",
    tagline: "Apps métier sur mesure · 4–8 semaines",
    category: "Conseil & dev",
    color: BRAND.green,
  },
  {
    name: "Employé IA",
    tagline: "Agents IA autonomes · 6× moins qu'un junior",
    category: "Agents IA",
    color: BRAND.yellow,
  },
  {
    name: "Kaliio",
    tagline: "SaaS Qualiopi · gratuit · 100+ OF",
    category: "SaaS B2B",
    color: BRAND.blue,
  },
  {
    name: "Conform-RGAA",
    tagline: "Conformité accessibilité · pack 3 ans 290€",
    category: "Conformité",
    color: BRAND.red,
  },
  {
    name: "MecaIndus",
    tagline: "E-commerce B2B industriel · 268 000+ références",
    category: "E-commerce",
    color: BRAND.green,
  },
];

const SceneBrands: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerIn = interpolate(frame, [0, 16], [0, 1], {
    easing: easeOut,
    extrapolateRight: "clamp",
  });
  const headerY = interpolate(headerIn, [0, 1], [-24, 0]);

  const exitOpacity = interpolate(
    frame,
    [5.0 * fps, 5.4 * fps],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const stagger = 6;
  const enterStart = 10;
  const enterDuration = 22;

  return (
    <AbsoluteFill
      style={{
        opacity: exitOpacity,
        padding: "70px 110px 110px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          opacity: headerIn,
          transform: `translateY(${headerY}px)`,
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: 40,
        }}
      >
        <div
          style={{
            fontSize: 44,
            fontWeight: 700,
            letterSpacing: -1,
          }}
        >
          Six marques. Un seul interlocuteur.
        </div>
        <div
          style={{
            fontSize: 24,
            color: BRAND.muted,
            fontWeight: 500,
          }}
        >
          iavarone-group.fr
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: 28,
          flex: 1,
        }}
      >
        {BRANDS.map((brand, i) => {
          const start = enterStart + i * stagger;
          const progress = interpolate(
            frame,
            [start, start + enterDuration],
            [0, 1],
            {
              easing: easeOut,
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          );
          const y = interpolate(progress, [0, 1], [40, 0]);
          return (
            <BrandTile
              key={brand.name}
              brand={brand}
              opacity={progress}
              translateY={y}
              index={i}
              currentFrame={frame}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const BrandTile: React.FC<{
  brand: BrandCard;
  opacity: number;
  translateY: number;
  index: number;
  currentFrame: number;
}> = ({ brand, opacity, translateY, index, currentFrame }) => {
  const barProgress = interpolate(
    currentFrame,
    [16 + index * 6, 16 + index * 6 + 24],
    [0, 1],
    {
      easing: easeInOut,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        background: "white",
        border: `1px solid ${BRAND.line}`,
        borderRadius: 20,
        padding: "32px 36px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0 12px 32px -12px rgba(15, 23, 42, 0.08)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: 6,
          width: `${barProgress * 100}%`,
          background: brand.color,
        }}
      />
      <div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: brand.color,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          {brand.category}
        </div>
        <div
          style={{
            fontSize: 38,
            fontWeight: 700,
            letterSpacing: -0.5,
            lineHeight: 1.1,
            marginBottom: 12,
          }}
        >
          {brand.name}
        </div>
        <div
          style={{
            fontSize: 22,
            color: BRAND.muted,
            fontWeight: 500,
            lineHeight: 1.4,
          }}
        >
          {brand.tagline}
        </div>
      </div>
    </div>
  );
};

const SceneOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = interpolate(frame, [0, 22], [0, 1], {
    easing: easeOut,
    extrapolateRight: "clamp",
  });
  const enterScale = interpolate(enter, [0, 1], [0.92, 1]);

  const exitOpacity = interpolate(
    frame,
    [2.4 * fps, 2.8 * fps],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const ctaIn = interpolate(frame, [16, 36], [0, 1], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaY = interpolate(ctaIn, [0, 1], [20, 0]);

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        opacity: enter * exitOpacity,
        padding: 80,
      }}
    >
      <div
        style={{
          transform: `scale(${enterScale})`,
          textAlign: "center",
          maxWidth: 1500,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 18,
            marginBottom: 32,
          }}
        >
          <BuildingIcon size={56} color={BRAND.ink} />
          <span
            style={{
              fontSize: 56,
              fontWeight: 800,
              letterSpacing: -1,
            }}
          >
            IAvarone <span style={{ color: BRAND.blue }}>Group</span>
          </span>
        </div>
        <div
          style={{
            fontSize: 82,
            fontWeight: 700,
            letterSpacing: -2,
            lineHeight: 1.1,
            marginBottom: 36,
          }}
        >
          Parlons de votre{" "}
          <span style={{ color: BRAND.blue }}>projet IA</span>.
        </div>
        <div
          style={{
            opacity: ctaIn,
            transform: `translateY(${ctaY}px)`,
            display: "inline-flex",
            alignItems: "center",
            gap: 20,
            padding: "22px 38px",
            background: BRAND.ink,
            color: "white",
            borderRadius: 999,
            fontSize: 32,
            fontWeight: 600,
          }}
        >
          iavarone-group.fr
          <span style={{ fontSize: 28 }}>→</span>
        </div>
        <div
          style={{
            marginTop: 30,
            fontSize: 22,
            color: BRAND.muted,
            fontWeight: 500,
            opacity: ctaIn,
          }}
        >
          Auvergne-Rhône-Alpes · Paris · Distanciel France entière
        </div>
      </div>
    </AbsoluteFill>
  );
};

const BuildingIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
    <path d="M6 12H4a2 2 0 0 0-2 2v8h4" />
    <path d="M18 9h2a2 2 0 0 1 2 2v11h-4" />
    <path d="M10 6h4" />
    <path d="M10 10h4" />
    <path d="M10 14h4" />
    <path d="M10 18h4" />
  </svg>
);
