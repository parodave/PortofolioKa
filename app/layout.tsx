import type { Metadata } from "next"
import "./globals.css"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://karim-hammouche.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Karim Hammouche | Portfolio",
    template: "%s | Karim Hammouche",
  },
  description:
    "Portfolio professionnel de Karim Hammouche : maintenance, opérations, logistique et projets digitaux.",
  openGraph: {
    title: "Karim Hammouche | Portfolio",
    description:
      "Portfolio professionnel de Karim Hammouche : maintenance, opérations, logistique et projets digitaux.",
    url: siteUrl,
    siteName: "Karim Hammouche Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karim Hammouche | Portfolio",
    description:
      "Portfolio professionnel de Karim Hammouche : maintenance, opérations, logistique et projets digitaux.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
