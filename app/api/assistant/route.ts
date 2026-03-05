import { Client } from "@gradio/client";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

type AssistantBody = {
  message?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AssistantBody;
    const message = body.message?.trim();

    if (!message) {
      return NextResponse.json({ error: "message is required" }, { status: 400 });
    }

    const spaceId = process.env.HF_SPACE_ID;
    if (!spaceId) {
      return NextResponse.json({ error: "HF_SPACE_ID is not configured" }, { status: 500 });
    }

    const token = process.env.HF_TOKEN?.trim();
    const client = token
      ? await Client.connect(spaceId, { hf_token: token })
      : await Client.connect(spaceId);

    const result = await client.predict(0, [message, []]);
    const firstData = result.data?.[0];
    const reply = typeof firstData === "string" ? firstData : JSON.stringify(result.data);

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: "internal server error" }, { status: 500 });
  }
}
