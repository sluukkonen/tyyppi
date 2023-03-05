import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { invalidBoolean, InvalidBoolean } from "../DecodeError.js"
import { failure, success } from "../Result.js"

export interface BooleanCodec extends SimpleCodec<boolean, InvalidBoolean> {
  readonly metadata: {
    readonly tag: "boolean"
    readonly simple: true
  }
}

export const boolean: BooleanCodec = createSimpleCodec(
  (val) =>
    typeof val === "boolean" ? success(val) : failure(invalidBoolean(val)),
  {
    tag: "boolean",
    simple: true,
  }
)
