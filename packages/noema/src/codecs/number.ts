import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import {
  InvalidNumber,
  invalidType,
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
            : invalidType("number", val)
        ),
  {
    tag: "number",
    simple: true,
  }
)
