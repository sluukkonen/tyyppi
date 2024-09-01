import {
  AnySimpleCodec,
  createSimpleCodec,
  SimpleCodec,
  SimpleMetadata,
  TypeOf,
} from "../Codec.js"
import { DecodeError, invalidUnion } from "../errors/index.js"
import { failure } from "../Result.js"

interface UnionMetadata<C extends AnySimpleCodec> extends SimpleMetadata {
  readonly tag: "union"
  readonly members: readonly C[]
}

export type UnionCodec<C extends AnySimpleCodec> = SimpleCodec<
  TypeOf<C>,
  UnionMetadata<C>
>

export function union<C extends readonly AnySimpleCodec[]>(
  ...members: C
): UnionCodec<C[number]> {
  return createSimpleCodec(
    (val) => {
      const errors: DecodeError[] = []

      for (const codec of members) {
        const result = codec.decode(val)
        if (result.ok) return result
        else errors.push(...result.errors)
      }

      return failure(invalidUnion({ errors }))
    },
    { tag: "union", simple: true, members },
  )
}
