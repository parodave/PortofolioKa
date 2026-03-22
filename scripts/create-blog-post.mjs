#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"

const STOP_WORDS = new Set([
  "le",
  "la",
  "les",
  "un",
  "une",
  "des",
  "du",
  "de",
  "et",
  "en",
  "pour",
  "avec",
  "sans",
  "sur",
  "dans",
  "comment",
  "utiliser",
  "construire",
])

const FALLBACK_TOPICS = [
  "Structurer un process de livraison produit en startup",
  "Améliorer la qualité front-end avec une checklist de release",
  "Mettre en place une stratégie de contenu B2B orientée conversion",
  "Réduire la dette technique sans ralentir la roadmap métier",
  "Mesurer l'impact business des fonctionnalités data",
]

const [titleArg, ...tagArgs] = process.argv.slice(2)

if (!titleArg) {
  console.error('Usage: npm run blog:new -- "Titre de l\'article" tag1 tag2')
  process.exit(1)
}

const blogDir = path.join(process.cwd(), "content", "blog")
if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir, { recursive: true })
}

const existingFiles = fs.readdirSync(blogDir).filter((file) => file.endsWith(".md"))
const existingPosts = existingFiles.map((file) => {
  const raw = fs.readFileSync(path.join(blogDir, file), "utf8")
  const titleMatch = raw.match(/^title:\s*"([^"]+)"/m)
  const slugMatch = raw.match(/^slug:\s*"([^"]+)"/m)
  return {
    title: titleMatch?.[1] || "",
    slug: slugMatch?.[1] || file.replace(/\.md$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, ""),
  }
})

function slugify(input) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

function titleFingerprint(input) {
  return new Set(
    input
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((word) => word && !STOP_WORDS.has(word)),
  )
}

function similarity(a, b) {
  if (a.size === 0 || b.size === 0) return 0
  let overlap = 0
  for (const token of a) {
    if (b.has(token)) overlap += 1
  }
  return overlap / Math.max(a.size, b.size)
}

function findAlternativeTitle() {
  for (const candidate of FALLBACK_TOPICS) {
    const candidateFp = titleFingerprint(candidate)
    const hasSimilar = existingPosts.some((post) => similarity(candidateFp, titleFingerprint(post.title)) >= 0.5)
    if (!hasSimilar) return candidate
  }
  return `Nouveau sujet ${new Date().toISOString().slice(0, 10)}`
}

let finalTitle = titleArg.trim()
let finalSlug = slugify(finalTitle)

const slugExists = existingPosts.some((post) => post.slug === finalSlug)
const titleTooSimilar = existingPosts.some((post) => similarity(titleFingerprint(finalTitle), titleFingerprint(post.title)) >= 0.6)

if (slugExists || titleTooSimilar) {
  finalTitle = findAlternativeTitle()
  finalSlug = slugify(finalTitle)
}

if (existingPosts.some((post) => post.slug === finalSlug)) {
  finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`
}

const tags = tagArgs.length ? tagArgs : ["Journal"]
const date = new Date().toISOString().slice(0, 10)
const filePath = path.join(blogDir, `${date}-${finalSlug}.md`)

if (fs.existsSync(filePath)) {
  console.error(`Le fichier existe déjà: ${path.relative(process.cwd(), filePath)}`)
  process.exit(1)
}

const template = `---
slug: "${finalSlug}"
title: "${finalTitle}"
description: "Résumé court de l'article."
date: "${date}"
tags: [${tags.map((tag) => `"${tag}"`).join(", ")}]
image: "/placeholder.jpg"
---

# ${finalTitle}

Commencez votre article ici.
`

fs.writeFileSync(filePath, template, "utf8")
console.log(`Article créé: ${path.relative(process.cwd(), filePath)}`)
if (finalTitle !== titleArg.trim()) {
  console.log(`Sujet ajusté automatiquement pour éviter un doublon: ${finalTitle}`)
}
