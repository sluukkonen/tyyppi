import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { BooleanMetadata } from "../Metadata.js"
import { InvalidType } from "../DecodeError.js"
import { failure, success } from "../Result.js"

type BooleanCodec = SimpleCodec<boolean, InvalidType, BooleanMetadata>

export const boolean: BooleanCodec = createSimpleCodec(
  (val) =>
    typeof val === "boolean"
      ? success(val)
      : failure({
          code: "invalid_type",
          path: [],
        }),
  {
    tag: "boolean",
    simple: true,
  }
)
