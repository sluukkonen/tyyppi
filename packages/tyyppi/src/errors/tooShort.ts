import { TypeName } from "../types.js"
import { getType } from "../utils.js"
import { ErrorBase } from "./errorBase.js"
import { PartialPick } from "./utils.js"

export interface TooShort extends ErrorBase {
  readonly code: "too_short"
  readonly length: number
  readonly minLength: number
  readonly type: TypeName
}

export interface TooShortParams
  extends PartialPick<TooShort, "length" | "minLength"> {
  readonly val: unknown
}

export const tooShort = ({
  val,
  length,
  minLength,
  ...overrides
}: TooShortParams): TooShort => {
  const type = getType(val)
  return {
    code: "too_short",
    message: `Expected the ${type} to contain at least ${minLength} ${
      type === "string" ? "character" : "element"
    }(s)`,
    length,
    minLength,
    type,
    path: [],
    ...overrides,
  }
}
