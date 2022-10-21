import { createSimpleCodec, SimpleCodec } from "../Codec.js"
import { Literal } from "./literal.js"
import { EnumMetadata } from "../Metadata.js"

type EnumCodec<T extends Literal> = SimpleCodec<T, EnumMetadata<T>>

function enumCodec<T extends Literal>(...members: T[]): EnumCodec<T> {
  const set = new Set(members)
  return createSimpleCodec(
    (val, ctx) =>
      set.has(val as T)
        ? ctx.success(val as T)
        : ctx.failure({
            code: "invalid_enum",
            path: ctx.path,
            members,
          }),
    { tag: "enum", simple: true, members }
  )
}

export { enumCodec as enum }
