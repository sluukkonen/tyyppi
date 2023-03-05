import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { invalidDate, InvalidDate, IsNaN, isNaNError } from "../DecodeError.js"
import { failure, Result, success } from "../Result.js"
import { isDate, isNaN } from "../utils.js"

export interface DateCodec extends SimpleCodec<Date, InvalidDate | IsNaN> {
  readonly metadata: {
    readonly tag: "date"
    readonly simple: true
  }
}

export const date: DateCodec = createSimpleCodec(
  (val): Result<Date, InvalidDate | IsNaN> =>
    !isDate(val)
      ? failure(invalidDate(val))
      : isNaN(val.getTime())
      ? failure(isNaNError())
      : success(val),
  { tag: "date", simple: true }
)
