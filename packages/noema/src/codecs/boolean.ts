import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { invalidBoolean, InvalidBoolean } from "../DecodeError.js"
import { BooleanMetadata } from "../Metadata.js"
import { failure, success } from "../Result.js"

export type BooleanCodec = SimpleCodec<boolean, InvalidBoolean, BooleanMetadata>

export const boolean: BooleanCodec = createSimpleCodec(
  (val) =>
    typeof val === "boolean" ? success(val) : failure(invalidBoolean(val)),
  {
    tag: "boolean",
    simple: true,
  }
)
