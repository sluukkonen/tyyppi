import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { StringMetadata } from "../Metadata.js"
import { InvalidString } from "../DecodeError.js"
import { failure, success } from "../Result.js"
import { isString } from "../utils.js"

type StringCodec = SimpleCodec<string, InvalidString, StringMetadata>

export const string: StringCodec = createSimpleCodec(
  (val) =>
    isString(val)
      ? success(val)
      : failure({ code: "invalid_string", path: [] }),
  {
    tag: "string",
    simple: true,
  }
)
