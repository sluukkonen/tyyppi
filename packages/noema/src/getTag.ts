import { TypeName } from "./TypeName.js"
import { getTag, isArray } from "./utils.js"

export const dateTag = "[object Date]"
export const errorTag = "[object Error]"
export const mapTag = "[object Map]"
export const regexpTag = "[object RegExp]"
export const promiseTag = "[object Promise]"
export const setTag = "[object Set]"

const objectProto = Object.prototype

export const getType = (value: unknown): TypeName => {
  const type = typeof value

  if (type !== "object") return type
  if (value === null) return "null"
  if (isArray(value)) return "array"

  const proto = Object.getPrototypeOf(value)
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
