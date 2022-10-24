import { Codec, createCodec } from "../Codec.js"
import { DateMetadata } from "../Metadata.js"
import { InvalidString, InvalidType } from "../DecodeError.js"
import { failure, Result, success } from "../Result.js"

type DateCodec = Codec<string, Date, InvalidType | InvalidString, DateMetadata>

export const date: DateCodec = createCodec(
  (val, path): Result<Date, InvalidType | InvalidString> => {
    if (typeof val !== "string") return failure({ code: "invalid_type", path })
    const date = new Date(val)
    return Number.isNaN(date.getTime())
      ? failure({
          code: "invalid_string",
          path,
        })
      : success(date)
  },
  (date) => date.toISOString(),
  { tag: "date", simple: false }
)
