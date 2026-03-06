export const runtime = "nodejs"
export const maxDuration = 30
export const dynamic = "force-dynamic"

import { CopilotMemory } from "@/lib/copilot-memory"
import { loadPortfolioKnowledge } from "@/lib/portfolio-knowledge"

const memory = new CopilotMemory()

function getSpaceUrl() {
  const id = process.env.HF_SPACE_ID!

  const sub = id.replace("/", "-")

  return `https://${sub}.hf.space/run/predict`
}

export async function POST(req: Request) {
  const body = await req.json()

  const question = body.question

  memory.addUser(question)

  const knowledge = loadPortfolioKnowledge()

  const prompt = `
You are the AI assistant for the portfolio of Karim Hammouche.

Answer only using the portfolio information below.

Portfolio data:
${knowledge}

Conversation history:
${JSON.stringify(memory.history())}

User question:
${question}
`

  const response = await fetch(getSpaceUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      data: [prompt]
    })
  })

  const result = await response.json()

  const answer = result.data?.[0] ?? "No response"

  memory.addAssistant(answer)

  return Response.json({
    answer
  })
}
