import { Codec, createCodec } from "../Codec.js"
import { DateMetadata } from "../Metadata.js"
import { InvalidISOString, InvalidString } from "../DecodeError.js"
import { failure, Result, success } from "../Result.js"

type DateCodec = Codec<
  string,
  Date,
  InvalidString | InvalidISOString,
  DateMetadata
>

export const date: DateCodec = createCodec(
  (val): Result<Date, InvalidString | InvalidISOString> => {
    if (typeof val !== "string")
      return failure({ code: "invalid_string", path: [] })
    const date = new Date(val)
    return Number.isNaN(date.getTime())
      ? failure({
          code: "invalid_iso_string",
          path: [],
        })
      : success(date)
  },
  (date) => date.toISOString(),
  { tag: "date", simple: false }
)
