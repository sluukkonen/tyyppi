import { Literal, Ordered } from "./types.js"

export interface DecodeError {
  readonly code: string
  readonly path: (string | number)[]
}

export interface InvalidArray extends DecodeError {
  readonly code: "invalid_array"
}

export const invalidArray = (): InvalidArray => ({
  code: "invalid_array",
  path: [],
})

export interface InvalidBigInt extends DecodeError {
  readonly code: "invalid_bigint"
}

export const invalidBigInt = (): InvalidBigInt => ({
  code: "invalid_bigint",
  path: [],
})

export interface InvalidBoolean extends DecodeError {
  readonly code: "invalid_boolean"
}

export const invalidBoolean = (): InvalidBoolean => ({
  code: "invalid_boolean",
  path: [],
})

export interface InvalidDate extends DecodeError {
  readonly code: "invalid_date"
}

export const invalidDate = (): InvalidDate => ({
  code: "invalid_date",
  path: [],
})

export interface InvalidEnum<T extends Literal> extends DecodeError {
  readonly code: "invalid_enum"
  readonly members: T[]
}

export const invalidEnum = <T extends Literal>(
  members: T[]
): InvalidEnum<T> => ({
  code: "invalid_enum",
  path: [],
  members,
})

export interface InvalidInteger extends DecodeError {
  readonly code: "invalid_integer"
}

export const invalidInteger = (): InvalidInteger => ({
  code: "invalid_integer",
  path: [],
})

export interface InvalidISOString extends DecodeError {
  readonly code: "invalid_iso_string"
}

export const invalidISOString = (): InvalidISOString => ({
  code: "invalid_iso_string",
  path: [],
})

export interface InvalidLiteral<T extends Literal> extends DecodeError {
  readonly code: "invalid_literal"
  readonly expected: T
}

export const invalidLiteral = <T extends Literal>(
  expected: T
): InvalidLiteral<T> => ({
  code: "invalid_literal",
  path: [],
  expected,
})

export interface InvalidNull extends DecodeError {
  readonly code: "invalid_null"
}

export const invalidNull = (): InvalidNull => ({
  code: "invalid_null",
  path: [],
})

export interface InvalidTuple extends DecodeError {
  readonly code: "invalid_tuple"
}

export const invalidTuple = (): InvalidTuple => ({
  code: "invalid_tuple",
  path: [],
})

export interface InvalidUndefined extends DecodeError {
  readonly code: "invalid_undefined"
}

export const invalidUndefined = (): InvalidUndefined => ({
  code: "invalid_undefined",
  path: [],
})

export interface InvalidNumber extends DecodeError {
  readonly code: "invalid_number"
}

export const invalidNumber = (): InvalidNumber => ({
  code: "invalid_number",
  path: [],
})

export interface InvalidObject extends DecodeError {
  readonly code: "invalid_object"
}

export const invalidObject = (): InvalidObject => ({
  code: "invalid_object",
  path: [],
})

export interface InvalidString extends DecodeError {
  readonly code: "invalid_string"
}

export const invalidString = (): InvalidString => ({
  code: "invalid_string",
  path: [],
})

export interface InvalidUnion<E extends DecodeError> extends DecodeError {
  readonly code: "invalid_union"
  readonly errors: E[]
}

export const invalidUnion = <E extends DecodeError>(
  errors: E[]
): InvalidUnion<E> => ({
  code: "invalid_union",
  path: [],
  errors,
})

export interface TooLarge<T extends Ordered> extends DecodeError {
  readonly code: "too_large"
  readonly max: T
}

export const tooLarge = <T extends Ordered>(max: T): TooLarge<T> => ({
  code: "too_large",
  path: [],
  max,
})

export interface TooSmall<T extends Ordered> extends DecodeError {
  readonly code: "too_small"
  readonly min: T
}

export const tooSmall = <T extends Ordered>(min: T): TooSmall<T> => ({
  code: "too_small",
  path: [],
  min,
})

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
