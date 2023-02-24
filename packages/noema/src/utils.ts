import { DecodeError } from "./DecodeError.js"

export function hasOwnProperty<K extends string>(
  obj: unknown,
  key: K
): obj is Record<K, unknown> {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

export function identity<T>(value: T) {
  return value
}

export function pushErrors<T extends DecodeError>(
  errors: T[],
  newErrors: readonly T[],
  key: string | number
) {
  for (const error of newErrors) {
    error.path.unshift(key)
    errors.push(error)
  }
  return errors
}

export function getTag(value: object): string {
  return Object.prototype.toString.call(value)
}

export function isObjectLike(value: unknown): value is object {
  return value != null && typeof value === "object"
}

export function isObject(value: unknown): value is object {
  return isObjectLike(value) && !isArray(value)
}

export function isDate(value: unknown): value is Date {
  return isObjectLike(value) && getTag(value) === "[object Date]"
}

export function isString(value: unknown): value is string {
  return typeof value === "string"
}

export function isNumber(value: unknown): value is number {
  return typeof value === "number"
}

export const isArray = Array.isArray
