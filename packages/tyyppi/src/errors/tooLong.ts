import { TypeName } from "../types.js"
import { getType } from "../utils.js"
import { ErrorBase } from "./errorBase.js"
import { PartialPick } from "./utils.js"

export interface TooLong extends ErrorBase {
  readonly code: "too_long"
  readonly length: number
  readonly maxLength: number
  readonly type: TypeName
}

export interface TooLongParams
  extends PartialPick<TooLong, "length" | "maxLength"> {
  readonly val: unknown
}

export const tooLong = ({
  val,
  length,
  maxLength,
  ...overrides
}: TooLongParams): TooLong => {
  const type = getType(val)
  return {
    code: "too_long",
    message: `Expected the ${type} to contain at least ${maxLength} ${
      type === "string" ? "character" : "element"
    }(s)`,
    length,
    maxLength,
    type,
    path: [],
    ...overrides,
  }
}
