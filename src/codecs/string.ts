import { Codec } from "../Codec.js"

class StringCodec extends Codec<string> {
  readonly tag = "string"

  constructor() {
    super((value, ctx) =>
      typeof value === "string"
        ? ctx.success(value)
        : ctx.failure({
            code: "invalid_string",
            message: "Expected value to be a string",
            value,
          })
    )
  }
}

export const string = new StringCodec()
