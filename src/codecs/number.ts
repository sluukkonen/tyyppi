import { SimpleCodec } from "../SimpleCodec.js"

class NumberCodec extends SimpleCodec<number> {
  readonly tag = "number"

  constructor() {
    super((value, ctx) =>
      typeof value === "number"
        ? ctx.success(value)
        : ctx.failure({
            code: "invalid_type",
            message: "Expected value to be a number",
            value,
          })
    )
  }
}

export const number = new NumberCodec()
