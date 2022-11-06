import { Literal } from "./codecs/literal.js"

export interface DecodeError {
  readonly code: string
  readonly actual: unknown
  readonly path: (string | number)[]
}

export interface InvalidArray extends DecodeError {
  readonly code: "invalid_array"
}

export interface InvalidBoolean extends DecodeError {
  readonly code: "invalid_boolean"
}

export interface InvalidEnum<T extends Literal> extends DecodeError {
  readonly code: "invalid_enum"
  readonly members: T[]
}

export interface InvalidISOString extends DecodeError {
  readonly code: "invalid_iso_string"
}

export interface InvalidLiteral<T extends Literal> extends DecodeError {
  readonly code: "invalid_literal"
  readonly expected: T
}

export interface InvalidNull extends DecodeError {
  readonly code: "invalid_null"
}

export interface InvalidNumber extends DecodeError {
  readonly code: "invalid_number"
}

export interface InvalidObject extends DecodeError {
  readonly code: "invalid_object"
}

export interface InvalidString extends DecodeError {
  readonly code: "invalid_string"
}

export interface InvalidUnion<E extends DecodeError> extends DecodeError {
  readonly code: "invalid_union"
  readonly errors: E[]
}

export type BuiltinError =
  | InvalidArray
  | InvalidBoolean
  | InvalidEnum<Literal>
  | InvalidISOString
  | InvalidLiteral<Literal>
  | InvalidNumber
  | InvalidObject
  | InvalidString
  | InvalidUnion<DecodeError>
