import { Codec } from "../Codec.js"
import { identity } from "../utils.js"

class NumberCodec extends Codec<number, number, true> {
  constructor() {
    super(
      (value, ctx) =>
        typeof value === "number"
          ? ctx.success(value)
          : ctx.failure({
              code: "invalid_type",
              path: ctx.path,
            }),
      identity,
      true
    )
  }
}

export const number = new NumberCodec()
