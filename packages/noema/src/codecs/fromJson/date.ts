import { Codec, createCodec, Metadata } from "../../Codec.js"
import {
  invalidISOString,
  InvalidISOString,
  invalidString,
  InvalidString,
} from "../../DecodeError.js"
import { failure, success } from "../../Result.js"
import { isNaN, isString } from "../../utils.js"

interface DateMetadata extends Metadata {
  readonly tag: "fromJson.date"
  readonly simple: false
}

export type DateCodec = Codec<
  string,
  Date,
  InvalidString | InvalidISOString,
  DateMetadata
>

export const date: DateCodec = createCodec(
  (val) => {
    if (!isString(val)) return failure(invalidString(val))
    const date = new Date(val)
    return isNaN(date.getTime()) ? failure(invalidISOString()) : success(date)
  },
  (date) => date.toISOString(),
  { tag: "fromJson.date", simple: false }
)
