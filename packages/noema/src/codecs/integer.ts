import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { InvalidInteger } from "../DecodeError.js"
import { IntegerMetadata } from "../Metadata.js"
import { failure, success } from "../Result.js"
import { isNumber } from "../utils.js"

type IntegerCodec = SimpleCodec<number, InvalidInteger, IntegerMetadata>

export const integer: IntegerCodec = createSimpleCodec(
  (val) =>
    isNumber(val) && Number.isInteger(val)
      ? success(val)
      : failure({
          code: "invalid_integer",
          path: [],
        }),
  {
    tag: "integer",
    simple: true,
  }
)
