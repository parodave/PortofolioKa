"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BookOpenTextIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Book } from "@/lib/books"

type BookCardProps = {
  book: Book
  onOpenNotes: (book: Book) => void
}

function GeneratedCover({ title, author }: { title: string; author: string }) {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-lg border border-white/20 bg-black p-3">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.1),_transparent_58%)]" />
      <p className="relative line-clamp-4 text-sm font-semibold leading-tight text-white">{title}</p>
      <p className="relative text-xs text-white/80">{author}</p>
    </div>
  )
}

function MissingCover() {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-lg border border-dashed border-border bg-background p-3 text-center text-xs text-muted-foreground">
      Jaquette indisponible
    </div>
  )
}

function BookCover({ book }: { book: Book }) {
  const [hasError, setHasError] = useState(false)

  const coverSrc =
    book.cover.type === "local"
      ? book.cover.path
      : book.cover.type === "url"
        ? book.cover.url
        : null

  if (book.cover.type === "generated") {
    return <GeneratedCover title={book.title} author={book.author} />
  }

  if (!coverSrc || hasError) {
    return <MissingCover />
  }

  return (
    <img
      src={coverSrc}
      alt={`Jaquette ${book.title}`}
      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      onError={() => setHasError(true)}
      loading="lazy"
    />
  )
}

export function BookCard({ book, onOpenNotes }: BookCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <Card className="group h-full py-0 transition-all duration-300">
        <CardContent className="space-y-4 p-4">
          <div className="relative aspect-[2/3] overflow-hidden rounded-lg border bg-background">
            <BookCover book={book} />
          </div>

          <div className="space-y-2">
            <h3 className="line-clamp-2 text-base font-semibold">{book.title}</h3>
            <p className="text-sm text-muted-foreground">{book.author}</p>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{book.status === "read" ? "Lu" : "En cours"}</Badge>
            </div>
            <p className="line-clamp-2 text-sm text-muted-foreground">{book.description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {book.tags.map((tag) => (
              <Badge key={`${book.id}-${tag}`} variant="secondary" className="text-[11px]">
                {tag}
              </Badge>
            ))}
          </div>

          <Button variant="outline" className="w-full" onClick={() => onOpenNotes(book)}>
            <BookOpenTextIcon className="h-4 w-4" />
            Voir les notes
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
