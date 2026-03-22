# Subagent Exploration Report

Date: 2026-03-21 (UTC)

This report was generated as a lightweight "subagent" pass over the repository using parallel shell reconnaissance commands.

## Scope

- Identify top-level structure and major feature areas.
- Identify runtime stack and tooling.
- Identify likely source-of-truth content and API boundaries.

## Quick Findings

1. **Primary framework:** Next.js App Router + React + TypeScript.
2. **UI architecture:** Reusable components in `components/` (including `components/ui/`, `components/magicui/`, and feature groups such as blog/books/travels/assistant).
3. **Dual app trees present:** both `app/` and `src/app/` exist, with many mirrored admin/API routes.
4. **Data/content strategy:** static JSON in `content/` and `data/`, plus Supabase SQL migrations/seed in `supabase/`.
5. **AI assistant integration:** API route proxies assistant prompts to Hugging Face Space endpoint, with in-memory rate limiting and local prompt/context assembly.

## Important Paths

- Entrypoints:
  - `app/layout.tsx`
  - `app/page.tsx`
- Assistant/chat backend:
  - `app/api/chat/route.ts`
  - `data/system.prompt.txt`
  - `data/portfolio.knowledge.json`
- Admin/API surfaces:
  - `app/api/admin/*`
  - `src/app/api/admin/*`
- Content & persistence:
  - `content/*.json`
  - `supabase/migrations/*.sql`
  - `supabase/seed_portfolio.sql`
- Dependencies/scripts:
  - `package.json`

## Recon Commands Used

```bash
rg --files -g 'AGENTS.md'
rg --files | head -n 200
find . -maxdepth 2 -type d | sed 's#^./##' | head -n 200
cat package.json
sed -n '1,220p' README.md
sed -n '1,220p' app/page.tsx
sed -n '1,220p' app/layout.tsx
sed -n '1,220p' app/api/chat/route.ts
```

## Suggested Next Deep-Dive (if requested)

- Confirm whether `app/` or `src/app/` is canonical for deployment.
- Map API consumers to route implementations (especially duplicated admin routes).
- Validate environment variable contract for assistant/admin features.
- Run lint/build and enumerate current warnings/errors.
