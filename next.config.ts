import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.iavarone-group.fr" }],
        destination: "https://iavarone-group.fr/:path*",
        permanent: true,
      },
      {
        // Article recentré sur OPCO uniquement (ancien slug contenait "cpf").
        source: "/ressources/financer-formation-ia-opco-cpf",
        destination: "/ressources/financer-formation-ia-opco",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
