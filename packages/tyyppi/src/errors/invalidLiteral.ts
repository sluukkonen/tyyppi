import { Primitive, TypeName } from "../types.js"
import { getType } from "../utils.js"
import { ErrorBase } from "./errorBase.js"
import { indefinite, PartialPick, stringify } from "./utils.js"

export interface InvalidLiteral extends ErrorBase {
  readonly code: "invalid_literal"
  readonly expected: Primitive
  readonly received: TypeName
}

export interface InvalidLiteralParams
  extends PartialPick<InvalidLiteral, "expected"> {
  readonly val: unknown
}

export const invalidLiteral = ({
  val,
  expected,
  ...overrides
}: InvalidLiteralParams): InvalidLiteral => {
  const received = getType(val)
  return {
    code: "invalid_literal",
    message: `Expected ${stringify(expected)}, received ${indefinite(received)}`,
    expected,
    received,
    path: [],
    ...overrides,
  }
}
