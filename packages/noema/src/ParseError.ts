import { Issue } from "./Issue.js"

export class ParseError extends Error {
  constructor(readonly message: string, readonly issues: Issue[]) {
    super(message)
  }
}
