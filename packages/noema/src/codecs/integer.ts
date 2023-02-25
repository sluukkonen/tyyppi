import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { invalidInteger, InvalidInteger } from "../DecodeError.js"
import { IntegerMetadata } from "../Metadata.js"
import { failure, success } from "../Result.js"
import { isInteger } from "../utils.js"

type IntegerCodec = SimpleCodec<number, InvalidInteger, IntegerMetadata>

export const integer: IntegerCodec = createSimpleCodec(
  (val) => (isInteger(val) ? success(val) : failure(invalidInteger())),
  {
    tag: "integer",
    simple: true,
  }
)
