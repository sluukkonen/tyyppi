import { Codec } from "../Codec.js"

class DateFromISOStringCodec extends Codec<string, Date, false> {
  constructor() {
    super(
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
      false
    )
  }
}

export const dateFromISOString = new DateFromISOStringCodec()
