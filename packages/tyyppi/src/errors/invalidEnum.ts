import { Primitive, TypeName } from "../types.js"
import { getType } from "../utils.js"
import { ErrorBase } from "./errorBase.js"
import { indefinite, PartialPick, stringify } from "./utils.js"

export interface InvalidEnum extends ErrorBase {
  readonly code: "invalid_enum"
  readonly received: TypeName
  readonly members: readonly Primitive[]
}

export interface InvalidEnumParams extends PartialPick<InvalidEnum, "members"> {
  readonly val: unknown
}

export const invalidEnum = ({
  val,
  members,
  ...rest
}: InvalidEnumParams): InvalidEnum => {
  const received = getType(val)
  return {
    code: "invalid_enum",
    message: `Expected ${stringifyOptions(members)}, received ${indefinite(received)}`,
    members,
    received,
    path: [],
    ...rest,
  }
}

const stringifyOptions = (options: readonly Primitive[]) =>
  options.map(stringify).join(" | ")
