import { SimpleCodec } from "../SimpleCodec.js"

class NumberCodec extends SimpleCodec<number> {
  constructor() {
    super((value, ctx) =>
      typeof value === "number"
        ? ctx.success(value)
        : ctx.failure({
            code: "invalid_type",
            path: ctx.path,
          })
    )
  }
}

export const number = new NumberCodec()
