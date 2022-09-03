import { Codec } from "../Codec.js"
import { ValidationContext } from "../ValidationContext.js"

type UnionInputs<T extends readonly unknown[]> = T extends readonly [
  Codec<infer I, unknown>,
  ...infer Rest
]
  ? I | UnionInputs<Rest>
  : T extends []
  ? never
  : T extends readonly Codec<infer I, unknown>[]
  ? I
  : never

type UnionOutputs<T extends readonly unknown[]> = T extends readonly [
  Codec<unknown, infer O>,
  ...infer Rest
]
  ? O | UnionOutputs<Rest>
  : T extends []
  ? never
  : T extends readonly Codec<unknown, infer O>[]
  ? O
  : never

class UnionCodec<C extends readonly Codec<unknown>[] | []> extends Codec<
  UnionInputs<C>,
  UnionOutputs<C>
> {
  constructor(readonly members: C) {
    super((value, ctx) => {
      const innerCtx = new ValidationContext(ctx.path)

      for (let i = 0; i < members.length; i++) {
        const codec = members[i]
        const result = codec.validate(value, innerCtx)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (result.ok) return ctx.success(result.value) as any
      }

      return ctx.failure({
        code: "invalid_union",
        message: "Invalid union",
        value,
        issues: innerCtx.issues,
      })
    })
  }
}

export const union = <C extends readonly Codec<unknown>[] | []>(
  codecs: C
): UnionCodec<C> => new UnionCodec(codecs)
