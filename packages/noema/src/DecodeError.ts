import { getType } from "./getTag.js"
import { TypeName } from "./TypeName.js"
import { Literal, Ordered } from "./types.js"

export interface DecodeError {
  readonly code: string
  readonly path: (string | number)[]
}

export interface InvalidType<T extends TypeName = TypeName>
  extends DecodeError {
  readonly code: "invalid_type"
  readonly expected: T
  readonly received: TypeName
}

export const invalidType = <T extends TypeName>(
  expected: T,
  value: unknown
): InvalidType<T> => ({
  code: "invalid_type",
  expected,
  received: getType(value),
  path: [],
})

export type InvalidArray = InvalidType<"array">
export type InvalidBigInt = InvalidType<"bigint">
export type InvalidBoolean = InvalidType<"boolean">
export type InvalidDate = InvalidType<"date">
export type InvalidNull = InvalidType<"null">
export type InvalidNumber = InvalidType<"number">
export type InvalidObject = InvalidType<"object">
export type InvalidString = InvalidType<"string">
export type InvalidUndefined = InvalidType<"undefined">

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

export interface IsInfinite extends DecodeError {
  readonly code: "is_infinite"
}

export const isInfinite = (): IsInfinite => ({ code: "is_infinite", path: [] })

export interface IsNaN extends DecodeError {
  readonly code: "is_nan"
}

export const isNaNError = (): IsNaN => ({ code: "is_nan", path: [] })

export interface TooLarge<T extends Ordered> extends DecodeError {
  readonly code: "too_large"
  readonly max: T
}

export const tooLarge = <T extends Ordered>(max: T): TooLarge<T> => ({
  code: "too_large",
  path: [],
  max,
})

export interface TooLong extends DecodeError {
  readonly code: "too_long"
  readonly maxLength: number
  readonly length: number
}

export const tooLong = (maxLength: number, length: number): TooLong => ({
  code: "too_long",
  path: [],
  maxLength,
  length,
})

export interface TooShort extends DecodeError {
  readonly code: "too_short"
  readonly minLength: number
  readonly length: number
}

export const tooShort = (minLength: number, length: number): TooShort => ({
  code: "too_short",
  path: [],
  minLength,
  length,
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
