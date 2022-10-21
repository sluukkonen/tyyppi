import { Codec, createCodec } from "../Codec.js"
import { DateMetadata } from "../Metadata.js"

type DateCodec = Codec<string, Date, DateMetadata>

export const date: DateCodec = createCodec(
  (val, ctx) => {
    if (typeof val !== "string")
      return ctx.failure({ code: "invalid_type", path: ctx.path })
    const date = new Date(val)
    return Number.isNaN(date.getTime())
      ? ctx.failure({
          code: "invalid_iso_string",
          path: ctx.path,
        })
      : ctx.success(date)
  },
  (date) => date.toISOString(),
  { tag: "date", simple: false }
)
