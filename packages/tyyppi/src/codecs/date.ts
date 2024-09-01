import { createSimpleCodec, SimpleCodec, SimpleMetadata } from "../Codec.js"
import { invalidType, isNaNError } from "../errors/index.js"
import { failure, success } from "../Result.js"
import { isDate, isNaN } from "../utils.js"

interface DateMetadata extends SimpleMetadata {
  readonly tag: "date"
}

export type DateCodec = SimpleCodec<Date, DateMetadata>

export const date: DateCodec = createSimpleCodec(
  (val) =>
    !isDate(val)
      ? failure(invalidType({ val, expected: "date" }))
      : isNaN(val.getTime())
        ? failure(isNaNError())
        : success(val),
  { tag: "date", simple: true },
)
