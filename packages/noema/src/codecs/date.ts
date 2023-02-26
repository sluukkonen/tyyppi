import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { InvalidDate, invalidType, IsNaN, isNaNError } from "../DecodeError.js"
import { DateMetadata } from "../Metadata.js"
import { failure, Result, success } from "../Result.js"
import { isDate, isNaN } from "../utils.js"

export type DateCodec = SimpleCodec<Date, InvalidDate | IsNaN, DateMetadata>

export const date: DateCodec = createSimpleCodec(
  (val): Result<Date, InvalidDate | IsNaN> =>
    !isDate(val)
      ? failure(invalidType("date", val))
      : isNaN(val.getTime())
      ? failure(isNaNError())
      : success(val),
  { tag: "date", simple: true }
)
