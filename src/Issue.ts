interface IssueBase {
  message: string
  path: string
  value: unknown
}

export interface GenericIssue extends IssueBase {
  code: "generic_issue"
}

export interface InvalidType extends IssueBase {
  code: "invalid_type"
}

export interface InvalidUnion extends IssueBase {
  code: "invalid_union"
  issues: Issue[]
}

export type Issue = GenericIssue | InvalidType | InvalidUnion
