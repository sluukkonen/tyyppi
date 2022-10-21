import { Codec } from "../Codec.js"
import { identity } from "../utils.js"

class StringCodec extends Codec<string, string, true> {
  constructor() {
    super(
      (value, ctx) =>
        typeof value === "string"
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

export const string = new StringCodec()
