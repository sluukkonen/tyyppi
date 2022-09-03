import { Issue } from "./Issue.js"

export class ParseError extends Error {
  constructor(message: string, readonly issues: Issue[]) {
    super(message)
  }
}
