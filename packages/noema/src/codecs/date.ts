import { createSimpleCodec, SimpleCodec, SimpleMetadata } from "../Codec.js"
import { invalidDate, InvalidDate, IsNaN, isNaNError } from "../DecodeError.js"
import { failure, success } from "../Result.js"
import { isDate, isNaN } from "../utils.js"

interface DateMetadata extends SimpleMetadata {
  readonly tag: "date"
}

export type DateCodec = SimpleCodec<Date, InvalidDate | IsNaN, DateMetadata>

export const date: DateCodec = createSimpleCodec(
  (val) =>
    !isDate(val)
      ? failure(invalidDate(val))
      : isNaN(val.getTime())
      ? failure(isNaNError())
      : success(val),
  { tag: "date", simple: true }
)
