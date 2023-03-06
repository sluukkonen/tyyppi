import { createSimpleCodec, SimpleCodec, SimpleMetadata } from "../Codec.js"
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

interface NumberMetadata extends SimpleMetadata {
  readonly tag: "number"
}

export type NumberCodec = SimpleCodec<
  number,
  InvalidNumber | IsNaN | IsInfinite,
  NumberMetadata
>

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
