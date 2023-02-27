import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import {
  invalidNumber,
  InvalidNumber,
  isInfinite,
  IsInfinite,
  IsNaN,
  isNaNError,
} from "../DecodeError.js"
import { NumberMetadata } from "../Metadata.js"
import { failure, Result, success } from "../Result.js"
import { isFinite, isNaN, isNumber } from "../utils.js"

export type NumberCodec = SimpleCodec<
  number,
  InvalidNumber | IsNaN | IsInfinite,
  NumberMetadata
>

export const number: NumberCodec = createSimpleCodec(
  (val): Result<number, InvalidNumber | IsNaN | IsInfinite> =>
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
