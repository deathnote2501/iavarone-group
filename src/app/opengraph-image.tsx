import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const runtime = "edge";
export const alt = `${SITE.name} — Conseil, formation et produits IA générative`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
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
          backgroundImage:
            "radial-gradient(circle at 18% 22%, rgba(66,133,244,0.18) 0, transparent 38%), radial-gradient(circle at 82% 28%, rgba(52,168,83,0.16) 0, transparent 38%), radial-gradient(circle at 50% 92%, rgba(251,188,5,0.18) 0, transparent 38%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "#4285F4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            IG
          </div>
          <div style={{ fontSize: 28, fontWeight: 600, color: "#0F172A" }}>{SITE.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 600,
              color: "#0F172A",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: 1000,
            }}
          >
            L'IA générative au service des{" "}
            <span style={{ color: "#4285F4" }}>entreprises</span>,{" "}
            <span style={{ color: "#34A853" }}>organisations</span> et{" "}
            <span style={{ color: "#B8860B" }}>indépendants</span>.
          </div>
          <div style={{ fontSize: 24, color: "#475569", maxWidth: 900, lineHeight: 1.35 }}>
            Sept activités complémentaires : formation Qualiopi, conseil, agents IA autonomes,
            applications métier, SaaS B2B et e-commerce industriel.
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
          <div style={{ display: "flex", gap: 24 }}>
            <span>Auvergne-Rhône-Alpes</span>
            <span style={{ color: "#CBD5E1" }}>·</span>
            <span>Paris</span>
            <span style={{ color: "#CBD5E1" }}>·</span>
            <span>Distanciel France</span>
          </div>
          <div style={{ color: "#4285F4", fontWeight: 600 }}>iavarone-group.fr</div>
        </div>
      </div>
    ),
    size,
  );
}
