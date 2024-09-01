import { Codec, createCodec, Metadata } from "../../Codec.js"
import { invalidFormat } from "../../errors/index.js"
import { invalidString } from "../../errors/utils.js"
import { failure, success } from "../../Result.js"
import { isNaN, isString } from "../../utils.js"

interface DateMetadata extends Metadata {
  readonly tag: "fromJson.date"
  readonly simple: false
}

export type DateCodec = Codec<string, Date, DateMetadata>

export const date: DateCodec = createCodec(
  (val) => {
    if (!isString(val)) return failure(invalidString(val))
    const date = new Date(val)
    return isNaN(date.getTime())
      ? failure(invalidFormat({ format: "date-time" }))
      : success(date)
  },
  (date) => date.toISOString(),
  { tag: "fromJson.date", simple: false },
)
