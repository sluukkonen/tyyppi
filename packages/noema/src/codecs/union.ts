import { ValidationContext } from "../ValidationContext.js"
import {
  AnySimpleCodec,
  createSimpleCodec,
  InputOf,
  SimpleCodec,
} from "../Codec.js"
import { UnionMetadata } from "../Metadata.js"

type UnionCodec<C extends readonly AnySimpleCodec[] | []> = SimpleCodec<
  InputOf<C[number]>,
  UnionMetadata<C>
>

export function union<C extends readonly AnySimpleCodec[] | []>(
  ...members: C
): UnionCodec<C> {
  return createSimpleCodec(
    (val, ctx) => {
      const innerCtx = new ValidationContext(ctx.path)

      for (let i = 0; i < members.length; i++) {
        const codec = members[i]
        const result = codec.validate(val, innerCtx)
        if (result.ok) return result
      }

      return ctx.failure({
        code: "invalid_union",
        path: ctx.path,
        issues: innerCtx.issues,
      })
    },
    { tag: "union", simple: true, members }
  )
}
