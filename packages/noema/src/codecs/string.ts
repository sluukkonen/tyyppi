import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { StringMetadata } from "../Metadata.js"
import { invalidString, InvalidString } from "../DecodeError.js"
import { failure, success } from "../Result.js"
import { isString } from "../utils.js"

export type StringCodec = SimpleCodec<string, InvalidString, StringMetadata>

export const string: StringCodec = createSimpleCodec(
  (val) => (isString(val) ? success(val) : failure(invalidString())),
  {
    tag: "string",
    simple: true,
  }
)
