import { SimpleCodec } from "../SimpleCodec.js"

class StringCodec extends SimpleCodec<string> {
  constructor() {
    super((value, ctx) =>
      typeof value === "string"
        ? ctx.success(value)
        : ctx.failure({
            code: "invalid_type",
            path: ctx.path,
          })
    )
  }
}

export const string = new StringCodec()
