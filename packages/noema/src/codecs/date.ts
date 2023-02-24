import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { DateMetadata } from "../Metadata.js"
import { InvalidDate } from "../DecodeError.js"
import { failure, Result, success } from "../Result.js"
import { isDate } from "../utils.js"

type DateCodec = SimpleCodec<Date, InvalidDate, DateMetadata>

export const date: DateCodec = createSimpleCodec(
  (val): Result<Date, InvalidDate> =>
    isDate(val) && !isNaN(val.getTime())
      ? success(val)
      : failure({ code: "invalid_date", path: [] }),
  { tag: "date", simple: true }
)
