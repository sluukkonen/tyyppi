import { Codec } from "./Codec.js"

class NumberCodec extends Codec<number> {
  readonly tag = "number"

  constructor() {
    super((value, ctx) =>
      typeof value === "number"
        ? ctx.success(value)
        : ctx.failure({
            code: "invalid_number",
            message: "Expected value to be a number",
            value,
          })
    )
  }
}

export const number = new NumberCodec()
