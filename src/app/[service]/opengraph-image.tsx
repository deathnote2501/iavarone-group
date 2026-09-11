import { ImageResponse } from "next/og";
import { SERVICES, type ServiceSlug } from "@/lib/services";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: { service: string };
}

const COLORS: Record<ServiceSlug, { accent: string; soft: string }> = {
  "formation-ia": { accent: "#4285F4", soft: "rgba(66,133,244,0.12)" },
  "conseil-ia": { accent: "#34A853", soft: "rgba(52,168,83,0.12)" },
  "agent-ia": { accent: "#8A6100", soft: "rgba(251,188,5,0.14)" },
};

export async function generateImageMetadata({ params }: Props) {
  const service = SERVICES[params.service as ServiceSlug];
  if (!service) return [{ id: "default", alt: "IAvarone Group", size, contentType }];
  return [{ id: "default", alt: `${service.title} en Auvergne-Rhône-Alpes & Paris`, size, contentType }];
}

export default async function OpengraphImage({ params: pendingParams }: { params: Promise<Props["params"]> }) {
  const params = await pendingParams;
  const service = SERVICES[params.service as ServiceSlug];
  if (!service) {
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
          borderTop: "12px solid #FBBC05",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 10,
              background: "#FBBC05",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#111111",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            IG
          </div>
          <div style={{ fontSize: 24, fontWeight: 600, color: "#111111" }}>IAvarone Group</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 600,
              color: "#111111",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              maxWidth: 1000,
            }}
          >
            {`${service.title} en Auvergne-Rhône-Alpes & Paris`}
          </div>
          <div style={{ fontSize: 24, color: "#545454", maxWidth: 900, lineHeight: 1.35 }}>
            {`${service.short}.`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            color: "#545454",
          }}
        >
          <div>17 villes · Présentiel + distanciel</div>
          <div style={{ color: c.accent, fontWeight: 600 }}>iavarone-group.fr</div>
        </div>
      </div>
    ),
    size,
  );
}
