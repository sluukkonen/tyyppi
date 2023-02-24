import {
  AnySimpleCodec,
  createSimpleCodec,
  ErrorOf,
  ResultOf,
  SimpleCodec,
  TypeOf,
} from "../Codec.js"
import { UnionMetadata } from "../Metadata.js"
import { InvalidUnion } from "../DecodeError.js"
import { failure } from "../Result.js"

type UnionCodec<C extends readonly AnySimpleCodec[] | []> = SimpleCodec<
  TypeOf<C[number]>,
  InvalidUnion<ErrorOf<C[number]>>,
  UnionMetadata<C>
>

export function union<C extends readonly AnySimpleCodec[] | []>(
  ...members: C
): UnionCodec<C> {
  return createSimpleCodec(
    (val) => {
      const errors: ErrorOf<C[number]>[] = []

      for (let i = 0; i < members.length; i++) {
        const codec = members[i]
        const result = codec.decode(val) as ResultOf<C[number]>
        if (result.ok) return result
        else errors.push(...result.errors)
      }

      return failure({ code: "invalid_union", path: [], errors })
    },
    { tag: "union", simple: true, members }
  )
}
