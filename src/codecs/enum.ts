import { Literal } from "./literal.js"
import { SimpleCodec } from "../SimpleCodec.js"

export class EnumCodec<T extends Literal> extends SimpleCodec<T> {
  constructor(readonly members: T[]) {
    const set = new Set(members)
    super((val, ctx) =>
      set.has(val as T)
        ? ctx.success(val as T)
        : ctx.failure({
            code: "invalid_enum",
            path: ctx.path,
            members,
          })
    )
  }
}

function enumCodec<T extends Literal>(...values: T[]): EnumCodec<T> {
  return new EnumCodec<T>(values)
}

export { enumCodec as enum }
