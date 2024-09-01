import { Primitive } from "../types.js"
import { ErrorBase } from "./errorBase.js"
import { PartialPick } from "./utils.js"

export interface InvalidDiscriminatedUnion extends ErrorBase {
  readonly code: "invalid_discriminated_union"
  readonly options: readonly Primitive[]
}

export interface InvalidDiscriminatedUnionParams
  extends PartialPick<InvalidDiscriminatedUnion, "options"> {
  readonly key: string
}

export const invalidDiscriminatedUnion = ({
  key,
  options,
  ...rest
}: InvalidDiscriminatedUnionParams): InvalidDiscriminatedUnion => ({
  code: "invalid_discriminated_union",
  message: "Invalid discriminated union",
  options,
  path: [key],
  ...rest,
})
