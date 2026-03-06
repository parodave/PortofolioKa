import fs from "fs"
import path from "path"

export function loadPortfolioKnowledge() {
  const file = path.join(process.cwd(), "data", "portfolio.json")

  if (!fs.existsSync(file)) return ""

  const raw = fs.readFileSync(file, "utf8")

  return raw
}
