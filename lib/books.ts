import booksData from "@/content/books.json"

export type BookStatus = "read" | "reading"

export type Book = {
  id: string
  title: string
  author: string
  status: BookStatus
  language: "fr"
  yearRead: number | null
  pages: number | null
  tags: string[]
  description: string
  notes: string
  cover: {
    type: "url" | "local" | "generated"
    url: string | null
    path: string | null
  }
}

export type BookSortKey = "recent" | "title" | "author"
export type BookFilter = "all" | BookStatus

export type BookStats = {
  readCount: number
  readingCount: number
  totalCount: number
}

const books = booksData as Book[]

export function getAllBooks(): Book[] {
  return [...books]
}

export function getBookStats(): BookStats {
  const readCount = books.filter((book) => book.status === "read").length
  const readingCount = books.filter((book) => book.status === "reading").length

  return {
    readCount,
    readingCount,
    totalCount: books.length,
  }
}

export function filterAndSortBooks(
  query: string,
  statusFilter: BookFilter,
  sortKey: BookSortKey,
): Book[] {
  const normalizedQuery = query.trim().toLowerCase()

  const filtered = books.filter((book) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      book.title.toLowerCase().includes(normalizedQuery) ||
      book.author.toLowerCase().includes(normalizedQuery)

    const matchesStatus = statusFilter === "all" || book.status === statusFilter

    return matchesQuery && matchesStatus
  })

  return [...filtered].sort((a, b) => {
    if (sortKey === "recent") {
      if (a.yearRead === null && b.yearRead === null) {
        return a.title.localeCompare(b.title, "fr")
      }
      if (a.yearRead === null) {
        return 1
      }
      if (b.yearRead === null) {
        return -1
      }
      if (b.yearRead !== a.yearRead) {
        return b.yearRead - a.yearRead
      }
      return a.title.localeCompare(b.title, "fr")
    }

    if (sortKey === "title") {
      return a.title.localeCompare(b.title, "fr")
    }

    return a.author.localeCompare(b.author, "fr")
  })
}
