import { TypeName } from "../types.js"
import { getType } from "../utils.js"
import { ErrorBase } from "./errorBase.js"
import { indefinite, PartialPick } from "./utils.js"

export interface InvalidType extends ErrorBase {
  readonly code: "invalid_type"
  readonly expected: TypeName
  readonly received: TypeName
}

export interface InvalidTypeParams
  extends PartialPick<InvalidType, "expected"> {
  readonly val: unknown
}

export const invalidType = ({
  val,
  expected,
}: InvalidTypeParams): InvalidType => {
  const received = getType(val)
  return {
    code: "invalid_type",
    message: `Expected ${indefinite(expected)}, received ${indefinite(received)}`,
    expected,
    received,
    path: [],
  }
}
