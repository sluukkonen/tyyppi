import { Literal } from "./codecs/literal.js"

export interface DecodeError {
  readonly code: string
  readonly path: string
}

export interface InvalidLiteral<T extends Literal> extends DecodeError {
  readonly code: "invalid_literal"
  readonly expected: T
}

export interface InvalidEnum<T extends Literal> extends DecodeError {
  readonly code: "invalid_enum"
  readonly members: T[]
}

export interface InvalidString extends DecodeError {
  readonly code: "invalid_string"
}

export interface InvalidType extends DecodeError {
  readonly code: "invalid_type"
}

export interface InvalidUnion<E extends DecodeError> extends DecodeError {
  readonly code: "invalid_union"
  readonly errors: E[]
}

export type BuiltinError =
  | InvalidEnum<Literal>
  | InvalidLiteral<Literal>
  | InvalidString
  | InvalidType
  | InvalidUnion<DecodeError>
