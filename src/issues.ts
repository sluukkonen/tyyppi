export type Path = (string | number)[]

interface IssueBase {
  message: string
  path: Path
  value: unknown
}

export interface GenericIssue extends IssueBase {
  code: "generic_issue"
}

export interface InvalidArray extends IssueBase {
  code: "invalid_array"
}

export interface InvalidNumber extends IssueBase {
  code: "invalid_number"
}

export interface InvalidString extends IssueBase {
  code: "invalid_string"
}

export interface InvalidUnion extends IssueBase {
  code: "invalid_union"
  issues: Issue[]
}

export type Issue =
  | GenericIssue
  | InvalidArray
  | InvalidNumber
  | InvalidString
  | InvalidUnion

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never

export type IssueWithoutPath = DistributiveOmit<Issue, "path">
