interface IssueBase {
  readonly message: string
  readonly path: string
  readonly value: unknown
}

export interface GenericIssue extends IssueBase {
  readonly code: "generic_issue"
}

export interface InvalidType extends IssueBase {
  readonly code: "invalid_type"
}

export interface InvalidUnion extends IssueBase {
  readonly code: "invalid_union"
  readonly issues: Issue[]
}

export type Issue = GenericIssue | InvalidType | InvalidUnion
