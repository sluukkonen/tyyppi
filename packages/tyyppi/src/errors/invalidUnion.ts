import { DecodeError } from "./decodeError.js"
import { ErrorBase } from "./errorBase.js"
import { PartialPick } from "./utils.js"

export interface InvalidUnion extends ErrorBase {
  readonly code: "invalid_union"
  readonly errors: readonly DecodeError[]
}

export type InvalidUnionParams = PartialPick<InvalidUnion, "errors">

export const invalidUnion = ({
  errors,
  ...overrides
}: InvalidUnionParams): InvalidUnion => ({
  code: "invalid_union",
  message: "Invalid union",
  errors,
  path: [],
  ...overrides,
})
