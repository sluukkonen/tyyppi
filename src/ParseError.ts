import { Issue } from "./issues.js"

export class ParseError extends Error {
  constructor(message: string, public issues: Issue[]) {
    super(message)
  }
}
