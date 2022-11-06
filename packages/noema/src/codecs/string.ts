import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { StringMetadata } from "../Metadata.js"
import { InvalidType } from "../DecodeError.js"
import { failure, success } from "../Result.js"

type StringCodec = SimpleCodec<string, InvalidType, StringMetadata>

export const string: StringCodec = createSimpleCodec(
  (val) =>
    typeof val === "string"
      ? success(val)
      : failure({
          code: "invalid_type",
          path: [],
        }),
  {
    tag: "string",
    simple: true,
  }
)
