import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SITE, BRANDS } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans-loaded", display: "swap" });

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — IA générative pour les entreprises`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — IA générative pour les entreprises`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
  },
  alternates: { canonical: SITE.url },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg" }],
  },
  authors: [{ name: SITE.founder.name, url: SITE.url }],
  creator: SITE.founder.name,
  publisher: SITE.name,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="min-h-dvh flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": ["Organization", "ProfessionalService"],
                  "@id": `${SITE.url}/#organization`,
                  name: SITE.name,
                  legalName: `${SITE.legal.sas} & ${SITE.legal.ei}`,
                  url: SITE.url,
                  logo: {
                    "@type": "ImageObject",
                    url: `${SITE.url}/icon.svg`,
                    width: 512,
                    height: 512,
                  },
                  image: `${SITE.url}/opengraph-image`,
                  description: SITE.description,
                  slogan: SITE.baseline,
                  email: SITE.contact.email,
                  telephone: SITE.contact.phoneHref.replace("tel:", ""),
                  foundingDate: "2020",
                  ...(SITE.legal.sasVat ? { vatID: SITE.legal.sasVat } : {}),
                  ...(SITE.legal.sasSiren
                    ? { identifier: { "@type": "PropertyValue", propertyID: "SIREN", value: SITE.legal.sasSiren } }
                    : {}),
                  hasCredential: {
                    "@type": "EducationalOccupationalCredential",
                    credentialCategory: "certification",
                    name: "Qualiopi — Actions de formation",
                    ...(SITE.legal.qualiopiBody
                      ? { recognizedBy: { "@type": "Organization", name: SITE.legal.qualiopiBody } }
                      : {}),
                    ...(SITE.legal.qualiopiNumber ? { identifier: SITE.legal.qualiopiNumber } : {}),
                  },
                  founder: {
                    "@type": "Person",
                    "@id": `${SITE.url}/#person`,
                    name: SITE.founder.name,
                    jobTitle: SITE.founder.role,
                  },
                  address: {
                    "@type": "PostalAddress",
                    ...(SITE.legal.sasStreet ? { streetAddress: SITE.legal.sasStreet } : {}),
                    addressLocality: "Clermont-Ferrand",
                    addressRegion: "Auvergne-Rhône-Alpes",
                    postalCode: "63000",
                    addressCountry: "FR",
                  },
                  areaServed: [
                    { "@type": "AdministrativeArea", name: "Auvergne-Rhône-Alpes" },
                    { "@type": "AdministrativeArea", name: "Île-de-France" },
                    { "@type": "Country", name: "France" },
                  ],
                  knowsAbout: [
                    "Intelligence artificielle générative",
                    "Formation IA Qualiopi",
                    "ChatGPT",
                    "Claude",
                    "Gemini",
                    "Prompt engineering",
                    "Automatisation n8n",
                    "Automatisation Make",
                    "Vibe Coding",
                    "Agents IA autonomes",
                    "Conseil PME ETI",
                    "Accessibilité RGAA",
                    "Conformité Qualiopi",
                  ],
                  sameAs: [
                    SITE.social.linkedin,
                    SITE.social.github,
                    ...(SITE.legal.pappersUrl ? [SITE.legal.pappersUrl] : []),
                    ...BRANDS.map((b) => b.url),
                  ],
                  subOrganization: BRANDS.map((b) => ({
                    "@type": "Organization",
                    name: b.name,
                    url: b.url,
                    description: b.description,
                  })),
                  contactPoint: {
                    "@type": "ContactPoint",
                    telephone: SITE.contact.phoneHref.replace("tel:", ""),
                    email: SITE.contact.email,
                    contactType: "sales",
                    areaServed: "FR",
                    availableLanguage: ["French", "English"],
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": `${SITE.url}/#website`,
                  url: SITE.url,
                  name: SITE.name,
                  description: SITE.description,
                  publisher: { "@id": `${SITE.url}/#organization` },
                  inLanguage: "fr-FR",
                },
              ],
            }),
          }}
        />
        <Analytics />
      </body>
      <GoogleAnalytics gaId="G-MPZM0EYFQE" />
    </html>
  );
}
