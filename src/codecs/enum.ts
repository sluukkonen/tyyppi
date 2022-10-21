import { Codec } from "../Codec.js"
import { Literal } from "./literal.js"
import { identity } from "../utils.js"

class EnumCodec<T extends Literal> extends Codec<T, T, true> {
  constructor(readonly members: T[]) {
    const set = new Set(members)
    super(
      (val, ctx) =>
        set.has(val as T)
          ? ctx.success(val as T)
          : ctx.failure({
              code: "invalid_enum",
              path: ctx.path,
              members,
            }),
      identity,
      true
    )
  }
}

function enumCodec<T extends Literal>(...values: T[]): EnumCodec<T> {
  return new EnumCodec<T>(values)
}

export { enumCodec as enum }
