import type { Metadata } from "next"
import "./globals.css"
import { absoluteUrl, getBaseUrl } from "@/lib/seo"

const siteName = "Karim Hammouche"
const defaultTitle = "Karim Hammouche | Portfolio"
const defaultDescription =
  "Portfolio de Karim Hammouche : expérience, projets, compétences et articles sur l'entrepreneuriat, la tech et l'automatisation."

export const metadata: Metadata = {
  metadataBase: getBaseUrl(),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  alternates: {
    canonical: "/",
  },
  applicationName: siteName,
  referrer: "origin-when-cross-origin",
  keywords: [
    "Karim Hammouche",
    "portfolio",
    "entrepreneuriat",
    "full stack",
    "next.js",
    "web development",
    "automation",
    "AI",
  ],
  authors: [{ name: siteName, url: absoluteUrl("/") }],
  creator: siteName,
  publisher: siteName,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: absoluteUrl("/"),
    title: defaultTitle,
    description: defaultDescription,
    siteName,
    images: [
      {
        url: absoluteUrl("/professional-man-portrait.png"),
        width: 1200,
        height: 630,
        alt: "Karim Hammouche",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [absoluteUrl("/professional-man-portrait.png")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
