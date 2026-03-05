"use client";

import { useState } from "react";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const QUICK_PROMPTS = [
  "Tu me recommandes quel projet si je suis recruteur ?",
  "Quelle est ta stack principale ?",
  "Donne-moi un résumé de ton profil en 6 lignes",
  "Comment te contacter ?",
];

const EMPTY_STATE =
  "Je suis prêt. Demande-moi de te recommander le meilleur projet à voir.";

const DISCLAIMER =
  "Réponses basées uniquement sur le contenu public du portfolio.";

const FALLBACK_ERROR = "Le service est surchargé. Réessaie dans quelques instants.";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type PortfolioCopilotProps = {
  className?: string;
};

export default function PortfolioCopilot({ className }: PortfolioCopilotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sendMessage = async (question: string) => {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion || isLoading) {
      return;
    }

    const newMessage: Message = { role: "user", content: trimmedQuestion };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setErrorMessage(null);
    setIsLoading(true);

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 20000);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmedQuestion }),
        signal: controller.signal,
      });

      const data = (await response.json()) as { reply?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? FALLBACK_ERROR);
      }

      const reply = data.reply?.trim() ? data.reply : FALLBACK_ERROR;
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (error) {
      const message = error instanceof Error ? error.message : FALLBACK_ERROR;
      setErrorMessage(message);
      setMessages((prev) => [...prev, { role: "assistant", content: FALLBACK_ERROR }]);
    } finally {
      window.clearTimeout(timeoutId);
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(input);
  };

  return (
    <div className={cn("flex flex-col gap-6 rounded-3xl border border-white/10 bg-card/90 p-5 shadow-xl sm:p-8", className)}>
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">Portfolio Copilot</h1>
        <p className="text-sm text-muted-foreground">
          Pose une question sur Karim Hammouche, ses compétences, ses projets, ou la meilleure façon de le contacter.
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        {QUICK_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            type="button"
            disabled={isLoading}
            onClick={() => void sendMessage(prompt)}
            className={cn(
              badgeVariants({ variant: "secondary" }),
              "cursor-pointer rounded-full border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-foreground transition hover:bg-white/10",
              "disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            {prompt}
          </button>
        ))}
      </div>

      <div className="max-h-[42vh] min-h-48 overflow-y-auto rounded-2xl border border-white/10 bg-background/60 p-4 sm:p-6">
        {messages.length === 0 ? (
          <p className="text-sm text-muted-foreground">{EMPTY_STATE}</p>
        ) : (
          <div className="flex flex-col gap-3">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={cn(
                  "max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                  message.role === "user"
                    ? "self-end border border-white/20 bg-foreground text-background"
                    : "self-start border border-white/10 bg-white/5 text-foreground",
                )}
              >
                {message.content}
              </div>
            ))}
            {isLoading ? (
              <div className="self-start rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-muted-foreground">
                Portfolio Copilot réfléchit...
              </div>
            ) : null}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Écris ta question…"
          className="h-11 w-full rounded-full border border-white/10 bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none"
        />
        <Button type="submit" disabled={isLoading} className="h-11 rounded-full px-6">
          Envoyer
        </Button>
      </form>

      {errorMessage ? <p className="text-xs text-red-300">Erreur: {errorMessage}</p> : null}

      <Badge variant="outline" className="w-fit text-[11px] text-muted-foreground">
        {DISCLAIMER}
      </Badge>
    </div>
  );
}
