"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { CITIES } from "@/lib/site";

const BRAND = {
  blue: "#4285F4",
  yellow: "#FBBC05",
};

export function InterventionsMap() {
  useEffect(() => {
    document.documentElement.style.setProperty("--leaflet-attribution-bg", "transparent");
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--color-line)]">
      <MapContainer
        center={[45.8, 4.2]}
        zoom={6}
        scrollWheelZoom={false}
        style={{ height: 460, width: "100%" }}
        attributionControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {CITIES.map((c) => (
          <CircleMarker
            key={c.slug}
            center={[c.lat, c.lng]}
            radius={c.hub ? 10 : 6}
            pathOptions={{
              color: c.hub ? BRAND.blue : BRAND.yellow,
              fillColor: c.hub ? BRAND.blue : BRAND.yellow,
              fillOpacity: 0.7,
              weight: 2,
            }}
          >
            <Tooltip direction="top" offset={[0, -6]} opacity={1} permanent={false}>
              <strong>{c.name}</strong>
              <br />
              <span style={{ color: "#475569", fontSize: 12 }}>{c.region}</span>
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
