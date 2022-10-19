import { SimpleCodec } from "../SimpleCodec.js"

class StringCodec extends SimpleCodec<string> {
  constructor() {
    super((value, ctx) =>
      typeof value === "string"
        ? ctx.success(value)
        : ctx.failure({
            code: "invalid_type",
            message: "Expected value to be a string",
            path: ctx.path,
            value,
          })
    )
  }
}

export const string = new StringCodec()
