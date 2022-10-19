import { SimpleCodec } from "../SimpleCodec.js"

class BooleanCodec extends SimpleCodec<boolean> {
  constructor() {
    super((value, ctx) =>
      typeof value === "boolean"
        ? ctx.success(value)
        : ctx.failure({
            code: "invalid_type",
            path: ctx.path,
          })
    )
  }
}

export const boolean = new BooleanCodec()
