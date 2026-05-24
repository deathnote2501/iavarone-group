import { ImageResponse } from "next/og";
import { CITIES } from "@/lib/site";
import { SERVICES, type ServiceSlug } from "@/lib/services";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: { service: string; city: string };
}

const COLORS: Record<ServiceSlug, { accent: string; soft: string; label: string }> = {
  "formation-ia": { accent: "#4285F4", soft: "rgba(66,133,244,0.12)", label: "Formation IA" },
  "conseil-ia": { accent: "#34A853", soft: "rgba(52,168,83,0.12)", label: "Conseil IA" },
  "agent-ia": { accent: "#B8860B", soft: "rgba(251,188,5,0.14)", label: "Agent IA" },
};

export async function generateImageMetadata({ params }: Props) {
  const service = SERVICES[params.service as ServiceSlug];
  const city = CITIES.find((c) => c.slug === params.city);
  if (!service || !city) return [{ id: "default", alt: "IAvarone Group", size, contentType }];
  return [{ id: "default", alt: service.longTitle(city.name), size, contentType }];
}

export default async function OpengraphImage({ params }: Props) {
  const service = SERVICES[params.service as ServiceSlug];
  const city = CITIES.find((c) => c.slug === params.city);
  if (!service || !city) {
    return new ImageResponse((<div>IAvarone Group</div>), size);
  }
  const c = COLORS[service.slug];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "white",
          fontFamily: "Inter, sans-serif",
          backgroundImage: `radial-gradient(circle at 85% 12%, ${c.soft} 0, transparent 50%)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 10,
              background: c.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            IG
          </div>
          <div style={{ fontSize: 24, fontWeight: 600, color: "#0F172A" }}>IAvarone Group</div>
          <div
            style={{
              marginLeft: 12,
              padding: "6px 14px",
              borderRadius: 999,
              background: c.soft,
              color: c.accent,
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
            }}
          >
            {c.label}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 20, color: c.accent, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
            {city.name} · {city.region}
          </div>
          <div
            style={{
              fontSize: 62,
              fontWeight: 600,
              color: "#0F172A",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              maxWidth: 1000,
            }}
          >
            {service.longTitle(city.name)}
          </div>
          <div style={{ fontSize: 22, color: "#475569", maxWidth: 900, lineHeight: 1.35 }}>
            {service.short}.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            color: "#475569",
          }}
        >
          <div>Premier RDV gratuit · 30 min · Visio ou présentiel</div>
          <div style={{ color: c.accent, fontWeight: 600 }}>iavarone-group.fr</div>
        </div>
      </div>
    ),
    size,
  );
}
