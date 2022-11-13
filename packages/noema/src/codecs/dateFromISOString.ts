import { Codec, createCodec } from "../Codec.js"
import { DateFromISOStringMetadata } from "../Metadata.js"
import { InvalidISOString, InvalidString } from "../DecodeError.js"
import { failure, Result, success } from "../Result.js"

type DateFromISOStringCodec = Codec<
  string,
  Date,
  InvalidString | InvalidISOString,
  DateFromISOStringMetadata
>

export const dateFromISOString: DateFromISOStringCodec =
  /* @__PURE__ */ createCodec(
    (val): Result<Date, InvalidString | InvalidISOString> => {
      if (typeof val !== "string")
        return failure({ code: "invalid_string", actual: val, path: [] })
      const date = new Date(val)
      return Number.isNaN(date.getTime())
        ? failure({
            code: "invalid_iso_string",
            actual: val,
            path: [],
          })
        : success(date)
    },
    (date) => date.toISOString(),
    { tag: "dateFromISOString", simple: false }
  )
