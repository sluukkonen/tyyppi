import { Ordered, TypeName } from "../types.js"
import { getType } from "../utils.js"
import { ErrorBase } from "./errorBase.js"
import { PartialPick } from "./utils.js"

export interface TooSmall extends ErrorBase {
  readonly code: "too_small"
  readonly type: TypeName
  readonly min: Ordered
}

export interface TooSmallParams extends PartialPick<TooSmall, "min"> {
  readonly val: Ordered
}

export const tooSmall = ({
  val,
  min,
  ...overrides
}: TooSmallParams): TooSmall => {
  const type = getType(val)
  return {
    code: "too_small",
    message: `Expected the ${type} to be greater than or equal to ${String(min)}`,
    min,
    type,
    path: [],
    ...overrides,
  }
}
