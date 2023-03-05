import {
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  IsSimple,
  ResultOf,
  TypeOf,
} from "../Codec.js"
import { tooLarge, TooLarge } from "../DecodeError.js"
import { failure, Result } from "../Result.js"
import { Ordered } from "../types.js"

export interface MaxCodec<C extends Codec<any, Ordered>>
  extends Codec<InputOf<C>, TypeOf<C>, ErrorOf<C> | TooLarge<TypeOf<C>>> {
  readonly metadata: {
    readonly tag: "max"
    readonly simple: IsSimple<C>
    readonly max: TypeOf<C>
    readonly codec: C
  }
}

export const max = <C extends Codec<any, Ordered>>(
  codec: C,
  max: TypeOf<C>
): MaxCodec<C> =>
  createCodec(
    (val): Result<TypeOf<C>, ErrorOf<C> | TooLarge<TypeOf<C>>> => {
      const result = codec.decode(val) as ResultOf<C>
      return !result.ok
        ? result
        : result.value > max
        ? failure(tooLarge(max))
        : result
    },
    codec.encode,
    { tag: "max", simple: codec.metadata.simple, codec, max }
  )
