import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import {
  invalidNumber,
  InvalidNumber,
  isInfinite,
  IsInfinite,
  IsNaN,
  isNaNError,
} from "../DecodeError.js"
import { failure, success } from "../Result.js"
import { isFinite, isNaN, isNumber } from "../utils.js"

export interface NumberCodec
  extends SimpleCodec<number, InvalidNumber | IsNaN | IsInfinite> {
  readonly metadata: {
    readonly tag: "number"
    readonly simple: true
  }
}

export const number: NumberCodec = createSimpleCodec(
  (val) =>
    isFinite(val)
      ? success(val)
      : failure(
          isNumber(val)
            ? isNaN(val)
              ? isNaNError()
              : isInfinite()
            : invalidNumber(val)
        ),
  {
    tag: "number",
    simple: true,
  }
)
