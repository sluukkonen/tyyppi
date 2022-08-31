import { Issue } from "./Issue.js"

export class ParseError extends Error {
  constructor(message: string, public issues: Issue[]) {
    super(message)
  }
}
