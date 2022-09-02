interface IssueBase {
  message: string
  path: string
  value: unknown
}

export interface GenericIssue extends IssueBase {
  code: "generic_issue"
}

export interface InvalidArray extends IssueBase {
  code: "invalid_array"
}

export interface InvalidBoolean extends IssueBase {
  code: "invalid_boolean"
}

export interface InvalidNumber extends IssueBase {
  code: "invalid_number"
}

export interface InvalidObject extends IssueBase {
  code: "invalid_object"
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
  | InvalidBoolean
  | InvalidNumber
  | InvalidObject
  | InvalidString
  | InvalidUnion

type DistributiveOmit<T, K extends keyof T> = T extends unknown
  ? Omit<T, K>
  : never

export type IssueWithoutPath = DistributiveOmit<Issue, "path">
