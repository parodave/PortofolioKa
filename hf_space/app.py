import json
import os
import time

import gradio as gr
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline

MODEL_NAME = "mistralai/Mistral-7B-Instruct"


def load_text_file(path: str) -> str:
    with open(path, "r", encoding="utf-8") as file:
        return file.read()


def load_knowledge(path: str) -> dict:
    with open(path, "r", encoding="utf-8") as file:
        return json.load(file)


def knowledge_to_text(data: dict) -> str:
    lines = [
        f"Identité: {data['identite']['nom']}",
        f"Site: {data['identite']['site']}",
        "Stack:",
    ]
    lines.extend([f"- {item}" for item in data.get("stack", [])])
    lines.append("Projets:")
    for project in data.get("projets", []):
        project_line = f"- {project['nom']}"
        if project.get("description"):
            project_line += f" ({project['description']})"
        if project.get("lien"):
            project_line += f" – {project['lien']}"
        lines.append(project_line)
    lines.append("Focus:")
    lines.extend([f"- {item}" for item in data.get("focus", [])])
    lines.append("Contact:")
    lines.append(f"- Email: {data['contact']['email']}")
    lines.append(f"- Page: {data['contact']['page']}")
    return "\n".join(lines)


def build_prompt(system_template: str, knowledge_text: str, user_message: str) -> str:
    system_prompt = system_template.replace("{{PORTFOLIO_KNOWLEDGE}}", knowledge_text)
    return (
        f"<s>[SYSTEM]\n{system_prompt}\n[/SYSTEM]"
        f"\n[USER]\n{user_message}\n[/USER]\n[ASSISTANT]\n"
    )


def ensure_action_line(answer: str) -> str:
    actions = ["Action : voir un projet", "Action : voir le CV", "Action : contact"]
    if any(action.lower() in answer.lower() for action in actions):
        return answer
    return f"{answer}\n{actions[0]}"


def enforce_line_count(answer: str) -> str:
    lines = [line.strip() for line in answer.splitlines() if line.strip()]
    if len(lines) < 3:
        while len(lines) < 3:
            lines.append("Action : voir un projet")
    if len(lines) > 8:
        lines = lines[:8]
    return "\n".join(lines)


def fallback_not_found() -> str:
    lines = [
        "Je ne le vois pas dans le portfolio",
        "Dis-moi si tu veux une info présente dans le portfolio.",
        "Action : contact",
    ]
    return "\n".join(lines)


def has_known_topic(message: str, knowledge_data: dict) -> bool:
    message_lower = message.lower()
    keywords = [
        knowledge_data["identite"]["nom"],
        knowledge_data["identite"]["site"],
        "karim",
        "hammouche",
        "stack",
        "technos",
        "compétences",
        "projet",
        "contact",
        "email",
        knowledge_data["contact"]["email"],
        knowledge_data["contact"]["page"],
    ]
    keywords.extend(knowledge_data.get("stack", []))
    keywords.extend([project["nom"] for project in knowledge_data.get("projets", [])])
    keywords.extend(knowledge_data.get("focus", []))
    return any(keyword.lower() in message_lower for keyword in keywords)


knowledge_path = os.getenv("PORTFOLIO_KNOWLEDGE_PATH", "data/portfolio.knowledge.json")
system_prompt_path = os.getenv("SYSTEM_PROMPT_PATH", "data/system.prompt.txt")
knowledge_data = load_knowledge(knowledge_path)
knowledge_text = knowledge_to_text(knowledge_data)
system_template = load_text_file(system_prompt_path)

print("Loading model... This may take a while.")
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForCausalLM.from_pretrained(
    MODEL_NAME,
    torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
    device_map="auto",
)
text_generator = pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer,
)


def predict(message: str) -> str:
    if not message or not message.strip():
        return fallback_not_found()

    if not has_known_topic(message, knowledge_data):
        return fallback_not_found()

    prompt = build_prompt(system_template, knowledge_text, message.strip())

    try:
        start_time = time.time()
        outputs = text_generator(
            prompt,
            max_new_tokens=320,
            temperature=0.3,
            top_p=0.9,
            do_sample=True,
            eos_token_id=tokenizer.eos_token_id,
        )
        generated = outputs[0]["generated_text"].split("[ASSISTANT]")[-1].strip()
        if not generated:
            return fallback_not_found()
        answer = ensure_action_line(generated)
        return enforce_line_count(answer)
    except Exception:
        return "Le service est surchargé. Réessaie dans quelques instants."


with gr.Blocks() as demo:
    gr.Markdown("# Portfolio Copilot")
    gr.Markdown("Pose une question sur Karim Hammouche, ses compétences, ses projets, ou la meilleure façon de le contacter.")
    input_box = gr.Textbox(label="Votre question", placeholder="Écris ta question…")
    output_box = gr.Textbox(label="Réponse", lines=6)
    submit_button = gr.Button("Envoyer")

    submit_button.click(fn=predict, inputs=input_box, outputs=output_box, api_name="predict")

    demo.queue(default_concurrency_limit=2)


demo.launch(server_name="0.0.0.0", server_port=7860)
