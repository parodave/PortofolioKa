# Telegram / OpenClaw Admin Commands

Use this endpoint for all automation operations:

- **URL**: `POST /api/admin/ingest`
- **Header**: `x-admin-token: <ADMIN_API_TOKEN>`
- **Body format**:

```json
{
  "entity": "book",
  "action": "create",
  "payload": {}
}
```

## Create commands

### `/addbook`

```json
{
  "entity": "book",
  "action": "create",
  "payload": {
    "title": "The 4-Hour Workweek",
    "author": "Tim Ferriss",
    "status": "reading"
  }
}
```

### `/addblog`

```json
{
  "entity": "blog",
  "action": "create",
  "payload": {
    "title": "How AI changed my vision of entrepreneurship",
    "excerpt": "Why AI made my old ideas suddenly executable.",
    "content_md": "# Title\n\nArticle content...",
    "status": "draft",
    "language": "en",
    "featured": true,
    "tags": ["ai", "entrepreneurship"]
  }
}
```

### `/addtravel`

```json
{
  "entity": "travel",
  "action": "create",
  "payload": {
    "country": "Indonesia",
    "city": "Bali",
    "start_date": "2018-01-10",
    "end_date": "2018-01-25",
    "summary": "First major trip outside Europe and North Africa.",
    "notes_md": "This trip changed my mindset.",
    "latitude": -8.4095,
    "longitude": 115.1889,
    "featured": true
  }
}
```

### `/addaudio`

```json
{
  "entity": "audio",
  "action": "create",
  "payload": {
    "title": "AI article voice version",
    "source_type": "blog_post",
    "source_blog_id": "<BLOG_POST_UUID>",
    "audio_url": "https://cdn.example.com/audio/ai-article.mp3",
    "provider": "elevenlabs",
    "status": "published"
  }
}
```

### `/addproject`

```json
{
  "entity": "project",
  "action": "create",
  "payload": {
    "name": "AI Deal Finder",
    "status": "published",
    "short_summary": "AI pipeline to score acquisition opportunities.",
    "full_description": "End-to-end workflow from sourcing to scoring.",
    "stack": ["Next.js", "Supabase", "OpenAI"],
    "tags": ["ai", "automation", "saas"],
    "website_url": "https://example.com",
    "repo_url": "https://github.com/example/repo",
    "featured": true
  }
}
```

### `/addwork`

```json
{
  "entity": "work",
  "action": "create",
  "payload": {
    "company": "Example Labs",
    "role": "AI Product Lead",
    "employment_type": "contract",
    "start_date": "2024-02-01",
    "is_current": true,
    "short_summary": "Led productization of AI automations.",
    "responsibilities": ["Automation architecture", "Team leadership"],
    "achievements": ["Reduced manual ops by 70%"],
    "skills_used": ["Next.js", "Supabase", "n8n"]
  }
}
```

### `/addcertification`

```json
{
  "entity": "certification",
  "action": "create",
  "payload": {
    "name": "AWS Certified Cloud Practitioner",
    "issuer": "Amazon Web Services",
    "status": "active",
    "issue_date": "2024-05-15",
    "featured": true
  }
}
```

### `/addskill`

```json
{
  "entity": "skill",
  "action": "create",
  "payload": {
    "name": "Supabase",
    "category": "backend",
    "level": "advanced",
    "years_experience": 3,
    "featured": true
  }
}
```

## Publish / delete / list examples

### `/publishblog`

```json
{
  "entity": "blog",
  "action": "update",
  "payload": {
    "id": "<BLOG_POST_UUID>",
    "status": "published",
    "featured": true
  }
}
```

### `/deletebook`

```json
{
  "entity": "book",
  "action": "delete",
  "payload": {
    "id": "<BOOK_UUID>"
  }
}
```

### `/listtravels`

```json
{
  "entity": "travel",
  "action": "list",
  "payload": {}
}
```

### `/listprojects`

```json
{
  "entity": "project",
  "action": "list",
  "payload": {}
}
```
