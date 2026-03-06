export type Message = {
  role: "user" | "assistant"
  content: string
}

export class CopilotMemory {
  private messages: Message[] = []

  addUser(message: string) {
    this.messages.push({ role: "user", content: message })
  }

  addAssistant(message: string) {
    this.messages.push({ role: "assistant", content: message })
  }

  history() {
    return this.messages.slice(-10)
  }
}
