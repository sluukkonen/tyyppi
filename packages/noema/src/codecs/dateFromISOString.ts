import { Codec, createCodec } from "../Codec.js"
import { DateFromISOStringMetadata } from "../Metadata.js"
import {
  invalidISOString,
  InvalidISOString,
  invalidString,
  InvalidString,
} from "../DecodeError.js"
import { failure, Result, success } from "../Result.js"
import { isString } from "../utils.js"

export type DateFromISOStringCodec = Codec<
  string,
  Date,
  InvalidString | InvalidISOString,
  DateFromISOStringMetadata
>

export const dateFromISOString: DateFromISOStringCodec = createCodec(
  (val): Result<Date, InvalidString | InvalidISOString> => {
    if (!isString(val)) return failure(invalidString())
    const date = new Date(val)
    return isNaN(date.getTime()) ? failure(invalidISOString()) : success(date)
  },
  (date) => date.toISOString(),
  { tag: "dateFromISOString", simple: false }
)
