import type { Metadata } from "next"
import { BooksPageClient } from "@/components/books/books-page-client"

export const metadata: Metadata = {
  title: "Bibliothèque | Karim Hammouche",
  description: "Liste des livres lus et en cours de lecture.",
}

export default function BooksPage() {
  return <BooksPageClient />
}
