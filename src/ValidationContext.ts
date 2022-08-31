import { Issue, IssueWithoutPath, Path } from "./Issue.js"
import { Failure, Success } from "./Result.js"

export class ValidationContext {
  readonly path: Path
  readonly issues: Issue[]

  constructor(path: Path) {
    this.path = path
    this.issues = []
  }

  success<T>(value: T): Success<T> {
    return { ok: true, value }
  }

  addIssue(issue: IssueWithoutPath): void {
    this.issues.push({ ...issue, path: this.path.slice() })
  }

  failure(issue: IssueWithoutPath): Failure {
    this.addIssue(issue)
    return this.failures()
  }

  failures(): Failure {
    return { ok: false, issues: this.issues }
  }

  push(part: string | number) {
    this.path.push(part)
  }

  pop() {
    this.path.pop()
  }
}
