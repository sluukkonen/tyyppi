import { ValidationContext } from "../ValidationContext.js"
import { AnySimpleCodec, Codec, SimpleCodec } from "../Codec.js"
import { identity } from "../utils.js"

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

class UnionCodec<C extends readonly AnySimpleCodec[] | []> extends Codec<
  UnionInputs<C>,
  UnionInputs<C>,
  true
> {
  constructor(readonly members: C) {
    super(
      (value, ctx) => {
        const innerCtx = new ValidationContext(ctx.path)

        for (let i = 0; i < members.length; i++) {
          const codec = members[i]
          const result = codec.validate(value, innerCtx)
          if (result.ok) return result
        }

        return ctx.failure({
          code: "invalid_union",
          path: ctx.path,
          issues: innerCtx.issues,
        })
      },
      identity,
      true
    )
  }
}

export const union = <C extends readonly AnySimpleCodec[] | []>(
  ...codecs: C
): UnionCodec<C> => new UnionCodec(codecs)
