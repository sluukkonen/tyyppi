import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { StringMetadata } from "../Metadata.js"
import { InvalidString } from "../DecodeError.js"
import { failure, success } from "../Result.js"

type StringCodec = SimpleCodec<string, InvalidString, StringMetadata>

export const string: StringCodec = createSimpleCodec(
  (val) =>
    typeof val === "string"
      ? success(val)
      : failure({
          code: "invalid_string",
          actual: val,
          path: [],
        }),
  {
    tag: "string",
    simple: true,
  }
)
