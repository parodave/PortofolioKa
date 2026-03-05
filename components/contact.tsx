"use client"

import { Button } from "@/components/ui/button"
import { Mail, Phone } from "lucide-react"
import { SocialBeam } from "@/components/social-beam"

export function Contact() {
  return (
    <section id="contact" className="flex flex-col gap-6 pb-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Get in Touch</h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Want to chat? Feel free to reach out to me for any opportunities or collaborations.
        </p>
      </div>

      <SocialBeam />

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {/* Email */}
        <Button asChild>
          <a href="mailto:karim@karimhammouche.com">
            <Mail className="mr-2 h-4 w-4" />
            Email Me
          </a>
        </Button>

        {/* WhatsApp (replaces Call Me) */}
        <Button variant="outline" asChild>
          <a
            href="https://wa.me/33743561304"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Phone className="mr-2 h-4 w-4" />
            Call Me
          </a>
        </Button>
      </div>
    </section>
  )
}
