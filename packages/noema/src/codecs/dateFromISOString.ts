import { Codec, createCodec } from "../Codec.js"
import {
  invalidISOString,
  InvalidISOString,
  InvalidString,
  invalidType,
} from "../DecodeError.js"
import { DateFromISOStringMetadata } from "../Metadata.js"
import { failure, Result, success } from "../Result.js"
import { isNaN, isString } from "../utils.js"

export type DateFromISOStringCodec = Codec<
  string,
  Date,
  InvalidString | InvalidISOString,
  DateFromISOStringMetadata
>

export const dateFromISOString: DateFromISOStringCodec = createCodec(
  (val): Result<Date, InvalidString | InvalidISOString> => {
    if (!isString(val)) return failure(invalidType("string", val))
    const date = new Date(val)
    return isNaN(date.getTime()) ? failure(invalidISOString()) : success(date)
  },
  (date) => date.toISOString(),
  { tag: "dateFromISOString", simple: false }
)
