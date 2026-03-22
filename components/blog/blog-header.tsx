"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"

const categories = [
  { name: "All", count: 6 },
  { name: "Entrepreneuriat", count: 2 },
  { name: "Tech", count: 2 },
  { name: "Web3", count: 1 },
  { name: "Data", count: 1 },
]

export function BlogHeader() {
  const [activeCategory, setActiveCategory] = useState("All")

  return (
    <div className="mb-10">
      <h1 id="blog-heading" className="mb-2 text-4xl font-bold tracking-tight">Blog</h1>
      <p className="mb-6 text-muted-foreground">
        Mes articles et réflexions sur l'entrepreneuriat, la tech et le développement.
      </p>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge
            key={category.name}
            variant={activeCategory === category.name ? "default" : "outline"}
            className="cursor-pointer px-3 py-1.5 text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={() => setActiveCategory(category.name)}
          >
            {category.name}
            <span className="ml-1.5 text-xs opacity-70">{category.count}</span>
          </Badge>
        ))}
      </div>
    </div>
  )
}
