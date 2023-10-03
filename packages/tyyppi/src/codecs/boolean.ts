import { createSimpleCodec, SimpleCodec, SimpleMetadata } from "../Codec.js"
import { invalidBoolean, InvalidBoolean } from "../DecodeError.js"
import { failure, success } from "../Result.js"

interface BooleanMetadata extends SimpleMetadata {
  readonly tag: "boolean"
}

export type BooleanCodec = SimpleCodec<boolean, InvalidBoolean, BooleanMetadata>

export const boolean: BooleanCodec = createSimpleCodec(
  (val) =>
    typeof val === "boolean" ? success(val) : failure(invalidBoolean(val)),
  {
    tag: "boolean",
    simple: true,
  },
)
