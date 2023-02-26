import { DecodeError } from "./DecodeError.js"
import { dateTag } from "./getTag.js"
import { HasLength } from "./types.js"

export const hasOwnProperty = <K extends string>(
  obj: unknown,
  key: K
): obj is Record<K, unknown> => Object.prototype.hasOwnProperty.call(obj, key)

export const hasLength = (value: unknown): value is HasLength =>
  value != null && hasOwnProperty(value, "length") && isInteger(value.length)

export const identity = <T>(value: T) => value

export const pushErrors = <T extends DecodeError>(
  errors: T[],
  newErrors: readonly T[],
  key: string | number
) => {
  for (const error of newErrors) {
    error.path.unshift(key)
    errors.push(error)
  }
  return errors
}

export const getTag = (value: object): string =>
  Object.prototype.toString.call(value)

export const isObjectLike = (value: unknown): value is object =>
  value != null && typeof value === "object"

export const isObject = (value: unknown): value is object =>
  isObjectLike(value) && !isArray(value)

export const isDate = (value: unknown): value is Date =>
  isObjectLike(value) && getTag(value) === dateTag

export const isString = (value: unknown): value is string =>
  typeof value === "string"

export const isNumber = (value: unknown): value is number =>
  typeof value === "number"

export const isArray = Array.isArray as (value: unknown) => value is unknown[]

export const isFinite: (value: unknown) => value is number =
  Number.isFinite as (value: unknown) => value is number

export const isNaN = Number.isNaN

export const isInteger = Number.isInteger as (value: unknown) => value is number
