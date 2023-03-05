import {
  AnySimpleCodec,
  createSimpleCodec,
  ErrorOf,
  ResultOf,
  SimpleCodec,
  TypeOf,
} from "../Codec.js"
import { invalidUnion, InvalidUnion } from "../DecodeError.js"
import { failure } from "../Result.js"

export interface UnionCodec<C extends readonly AnySimpleCodec[] | []>
  extends SimpleCodec<TypeOf<C[number]>, InvalidUnion<ErrorOf<C[number]>>> {
  readonly metadata: {
    readonly tag: "union"
    readonly simple: true
    readonly members: C
  }
}

export function union<C extends readonly AnySimpleCodec[] | []>(
  ...members: C
): UnionCodec<C> {
  return createSimpleCodec(
    (val) => {
      const errors: ErrorOf<C[number]>[] = []

      for (const codec of members) {
        const result = codec.decode(val) as ResultOf<C[number]>
        if (result.ok) return result
        else errors.push(...result.errors)
      }

      return failure(invalidUnion(errors))
    },
    { tag: "union", simple: true, members }
  )
}
