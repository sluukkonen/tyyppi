import { Ordered, TypeName } from "../types.js"
import { getType } from "../utils.js"
import { ErrorBase } from "./errorBase.js"
import { PartialPick } from "./utils.js"

export interface TooLarge extends ErrorBase {
  readonly code: "too_large"
  readonly max: Ordered
  readonly type: TypeName
}

export interface TooLargeParams extends PartialPick<TooLarge, "max"> {
  val: Ordered
}

export const tooLarge = ({
  val,
  max,
  ...overrides
}: TooLargeParams): TooLarge => {
  const type = getType(val)
  return {
    code: "too_large",
    message: `Expected the ${type} to be less than or equal to ${String(max)}`,
    max,
    type,
    path: [],
    ...overrides,
  }
}
