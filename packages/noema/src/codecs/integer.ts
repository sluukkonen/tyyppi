import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import {
  invalidInteger,
  InvalidInteger,
  invalidNumber,
  InvalidNumber,
  isInfinite,
  IsInfinite,
  IsNaN,
  isNaNError,
} from "../DecodeError.js"
import { IntegerMetadata } from "../Metadata.js"
import { failure, success } from "../Result.js"
import { isFinite, isInteger, isNaN, isNumber } from "../utils.js"

export type IntegerCodec = SimpleCodec<
  number,
  InvalidNumber | IsNaN | IsInfinite | InvalidInteger,
  IntegerMetadata
>

export const integer: IntegerCodec = createSimpleCodec(
  (val) =>
    isInteger(val)
      ? success(val)
      : failure(
          isNumber(val)
            ? isFinite(val)
              ? invalidInteger()
              : isNaN(val)
              ? isNaNError()
              : isInfinite()
            : invalidNumber(val)
        ),
  {
    tag: "integer",
    simple: true,
  }
)
