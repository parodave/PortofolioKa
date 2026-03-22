interface BlogMarkdownProps {
  content: string
}

function flushParagraph(paragraph: string[], key: string) {
  if (paragraph.length === 0) return null
  return (
    <p key={key} className="mb-4 leading-7 text-muted-foreground">
      {paragraph.join(" ")}
    </p>
  )
}

export function BlogMarkdown({ content }: BlogMarkdownProps) {
  const lines = content.split("\n")
  const elements: JSX.Element[] = []
  let paragraph: string[] = []
  let listItems: string[] = []

  const flushList = () => {
    if (listItems.length === 0) return

    elements.push(
      <ul key={`list-${elements.length}`} className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
        {listItems.map((item, index) => (
          <li key={`${item}-${index}`}>{item}</li>
        ))}
      </ul>,
    )

    listItems = []
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()

    if (!line) {
      flushList()
      const paragraphElement = flushParagraph(paragraph, `p-${elements.length}`)
      if (paragraphElement) elements.push(paragraphElement)
      paragraph = []
      continue
    }

    if (line.startsWith("# ")) {
      flushList()
      const paragraphElement = flushParagraph(paragraph, `p-${elements.length}`)
      if (paragraphElement) elements.push(paragraphElement)
      paragraph = []
      elements.push(
        <h1 key={`h1-${elements.length}`} className="mb-4 mt-8 text-3xl font-bold tracking-tight">
          {line.replace(/^#\s+/, "")}
        </h1>,
      )
      continue
    }

    if (line.startsWith("## ")) {
      flushList()
      const paragraphElement = flushParagraph(paragraph, `p-${elements.length}`)
      if (paragraphElement) elements.push(paragraphElement)
      paragraph = []
      elements.push(
        <h2 key={`h2-${elements.length}`} className="mb-3 mt-8 text-2xl font-semibold tracking-tight">
          {line.replace(/^##\s+/, "")}
        </h2>,
      )
      continue
    }

    if (line.startsWith("- ")) {
      const paragraphElement = flushParagraph(paragraph, `p-${elements.length}`)
      if (paragraphElement) elements.push(paragraphElement)
      paragraph = []
      listItems.push(line.replace(/^-\s+/, ""))
      continue
    }

    paragraph.push(line)
  }

  flushList()
  const paragraphElement = flushParagraph(paragraph, `p-${elements.length}`)
  if (paragraphElement) elements.push(paragraphElement)

  return <div className="prose prose-neutral max-w-none dark:prose-invert">{elements}</div>
}
