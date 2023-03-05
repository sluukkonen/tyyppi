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
import { failure, success } from "../Result.js"
import { isFinite, isInteger, isNaN, isNumber } from "../utils.js"

export interface IntegerCodec
  extends SimpleCodec<
    number,
    InvalidNumber | IsNaN | IsInfinite | InvalidInteger
  > {
  readonly metadata: {
    readonly tag: "integer"
    readonly simple: true
  }
}

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
