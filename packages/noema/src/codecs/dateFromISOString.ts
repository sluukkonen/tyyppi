import { Codec, createCodec } from "../Codec.js"
import {
  invalidISOString,
  InvalidISOString,
  invalidString,
  InvalidString,
} from "../DecodeError.js"
import { failure, Result, success } from "../Result.js"
import { isNaN, isString } from "../utils.js"

export interface DateFromISOStringCodec
  extends Codec<string, Date, InvalidString | InvalidISOString> {
  readonly metadata: {
    readonly tag: "dateFromISOString"
    readonly simple: false
  }
}

export const dateFromISOString: DateFromISOStringCodec = createCodec(
  (val): Result<Date, InvalidString | InvalidISOString> => {
    if (!isString(val)) return failure(invalidString(val))
    const date = new Date(val)
    return isNaN(date.getTime()) ? failure(invalidISOString()) : success(date)
  },
  (date) => date.toISOString(),
  { tag: "dateFromISOString", simple: false }
)
