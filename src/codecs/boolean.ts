import { SimpleCodec } from "../SimpleCodec.js"

class BooleanCodec extends SimpleCodec<boolean> {
  readonly tag = "boolean"

  constructor() {
    super((value, ctx) =>
      typeof value === "boolean"
        ? ctx.success(value)
        : ctx.failure({
            code: "invalid_type",
            message: "Expected value to be a boolean",
            path: ctx.path,
            value,
          })
    )
  }
}

export const boolean = new BooleanCodec()
