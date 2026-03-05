import { createHash } from "node:crypto"
import { getSupabaseAdminClient } from "@/lib/supabase-admin"

const DEFAULT_BUCKET = "blog-audio"

export const MAX_TTS_TEXT_LENGTH = 20_000

export function sanitizeSlug(slug: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
}

export function hashText(text: string) {
  return createHash("sha256").update(text, "utf8").digest("hex")
}

export function stripMarkdown(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_~\-]+/g, " ")
    .replace(/\r\n/g, "\n")
    .replace(/\n{2,}/g, "\n")
    .replace(/\s+/g, " ")
    .trim()
}

export async function getCachedAudioUrl(slug: string, contentHash: string, voiceId: string) {
  const supabase = getSupabaseAdminClient()

  if (!supabase) {
    return null
  }

  const { data, error } = await supabase
    .from("blog_audio")
    .select("audio_url, content_hash, voice_id")
    .eq("slug", slug)
    .maybeSingle()

  if (error || !data) {
    return null
  }

  if (data.content_hash === contentHash && data.voice_id === voiceId) {
    return data.audio_url
  }

  return null
}

export function getStorageBucket() {
  return process.env.SUPABASE_STORAGE_BUCKET || DEFAULT_BUCKET
}
