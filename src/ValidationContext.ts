import { Issue } from "./Issue.js"
import { Failure, Success } from "./Result.js"

export class ValidationContext {
  public path: string
  readonly issues: Issue[]

  constructor(path: string) {
    this.path = path
    this.issues = []
  }

  success<T>(value: T): Success<T> {
    return { ok: true, value }
  }

  addIssue(issue: Issue): void {
    this.issues.push({ ...issue, path: this.path })
  }

  failure(issue: Issue): Failure {
    this.addIssue(issue)
    return this.failures()
  }

  failures(): Failure {
    return { ok: false, issues: this.issues }
  }

  setPath(path: string) {
    this.path = path
  }
}
