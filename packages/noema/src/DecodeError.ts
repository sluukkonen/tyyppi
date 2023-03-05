import { TypeName } from "./TypeName.js"
import { Literal, Ordered } from "./types.js"
import { getType } from "./utils.js"

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
export const invalidArray = (value: unknown): InvalidArray =>
  invalidType("array", value)

export type InvalidBigInt = InvalidType<"bigint">
export const invalidBigInt = (value: unknown): InvalidBigInt =>
  invalidType("bigint", value)

export type InvalidBoolean = InvalidType<"boolean">
export const invalidBoolean = (value: unknown): InvalidBoolean =>
  invalidType("boolean", value)

export type InvalidDate = InvalidType<"date">
export const invalidDate = (value: unknown): InvalidDate =>
  invalidType("date", value)

export type InvalidNull = InvalidType<"null">
export const invalidNull = (value: unknown): InvalidNull =>
  invalidType("null", value)

export type InvalidNumber = InvalidType<"number">
export const invalidNumber = (value: unknown): InvalidNumber =>
  invalidType("number", value)

export type InvalidMap = InvalidType<"map">
export const invalidMap = (value: unknown): InvalidMap =>
  invalidType("map", value)

export type InvalidObject = InvalidType<"object">
export const invalidObject = (value: unknown): InvalidObject =>
  invalidType("object", value)

export type InvalidSet = InvalidType<"set">
export const invalidSet = (value: unknown): InvalidSet =>
  invalidType("set", value)

export type InvalidString = InvalidType<"string">
export const invalidString = (value: unknown): InvalidString =>
  invalidType("string", value)

export type InvalidUndefined = InvalidType<"undefined">
export const invalidUndefined = (value: unknown): InvalidUndefined =>
  invalidType("undefined", value)

export interface InvalidEnum<T extends Literal> extends DecodeError {
  readonly code: "invalid_enum"
  readonly members: readonly T[]
}

export const invalidEnum = <T extends Literal>(
  members: readonly T[]
): InvalidEnum<T> => ({
  code: "invalid_enum",
  members,
  path: [],
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

export interface InvalidIntegerString extends DecodeError {
  readonly code: "invalid_integer_string"
}

export const invalidIntegerString = (): InvalidIntegerString => ({
  code: "invalid_integer_string",
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
  expected,
  path: [],
})

export interface InvalidPattern extends DecodeError {
  readonly code: "invalid_pattern"
  readonly pattern: string
}

export const invalidPattern = (regexp: RegExp): InvalidPattern => ({
  code: "invalid_pattern",
  pattern: regexp.toString(),
  path: [],
})

export interface InvalidTaggedUnion<V extends Literal> extends DecodeError {
  readonly code: "invalid_tagged_union"
  readonly options: readonly V[]
}

export const invalidTaggedUnion = <V extends Literal>(
  key: string,
  options: readonly V[]
): InvalidTaggedUnion<V> => ({
  code: "invalid_tagged_union",
  options,
  path: [key],
})

export interface InvalidUnion<E extends DecodeError> extends DecodeError {
  readonly code: "invalid_union"
  readonly errors: readonly E[]
}

export const invalidUnion = <E extends DecodeError>(
  errors: readonly E[]
): InvalidUnion<E> => ({
  code: "invalid_union",
  errors,
  path: [],
})

export interface InvalidUuid extends DecodeError {
  readonly code: "invalid_uuid"
}

export const invalidUuid = (): InvalidUuid => ({
  code: "invalid_uuid",
  path: [],
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
  readonly min?: T
  readonly max: T
}

export const tooLarge = <T extends Ordered>(max: T, min?: T): TooLarge<T> => ({
  code: "too_large",
  min,
  max,
  path: [],
})

export interface TooLong extends DecodeError {
  readonly code: "too_long"
  readonly minLength?: number
  readonly maxLength: number
  readonly length: number
}

export const tooLong = (
  length: number,
  maxLength: number,
  minLength?: number
): TooLong => ({
  code: "too_long",
  length,
  minLength,
  maxLength,
  path: [],
})

export interface TooShort extends DecodeError {
  readonly code: "too_short"
  readonly minLength: number
  readonly maxLength?: number
  readonly length: number
}

export const tooShort = (
  length: number,
  minLength: number,
  maxLength?: number
): TooShort => ({
  code: "too_short",
  length,
  minLength,
  maxLength,
  path: [],
})

export interface TooSmall<T extends Ordered> extends DecodeError {
  readonly code: "too_small"
  readonly min: T
  readonly max?: T
}

export const tooSmall = <T extends Ordered>(min: T, max?: T): TooSmall<T> => ({
  code: "too_small",
  min,
  max,
  path: [],
})
