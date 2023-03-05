import { Codec, createCodec } from "../../Codec.js"
import {
  invalidISOString,
  InvalidISOString,
  invalidString,
  InvalidString,
} from "../../DecodeError.js"
import { failure, Result, success } from "../../Result.js"
import { isNaN, isString } from "../../utils.js"

export interface DateCodec
  extends Codec<string, Date, InvalidString | InvalidISOString> {
  readonly metadata: {
    readonly tag: "fromJson.date"
    readonly simple: false
  }
}

export const date: DateCodec = createCodec(
  (val): Result<Date, InvalidString | InvalidISOString> => {
    if (!isString(val)) return failure(invalidString(val))
    const date = new Date(val)
    return isNaN(date.getTime()) ? failure(invalidISOString()) : success(date)
  },
  (date) => date.toISOString(),
  { tag: "fromJson.date", simple: false }
)
