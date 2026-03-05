"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AudioPlayerProps {
  slug: string
  text: string
  initialUrl?: string | null
}

export function AudioPlayer({ slug, text, initialUrl = null }: AudioPlayerProps) {
  const [audioUrl, setAudioUrl] = useState<string | null>(initialUrl)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug,
          text,
        }),
      })

      const data = (await response.json()) as { url?: string }

      if (!response.ok || !data.url) {
        throw new Error("Audio generation failed")
      }

      setAudioUrl(data.url)
    } catch {
      setError("Impossible de générer l’audio pour le moment.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="mb-8 border-border/60 bg-card/80 shadow-sm backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-base md:text-lg">Lecture audio</CardTitle>
          <Badge variant="outline" className="border-border/70 text-muted-foreground">
            Premium
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {audioUrl ? (
          <audio controls preload="none" className="w-full">
            <source src={audioUrl} type="audio/mpeg" />
            Votre navigateur ne supporte pas la lecture audio.
          </audio>
        ) : (
          <Button onClick={handleGenerate} disabled={loading}>
            {loading ? "Génération..." : "Générer l’audio"}
          </Button>
        )}
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
      </CardContent>
    </Card>
  )
}
