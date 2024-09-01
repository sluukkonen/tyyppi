import { Primitive, TypeName } from "../types.js"
import { isBigInt, isString } from "../utils.js"
import { invalidType, InvalidType } from "./invalidType.js"

export type PartialPick<T, K extends keyof T> = Partial<T> & Pick<T, K>

export const stringify = (value: Primitive): string =>
  isString(value)
    ? JSON.stringify(value)
    : isBigInt(value)
      ? `${value}n`
      : String(value)

export const indefinite = (type: TypeName) =>
  type === "null" || type === "undefined"
    ? type
    : type === "array" || type === "object" || type === "error"
      ? `an ${type}`
      : `a ${type}`

export const invalidArray = (val: unknown): InvalidType =>
  invalidType({ val, expected: "array" })

export const invalidNumber = (val: unknown): InvalidType =>
  invalidType({ val, expected: "number" })

export const invalidObject = (val: unknown): InvalidType =>
  invalidType({ val, expected: "object" })

export const invalidString = (val: unknown): InvalidType =>
  invalidType({ val, expected: "string" })
