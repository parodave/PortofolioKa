import { NextRequest, NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const HF_SPACE_BASE_URL =
  process.env.HF_SPACE_BASE_URL ?? "https://aokfs-portfolio-copilot.hf.space";
const RATE_LIMIT_PER_MIN = Number(
  process.env.ASSISTANT_RATE_LIMIT_PER_MIN ?? "20",
);
const MAX_MESSAGE_CHARS = Number(process.env.ASSISTANT_MAX_CHARS ?? "1200");
const TIMEOUT_MS = Number(process.env.ASSISTANT_TIMEOUT_MS ?? "25000");
const MAX_HISTORY = 12;

const SERVICE_UNAVAILABLE_REPLY =
  "Le service IA est temporairement indisponible. Réessaie dans quelques minutes.";
const INVALID_REQUEST_REPLY =
  "Merci de formuler une question plus courte (1200 caractères max).";
const RATE_LIMIT_REPLY =
  "Trop de requêtes. Réessaie dans une minute pour continuer.";

const rateLimitStore = new Map<string, number[]>();
let cachedContext: string | null = null;

export const runtime = "nodejs";

const getClientIp = (request: NextRequest) => {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const [first] = forwardedFor.split(",");
    return first.trim();
  }
  return request.headers.get("x-real-ip") ?? "unknown";
};

const isRateLimited = (ip: string) => {
  const now = Date.now();
  const windowStart = now - 60_000;
  const timestamps = rateLimitStore.get(ip)?.filter((time) => time > windowStart) ?? [];
  if (timestamps.length >= RATE_LIMIT_PER_MIN) {
    rateLimitStore.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  rateLimitStore.set(ip, timestamps);
  return false;
};

const loadContext = async () => {
  if (cachedContext) {
    return cachedContext;
  }

  const systemPromptPath = path.join(process.cwd(), "data", "system.prompt.txt");
  const knowledgePath = path.join(process.cwd(), "data", "portfolio.knowledge.json");

  const [systemPromptRaw, knowledgeRaw] = await Promise.all([
    readFile(systemPromptPath, "utf8"),
    readFile(knowledgePath, "utf8"),
  ]);

  let knowledgeString = knowledgeRaw.trim();
  try {
    knowledgeString = JSON.stringify(JSON.parse(knowledgeRaw));
  } catch {
    // Keep raw string if JSON parsing fails.
  }

  cachedContext = systemPromptRaw.replace("{{PORTFOLIO_KNOWLEDGE}}", knowledgeString);
  return cachedContext;
};

const buildPayload = (context: string, messages: ChatMessage[]) => {
  const trimmedMessages = messages.slice(-MAX_HISTORY);
  const lastMessage = trimmedMessages[trimmedMessages.length - 1];
  const history = trimmedMessages.slice(0, -1);

  const historyBlock = history
    .map((message) => `${message.role === "user" ? "User" : "Assistant"}: ${message.content}`)
    .join("\n");

  return [
    "CONTEXTE:",
    context,
    "",
    "HISTORIQUE:",
    historyBlock || "(aucun)",
    "",
    "DERNIER MESSAGE UTILISATEUR:",
    lastMessage?.content ?? "",
  ].join("\n");
};

const extractReply = (payload: unknown): string | null => {
  const normalize = (value: string) => {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
  };

  const extractFromArray = (value: unknown[]): string | null => {
    const chatCandidate = value.find(
      (item) => Array.isArray(item) && item.every((pair) => Array.isArray(pair)),
    );

    if (Array.isArray(chatCandidate)) {
      const lastAssistant = [...chatCandidate]
        .reverse()
        .find((pair) => pair?.[0] === "assistant" && typeof pair?.[1] === "string");
      if (lastAssistant && typeof lastAssistant[1] === "string") {
        return normalize(lastAssistant[1]);
      }
    }

    for (const item of value) {
      const result = extractCandidate(item);
      if (result) {
        return result;
      }
    }
    return null;
  };

  const extractCandidate = (value: unknown): string | null => {
    if (typeof value === "string") {
      return normalize(value);
    }
    if (Array.isArray(value)) {
      return extractFromArray(value);
    }
    if (value && typeof value === "object") {
      const record = value as Record<string, unknown>;
      if (typeof record.text === "string") {
        return normalize(record.text);
      }
      if (typeof record.content === "string") {
        return normalize(record.content);
      }
      if (typeof record.message === "string") {
        return normalize(record.message);
      }
      if (Array.isArray(record.data)) {
        return extractFromArray(record.data);
      }
    }
    return null;
  };

  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;
    if (Array.isArray(record.data)) {
      return extractFromArray(record.data);
    }
  }

  return extractCandidate(payload);
};

const callHuggingFaceSpace = async (payload: string) => {
  const endpoints = ["/api/predict", "/run/predict", "/predict"];

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    for (const endpoint of endpoints) {
      const url = new URL(endpoint, HF_SPACE_BASE_URL).toString();
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: [payload] }),
        signal: controller.signal,
      });

      if (response.status === 404 || response.status === 405) {
        continue;
      }

      if (!response.ok) {
        throw new Error("HF Space error");
      }

      const data = (await response.json()) as unknown;
      const reply = extractReply(data);
      if (!reply) {
        throw new Error("Invalid response");
      }
      return reply;
    }
  } finally {
    clearTimeout(timeoutId);
  }

  throw new Error("No valid endpoint found");
};

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json({ reply: RATE_LIMIT_REPLY }, { status: 429 });
  }

  let body: { messages?: ChatMessage[] } | null = null;
  try {
    body = (await request.json()) as { messages?: ChatMessage[] };
  } catch {
    return NextResponse.json({ reply: SERVICE_UNAVAILABLE_REPLY }, { status: 400 });
  }

  const messages = Array.isArray(body?.messages) ? body?.messages : [];
  const trimmedMessages = messages.slice(-MAX_HISTORY);
  const lastMessage = trimmedMessages[trimmedMessages.length - 1];

  if (!lastMessage || lastMessage.role !== "user") {
    return NextResponse.json({ reply: SERVICE_UNAVAILABLE_REPLY }, { status: 400 });
  }

  if (lastMessage.content.length > MAX_MESSAGE_CHARS) {
    return NextResponse.json({ reply: INVALID_REQUEST_REPLY }, { status: 400 });
  }

  try {
    const context = await loadContext();
    const payload = buildPayload(context, trimmedMessages);
    const reply = await callHuggingFaceSpace(payload);
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ reply: SERVICE_UNAVAILABLE_REPLY }, { status: 502 });
  }
}
