const DEFAULT_BASE_URL = "http://localhost:3000"

function normalizeBaseUrl(url: string) {
  return url.endsWith("/") ? url.slice(0, -1) : url
}

export function getBaseUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL

  if (!configuredUrl) {
    return new URL(DEFAULT_BASE_URL)
  }

  try {
    return new URL(normalizeBaseUrl(configuredUrl))
  } catch {
    return new URL(DEFAULT_BASE_URL)
  }
}

export function absoluteUrl(path = "/") {
  return new URL(path, getBaseUrl()).toString()
}

const FRENCH_MONTHS: Record<string, number> = {
  janvier: 0,
  février: 1,
  fevrier: 1,
  mars: 2,
  avril: 3,
  mai: 4,
  juin: 5,
  juillet: 6,
  août: 7,
  aout: 7,
  septembre: 8,
  octobre: 9,
  novembre: 10,
  décembre: 11,
  decembre: 11,
}

export function parseFrenchDateToIso(dateString: string) {
  const cleaned = dateString.trim().toLowerCase()
  const parts = cleaned.split(/\s+/)

  if (parts.length !== 3) {
    return undefined
  }

  const day = Number.parseInt(parts[0], 10)
  const month = FRENCH_MONTHS[parts[1]]
  const year = Number.parseInt(parts[2], 10)

  if (!Number.isFinite(day) || month === undefined || !Number.isFinite(year)) {
    return undefined
  }

  const date = new Date(Date.UTC(year, month, day))

  if (Number.isNaN(date.getTime())) {
    return undefined
  }

  return date.toISOString()
}
