import { ValidationContext } from "../ValidationContext.js"
import { AnySimpleCodec, SimpleCodec } from "../SimpleCodec.js"

type UnionInputs<T extends readonly unknown[]> = T extends readonly [
  SimpleCodec<infer I>,
  ...infer Rest
]
  ? I | UnionInputs<Rest>
  : T extends []
  ? never
  : T extends readonly SimpleCodec<infer I>[]
  ? I
  : never

class UnionCodec<C extends readonly AnySimpleCodec[] | []> extends SimpleCodec<
  UnionInputs<C>
> {
  constructor(readonly members: C) {
    super((value, ctx) => {
      const innerCtx = new ValidationContext(ctx.path)

      for (let i = 0; i < members.length; i++) {
        const codec = members[i]
        const result = codec.validate(value, innerCtx)
        if (result.ok) return ctx.success(result.value)
      }

      return ctx.failure({
        code: "invalid_union",
        path: ctx.path,
        issues: innerCtx.issues,
      })
    })
  }
}

export const union = <C extends readonly AnySimpleCodec[] | []>(
  ...codecs: C
): UnionCodec<C> => new UnionCodec(codecs)
