import { createSimpleCodec, SimpleCodec, SimpleMetadata } from "../Codec.js"
import { invalidString, InvalidString } from "../DecodeError.js"
import { failure, success } from "../Result.js"
import { isString } from "../utils.js"

interface StringMetadata extends SimpleMetadata {
  readonly tag: "string"
}

export type StringCodec = SimpleCodec<string, InvalidString, StringMetadata>

export const string: StringCodec = createSimpleCodec(
  (val) => (isString(val) ? success(val) : failure(invalidString(val))),
  {
    tag: "string",
    simple: true,
  }
)
