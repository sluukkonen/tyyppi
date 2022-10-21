import { Literal } from "./codecs/literal.js"

interface IssueBase {
  readonly code: string
  readonly path: string
}

export interface InvalidLiteral<T extends Literal> extends IssueBase {
  readonly code: "invalid_literal"
  readonly expected: T
}

export interface InvalidEnum<T extends Literal> extends IssueBase {
  readonly code: "invalid_enum"
  readonly members: T[]
}

export interface InvalidISOString extends IssueBase {
  readonly code: "invalid_iso_string"
}

export interface InvalidType extends IssueBase {
  readonly code: "invalid_type"
}

export interface InvalidUnion extends IssueBase {
  readonly code: "invalid_union"
  readonly issues: Issue[]
}

export type Issue =
  | InvalidEnum<Literal>
  | InvalidLiteral<Literal>
  | InvalidISOString
  | InvalidType
  | InvalidUnion
