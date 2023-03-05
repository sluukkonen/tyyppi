import {
  Codec,
  createCodec,
  ErrorOf,
  InputOf,
  IsSimple,
  ResultOf,
  TypeOf,
} from "../Codec.js"
import { tooSmall, TooSmall } from "../DecodeError.js"
import { failure, Result } from "../Result.js"
import { Ordered } from "../types.js"

export interface MinCodec<C extends Codec<any, Ordered>>
  extends Codec<InputOf<C>, TypeOf<C>, ErrorOf<C> | TooSmall<TypeOf<C>>> {
  readonly metadata: {
    readonly tag: "min"
    readonly simple: IsSimple<C>
    readonly min: TypeOf<C>
    readonly codec: C
  }
}

export const min = <C extends Codec<any, Ordered>>(
  codec: C,
  min: TypeOf<C>
): MinCodec<C> =>
  createCodec(
    (val): Result<TypeOf<C>, ErrorOf<C> | TooSmall<TypeOf<C>>> => {
      const result = codec.decode(val) as ResultOf<C>
      return !result.ok
        ? result
        : result.value < min
        ? failure(tooSmall(min))
        : result
    },
    codec.encode,
    { tag: "min", simple: codec.metadata.simple, codec, min }
  )
