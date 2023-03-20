import { AnyCodec } from "./Codec.js"
import { DecodeError } from "./DecodeError.js"
import { HasLength, TypeName } from "./types.js"

export const dateTag = "[object Date]"
export const errorTag = "[object Error]"
export const mapTag = "[object Map]"
export const regexpTag = "[object RegExp]"
export const promiseTag = "[object Promise]"
export const setTag = "[object Set]"

const builtinObject = Object
const objectProto = builtinObject.prototype

export const hasOwnProperty = <K extends string>(
  obj: unknown,
  key: K
): obj is Record<K, unknown> => objectProto.hasOwnProperty.call(obj, key)

export const hasLength = (value: unknown): value is HasLength =>
  isString(value) || isArray(value)

export const isEveryCodecSimple = (codecs: readonly AnyCodec[]) =>
  codecs.every((codec) => codec.meta.simple)

export const identity = <T>(value: T) => value

export const pushErrors = <T extends DecodeError>(
  errors: T[],
  newErrors: readonly T[],
  path: (string | number)[]
) => {
  for (const error of newErrors) pushError(errors, error, path)

  return errors
}

export const pushError = <T extends DecodeError>(
  errors: T[],
  newError: T,
  path: (string | number)[]
) => {
  newError.path.unshift(...path)
  errors.push(newError)
}

export const getTag = (value: object): string =>
  objectProto.toString.call(value)

export const isObjectLike = (value: unknown): value is object =>
  value != null && typeof value === "object"

export const isObject = (value: unknown): value is object =>
  isObjectLike(value) && !isArray(value)

export const getType = (value: unknown): TypeName => {
  const type = typeof value

  if (type !== "object") return type
  if (value === null) return "null"
  if (isArray(value)) return "array"

  const proto = builtinObject.getPrototypeOf(value)
  if (proto === objectProto || !proto) return "object"

  const tag = getTag(value as object)

  switch (tag) {
    case dateTag:
      return "date"
    case errorTag:
      return "error"
    case mapTag:
      return "map"
    case regexpTag:
      return "regexp"
    case promiseTag:
      return "promise"
    case setTag:
      return "set"
    default:
      return "object"
  }
}
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

export const isSet = (value: unknown): value is Set<unknown> =>
  isObjectLike(value) && getTag(value) === setTag

export const isMap = (value: unknown): value is Map<unknown, unknown> =>
  isObjectLike(value) && getTag(value) === mapTag

export const entries: <T extends object>(
  object: T
) => Array<[keyof T & string, T[keyof T & string]]> = builtinObject.entries

export const fromEntries: <K extends string, V>(
  entries: readonly [K, V][]
) => Record<K, V> = builtinObject.fromEntries
