import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Karim Hammouche",
  description: "Portfolio",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
