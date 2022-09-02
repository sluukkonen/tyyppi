import { Issue, IssueWithoutPath } from "./Issue.js"
import { Failure, Success } from "./Result.js"

export class ValidationContext {
  public path: string
  readonly issues: Issue[]
  /** @internal */
  public value: any
  /** @internal */
  public ok: any

  constructor(path: string) {
    this.path = path
    this.issues = []
    this.ok = true
    this.value = null
  }

  success<T>(value: T): Success<T> {
    this.ok = true
    this.value = value
    return this
  }

  addIssue(issue: IssueWithoutPath): void {
    this.issues.push({ ...issue, path: this.path })
  }

  failure(issue: IssueWithoutPath): Failure {
    this.addIssue(issue)
    return this.failures()
  }

  failures(): Failure {
    this.ok = false
    return this
  }

  setPath(path: string) {
    this.path = path
  }
}
