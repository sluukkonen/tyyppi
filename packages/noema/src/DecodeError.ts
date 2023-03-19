import { Primitive, Ordered, TypeName } from "./types.js"
import { getType, isString } from "./utils.js"

export interface DecodeError {
  readonly code: string
  readonly message: string
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
): InvalidType<T> => {
  const received = getType(value)
  return {
    code: "invalid_type",
    message: `Expected ${indefinite(expected)}, received ${indefinite(
      received
    )}`,
    expected,
    received,
    path: [],
  }
}

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

export interface InvalidEmail extends DecodeError {
  readonly code: "invalid_email"
}

export const invalidEmail = (): InvalidEmail => ({
  code: "invalid_email",
  message: "Expected the string to be a valid email address",
  path: [],
})

export interface InvalidEnum<T extends Primitive> extends DecodeError {
  readonly code: "invalid_enum"
  readonly received: TypeName
  readonly members: readonly T[]
}

export const invalidEnum = <T extends Primitive>(
  value: unknown,
  members: readonly T[]
): InvalidEnum<T> => {
  const received = getType(value)
  return {
    code: "invalid_enum",
    message: `Expected ${stringifyOptions(members)}, received ${indefinite(
      received
    )}`,
    members,
    received,
    path: [],
  }
}

export interface InvalidInteger extends DecodeError {
  readonly code: "invalid_integer"
}

export const invalidInteger = (): InvalidInteger => ({
  code: "invalid_integer",
  message: "Expected the number to be an integer",
  path: [],
})

export interface InvalidISOString extends DecodeError {
  readonly code: "invalid_iso_string"
}

export const invalidISOString = (): InvalidISOString => ({
  code: "invalid_iso_string",
  message: "Expected the string to be a valid RFC 3339 date-time",
  path: [],
})

export interface InvalidIntegerString extends DecodeError {
  readonly code: "invalid_integer_string"
}

export const invalidIntegerString = (): InvalidIntegerString => ({
  code: "invalid_integer_string",
  message: "Expected the string to be an integer",
  path: [],
})

export interface InvalidLiteral<T extends Primitive> extends DecodeError {
  readonly code: "invalid_literal"
  readonly expected: T
  readonly received: TypeName
}

export const invalidLiteral = <T extends Primitive>(
  value: unknown,
  expected: T
): InvalidLiteral<T> => {
  const received = getType(value)
  return {
    code: "invalid_literal",
    message: `Expected ${stringify(expected)}, received ${indefinite(
      received
    )}`,
    expected,
    received,
    path: [],
  }
}

export interface InvalidPattern extends DecodeError {
  readonly code: "invalid_pattern"
  readonly pattern: string
}

export const invalidPattern = (regexp: RegExp): InvalidPattern => {
  const pattern = regexp.toString()
  return {
    code: "invalid_pattern",
    message: `Expected the string to match the pattern ${pattern}`,
    pattern,
    path: [],
  }
}

export interface InvalidTaggedUnion<V extends Primitive> extends DecodeError {
  readonly code: "invalid_tagged_union"
  readonly options: readonly V[]
}

export const invalidTaggedUnion = <V extends Primitive>(
  key: string,
  value: unknown,
  options: readonly V[]
): InvalidTaggedUnion<V> => {
  const received = getType(value)
  return {
    code: "invalid_tagged_union",
    message: `Expected ${stringifyOptions(options)}, received ${indefinite(
      received
    )}`,
    options,
    path: [key],
  }
}

export interface InvalidUnion<E extends DecodeError> extends DecodeError {
  readonly code: "invalid_union"
  readonly errors: readonly E[]
}

export const invalidUnion = <E extends DecodeError>(
  errors: readonly E[]
): InvalidUnion<E> => ({
  code: "invalid_union",
  message: "Invalid union",
  errors,
  path: [],
})

export interface InvalidUuid extends DecodeError {
  readonly code: "invalid_uuid"
}

export const invalidUuid = (): InvalidUuid => ({
  code: "invalid_uuid",
  message: "Expected the string to be an UUID",
  path: [],
})

export interface IsInfinite extends DecodeError {
  readonly code: "is_infinite"
}

export const isInfinite = (value: number): IsInfinite => ({
  code: "is_infinite",
  message: `Expected a finite number, received ${value}`,
  path: [],
})

export interface IsNaN extends DecodeError {
  readonly code: "is_nan"
}

export const isNaNError = (): IsNaN => ({
  code: "is_nan",
  message: "Expected a number, received NaN",
  path: [],
})

export interface TooLarge<T extends Ordered> extends DecodeError {
  readonly code: "too_large"
  readonly max: T
  readonly type: TypeName
}

export const tooLarge = <T extends Ordered>(val: T, max: T): TooLarge<T> => {
  const type = getType(val)
  return {
    code: "too_large",
    message: `Expected the ${type} to be less than or equal to ${max}`,
    max,
    type,
    path: [],
  }
}

export interface TooLong extends DecodeError {
  readonly code: "too_long"
  readonly length: number
  readonly maxLength: number
  readonly type: TypeName
}

export const tooLong = (
  value: string | readonly unknown[],
  maxLength: number
): TooLong => {
  const type = getType(value)
  return {
    code: "too_long",
    message: `Expected the ${type} to contain at least ${maxLength} ${
      type === "string" ? "character" : "element"
    }(s)`,
    length: value.length,
    maxLength,
    type,
    path: [],
  }
}

export interface TooShort extends DecodeError {
  readonly code: "too_short"
  readonly length: number
  readonly minLength: number
  readonly type: TypeName
}

export const tooShort = (
  value: string | readonly unknown[],
  minLength: number
): TooShort => {
  const type = getType(value)
  return {
    code: "too_short",
    message: `Expected the ${type} to contain at least ${minLength} ${
      type === "string" ? "character" : "element"
    }(s)`,
    length: value.length,
    minLength,
    type,
    path: [],
  }
}

export interface TooSmall<T extends Ordered> extends DecodeError {
  readonly code: "too_small"
  readonly type: TypeName
  readonly min: T
}

export const tooSmall = <T extends Ordered>(value: T, min: T): TooSmall<T> => {
  const type = getType(value)
  return {
    code: "too_small",
    message: `Expected the ${type} to be greater than or equal to ${min}`,
    min,
    type,
    path: [],
  }
}
export const indefinite = (type: TypeName) =>
  type === "null" || type === "undefined"
    ? type
    : type === "array" || type === "object" || type === "error"
    ? `an ${type}`
    : `a ${type}`

export const stringify = (value: Primitive): string =>
  isString(value) ? JSON.stringify(value) : String(value)

const stringifyOptions = (options: readonly Primitive[]) =>
  options.map(stringify).join(" | ")
