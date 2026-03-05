# Mise en place de Portfolio Copilot

## 1) Créer le Hugging Face Space (Gradio)
1. Crée un Space public sur Hugging Face (SDK Gradio).
2. Copie les fichiers `hf_space/app.py` et `hf_space/requirements.txt` dans le repo du Space.
3. Copie aussi `data/portfolio.knowledge.json` et `data/system.prompt.txt` dans un dossier `data/` du Space.
4. Lance le Space. L’API publique sera disponible sur :
   - `https://TON-SPACE.hf.space/predict`

## 2) Configurer le site Next.js
1. Ajoute une variable d’environnement dans `.env.local` :
   - `HF_SPACE_BASE_URL=https://TON-SPACE.hf.space`
2. Lance le site : `npm run dev`.
3. Va sur `/assistant` pour tester l’interface (le frontend appelle `/api/chat`).

## 3) Rappels importants
- Le backend dépend de `HF_SPACE_BASE_URL` pour joindre le Space Hugging Face.
- Pas de clé API, pas de stockage utilisateur, pas de paiement.
- Les réponses sont basées uniquement sur `portfolio.knowledge.json`.
- Si la réponse indique que le service est indisponible, vérifie d’abord que le Space est en ligne et que l’URL est correcte.
