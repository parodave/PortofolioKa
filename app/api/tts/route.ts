import { NextResponse } from "next/server"
import { getSupabaseAdminClient } from "@/lib/supabase-admin"
import { getStorageBucket, hashText, MAX_TTS_TEXT_LENGTH, sanitizeSlug } from "@/lib/tts"

interface TtsRequestBody {
  slug?: string
  text?: string
  voiceId?: string
}

const ttsRateLimit = new Map<string, { count: number; resetAt: number }>()
const RATE_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_REQUESTS = 10

function isRateLimited(key: string) {
  const now = Date.now()
  const current = ttsRateLimit.get(key)

  if (!current || current.resetAt < now) {
    ttsRateLimit.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return false
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true
  }

  current.count += 1
  return false
}

export async function POST(request: Request) {
  const ttsApiSecret = process.env.TTS_API_SECRET
  const providedSecret = request.headers.get("x-tts-secret")

  if (ttsApiSecret && providedSecret !== ttsApiSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const forwardedFor = request.headers.get("x-forwarded-for") || "unknown"
  const rateKey = forwardedFor.split(",")[0]?.trim() || "unknown"

  if (isRateLimited(rateKey)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 })
  }

  let body: TtsRequestBody

  try {
    body = (await request.json()) as TtsRequestBody
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const slug = body.slug?.trim() || ""
  const text = body.text?.trim() || ""
  const voiceId = body.voiceId?.trim() || process.env.ELEVENLABS_VOICE_ID || ""

  if (!slug || !sanitizeSlug(slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 })
  }

  if (!text || text.length > MAX_TTS_TEXT_LENGTH) {
    return NextResponse.json({ error: "Invalid text length" }, { status: 400 })
  }

  if (!voiceId) {
    return NextResponse.json({ error: "Missing voice id" }, { status: 500 })
  }

  if (!process.env.ELEVENLABS_API_KEY) {
    return NextResponse.json({ error: "Missing ElevenLabs API key" }, { status: 500 })
  }

  const supabase = getSupabaseAdminClient()

  if (!supabase) {
    return NextResponse.json({ error: "Missing Supabase server configuration" }, { status: 500 })
  }

  const contentHash = hashText(text)
  const bucket = getStorageBucket()

  const { data: existingAudio } = await supabase
    .from("blog_audio")
    .select("audio_url, content_hash, voice_id")
    .eq("slug", slug)
    .maybeSingle()

  if (existingAudio && existingAudio.content_hash === contentHash && existingAudio.voice_id === voiceId) {
    return NextResponse.json({ url: existingAudio.audio_url, cached: true })
  }

  const elevenLabsResponse = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: "POST",
    headers: {
      "xi-api-key": process.env.ELEVENLABS_API_KEY,
      "Content-Type": "application/json",
      Accept: "audio/mpeg",
    },
    body: JSON.stringify({
      text,
      model_id: process.env.ELEVENLABS_MODEL_ID || "eleven_multilingual_v2",
    }),
  })

  if (!elevenLabsResponse.ok) {
    const responseText = await elevenLabsResponse.text()

    if (elevenLabsResponse.status === 401) {
      return NextResponse.json({ error: "ElevenLabs unauthorized", details: responseText }, { status: 401 })
    }

    if (elevenLabsResponse.status === 429) {
      return NextResponse.json({ error: "ElevenLabs quota exceeded", details: responseText }, { status: 429 })
    }

    return NextResponse.json(
      { error: "ElevenLabs generation failed", status: elevenLabsResponse.status, details: responseText },
      { status: 502 },
    )
  }

  const audioBuffer = Buffer.from(await elevenLabsResponse.arrayBuffer())
  const audioPath = `${slug}/${contentHash}.mp3`

  const { error: uploadError } = await supabase.storage.from(bucket).upload(audioPath, audioBuffer, {
    contentType: "audio/mpeg",
    upsert: true,
  })

  if (uploadError) {
    return NextResponse.json({ error: "Supabase upload failed", details: uploadError.message }, { status: 500 })
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(audioPath)

  const { error: upsertError } = await supabase.from("blog_audio").upsert(
    {
      slug,
      content_hash: contentHash,
      voice_id: voiceId,
      audio_path: audioPath,
      audio_url: publicUrl,
    },
    {
      onConflict: "slug",
    },
  )

  if (upsertError) {
    return NextResponse.json({ error: "Supabase cache update failed", details: upsertError.message }, { status: 500 })
  }

  return NextResponse.json({ url: publicUrl, cached: false })
}
