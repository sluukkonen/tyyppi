import { DecodeError } from "./DecodeError.js"

export const hasOwnProperty = <K extends string>(
  obj: unknown,
  key: K
): obj is Record<K, unknown> => Object.prototype.hasOwnProperty.call(obj, key)


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
  isObjectLike(value) && getTag(value) === "[object Date]"

export const isString = (value: unknown): value is string =>
  typeof value === "string"

export const isNumber = (value: unknown): value is number =>
  typeof value === "number"

export const isArray = Array.isArray
