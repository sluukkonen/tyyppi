export type Literal = string | number | bigint | boolean | undefined | null

export type Ordered = number | bigint | string | Date

export type HasLength = string | unknown[]

export type TypeName =
  | "array"
  | "bigint"
  | "boolean"
  | "date"
  | "error"
  | "function"
  | "map"
  | "null"
  | "number"
  | "object"
  | "promise"
  | "regexp"
  | "set"
  | "string"
  | "symbol"
  | "undefined"
