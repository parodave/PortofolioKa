# OpenClaw Integration Examples

All requests below assume:

- Method: `POST`
- URL: `https://<your-domain>/api/admin/ingest`
- Header: `x-admin-token: <ADMIN_API_TOKEN>`
- Header: `content-type: application/json`

## 1) Add a new book

```json
{
  "entity": "book",
  "action": "create",
  "payload": {
    "title": "Deep Work",
    "author": "Cal Newport",
    "status": "completed",
    "summary": "Focus and concentration as a competitive advantage.",
    "featured": true
  }
}
```

## 2) Publish a new blog post

```json
{
  "entity": "blog",
  "action": "create",
  "payload": {
    "title": "AI Automation Playbook",
    "content_md": "# AI Automation Playbook\n\nPractical notes...",
    "status": "published",
    "language": "en",
    "tags": ["automation", "ai", "workflow"],
    "featured": true
  }
}
```

## 3) Add a travel entry with coordinates

```json
{
  "entity": "travel",
  "action": "create",
  "payload": {
    "country": "Japan",
    "city": "Tokyo",
    "start_date": "2023-04-01",
    "end_date": "2023-04-15",
    "summary": "Explored startup ecosystems and culture.",
    "latitude": 35.6764,
    "longitude": 139.6500,
    "featured": true
  }
}
```

## 4) Attach audio to an existing blog post

```json
{
  "entity": "audio",
  "action": "create",
  "payload": {
    "title": "AI Automation Playbook (Audio)",
    "source_type": "blog_post",
    "source_blog_id": "<BLOG_POST_UUID>",
    "audio_url": "https://cdn.example.com/audio/automation-playbook.mp3",
    "provider": "elevenlabs",
    "voice_name": "Adam",
    "status": "published"
  }
}
```

## 5) Update project summary

```json
{
  "entity": "project",
  "action": "update",
  "payload": {
    "id": "<PROJECT_UUID>",
    "short_summary": "Refined value proposition with measurable KPI gains.",
    "full_description": "Updated architecture and impact metrics after launch.",
    "featured": true
  }
}
```
