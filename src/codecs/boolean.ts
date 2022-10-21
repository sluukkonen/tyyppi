import { Codec } from "../Codec.js"
import { identity } from "../utils.js"

class BooleanCodec extends Codec<boolean, boolean, true> {
  constructor() {
    super(
      (value, ctx) =>
        typeof value === "boolean"
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

export const boolean = new BooleanCodec()
