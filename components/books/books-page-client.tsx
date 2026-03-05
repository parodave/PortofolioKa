"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeftIcon, SearchIcon, XIcon } from "lucide-react"
import { BookCard } from "@/components/books/BookCard"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Book, BookFilter, BookSortKey } from "@/lib/books"
import { filterAndSortBooks, getBookStats } from "@/lib/books"

const statusFilters: Array<{ key: BookFilter; label: string }> = [
  { key: "all", label: "Tous" },
  { key: "read", label: "Lus" },
  { key: "reading", label: "En cours" },
]

const sortOptions: Array<{ key: BookSortKey; label: string }> = [
  { key: "recent", label: "Récent" },
  { key: "title", label: "Titre" },
  { key: "author", label: "Auteur" },
]

export function BooksPageClient() {
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<BookFilter>("all")
  const [sortKey, setSortKey] = useState<BookSortKey>("recent")
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  const stats = useMemo(() => getBookStats(), [])
  const books = useMemo(() => filterAndSortBooks(query, statusFilter, sortKey), [query, statusFilter, sortKey])

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-6">
          <Button asChild variant="outline" className="border-border bg-background">
            <Link href="/">
              <ArrowLeftIcon className="h-4 w-4" />
              Retour
            </Link>
          </Button>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="rounded-3xl border bg-card p-8"
        >
          <div className="space-y-3">
            <Badge variant="outline">{stats.totalCount} livres</Badge>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Bibliothèque</h1>
            <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
              Tous les livres que j’ai lus et ceux que je lis en ce moment.
            </p>
          </div>
        </motion.section>

        <section className="mt-8 space-y-6">
          <div className="grid gap-4 rounded-2xl border bg-card p-4 md:grid-cols-[1fr_auto_auto] md:items-center">
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Rechercher un titre ou un auteur"
                className="h-10 w-full rounded-full border bg-background pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {statusFilters.map((filter) => {
                const active = statusFilter === filter.key
                return (
                  <Button
                    key={filter.key}
                    variant={active ? "secondary" : "outline"}
                    onClick={() => setStatusFilter(filter.key)}
                  >
                    {filter.label}
                  </Button>
                )
              })}
            </div>

            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Trier</span>
              <select
                value={sortKey}
                onChange={(event) => setSortKey(event.target.value as BookSortKey)}
                className="h-10 rounded-full border bg-background px-3 text-sm focus:outline-none"
              >
                {sortOptions.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="py-0">
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground">Livres lus</p>
                <p className="mt-2 text-3xl font-semibold">{stats.readCount}</p>
              </CardContent>
            </Card>
            <Card className="py-0">
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground">En cours</p>
                <p className="mt-2 text-3xl font-semibold">{stats.readingCount}</p>
              </CardContent>
            </Card>
            <Card className="py-0 sm:col-span-2 lg:col-span-1">
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="mt-2 text-3xl font-semibold">{stats.totalCount}</p>
              </CardContent>
            </Card>
          </div>

          {books.length === 0 ? (
            <div className="rounded-2xl border bg-card px-6 py-14 text-center text-sm text-muted-foreground">
              Aucun livre ne correspond à ta recherche.
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {books.map((book) => (
                <BookCard key={book.id} book={book} onOpenNotes={setSelectedBook} />
              ))}
            </div>
          )}
        </section>
      </div>

      <AnimatePresence>
        {selectedBook ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-end bg-black/70 p-4 backdrop-blur-sm sm:items-center sm:justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBook(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-xl rounded-3xl border bg-card p-6 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{selectedBook.author}</p>
                  <h2 className="text-xl font-semibold">{selectedBook.title}</h2>
                </div>
                <Button size="icon" variant="ghost" className="rounded-full" onClick={() => setSelectedBook(null)}>
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3 text-sm">
                <p>Langue: Français</p>
                <p>Année: {selectedBook.yearRead ?? "Non renseignée"}</p>
                <p>Pages: {selectedBook.pages ?? "Non renseigné"}</p>
                <div className="rounded-2xl border bg-background p-4">
                  {selectedBook.notes.trim().length > 0 ? selectedBook.notes : "Aucune note pour le moment."}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  )
}
